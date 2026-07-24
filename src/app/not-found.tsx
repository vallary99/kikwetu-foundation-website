import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="section text-center">
      <div className="container">
        <p className="eyebrow justify-content-center mb-3">404</p>
        <h1 className="mb-3">We couldn&apos;t find that page</h1>
        <p className="text-secondary mb-4 mx-auto" style={{ maxWidth: "32rem" }}>
          The page you&apos;re looking for may have moved or no longer exists. Here are a few
          places to start instead.
        </p>
        <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
          <Link href="/" className="btn btn-brand-primary">
            Back to Home
          </Link>
          <Link href="/programs" className="btn btn-brand-outline-dark">
            View Our Programs
          </Link>
        </div>
      </div>
    </section>
  );
}
