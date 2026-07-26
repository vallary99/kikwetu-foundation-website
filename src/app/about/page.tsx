import Image from "next/image";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { CTASection } from "@/components/sections/cta-section";
import { getOrganizationProfile, getFocusAreas } from "@/lib/cms/organization";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "About Us",
  description:
    "Learn how Kikwetu Foundation grew from a Dandora cyber café in 2012 into a pan-African youth-empowerment foundation, and the values that guide our work today.",
  path: "/about",
});

export default async function AboutPage() {
  const [organization, focusAreas] = await Promise.all([getOrganizationProfile(), getFocusAreas()]);

  return (
    <>
      <PageHero
        eyebrow="About Kikwetu Foundation"
        title="A home for transformation, built by young people, for young people"
        description="From a single cyber café in Dandora to a pan-African network of 150+ members, this is our story."
        image={{
          src: "/images/kikwetu-foundation-community-outreach-students.jpg",
          alt: "Students taking part in a Kikwetu Foundation community outreach event",
          width: 1600,
          height: 1062,
        }}
      />

      {/* Story */}
      <section className="section">
        <div className="container">
          <div className="row g-5 align-items-start">
            <div className="col-lg-7">
              <p className="eyebrow mb-3">Our Story</p>
              <h2 className="h1 mb-4">How Kikwetu Foundation began</h2>
              {organization.story.map((paragraph, index) => (
                <p className="text-secondary" key={index}>
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="col-lg-5">
              <div className="kf-rounded-lg kf-shadow-soft">
                <Image
                  src="/images/kikwetu-foundation-youth-community-gathering.jpg"
                  alt="Kikwetu Foundation youth and volunteers gathered together in Nairobi"
                  width={1800}
                  height={1346}
                  sizes="(min-width: 992px) 42vw, 100vw"
                  className="w-100 h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision / Mission */}
      <section className="section bg-olive-tint">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-6">
              <div className="kf-card p-4 p-lg-5 h-100">
                <span className="kf-icon-badge mb-3" aria-hidden="true">
                  <i className="bi bi-eye" />
                </span>
                <h2 className="h3 mb-3">Our Vision</h2>
                <p className="text-secondary mb-0">{organization.vision}</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="kf-card p-4 p-lg-5 h-100">
                <span className="kf-icon-badge mb-3" aria-hidden="true">
                  <i className="bi bi-compass" />
                </span>
                <h2 className="h3 mb-3">Our Mission</h2>
                <p className="text-secondary mb-0">{organization.mission}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Our Values" title="What guides every program we run" align="center" />
          <div className="row g-4">
            {organization.values.map((value) => (
              <div className="col-sm-6 col-lg-4" key={value.name}>
                <div className="kf-card p-4 h-100 text-center">
                  <h3 className="h5 mb-2">{value.name}</h3>
                  <p className="small text-secondary mb-0">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Organizational Approach */}
      <section className="section bg-ink">
        <div className="container">
          <SectionHeading
            eyebrow="Our Approach"
            title="How we create transformation"
            light
          />
          <div className="row g-4 mb-5">
            {organization.approach.map((paragraph, index) => (
              <div className="col-lg-6" key={index}>
                <p style={{ color: "rgba(255,255,255,0.85)" }}>{paragraph}</p>
              </div>
            ))}
          </div>
          <div className="row g-4">
            {focusAreas.map((area) => (
              <div className="col-sm-6 col-lg-3" key={area.name}>
                <div className="h-100 p-4 rounded-3" style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}>
                  <span className="kf-icon-badge mb-3" aria-hidden="true">
                    <i className={`bi ${area.icon}`} />
                  </span>
                  <h3 className="h6 text-white mb-2">{area.name}</h3>
                  <p className="small mb-0" style={{ color: "rgba(255,255,255,0.75)" }}>
                    {area.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
