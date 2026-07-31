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

/**
 * Ways organizations can collaborate with Kikwetu Foundation, framed by
 * collaboration model rather than by audience type (see
 * `partnershipOpportunities` above for the audience-based framing used
 * higher on the Partners page). Grounded in the engagement models the
 * Company Profile and prior partnership content already describe:
 * CSR co-design, shared/joint programming, sponsorship of specific
 * initiatives like K-Hub, community projects, skills training, volunteering,
 * and transparent reporting. Nothing here names a specific unconfirmed
 * program; each description stays general enough to be accurate.
 */
export const collaborationAreas: PartnershipOpportunity[] = [
  {
    title: "CSR Initiatives",
    audience: "Corporate Social Responsibility",
    description: "Co-design a CSR program around measurable youth outcomes instead of a one-off donation.",
    icon: "bi-building",
  },
  {
    title: "Strategic Partnerships",
    audience: "Cross-sector alliances",
    description: "Combine your organization's reach or expertise with our grassroots delivery network in Nairobi and beyond.",
    icon: "bi-diagram-3",
  },
  {
    title: "Sponsorship Opportunities",
    audience: "Programs & initiatives",
    description: "Sponsor a specific initiative, such as K-Hub digital-skills training, with clear reporting on where funds go.",
    icon: "bi-award",
  },
  {
    title: "Community Development",
    audience: "Local & county projects",
    description: "Join us on the ground in the counties where we work, from school infrastructure to youth facilities.",
    icon: "bi-house-heart",
  },
  {
    title: "Skills Development Programs",
    audience: "Training & education",
    description: "Contribute training capacity, curriculum, or mentorship hours to programs like K-Hub and Tambua.",
    icon: "bi-mortarboard",
  },
  {
    title: "Volunteer Engagement",
    audience: "Individuals & teams",
    description: "Bring your team's time and skills directly to our programs; see the Get Involved page for current opportunities.",
    icon: "bi-people",
  },
  {
    title: "Capacity Building",
    audience: "Organizational strength",
    description: "Help strengthen our systems and reach, from governance to digital tools, so more of every resource goes to youth.",
    icon: "bi-graph-up-arrow",
  },
  {
    title: "Research & Innovation",
    audience: "Data & evidence",
    description: "Partner with us to study what works in youth economic empowerment and share evidence that improves the field.",
    icon: "bi-lightbulb",
  },
  {
    title: "Joint Fundraising",
    audience: "Shared campaigns",
    description: "Co-host a fundraising campaign or event that grows the resource base for youth programs on both sides.",
    icon: "bi-piggy-bank",
  },
];
