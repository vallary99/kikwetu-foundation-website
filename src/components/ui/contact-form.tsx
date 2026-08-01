"use client";

import { useRef, useState, type FormEvent } from "react";
import Script from "next/script";

type Status = "idle" | "loading" | "success" | "error";

const inquiryTypes = [
  "Partnership / CSR inquiry",
  "Volunteering",
  "Sponsorship / Donor inquiry",
  "Media / Press",
  "Other",
];

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

/** Fires the GA4 contact_form_submit event, only ever called after a
 * confirmed-successful submission. Safe to call even if GA hasn't loaded
 * (e.g. NEXT_PUBLIC_GA_ID isn't set, or the lazyOnload script hasn't
 * finished loading yet). */
function trackContactFormSubmit() {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag === "function") {
    gtag("event", "contact_form_submit");
  }
}

/**
 * Contact form. Submits to `/api/contact`, which validates the input,
 * verifies the Cloudflare Turnstile token server-side, and sends a
 * notification email to the Foundation plus a confirmation email to the
 * sender via Resend (see src/lib/email.ts and src/lib/turnstile.ts).
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileContainerRef = useRef<HTMLDivElement>(null);
  const turnstileWidgetId = useRef<string | null>(null);

  function renderTurnstileWidget() {
    if (!TURNSTILE_SITE_KEY || !turnstileContainerRef.current || !window.turnstile) return;
    if (turnstileWidgetId.current) return; // already rendered, avoid duplicates
    turnstileWidgetId.current = window.turnstile.render(turnstileContainerRef.current, {
      sitekey: TURNSTILE_SITE_KEY,
      callback: (token) => setTurnstileToken(token),
      "expired-callback": () => setTurnstileToken(null),
      "error-callback": () => setTurnstileToken(null),
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const nextErrors: Record<string, string> = {};
    if (!name) nextErrors.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = "Please enter a valid email address.";
    if (!message) nextErrors.message = "Please add a short message.";
    if (TURNSTILE_SITE_KEY && !turnstileToken) nextErrors.turnstile = "Please complete the verification check.";

    setErrors(nextErrors);
    setServerError(null);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("loading");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...Object.fromEntries(formData), turnstileToken }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        setServerError(
          response.status === 403
            ? "Verification failed. Please try again."
            : data?.error || "Something went wrong sending your message. Please try again or email us directly."
        );
        if (window.turnstile && turnstileWidgetId.current) {
          window.turnstile.reset(turnstileWidgetId.current);
          setTurnstileToken(null);
        }
        setStatus("error");
        return;
      }

      trackContactFormSubmit();
      setStatus("success");
      event.currentTarget.reset();
    } catch {
      setServerError("Something went wrong sending your message. Please try again or email us directly.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="alert alert-success d-flex align-items-start gap-2" role="status">
        <i className="bi bi-check-circle-fill mt-1" aria-hidden="true" />
        <div>
          <strong>Message sent.</strong> Thank you for reaching out, our team will respond
          shortly.
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-describedby="contact-form-status">
      <div className="row g-3">
        <div className="col-md-6">
          <label htmlFor="name" className="form-label fw-semibold">
            Full name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            autoComplete="name"
            required
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name ? <div className="invalid-feedback">{errors.name}</div> : null}
        </div>

        <div className="col-md-6">
          <label htmlFor="email" className="form-label fw-semibold">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            autoComplete="email"
            required
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email ? <div className="invalid-feedback">{errors.email}</div> : null}
        </div>

        <div className="col-md-6">
          <label htmlFor="phone" className="form-label fw-semibold">
            Phone number <span className="text-muted fw-normal">(optional)</span>
          </label>
          <input id="phone" name="phone" type="tel" className="form-control" autoComplete="tel" />
        </div>

        <div className="col-md-6">
          <label htmlFor="organization" className="form-label fw-semibold">
            Organization <span className="text-muted fw-normal">(optional)</span>
          </label>
          <input id="organization" name="organization" type="text" className="form-control" />
        </div>

        <div className="col-md-6">
          <label htmlFor="inquiryType" className="form-label fw-semibold">
            I&apos;m reaching out about
          </label>
          <select id="inquiryType" name="inquiryType" className="form-select" defaultValue={inquiryTypes[0]}>
            {inquiryTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="col-12">
          <label htmlFor="message" className="form-label fw-semibold">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            className={`form-control ${errors.message ? "is-invalid" : ""}`}
            required
            aria-invalid={Boolean(errors.message)}
          />
          {errors.message ? <div className="invalid-feedback">{errors.message}</div> : null}
        </div>

        {TURNSTILE_SITE_KEY ? (
          <div className="col-12">
            <Script
              src="https://challenges.cloudflare.com/turnstile/v0/api.js"
              strategy="afterInteractive"
              onLoad={renderTurnstileWidget}
            />
            <div ref={turnstileContainerRef} />
            {errors.turnstile ? (
              <p className="text-danger small mt-2 mb-0" role="alert">
                {errors.turnstile}
              </p>
            ) : null}
          </div>
        ) : null}
      </div>

      <div id="contact-form-status" aria-live="polite">
        {status === "error" && serverError ? (
          <p className="text-danger small mt-3 mb-0" role="alert">
            {serverError}
          </p>
        ) : null}
      </div>

      <div className="d-grid d-sm-block mt-4">
        <button type="submit" className="btn btn-brand-primary" disabled={status === "loading"}>
          {status === "loading" ? "Sending…" : "Send Message"}
        </button>
      </div>
    </form>
  );
}
