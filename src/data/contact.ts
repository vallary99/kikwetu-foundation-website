import type { ContactInfo } from "@/types/content";

/**
 * Contact details as published in the Kikwetu Foundation Company Profile.
 * No phone number or social profile URLs were supplied in the source
 * documents, so none are fabricated here. Add them in `/data/contact.ts`
 * (or the equivalent Sanity singleton) once the organization provides them.
 */
export const contactInfo: ContactInfo = {
  email: "info@kikwetufoundation.org",
  website: "www.kikwetufoundation.org",
  address: {
    line1: "East University, Buruburu",
    line2: "Nairobi-Mumias Road",
    city: "Nairobi, Kenya",
  },
};
