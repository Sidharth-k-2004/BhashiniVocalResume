from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, set_access_cookies, unset_jwt_cookies
import os
import uuid
import datetime
import json
import tempfile
import speech_recognition as sr
from pydub import AudioSegment
from pydub.utils import which
import io
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
import re
import requests
from threading import Thread
from waitress import serve
import logging
import base64

# Load environment variables from .env file
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)
CORS(app, supports_credentials=True, origins=["http://localhost:3000"])
app.logger.setLevel(logging.DEBUG)

# Configuration
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB limit

# Database URI - now properly reading from .env
DATABASE_URL = os.environ.get("DATABASE_URL")
if not DATABASE_URL:
    # Use SQLite as fallback
    DATABASE_URL = "sqlite:///vocalresume.db"
    print("Using SQLite database as fallback")
else:
    print(f"Using database: {DATABASE_URL}")

app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'my-very-secret-key'
app.config['JWT_TOKEN_LOCATION'] = ['cookies']
app.config['JWT_COOKIE_SECURE'] = False  # Set to True in production with HTTPS
app.config['JWT_COOKIE_CSRF_PROTECT'] = False  # Set to True in production
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = datetime.timedelta(hours=24)
app.config['UPLOAD_FOLDER'] = 'uploads'

# Initialize extensions
db = SQLAlchemy(app)
jwt = JWTManager(app)

# Ensure upload directory exists
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# Configure OpenRouter API
OPENROUTER_API_KEY = os.environ.get("OPENROUTER_API_KEY")
OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1"

# SerpAPI Configuration
SERPAPI_KEY = os.environ.get("SERPAPI_KEY")

# Bhashini API Configuration - now properly reading from .env
BHASHINI_USER_ID = os.environ.get("BHASHINI_USER_ID")
BHASHINI_API_KEY = os.environ.get("BHASHINI_API_KEY")
BHASHINI_BASE_URL = "https://meity-auth.ulcacontrib.org"
BHASHINI_COMPUTE_URL = "https://dhruva-api.bhashini.gov.in/services/inference"

# Debug: Print loaded environment variables (remove in production)
print(f"Loaded BHASHINI_USER_ID: {BHASHINI_USER_ID}")
print(f"Loaded BHASHINI_API_KEY: {BHASHINI_API_KEY[:10]}..." if BHASHINI_API_KEY else "BHASHINI_API_KEY not loaded")
print(f"Loaded SERPAPI_KEY: {SERPAPI_KEY[:10]}..." if SERPAPI_KEY else "SERPAPI_KEY not loaded")

# Check for FFmpeg
def check_ffmpeg():
    """Check if FFmpeg is available"""
    ffmpeg_path = which("ffmpeg")
    if ffmpeg_path:
        print(f"FFmpeg found at: {ffmpeg_path}")
        return True
    else:
        print("FFmpeg not found. Audio conversion may not work properly.")
        print("Please install FFmpeg:")
        print("1. Download from: https://ffmpeg.org/download.html")
        print("2. Add to system PATH")
        return False

# Check FFmpeg availability on startup
ffmpeg_available = check_ffmpeg()

# Database Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    resumes = db.relationship('Resume', backref='user', lazy=True)

