# ResumeScore - Free ATS Resume Checker

A full-stack web app that analyzes resumes against job descriptions and returns an ATS compatibility score with actionable suggestions.

**Live site:** [your-url-here.vercel.app]

## Tech Stack

- **Frontend:** Next.js 14, Tailwind CSS
- **Backend:** Python, FastAPI, spaCy, scikit-learn
- **Database:** SQLite (anonymous analytics)
- **Hosting:** Vercel (frontend), Render (backend)

## Features

- PDF and DOCX resume parsing
- Keyword match scoring using TF-IDF and cosine similarity
- Section detection (Experience, Education, Skills, Summary)
- ATS formatting checker
- Action verb and readability analysis
- Detailed suggestions with priority levels

## Running Locally

### Backend
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python -m spacy download en_core_web_sm
uvicorn main:app --reload --port 8000

### Frontend
npm install
npm run dev