/**
 * Minimal ambient typing for the global `window.turnstile` object injected
 * by Cloudflare's Turnstile client script (https://challenges.cloudflare.com/turnstile/v0/api.js).
 * Only the methods this project actually uses are typed.
 */
export {};

interface TurnstileRenderOptions {
  sitekey: string;
  callback?: (token: string) => void;
  "expired-callback"?: () => void;
  "error-callback"?: () => void;
  theme?: "light" | "dark" | "auto";
}

interface TurnstileApi {
  render: (container: HTMLElement | string, options: TurnstileRenderOptions) => string;
  reset: (widgetId?: string) => void;
  remove: (widgetId?: string) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}