class Resume(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    template_id = db.Column(db.String(10), nullable=False)  # Changed to String to support p1, c1, etc.
    template_name = db.Column(db.String(50), nullable=False)
    resume_data = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

# Updated Template mapping with string keys
TEMPLATES = {
    "p1": "Professional Corporate",
    "p2": "Professional Business",     
    "p3": "Professional Executive Pro",
    "p4": "Professional Modern Professional",
    "p5": "Professional Classic",
    "c1": "Creative Designer",
    "c2": "Creative Artistic",
    "c3": "Creative Digital Creative",
    "c4": "Portfolio Plus",
    "c5": "Innovative",
    "m1": "Clean",
    "m2": "Simplicity",
    "m3": "Essentials",
    "m4": "Minimalist Pro",
    "m5": "Whitespace",
    "e1": "Leadership",
    "e2": "C-suite",
    "e3": "Director",
    "e4": "Board Member",
    "e5": "Executive Elite"
}

# Helper function to validate template ID
def is_valid_template_id(template_id):
    """Validate if template_id is in the correct format and exists"""
    return template_id in TEMPLATES

def get_template_style_category(template_id):
    """Get the style category from template ID"""
    if template_id.startswith('p'):
        return 'professional'
    elif template_id.startswith('c'):
        return 'creative'
    elif template_id.startswith('m'):
        return 'minimal'
    elif template_id.startswith('e'):
        return 'executive'
    else:
        return 'professional'  # default

# Enhanced Research Paper Search Functions
def search_papers_with_openrouter(paper_titles):
    """Search for research papers using OpenRouter API"""
    if not paper_titles:
        return []
    
    search_prompt = f"""You are a research paper search assistant. I will provide you with research paper titles, and you need to help find their likely publication links.

Paper titles to search for:
{json.dumps(paper_titles, indent=2)}

For each paper, try to provide:
1. The most likely DOI link (if available)
2. Google Scholar link
3. ArXiv link (if it's a preprint)
4. Publisher's direct link
5. Any other relevant academic database links

Return the results in the following JSON format:
{{
  "papers": [
    {{
      "title": "exact title from input",
      "links": [
        {{
          "type": "DOI",
          "url": "https://doi.org/...",
          "description": "Official DOI link"
        }},
        {{
          "type": "Google Scholar",
          "url": "https://scholar.google.com/...",
          "description": "Google Scholar page"
        }},
        {{
          "type": "ArXiv",
          "url": "https://arxiv.org/...",
          "description": "ArXiv preprint"
        }}
      ],
      "found": true/false
    }}
  ]
}}

If you cannot find specific links for a paper, set "found": false and provide an empty links array.
Only return valid JSON, no markdown formatting."""

    try:
        response_text = call_openrouter_api(search_prompt, model="openai/gpt-4o-mini")
        
        if not response_text:
            return []
        
        # Clean up the response
        raw_json_str = response_text.strip()
        
        if raw_json_str.startswith("```json"):
            raw_json_str = re.sub(r"^```json\s*", "", raw_json_str)
        if raw_json_str.endswith("```"):
            raw_json_str = raw_json_str[:-3].strip()
        
        parsed_result = json.loads(raw_json_str)
        return parsed_result.get('papers', [])
        
    except Exception as e:
        print(f"Error searching papers with OpenRouter: {e}")
        return []

def search_papers_with_serpapi(paper_titles):
    """Search for research papers using SerpAPI as fallback"""
    if not SERPAPI_KEY or not paper_titles:
        return []
    
    papers_with_links = []
    
    for title in paper_titles:
        try:
            # Search Google Scholar via SerpAPI
            params = {
                'engine': 'google_scholar',
                'q': title,
                'api_key': SERPAPI_KEY,
                'num': 3  # Get top 3 results
            }
            
            response = requests.get('https://serpapi.com/search', params=params, timeout=10)
            response.raise_for_status()
            
            data = response.json()
            organic_results = data.get('organic_results', [])
            
            links = []
            found = False
            
            for result in organic_results:
                if result.get('link'):
                    link_info = {
                        'type': 'Google Scholar',
                        'url': result['link'],
                        'description': result.get('title', 'Research paper link')
                    }
                    links.append(link_info)
                    found = True
                
                # Check for PDF links
                if result.get('resources'):
                    for resource in result['resources']:
                        if resource.get('link') and 'pdf' in resource.get('title', '').lower():
                            pdf_link = {
                                'type': 'PDF',
                                'url': resource['link'],
                                'description': 'PDF version'
                            }
                            links.append(pdf_link)
            
            papers_with_links.append({
                'title': title,
                'links': links,
                'found': found
            })
            
        except Exception as e:
            print(f"Error searching '{title}' with SerpAPI: {e}")
            papers_with_links.append({
                'title': title,
                'links': [],
                'found': False
            })
    
    return papers_with_links

def search_research_papers(paper_titles):
    """Search for research papers using OpenRouter first, then SerpAPI as fallback"""
    print(f"Searching for papers: {paper_titles}")
    
    # Try OpenRouter first
    papers_with_links = search_papers_with_openrouter(paper_titles)
    
    # If OpenRouter didn't find links for some papers, try SerpAPI
    if SERPAPI_KEY:
        unfound_papers = []
        for paper in papers_with_links:
            if not paper.get('found', False) or not paper.get('links', []):
                unfound_papers.append(paper['title'])
        
        if unfound_papers:
            print(f"Using SerpAPI fallback for: {unfound_papers}")
            serpapi_results = search_papers_with_serpapi(unfound_papers)
            
            # Merge results
            for i, paper in enumerate(papers_with_links):
                if paper['title'] in unfound_papers:
                    # Find corresponding SerpAPI result
                    for serpapi_paper in serpapi_results:
                        if serpapi_paper['title'] == paper['title']:
                            papers_with_links[i] = serpapi_paper
                            break
    
    return papers_with_links

# Bhashini API Helper Functions
def get_bhashini_auth_token():
    """Get authentication token from Bhashini"""
    if not BHASHINI_USER_ID or not BHASHINI_API_KEY:
        print("Bhashini credentials not found in environment variables.")
        print("Please check your .env file contains:")
        print("BHASHINI_USER_ID=your_user_id")
        print("BHASHINI_API_KEY=your_api_key")
        return None
    
    auth_url = f"{BHASHINI_BASE_URL}/ulca/apis/v0/model/getModelsPipeline"
    headers = {
        "userID": BHASHINI_USER_ID,
        "ulcaApiKey": BHASHINI_API_KEY,
        "Content-Type": "application/json"
    }
    
    # Request for ASR (Automatic Speech Recognition) pipeline
    payload = {
        "pipelineTasks": [
            {
                "taskType": "asr",
                "config": {
                    "language": {
                        "sourceLanguage": "en"
                    }
                }
            }
        ],
        "pipelineRequestConfig": {
            "pipelineId": "64392f96daac500b55c543cd"
        }
    }
    
    try:
        print("Attempting to authenticate with Bhashini...")
        response = requests.post(auth_url, headers=headers, json=payload, timeout=30)
        response.raise_for_status()
        
        result = response.json()
        print("Bhashini authentication successful!")
        
        # Extract the service ID and authorization details
        if result.get("pipelineResponseConfig"):
            pipeline_config = result["pipelineResponseConfig"][0]
            service_id = pipeline_config["config"][0]["serviceId"]
            auth_token = result.get("pipelineInferenceAPIEndPoint", {}).get("inferenceApiKey", {}).get("value")
            compute_endpoint = result.get("pipelineInferenceAPIEndPoint", {}).get("callbackUrl")
            
            return {
                "serviceId": service_id,
                "authToken": auth_token,
                "computeEndpoint": compute_endpoint or BHASHINI_COMPUTE_URL
            }
        
        return None
        
    except requests.exceptions.RequestException as e:
        print(f"Error getting Bhashini auth token: {e}")
        if hasattr(e, 'response') and e.response is not None:
            print(f"Response status: {e.response.status_code}")
            print(f"Response text: {e.response.text}")
        return None

def transcribe_with_bhashini(audio_file_path, language="en"):
    """Transcribe audio using Bhashini API"""
    
    # Get authentication details
    auth_details = get_bhashini_auth_token()
    if not auth_details:
        print("Failed to get Bhashini authentication")
        return None
    
    # Convert audio to base64
    try:
        with open(audio_file_path, "rb") as audio_file:
            audio_base64 = base64.b64encode(audio_file.read()).decode('utf-8')
    except Exception as e:
        print(f"Error reading audio file: {e}")
        return None
    
    # Prepare the request payload
    payload = {
        "pipelineTasks": [
            {
                "taskType": "asr",
                "config": {
                    "language": {
                        "sourceLanguage": language
                    },
                    "serviceId": auth_details["serviceId"],
                    "audioFormat": "wav",
                    "samplingRate": 16000
                }
            }
        ],
        "inputData": {
            "audio": [
                {
                    "audioContent": audio_base64
                }
            ]
        }
    }
    
    headers = {
        "Content-Type": "application/json"
    }
    
    # Add authorization if available
    if auth_details.get("authToken"):
        headers["Authorization"] = auth_details["authToken"]
    
    try:
        print("Sending audio to Bhashini for transcription...")
        response = requests.post(
            auth_details["computeEndpoint"],
            headers=headers,
            json=payload,
            timeout=60
        )
        response.raise_for_status()
        
        result = response.json()
        print("Bhashini transcription completed!")
        
        # Extract transcribed text
        if result.get("pipelineResponse") and len(result["pipelineResponse"]) > 0:
            asr_response = result["pipelineResponse"][0]
            if asr_response.get("output") and len(asr_response["output"]) > 0:
                transcribed_text = asr_response["output"][0].get("source", "")
                return transcribed_text
        
        print("No transcription found in Bhashini response")
        return None
        
    except requests.exceptions.RequestException as e:
        print(f"Error calling Bhashini API: {e}")
        if hasattr(e, 'response') and e.response is not None:
            print(f"Response status: {e.response.status_code}")
            print(f"Response text: {e.response.text}")
        return None
    except Exception as e:
        print(f"Error processing Bhashini response: {e}")
        return None

def convert_audio_for_bhashini(audio_file_path):
    """Convert audio file to format suitable for Bhashini (WAV, 16kHz)"""
    if not ffmpeg_available:
        print("FFmpeg not available. Trying to use original file...")
        # If it's already a WAV file, try to use it as-is
        if audio_file_path.lower().endswith('.wav'):
            return audio_file_path
        else:
            print("Cannot convert non-WAV files without FFmpeg")
            return None
    
    try:
        # Load audio file
        audio = AudioSegment.from_file(audio_file_path)
        
        # Convert to mono, 16kHz WAV
        audio = audio.set_channels(1)  # Mono
        audio = audio.set_frame_rate(16000)  # 16kHz sampling rate
        
        # Create temporary WAV file
        wav_path = audio_file_path.replace(os.path.splitext(audio_file_path)[1], "_converted.wav")
        audio.export(wav_path, format="wav")
        
        return wav_path
        
    except Exception as e:
        print(f"Error converting audio: {e}")
        return None

# Fallback transcription using SpeechRecognition (Google)
def transcribe_with_google_fallback(audio_file_path):
    """Fallback transcription using Google Speech Recognition"""
    recognizer = sr.Recognizer()
    
    try:
        # Convert to WAV if needed and possible
        if not audio_file_path.lower().endswith('.wav') and ffmpeg_available:
            audio = AudioSegment.from_file(audio_file_path)
            wav_io = io.BytesIO()
            audio.export(wav_io, format="wav")
            wav_io.seek(0)
            
            with sr.AudioFile(wav_io) as source:
                audio_data = recognizer.record(source)
        else:
            with sr.AudioFile(audio_file_path) as source:
                audio_data = recognizer.record(source)
        
        # Use Google's speech recognition
        print("Using Google Speech Recognition...")
        text = recognizer.recognize_google(audio_data)
        return text
        
    except Exception as e:
        print(f"Error in Google speech recognition: {e}")
        return None

# Helper Functions
def call_openrouter_api(prompt, model="openai/gpt-4o-mini"):
    """Call OpenRouter API with the given prompt"""
    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3001",
        "X-Title": "Resume Builder App"
    }
    
    data = {
        "model": model,
        "messages": [
            {
                "role": "user",
                "content": prompt
            }
        ],
        "temperature": 0.3,
        "max_tokens": 2000
    }
    
    try:
        response = requests.post(
            f"{OPENROUTER_BASE_URL}/chat/completions",
            headers=headers,
            json=data,
            timeout=30
        )
        response.raise_for_status()
        
        result = response.json()
        return result['choices'][0]['message']['content']
        
    except requests.exceptions.RequestException as e:
        print(f"Error calling OpenRouter API: {e}")
        return None
    except (KeyError, IndexError) as e:
        print(f"Error parsing OpenRouter response: {e}")
        return None

