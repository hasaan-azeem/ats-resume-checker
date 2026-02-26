import type { Metadata } from "next";
import { Bricolage_Grotesque, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  weight: ["400", "500", "600", "700", "800"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ResumeScore - Free ATS Resume Checker",
  description:
    "Check how your resume performs against ATS filters in seconds. Get a detailed score across keywords, formatting, sections, and readability. 100% free, no signup needed.",
  keywords: [
    "ATS resume checker",
    "free resume scanner",
    "ATS score",
    "resume keyword checker",
    "applicant tracking system",
    "resume optimizer",
    "ATS friendly resume",
    "resume analysis tool",
  ],
  openGraph: {
    title: "ResumeScore - Free ATS Resume Checker",
    description:
      "Find out if your resume will pass ATS filters. Get a detailed score and fix it for free in under 30 seconds.",
    url: "https://atscan.vercel.app/",
    siteName: "ResumeScore",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ResumeScore - Free ATS Resume Checker",
    description:
      "Find out if your resume will pass ATS filters. Free, instant, no signup.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${bricolage.variable} ${jakarta.variable} antialiased bg-[#F7F8FA] text-[#0F0F0F]`}
      >
        {children}
      </body>
    </html>
  );
}
