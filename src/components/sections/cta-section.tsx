import Link from "next/link";

interface CTASectionProps {
  title?: string;
  description?: string;
}

export function CTASection({
  title = "Ready to transform African youth together?",
  description = "Whether you're a corporate partner, government agency, development organization, or an individual ready to volunteer, there's a place for you in Kikwetu Foundation's work.",
}: CTASectionProps) {
  return (
    <section className="section bg-olive">
      <div className="container text-center">
        <div className="mx-auto" style={{ maxWidth: "42rem" }}>
          <h2 className="h1 text-white mb-3">{title}</h2>
          <p className="lead mb-4" style={{ color: "rgba(255,255,255,0.9)" }}>
            {description}
          </p>
          <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
            <Link href="/partners" className="btn btn-brand-outline btn-lg">
              Partner With Us
            </Link>
            <Link href="/get-involved" className="btn btn-brand-accent btn-lg">
              Volunteer With Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