def convert_text_to_json(text):
    """Enhanced function to convert text to JSON with better publication extraction"""
    resume_structure = {
        "personalInfo": {
            "name": "",
            "title": "",
            "email": "",
            "phone": "",
            "location": "",
            "linkedin": ""
        },
        "summary": "",
        "experience": [
            {
                "title": "",
                "company": "",
                "dates": "",
                "location": "",
                "description": ""
            }
        ],
        "education": [
            {
                "degree": "",
                "institution": "",
                "dates": "",
                "location": ""
            }
        ],
        "skills": [],
        "publications": [
            {
                "title": "",
                "authors": "",
                "journal": "",
                "year": "",
                "links": []
            }
        ]
    }
    
    prompt = f"""You are a professional resume writer with expertise in extracting academic publication information. Extract relevant information from the following transcript and format it into a JSON resume.

Here's the transcript: {text}

Please format the response as a valid JSON object with the following structure:
{json.dumps(resume_structure, indent=2)}

IMPORTANT INSTRUCTIONS FOR PUBLICATIONS:
1. Pay special attention to any mentions of research papers, publications, academic work, or papers the person has written
2. When extracting publications, carefully listen for:
   - Paper titles (often mentioned as "I published a paper called..." or "My paper on..." or "I wrote a paper about...")
   - Author names (the person speaking is likely one of the authors, but they may mention co-authors)
   - Publication venues (journal names, conference names like "IEEE", "ACM", "Nature", "CVPR", "ICML", etc.)
   - Publication years (often mentioned as "in 2023", "last year", "published in 2022", etc.)
   - Any collaboration mentions ("with my colleague John", "co-authored with", "joint work with")

3. For each publication mentioned:
   - Extract the exact title as mentioned
   - Include ALL authors mentioned (if the speaker doesn't mention co-authors, just put their name)
   - Extract the journal/conference name if mentioned
   - Extract the publication year if mentioned
   - Leave the links array empty (will be populated by search function)

4. Common patterns to listen for:
   - "I published a paper on [topic] in [journal] in [year]"
   - "My research on [topic] was published in [venue]"
   - "I co-authored a paper with [names] about [topic]"
   - "Our paper titled [title] appeared in [venue]"
   - "I have [number] publications in [field]"

5. If the person mentions multiple papers, create separate entries for each one

6. If specific details are not mentioned, leave those fields empty but still create the publication entry if a paper is mentioned

Fill in all other relevant fields (personal info, experience, education, skills) based on the transcript. If information for a field is not available, leave it empty.

For the experience and education sections, create as many entries as mentioned in the transcript.
For skills, extract all relevant skills mentioned.

ONLY return the JSON object, nothing else. Do not include any markdown formatting or code blocks."""

    try:
        response_text = call_openrouter_api(prompt, model="openai/gpt-4o-mini")
        
        if not response_text:
            return None
        
        # Clean up the response
        raw_json_str = response_text.strip()
        
        if raw_json_str.startswith("```json"):
            raw_json_str = re.sub(r"^```json\s*", "", raw_json_str)
        if raw_json_str.endswith("```"):
            raw_json_str = raw_json_str[:-3].strip()
        
        parsed_json = json.loads(raw_json_str)
        
        # Search for publication links if publications are mentioned
        if parsed_json.get('publications') and len(parsed_json['publications']) > 0:
            paper_titles = []
            for pub in parsed_json['publications']:
                if pub.get('title') and pub['title'].strip():
                    paper_titles.append(pub['title'])
            
            if paper_titles:
                print(f"Found {len(paper_titles)} publications from audio, searching for links...")
                print(f"Publication titles: {paper_titles}")
                
                # Log the extracted publication details before search
                for i, pub in enumerate(parsed_json['publications']):
                    print(f"Publication {i+1}:")
                    print(f"  Title: {pub.get('title', 'Not specified')}")
                    print(f"  Authors: {pub.get('authors', 'Not specified')}")
                    print(f"  Journal: {pub.get('journal', 'Not specified')}")
                    print(f"  Year: {pub.get('year', 'Not specified')}")
                
                papers_with_links = search_research_papers(paper_titles)
                
                # Update publications with found links (preserve existing author/year info)
                for i, pub in enumerate(parsed_json['publications']):
                    for paper in papers_with_links:
                        if paper['title'] == pub['title']:
                            # Only update links, preserve author and year info from audio
                            pub['links'] = paper.get('links', [])
                            print(f"Added {len(pub['links'])} links to publication: {pub['title']}")
                            break
        
        return parsed_json
        
    except json.JSONDecodeError as e:
        print(f"Error parsing JSON: {e}")
        print(f"Raw response: {response_text}")
        return None
    except Exception as e:
        print(f"Error in convert_text_to_json: {e}")
        return None

