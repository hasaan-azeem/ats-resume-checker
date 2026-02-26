import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://atscan.vercel.app/",        lastModified: new Date(), changeFrequency: "weekly",  priority: 1 },
    { url: "https://atscan.vercel.app/blog",   lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: "https://atscan.vercel.app/about",  lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: "https://atscan.vercel.app/privacy",lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
  ];
}