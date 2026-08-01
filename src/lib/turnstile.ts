/**
 * Server-side Cloudflare Turnstile verification.
 *
 * Client-side widget completion alone proves nothing, a request can be
 * replayed or forged without ever running the widget. This function calls
 * Cloudflare's siteverify endpoint to confirm the token is genuine before
 * the caller does anything (like sending an email) on the strength of it.
 */

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

interface TurnstileVerifyResponse {
  success: boolean;
  "error-codes"?: string[];
}

export async function verifyTurnstileToken(token: string | undefined | null, remoteIp?: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  if (!secretKey) {
    // Fail closed: if verification isn't configured, treat every
    // submission as unverified rather than silently skipping the check.
    return false;
  }
  if (!token) {
    return false;
  }

  try {
    const params = new URLSearchParams();
    params.append("secret", secretKey);
    params.append("response", token);
    if (remoteIp) params.append("remoteip", remoteIp);

    const response = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    if (!response.ok) return false;

    const result = (await response.json()) as TurnstileVerifyResponse;
    return result.success === true;
  } catch {
    return false;
  }
}
