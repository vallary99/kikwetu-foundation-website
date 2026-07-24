import Link from "next/link";
import Image from "next/image";
import { footerLinks, legalLinks } from "@/data/navigation";
import { contactInfo } from "@/data/contact";
import { NewsletterForm } from "@/components/ui/newsletter-form";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="kf-footer">
      <div className="container section-tight">
        <div className="row gy-4">
          <div className="col-lg-4">
            <Link href="/" className="d-inline-block mb-3 kf-footer-logo-chip">
              <Image
                src="/logo/kikwetu-foundation-logo.png"
                alt="Kikwetu Foundation logo"
                width={1024}
                height={877}
                className="kf-footer-logo"
              />
            </Link>
            <p className="mb-0 small" style={{ maxWidth: "26rem" }}>
              A Kenyan youth-empowerment NGO transforming communities since 2012 through
              mentorship, digital skills, education, and entrepreneurship.
            </p>
          </div>

          <div className="col-6 col-lg-2">
            <h2 className="h6 text-white mb-3">Quick Links</h2>
            <ul className="list-unstyled d-flex flex-column gap-2 small mb-0">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-6 col-lg-3">
            <h2 className="h6 text-white mb-3">Contact</h2>
            <ul className="list-unstyled d-flex flex-column gap-2 small mb-0">
              <li>
                <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
              </li>
              <li>{contactInfo.address.line1}</li>
              <li>{contactInfo.address.city}</li>
            </ul>
          </div>

          <div className="col-lg-3">
            <h2 className="h6 text-white mb-3">Stay Updated</h2>
            <p className="small mb-3">
              Get occasional updates on our programs and partnership opportunities.
            </p>
            <NewsletterForm variant="footer" />
          </div>
        </div>

        <hr className="border-secondary my-4" />

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 small">
          <p className="mb-0">&copy; {year} Kikwetu Foundation. All rights reserved.</p>
          <ul className="list-unstyled d-flex gap-4 mb-0">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
