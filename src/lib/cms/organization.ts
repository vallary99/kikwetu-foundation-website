import { organization, impactStats, focusAreas, currentPlan } from "@/data/organization";
import type { OrganizationProfile, Stat, FocusArea } from "@/types/content";

/**
 * Data-access layer for organization-level content.
 *
 * Every function is `async` even though the current implementation reads
 * from local mock data. That keeps the call signature identical to what a
 * future Sanity-backed implementation will need (`await client.fetch(...)`),
 * so swapping the source only requires editing this file, no UI or page
 * component changes required. See README.md → "Replacing mock data with
 * Sanity" for the migration steps.
 */
export async function getOrganizationProfile(): Promise<OrganizationProfile> {
  return organization;
}

export async function getImpactStats(): Promise<Stat[]> {
  return impactStats;
}

export async function getFocusAreas(): Promise<FocusArea[]> {
  return focusAreas;
}

export async function getCurrentPlan(): Promise<string[]> {
  return currentPlan;
}
