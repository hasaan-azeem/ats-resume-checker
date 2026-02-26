import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function scoreResume(file: File, jobDescription: string) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("job_description", jobDescription);

  const response = await axios.post(`${API_URL}/api/score`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
}