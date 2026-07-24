import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { ProgramCard } from "@/components/sections/program-card";
import { CTASection } from "@/components/sections/cta-section";
import { getCurrentPrograms, getPastPrograms } from "@/lib/cms/programs";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Our Programs",
  description:
    "Explore Kikwetu Foundation's youth-empowerment programs — from the K-Hub digital-skills initiative to mentorship, entrepreneurship, and education programs across Kenya.",
  path: "/programs",
});

export default async function ProgramsPage() {
  const [currentPrograms, pastPrograms] = await Promise.all([getCurrentPrograms(), getPastPrograms()]);

  return (
    <>
      <PageHero
        eyebrow="Our Programs"
        title="Programs built around real community needs"
        description="Every Kikwetu Foundation program has a defined beneficiary group, clear objectives, and an expected outcome — from digital skills to mentorship and education access."
        image={{
          src: "/images/kikwetu-foundation-youth-graduation-ceremony.jpg",
          alt: "Kikwetu Foundation program graduates at a ceremony",
          width: 1800,
          height: 1200,
        }}
        compact
      />

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Current Program"
            title="Our flagship initiative"
            description="The K-Hub Project is where our energy and resources are concentrated today."
          />
          <div className="row g-4">
            {currentPrograms.map((program) => (
              <div className="col-md-6 col-lg-4" key={program.slug}>
                <ProgramCard program={program} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-olive-tint">
        <div className="container">
          <SectionHeading
            eyebrow="Program History"
            title="Programs that shaped our approach"
            description="These initiatives built the foundation — and the track record — that current partners rely on."
          />
          <div className="row g-4">
            {pastPrograms.map((program) => (
              <div className="col-md-6 col-lg-4" key={program.slug}>
                <ProgramCard program={program} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Want to help scale a program?"
        description="From funding a cohort of the K-Hub Project to co-designing a new initiative, we'll work with you to define real, measurable outcomes."
      />
    </>
  );
}
