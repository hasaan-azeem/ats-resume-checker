import Navbar from "@/components/Navbar";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

const posts = [
  {
    slug: "what-is-ats",
    title: "What is an ATS and why does it reject your resume?",
    excerpt:
      "Over 75% of resumes never reach a human. Here is exactly how applicant tracking systems work and what they look for.",
    date: "Jan 12, 2025",
    readTime: "5 min read",
    tag: "Basics",
  },
  {
    slug: "beat-ats-filters",
    title: "10 proven ways to beat ATS filters in 2025",
    excerpt:
      "A step-by-step guide to optimizing your resume for automated screening systems, based on how real ATS platforms work.",
    date: "Jan 18, 2025",
    readTime: "8 min read",
    tag: "Strategy",
  },
  {
    slug: "resume-keywords-engineers",
    title: "Best resume keywords for software engineers",
    excerpt:
      "The exact keywords and phrases that ATS systems look for when screening software engineering applications.",
    date: "Jan 24, 2025",
    readTime: "6 min read",
    tag: "Keywords",
  },
  {
    slug: "ats-friendly-formatting",
    title: "How to format a resume that passes ATS",
    excerpt:
      "Tables, columns, and graphics look great to humans but destroy your ATS score. Here is what to do instead.",
    date: "Feb 1, 2025",
    readTime: "5 min read",
    tag: "Formatting",
  },
  {
    slug: "action-verbs",
    title: "100 resume action verbs that get noticed",
    excerpt:
      "Weak verbs like 'responsible for' hurt your score. Here are the strongest action verbs to use for every type of role.",
    date: "Feb 8, 2025",
    readTime: "4 min read",
    tag: "Writing",
  },
  {
    slug: "resume-summary",
    title: "How to write a resume summary that passes ATS",
    excerpt:
      "Your summary is the first thing both ATS and humans read. Here is a formula that works for both.",
    date: "Feb 15, 2025",
    readTime: "5 min read",
    tag: "Writing",
  },
];

const tagColors: Record<string, string> = {
  Basics: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  Strategy: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  Keywords: "text-green-400 bg-green-500/10 border-green-500/20",
  Formatting: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  Writing: "text-pink-400 bg-pink-500/10 border-pink-500/20",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#0D0D14]">
      <Navbar />
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[60px_60px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 pt-36 pb-20 relative z-10">
        <div className="text-center mb-16">
          <p className="text-[#4F7EFF] text-sm font-medium uppercase tracking-widest mb-4">
            Blog
          </p>
          <h1 className="font-syne text-5xl font-extrabold text-white mb-4">
            Resume Tips
          </h1>
          <p className="text-white/40 max-w-xl mx-auto">
            Practical guides to help your resume beat ATS filters and land more
            interviews.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post, i) => (
            <Link
              key={i}
              href={`/blog/${post.slug}`}
              className="glass rounded-2xl p-7 flex flex-col gap-4 hover:border-white/15 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full border ${tagColors[post.tag] || "text-white/40 bg-white/5 border-white/10"}`}
                >
                  {post.tag}
                </span>
                <div className="flex items-center gap-1 text-white/20 text-xs">
                  <Clock size={11} /> {post.readTime}
                </div>
              </div>
              <div>
                <h2 className="font-syne font-bold text-white text-lg leading-tight mb-2 group-hover:gradient-text transition-all">
                  {post.title}
                </h2>
                <p className="text-white/40 text-sm leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
              <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/6">
                <span className="text-white/20 text-xs">{post.date}</span>
                <span className="text-[#4F7EFF] text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read more <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
