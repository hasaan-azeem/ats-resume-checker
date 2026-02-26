/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowLeft,
  RotateCcw,
  Loader2,
} from "lucide-react";

const DEFAULT_RESULT = {
  total_score: 0,
  keyword_score: 0,
  section_score: 0,
  formatting_score: 0,
  readability_score: 0,
  found_keywords: [] as string[],
  missing_keywords: [] as string[],
  sections: {
    contact: false,
    experience: false,
    education: false,
    skills: false,
    summary: false,
  },
  formatting_issues: [] as string[],
  suggestions: [] as { priority: string; text: string }[],
};

function ScoreRing({ score }: { score: number }) {
  const [current, setCurrent] = useState(0);
  const r = 72;
  const circ = 2 * Math.PI * r;
  const offset = circ - (current / 100) * circ;
  const color =
    score >= 80
      ? "#22c55e"
      : score >= 60
        ? "#4F7EFF"
        : score >= 40
          ? "#f59e0b"
          : "#ef4444";
  const label =
    score >= 80
      ? "Excellent"
      : score >= 60
        ? "Good"
        : score >= 40
          ? "Needs Work"
          : "Poor";

  useEffect(() => {
    const t = setTimeout(() => setCurrent(score), 300);
    return () => clearTimeout(t);
  }, [score]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-44 h-44">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
          <circle
            cx="80"
            cy="80"
            r={r}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="10"
          />
          <circle
            cx="80"
            cy="80"
            r={r}
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            style={{
              transition: "stroke-dashoffset 1.4s cubic-bezier(0.4,0,0.2,1)",
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-syne text-5xl font-extrabold text-white">
            {score}
          </span>
          <span className="text-white/30 text-xs mt-0.5">out of 100</span>
        </div>
      </div>
      <span
        className="text-sm font-semibold px-4 py-1.5 rounded-full border"
        style={{ color, borderColor: `${color}40`, background: `${color}15` }}
      >
        {label}
      </span>
    </div>
  );
}

function Bar({
  label,
  score,
  max,
}: {
  label: string;
  score: number;
  max: number;
}) {
  const pct = Math.round((score / max) * 100);
  const [w, setW] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setW(pct), 500);
    return () => clearTimeout(t);
  }, [pct]);

  return (
    <div>
      <div className="flex items-center justify-between text-sm mb-2">
        <span className="text-white/60 font-medium">{label}</span>
        <span className="font-semibold text-white">
          {score}
          <span className="text-white/30 font-normal">/{max}</span>
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-white/6 overflow-hidden">
        <div
          className="h-full rounded-full bg-linear-to-r from-[#4F7EFF] to-[#A855F7] transition-all duration-1000"
          style={{ width: `${w}%` }}
        />
      </div>
    </div>
  );
}

const priorityStyle: Record<string, string> = {
  high: "text-red-400 bg-red-500/10 border-red-500/20",
  medium: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  low: "text-blue-400 bg-blue-500/10 border-blue-500/20",
};

