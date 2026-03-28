# VocalResume - AI-Powered Voice-to-Resume Generator

> Transform your voice into a professional resume in minutes! VocalResume uses AI-powered speech recognition and natural language processing to create beautifully formatted resumes from audio recordings in multiple Indian languages.

## Features

### Core Features
- ** Voice Recording**: Record your resume details directly in the browser
- ** Audio Upload**: Upload pre-recorded audio files (MP3, WAV)
- ** Multi-Language Support**: Supports 10+ Indian languages including Hindi, Tamil, Telugu, Kannada, Malayalam, Bengali, Gujarati, Marathi, Punjabi, and English
- ** AI-Powered Processing**: Uses Google Gemini AI and Bhashini API for transcription and structured data extraction
- ** Professional Templates**: Choose from multiple professionally designed resume templates
- ** Live Editing**: Edit and customize your resume after generation
- ** PDF Export**: Download your resume as a high-quality PDF
- ** User Authentication**: Secure login/signup with JWT-based authentication
- ** Resume Management**: Save, edit, and manage multiple resumes

### Available Templates
1. **Professional** - Classic corporate design
2. **Creative** - Modern and colorful layout
3. **Minimal** - Clean and simple design
4. **Executive** - Premium executive style

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (Next.js)                    │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Login   │  │Templates │  │  Audio   │  │ Preview  │   │
│  │  Signup  │  │ Gallery  │  │  Input   │  │  & Edit  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↕ REST API
┌─────────────────────────────────────────────────────────────┐
│                     Backend (Flask)                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │     Auth     │  │    Audio     │  │   Resume     │     │
│  │   Service    │  │  Processing  │  │  Generator   │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Bhashini   │  │    Gemini    │  │   SQLite/    │     │
│  │     API      │  │      AI      │  │    MySQL     │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

## Quick Start

### Prerequisites

- **Node.js** 18+ and npm/pnpm
- **Python** 3.11+
- **MySQL** ( SQLite works for development)
- **Google Gemini API Key**
- **Bhashini API Credentials**

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/BhashiniVocalResume.git
cd BhashiniVocalResume
```

#### 2. Frontend Setup

```bash
# Install dependencies
npm install
# or
pnpm install

# Create environment file
cp .env.example .env.local

# Add your environment variables
echo "NEXT_PUBLIC_API_URL=http://localhost:5000" >> .env.local

# Run development server
npm run dev
```

The frontend will be available at `http://localhost:3000`

#### 3. Backend Setup

```bash
# Navigate to backend directory
cd flask_backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cat > .env << EOF
FLASK_ENV=development
FLASK_DEBUG=True
SECRET_KEY=your-secret-key-here
JWT_SECRET_KEY=your-jwt-secret-key
GOOGLE_API_KEY=your-gemini-api-key
BHASHINI_USER_ID=your-bhashini-user-id
BHASHINI_API_KEY=your-bhashini-api-key
DATABASE_URL=sqlite:///vocalresume.db
EOF

# Run Flask server
python app.py
```

The backend API will be available at `http://localhost:5000`

## Usage Guide

### Creating Your First Resume

1. **Sign Up / Login**
   - Navigate to `http://localhost:3000`
   - Create an account or login

2. **Choose a Template**
   - Browse available templates
   - Click "Use Template" on your preferred design

3. **Record or Upload Audio**
   - Select your language from the dropdown
   - Either record directly or upload an audio file
   - Speak clearly about your:
     - Personal information (name, contact)
     - Professional summary
     - Work experience
     - Education
     - Skills and achievements

4. **Review & Edit**
   - AI processes your audio and generates structured resume
   - Edit any field directly in the preview
   - Adjust formatting as needed

5. **Download**
   - Click "Download PDF" to save your resume
   - Resume is also saved to your account for future access

## Technology Stack

### Frontend
- **Framework**: Next.js 15.2.4 (React 19)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4
- **UI Components**: Radix UI, shadcn/ui
- **State Management**: React Hooks
- **HTTP Client**: Axios
- **PDF Generation**: html2pdf.js, jsPDF

### Backend
- **Framework**: Flask 3.0.3
- **Language**: Python 3.11+
- **Database**: SQLite (dev) / MySQL (production)
- **ORM**: SQLAlchemy
- **Authentication**: Flask-JWT-Extended
- **AI/ML**: 
  - Google Gemini AI (text processing)
  - Bhashini API (speech-to-text)
  - OpenAI Whisper (alternative STT)
- **Audio Processing**: pydub, SpeechRecognition
- **PDF Generation**: ReportLab

## Project Structure

```
BhashiniVocalResume/
├── app/                          # Next.js app directory
│   ├── audio-input/             # Audio recording/upload page
│   ├── dashboard/               # User dashboard
│   ├── edit-resume/             # Resume editor
│   ├── login/                   # Login page
│   ├── signup/                  # Signup page
│   ├── preview-template/        # Template preview
│   ├── resume-preview/          # Generated resume preview
│   ├── templates/               # Template gallery
│   └── types/                   # TypeScript definitions
├── components/                   # React components
│   ├── ui/                      # UI components (shadcn)
│   ├── audio-edit-improved.tsx  # Audio editor component
│   └── resume-templates.tsx     # Template components
├── flask_backend/               # Flask backend
│   ├── app.py                   # Main Flask application
│   ├── audioGenerate.py         # Audio processing utilities
│   ├── requirements.txt         # Python dependencies
│   └── instance/                # Database files
├── lib/                         # Utility functions
├── public/                      # Static assets
├── styles/                      # Global styles
├── package.json                 # Node dependencies
├── next.config.mjs             # Next.js configuration
├── tailwind.config.ts          # Tailwind configuration
└── tsconfig.json               # TypeScript configuration
```

## API Documentation

### Authentication Endpoints

#### POST `/api/signup`
Register a new user.

#### POST `/api/login`
Authenticate user and receive JWT token.

#### POST `/api/logout`
Logout user and clear JWT token.

#### GET `/api/check-auth`
Verify authentication status.

### Resume Endpoints

#### POST `/api/process-audio`
Process audio file and generate resume.

#### GET `/api/resume/<resume_id>`
Get resume by ID.

#### PUT `/api/resume/<resume_id>`
Update resume data.

#### DELETE `/api/resume/<resume_id>`
Delete resume.

#### GET `/api/resume/<resume_id>/download`
Download resume as PDF.

#### GET `/api/resumes`
Get all user resumes.
```

## Security Considerations

- JWT-based authentication with HTTP-only cookies
- Password hashing with Werkzeug
- CORS configuration for production
- File upload size limits (16MB)
- Input validation and sanitization

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Version History

See [CHANGELOG.md](CHANGELOG.md) for detailed version history.

### Current Version: v0.1.0 (Beta)
- Initial release
- Multi-language voice input
- AI-powered resume generation
- 4 professional templates
- PDF export functionality

## Authors

- **Sidharth K** 
- **Shachi L H Gowda**
