import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { getProgramSlugs } from "@/lib/cms/programs";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getProgramSlugs();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteConfig.url}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${siteConfig.url}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteConfig.url}/programs`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteConfig.url}/impact`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteConfig.url}/partners`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteConfig.url}/team`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteConfig.url}/get-involved`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteConfig.url}/contact`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${siteConfig.url}/privacy-policy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteConfig.url}/terms-and-conditions`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const programRoutes: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${siteConfig.url}/programs/${slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...programRoutes];
}
