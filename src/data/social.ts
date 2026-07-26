export interface SocialLink {
  label: string;
  href: string;
  icon: string; // bootstrap-icons class name
  /** True = show the icon but it isn't clickable yet (no confirmed URL). */
  placeholder?: boolean;
}

/**
 * Social media links for the footer.
 *
 * URLs are cleaned versions of the ones confirmed by the organization
 * (share-tracking query params like `?igsh=` / `?_r=1&_t=` stripped since
 * they're not needed for a static footer link; the LinkedIn URL was
 * simplified to a direct company-page link using the organization ID
 * embedded in the search-result URL that was provided).
 *
 * Facebook has no confirmed URL yet, so it's included as a visible but
 * unlinked placeholder rather than a guessed/fabricated address.
 */
export const socialLinks: SocialLink[] = [
  { label: "Facebook", href: "", icon: "bi-facebook", placeholder: true },
  { label: "Instagram", href: "https://www.instagram.com/kikwetufoundation", icon: "bi-instagram" },
  { label: "TikTok", href: "https://www.tiktok.com/@kikwetufoundation", icon: "bi-tiktok" },
  { label: "X (Twitter)", href: "https://x.com/KikwetuFDN", icon: "bi-twitter-x" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/43260334", icon: "bi-linkedin" },
  { label: "YouTube", href: "https://www.youtube.com/results?search_query=kikwetu+foundation", icon: "bi-youtube" },
];
