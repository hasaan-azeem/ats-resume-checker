import Navbar from "@/components/Navbar";
import Link from "next/link";
import { Github, Linkedin, Code2, Heart } from "lucide-react";

export default function AboutPage() {
  const stack = [
    { name: "Python 3.11", role: "Backend language" },
    { name: "FastAPI", role: "REST API framework" },
    { name: "spaCy", role: "NLP and keyword extraction" },
    { name: "scikit-learn", role: "TF-IDF scoring" },
    { name: "Next.js 14", role: "Frontend framework" },
    { name: "Tailwind CSS", role: "Styling" },
    { name: "SQLite", role: "Analytics database" },
    { name: "Render + Vercel", role: "Free hosting" },
  ];

  return (
    <div className="min-h-screen bg-[#0D0D14]">
      <Navbar />
      <div className="fixed inset-0 bg-[linear-linear(rgba(255,255,255,0.02)_1px,transparent_1px),linear-linear(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[60px_60px] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 pt-36 pb-20 relative z-10">
        <div className="text-center mb-16">
          <p className="text-[#4F7EFF] text-sm font-medium uppercase tracking-widest mb-4">
            About
          </p>
          <h1 className="font-syne text-5xl font-extrabold text-white mb-6">
            Built by a developer,
            <br />
            <span className="linear-text">for job seekers</span>
          </h1>
          <p className="text-white/40 text-lg leading-relaxed">
            ResumeScore started as a portfolio project to solve a real problem.
            ATS filters reject most resumes before a human sees them, and most
            tools that help with this cost money. So we built a free one.
          </p>
        </div>

        <div className="glass rounded-2xl p-8 mb-8">
          <h2 className="font-syne font-bold text-white text-xl mb-4 flex items-center gap-2">
            <Code2 size={20} className="text-[#4F7EFF]" /> The Tech Stack
          </h2>
          <p className="text-white/40 text-sm mb-6 leading-relaxed">
            This entire project runs on 100% free and open-source tools. No paid
            APIs, no vendor lock-in. The NLP engine uses spaCy and scikit-learn
            to analyze resumes, the same approach real ATS systems use under the
            hood.
          </p>
          <div className="grid grid-cols-2 gap-3">
            {stack.map((s, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-white/2 rounded-xl px-4 py-3 border border-white/6"
              >
                <div className="w-2 h-2 rounded-full bg-linear-to-br from-[#4F7EFF] to-[#A855F7] shrink-0" />
                <div>
                  <p className="text-white text-sm font-medium">{s.name}</p>
                  <p className="text-white/30 text-xs">{s.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl p-8 mb-8">
          <h2 className="font-syne font-bold text-white text-xl mb-4 flex items-center gap-2">
            <Heart size={20} className="text-[#A855F7]" /> Why It&apos;s Free
          </h2>
          <p className="text-white/40 text-sm leading-relaxed mb-4">
            The tool is free because it genuinely should be. Job searching is
            stressful enough without paying $20/month to fix a formatting issue.
            We cover server costs through display ads shown on the results page.
          </p>
          <p className="text-white/40 text-sm leading-relaxed">
            We also built this as an open portfolio project to demonstrate
            full-stack skills, NLP engineering, and product thinking. Feel free
            to check the source code on GitHub.
          </p>
        </div>

        <div className="flex items-center justify-center gap-4">
          <a
            href="https://github.com"
            target="_blank"
            className="flex items-center gap-2 glass px-5 py-3 rounded-xl text-white/60 hover:text-white transition-colors text-sm border hover:border-white/20"
          >
            <Github size={16} /> GitHub
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            className="flex items-center gap-2 glass px-5 py-3 rounded-xl text-white/60 hover:text-white transition-colors text-sm border hover:border-white/20"
          >
            <Linkedin size={16} /> LinkedIn
          </a>
          <Link
            href="/"
            className="flex items-center gap-2 bg-linear-to-r from-[#4F7EFF] to-[#A855F7] text-white px-5 py-3 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Try the Tool
          </Link>
        </div>
      </div>
    </div>
  );
}
