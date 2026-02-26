from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.score import router as score_router
from database.db import init_db

app = FastAPI(
    title="ResumeScore API",
    description="ATS Resume Scoring Engine",
    version="1.0.0",
)

# CORS so Next.js frontend can talk to this
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # update this for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize database on startup
@app.on_event("startup")
def on_startup():
    init_db()

# Include routers
app.include_router(score_router, prefix="/api")

@app.get("/")
def health_check():
    return {"status": "ok", "message": "ResumeScore API is running"}