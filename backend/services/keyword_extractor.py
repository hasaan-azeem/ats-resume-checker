import spacy
import re
from typing import List

nlp = spacy.load("en_core_web_sm")

# Common tech and professional skills to look for
SKILL_PATTERNS = [
    "python", "javascript", "typescript", "react", "node.js", "nodejs",
    "fastapi", "django", "flask", "sql", "postgresql", "mysql", "mongodb",
    "docker", "kubernetes", "aws", "azure", "gcp", "git", "github",
    "rest api", "graphql", "ci/cd", "agile", "scrum", "machine learning",
    "deep learning", "tensorflow", "pytorch", "java", "c++", "c#",
    "html", "css", "tailwind", "next.js", "nextjs", "vue", "angular",
    "redis", "elasticsearch", "kafka", "spark", "hadoop", "tableau",
    "power bi", "excel", "linux", "bash", "terraform", "ansible",
    "project management", "team leadership", "communication", "problem solving",
]

def extract_keywords(text: str) -> List[str]:
    """Extract meaningful keywords from a block of text."""
    text_lower = text.lower()
    found = []

    # Match known skill patterns first
    for skill in SKILL_PATTERNS:
        if skill in text_lower:
            found.append(skill.title() if len(skill) > 3 else skill.upper())

    # Use spaCy to extract noun chunks and named entities
    doc = nlp(text[:50000])  # limit to avoid memory issues

    for chunk in doc.noun_chunks:
        word = chunk.text.strip()
        if 2 < len(word) < 40 and not word.lower() in ["the", "a", "an", "this", "that"]:
            found.append(word)

    for ent in doc.ents:
        if ent.label_ in ["ORG", "PRODUCT", "GPE", "WORK_OF_ART"]:
            found.append(ent.text.strip())

    # Deduplicate while preserving order
    seen = set()
    result = []
    for k in found:
        key = k.lower()
        if key not in seen and len(key) > 1:
            seen.add(key)
            result.append(k)

    return result


def compare_keywords(resume_text: str, jd_text: str):
    """Compare resume keywords against job description keywords."""
    jd_keywords = extract_keywords(jd_text)
    resume_lower = resume_text.lower()

    found = []
    missing = []

    for kw in jd_keywords:
        if kw.lower() in resume_lower:
            found.append(kw)
        else:
            missing.append(kw)

    # Cap lists for clean output
    return found[:20], missing[:15]