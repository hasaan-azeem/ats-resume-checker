import Navbar from "@/components/Navbar";
import UploadForm from "@/components/UploadForm";
import {
  CheckCircle,
  Zap,
  Target,
  TrendingUp,
  Star,
  ArrowRight,
  FileText, Sparkles
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0D0D14]">
      <Navbar />

      {/* Background grid */}
      <div className="fixed inset-0 bg-[linear-linear(rgba(255,255,255,0.02)_1px,transparent_1px),linear-linear(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[60px_60px] pointer-events-none" />

      {/* linear orbs */}
      <div className="fixed top-20 left-1/2 -translate-x-1/2 w-150 h-100 bg-linear-to-br from-[#4F7EFF]/20 to-[#A855F7]/10 blur-[120px] pointer-events-none" />

      {/* Hero */}
      <section className="relative pt-36 pb-24 px-6 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white/60 text-xs px-4 py-2 rounded-full mb-8 fade-up">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          Free forever. No account needed.
        </div>

        <h1 className="font-syne text-5xl md:text-7xl font-extrabold text-white leading-[1.05] mb-6 fade-up-1">
          Is Your Resume
          <br />
          <span className="linear-text">ATS Ready?</span>
        </h1>

        <p className="text-lg md:text-xl text-white max-w-2xl mx-auto mb-14 leading-relaxed fade-up-2">
          Over 75% of resumes are rejected before a human ever reads them. Find
          out your ATS score in seconds and fix it for free.
        </p>

        <div className="fade-up-3">
          <UploadForm />
        </div>

        {/* Social proof */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-10 fade-up-4">
          <div className="flex items-center gap-1.5 text-sm text-white/30">
            <div className="flex -space-x-2">
              {[
                "bg-blue-500",
                "bg-purple-500",
                "bg-pink-500",
                "bg-orange-500",
              ].map((c, i) => (
                <div
                  key={i}
                  className={`w-7 h-7 rounded-full ${c} border-2 border-[#0D0D14]`}
                />
              ))}
            </div>
            <span className="ml-2">Trusted by 10,000+ job seekers</span>
          </div>
          <div className="flex items-center gap-1 text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} fill="currentColor" />
            ))}
            <span className="text-white/30 text-sm ml-1">4.9/5 rating</span>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-white/6 bg-white/2 text-white py-10">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {[
            { value: "75%", label: "of resumes blocked by ATS" },
            { value: "< 30s", label: "to get your full score" },
            { value: "100%", label: "free, always" },
          ].map((s, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="font-syne text-4xl font-extrabold linear-text">
                {s.value}
              </span>
              <span className="text-white/30 text-sm mt-2">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-5xl mx-auto px-6 py-28">
        <div className="text-center mb-16">
          <p className="text-[#4F7EFF] text-sm font-medium uppercase tracking-widest mb-3">
            How It Works
          </p>
          <h2 className="font-syne text-4xl font-bold text-white">
            Three steps to a better resume
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-12 left-1/3 right-1/3 h-px bg-linear-to-r from-[#4F7EFF] to-[#A855F7] opacity-30" />
          {[
            {
              icon: <Zap size={22} />,
              step: "01",
              title: "Upload Resume",
              desc: "Drop your PDF or DOCX resume. We extract the text instantly.",
            },
            {
              icon: <Target size={22} />,
              step: "02",
              title: "Paste Job Description",
              desc: "Add the job posting you are applying for. The more detail, the better.",
            },
            {
              icon: <TrendingUp size={22} />,
              step: "03",
              title: "Get Your ATS Score",
              desc: "Receive a full breakdown with actionable fixes to improve your score.",
            },
          ].map((s, i) => (
            <div
              key={i}
              className="glass rounded-2xl p-8 hover:border-white/15 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-[#4F7EFF]/20 to-[#A855F7]/20 border border-white/8 flex items-center justify-center text-[#4F7EFF] group-hover:scale-110 transition-transform">
                  {s.icon}
                </div>
                <span className="font-syne text-5xl font-extrabold text-white/4">
                  {s.step}
                </span>
              </div>
              <h3 className="font-syne font-bold text-white text-xl mb-3">
                {s.title}
              </h3>
              <p className="text-white/40 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What we check */}
      <section className="border-t border-white/6 py-28">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#4F7EFF] text-sm font-medium uppercase tracking-widest mb-4">
                Scoring Engine
              </p>
              <h2 className="font-syne text-4xl font-bold text-white mb-6 leading-tight">
                Everything a real ATS checks, we check too
              </h2>
              <p className="text-white/40 leading-relaxed mb-8">
                Our scoring engine analyzes your resume across 4 key categories,
                the same factors that real ATS systems like Workday, Greenhouse,
                and Taleo use.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-[#4F7EFF] text-sm font-medium hover:gap-3 transition-all"
              >
                Analyze my resume now <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {[
                {
                  label: "Keyword Match",
                  score: "40 pts",
                  desc: "How well your resume matches the job description",
                },
                {
                  label: "Section Detection",
                  score: "20 pts",
                  desc: "Presence of Experience, Education, Skills, Summary",
                },
                {
                  label: "ATS Formatting",
                  score: "20 pts",
                  desc: "No tables, columns, or ATS-breaking elements",
                },
                {
                  label: "Readability",
                  score: "20 pts",
                  desc: "Action verbs, quantifiable results, proper length",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="glass rounded-xl px-5 py-4 flex items-center justify-between hover:border-white/15 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle
                      size={16}
                      className="text-[#4F7EFF] shrink-0"
                    />
                    <div>
                      <p className="text-white text-sm font-medium">
                        {item.label}
                      </p>
                      <p className="text-white/30 text-xs mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-syne font-bold text-[#4F7EFF] bg-[#4F7EFF]/10 px-2.5 py-1 rounded-full border border-[#4F7EFF]/20 shrink-0 ml-4">
                    {item.score}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-2xl mx-auto px-6 py-28">
        <div className="text-center mb-14">
          <p className="text-[#4F7EFF] text-sm font-medium uppercase tracking-widest mb-3">
            FAQ
          </p>
          <h2 className="font-syne text-4xl font-bold text-white">
            Common questions
          </h2>
        </div>
        <div className="flex flex-col divide-y divide-white/6">
          {[
            {
              q: "Is this tool really free?",
              a: "Yes, 100% free. No signup, no credit card, no limits. We show ads to keep the service running.",
            },
            {
              q: "Do you store my resume?",
              a: "Never. Your resume is analyzed in real time and immediately discarded. We only save anonymous score statistics for improving the tool.",
            },
            {
              q: "How accurate is the ATS score?",
              a: "Very accurate for keyword matching and formatting checks. Our engine mimics how real ATS systems filter resumes, since most ATS platforms are keyword matchers at heart.",
            },
            {
              q: "What file formats do you support?",
              a: "PDF and DOCX files up to 5MB. These are the two formats accepted by virtually every ATS system in existence.",
            },
            {
              q: "Can I score the same resume against multiple jobs?",
              a: "Yes. Just go back to the home page and paste a different job description. Each scan is independent.",
            },
          ].map((faq, i) => (
            <div key={i} className="py-6">
              <h3 className="font-syne font-semibold text-white mb-2">
                {faq.q}
              </h3>
              <p className="text-white/40 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-5xl mx-auto px-6 pb-28">
        <div className="relative glass rounded-3xl p-14 text-center overflow-hidden border border-white/8">
          <div className="absolute inset-0 bg-linear-to-br from-[#4F7EFF]/10 to-[#A855F7]/10 pointer-events-none" />
          <p className="font-syne text-3xl md:text-4xl font-bold text-white mb-4 relative z-10">
            Ready to beat the ATS?
          </p>
          <p className="text-white/40 mb-8 relative z-10">
            It takes less than 30 seconds. No signup required.
          </p>
          <Link
            href="/"
            className="relative z-10 inline-flex items-center gap-2 bg-linear-to-r from-[#4F7EFF] to-[#A855F7] text-white font-syne font-semibold px-8 py-4 rounded-full hover:opacity-90 transition-opacity shadow-[0_0_30px_rgba(79,126,255,0.3)]"
          >
            <Sparkles size={18} /> Analyze My Resume Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/6 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-linear-to-br from-[#4F7EFF] to-[#A855F7] flex items-center justify-center">
              <FileText size={13} className="text-white" />
            </div>
            <span className="font-syne font-bold text-white text-sm">
              ResumeScore
            </span>
          </div>
          <p className="text-white/20 text-sm">
            100% free. Built by Technologant.
          </p>
          <div className="flex items-center gap-6 text-sm text-white/30">
            <Link href="/about" className="hover:text-white transition-colors">
              About
            </Link>
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy
            </Link>
            <Link href="/blog" className="hover:text-white transition-colors">
              Blog
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
