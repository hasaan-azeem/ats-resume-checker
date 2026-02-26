from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from services.parser import extract_text
from services.scorer import calculate_score
from database.db import save_scan

router = APIRouter()

@router.post("/score")
async def score_resume(
    file: UploadFile = File(...),
    job_description: str = Form(...),
):
    # Validate file type
    allowed = ["application/pdf",
               "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
    if file.content_type not in allowed:
        raise HTTPException(status_code=400, detail="Only PDF and DOCX files are supported.")

    # Validate job description length
    if len(job_description.strip()) < 50:
        raise HTTPException(status_code=400, detail="Job description is too short.")

    # Read file bytes
    file_bytes = await file.read()
    if len(file_bytes) > 5 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="File size exceeds 5MB limit.")

    # Extract text
    try:
        resume_text = extract_text(file_bytes, file.filename)
    except Exception as e:
        raise HTTPException(status_code=422, detail=f"Could not parse file: {str(e)}")

    if len(resume_text.strip()) < 50:
        raise HTTPException(status_code=422, detail="Could not extract enough text from the file.")

    # Score
    result = calculate_score(resume_text, job_description)
    result["file_name"] = file.filename

    # Save anonymous analytics
    try:
        save_scan(result)
    except Exception:
        pass  # analytics failure should never break the response

    return result