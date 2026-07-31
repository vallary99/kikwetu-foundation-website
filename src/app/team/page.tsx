import Image from "next/image";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { CTASection } from "@/components/sections/cta-section";
import { getTeamMembers, getTeamGroupPhoto } from "@/lib/cms/team";
import { getOrganizationProfile } from "@/lib/cms/organization";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata = buildMetadata({
  title: "Our Team",
  description:
    "Meet the people behind Kikwetu Foundation, a pan-African network of 150+ members working together to transform youth opportunity across Kenya.",
  path: "/team",
});

export default async function TeamPage() {
  const [members, groupPhoto, organization] = await Promise.all([
    getTeamMembers(),
    getTeamGroupPhoto(),
    getOrganizationProfile(),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    url: `${siteConfig.url}/team`,
    mainEntity: members.map((member) => ({
      "@type": "Person",
      name: member.name,
      jobTitle: member.role,
      image: `${siteConfig.url}${member.image.src}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        eyebrow="Our Team"
        title="The people building Kikwetu Foundation"
        description="A pan-African network of 150+ members across Africa and Europe, anchored by a small team that turns our mission into everyday work in Nairobi's communities."
        image={groupPhoto}
      />

      {/* Collective introduction */}
      <section className="section">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <p className="eyebrow mb-3">Who We Are</p>
              <h2 className="h1 mb-4">One team, one purpose: transform</h2>
              <p className="text-secondary">
                Kikwetu Foundation began with a founder and a small group of passionate
                youth determined to advocate for African culture as a pathway to economic
                opportunity. That founding spirit still defines how the team works today.
              </p>
              <p className="text-secondary mb-0">{organization.approach[0]}</p>
            </div>
            <div className="col-lg-6">
              <div className="kf-rounded-lg kf-shadow-soft">
                <Image
                  src={groupPhoto.src}
                  alt={groupPhoto.alt}
                  width={groupPhoto.width}
                  height={groupPhoto.height}
                  sizes="(min-width: 992px) 50vw, 100vw"
                  className="w-100 h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team grid */}
      <section className="section bg-olive-tint">
        <div className="container">
          <SectionHeading
            eyebrow="Meet the Team"
            title="The team behind our programs"
            description="Each member brings a different skill set to the same mission: creating real opportunity for young Africans."
            align="center"
          />
          <div className="row g-4">
            {members.map((member) => (
              <div className="col-sm-6 col-lg-4" key={member.slug}>
                <div className="kf-card h-100 overflow-hidden">
                  <div className="kf-team-photo">
                    <Image
                      src={member.image.src}
                      alt={member.image.alt}
                      width={member.image.width}
                      height={member.image.height}
                      sizes="(min-width: 992px) 33vw, (min-width: 576px) 50vw, 100vw"
                      className="kf-team-photo-img"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="h5 mb-1">{member.name}</h3>
                    {member.role ? (
                      <p className="small fw-semibold text-olive mb-2">{member.role}</p>
                    ) : null}
                    <p className="small text-secondary mb-0">{member.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Want to work alongside our team?"
        description="Whether you're exploring a partnership or ready to volunteer your time, our team is glad to hear from you."
      />
    </>
  );
}
