/**
 * Draft Sanity schema definitions for Kikwetu Foundation content types.
 *
 * These mirror the TypeScript interfaces in `/types/content.ts` field for
 * field, so migrating from mock data to Sanity is a direct mapping. They are
 * plain objects (not wired into a Sanity Studio config) until the `sanity`
 * package is installed, see README.md → "CMS Documentation" for the
 * `sanity init` steps that will consume these.
 */

export const programSchema = {
  name: "program",
  title: "Program",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string" },
    { name: "slug", title: "Slug", type: "slug", options: { source: "name" } },
    { name: "status", title: "Status", type: "string", options: { list: ["current", "past"] } },
    { name: "icon", title: "Icon (Bootstrap Icons class)", type: "string" },
    { name: "summary", title: "Summary", type: "text" },
    { name: "description", title: "Description", type: "array", of: [{ type: "text" }] },
    { name: "objectives", title: "Objectives", type: "array", of: [{ type: "string" }] },
    { name: "beneficiaries", title: "Beneficiaries", type: "text" },
    { name: "expectedImpact", title: "Expected Impact", type: "text" },
    { name: "image", title: "Image", type: "image", options: { hotspot: true }, fields: [{ name: "alt", title: "Alt text", type: "string" }] },
  ],
};

export const newsArticleSchema = {
  name: "newsArticle",
  title: "News Article",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title" } },
    { name: "excerpt", title: "Excerpt", type: "text" },
    { name: "date", title: "Publish Date", type: "date" },
    { name: "image", title: "Cover Image", type: "image", options: { hotspot: true }, fields: [{ name: "alt", title: "Alt text", type: "string" }] },
    { name: "body", title: "Body", type: "array", of: [{ type: "block" }] },
  ],
};

export const statSchema = {
  name: "stat",
  title: "Impact Statistic",
  type: "document",
  fields: [
    { name: "value", title: "Value", type: "string" },
    { name: "label", title: "Label", type: "string" },
    { name: "description", title: "Description", type: "text" },
  ],
};

export const partnerSchema = {
  name: "partner",
  title: "Partner",
  type: "document",
  fields: [
    { name: "name", title: "Organization Name", type: "string" },
    { name: "logo", title: "Logo", type: "image" },
    { name: "website", title: "Website URL", type: "url" },
  ],
};

export const siteSettingsSchema = {
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    { name: "email", title: "Contact Email", type: "string" },
    { name: "phone", title: "Contact Phone", type: "string" },
    { name: "addressLine1", title: "Address Line 1", type: "string" },
    { name: "addressLine2", title: "Address Line 2", type: "string" },
    { name: "socialLinks", title: "Social Links", type: "array", of: [{ type: "url" }] },
  ],
};

export const schemaTypes = [programSchema, newsArticleSchema, statSchema, partnerSchema, siteSettingsSchema];
