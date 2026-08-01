import { Resend } from "resend";
import { siteConfig } from "@/lib/site-config";

/**
 * Reusable email-sending logic for the contact form (and, later, anything
 * else that needs to send branded transactional email). Keeping the Resend
 * client, templates, and send functions here means `api/contact/route.ts`
 * stays a thin orchestration layer.
 */

let resendClient: Resend | null = null;

/** Lazily creates the Resend client so a missing API key only breaks the
 * request that actually needs to send email, not the whole route module. */
function getResendClient(): Resend {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured.");
  }
  if (!resendClient) {
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

/**
 * The "from" address Resend sends as. Must be on a domain verified in the
 * Resend dashboard (see README.md → "Resend Domain Verification"). Falls
 * back to Resend's shared test address so local/staging sends still work
 * before a domain is verified.
 */
const FROM_ADDRESS = process.env.RESEND_FROM_EMAIL ?? "Kikwetu Foundation <onboarding@resend.dev>";

export interface ContactSubmission {
  name: string;
  email: string;
  phone: string;
  organization: string;
  subject: string;
  message: string;
  submittedAt: string;
  userAgent: string;
  ipAddress: string;
}

/** Shared brand tokens for inline email styling (email clients don't load
 * external stylesheets, so these are applied directly on each element). */
const BRAND = {
  olive: "#677506",
  ink: "#1c1f14",
  paper: "#fbfaf6",
  border: "#e4e2d8",
  white: "#ffffff",
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function emailShell(bodyHtml: string): string {
  return `
    <div style="background-color:${BRAND.paper};padding:32px 16px;font-family:Arial,Helvetica,sans-serif;">
      <div style="max-width:560px;margin:0 auto;background-color:${BRAND.white};border:1px solid ${BRAND.border};border-radius:8px;overflow:hidden;">
        <div style="background-color:${BRAND.olive};padding:20px 28px;">
          <span style="color:${BRAND.white};font-size:18px;font-weight:700;">Kikwetu Foundation</span>
        </div>
        <div style="padding:28px;color:${BRAND.ink};font-size:15px;line-height:1.6;">
          ${bodyHtml}
        </div>
        <div style="padding:16px 28px;border-top:1px solid ${BRAND.border};color:#6b6a5f;font-size:12px;">
          Kikwetu Foundation &middot; ${siteConfig.url.replace("https://", "")}
        </div>
      </div>
    </div>
  `;
}

function detailRow(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:6px 0;color:#6b6a5f;font-size:13px;width:150px;vertical-align:top;">${escapeHtml(label)}</td>
      <td style="padding:6px 0;color:${BRAND.ink};font-size:14px;vertical-align:top;">${escapeHtml(value) || "Not provided"}</td>
    </tr>
  `;
}

function buildNotificationEmailHtml(submission: ContactSubmission): string {
  const body = `
    <p style="margin:0 0 16px;">New message from the website contact form.</p>
    <table role="presentation" style="width:100%;border-collapse:collapse;">
      ${detailRow("Full Name", submission.name)}
      ${detailRow("Email", submission.email)}
      ${detailRow("Phone", submission.phone)}
      ${detailRow("Organization", submission.organization)}
      ${detailRow("Subject", submission.subject)}
      ${detailRow("Submitted", submission.submittedAt)}
      ${detailRow("Visitor IP", submission.ipAddress)}
      ${detailRow("User Agent", submission.userAgent)}
    </table>
    <p style="margin:20px 0 8px;color:#6b6a5f;font-size:13px;">Message</p>
    <p style="margin:0;padding:12px 16px;background-color:${BRAND.paper};border-radius:6px;white-space:pre-wrap;">${escapeHtml(submission.message)}</p>
  `;
  return emailShell(body);
}

function buildConfirmationEmailHtml(submission: ContactSubmission): string {
  const firstName = submission.name.trim().split(/\s+/)[0] || "there";
  const body = `
    <p style="margin:0 0 16px;">Hi ${escapeHtml(firstName)},</p>
    <p style="margin:0 0 16px;">
      Thank you for reaching out to Kikwetu Foundation. We've received your message and a
      member of our team will respond as soon as possible.
    </p>
    <p style="margin:0 0 16px;color:#6b6a5f;font-size:13px;">For your records, here's what you sent us:</p>
    <p style="margin:0 0 16px;padding:12px 16px;background-color:${BRAND.paper};border-radius:6px;white-space:pre-wrap;">${escapeHtml(submission.message)}</p>
    <p style="margin:0 0 4px;">Thank you again for your interest in our work.</p>
    <p style="margin:0;">The Kikwetu Foundation Team</p>
  `;
  return emailShell(body);
}

/** Sends the internal notification to the Foundation's contact inbox. */
export async function sendContactNotification(submission: ContactSubmission) {
  const contactEmail = process.env.CONTACT_EMAIL;
  if (!contactEmail) {
    throw new Error("CONTACT_EMAIL is not configured.");
  }

  return getResendClient().emails.send({
    from: FROM_ADDRESS,
    to: contactEmail,
    replyTo: submission.email,
    subject: `New contact form message: ${submission.subject}`,
    html: buildNotificationEmailHtml(submission),
  });
}

/** Sends the "we received your message" confirmation back to the sender. */
export async function sendContactConfirmation(submission: ContactSubmission) {
  return getResendClient().emails.send({
    from: FROM_ADDRESS,
    to: submission.email,
    subject: "We received your message, Kikwetu Foundation",
    html: buildConfirmationEmailHtml(submission),
  });
}
