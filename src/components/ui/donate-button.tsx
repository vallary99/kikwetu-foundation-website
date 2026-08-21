import Link from "next/link";

interface DonateButtonProps {
  /** Button style classes (e.g. `btn-brand-primary`). Pass whatever class
   * the surrounding section already uses for its other buttons, so Donate
   * reads as part of that section rather than a standalone, mismatched CTA. */
  className: string;
  label?: string;
  showIcon?: boolean;
}

/**
 * Reusable "Donate" call-to-action. Links to the dedicated /donate page
 * (rather than posting to PayPal directly) so donors always pick an amount
 * and frequency on-site first — see src/components/ui/donate-form.tsx for
 * the actual PayPal hand-off.
 *
 * Intentionally has no default style: every call site should pass the same
 * button class its neighboring buttons use, so Donate inherits that
 * page/section's existing look instead of carrying its own separate theme.
 */
export function DonateButton({ className, showIcon = false, label = "Donate Now" }: DonateButtonProps) {
  return (
    <Link href="/donate" prefetch={false} className={`btn ${className}`}>
      {showIcon ? <i className="bi bi-heart-fill me-2" aria-hidden="true" /> : null}
      {label}
    </Link>
  );
}
