# Changelog

All notable changes to VocalResume will be documented in this file.

## [0.1.0] - 2026-03-28

### Added
- Initial beta release
- Voice recording functionality in browser
- Audio file upload support (MP3, WAV)
- Multi-language support for 10 Indian languages:
  - English (en)
  - Hindi (hi)
  - Tamil (ta)
  - Telugu (te)
  - Kannada (kn)
  - Malayalam (ml)
  - Bengali (bn)
  - Gujarati (gu)
  - Marathi (mr)
  - Punjabi (pa)
- AI-powered transcription using Bhashini API
- Resume data extraction using Google Gemini AI
- 4 professional resume templates:
  - Professional
  - Creative
  - Minimal
  - Executive
- User authentication system (signup/login)
- JWT-based session management
- Resume editor with live preview
- PDF export functionality
- Resume management dashboard
- SQLite database for development
- MySQL support for production
- RESTful API backend with Flask
- Next.js frontend with TypeScript
- Responsive UI with Tailwind CSS
- Dark mode support

### Security
- Password hashing with Werkzeug
- JWT token authentication
- CORS configuration
- File upload size limits (16MB)
- Input validation and sanitization

### Technical
- Next.js 15.2.4 with React 19
- Flask 3.0.3 backend
- Google Gemini 1.5 Pro integration
- Bhashini API integration
- OpenAI Whisper support (alternative STT)
- ReportLab for PDF generation
- SQLAlchemy ORM
- Radix UI components
