/**
 * Floating WhatsApp "Click to Chat" button, rendered once in the root
 * layout so it appears on every page. Uses WhatsApp's official Click-to-Chat
 * URL format (https://wa.me/<countrycode+number>), no API key or SDK
 * required, and no client-side JavaScript needed since it's a plain link.
 */
const WHATSAPP_NUMBER = "254742604083"; // +254 742 604 083, digits only per wa.me format

export function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      className="kf-whatsapp-fab"
      aria-label="Chat with us on WhatsApp"
    >
      <span className="kf-whatsapp-tooltip" aria-hidden="true">
        Chat with us on WhatsApp
      </span>
      <i className="bi bi-whatsapp" aria-hidden="true" />
    </a>
  );
}
