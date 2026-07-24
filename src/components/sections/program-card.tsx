import Link from "next/link";
import type { Program } from "@/types/content";

export function ProgramCard({ program }: { program: Program }) {
  return (
    <article className="kf-card p-4 d-flex flex-column">
      <div className="d-flex align-items-start justify-content-between mb-3 gap-2">
        <span className="kf-icon-badge" aria-hidden="true">
          <i className={`bi ${program.icon}`} />
        </span>
        <span className={`kf-badge-status ${program.status === "current" ? "kf-badge-current" : "kf-badge-past"}`}>
          {program.status === "current" ? "Current Program" : "Past Program"}
        </span>
      </div>
      <h3 className="h4 mb-2">{program.name}</h3>
      <p className="text-secondary mb-4 flex-grow-1">{program.summary}</p>
      <Link href={`/programs/${program.slug}`} className="btn btn-brand-outline-dark align-self-start">
        Learn More
        <i className="bi bi-arrow-right ms-2" aria-hidden="true" />
      </Link>
    </article>
  );
}
