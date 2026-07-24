import type { PartnershipOpportunity } from "@/types/content";

/**
 * No named current partner organizations were supplied in the Company
 * Profile, so this page does not list or imply specific partners. The
 * "Partnership Opportunities" below reflect the audiences and engagement
 * models Kikwetu Foundation explicitly names in its profile (CSR programs,
 * NGOs, governments, universities, foundations, and development partners).
 */
export const partnershipOpportunities: PartnershipOpportunity[] = [
  {
    title: "Corporate CSR Programs",
    audience: "Corporates & CSR teams",
    description:
      "Co-design youth-empowerment initiatives that align with your CSR goals, from K-Hub digital-skills sponsorship to community outreach support.",
    icon: "bi-building",
  },
  {
    title: "NGOs & Development Organizations",
    audience: "NGOs & development partners",
    description:
      "Collaborate on shared programming across mentorship, education, and youth economic empowerment in the Kenyan counties where we operate.",
    icon: "bi-diagram-3",
  },
  {
    title: "Governments",
    audience: "National & county government",
    description:
      "Partner with us to deepen engagement in target counties, understand local economic aspirations, and identify priority sectors for youth-focused growth.",
    icon: "bi-bank",
  },
  {
    title: "Universities & Institutions",
    audience: "Universities, colleges & training bodies",
    description:
      "Support mentorship, ICT training, and entrepreneurship pipelines that connect students and recent graduates with real opportunity.",
    icon: "bi-mortarboard",
  },
  {
    title: "Foundations & Sponsors",
    audience: "Foundations, sponsors & donors",
    description:
      "Fund measurable, community-rooted programs with transparent reporting on how resources translate into youth opportunity.",
    icon: "bi-heart-fill",
  },
];

export const partnerBenefits: string[] = [
  "Transparent, accountable use of resources with regular reporting",
  "Direct visibility into grassroots programs and their measurable reach",
  "Co-branded opportunities across community events and youth programming",
  "Access to a growing pan-African, cross-sector network of 150+ members",
  "A track record of sustainable, community-rooted development since 2012",
];
