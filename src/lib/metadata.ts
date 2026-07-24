import type { Metadata } from "next";
import { siteConfig } from "./site-config";

interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
}

/**
 * Builds a consistent Metadata object (title, canonical, Open Graph, Twitter
 * Card) for a page. Every route should call this rather than hand-rolling
 * metadata, so canonical URLs and social previews stay correct site-wide.
 */
export function buildMetadata({ title, description, path, keywords, image }: PageMetadataInput): Metadata {
  const url = `${siteConfig.url}${path}`;
  const ogImage = image ?? `${siteConfig.url}/images/kikwetu-foundation-youth-community-gathering.jpg`;

  return {
    title,
    description,
    keywords: keywords ?? siteConfig.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 800, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
