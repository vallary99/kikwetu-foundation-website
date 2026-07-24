/**
 * Sanity client configuration (not yet active).
 *
 * This file is intentionally inert until the project is connected to a real
 * Sanity dataset. See README.md → "CMS Documentation" for the full setup
 * guide. Once configured, `/lib/cms/*.ts` files should import `client` from
 * here and replace their local-data reads with `client.fetch(query)` calls,
 * no other part of the app needs to change.
 *
 * Required environment variables (see .env.example):
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET
 *   NEXT_PUBLIC_SANITY_API_VERSION
 */

// Uncomment once `@sanity/client` is installed:
//
// import { createClient } from "@sanity/client";
//
// export const client = createClient({
//   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
//   dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
//   apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01",
//   useCdn: true,
// });

export {};
