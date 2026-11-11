import { testimonials } from "@/data/testimonials";
import type { Testimonial } from "@/types/content";

/** Async to match the future Sanity-backed signature (see lib/cms/organization.ts). */
export async function getTestimonials(): Promise<Testimonial[]> {
  return testimonials;
}
