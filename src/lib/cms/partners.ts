import { partnershipOpportunities, partnerBenefits, collaborationAreas } from "@/data/partners";
import { contactInfo } from "@/data/contact";
import type { PartnershipOpportunity, ContactInfo } from "@/types/content";

export async function getPartnershipOpportunities(): Promise<PartnershipOpportunity[]> {
  return partnershipOpportunities;
}

export async function getPartnerBenefits(): Promise<string[]> {
  return partnerBenefits;
}

export async function getCollaborationAreas(): Promise<PartnershipOpportunity[]> {
  return collaborationAreas;
}

export async function getContactInfo(): Promise<ContactInfo> {
  return contactInfo;
}
