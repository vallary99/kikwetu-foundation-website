import Link from "next/link";
import { SectionHeading } from "@/components/sections/section-heading";
import { TestimonialCarousel } from "@/components/sections/testimonial-carousel";
import type { Testimonial } from "@/types/content";

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  eyebrow?: string;
  title?: string;
  description?: string;
  /** Show a link to the full list on /get-involved (used on the home page). */
  showMoreLink?: boolean;
  className?: string;
}

export function TestimonialsSection({
  testimonials,
  eyebrow = "Volunteer Voices",
  title = "In their own words",
  description = "Volunteers from Kenya and around the world on what it means to be part of Kikwetu Foundation.",
  showMoreLink = false,
  className = "bg-olive-tint",
}: TestimonialsSectionProps) {
  return (
    <section className={`section ${className}`} id="testimonials" aria-labelledby="testimonials-title">
      <div className="container">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} align="center" titleId="testimonials-title" />
        <TestimonialCarousel testimonials={testimonials} />
        {showMoreLink ? (
          <div className="text-center mt-5">
            <Link href="/get-involved#testimonials" className="btn btn-brand-outline-dark">
              Hear From More Volunteers
              <i className="bi bi-arrow-right ms-2" aria-hidden="true" />
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
