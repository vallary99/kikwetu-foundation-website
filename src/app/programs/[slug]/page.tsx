import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CTASection } from "@/components/sections/cta-section";
import { getAllPrograms, getProgram, getProgramSlugs } from "@/lib/cms/programs";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";
import type { Metadata } from "next";

interface ProgramPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getProgramSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProgramPageProps): Promise<Metadata> {
  const { slug } = await params;
  const program = await getProgram(slug);
  if (!program) return {};

  return buildMetadata({
    title: program.name,
    description: program.summary,
    path: `/programs/${program.slug}`,
    image: `${siteConfig.url}${program.image.src}`,
  });
}

export default async function ProgramDetailPage({ params }: ProgramPageProps) {
  const { slug } = await params;
  const [program, allPrograms] = await Promise.all([getProgram(slug), getAllPrograms()]);

  if (!program) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: program.name,
    description: program.summary,
    url: `${siteConfig.url}/programs/${program.slug}`,
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  const otherPrograms = allPrograms.filter((p) => p.slug !== program.slug).slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="section">
        <div className="container">
          <div className="row g-5 align-items-start">
            <div className="col-lg-7">
              <span className={`kf-badge-status ${program.status === "current" ? "kf-badge-current" : "kf-badge-past"} mb-3 d-inline-block`}>
                {program.status === "current" ? "Current Program" : "Past Program"}
              </span>
              <h1 className="mb-4">{program.name}</h1>
              {program.description.map((paragraph, index) => (
                <p className="text-secondary" key={index}>
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="col-lg-5">
              <div className="kf-rounded-lg kf-shadow-soft mb-4">
                <Image
                  src={program.image.src}
                  alt={program.image.alt}
                  width={program.image.width}
                  height={program.image.height}
                  className="w-100 h-auto"
                />
              </div>
              <div className="kf-card p-4">
                <h2 className="h6 text-uppercase text-secondary mb-3">Objectives</h2>
                <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
                  {program.objectives.map((objective) => (
                    <li key={objective} className="d-flex gap-2">
                      <i className="bi bi-check-circle-fill text-olive mt-1" aria-hidden="true" />
                      <span>{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="row g-4 mt-4">
            <div className="col-md-6">
              <div className="kf-card p-4 h-100">
                <span className="kf-icon-badge mb-3" aria-hidden="true">
                  <i className="bi bi-people" />
                </span>
                <h2 className="h5 mb-2">Beneficiaries</h2>
                <p className="text-secondary mb-0">{program.beneficiaries}</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="kf-card p-4 h-100">
                <span className="kf-icon-badge mb-3" aria-hidden="true">
                  <i className="bi bi-graph-up-arrow" />
                </span>
                <h2 className="h5 mb-2">Expected Impact</h2>
                <p className="text-secondary mb-0">{program.expectedImpact}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-tight bg-olive-tint">
        <div className="container">
          <h2 className="h4 mb-4">Explore other programs</h2>
          <div className="row g-3">
            {otherPrograms.map((p) => (
              <div className="col-md-4" key={p.slug}>
                <Link href={`/programs/${p.slug}`} className="d-block kf-card p-3 text-decoration-none h-100">
                  <p className="fw-semibold mb-1" style={{ color: "var(--kf-ink)" }}>
                    {p.name}
                  </p>
                  <p className="small text-olive mb-0">
                    View program <i className="bi bi-arrow-right ms-1" aria-hidden="true" />
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
