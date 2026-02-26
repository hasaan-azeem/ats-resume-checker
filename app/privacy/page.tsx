import Navbar from "@/components/Navbar";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0D0D14]">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 pt-36 pb-20">
        <div className="mb-12">
          <p className="text-[#4F7EFF] text-sm uppercase tracking-widest mb-4">Legal</p>
          <h1 className="font-syne text-5xl font-extrabold text-white mb-4">Privacy Policy</h1>
          <p className="text-white/30 text-sm">Last updated: January 2025</p>
        </div>

        <div className="flex flex-col gap-10 text-white/50 text-sm leading-relaxed">
          {[
            {
              title: "Data We Collect",
              content: "We do not collect, store, or transmit your resume content or job description text. All resume analysis happens in real time on our servers and the content is discarded immediately after scoring. We collect only anonymous, non-identifiable score statistics such as total score and score breakdown numbers for the purpose of improving the tool.",
            },
            {
              title: "Cookies and Analytics",
              content: "We use Google Analytics (privacy-safe mode) to understand aggregate traffic patterns such as how many people visit the site and which pages are most popular. We also use Google AdSense to display ads, which may use cookies to show relevant advertisements. You can opt out of personalized ads via Google's ad settings.",
            },
            {
              title: "Advertising",
              content: "This site displays ads served by Google AdSense. These ads may be personalized based on your browsing history. We do not control the content of these ads. Revenue from ads helps keep this service free.",
            },
            {
              title: "Third Party Services",
              content: "We use Vercel for frontend hosting and Render for backend hosting. These services may log standard server access logs (IP addresses, timestamps) as part of normal infrastructure operations. We do not share any data with third parties for marketing purposes.",
            },
            {
              title: "Children's Privacy",
              content: "This service is not directed at children under 13. We do not knowingly collect information from children.",
            },
            {
              title: "Contact",
              content: "If you have any questions about this privacy policy, please reach out via the contact information on our About page. We are happy to clarify anything.",
            },
          ].map((section, i) => (
            <div key={i}>
              <h2 className="font-syne font-bold text-white text-xl mb-3">{section.title}</h2>
              <p>{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}