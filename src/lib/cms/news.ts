import { newsArticles, newsPlaceholderCount } from "@/data/news";
import type { NewsArticle } from "@/types/content";

export async function getNewsArticles(): Promise<NewsArticle[]> {
  return newsArticles;
}

export async function getNewsPlaceholderCount(): Promise<number> {
  return newsPlaceholderCount;
}

export async function getNewsArticleBySlug(slug: string): Promise<NewsArticle | undefined> {
  return newsArticles.find((a) => a.slug === slug);
}
