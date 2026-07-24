import { PageHero } from "@/components/sections/page-hero";
import { ContactForm } from "@/components/ui/contact-form";
import { getContactInfo } from "@/lib/cms/partners";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata = buildMetadata({
  title: "Contact Us",
  description:
    "Get in touch with Kikwetu Foundation. Reach our Nairobi office by email or send a message about partnerships, volunteering, or sponsorship.",
  path: "/contact",
});

export default async function ContactPage() {
  const contact = await getContactInfo();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: `${siteConfig.url}/contact`,
    mainEntity: {
      "@type": "Organization",
      name: siteConfig.name,
      contactPoint: {
        "@type": "ContactPoint",
        email: contact.email,
        contactType: "general inquiries",
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: contact.address.line1,
        addressLocality: "Nairobi",
        addressCountry: "KE",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        eyebrow="Contact"
        title="Let's start a conversation"
        description="Reach out about partnerships, sponsorship, volunteering, or general inquiries — our team responds to every message."
        image={{
          src: "/images/kikwetu-foundation-community-outreach-students.jpg",
          alt: "Kikwetu Foundation community outreach event",
          width: 1600,
          height: 1062,
        }}
        compact
      />

      <section className="section">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-7">
              <h2 className="h3 mb-4">Send us a message</h2>
              <ContactForm />
            </div>

            <div className="col-lg-5">
              <div className="kf-card p-4 p-lg-5 mb-4">
                <h2 className="h5 mb-4">Contact details</h2>
                <ul className="list-unstyled d-flex flex-column gap-4 mb-0">
                  <li className="d-flex gap-3">
                    <span className="kf-icon-badge" aria-hidden="true">
                      <i className="bi bi-envelope" />
                    </span>
                    <div>
                      <p className="fw-semibold mb-1">Email</p>
                      <a href={`mailto:${contact.email}`} className="text-secondary">
                        {contact.email}
                      </a>
                    </div>
                  </li>
                  <li className="d-flex gap-3">
                    <span className="kf-icon-badge" aria-hidden="true">
                      <i className="bi bi-geo-alt" />
                    </span>
                    <div>
                      <p className="fw-semibold mb-1">Office</p>
                      <p className="text-secondary mb-0">
                        {contact.address.line1}
                        <br />
                        {contact.address.line2}, {contact.address.city}
                      </p>
                    </div>
                  </li>
                  <li className="d-flex gap-3">
                    <span className="kf-icon-badge" aria-hidden="true">
                      <i className="bi bi-globe" />
                    </span>
                    <div>
                      <p className="fw-semibold mb-1">Website</p>
                      <p className="text-secondary mb-0">{contact.website}</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="kf-rounded-lg kf-shadow-soft" style={{ height: "16rem" }}>
                <iframe
                  title="Kikwetu Foundation office location on Google Maps"
                  src="https://www.google.com/maps?q=Agip+House+Haile+Selassie+Avenue+Nairobi&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
