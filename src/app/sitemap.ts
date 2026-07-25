import type { MetadataRoute } from "next";
import { siteConfig, navLinks, legalLinks } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [...navLinks, ...legalLinks];
  return pages.map((link) => ({
    url: `${siteConfig.url}${link.href}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: link.href === "/" ? 1 : 0.7,
  }));
}
