import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { buildMetadata } from "@/lib/metadata";
import Link from "next/link";

export const metadata = buildMetadata({
  title: "Get Involved",
  description:
    "Volunteer with Kikwetu Foundation, become a partner, or explore internship opportunities. Join a Kenyan youth-empowerment NGO making measurable community impact.",
  path: "/get-involved",
});

const pathways = [
  {
    title: "Volunteer",
    icon: "bi-people-fill",
    description:
      "Join hands-on initiatives like Caravan of Love, K-Hub training sessions, and community outreach events. Volunteers bring time, skills, and energy directly to the youth we serve.",
    cta: { label: "Express Interest to Volunteer", href: "/contact" },
  },
  {
    title: "Become a Partner",
    icon: "bi-briefcase-fill",
    description:
      "Corporates, NGOs, governments, universities, and foundations can partner with us on CSR programs, co-funded initiatives, or shared programming.",
    cta: { label: "Explore Partnership", href: "/partners" },
  },
  {
    title: "Internship Opportunities",
    icon: "bi-journal-check",
    description:
      "We periodically open internship opportunities for young professionals looking to build experience in community development, ICT training, and program coordination. Reach out to ask about current openings.",
    cta: { label: "Ask About Internships", href: "/contact" },
  },
];

export default function GetInvolvedPage() {
  return (
    <>
      <PageHero
        eyebrow="Get Involved"
        title="There's a role for you in this transformation"
        description="Whether you have an hour, a skill set, or an organization behind you, Kikwetu Foundation has a way for you to get involved."
        image={{
          src: "/images/kikwetu-foundation-volunteers-share-for-care.jpg",
          alt: "Kikwetu Foundation volunteers wearing Share For Care t-shirts",
          width: 1400,
          height: 1327,
        }}
        compact
      />

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Ways to Get Involved" title="Choose the path that fits you" />
          <div className="row g-4">
            {pathways.map((pathway) => (
              <div className="col-md-4" key={pathway.title}>
                <div className="kf-card p-4 h-100 d-flex flex-column">
                  <span className="kf-icon-badge mb-3" aria-hidden="true">
                    <i className={`bi ${pathway.icon}`} />
                  </span>
                  <h2 className="h4 mb-2">{pathway.title}</h2>
                  <p className="text-secondary mb-4 flex-grow-1">{pathway.description}</p>
                  <Link href={pathway.cta.href} className="btn btn-brand-outline-dark align-self-start">
                    {pathway.cta.label}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-olive">
        <div className="container text-center">
          <div className="mx-auto" style={{ maxWidth: "38rem" }}>
            <h2 className="h1 text-white mb-3">Not sure where you fit?</h2>
            <p className="lead mb-4" style={{ color: "rgba(255,255,255,0.9)" }}>
              Tell us a bit about yourself or your organization, and we&apos;ll point you toward
              the program or partnership that fits best.
            </p>
            <Link href="/contact" className="btn btn-brand-outline btn-lg">
              Get In Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
