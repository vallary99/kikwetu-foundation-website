import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

// Next.js/Turbopack's dev server relies on eval() for HMR and its debugging
// tooling (stack-frame reconstruction, fast refresh). That is never used in
// production builds, so the relaxed script-src and the HMR websocket
// allowance only apply when NODE_ENV !== "production".
const scriptSrc = isDev
  ? "script-src 'self' 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://challenges.cloudflare.com"
  : "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://challenges.cloudflare.com";

const connectSrc = isDev
  ? "connect-src 'self' ws: wss: https://www.google-analytics.com https://challenges.cloudflare.com"
  : "connect-src 'self' https://www.google-analytics.com https://challenges.cloudflare.com";

const securityHeaders = [
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "img-src 'self' data: https:",
      scriptSrc,
      "style-src 'self' 'unsafe-inline'",
      "font-src 'self' data:",
      connectSrc,
      "frame-src 'self' https://www.google.com https://challenges.cloudflare.com",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
