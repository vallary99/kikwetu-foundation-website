import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/contact
 *
 * Handles contact form submissions (partnership, volunteering, sponsorship,
 * media, and general inquiries). Currently validates input and returns
 * success without dispatching email, no transactional email provider or
 * CRM is wired up yet.
 *
 * To go live, add an email send (e.g. Resend, SendGrid, Postmark) or a CRM
 * write (e.g. HubSpot, Salesforce) here. Keep this file as the single
 * integration point; the form component does not need to change.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message, organization, inquiryType } = body as Record<string, string>;

    const errors: Record<string, string> = {};
    if (!name?.trim()) errors.name = "Name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email ?? "")) errors.email = "A valid email is required.";
    if (!message?.trim()) errors.message = "Message is required.";

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    // Fully-validated payload ready to hand to an email/CRM integration.
    const submission = {
      name,
      email,
      organization: organization ?? "",
      inquiryType: inquiryType ?? "General",
      message,
      submittedAt: new Date().toISOString(),
    };

    // TODO: send `submission` via a transactional email provider (Resend,
    // SendGrid, Postmark) or write it to a CRM (HubSpot, Salesforce).
    void submission;

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
