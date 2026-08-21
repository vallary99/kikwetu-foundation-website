/**
 * Donation / PayPal configuration.
 *
 * Kikwetu Foundation accepts one-time donations via PayPal's hosted
 * "Donate" flow (`cmd=_donations`). This requires no API key, client ID,
 * or server-side secret — the donor's browser POSTs straight to PayPal
 * using the business account's email address, and PayPal hosts the actual
 * payment page and card entry. See src/components/ui/donate-form.tsx for
 * where these values are used to build that POST.
 *
 * IMPORTANT: `paypalBusinessEmail` below is a placeholder supplied for
 * integration purposes. Before this goes live, swap it for Kikwetu
 * Foundation's own verified PayPal Business (or Nonprofit) account email,
 * ideally via an environment variable so it isn't hardcoded in source.
 */
export const donationConfig = {
  paypalBusinessEmail: process.env.NEXT_PUBLIC_PAYPAL_BUSINESS_EMAIL ?? "Kendymbugua@gmail.com",
  currency: "USD",
  /** Suggested one-time amounts shown as quick-select chips, in `currency`. */
  presetAmounts: [10, 25, 50, 100, 250],
  defaultAmount: 50,
};

export type DonationConfig = typeof donationConfig;