export default function ResultsPage() {
  const [fileName, setFileName] = useState("resume.pdf");
  const [r, setR] = useState<any>(DEFAULT_RESULT);
  const [loading, setLoading] = useState(true);
  const [noData, setNoData] = useState(false);

  useEffect(() => {
    const f = sessionStorage.getItem("fileName");
    const raw = sessionStorage.getItem("scoreResult");
    if (f) setFileName(f);
    if (raw) {
      try {
        setR(JSON.parse(raw));
      } catch {
        setNoData(true);
      }
    } else {
      setNoData(true);
    }
    setLoading(false);
  }, []);

  if (loading)
    return (
      <div className="min-h-screen bg-[#0D0D14] flex items-center justify-center">
        <Navbar />
        <div className="flex flex-col items-center gap-4">
          <Loader2 size={30} className="animate-spin text-[#4F7EFF]" />
          <p className="text-sm text-white/40">Loading your results...</p>
        </div>
      </div>
    );

  if (noData)
    return (
      <div className="min-h-screen bg-[#0D0D14]">
        <Navbar />
        <div className="max-w-md mx-auto px-6 pt-40 text-center">
          <div className="w-14 h-14 rounded-2xl bg-white/4 border border-white/8 flex items-center justify-center mx-auto mb-5">
            <XCircle size={24} className="text-white/30" />
          </div>
          <h1 className="font-syne text-2xl font-bold text-white mb-3">
            No results found
          </h1>
          <p className="text-white/40 text-sm mb-8 leading-relaxed">
            It looks like you navigated here directly. Please upload your resume
            and paste a job description first.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-linear-to-r from-[#4F7EFF] to-[#A855F7] text-white font-semibold text-sm px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
          >
            Go back and analyze
          </Link>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0D0D14]">
      <Navbar />

      {/* Background grid */}
      <div className="fixed inset-0 bg-[linear-linear(rgba(255,255,255,0.02)_1px,transparent_1px),linear-linear(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-linear-to-br from-[#4F7EFF]/10 to-[#A855F7]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 pt-28 pb-20 relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-10 fade-up">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-white/30 hover:text-white transition-colors mb-3"
            >
              <ArrowLeft size={14} /> Back
            </Link>
            <h1 className="font-syne text-3xl font-extrabold text-white">
              Your ATS Results
            </h1>
            <p className="text-white/30 text-sm mt-1">{fileName}</p>
          </div>
          <Link
            href="/"
            className="hidden sm:flex items-center gap-2 text-sm text-white/40 bg-white/[0.04] border border-white/[0.08] px-4 py-2.5 rounded-xl hover:text-white hover:border-white/20 transition-all"
          >
            <RotateCcw size={14} /> Analyze Again
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 fade-up-1">
          {/* Left column */}
          <div className="flex flex-col gap-5">
            {/* Score card */}
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 text-center">
              <p className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-6">
                ATS Score
              </p>
              <ScoreRing score={r.total_score} />
              <p className="text-xs text-white/25 mt-6 leading-relaxed">
                Your resume scored {r.total_score}/100. Apply the suggestions
                below before you apply.
              </p>
            </div>

            {/* Breakdown */}
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 flex flex-col gap-5">
              <p className="text-xs font-semibold text-white/30 uppercase tracking-widest">
                Score Breakdown
              </p>
              <Bar label="Keyword Match" score={r.keyword_score} max={40} />
              <Bar label="Section Detection" score={r.section_score} max={20} />
              <Bar label="Formatting" score={r.formatting_score} max={20} />
              <Bar label="Readability" score={r.readability_score} max={20} />
            </div>
          </div>

          {/* Right column */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {/* Suggestions */}
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
              <p className="font-syne font-bold text-white text-lg mb-5">
                Improvement Suggestions
              </p>
              {r.suggestions.length === 0 ? (
                <div className="flex items-center gap-2 text-green-400 text-sm bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3">
                  <CheckCircle size={16} /> Great job! No major issues found.
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {r.suggestions.map((s: any, i: number) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 bg-white/[0.02] border border-white/[0.06] rounded-xl p-4"
                    >
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded border capitalize shrink-0 mt-0.5 ${priorityStyle[s.priority]}`}
                      >
                        {s.priority}
                      </span>
                      <p className="text-sm text-white/60 leading-relaxed">
                        {s.text}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Keywords */}
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
              <p className="font-syne font-bold text-white text-lg mb-5">
                Keyword Analysis
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle size={14} className="text-green-400" />
                    <p className="text-sm font-semibold text-green-400">
                      Found ({r.found_keywords.length})
                    </p>
                  </div>
                  {r.found_keywords.length === 0 ? (
                    <p className="text-xs text-white/25">
                      No matching keywords found.
                    </p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {r.found_keywords.map((k: string, i: number) => (
                        <span
                          key={i}
                          className="text-xs bg-green-500/10 text-green-400 border border-green-500/20 px-2.5 py-1 rounded-full"
                        >
                          {k}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <XCircle size={14} className="text-red-400" />
                    <p className="text-sm font-semibold text-red-400">
                      Missing ({r.missing_keywords.length})
                    </p>
                  </div>
                  {r.missing_keywords.length === 0 ? (
                    <p className="text-xs text-white/25">
                      No missing keywords detected.
                    </p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {r.missing_keywords.map((k: string, i: number) => (
                        <span
                          key={i}
                          className="text-xs bg-red-500/10 text-red-400 border border-red-500/20 px-2.5 py-1 rounded-full"
                        >
                          {k}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sections + Formatting row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="bg-white/3 border border-white/8 rounded-2xl p-6">
                <p className="font-syne font-bold text-white mb-4">
                  Section Detection
                </p>
                <div className="flex flex-col gap-3">
                  {Object.entries(r.sections).map(
                    ([key, found]: [string, any]) => (
                      <div key={key} className="flex items-center gap-2.5">
                        {found ? (
                          <CheckCircle
                            size={15}
                            className="text-green-400 shrink-0"
                          />
                        ) : (
                          <XCircle
                            size={15}
                            className="text-red-400 shrink-0"
                          />
                        )}
                        <span
                          className={`text-sm capitalize ${found ? "text-white/50" : "text-red-400 font-medium"}`}
                        >
                          {key === "summary"
                            ? "Professional Summary"
                            : key.charAt(0).toUpperCase() + key.slice(1)}
                        </span>
                        {!found && (
                          <span className="ml-auto text-xs text-red-400/50">
                            Missing
                          </span>
                        )}
                      </div>
                    ),
                  )}
                </div>
              </div>

              <div className="bg-white/3 border border-white/8 rounded-2xl p-6">
                <p className="font-syne font-bold text-white mb-4">
                  Formatting Check
                </p>
                {r.formatting_issues.length === 0 ? (
                  <div className="flex flex-col gap-2.5">
                    {[
                      "No formatting issues found",
                      "No special characters detected",
                      "Resume length is appropriate",
                    ].map((msg, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-green-400 text-sm"
                      >
                        <CheckCircle size={14} className="shrink-0" /> {msg}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {r.formatting_issues.map((issue: string, i: number) => (
                      <div key={i} className="flex items-start gap-2">
                        <AlertCircle
                          size={14}
                          className="text-amber-400 shrink-0 mt-0.5"
                        />
                        <span className="text-xs text-white/50 leading-relaxed">
                          {issue}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Ad placeholder */}
        <div className="mt-8 border border-dashed border-white/6 rounded-2xl p-6 text-center fade-up-2">
          <p className="text-xs text-white/10 uppercase tracking-widest mb-2">
            Advertisement
          </p>
          <div className="h-14 flex items-center justify-center">
            <p className="text-xs text-white/10">
              Google AdSense unit will appear here after approval
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
