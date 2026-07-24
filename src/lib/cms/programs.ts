import { programs, currentPrograms, pastPrograms, getProgramBySlug } from "@/data/programs";
import type { Program } from "@/types/content";

export async function getAllPrograms(): Promise<Program[]> {
  return programs;
}

export async function getCurrentPrograms(): Promise<Program[]> {
  return currentPrograms;
}

export async function getPastPrograms(): Promise<Program[]> {
  return pastPrograms;
}

export async function getProgram(slug: string): Promise<Program | undefined> {
  return getProgramBySlug(slug);
}

export async function getProgramSlugs(): Promise<string[]> {
  return programs.map((p) => p.slug);
}
