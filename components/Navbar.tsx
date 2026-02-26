"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: "/blog", label: "Resume Tips" },
    { href: "/about", label: "About" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/6 bg-[#0D0D14]/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-linear-to-br from-[#4F7EFF] to-[#A855F7] flex items-center justify-center">
            <FileText size={16} className="text-white" />
          </div>
          <span className="font-syne font-700 text-lg text-white tracking-tight">
            Resume<span className="linear-text">Score</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm transition-colors ${
                pathname === l.href
                  ? "text-white"
                  : "text-white/50 hover:text-white"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/"
            className="text-sm bg-linear-to-r from-[#4F7EFF] to-[#A855F7] text-white px-5 py-2 rounded-full font-medium hover:opacity-90 transition-opacity"
          >
            Score My Resume
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white/60"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-white/6 bg-[#0D0D14] px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-white/60 hover:text-white text-sm"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/"
            className="text-sm bg-linear-to-r from-[#4F7EFF] to-[#A855F7] text-white px-5 py-2.5 rounded-full font-medium text-center"
            onClick={() => setOpen(false)}
          >
            Score My Resume
          </Link>
        </div>
      )}
    </nav>
  );
}
