import type { NewsArticle } from "@/types/content";

/**
 * No news articles were supplied in the source documents. Per project
 * requirements, we do not fabricate articles, dates, or quotes. Instead this
 * file defines CMS-ready placeholder slots that editors can replace with real
 * articles once Sanity CMS is connected (see /lib/cms/news.ts and the README
 * CMS guide). The News page and homepage detect `isPlaceholder` and render an
 * honest "coming soon" state instead of invented headlines.
 */
export const newsArticles: NewsArticle[] = [];

export const newsPlaceholderCount = 3;
