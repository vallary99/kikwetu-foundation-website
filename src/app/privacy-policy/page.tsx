import { PageHero } from "@/components/sections/page-hero";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How Kikwetu Foundation collects, uses, and protects information submitted through this website.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="Last updated: this page uses placeholder policy language and should be reviewed by legal counsel before publication."
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
              Kikwetu Foundation (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) respects your privacy. This
              policy explains what information we collect through {siteConfig.url.replace("https://", "")}, how we
              use it, and the choices you have.
            </p>

            <h2 className="h4 mt-5 mb-3">Information we collect</h2>
            <p className="text-secondary">
              We collect information you provide directly, such as your name, email address, organization, and
              message when you submit our contact form or subscribe to our newsletter. We do not collect payment
              information through this website.
            </p>

            <h2 className="h4 mt-5 mb-3">How we use information</h2>
            <p className="text-secondary">
              We use submitted information to respond to inquiries, coordinate partnerships and volunteering, and
              send newsletter updates to subscribers who opt in. We do not sell personal information to third
              parties.
            </p>

            <h2 className="h4 mt-5 mb-3">Analytics</h2>
            <p className="text-secondary">
              We may use tools such as Google Analytics to understand how visitors use this site. These tools may
              use cookies to collect anonymized usage data.
            </p>

            <h2 className="h4 mt-5 mb-3">Your choices</h2>
            <p className="text-secondary">
              You may unsubscribe from our newsletter at any time using the link in any email we send. To request
              access to, correction of, or deletion of your personal information, contact us at{" "}
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
            </p>

            <h2 className="h4 mt-5 mb-3">Contact</h2>
            <p className="text-secondary mb-0">
              Questions about this policy can be sent to <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
