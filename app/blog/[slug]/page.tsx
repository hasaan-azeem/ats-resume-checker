import Navbar from "@/components/Navbar";
import Link from "next/link";
import { ArrowLeft, Clock, ArrowRight } from "lucide-react";

// Simple static content for the first article (you will expand these later)
const posts: Record<
  string,
  {
    title: string;
    date: string;
    readTime: string;
    tag: string;
    content: string;
  }
> = {
  "what-is-ats": {
    title: "What is an ATS and why does it reject your resume?",
    date: "Jan 12, 2025",
    readTime: "5 min read",
    tag: "Basics",
    content: `
## What is an ATS?

An Applicant Tracking System (ATS) is software used by employers to manage job applications. When you apply online, your resume almost always goes through an ATS before a human ever sees it.

Companies like Workday, Greenhouse, Taleo, and Lever are all ATS platforms used by thousands of employers worldwide. Over 99% of Fortune 500 companies use an ATS to handle their hiring.

## How does an ATS work?

When you submit your resume, the ATS does several things automatically. First, it parses your resume, extracting the text from your PDF or Word document and storing it in a structured database. Then it scans for keywords that match the job description. It checks for required sections like Experience and Education. Finally it ranks your resume against other applicants and filters out those below a threshold score.

If your resume does not score high enough, it is archived automatically and a human never reviews it. This is why so many qualified candidates never hear back after applying.

## Why does it reject good resumes?

The ATS does not understand context the way a human does. It looks for exact or near-exact keyword matches. A resume that says "managed a team" might fail where one that says "team management" passes, even if they mean the same thing.

Common reasons for ATS rejection include missing keywords from the job description, formatting issues like tables and columns that confuse the parser, lack of standard section headings, and unusual fonts or special characters.

## What can you do about it?

The good news is that ATS optimization is learnable and actionable. Use our free tool to score your resume against any job description and get specific suggestions to improve your score instantly.
    `,
  },
};

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = posts[params.slug];

  if (!post) {
    return (
      <div className="min-h-screen bg-[#0D0D14] flex items-center justify-center">
        <Navbar />
        <div className="text-center">
          <h1 className="font-syne text-4xl font-bold text-white mb-4">
            Article not found
          </h1>
          <Link href="/blog" className="text-[#4F7EFF] hover:underline">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0D14]">
      <Navbar />
      <div className="max-w-2xl mx-auto px-6 pt-36 pb-20">
        <Link
          href="/blog"
          className="flex items-center gap-2 text-white/30 hover:text-white text-sm transition-colors mb-8"
        >
          <ArrowLeft size={14} /> All articles
        </Link>

        <div className="mb-8">
          <span className="text-xs font-semibold text-[#4F7EFF] bg-[#4F7EFF]/10 border border-[#4F7EFF]/20 px-3 py-1 rounded-full">
            {post.tag}
          </span>
          <h1 className="font-syne text-4xl font-extrabold text-white mt-5 mb-4 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-white/30 text-sm">
            <span>{post.date}</span>
            <span className="flex items-center gap-1">
              <Clock size={12} /> {post.readTime}
            </span>
          </div>
        </div>

        <div
          className="prose prose-invert prose-sm max-w-none text-white/60 leading-relaxed
                     prose-headings:font-syne prose-headings:text-white prose-headings:font-bold
                     prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-3
                     prose-p:mb-4 prose-p:text-white/60"
          dangerouslySetInnerHTML={{
            __html: post.content
              .replace(/\n## /g, "<h2>")
              .replace(/\n/g, "<br/>"),
          }}
        />

        {/* CTA */}
        <div className="mt-14 glass rounded-2xl p-8 text-center border border-[#4F7EFF]/20">
          <h3 className="font-syne font-bold text-white text-xl mb-3">
            Ready to check your resume?
          </h3>
          <p className="text-white/40 text-sm mb-6">
            Use our free ATS scorer to see exactly where your resume stands.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-linear-to-r from-[#4F7EFF] to-[#A855F7] text-white font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-opacity text-sm"
          >
            Score My Resume Free <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
