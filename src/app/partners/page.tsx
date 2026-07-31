import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { getPartnershipOpportunities, getPartnerBenefits, getCollaborationAreas } from "@/lib/cms/partners";
import { buildMetadata } from "@/lib/metadata";
import Link from "next/link";

export const metadata = buildMetadata({
  title: "Partner With Us",
  description:
    "Partner with Kikwetu Foundation as a CSR program, NGO, government agency, university, or foundation. Explore partnership opportunities and benefits.",
  path: "/partners",
});

export default async function PartnersPage() {
  const [opportunities, benefits, collaborationAreas] = await Promise.all([
    getPartnershipOpportunities(),
    getPartnerBenefits(),
    getCollaborationAreas(),
  ]);

  return (
    <>
      <PageHero
        eyebrow="Partners"
        title="Build lasting impact with Kikwetu Foundation"
        description="We partner with sponsors, donors, NGOs, governments, corporates, and universities who share our commitment to transparent, sustainable youth development."
        image={{
          src: "/images/kikwetu-foundation-youth-community-gathering.jpg",
          alt: "Kikwetu Foundation team and community members gathered together",
          width: 1800,
          height: 1346,
        }}
        compact
      />

      {/* Why Partner */}
      <section className="section">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <p className="eyebrow mb-3">Why Partner With Us</p>
              <h2 className="h1 mb-4">A track record built on transparency and accountability</h2>
              <p className="text-secondary mb-4">
                Since 2012, Kikwetu Foundation has built sustainable, community-rooted
                programs that reach real people with measurable outcomes. Our members
                operate across Africa and Europe, giving partners access to a genuinely
                pan-African network grounded in grassroots delivery.
              </p>
              <Link href="/contact" className="btn btn-brand-primary">
                Start a Conversation
              </Link>
            </div>
            <div className="col-lg-6">
              <ul className="list-unstyled d-flex flex-column gap-3 mb-0">
                {benefits.map((benefit) => (
                  <li key={benefit} className="d-flex gap-3 kf-card p-3">
                    <i className="bi bi-check-circle-fill text-olive fs-5" aria-hidden="true" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Opportunities */}
      <section className="section bg-olive-tint">
        <div className="container">
          <SectionHeading
            eyebrow="Partnership Opportunities"
            title="Ways to work with Kikwetu Foundation"
            description="Every partnership starts with understanding your goals, here are the models we most commonly build together."
          />
          <div className="row g-4">
            {opportunities.map((opportunity) => (
              <div className="col-md-6 col-lg-4" key={opportunity.title}>
                <div className="kf-card p-4 h-100">
                  <span className="kf-icon-badge mb-3" aria-hidden="true">
                    <i className={`bi ${opportunity.icon}`} />
                  </span>
                  <p className="small text-uppercase fw-bold text-olive mb-1">{opportunity.audience}</p>
                  <h3 className="h5 mb-2">{opportunity.title}</h3>
                  <p className="small text-secondary mb-0">{opportunity.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Partners note */}
      <section className="section">
        <div className="container">
          <div className="kf-card p-4 p-lg-5 text-center mx-auto" style={{ maxWidth: "42rem" }}>
            <i className="bi bi-people-fill fs-1 text-olive mb-3" aria-hidden="true" />
            <h2 className="h4 mb-3">Be among our first published partners</h2>
            <p className="text-secondary mb-0">
              We&apos;re building out a dedicated showcase for our partner organizations. If
              you&apos;d like your organization featured here as we formalize a partnership,
              let&apos;s talk.
            </p>
          </div>
        </div>
      </section>

      {/* How organizations can work with us */}
      <section className="section bg-olive-tint">
        <div className="container">
          <SectionHeading
            eyebrow="Collaborate With Us"
            title="How can my organization work with Kikwetu Foundation?"
            description="Partnership takes many forms. Here are the models organizations most often use to work alongside our team, whatever your size, sector, or focus."
            align="center"
          />
          <div className="row g-4">
            {collaborationAreas.map((area) => (
              <div className="col-md-6 col-lg-4" key={area.title}>
                <div className="kf-card p-4 h-100">
                  <span className="kf-icon-badge mb-3" aria-hidden="true">
                    <i className={`bi ${area.icon}`} />
                  </span>
                  <p className="small text-uppercase fw-bold text-olive mb-1">{area.audience}</p>
                  <h3 className="h5 mb-2">{area.title}</h3>
                  <p className="small text-secondary mb-0">{area.description}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center mt-5 mb-0">
            Ready to explore one of these together? <Link href="/contact">Contact our team</Link> to start
            the conversation.
          </p>
        </div>
      </section>
    </>
  );
}
