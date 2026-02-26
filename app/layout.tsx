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
  title: "ResumeScore — Free ATS Resume Checker",
  description:
    "Check how your resume performs against ATS filters. Get a detailed score and actionable fixes. 100% free, no signup needed.",
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
