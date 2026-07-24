import { PageHero } from "@/components/sections/page-hero";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata = buildMetadata({
  title: "Terms & Conditions",
  description: "Terms and conditions for using the Kikwetu Foundation website.",
  path: "/terms-and-conditions",
});

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms & Conditions"
        description="This page uses placeholder terms language and should be reviewed by legal counsel before publication."
        image={{
          src: "/images/kikwetu-foundation-youth-community-gathering.jpg",
          alt: "Kikwetu Foundation team gathering",
          width: 1800,
          height: 1346,
        }}
        compact
      />

      <section className="section">
        <div className="container">
          <div className="mx-auto" style={{ maxWidth: "48rem" }}>
            <p className="text-secondary">
              By accessing {siteConfig.url.replace("https://", "")}, you agree to these terms. If you do not agree,
              please do not use this website.
            </p>

            <h2 className="h4 mt-5 mb-3">Use of content</h2>
            <p className="text-secondary">
              All text, images, and branding on this website belong to Kikwetu Foundation or its licensors unless
              otherwise noted, and may not be reproduced without permission.
            </p>

            <h2 className="h4 mt-5 mb-3">Accuracy of information</h2>
            <p className="text-secondary">
              We aim to keep program, impact, and contact information accurate and up to date, but make no
              guarantee that all content is free of error at all times.
            </p>

            <h2 className="h4 mt-5 mb-3">Third-party links</h2>
            <p className="text-secondary">
              This site may link to third-party websites, including partner and social media platforms. We are not
              responsible for the content or practices of those sites.
            </p>

            <h2 className="h4 mt-5 mb-3">Changes</h2>
            <p className="text-secondary">
              We may update these terms from time to time. Continued use of the site after changes constitutes
              acceptance of the revised terms.
            </p>

            <h2 className="h4 mt-5 mb-3">Contact</h2>
            <p className="text-secondary mb-0">
              Questions about these terms can be sent to <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
