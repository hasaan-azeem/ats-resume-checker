/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";
import { Upload, FileText, X, Loader2, Sparkles } from "lucide-react";
import { scoreResume } from "@/lib/api";

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const uploaded = acceptedFiles[0];
    if (uploaded) {
      setFile(uploaded);
      setError("");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
    onDropRejected: () =>
      setError("Please upload a PDF or DOCX file under 5MB."),
  });

  const handleSubmit = async () => {
    if (!file) return setError("Please upload your resume.");
    if (!jobDescription.trim())
      return setError("Please paste a job description.");
    if (jobDescription.trim().length < 50)
      return setError("Job description is too short. Paste the full listing.");

    setLoading(true);
    setError("");

    try {
      const result = await scoreResume(file, jobDescription);
      // Store result in sessionStorage so results page can read it
      sessionStorage.setItem("scoreResult", JSON.stringify(result));
      sessionStorage.setItem("fileName", file.name);
      router.push("/results");
    } catch (err: any) {
      const message =
        err?.response?.data?.detail ||
        "Something went wrong. Please try again.";
      setError(message);
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-4">
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`relative border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-300 group
          ${
            isDragActive
              ? "border-[#4F7EFF] bg-[#4F7EFF]/10"
              : file
                ? "border-green-500/50 bg-green-500/5"
                : "border-white/10 bg-white/2 hover:border-[#4F7EFF]/50 hover:bg-[#4F7EFF]/5"
          }`}
      >
        <input {...getInputProps()} />

        {/* Subtle glow on hover */}
        <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-[#4F7EFF]/0 to-[#A855F7]/0 group-hover:from-[#4F7EFF]/5 group-hover:to-[#A855F7]/5 transition-all duration-300 pointer-events-none" />

        {file ? (
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
              <FileText className="text-green-400" size={26} />
            </div>
            <div>
              <p className="font-semibold text-green-400">{file.name}</p>
              <p className="text-sm text-white/30 mt-1">
                {(file.size / 1024).toFixed(1)} KB
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setFile(null);
              }}
              className="flex items-center gap-1 text-xs text-white/30 hover:text-red-400 transition-colors mt-1"
            >
              <X size={12} /> Remove
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-white/4 border border-white/8 flex items-center justify-center group-hover:border-[#4F7EFF]/30 transition-colors">
              <Upload
                className="text-white/30 group-hover:text-[#4F7EFF] transition-colors"
                size={24}
              />
            </div>
            <div>
              <p className="text-white/70 font-medium">
                {isDragActive
                  ? "Drop your resume here..."
                  : "Drag and drop your resume"}
              </p>
              <p className="text-sm text-white/30 mt-1">or click to browse</p>
            </div>
            <span className="text-xs text-white/20 bg-white/4 px-3 py-1 rounded-full border border-white/6">
              PDF or DOCX, max 5MB
            </span>
          </div>
        )}
      </div>

      {/* Job Description */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-white/60">
            Job Description
          </label>
          <span className="text-xs text-white/20">
            {jobDescription.length} chars
          </span>
        </div>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the full job description here..."
          rows={6}
          className="w-full bg-white/3 border border-white/8 rounded-xl p-4 text-sm text-white/80
                     focus:outline-none focus:border-[#4F7EFF]/50 focus:bg-[#4F7EFF]/5
                     placeholder:text-white/20 resize-none transition-all duration-200 font-dm"
        />
      </div>

      {/* Error */}
      {error && (
        <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
          {error}
        </div>
      )}

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="relative w-full py-4 rounded-xl font-syne font-semibold text-base text-white
                   bg-linear-to-r from-[#4F7EFF] to-[#A855F7]
                   hover:opacity-90 active:scale-[0.99] transition-all duration-200
                   disabled:opacity-60 disabled:cursor-not-allowed
                   shadow-[0_0_30px_rgba(79,126,255,0.3)] overflow-hidden group"
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={18} /> Analyzing your
              resume...
            </>
          ) : (
            <>
              <Sparkles size={18} /> Analyze My Resume
            </>
          )}
        </span>
        {/* Shimmer on hover */}
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      </button>

      <p className="text-center text-xs text-white/20">
        Your resume is never stored. Analysis happens in real-time.
      </p>
    </div>
  );
}
