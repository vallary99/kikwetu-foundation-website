import { safeguardingPolicy as policy } from "@/data/documents";

interface SafeguardingPolicyProps {
  title?: string;
  description?: string;
  className?: string;
}

/**
 * Safeguarding policy call-out with "Read" (opens the PDF in a new tab in the
 * browser's own viewer) and "Download" actions.
 */
export function SafeguardingPolicy({
  title = "Our Safeguarding Policy",
  description = policy.summary,
  className = "",
}: SafeguardingPolicyProps) {
  return (
    <section className={`section ${className}`} id="safeguarding" aria-labelledby="safeguarding-title">
      <div className="container">
        <div className="kf-card kf-policy p-4 p-lg-5">
          <div className="row g-4 align-items-center">
            <div className="col-lg-8">
              <div className="d-flex gap-3 align-items-start">
                <span className="kf-icon-badge flex-shrink-0" aria-hidden="true">
                  <i className="bi bi-shield-check" />
                </span>
                <div>
                  <p className="eyebrow mb-2">Safeguarding</p>
                  <h2 id="safeguarding-title" className="h3 mb-2">{title}</h2>
                  <p className="text-secondary mb-2">{description}</p>
                  <p className="small text-secondary mb-0">
                    {policy.title} &middot; {policy.version} &middot; Effective {policy.effective} &middot; {policy.pages} pages
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="d-flex flex-column flex-sm-row flex-lg-column gap-2">
                <a
                  href={policy.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-brand-primary"
                >
                  <i className="bi bi-book me-2" aria-hidden="true" />
                  Read the Policy
                  <span className="visually-hidden"> (PDF, opens in a new tab)</span>
                </a>
                <a href={policy.href} download={policy.downloadName} className="btn btn-brand-outline-dark">
                  <i className="bi bi-download me-2" aria-hidden="true" />
                  Download PDF
                  <span className="small fw-normal ms-1">({policy.sizeLabel.replace("PDF, ", "")})</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
