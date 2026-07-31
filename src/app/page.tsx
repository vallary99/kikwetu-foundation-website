import Image from "next/image";
import Link from "next/link";
import { HomeHero } from "@/components/sections/home-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { StatCard } from "@/components/sections/stat-card";
import { ProgramCard } from "@/components/sections/program-card";
import { CTASection } from "@/components/sections/cta-section";
import { getOrganizationProfile, getImpactStats } from "@/lib/cms/organization";
import { getAllPrograms } from "@/lib/cms/programs";
import { getTeamMembers } from "@/lib/cms/team";
import { partnershipOpportunities } from "@/data/partners";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Kikwetu Foundation | Youth Empowerment NGO in Kenya",
  description:
    "Kikwetu Foundation transforms African youth through mentorship, digital skills, and entrepreneurship programs. Partner with a trusted, transparent Kenyan NGO since 2012.",
  path: "/",
});

export default async function HomePage() {
  const [organization, stats, programs, teamMembers] = await Promise.all([
    getOrganizationProfile(),
    getImpactStats(),
    getAllPrograms(),
    getTeamMembers(),
  ]);

  const featuredPrograms = programs.slice(0, 3);
  const featuredTeam = teamMembers.slice(0, 4);

  return (
    <>
      <HomeHero />

      {/* About Preview */}
      <section className="section">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <p className="mb-3">Who We Are</p>
              <h2 className="h1 mb-4">
                A grassroots movement that grew into a pan-African foundation
              </h2>
              <p className="text-secondary mb-3">{organization.story[0]}</p>
              <p className="text-secondary mb-4">
                Vision: {organization.vision} Mission: {organization.mission}
              </p>
              <Link href="/about" className="btn btn-brand-outline-dark">
                Learn More About Us
                <i className="bi bi-arrow-right ms-2" aria-hidden="true" />
              </Link>
            </div>
            <div className="col-lg-6">
              <div className="kf-rounded-lg kf-shadow-soft">
                <Image
                  src="/images/kikwetu-foundation-youth-graduation-ceremony.jpg"
                  alt="Kikwetu Foundation youth beneficiaries celebrating at a graduation ceremony"
                  width={1800}
                  height={1200}
                  sizes="(min-width: 992px) 50vw, 100vw"
                  className="w-100 h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="section bg-olive-tint">
        <div className="container">
          <SectionHeading
            eyebrow="Our Programs"
            title="Programs designed for measurable, lasting impact"
            description="From digital-skills training to grassroots mentorship, every Kikwetu Foundation program is built around a clear beneficiary group and a defined outcome."
          />
          <div className="row g-4">
            {featuredPrograms.map((program) => (
              <div className="col-md-6 col-lg-4" key={program.slug}>
                <ProgramCard program={program} />
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
            <Link href="/programs" className="btn btn-brand-primary">
              View All Programs
            </Link>
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Our Impact"
            title="Measurable reach across Kenya"
            description="Figures below are drawn directly from our Company Profile and reflect our cumulative, direct and indirect reach."
          />
          <div className="row g-4">
            {stats.slice(0, 6).map((stat) => (
              <div className="col-sm-6 col-lg-4" key={stat.label}>
                <StatCard stat={stat} />
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
            <Link href="/impact" className="btn btn-brand-outline-dark">
              See Our Full Impact
            </Link>
          </div>
        </div>
      </section>

      {/* Why Partner With Us */}
      <section className="section bg-ink">
        <div className="container">
          <SectionHeading
            eyebrow="For Partners & Sponsors"
            title="Why organizations partner with Kikwetu Foundation"
            description="We work with sponsors, donors, NGOs, governments, and corporate CSR programs that expect transparency, accountability, and real community impact."
            light
          />
          <div className="row g-4">
            {partnershipOpportunities.slice(0, 3).map((item) => (
              <div className="col-md-4" key={item.title}>
                <div className="h-100 p-4 rounded-3" style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}>
                  <span className="kf-icon-badge mb-3" aria-hidden="true">
                    <i className={`bi ${item.icon}`} />
                  </span>
                  <h3 className="h5 text-white mb-2">{item.title}</h3>
                  <p className="small mb-0" style={{ color: "rgba(255,255,255,0.75)" }}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
            <Link href="/partners" className="btn btn-brand-accent btn-lg">
              Explore Partnership Opportunities
            </Link>
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Our Team"
            title="The people behind the work"
            description="A small, hands-on team anchoring a pan-African network of 150+ members across Africa and Europe."
          />
          <div className="row g-4">
            {featuredTeam.map((member) => (
              <div className="col-sm-6 col-lg-3" key={member.slug}>
                <div className="kf-card h-100 overflow-hidden text-center">
                  <div className="kf-team-photo">
                    <Image
                      src={member.image.src}
                      alt={member.image.alt}
                      width={member.image.width}
                      height={member.image.height}
                      sizes="(min-width: 992px) 25vw, (min-width: 576px) 50vw, 100vw"
                      className="kf-team-photo-img"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="h6 mb-1">{member.name}</h3>
                    {member.role ? <p className="small text-olive mb-0">{member.role}</p> : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
            <Link href="/team" className="btn btn-brand-outline-dark">
              Meet the Full Team
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
