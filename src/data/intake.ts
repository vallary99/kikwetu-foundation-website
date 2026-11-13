/**
 * K-Hub intake (application window) settings.
 *
 * The countdown and Apply button read everything from here.
 *  - Before `opensAt`: counts down to opening; Apply button is disabled.
 *  - Between `opensAt` and `closesAt`: Apply button opens `formUrl` in a new tab
 *    and, if `closesAt` is set, counts down to the deadline.
 *  - After `closesAt`: shows "Applications closed".
 *
 * Times are ISO strings with the Nairobi offset (+03:00) so the countdown is
 * correct for visitors in any timezone.
 *
 * To run Cohort 4: update `cohort`, the dates and `formUrl`. Nothing else.
 */
export const intake = {
  /** Set to false to hide the section everywhere without deleting it. */
  enabled: true,
  program: "The K-Hub Project",
  programSlug: "k-hub-project",
  cohort: 3,
  opensAt: "2026-11-16T00:00:00+03:00",
  /** Application deadline. Leave as null for an open-ended window. */
  closesAt: null as string | null,
  /**
   * Public Google Form link (the "Send → link" URL ending in /viewform).
   * Leave empty until the form exists: the button then reads
   * "Application link coming soon" instead of linking anywhere.
   */
  formUrl: "https://docs.google.com/forms/d/e/1FAIpQLSc1WExZNYLvvARiXAdDXS6iUNCBiu9Jt8eH68twU3PA0mHYJg/viewform",
  headline: "K-Hub Cohort 3 applications open 16 November",
  description:
    "Fully funded tech scholarship training for young Kenyans aged 18–29, with a focus on Nairobi. Apply for courses in AI & Machine Learning, Cybersecurity, Software Development and Data Science. Open to Kenyan citizens only.",
};
