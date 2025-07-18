
import requests
import time
import base64
import json
# CONFIGURE THESE
# USER_ID = "134f212348-7b90-4383-a835-052a26c51307"  # e.g., udyatkey
USER_ID = "a6d4ab8908fd4bf2a62cb83d91a1535b"  # e.g., udyatkey
INFERENCE_API_KEY = "5908105216-f242-4b10-a47c-d6d3a475e985"
AUDIO_FILE_PATH = "shachi audio.mp3"  # Must be .wav or .mp3
SOURCE_LANGUAGE = "en"  # Change to "en", "ta", etc. as need

USER_ID = "a6d4ab8908fd4bf2a62cb83d91a1535b"
ULCA_API_KEY = "5908105216-f242-4b10-a47c-d6d3a475e985"

# Step 1: Convert audio file to base64 string
def encode_audio(audio_path):
    with open(audio_path, "rb") as audio_file:
        encoded_string = base64.b64encode(audio_file.read()).decode("utf-8")
        return encoded_string

# Step 2: Submit to Bhashini API
def submit_audio(encoded_audio):
    url = "https://dhruva-api.bhashini.gov.in/services/inference/pipeline"

    headers = {
        "Content-Type": "application/json",
        "userID": USER_ID,
        "ulca-api-key": INFERENCE_API_KEY
    }

    payload = {
        "pipelineTasks": [
            {
                "taskType": "asr",
                "config": {
                    "language": {
                        "sourceLanguage": SOURCE_LANGUAGE
                    }
                }
            }
        ],
        "inputData": {
            "audio": [
                {
                    "audioContent": encoded_audio
                }
            ]
        }
    }

    response = requests.post(url, headers=headers, json=payload)

    if response.status_code == 200:
        job_id = response.json().get("jobID")
        print("✅ Job submitted successfully. Job ID:", job_id)
        return job_id
    else:
        print("❌ Submission failed:", response.status_code, response.text)
        return None

# Step 3: Poll result
def poll_result(job_id):
    url = f"https://dhruva-api.bhashini.gov.in/services/inference/job/{job_id}"

    headers = {
        "userID": USER_ID,
        "ulca-api-key": INFERENCE_API_KEY
    }

    while True:
        response = requests.get(url, headers=headers)
        result = response.json()

        status = result.get("status")
        if status == "COMPLETED":
            transcription = result['output'][0]['source']
            print("📝 Transcription:", transcription)
            return transcription
        elif status in ("FAILED", "ERROR"):
            print("❌ Job failed:", result)
            return None
        else:
            print("⏳ Waiting... status:", status)
            time.sleep(3)

# MAIN FLOW
if __name__ == "__main__":
    audio_base64 = encode_audio(AUDIO_FILE_PATH)
    job_id = submit_audio(audio_base64)
    if job_id:
        poll_result(job_id)
