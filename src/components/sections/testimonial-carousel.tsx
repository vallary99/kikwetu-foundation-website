"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { TestimonialCard } from "@/components/sections/testimonial-card";
import type { Testimonial } from "@/types/content";

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  label?: string;
}

/**
 * Horizontal, swipeable testimonial carousel built on native CSS scroll-snap
 * (no library). Every slide has the same fixed size; long quotes expand and
 * scroll inside their own card instead of changing its height.
 */
export function TestimonialCarousel({ testimonials, label = "Volunteer testimonials" }: TestimonialCarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [active, setActive] = useState(0);

  const update = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    setAtStart(track.scrollLeft <= 4);
    setAtEnd(track.scrollLeft >= max - 4);
    const first = track.firstElementChild as HTMLElement | null;
    const step = first ? first.offsetWidth + parseFloat(getComputedStyle(track).columnGap || "0") : 1;
    setActive(Math.min(testimonials.length - 1, Math.round(track.scrollLeft / step)));
  }, [testimonials.length]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    update();
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      track.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    const slide = track?.children[index] as HTMLElement | undefined;
    if (!track || !slide) return;
    track.scrollTo({ left: slide.offsetLeft - track.offsetLeft, behavior: "smooth" });
  };

  const scrollByPage = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: dir * track.clientWidth * 0.9, behavior: "smooth" });
  };

  return (
    <div className="kf-carousel">
      <ul
        ref={trackRef}
        className="kf-carousel-track list-unstyled mb-0"
        aria-label={label}
        tabIndex={0}
      >
        {testimonials.map((t, i) => (
          <li
            key={t.slug}
            className="kf-carousel-slide"
            aria-label={`${i + 1} of ${testimonials.length}: ${t.name}, ${t.country}`}
          >
            <TestimonialCard testimonial={t} />
          </li>
        ))}
      </ul>

      <div className="kf-carousel-controls">
        <button
          type="button"
          className="kf-carousel-btn"
          onClick={() => scrollByPage(-1)}
          disabled={atStart}
          aria-label="Previous testimonials"
        >
          <i className="bi bi-arrow-left" aria-hidden="true" />
        </button>

        <div className="kf-carousel-dots">
          {testimonials.map((t, i) => (
            <button
              key={t.slug}
              type="button"
              className={`kf-carousel-dot ${i === active ? "is-active" : ""}`}
              onClick={() => scrollToIndex(i)}
              aria-label={`Go to ${t.name}'s testimonial`}
              aria-current={i === active ? "true" : undefined}
            />
          ))}
        </div>

        <button
          type="button"
          className="kf-carousel-btn"
          onClick={() => scrollByPage(1)}
          disabled={atEnd}
          aria-label="Next testimonials"
        >
          <i className="bi bi-arrow-right" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
