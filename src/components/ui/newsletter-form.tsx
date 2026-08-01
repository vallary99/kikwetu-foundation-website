"use client";

import { useState, type FormEvent } from "react";

interface NewsletterFormProps {
  variant?: "footer" | "section";
}

type Status = "idle" | "loading" | "success" | "error";

/**
 * Newsletter signup form.
 *
 * Submits to `/api/newsletter`, which is currently a stub (see that route's
 * comments). No email-marketing platform is wired up yet, the API route is
 * intentionally the only place that will need to change when Brevo,
 * Mailchimp, or ConvertKit is connected. See README.md → "Newsletter
 * Documentation" for the integration guide.
 */
export function NewsletterForm({ variant = "section" }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error("Request failed");

      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  const isFooter = variant === "footer";

  if (status === "success") {
    return (
      <p className={`small mb-0 ${isFooter ? "text-white" : "text-olive"}`} role="status">
        <i className="bi bi-check-circle-fill me-2" aria-hidden="true" />
        Thanks, you&apos;re subscribed.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <label htmlFor={`newsletter-email-${variant}`} className="visually-hidden">
        Email address
      </label>
      <div className="input-group">
        <input
          id={`newsletter-email-${variant}`}
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
          autoComplete="email"
        />
        <button
          type="submit"
          className={`btn ${isFooter ? "btn-brand-primary" : "btn-brand-primary"}`}
          disabled={status === "loading"}
        >
          {status === "loading" ? "Sending…" : "Subscribe"}
        </button>
      </div>
      {status === "error" ? (
        <p className="small text-danger mt-2 mb-0" role="alert">
          Something went wrong. Please try again.
        </p>
      ) : null}
    </form>
  );
}
