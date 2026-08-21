"use client";

import { useId, useMemo, useState } from "react";
import { donationConfig } from "@/data/donation";
import { siteConfig } from "@/lib/site-config";

type Frequency = "one-time" | "monthly";

/**
 * Fires the GA4 `donate_initiated` event right before the browser is
 * handed off to PayPal. Safe to call even if GA hasn't loaded.
 */
function trackDonateInitiated(amount: number, frequency: Frequency) {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag === "function") {
    gtag("event", "donate_initiated", { value: amount, currency: donationConfig.currency, frequency });
  }
}

/**
 * Donation form that hands off to PayPal's hosted checkout.
 *
 * This intentionally does NOT call the Anthropic-style pattern of a
 * client-side SDK / API integration with a client ID and secret. Instead it
 * uses PayPal's classic hosted "Donate" button, which only needs the
 * recipient's PayPal account email (see src/data/donation.ts) and works by
 * submitting a plain HTML form to PayPal — PayPal hosts the actual card /
 * login / payment page, so no card details ever touch this site or need a
 * backend. This is the same mechanism behind PayPal's official embeddable
 * "Donate" buttons.
 *
 * One-time donations submit with `cmd=_donations`. Monthly donations submit
 * with `cmd=_xclick-subscriptions`, which sets up a recurring PayPal
 * subscription at the chosen amount, billed monthly until the donor cancels.
 *
 * The form targets `_top` so PayPal checkout opens in the same tab — this
 * keeps PayPal's own "Cancel and return to Kikwetu Foundation" link (and
 * the `return`/`cancel_return` redirects below) landing back in the same
 * tab the donor started in, rather than leaving an orphaned tab open.
 */
export function DonateForm() {
  const [amount, setAmount] = useState<number>(donationConfig.defaultAmount);
  const [customAmount, setCustomAmount] = useState("");
  const [frequency, setFrequency] = useState<Frequency>("one-time");
  const customInputId = useId();

  const isCustomSelected = customAmount !== "";
  const effectiveAmount = useMemo(() => {
    if (isCustomSelected) {
      const parsed = Number(customAmount);
      return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
    }
    return amount;
  }, [isCustomSelected, customAmount, amount]);

  const canSubmit = effectiveAmount >= 1;

  function selectPreset(value: number) {
    setAmount(value);
    setCustomAmount("");
  }

  const returnUrl = `${siteConfig.url}/donate/thank-you`;
  const cancelUrl = `${siteConfig.url}/donate`;
  // Dedicated, tightly cropped/resized variant of the site logo — PayPal's
  // own donate-page logo slot expects roughly 190x60px (we use 2x that for
  // retina) on a transparent background. Reusing the full-size navbar logo
  // as-is gets awkwardly squeezed/letterboxed by PayPal's layout.
  //
  // IMPORTANT: PayPal fetches this over the network at checkout time, so it
  // only updates once /logo/kikwetu-foundation-logo-paypal.png is actually
  // live at siteConfig.url — and PayPal appears to cache the image it
  // fetches per donation link/token, so a fresh $ amount / new page load
  // (not the same already-open PayPal tab) may be needed to see a change,
  // alongside redeploying this file to production.
  const logoUrl = `${siteConfig.url}/logo/kikwetu-foundation-logo-paypal.png`;

  return (
    <form
      action="https://www.paypal.com/cgi-bin/webscr"
      method="post"
      target="_top"
      className="kf-donate-form"
      onSubmit={(event) => {
        if (!canSubmit) {
          event.preventDefault();
          return;
        }
        trackDonateInitiated(effectiveAmount, frequency);
      }}
    >
      {/* Core PayPal hosted-button fields. cmd differs by frequency because
          one-time gifts and recurring subscriptions are separate PayPal
          flows under the classic Website Payments Standard integration.
          No item_name: PayPal's page already renders "Donate to Kikwetu
          Foundation" from the account itself, so a separate item_name of
          the same text just repeated it. */}
      <input type="hidden" name="cmd" value={frequency === "monthly" ? "_xclick-subscriptions" : "_donations"} />
      <input type="hidden" name="business" value={donationConfig.paypalBusinessEmail} />
      <input type="hidden" name="currency_code" value={donationConfig.currency} />
      <input type="hidden" name="no_note" value="0" />
      <input type="hidden" name="no_shipping" value="1" />
      <input type="hidden" name="image_url" value={logoUrl} />
      <input type="hidden" name="return" value={returnUrl} />
      <input type="hidden" name="cancel_return" value={cancelUrl} />

      {frequency === "monthly" ? (
        <>
          {/* Subscription-specific fields: bill `a3` every `p3` `t3` (M =
              month), indefinitely (src=1), starting now (sra=1). */}
          <input type="hidden" name="a3" value={effectiveAmount.toFixed(2)} />
          <input type="hidden" name="p3" value="1" />
          <input type="hidden" name="t3" value="M" />
          <input type="hidden" name="src" value="1" />
          <input type="hidden" name="sra" value="1" />
        </>
      ) : (
        <input type="hidden" name="amount" value={effectiveAmount.toFixed(2)} />
      )}

      <fieldset className="mb-4">
        <legend className="h6 mb-3">Donation frequency</legend>
        <div className="btn-group w-100" role="group" aria-label="Donation frequency">
          <button
            type="button"
            className={`btn ${frequency === "one-time" ? "btn-brand-primary" : "btn-brand-outline-dark"}`}
            aria-pressed={frequency === "one-time"}
            onClick={() => setFrequency("one-time")}
          >
            One-time
          </button>
          <button
            type="button"
            className={`btn ${frequency === "monthly" ? "btn-brand-primary" : "btn-brand-outline-dark"}`}
            aria-pressed={frequency === "monthly"}
            onClick={() => setFrequency("monthly")}
          >
            Monthly
          </button>
        </div>
      </fieldset>

      <fieldset className="mb-4">
        <legend className="h6 mb-3">Amount ({donationConfig.currency})</legend>
        <div className="kf-donate-amount-grid mb-3">
          {donationConfig.presetAmounts.map((preset) => (
            <button
              key={preset}
              type="button"
              className={`btn kf-donate-amount-btn ${
                !isCustomSelected && amount === preset ? "kf-donate-amount-btn-active" : ""
              }`}
              aria-pressed={!isCustomSelected && amount === preset}
              onClick={() => selectPreset(preset)}
            >
              ${preset}
            </button>
          ))}
        </div>

        <label htmlFor={customInputId} className="form-label small fw-semibold">
          Or enter a custom amount
        </label>
        <div className="input-group">
          <span className="input-group-text">$</span>
          <input
            id={customInputId}
            type="number"
            min={1}
            step="1"
            inputMode="decimal"
            placeholder="Custom amount"
            className="form-control"
            value={customAmount}
            onChange={(event) => setCustomAmount(event.target.value)}
          />
        </div>
      </fieldset>

      <button type="submit" className="btn btn-brand-primary btn-lg w-100" disabled={!canSubmit}>
        <i className="bi bi-paypal me-2" aria-hidden="true" />
        {frequency === "monthly"
          ? `Donate $${effectiveAmount || 0}/month with PayPal`
          : `Donate $${effectiveAmount || 0} with PayPal`}
      </button>
      <p className="small text-secondary mt-3 mb-0">
        You&apos;ll be redirected to PayPal to complete your {frequency === "monthly" ? "subscription" : "donation"}{" "}
        securely. PayPal accepts major debit/credit cards as well as PayPal balances, no PayPal account required for
        card payments.
      </p>
    </form>
  );
}