def generate_pdf(resume_data, template_id):
    """Generate PDF from resume data based on template"""
    # Create a temporary file to store the PDF
    with tempfile.NamedTemporaryFile(suffix='.pdf', delete=False) as temp_file:
        pdf_path = temp_file.name
    
    # Get template style category and name
    template_name = TEMPLATES.get(template_id, "Professional Classic")
    style_category = get_template_style_category(template_id)
    
    # Create PDF document
    doc = SimpleDocTemplate(pdf_path, pagesize=letter)
    styles = getSampleStyleSheet()
    elements = []
    
    # Add custom styles based on template category
    if style_category == "professional":
        title_style = ParagraphStyle(
            'Title',
            parent=styles['Heading1'],
            fontSize=16,
            textColor=colors.navy,
            spaceAfter=12
        )
        heading_style = ParagraphStyle(
            'Heading',
            parent=styles['Heading2'],
            fontSize=12,
            textColor=colors.navy,
            spaceAfter=6
        )
        normal_style = styles['Normal']
        
    elif style_category == "creative":
        title_style = ParagraphStyle(
            'Title',
            parent=styles['Heading1'],
            fontSize=18,
            textColor=colors.purple,
            spaceAfter=12
        )
        heading_style = ParagraphStyle(
            'Heading',
            parent=styles['Heading2'],
            fontSize=14,
            textColor=colors.purple,
            spaceAfter=6
        )
        normal_style = styles['Normal']
        
    elif style_category == "minimal":
        title_style = ParagraphStyle(
            'Title',
            parent=styles['Heading1'],
            fontSize=16,
            textColor=colors.black,
            spaceAfter=12
        )
        heading_style = ParagraphStyle(
            'Heading',
            parent=styles['Heading2'],
            fontSize=12,
            textColor=colors.black,
            spaceAfter=6
        )
        normal_style = styles['Normal']
        
    else:  # executive
        title_style = ParagraphStyle(
            'Title',
            parent=styles['Heading1'],
            fontSize=18,
            textColor=colors.darkblue,
            spaceAfter=12
        )
        heading_style = ParagraphStyle(
            'Heading',
            parent=styles['Heading2'],
            fontSize=14,
            textColor=colors.darkblue,
            spaceAfter=6
        )
        normal_style = styles['Normal']
    
    # Personal Information
    personal_info = resume_data.get('personalInfo', {})
    elements.append(Paragraph(personal_info.get('name', ''), title_style))
    
    # Contact information
    contact_info = []
    if personal_info.get('email'):
        contact_info.append(personal_info['email'])
    if personal_info.get('phone'):
        contact_info.append(personal_info['phone'])
    if personal_info.get('location'):
        contact_info.append(personal_info['location'])
    
    if contact_info:
        elements.append(Paragraph(' | '.join(contact_info), normal_style))
    
    elements.append(Spacer(1, 0.2 * inch))
    
    # Summary
    if resume_data.get('summary'):
        elements.append(Paragraph('PROFESSIONAL SUMMARY', heading_style))
        elements.append(Paragraph(resume_data['summary'], normal_style))
        elements.append(Spacer(1, 0.2 * inch))
    
    # Experience
    if resume_data.get('experience'):
        elements.append(Paragraph('EXPERIENCE', heading_style))
        for exp in resume_data['experience']:
            job_title = exp.get('title', '')
            company = exp.get('company', '')
            dates = exp.get('dates', '')
            location = exp.get('location', '')
            
            job_header = f"<b>{job_title}</b>"
            if company:
                job_header += f", {company}"
            
            elements.append(Paragraph(job_header, normal_style))
            
            if dates or location:
                date_loc = []
                if dates:
                    date_loc.append(dates)
                if location:
                    date_loc.append(location)
                elements.append(Paragraph(' | '.join(date_loc), normal_style))
            
            if exp.get('description'):
                elements.append(Paragraph(exp['description'], normal_style))
            
            elements.append(Spacer(1, 0.1 * inch))
        
        elements.append(Spacer(1, 0.1 * inch))
    
    # Education
    if resume_data.get('education'):
        elements.append(Paragraph('EDUCATION', heading_style))
        for edu in resume_data['education']:
            degree = edu.get('degree', '')
            institution = edu.get('institution', '')
            dates = edu.get('dates', '')
            location = edu.get('location', '')
            
            edu_header = f"<b>{degree}</b>"
            if institution:
                edu_header += f", {institution}"
            
            elements.append(Paragraph(edu_header, normal_style))
            
            if dates or location:
                date_loc = []
                if dates:
                    date_loc.append(dates)
                if location:
                    date_loc.append(location)
                elements.append(Paragraph(' | '.join(date_loc), normal_style))
            
            elements.append(Spacer(1, 0.1 * inch))
        
        elements.append(Spacer(1, 0.1 * inch))
    
    # Publications - Enhanced with author names and years
    if resume_data.get('publications') and len(resume_data['publications']) > 0:
        elements.append(Paragraph('PUBLICATIONS', heading_style))
        for pub in resume_data['publications']:
            title = pub.get('title', '')
            authors = pub.get('authors', '')
            journal = pub.get('journal', '')
            year = pub.get('year', '')
            links = pub.get('links', [])
            
            # Publication title
            if title:
                elements.append(Paragraph(f"<b>{title}</b>", normal_style))
            
            # Authors and publication details
            pub_info = []
            if authors:
                pub_info.append(f"Authors: {authors}")
            if journal:
                pub_info.append(f"Published in: {journal}")
            if year:
                pub_info.append(f"Year: {year}")
            
            if pub_info:
                elements.append(Paragraph(' | '.join(pub_info), normal_style))
            
            # Links
            if links:
                link_texts = []
                for link in links:
                    link_text = f"<a href='{link['url']}'>{link['type']}</a>"
                    link_texts.append(link_text)
                elements.append(Paragraph(f"Links: {' | '.join(link_texts)}", normal_style))
            
            elements.append(Spacer(1, 0.1 * inch))
        
        elements.append(Spacer(1, 0.1 * inch))
    
    # Skills
    if resume_data.get('skills'):
        elements.append(Paragraph('SKILLS', heading_style))
        skills_text = ', '.join(resume_data['skills'])
        elements.append(Paragraph(skills_text, normal_style))
    
    # Build the PDF
    doc.build(elements)
    
    return pdf_path

