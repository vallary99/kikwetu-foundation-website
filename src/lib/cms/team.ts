import { teamMembers, teamGroupPhoto } from "@/data/team";
import type { TeamMember } from "@/types/content";

export async function getTeamMembers(): Promise<TeamMember[]> {
  return teamMembers;
}

export async function getTeamGroupPhoto() {
  return teamGroupPhoto;
}
