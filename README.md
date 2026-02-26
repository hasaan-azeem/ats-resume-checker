# 🎯 ResumeChecker — Free ATS Resume Checker

<div align="center">

![ResumeChecker Banner](https://img.shields.io/badge/ResumeChecker-ATS%20Resume%20Checker-4F7EFF?style=for-the-badge&logo=files&logoColor=white)

**Analyze your resume against any job description and get a detailed ATS compatibility score — completely free, no signup required.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-4F7EFF?style=for-the-badge)](https://your-site.vercel.app)
[![License](https://img.shields.io/badge/License-MIT-A855F7?style=for-the-badge)](LICENSE)
[![Python](https://img.shields.io/badge/Python-3.11-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)

</div>

---

## 📸 Preview

> Upload your resume, paste a job description, and get a full ATS score breakdown in under 30 seconds.

```
Score: 78/100 ✅ Good

Keyword Match      ████████████████░░░░  28/40
Section Detection  ████████████████████  20/20
Formatting         ██████████████░░░░░░  14/20
Readability        ████████████░░░░░░░░  12/20

Missing Keywords: Docker, Kubernetes, AWS, CI/CD
Suggestions: Add a Professional Summary, include quantifiable results...
```

---

## 🚀 What is ResumeChecker?

Over **75% of resumes are rejected by ATS (Applicant Tracking Systems)** before a human recruiter ever reads them. Companies like Google, Amazon, and Microsoft all use ATS software to filter candidates automatically.

ResumeChecker is a full-stack web application that mimics how real ATS systems work. It analyzes your resume against a specific job description and returns:

- A **score out of 100** across 4 weighted categories
- A list of **keywords found and missing** from your resume
- **Section detection** results (Experience, Education, Skills, Summary)
- **Formatting warnings** that could cause ATS parsers to fail
- **Prioritized suggestions** ranked by impact (High, Medium, Low)

Built entirely with **free and open-source tools**, zero paid APIs, and deployed on free hosting tiers.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 📄 Resume Parsing | Supports PDF and DOCX files up to 5MB |
| 🔍 Keyword Analysis | Matches resume keywords against job description using NLP |
| 🏗️ Section Detection | Checks for Experience, Education, Skills, Summary, Contact |
| 🎨 Formatting Check | Detects tables, columns, and ATS-breaking elements |
| 💪 Readability Score | Analyzes action verbs, quantifiable results, resume length |
| 📊 Visual Breakdown | Animated score ring and progress bars per category |
| 💡 Smart Suggestions | Prioritized list of improvements with High, Medium, Low labels |
| 🔒 Privacy First | Resume content is never stored, analysis is real-time |
| 📱 Fully Responsive | Works on desktop, tablet, and mobile |
| 🌙 Dark Mode UI | Clean professional dark theme with gradient accents |

---

## 🧠 How the Scoring Engine Works

The total score is out of **100 points**, broken into 4 categories:

### 1. Keyword Match (40 points)
Uses **spaCy NLP** and **scikit-learn TF-IDF** to extract keywords from the job description and check how many appear in the resume. Covers both exact matches and known skill patterns (Python, Docker, AWS, etc.).

### 2. Section Detection (20 points)
Uses regex patterns and spaCy to detect the presence of critical resume sections:
- Contact Info (4 pts), Experience (5 pts), Education (4 pts), Skills (4 pts), Summary (3 pts)

### 3. Formatting Score (20 points)
Detects ATS-unfriendly elements:
- Multi-column or table layouts, special unicode characters, text that is too short or too long

### 4. Readability Score (20 points)
Checks resume writing quality:
- Strong action verbs (built, led, optimized), quantifiable results (numbers, percentages), appropriate length (350 to 800 words ideal)

---

## 🛠️ Tech Stack

### Backend
| Tool | Version | Purpose |
|------|---------|---------|
| Python | 3.11 | Core language |
| FastAPI | 0.109 | REST API framework |
| spaCy | 3.7.2 | NLP, keyword extraction, NER |
| scikit-learn | 1.4.0 | TF-IDF vectorizer and cosine similarity |
| pdfplumber | 0.10.3 | Extract text from PDF files |
| python-docx | 1.1.0 | Extract text from DOCX files |
| SQLite | built-in | Anonymous analytics storage |
| Uvicorn | 0.27 | ASGI server |

### Frontend
| Tool | Version | Purpose |
|------|---------|---------|
| Next.js | 14 | React framework with SSR for SEO |
| Tailwind CSS | 3 | Utility-first styling |
| shadcn/ui | latest | Pre-built accessible components |
| Axios | latest | HTTP requests to backend |
| React Dropzone | latest | Drag and drop file upload |
| Lucide React | latest | Icon library |

### Infrastructure (100% Free)
| Service | Purpose |
|---------|---------|
| Render | Backend hosting (free tier) |
| Vercel | Frontend hosting (free tier) |
| GitHub | Version control and CI/CD |
| SQLite | Lightweight database, no server needed |

---

## 📁 Project Structure

```
ats-resume-scorer/
│
├── backend/                        # Python FastAPI backend
│   ├── main.py                     # App entry point, CORS, startup
│   ├── requirements.txt            # Python dependencies
│   ├── runtime.txt                 # Python version for Render
│   │
│   ├── routers/
│   │   └── score.py                # POST /api/score endpoint
│   │
│   ├── services/
│   │   ├── parser.py               # PDF and DOCX text extraction
│   │   ├── scorer.py               # Master scoring logic
│   │   ├── keyword_extractor.py    # spaCy keyword extraction
│   │   └── formatter_check.py      # Formatting analysis
│   │
│   ├── models/
│   │   └── schemas.py              # Pydantic request and response models
│   │
│   └── database/
│       └── db.py                   # SQLite connection and analytics
│
├── app/                            # Next.js 14 App Router
│   ├── page.tsx                    # Home page with upload form
│   ├── results/page.tsx            # Results dashboard
│   ├── blog/
│   │   ├── page.tsx                # Blog listing page
│   │   └── [slug]/page.tsx         # Individual blog posts
│   ├── about/page.tsx              # About page
│   ├── privacy/page.tsx            # Privacy policy
│   ├── sitemap.ts                  # Auto-generated sitemap
│   └── robots.ts                   # Robots.txt for SEO
│
├── components/
│   ├── Navbar.tsx                  # Sticky navigation bar
│   └── UploadForm.tsx              # Resume upload and JD input
│
├── lib/
│   └── api.ts                      # Axios API calls to backend
│
├── .env.local                      # Local environment variables
├── .gitignore
└── README.md
```

---

## ⚡ Getting Started

### Prerequisites
- Python 3.11+
- Node.js 18+
- Git

### 1. Clone the repository

```bash
git clone https://github.com/hasaan-azeem/ats-resume-checker.git
cd ats-resume-checker
```

### 2. Set up the backend

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate it (Windows)
venv\Scripts\activate

# Activate it (Mac/Linux)
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Download spaCy language model
python -m spacy download en_core_web_sm

# Start the backend server
uvicorn main:app --reload --port 8000
```

Backend will be running at `http://localhost:8000`
API docs available at `http://localhost:8000/docs`

### 3. Set up the frontend

Open a new terminal in the root folder:

```bash
# Install dependencies
npm install

# Create environment file
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local

# Start the frontend
npm run dev
```

Frontend will be running at `http://localhost:3000`

---

## 🌐 Deployment

### Backend on Render

| Setting | Value |
|---------|-------|
| Root Directory | `backend` |
| Runtime | Python 3 |
| Build Command | `pip install -r requirements.txt && python -m spacy download en_core_web_sm` |
| Start Command | `uvicorn main:app --host 0.0.0.0 --port $PORT` |

Environment variables:
```
PYTHON_VERSION = 3.11.0
PORT           = 10000
```

### Frontend on Vercel

Connect your GitHub repo to Vercel. Add this environment variable:

```
NEXT_PUBLIC_API_URL = https://your-backend.onrender.com
```

Vercel auto-deploys on every push to `main`.

---

## 📡 API Reference

### `POST /api/score`

Analyzes a resume against a job description.

**Request** (multipart/form-data)

| Field | Type | Description |
|-------|------|-------------|
| `file` | File | PDF or DOCX resume, max 5MB |
| `job_description` | string | Full job description text, min 50 chars |

**Response** (JSON)

```json
{
  "total_score": 72,
  "keyword_score": 28,
  "section_score": 18,
  "formatting_score": 14,
  "readability_score": 12,
  "found_keywords": ["React", "TypeScript", "Node.js"],
  "missing_keywords": ["Docker", "AWS", "Kubernetes"],
  "sections": {
    "contact": true,
    "experience": true,
    "education": true,
    "skills": true,
    "summary": false
  },
  "formatting_issues": ["Possible multi-column layout detected"],
  "suggestions": [
    { "priority": "high", "text": "Add a Professional Summary section." },
    { "priority": "medium", "text": "Include Docker and AWS in your skills." }
  ],
  "file_name": "my-resume.pdf"
}
```

---

## 🗺️ Roadmap

- [x] PDF and DOCX parsing
- [x] Keyword match scoring with spaCy
- [x] Section detection
- [x] Formatting checker
- [x] Readability and action verb analysis
- [x] Full results dashboard with visualizations
- [x] Anonymous analytics with SQLite
- [x] SEO meta tags and sitemap
- [ ] Google AdSense monetization
- [ ] Multiple job comparison (score one resume against 3 JDs)
- [ ] Shareable score card (PNG export)
- [ ] Resume tips blog with SEO articles
- [ ] Job title suggestions based on resume content

---

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m "Add your feature"`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Built By

Built with passion as a full-stack portfolio project to solve a real problem — helping job seekers understand and improve their ATS compatibility for free.

If this project helped you, please consider giving it a ⭐ on GitHub!

---

<div align="center">

**[Live Demo](https://atscan.vercel.app/) · [Report Bug](https://github.com/hasaan-azeem/ats-resume-checker/issues) · [Request Feature](https://github.com/hasaan-azeem/ats-resume-checker/issues)**

Made with ❤️ using Python, spaCy, and Next.js

</div>