# Routes
@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.json
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    
    if not username or not email or not password:
        return jsonify({'message': 'Missing required fields'}), 400
    
    # Check if user already exists
    if User.query.filter_by(username=username).first() or User.query.filter_by(email=email).first():
        return jsonify({'message': 'Username or email already exists'}), 409
    
    # Create new user
    hashed_password = generate_password_hash(password)
    new_user = User(username=username, email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({'message': 'User created successfully'}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        return jsonify({'message': 'Missing email or password'}), 400
    
    # Find user by email
    user = User.query.filter_by(email=email).first()
    
    if not user or not check_password_hash(user.password, password):
        return jsonify({'message': 'Invalid email or password'}), 401
    
    # Create access token
    access_token = create_access_token(identity=str(user.id))
    
    response = jsonify({'message': 'Login successful'})
    set_access_cookies(response, access_token)
    return response, 200

@app.route('/api/logout', methods=['POST'])
def logout():
    response = jsonify({'message': 'Logout successful'})
    unset_jwt_cookies(response)
    return response, 200

@app.route('/api/check-auth', methods=['GET'])
@jwt_required()
def check_auth():
    current_user_id = get_jwt_identity()
    return jsonify({'authenticated': True, 'user_id': current_user_id}), 200

@app.route('/api/process-audio', methods=['POST'])
@jwt_required()
def process_audio():
    current_user_id = get_jwt_identity()
    
    if 'audio' not in request.files:
        return jsonify({'message': 'No audio file provided'}), 400
    
    audio_file = request.files['audio']
    template_id = request.form.get('templateId', 'p1')  # Default to p1 instead of '1'
    language = request.form.get('language', 'en')
    
    app.logger.debug("Starting audio processing")
    
    if not audio_file.filename:
        return jsonify({'message': 'No audio file selected'}), 400
    
    # Validate templateId
    if not is_valid_template_id(template_id):
        app.logger.error(f"Invalid templateId: {template_id}")
        return jsonify({'message': f"Invalid templateId: {template_id}. Valid IDs: {list(TEMPLATES.keys())}"}), 400
    
    # Save the uploaded file temporarily
    file_ext = os.path.splitext(audio_file.filename)[1]
    audio_path = os.path.join(app.config['UPLOAD_FOLDER'], f"{uuid.uuid4()}{file_ext}")
    audio_file.save(audio_path)
    
    converted_audio_path = None
    transcript = None
    
    try:
        # Try Bhashini first if configured
        if BHASHINI_USER_ID and BHASHINI_API_KEY:
            print("Attempting transcription with Bhashini...")
            converted_audio_path = convert_audio_for_bhashini(audio_path)
            if converted_audio_path:
                transcript = transcribe_with_bhashini(converted_audio_path, language)
        
        # Fallback to Google Speech Recognition if Bhashini fails
        if not transcript:
            print("Bhashini failed or not configured. Falling back to Google Speech Recognition...")
            transcript = transcribe_with_google_fallback(audio_path)
        
        if not transcript:
            return jsonify({'message': 'Failed to transcribe audio with any service'}), 500
        
        print(f"Transcript: {transcript}")
        
        # Convert the transcription to JSON using OpenRouter with enhanced publication extraction
        response_json = convert_text_to_json(transcript)
        
        if not response_json:
            return jsonify({'message': 'Failed to process transcript with OpenRouter'}), 500
        
        # Create a new resume entry in the database
        new_resume = Resume(
            user_id=current_user_id,
            template_id=template_id,
            template_name=TEMPLATES.get(template_id, "Professional Classic"),
            resume_data=json.dumps(response_json)
        )
        db.session.add(new_resume)
        db.session.commit()
        
        return jsonify({
            'message': 'Resume created successfully',
            'resumeId': new_resume.id,
            'data': response_json,
            'transcript': transcript
        }), 201
        
    except Exception as e:
        app.logger.error(f"Error: {e}")
        return jsonify({'message': f'Error processing audio: {str(e)}'}), 500
        
    finally:
        # Clean up temporary files
        if os.path.exists(audio_path):
            os.remove(audio_path)
        if converted_audio_path and os.path.exists(converted_audio_path):
            os.remove(converted_audio_path)

@app.route('/api/resume/<resume_id>', methods=['GET'])
@jwt_required()
def get_resume(resume_id):
    current_user_id = get_jwt_identity()
    
    resume = Resume.query.filter_by(id=resume_id, user_id=current_user_id).first()
    
    if not resume:
        return jsonify({'message': 'Resume not found'}), 404
    
    resume_data = json.loads(resume.resume_data)
    resume_data['id'] = resume.id
    resume_data['templateId'] = resume.template_id
    resume_data['templateName'] = resume.template_name
    resume_data['createdAt'] = resume.created_at.isoformat()
    resume_data['updatedAt'] = resume.updated_at.isoformat()
    
    return jsonify(resume_data), 200

@app.route('/api/resume/<resume_id>', methods=['PUT'])
@jwt_required()
def update_resume(resume_id):
    current_user_id = get_jwt_identity()
    
    resume = Resume.query.filter_by(id=resume_id, user_id=current_user_id).first()
    
    if not resume:
        return jsonify({'message': 'Resume not found'}), 404
    
    data = request.json
    
    # Update resume data
    resume.resume_data = json.dumps(data)
    resume.updated_at = datetime.datetime.utcnow()
    
    db.session.commit()
    
    return jsonify({'message': 'Resume updated successfully'}), 200

@app.route('/api/process-audio-edit', methods=['POST'])
@jwt_required()
def process_audio_edit():
    current_user_id = get_jwt_identity()
    
    if 'audio' not in request.files:
        return jsonify({'message': 'No audio file provided'}), 400
    
    audio_file = request.files['audio']
    resume_data_str = request.form.get('resumeData')
    language = request.form.get('language', 'en')
    
    app.logger.debug("Starting audio edit processing")
    
    if not audio_file.filename:
        return jsonify({'message': 'No audio file selected'}), 400
    
    if not resume_data_str:
        return jsonify({'message': 'No resume data provided'}), 400
    
    try:
        # Parse the current resume data
        current_resume_data = json.loads(resume_data_str)
    except json.JSONDecodeError:
        return jsonify({'message': 'Invalid resume data format'}), 400
    
    # Save the uploaded file temporarily
    file_ext = os.path.splitext(audio_file.filename)[1]
    audio_path = os.path.join(app.config['UPLOAD_FOLDER'], f"{uuid.uuid4()}{file_ext}")
    audio_file.save(audio_path)
    
    converted_audio_path = None
    transcript = None
    
    try:
        # Try Bhashini first if configured
        if BHASHINI_USER_ID and BHASHINI_API_KEY:
            print("Attempting transcription with Bhashini...")
            converted_audio_path = convert_audio_for_bhashini(audio_path)
            if converted_audio_path:
                transcript = transcribe_with_bhashini(converted_audio_path, language)
        
        # Fallback to Google Speech Recognition if Bhashini fails
        if not transcript:
            print("Bhashini failed or not configured. Falling back to Google Speech Recognition...")
            transcript = transcribe_with_google_fallback(audio_path)
        
        if not transcript:
            return jsonify({'message': 'Failed to transcribe audio with any service'}), 500
        
        print(f"Edit command transcript: {transcript}")
        
        # Process the edit command and apply changes to resume data
        result = apply_audio_edits_to_resume(transcript, current_resume_data)
        
        if not result:
            return jsonify({'message': 'Failed to process edit commands'}), 500
        
        return jsonify({
            'message': 'Audio edit processed successfully',
            'transcript': transcript,
            'updatedData': result['updatedData'],
            'changes': result['changes']
        }), 200
        
    except Exception as e:
        app.logger.error(f"Error: {e}")
        return jsonify({'message': f'Error processing audio edit: {str(e)}'}), 500
        
    finally:
        # Clean up temporary files
        if os.path.exists(audio_path):
            os.remove(audio_path)
        if converted_audio_path and os.path.exists(converted_audio_path):
            os.remove(converted_audio_path)

def apply_audio_edits_to_resume(transcript, current_resume_data):
    """Enhanced function to apply audio edit commands to resume data with better publication handling"""
    
    prompt = f"""You are a professional resume editor AI. You will receive a voice command transcript and current resume data in JSON format. Your task is to:

1. Understand the editing instructions from the transcript
2. Apply the requested changes to the resume data
3. If the user mentions research papers or publications, extract ALL details mentioned (title, authors, journal, year) and add to publications section
4. Return the updated resume data and a list of changes made

Current Resume Data:
{json.dumps(current_resume_data, indent=2)}

Voice Command Transcript:
"{transcript}"

IMPORTANT INSTRUCTIONS FOR PUBLICATION EDITS:
- If the user mentions adding a publication, extract:
  * Paper title (exactly as mentioned)
  * Authors (including the user and any co-authors mentioned)
  * Journal/conference name (if mentioned)
  * Publication year (if mentioned)
  * Leave links array empty for now (will be populated by search)

- Common patterns to listen for:
  * "Add my paper on [topic]"
  * "I published a paper called [title] with [authors] in [journal] in [year]"
  * "Include my research on [topic] published in [venue]"
  * "Add the paper I co-authored with [names]"

Please analyze the voice command and apply the requested changes to the resume data. Return your response in the following JSON format:

{{
  "updatedData": {{
    // Updated resume data with changes applied
    "personalInfo": {{
      "name": "",
      "title": "",
      "email": "",
      "phone": "",
      "location": "",
      "linkedin": ""
    }},
    "summary": "",
    "experience": [
      {{
        "title": "",
        "company": "",
        "dates": "",
        "location": "",
        "description": ""
      }}
    ],
    "education": [
      {{
        "degree": "",
        "institution": "",
        "dates": "",
        "location": ""
      }}
    ],
    "skills": [],
    "publications": [
      {{
        "title": "",
        "authors": "",
        "journal": "",
        "year": "",
        "links": []
      }}
    ]
  }},
  "changes": [
    {{
      "type": "add|remove|modify",
      "section": "skills|personalInfo|experience|education|summary|publications",
      "field": "specific field name if applicable",
      "oldValue": "previous value if modified/removed",
      "newValue": "new value if added/modified",
      "description": "Human readable description of the change"
    }}
  ],
  "publicationsToSearch": [
    // Array of publication titles that need link searching
    "Paper Title 1",
    "Paper Title 2"
  ]
}}

Examples of commands you should handle:
- "Remove Python from my skills" -> Remove "Python" from skills array
- "Add React and Node.js to my skills" -> Add these to skills array
- "Change my location to New York" -> Update personalInfo.location
- "Update my job title to Senior Developer" -> Update personalInfo.title
- "Change my current company to Google" -> Update the most recent experience entry
- "Add a new skill called Machine Learning" -> Add to skills array
- "Remove my second job" -> Remove the second item from experience array
- "Update my summary to say I'm passionate about AI" -> Modify the summary field
- "I published a paper called 'Deep Learning in Healthcare' with John Smith in IEEE Transactions in 2023" -> Add to publications section with all details
- "Add my research paper on Machine Learning Algorithms published in Nature last year" -> Add to publications section
- "Include the paper I co-authored with Maria Garcia on Computer Vision" -> Add to publications section

IMPORTANT: 
- Only return valid JSON, no markdown formatting or code blocks
- Preserve all existing data that wasn't mentioned in the command
- For skills, always return an array of strings
- Be precise about which changes you made
- If publications are mentioned, extract ALL available details (title, authors, journal, year)
- If the command is unclear or cannot be executed, explain in the changes array"""

    try:
        response_text = call_openrouter_api(prompt, model="openai/gpt-4o-mini")
        
        if not response_text:
            return None
        
        # Clean up the response
        raw_json_str = response_text.strip()
        
        # Remove markdown formatting if present
        if raw_json_str.startswith("```json"):
            raw_json_str = re.sub(r"^```json\s*", "", raw_json_str)
        if raw_json_str.endswith("```"):
            raw_json_str = raw_json_str[:-3].strip()
        
        # Parse the JSON response
        parsed_result = json.loads(raw_json_str)
        
        # Validate the response structure
        if 'updatedData' not in parsed_result or 'changes' not in parsed_result:
            print("Invalid response structure from OpenRouter")
            return None
        
        # Ensure skills is always an array
        if 'skills' in parsed_result['updatedData']:
            skills = parsed_result['updatedData']['skills']
            if isinstance(skills, str):
                parsed_result['updatedData']['skills'] = [s.strip() for s in skills.split(',') if s.strip()]
        
        # Search for publication links if new publications were added
        publications_to_search = parsed_result.get('publicationsToSearch', [])
        if publications_to_search:
            print(f"Searching for publication links: {publications_to_search}")
            papers_with_links = search_research_papers(publications_to_search)
            
            # Update publications with found links (preserve existing author/year info from audio)
            if 'publications' in parsed_result['updatedData']:
                for pub in parsed_result['updatedData']['publications']:
                    for paper in papers_with_links:
                        if paper['title'] == pub['title']:
                            # Only update links, preserve author and year info from audio
                            pub['links'] = paper.get('links', [])
                            print(f"Added {len(pub['links'])} links to publication: {pub['title']}")
                            break
        
        return parsed_result
        
    except json.JSONDecodeError as e:
        print(f"Error parsing JSON from OpenRouter: {e}")
        print(f"Raw response: {response_text}")
        return None
    except Exception as e:
        print(f"Error in apply_audio_edits_to_resume: {e}")
        return None

@app.route('/api/resume/<resume_id>', methods=['DELETE'])
@jwt_required()
def delete_resume(resume_id):
    current_user_id = get_jwt_identity()
    
    resume = Resume.query.filter_by(id=resume_id, user_id=current_user_id).first()
    
    if not resume:
        return jsonify({'message': 'Resume not found'}), 404
    
    db.session.delete(resume)
    db.session.commit()
    
    return jsonify({'message': 'Resume deleted successfully'}), 200

@app.route('/api/resume/<resume_id>/download', methods=['GET'])
@jwt_required()
def download_resume(resume_id):
    current_user_id = get_jwt_identity()
    
    resume = Resume.query.filter_by(id=resume_id, user_id=current_user_id).first()
    
    if not resume:
        return jsonify({'message': 'Resume not found'}), 404
    
    resume_data = json.loads(resume.resume_data)
    
    # Generate PDF
    pdf_path = generate_pdf(resume_data, resume.template_id)
    
    try:
        return send_file(
            pdf_path,
            as_attachment=True,
            download_name=f"resume_{resume_id}.pdf",
            mimetype='application/pdf'
        )
    finally:
        # Clean up temporary file after sending
        if os.path.exists(pdf_path):
            os.unlink(pdf_path)

@app.route('/api/resumes', methods=['GET'])
@jwt_required()
def get_user_resumes():
    current_user_id = get_jwt_identity()
    
    resumes = Resume.query.filter_by(user_id=current_user_id).order_by(Resume.updated_at.desc()).all()
    
    resume_list = []
    for resume in resumes:
        resume_list.append({
            'id': resume.id,
            'templateId': resume.template_id,
            'templateName': resume.template_name,
            'createdAt': resume.created_at.isoformat(),
            'updatedAt': resume.updated_at.isoformat()
        })
    
    return jsonify({'resumes': resume_list}), 200

@app.route('/api/preview-template/<template_id>', methods=['GET'])
def preview_template(template_id):
    if not is_valid_template_id(template_id):
        return jsonify({'message': f'Invalid template ID: {template_id}'}), 400
    
    return jsonify({
        'message': f'Preview for template {template_id} - {TEMPLATES.get(template_id)}',
        'templateId': template_id,
        'templateName': TEMPLATES.get(template_id),
        'category': get_template_style_category(template_id)
    }), 200

@app.route('/api/templates', methods=['GET'])
def get_templates():
    """Get all available templates"""
    template_list = []
    for template_id, template_name in TEMPLATES.items():
        template_list.append({
            'id': template_id,
            'name': template_name,
            'category': get_template_style_category(template_id)
        })
    
    return jsonify({'templates': template_list}), 200

# New endpoint to manually search for research papers
@app.route('/api/search-publications', methods=['POST'])
@jwt_required()
def search_publications():
    """Manually search for research paper links"""
    data = request.json
    paper_titles = data.get('titles', [])
    
    if not paper_titles:
        return jsonify({'message': 'No paper titles provided'}), 400
    
    try:
        papers_with_links = search_research_papers(paper_titles)
        return jsonify({
            'message': 'Search completed',
            'papers': papers_with_links
        }), 200
        
    except Exception as e:
        return jsonify({'message': f'Error searching publications: {str(e)}'}), 500

# Test endpoints
@app.route('/api/test-bhashini', methods=['GET'])
def test_bhashini():
    """Test endpoint to check Bhashini API connectivity"""
    auth_details = get_bhashini_auth_token()
    if auth_details:
        return jsonify({
            'message': 'Bhashini API connection successful',
            'serviceId': auth_details.get('serviceId'),
            'hasAuthToken': bool(auth_details.get('authToken'))
        }), 200
    else:
        return jsonify({'message': 'Failed to connect to Bhashini API'}), 500

@app.route('/api/test-serpapi', methods=['GET'])
def test_serpapi():
    """Test endpoint to check SerpAPI connectivity"""
    if not SERPAPI_KEY:
        return jsonify({'message': 'SerpAPI key not configured'}), 400
    
    try:
        # Test search with a simple query
        params = {
            'engine': 'google_scholar',
            'q': 'machine learning',
            'api_key': SERPAPI_KEY,
            'num': 1
        }
        
        response = requests.get('https://serpapi.com/search', params=params, timeout=10)
        response.raise_for_status()
        
        return jsonify({
            'message': 'SerpAPI connection successful',
            'status': response.status_code
        }), 200
        
    except Exception as e:
        return jsonify({'message': f'SerpAPI test failed: {str(e)}'}), 500

@app.route('/api/system-status', methods=['GET'])
def system_status():
    """Check system status"""
    return jsonify({
        'ffmpeg_available': ffmpeg_available,
        'bhashini_configured': bool(BHASHINI_USER_ID and BHASHINI_API_KEY),
        'serpapi_configured': bool(SERPAPI_KEY),
        'openrouter_configured': bool(OPENROUTER_API_KEY),
        'database_type': 'SQLite' if 'sqlite' in app.config['SQLALCHEMY_DATABASE_URI'] else 'MySQL',
        'bhashini_user_id': BHASHINI_USER_ID,
        'bhashini_api_key_set': bool(BHASHINI_API_KEY),
        'serpapi_key_set': bool(SERPAPI_KEY),
        'available_templates': list(TEMPLATES.keys()),
        'template_count': len(TEMPLATES)
    }), 200

# Create database tables
with app.app_context():
    try:
        db.create_all()
        print("Database tables created successfully")
    except Exception as e:
        print(f"Error creating database tables: {e}")

if __name__ == '__main__':
    print("=== System Status ===")
    print(f"FFmpeg available: {ffmpeg_available}")
    print(f"Bhashini configured: {bool(BHASHINI_USER_ID and BHASHINI_API_KEY)}")
    print(f"SerpAPI configured: {bool(SERPAPI_KEY)}")
    print(f"OpenRouter configured: {bool(OPENROUTER_API_KEY)}")
    print(f"Database: {'SQLite' if 'sqlite' in app.config['SQLALCHEMY_DATABASE_URI'] else 'MySQL'}")
    if BHASHINI_USER_ID:
        print(f"Bhashini User ID: {BHASHINI_USER_ID}")
    if BHASHINI_API_KEY:
        print(f"Bhashini API Key: {BHASHINI_API_KEY[:10]}...")
    if SERPAPI_KEY:
        print(f"SerpAPI Key: {SERPAPI_KEY[:10]}...")
    print(f"Available Templates: {list(TEMPLATES.keys())}")
    print("====================")
    
    serve(app, host='0.0.0.0', port=5000)
