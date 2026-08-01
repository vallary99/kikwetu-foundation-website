import { NextRequest, NextResponse } from "next/server";
import { sendContactNotification, sendContactConfirmation, type ContactSubmission } from "@/lib/email";
import { verifyTurnstileToken } from "@/lib/turnstile";

/**
 * POST /api/contact
 *
 * Handles contact form submissions (partnership, volunteering, sponsorship,
 * media, and general inquiries). Validates input, verifies the Cloudflare
 * Turnstile token server-side, then sends a notification email to the
 * Foundation's inbox and a confirmation email back to the sender via Resend.
 *
 * This is the single integration point for the contact form, the form
 * component itself does not need to change to swap providers later.
 */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "Unknown";
  }
  return request.headers.get("x-real-ip") ?? "Unknown";
}

export async function POST(request: NextRequest) {
  let body: Record<string, string>;
  try {
    body = (await request.json()) as Record<string, string>;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, phone, message, organization, inquiryType, turnstileToken } = body;

  // --- Validate input -------------------------------------------------
  const errors: Record<string, string> = {};
  if (!name?.trim()) errors.name = "Name is required.";
  if (!EMAIL_PATTERN.test(email ?? "")) errors.email = "A valid email is required.";
  if (!message?.trim()) errors.message = "Message is required.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  // --- Verify spam protection before doing anything else ---------------
  const clientIp = getClientIp(request);
  const isHuman = await verifyTurnstileToken(turnstileToken, clientIp);
  if (!isHuman) {
    return NextResponse.json({ error: "Verification failed. Please try again." }, { status: 403 });
  }

  const submission: ContactSubmission = {
    name: name.trim(),
    email: email.trim(),
    phone: phone?.trim() || "Not provided",
    organization: organization?.trim() || "Not provided",
    subject: inquiryType?.trim() || "General",
    message: message.trim(),
    submittedAt: new Date().toLocaleString("en-KE", { timeZone: "Africa/Nairobi", dateStyle: "medium", timeStyle: "short" }),
    userAgent: request.headers.get("user-agent") ?? "Unknown",
    ipAddress: clientIp,
  };

  // --- Send emails ------------------------------------------------------
  try {
    await sendContactNotification(submission);
  } catch (error) {
    console.error("[contact] failed to send notification email:", error);
    return NextResponse.json({ error: "Failed to send your message. Please try again shortly." }, { status: 502 });
  }

  try {
    // The confirmation email is a nice-to-have: the notification above is
    // the part that actually matters, so a confirmation failure shouldn't
    // make the whole submission look like it failed to the visitor.
    await sendContactConfirmation(submission);
  } catch (error) {
    console.error("[contact] failed to send confirmation email:", error);
  }

  return NextResponse.json({ success: true });
}
