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
    line1: "Agip House, Haile Selassie Avenue, Entrance A, 4th Floor, RM 415",
    line2: "P.O. Box 729-00516",
    city: "Nairobi, Kenya",
  },
};
