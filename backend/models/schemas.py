from pydantic import BaseModel
from typing import List, Dict

class ScoreRequest(BaseModel):
    job_description: str

class SuggestionItem(BaseModel):
    priority: str  # "high", "medium", "low"
    text: str

class ScoreResponse(BaseModel):
    total_score: int
    keyword_score: int
    section_score: int
    formatting_score: int
    readability_score: int
    found_keywords: List[str]
    missing_keywords: List[str]
    sections: Dict[str, bool]
    formatting_issues: List[str]
    suggestions: List[SuggestionItem]
    file_name: str