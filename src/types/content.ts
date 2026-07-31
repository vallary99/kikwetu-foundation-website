/**
 * Shared content types for Kikwetu Foundation.
 *
 * These interfaces describe the shape of content regardless of where it comes
 * from (local mock data today, Sanity CMS in the future). Keeping this layer
 * stable is what lets the CMS integration in `/lib/cms` swap data sources
 * without touching any UI component.
 */

export interface SiteImage {
  /** Path relative to /public, or a remote CMS asset URL */
  src: string;
  /** Required descriptive alt text for accessibility and image SEO */
  alt: string;
  width: number;
  height: number;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface Program {
  slug: string;
  name: string;
  status: "current" | "past";
  icon: string; // bootstrap-icons class name
  summary: string;
  description: string[];
  objectives: string[];
  beneficiaries: string;
  expectedImpact: string;
  image: SiteImage;
}

export interface Stat {
  label: string;
  value: string;
  description?: string;
}

export interface CoreValue {
  name: string;
  description: string;
}

export interface FocusArea {
  name: string;
  icon: string;
  description: string;
}

export interface TeamMember {
  slug: string;
  name: string;
  /** Omitted when a confirmed role isn't available for this person. */
  role?: string;
  bio: string;
  image: SiteImage;
}

export interface PartnershipOpportunity {
  title: string;
  audience: string;
  description: string;
  icon: string;
}

export interface ContactInfo {
  email: string;
  address: {
    line1: string;
    line2: string;
    city: string;
  };
  website: string;
  mapEmbedUrl?: string;
}

export interface OrganizationProfile {
  name: string;
  legalStatus: string;
  founded: string;
  registered: string;
  memberCount: string;
  beneficiaryCount: string;
  countiesActive: string;
  vision: string;
  mission: string;
  story: string[];
  approach: string[];
  values: CoreValue[];
}
