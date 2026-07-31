import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { footerLinks, legalLinks } from "@/data/navigation";
import { contactInfo } from "@/data/contact";
import { socialLinks } from "@/data/social";

const NewsletterForm = dynamic(
  () => import("@/components/ui/newsletter-form").then((mod) => mod.NewsletterForm),
  {
    loading: () => <div style={{ height: 44 }} aria-hidden="true" />,
  }
);

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="kf-footer">
      <div className="container kf-footer-pad">
        <div className="row gy-4 gy-lg-0">
          {/* Logo: desktop only, per brand guidelines the full-color logo
              shouldn't sit directly on a dark background, hence the light
              chip. Hidden entirely below the lg breakpoint (not just
              visually shrunk) so it takes no space on mobile. */}
          <div className="col-lg-2 d-none d-lg-block">
            <Link href="/" prefetch={false} className="d-inline-block kf-footer-logo-chip">
              <Image
                src="/logo/kikwetu-foundation-logo.png"
                alt="Kikwetu Foundation logo"
                width={1024}
                height={877}
                className="kf-footer-logo"
              />
            </Link>
          </div>

          <div className="col-6 col-lg-3">
            <h2 className="h6 text-white mb-3">Quick Links</h2>
            <ul className="list-unstyled d-flex flex-column gap-2 small mb-0">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} prefetch={false} className="kf-footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-6 col-lg-3">
            <h2 className="h6 text-white mb-3">Contact</h2>
            <ul className="list-unstyled d-flex flex-column gap-2 small mb-0">
              <li>
                <a href={`mailto:${contactInfo.email}`} className="kf-footer-link">
                  {contactInfo.email}
                </a>
              </li>
              <li>{contactInfo.address.line1}</li>
              <li>{contactInfo.address.line2}, {contactInfo.address.city}</li>
            </ul>
          </div>

          <div className="col-12 col-lg-4">
            <h2 className="h6 text-white mb-3">Stay Updated</h2>
            <p className="small mb-3">
              Get occasional updates on our programs and partnership opportunities.
            </p>
            <NewsletterForm variant="footer" />
          </div>
        </div>

        <hr className="border-secondary kf-footer-rule" />

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
          {socialLinks.length > 0 ? (
            <ul className="list-unstyled d-flex gap-2 mb-0 order-md-3">
              {socialLinks.map((social) =>
                social.placeholder ? (
                  <li key={social.label}>
                    <span
                      className="kf-footer-social-icon kf-footer-social-icon-placeholder"
                      aria-label={`${social.label} (coming soon)`}
                      title={`${social.label}, coming soon`}
                      tabIndex={-1}
                    >
                      <i className={`bi ${social.icon}`} aria-hidden="true" />
                    </span>
                  </li>
                ) : (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="kf-footer-social-icon"
                    >
                      <i className={`bi ${social.icon}`} aria-hidden="true" />
                    </a>
                  </li>
                )
              )}
            </ul>
          ) : null}

          <p className="mb-0 small order-md-1">&copy; {year} Kikwetu Foundation. All rights reserved.</p>

          <ul className="list-unstyled d-flex gap-4 mb-0 small order-md-2">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} prefetch={false} className="kf-footer-link">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
