import type { OrganizationProfile, CoreValue, Stat, FocusArea } from "@/types/content";

/**
 * All copy in this file is derived directly from the Kikwetu Foundation
 * Company Profile (2024). Nothing here is fabricated, figures, dates, and
 * quotes are reproduced or paraphrased from that source document only.
 */

export const organization: OrganizationProfile = {
  name: "Kikwetu Foundation",
  legalStatus: "Registered with the Public Benefits Regulatory Authority (PBORA), Kenya",
  founded: "2012",
  registered: "2014",
  memberCount: "150+",
  beneficiaryCount: "10,000+",
  countiesActive: "5",
  vision: "To be the leading transformative organization in Africa.",
  mission:
    "To create opportunities, equip young people with skills, and transform African youth in general.",
  story: [
    "Kikwetu Foundation's journey began in 2012 in a small cyber café in Nairobi's Dandora area, owned by our founder and Chairman, Kendy Mbugua. What started as a place to train recent secondary-school leavers in computer literacy grew into something bigger: in that first year alone, the cyber café trained 16 youths who could not otherwise afford ICT courses.",
    "That early success convinced Kendy Mbugua to build a permanent home for transformation. Together with a group of like-minded young people determined to advance African culture as a pathway to economic opportunity, he founded Kikwetu Foundation.",
    "In 2014, Kikwetu Foundation was officially registered by the NGO Coordination Board of Kenya, marking the formal start of our journey. Today, the Foundation is registered under the Public Benefits Regulatory Authority (PBORA) and counts around 150 members across Africa and Europe, most of them active in pan-African, cross-sector work.",
  ],
  approach: [
    "We invest in a distinct way of doing things, guided by our core purpose: to transform. We create opportunities for young Africans to be part of our growth story by equipping them with the tools they need for economic growth, life skills, and education.",
    "We pursue that transformation through several channels, but our most impactful stories consistently trace back to our base station, the grassroots, community-level work that puts us in direct contact with the youth we serve. To date, Kikwetu Foundation has reached over 10,000 beneficiaries, directly and indirectly.",
  ],
  values: [
    { name: "Commitment to Service", description: "We show up for the communities we serve, consistently and reliably." },
    { name: "Integrity", description: "We do what we say we will do, and we do it honestly." },
    { name: "Transparency", description: "We are open about how we operate and how resources are used." },
    { name: "Accountability", description: "We hold ourselves responsible to our beneficiaries and our partners." },
    { name: "Innovation", description: "We look for new, more effective ways to create opportunity." },
    { name: "Inclusivity", description: "We design programs that welcome youth across backgrounds and circumstances." },
  ] as CoreValue[],
};

export const impactStats: Stat[] = [
  { value: "10,000+", label: "Beneficiaries reached", description: "Direct and indirect beneficiaries of Kikwetu Foundation programs to date." },
  { value: "30,000+", label: "People reached", description: "People reached through our programming over the last seven years." },
  { value: "15,000+", label: "Reached in Nairobi", description: "Of that total reach, more than 15,000 people were reached in Nairobi alone." },
  { value: "150+", label: "Members", description: "Members across Africa and Europe, most operating pan-African, cross-sector work." },
  { value: "5", label: "Counties active", description: "Counties across Kenya where the Foundation currently runs programs." },
  { value: "2012", label: "Founded", description: "Founded in Dandora, Nairobi, and officially registered by the NGO Coordination Board of Kenya in 2014." },
];

export const focusAreas: FocusArea[] = [
  {
    name: "Mentorship",
    icon: "bi-people",
    description:
      "A major societal challenge is the lack of mentorship opportunities and role models for young people. Kikwetu Foundation acts as a bridge between mentees and mentors, helping young professionals learn from the best in their field.",
  },
  {
    name: "Youth Empowerment",
    icon: "bi-lightbulb",
    description:
      "Most Kenyan youth are disillusioned by a pervasive lack of employment and business opportunities. We provide opportunities and forums that let young people nurture their unique talents and capabilities toward economic empowerment.",
  },
  {
    name: "Culture Development",
    icon: "bi-globe",
    description:
      "Africa's rich cultural heritage is being slowly eroded in the modern era. We believe that culture can be a force for the betterment of society, and our programs promote and encourage these values.",
  },
  {
    name: "Entrepreneurship & Innovation",
    icon: "bi-graph-up-arrow",
    description:
      "Improving community economic standards sits at the heart of our work. We use entrepreneurship and innovation programming as a vehicle to drive economic opportunity for the youth we serve.",
  },
];

export const currentPlan: string[] = [
  "Leverage technology to connect employers and job seekers and drive growth.",
  "Enable entrepreneurs and small businesses to expand through access to financial services.",
  "Enhance the capacity of youth and empower them toward socioeconomic growth.",
  "Empower young people to make good decisions, addressing mental health, sex education, and drug abuse.",
  "Improve the quality of education and vocational training so young people gain the skills employers need.",
  "Promote youth rights and gender equality through strategic communications, campaigns, and support for small youth enterprises.",
];
