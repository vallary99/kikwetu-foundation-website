import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Thank You",
  description: "Thank you for donating to Kikwetu Foundation.",
  path: "/donate/thank-you",
});

/**
 * PayPal redirects the donor here after a successful donation/subscription
 * (see the `return` field in src/components/ui/donate-form.tsx). This page
 * only confirms the hand-off back to our site; it does not itself verify
 * payment, since verifying webhook/IPN events happens server-side and isn't
 * part of this placeholder integration.
 */
export default function DonateThankYouPage() {
  return (
    <section className="section">
      <div className="container text-center">
        <div className="mx-auto" style={{ maxWidth: "36rem" }}>
          <span className="kf-icon-badge mb-4 mx-auto" aria-hidden="true">
            <i className="bi bi-heart-fill" />
          </span>
          <h1 className="h1 mb-3">Thank you for your generosity</h1>
          <p className="lead text-secondary mb-4">
            Your donation helps Kikwetu Foundation equip young people across Kenya with mentorship, skills, and
            opportunity. We&apos;re grateful you chose to be part of that transformation.
          </p>
          <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
            <Link href="/impact" className="btn btn-brand-primary btn-lg">
              See Our Impact
            </Link>
            <Link href="/" className="btn btn-brand-outline-dark btn-lg">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
