"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

const inquiryTypes = [
  "Partnership / CSR inquiry",
  "Volunteering",
  "Sponsorship / Donor inquiry",
  "Media / Press",
  "Other",
];

/**
 * Contact form. Submits to `/api/contact`, which currently logs and returns
 * success (see that route for the stub). Swap in a real email/CRM
 * integration there without touching this component.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

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

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("loading");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData)),
      });
      if (!response.ok) throw new Error("Request failed");
      setStatus("success");
      event.currentTarget.reset();
    } catch {
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
      </div>

      <div id="contact-form-status" aria-live="polite">
        {status === "error" ? (
          <p className="text-danger small mt-3 mb-0" role="alert">
            Something went wrong sending your message. Please try again or email us directly.
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
