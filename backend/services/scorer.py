import re
from typing import Dict, List, Tuple
from services.keyword_extractor import compare_keywords
from services.formatter_check import check_formatting


# Action verbs that signal strong resume writing
STRONG_VERBS = [
    "achieved",
    "built",
    "created",
    "delivered",
    "designed",
    "developed",
    "drove",
    "engineered",
    "established",
    "executed",
    "generated",
    "grew",
    "implemented",
    "improved",
    "increased",
    "launched",
    "led",
    "managed",
    "optimized",
    "reduced",
    "scaled",
    "shipped",
    "solved",
    "streamlined",
    "transformed",
    "architected",
    "automated",
    "deployed",
    "integrated",
]

WEAK_PHRASES = [
    "responsible for",
    "worked on",
    "helped with",
    "assisted with",
    "involved in",
    "participated in",
    "was part of",
]

REQUIRED_SECTIONS = {
    "contact": [r"\b(email|phone|linkedin|github|@)\b"],
    "experience": [r"\b(experience|work history|employment|professional background)\b"],
    "education": [r"\b(education|degree|university|college|bachelor|master|phd)\b"],
    "skills": [r"\b(skills|technologies|tech stack|competencies|expertise)\b"],
    "summary": [r"\b(summary|objective|profile|about me|professional summary)\b"],
}


def detect_sections(resume_text: str) -> Tuple[int, Dict[str, bool]]:
    """Detect presence of key resume sections. Returns score (0-20) and dict."""
    text_lower = resume_text.lower()
    section_points = {
        "contact": 4,
        "experience": 5,
        "education": 4,
        "skills": 4,
        "summary": 3,
    }
    results = {}
    score = 0

    for section, patterns in REQUIRED_SECTIONS.items():
        found = any(re.search(p, text_lower) for p in patterns)
        results[section] = found
        if found:
            score += section_points[section]

    return score, results


def check_readability(resume_text: str) -> Tuple[int, List[str]]:
    """
    Check action verb usage, quantifiable results, and resume length.
    Returns score (0-20) and improvement suggestions.
    """
    score = 0
    suggestions = []
    text_lower = resume_text.lower()
    word_count = len(resume_text.split())

    # Action verbs (up to 8 points)
    strong_count = sum(1 for v in STRONG_VERBS if v in text_lower)
    weak_count = sum(1 for p in WEAK_PHRASES if p in text_lower)

    if strong_count >= 6:
        score += 8
    elif strong_count >= 3:
        score += 5
    elif strong_count >= 1:
        score += 3
    else:
        suggestions.append(
            {
                "priority": "high",
                "text": "Start bullet points with strong action verbs like 'Built', 'Led', 'Optimized', or 'Delivered'.",
            }
        )

    if weak_count > 0:
        suggestions.append(
            {
                "priority": "medium",
                "text": f"Replace weak phrases like 'responsible for' or 'worked on' with direct action verbs.",
            }
        )

    # Quantifiable results (up to 7 points)
    numbers = re.findall(r"\b\d+[\%x]?\b", resume_text)
    if len(numbers) >= 5:
        score += 7
    elif len(numbers) >= 3:
        score += 5
    elif len(numbers) >= 1:
        score += 3
    else:
        suggestions.append(
            {
                "priority": "medium",
                "text": "Add quantifiable results to your experience. For example: 'Reduced load time by 40%' or 'Led a team of 6 engineers'.",
            }
        )

    # Resume length (up to 5 points)
    if 350 <= word_count <= 800:
        score += 5
    elif 200 <= word_count < 350:
        score += 3
        suggestions.append(
            {
                "priority": "low",
                "text": "Your resume is a bit short. Aim for 400 to 700 words.",
            }
        )
    elif word_count > 800:
        score += 2
        suggestions.append(
            {
                "priority": "low",
                "text": "Your resume is quite long. Try to keep it under 800 words for best ATS results.",
            }
        )
    else:
        suggestions.append(
            {
                "priority": "high",
                "text": "Resume content is very thin. Add more detail to your experience and skills sections.",
            }
        )

    return min(score, 20), suggestions


def calculate_score(resume_text: str, job_description: str) -> dict:
    """
    Master scoring function. Returns the full score response dict.
    """
    suggestions = []

    # 1. Keyword score (40 pts)
    found_kws, missing_kws = compare_keywords(resume_text, job_description)
    total_jd_kws = len(found_kws) + len(missing_kws)
    if total_jd_kws > 0:
        keyword_score = round((len(found_kws) / total_jd_kws) * 40)
    else:
        keyword_score = 0

    if missing_kws:
        top_missing = ", ".join(f'"{k}"' for k in missing_kws[:4])
        suggestions.append(
            {
                "priority": "high",
                "text": f"Add these missing keywords from the job description: {top_missing}.",
            }
        )

    # 2. Section score (20 pts)
    section_score, sections = detect_sections(resume_text)
    for section, found in sections.items():
        if not found:
            label = "Professional Summary" if section == "summary" else section.title()
            priority = "high" if section in ["experience", "skills"] else "medium"
            suggestions.append(
                {
                    "priority": priority,
                    "text": f"Add a {label} section to your resume. ATS systems specifically look for this.",
                }
            )

    # 3. Formatting score (20 pts)
    formatting_score, formatting_issues = check_formatting(resume_text)
    if formatting_issues:
        suggestions.append(
            {
                "priority": "medium",
                "text": "Fix formatting issues detected in your resume. Use a single-column plain text layout for best ATS compatibility.",
            }
        )

    # 4. Readability score (20 pts)
    readability_score, readability_suggestions = check_readability(resume_text)
    suggestions.extend(readability_suggestions)

    # Sort suggestions by priority
    priority_order = {"high": 0, "medium": 1, "low": 2}
    suggestions.sort(key=lambda x: priority_order.get(x["priority"], 3))

    total_score = keyword_score + section_score + formatting_score + readability_score

    return {
        "total_score": min(total_score, 100),
        "keyword_score": keyword_score,
        "section_score": section_score,
        "formatting_score": formatting_score,
        "readability_score": readability_score,
        "found_keywords": found_kws,
        "missing_keywords": missing_kws,
        "sections": sections,
        "formatting_issues": formatting_issues,
        "suggestions": suggestions[:6],  # top 6 only
    }
