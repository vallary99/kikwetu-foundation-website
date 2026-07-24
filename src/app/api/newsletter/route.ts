import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/newsletter
 *
 * Newsletter signup endpoint. Validates the submitted email and currently
 * only logs it server-side — no email-marketing platform is connected yet
 * per project requirements ("prepare reusable architecture for future
 * integration").
 *
 * To connect a real provider, add the API call below and set the relevant
 * environment variables. See README.md → "Newsletter Documentation" for
 * step-by-step guides for Brevo, Mailchimp, and ConvertKit.
 *
 * Example (Mailchimp):
 *   await fetch(`https://<dc>.api.mailchimp.com/3.0/lists/${listId}/members`, {
 *     method: "POST",
 *     headers: {
 *       Authorization: `apikey ${process.env.MAILCHIMP_API_KEY}`,
 *       "Content-Type": "application/json",
 *     },
 *     body: JSON.stringify({ email_address: email, status: "subscribed" }),
 *   });
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = typeof body.email === "string" ? body.email.trim() : "";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
    }

    // TODO: forward `email` to the configured email-marketing provider
    // (Brevo / Mailchimp / ConvertKit) once credentials are available.

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
