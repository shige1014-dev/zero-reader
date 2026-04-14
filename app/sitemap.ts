import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://civilization-leap.vercel.app";

  const articleEntries = getAllArticles().map((article) => ({
    url: `${siteUrl}/civilization-leap/${article.slug}`,
    lastModified: article.publishedAt,
    changeFrequency: "monthly" as const,
    priority: 0.8
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.6
    },
    ...articleEntries
  ];
}
