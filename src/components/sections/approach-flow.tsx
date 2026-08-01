import { Fragment } from "react";

interface ApproachStep {
  icon: string;
  title: string;
  description: string;
}

const steps: ApproachStep[] = [
  {
    icon: "bi-search",
    title: "Identify Community Needs",
    description: "We start on the ground, listening to the young people and communities we serve.",
  },
  {
    icon: "bi-mortarboard",
    title: "Equip Youth",
    description: "We provide the skills, tools, and resources for real opportunity, from digital literacy to entrepreneurship.",
  },
  {
    icon: "bi-people",
    title: "Mentor & Support",
    description: "We connect youth with mentors and ongoing support to help them apply what they've learned.",
  },
  {
    icon: "bi-graph-up-arrow",
    title: "Create Sustainable Impact",
    description: "We build toward lasting change, in individuals, families, and the wider community.",
  },
];

/**
 * "Our Approach" process flow: four steps connected by arrows. Stacked
 * vertically with down-arrows on mobile, laid out horizontally with
 * right-arrows from the md breakpoint up. Built as a flat alternating flex
 * sequence (step, connector, step, connector, ...) rather than a grid, so
 * the connector sits correctly *between* cards in both orientations.
 */
export function ApproachFlow() {
  return (
    <div className="d-flex flex-column flex-md-row align-items-stretch align-items-md-start">
      {steps.map((step, index) => (
        <Fragment key={step.title}>
          <div className="kf-approach-step text-center">
            <span className="kf-icon-badge mb-3" aria-hidden="true">
              <i className={`bi ${step.icon}`} />
            </span>
            <h3 className="h5 mb-2">{step.title}</h3>
            <p className="small text-secondary mb-0">{step.description}</p>
          </div>
          {index < steps.length - 1 ? (
            <div className="kf-approach-connector" aria-hidden="true">
              <i className="bi bi-chevron-down d-md-none" />
              <i className="bi bi-chevron-right d-none d-md-inline" />
            </div>
          ) : null}
        </Fragment>
      ))}
    </div>
  );
}
