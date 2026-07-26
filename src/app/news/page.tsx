import { PageHero } from "@/components/sections/page-hero";
import { getNewsArticles, getNewsPlaceholderCount } from "@/lib/cms/news";
import { buildMetadata } from "@/lib/metadata";
import Link from "next/link";
import Image from "next/image";

export const metadata = buildMetadata({
  title: "News & Updates",
  description:
    "Read the latest news and updates from Kikwetu Foundation's youth-empowerment programs across Kenya.",
  path: "/news",
});

export default async function NewsPage() {
  const [articles, placeholderCount] = await Promise.all([getNewsArticles(), getNewsPlaceholderCount()]);

  return (
    <>
      <PageHero
        eyebrow="News"
        title="Updates from the field"
        description="Announcements, program milestones, and stories from Kikwetu Foundation's work across Kenya."
        image={{
          src: "/images/kikwetu-foundation-youth-community-gathering.jpg",
          alt: "Kikwetu Foundation team and community gathering",
          width: 1800,
          height: 1346,
        }}
        compact
      />

      <section className="section">
        <div className="container">
          {articles.length > 0 ? (
            <div className="row g-4">
              {articles.map((article) => (
                <div className="col-md-4" key={article.slug}>
                  <a href={`/news/${article.slug}`} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                    <article className="kf-card overflow-hidden h-100">
                      <Image src={article.image.src} alt={article.image.alt} width={article.image.width} height={article.image.height} sizes="(min-width: 768px) 33vw, 100vw" className="w-100 h-auto" />
                      <div className="p-4">
                        <p className="small text-secondary mb-2">{article.date}</p>
                        <h2 className="h5 mb-2" style={{ color: "var(--kf-ink)" }}>
                          {article.title}
                        </h2>
                        <p className="small text-secondary mb-0">{article.excerpt}</p>
                      </div>
                    </article>
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-5">
              <i className="bi bi-newspaper fs-1 text-olive mb-3 d-block" aria-hidden="true" />
              <h2 className="h4 mb-2">Stories from the field</h2>
              <p className="text-secondary mb-4 mx-auto" style={{ maxWidth: "32rem" }}>
                Kikwetu Foundation shares regular updates on program milestones, partnership
                announcements, and community impact as they happen. Check back soon for our
                latest coverage, or get in touch directly for the newest updates from our team.
              </p>
              <div className="row g-4 justify-content-center">
                {Array.from({ length: placeholderCount }).map((_, index) => (
                  <div className="col-md-4" key={index}>
                    <div className="kf-card p-4 d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "12rem" }}>
                      <i className="bi bi-newspaper fs-3 text-secondary mb-2" aria-hidden="true" />
                      <p className="small text-secondary mb-0">New stories are published here regularly</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/contact" className="btn btn-brand-primary mt-4">
                Contact Our Team
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
