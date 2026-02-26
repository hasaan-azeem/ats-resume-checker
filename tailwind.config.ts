import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bricolage: ["var(--font-bricolage)"],
        jakarta:   ["var(--font-jakarta)"],
      },
      colors: {
        surface: "#F7F8FA",
        card:    "#FFFFFF",
        border:  "#E5E7EB",
        muted:   "#6B7280",
        accent:  "#2563EB",
        "accent-light": "#EFF6FF",
      },
      boxShadow: {
        card:  "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        float: "0 4px 16px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)",
        btn:   "0 1px 2px rgba(37,99,235,0.3), inset 0 1px 0 rgba(255,255,255,0.15)",
      },
    },
  },
  plugins: [animate],
};
export default config;