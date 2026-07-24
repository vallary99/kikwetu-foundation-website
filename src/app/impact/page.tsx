import Image from "next/image";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { StatCard } from "@/components/sections/stat-card";
import { CTASection } from "@/components/sections/cta-section";
import { getImpactStats, getCurrentPlan } from "@/lib/cms/organization";
import { getCurrentPrograms } from "@/lib/cms/programs";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Our Impact",
  description:
    "See Kikwetu Foundation's measurable impact: 30,000+ people reached, 10,000+ beneficiaries, and programs active across 5 counties in Kenya since 2012.",
  path: "/impact",
});

const timeline = [
  { year: "2012", event: "Kikwetu Foundation's journey begins in a small cyber café in Dandora, Nairobi, training 16 youths in computer literacy." },
  { year: "2014", event: "Officially registered by the NGO Coordination Board of Kenya, formally launching our organization." },
  { year: "2012–2024", event: "Over 30,000 people reached through our programming, more than 15,000 of them in Nairobi alone." },
  { year: "Today", event: "Registered under the Public Benefits Regulatory Authority (PBORA), with 150+ members across Africa and Europe and programs active in 5 counties." },
  { year: "By 2035", event: "The K-Hub Project targets training 20,000 young people from Nairobi's Eastlands area in software development and tech skills." },
];

export default async function ImpactPage() {
  const [stats, plan, currentPrograms] = await Promise.all([getImpactStats(), getCurrentPlan(), getCurrentPrograms()]);
  const kHub = currentPrograms[0];

  return (
    <>
      <PageHero
        eyebrow="Our Impact"
        title="Impact that ripples beyond the individual"
        description="When a young person gets access to education, skills training, or entrepreneurship support, that reach extends to their family and community."
        image={{
          src: "/images/kikwetu-foundation-youth-graduation-ceremony.jpg",
          alt: "Kikwetu Foundation program graduates celebrating their achievement",
          width: 1800,
          height: 1200,
        }}
        compact
      />

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="By The Numbers" title="Our reach since 2012" />
          <div className="row g-4">
            {stats.map((stat) => (
              <div className="col-sm-6 col-lg-4" key={stat.label}>
                <StatCard stat={stat} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-olive-tint">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-6">
              <SectionHeading eyebrow="Research Insight" title="Why individual access matters" />
              <p className="text-secondary">
                Research shows that when individuals gain access to opportunities such as
                education or skills training, it significantly and directly affects those
                around them. Access to empowerment programs for youth means they are more
                likely to be educated.
              </p>
              <p className="text-secondary mb-0">
                Greater access to business opportunities through skills and entrepreneurship
                training increases family income, which can mean more jobs and a boost to
                the local economy.
              </p>
            </div>
            <div className="col-lg-6">
              <div className="bg-ink p-5 rounded-3 h-100 d-flex align-items-center">
                <blockquote className="mb-0">
                  <p className="h3 text-white mb-0">&ldquo;Anything worth having takes time.&rdquo;</p>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Our Timeline" title="Milestones in our transformation journey" />
          <ol className="list-unstyled">
            {timeline.map((item, index) => (
              <li key={index} className="d-flex gap-4 pb-4 mb-4" style={{ borderBottom: index < timeline.length - 1 ? "1px solid var(--kf-border)" : "none" }}>
                <div style={{ minWidth: "7rem" }}>
                  <span className="fw-bold text-olive font-heading">{item.year}</span>
                </div>
                <p className="text-secondary mb-0">{item.event}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Current project highlight */}
      {kHub ? (
        <section className="section bg-ink">
          <div className="container">
            <div className="row align-items-center g-5">
              <div className="col-lg-6">
                <p className="eyebrow eyebrow-light mb-3">Current Project Highlight</p>
                <h2 className="h1 text-white mb-3">{kHub.name}</h2>
                <p className="mb-4" style={{ color: "rgba(255,255,255,0.85)" }}>
                  {kHub.summary}
                </p>
                <h3 className="h6 text-white text-uppercase mb-3">Our Plan</h3>
                <ul className="list-unstyled d-flex flex-column gap-2">
                  {plan.slice(0, 4).map((item) => (
                    <li key={item} className="d-flex gap-2" style={{ color: "rgba(255,255,255,0.85)" }}>
                      <i className="bi bi-check-circle-fill text-white mt-1" aria-hidden="true" />
                      <span className="small">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-lg-6">
                <div className="kf-rounded-lg">
                  <Image src={kHub.image.src} alt={kHub.image.alt} width={kHub.image.width} height={kHub.image.height} className="w-100 h-auto" />
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <CTASection />
    </>
  );
}
