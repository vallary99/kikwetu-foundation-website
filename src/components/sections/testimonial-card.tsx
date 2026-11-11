"use client";

import Image from "next/image";
import { useId, useState } from "react";
import type { Testimonial } from "@/types/content";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

/**
 * Volunteer quote card. The full quote is always in the DOM (good for SEO and
 * screen readers); long quotes are visually clamped with a "Read more" toggle.
 */
export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const [expanded, setExpanded] = useState(false);
  const quoteId = useId();
  const isLong = testimonial.quote.length > 320;

  return (
    <figure className="kf-card kf-testimonial p-4 d-flex flex-column mb-0">
      <i className="bi bi-quote kf-testimonial-mark" aria-hidden="true" />
      <h3 className="h5 mb-3">{testimonial.headline}</h3>

      <blockquote className="kf-testimonial-body mb-3">
        <p
          id={quoteId}
          className={`text-secondary mb-0 ${isLong && !expanded ? "kf-testimonial-clamp" : ""} ${expanded ? "kf-testimonial-scroll" : ""}`}
          tabIndex={expanded ? 0 : undefined}
        >
          &ldquo;{testimonial.quote}&rdquo;
        </p>
        {isLong ? (
          <button
            type="button"
            className="kf-testimonial-toggle mt-2"
            aria-expanded={expanded}
            aria-controls={quoteId}
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        ) : null}
      </blockquote>

      <figcaption className="d-flex align-items-center gap-3 pt-3 border-top">
        {testimonial.image ? (
          <Image
            src={testimonial.image.src}
            alt=""
            width={56}
            height={56}
            className="kf-testimonial-avatar"
          />
        ) : (
          <span className="kf-testimonial-avatar kf-testimonial-initial" aria-hidden="true">
            {testimonial.name.charAt(0)}
          </span>
        )}
        <span>
          <span className="d-block fw-bold">{testimonial.name}</span>
          <span className="d-block small text-olive fw-semibold">
            Volunteer &middot; {testimonial.country}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
