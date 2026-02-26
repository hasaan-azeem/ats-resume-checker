import re
from typing import List, Tuple

def check_formatting(resume_text: str) -> Tuple[int, List[str]]:
    """
    Checks resume text for ATS-unfriendly formatting patterns.
    Returns a score (0-20) and a list of detected issues.
    """
    score = 20
    issues = []

    lines = resume_text.split("\n")
    non_empty_lines = [l.strip() for l in lines if l.strip()]

    # Check 1: Very short lines may indicate multi-column layout
    short_lines = [l for l in non_empty_lines if 0 < len(l) < 15]
    short_ratio = len(short_lines) / max(len(non_empty_lines), 1)
    if short_ratio > 0.35:
        score -= 6
        issues.append("Possible multi-column layout detected. ATS systems may scramble content in columns.")

    # Check 2: Suspicious unicode or special characters
    special_chars = re.findall(r"[^\x00-\x7F]", resume_text)
    if len(special_chars) > 10:
        score -= 4
        issues.append(f"Found {len(special_chars)} special/unicode characters. These can confuse ATS parsers.")

    # Check 3: Likely table content (pipe characters)
    pipes = resume_text.count("|")
    if pipes > 5:
        score -= 5
        issues.append("Pipe characters detected, which may indicate a table layout. ATS systems often cannot parse tables.")

    # Check 4: No content at all
    if len(resume_text.strip()) < 100:
        score -= 10
        issues.append("Resume text is too short. The file may not have parsed correctly.")

    # Check 5: Resume is too long
    word_count = len(resume_text.split())
    if word_count > 1200:
        score -= 2
        issues.append(f"Resume is quite long ({word_count} words). Aim for 400 to 800 words for best results.")

    return max(score, 0), issues