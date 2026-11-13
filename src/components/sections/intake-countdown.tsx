"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { intake } from "@/data/intake";

type Phase = "upcoming" | "open" | "closed";

const OPENS = new Date(intake.opensAt).getTime();
const CLOSES = intake.closesAt ? new Date(intake.closesAt).getTime() : null;

function phaseAt(now: number): Phase {
  if (now < OPENS) return "upcoming";
  if (CLOSES !== null && now >= CLOSES) return "closed";
  return "open";
}

function parts(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

const nairobiDate = (iso: string) =>
  new Intl.DateTimeFormat("en-KE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Africa/Nairobi",
  }).format(new Date(iso));

interface IntakeCountdownProps {
  /** Hide the "About K-Hub" link when already on the K-Hub page. */
  showProgramLink?: boolean;
  className?: string;
}

/**
 * Cohort intake banner: live countdown plus an Apply button that opens the
 * Google Form in a new tab. All dates and links come from data/intake.ts.
 */
export function IntakeCountdown({ showProgramLink = true, className = "" }: IntakeCountdownProps) {
  // null until mounted so server and client render the same markup.
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    const first = window.setTimeout(tick, 0);
    const id = window.setInterval(tick, 1000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(id);
    };
  }, []);

  if (!intake.enabled) return null;

  const phase: Phase = now === null ? "upcoming" : phaseAt(now);
  const target = phase === "upcoming" ? OPENS : phase === "open" ? CLOSES : null;
  const t = now !== null && target !== null ? parts(target - now) : null;

  const eyebrow =
    phase === "upcoming"
      ? `Cohort ${intake.cohort} intake`
      : phase === "open"
        ? `Cohort ${intake.cohort} applications are open`
        : `Cohort ${intake.cohort} applications have closed`;

  const headline =
    phase === "upcoming"
      ? intake.headline
      : phase === "open"
        ? `Apply now for K-Hub Cohort ${intake.cohort}`
        : `Thank you to everyone who applied to Cohort ${intake.cohort}`;

  const countdownLabel =
    phase === "upcoming"
      ? `Applications open ${nairobiDate(intake.opensAt)}`
      : phase === "open" && intake.closesAt
        ? `Applications close ${nairobiDate(intake.closesAt)}`
        : null;

  const units: [keyof NonNullable<typeof t>, string][] = [
    ["days", "Days"],
    ["hours", "Hours"],
    ["minutes", "Minutes"],
    ["seconds", "Seconds"],
  ];

  return (
    <section className={`kf-intake ${className}`} id="apply" aria-labelledby="intake-title">
      <div className="container">
        <div className="row g-4 g-lg-5 align-items-center">
          <div className="col-lg-6">
            <p className="kf-intake-eyebrow mb-2">
              <span className={`kf-intake-dot ${phase === "open" ? "is-live" : ""}`} aria-hidden="true" />
              {eyebrow}
            </p>
            <h2 id="intake-title" className="h2 text-white mb-3">{headline}</h2>
            <p className="kf-intake-copy mb-0">
              {phase === "closed"
                ? "Selected applicants will be contacted directly. Follow us on social media to hear when the next intake opens."
                : intake.description}
            </p>
          </div>

          <div className="col-lg-6">
            {countdownLabel ? (
              <>
                <p className="kf-intake-label mb-2">{countdownLabel}</p>
                <div
                  className="kf-countdown"
                  role="timer"
                  aria-live="off"
                  aria-label={
                    t
                      ? `${t.days} days, ${t.hours} hours and ${t.minutes} minutes remaining`
                      : "Countdown loading"
                  }
                >
                  {units.map(([key, label]) => (
                    <div className="kf-countdown-unit" key={key}>
                      <span className="kf-countdown-value" aria-hidden="true">
                        {t ? String(t[key]).padStart(2, "0") : "--"}
                      </span>
                      <span className="kf-countdown-label" aria-hidden="true">{label}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : null}

            {phase !== "closed" && ((phase === "open" && intake.formUrl) || showProgramLink) ? (
              <div className="d-flex flex-column flex-sm-row gap-2 mt-4">
                {/* Apply button only appears once applications are open. */}
                {phase === "open" && intake.formUrl ? (
                  <a
                    href={intake.formUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-brand-accent btn-lg"
                  >
                    Apply Now
                    <i className="bi bi-box-arrow-up-right ms-2" aria-hidden="true" />
                    <span className="visually-hidden"> (opens the application form in a new tab)</span>
                  </a>
                ) : null}
                {showProgramLink ? (
                  <Link href={`/programs/${intake.programSlug}`} className="btn btn-brand-outline btn-lg">
                    About K-Hub
                  </Link>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
