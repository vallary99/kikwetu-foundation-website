import dynamic from "next/dynamic";
import { PageHero } from "@/components/sections/page-hero";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

const DonateForm = dynamic(() => import("@/components/ui/donate-form").then((mod) => mod.DonateForm), {
  loading: () => <div style={{ minHeight: 420 }} aria-hidden="true" />,
});

export const metadata = buildMetadata({
  title: "Donate",
  description:
    "Support Kikwetu Foundation's youth-empowerment programs in Kenya with a secure one-time or monthly donation via PayPal.",
  path: "/donate",
});

const donationUses = [
  {
    icon: "bi-mortarboard-fill",
    title: "Skills & digital training",
    description: "Funds ICT, entrepreneurship, and vocational training for young people through K-Hub and related programs.",
  },
  {
    icon: "bi-people-fill",
    title: "Mentorship & outreach",
    description: "Supports mentorship, community outreach events, and initiatives like Caravan of Love.",
  },
  {
    icon: "bi-graph-up-arrow",
    title: "Program growth",
    description: "Helps us scale proven programs into new counties and reach more youth each year.",
  },
];

export default function DonatePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DonateAction",
    recipient: {
      "@type": "NGO",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHero
        eyebrow="Donate"
        title="Fuel the next chapter of youth transformation"
        description="Every gift, one-time or monthly, goes directly toward mentorship, digital skills training, and entrepreneurship programs for young people across Kenya."
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
          <div className="row g-5">
            <div className="col-lg-5">
              <h2 className="h3 mb-3">Where your donation goes</h2>
              <p className="text-secondary mb-4">
                Kikwetu Foundation has equipped young people across Kenya with opportunity since 2012. Donations
                directly support our current programming and help us reach more communities.
              </p>
              <ul className="list-unstyled d-flex flex-column gap-4 mb-4">
                {donationUses.map((use) => (
                  <li className="d-flex gap-3" key={use.title}>
                    <span className="kf-icon-badge flex-shrink-0" aria-hidden="true">
                      <i className={`bi ${use.icon}`} />
                    </span>
                    <div>
                      <p className="fw-semibold mb-1">{use.title}</p>
                      <p className="small text-secondary mb-0">{use.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="small text-secondary mb-0">
                Prefer to give another way, or represent an organization interested in co-funding a program?{" "}
                <a href="/partners" className="fw-semibold">
                  Explore partnership options
                </a>{" "}
                or <a href="/contact" className="fw-semibold">get in touch</a>.
              </p>
            </div>

            <div className="col-lg-7">
              <div className="kf-card p-4 p-md-5">
                <h2 className="h4 mb-4">Make a donation</h2>
                <DonateForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
