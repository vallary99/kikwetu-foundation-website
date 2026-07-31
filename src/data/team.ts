import type { TeamMember } from "@/types/content";

/**
 * Team member data.
 *
 * Names, roles, and bios below are drawn directly from the Kikwetu
 * Foundation Company Profile (2024). Two photos (Judy Muthoni, Timothy
 * Nzuna) didn't share an exact name with a profile entry at first pass
 * ("Muthoni Karanga" and "Timothy Prince" respectively), so they initially
 * shipped with names and photos only, no title or bio. The organization
 * has since confirmed both are the same people, so their full profile
 * bios are now included below.
 */
export const teamMembers: TeamMember[] = [
  {
    slug: "kendy-mbugua",
    name: "Kendy Mbugua",
    role: "Founder & Chairman",
    bio: "Kendy is very keen on leadership and mentorship, and is actively involved in business, investment, and working with young people. He founded Kikwetu Foundation from a small cyber café in Dandora and continues to impart his experience in business to young people and the wider community.",
    image: {
      src: "/images/team/kikwetu-foundation-kendy-mbugua.jpg",
      alt: "Kendy Mbugua, Founder and Chairman of Kikwetu Foundation",
      width: 1000,
      height: 945,
    },
  },
  {
    slug: "timothy-nzuna",
    name: "Timothy Nzuna",
    role: "Vice-Chairperson",
    bio: "Timothy is a visionary, brand consultant, and creative designer, and founder of Group Butterfly Branding Africa, a leading branding agency for co-operating brands and businesses.",
    image: {
      src: "/images/team/kikwetu-foundation-timothy-nzuna.jpg",
      alt: "Timothy Nzuna, Vice-Chairperson of Kikwetu Foundation",
      width: 1000,
      height: 1500,
    },
  },
  {
    slug: "susan-munyoki",
    name: "Susan Munyoki",
    role: "Secretary",
    bio: "Susan is a gifted writer and entrepreneur. Her short story, \"Cold Feet on Sunny Day,\" is published in the FEMRITE anthology \"Summoning the Rains.\" She also owns Professional Writers Kenya, a writing services company, and brings a passion for music and the arts to the Foundation's work.",
    image: {
      src: "/images/team/kikwetu-foundation-susan-munyoki.jpg",
      alt: "Susan Munyoki, Secretary of Kikwetu Foundation",
      width: 1000,
      height: 1724,
    },
  },
  {
    slug: "samuel-kariuki",
    name: "Samuel Kariuki",
    role: "Treasurer",
    bio: "A banker by profession with a degree in Political Science and Economics from the University of Nairobi, Samuel brings his love for numbers and accounting to the Foundation, keeping its accounts organized and up to date.",
    image: {
      src: "/images/team/kikwetu-foundation-samuel-kariuki.jpg",
      alt: "Samuel Kariuki, Treasurer of Kikwetu Foundation",
      width: 1000,
      height: 1500,
    },
  },
  {
    slug: "judy-muthoni",
    name: "Judy Muthoni",
    bio: "Having lived in almost all countries in East Africa, Judy has interacted with and gained exposure to different cultures around the continent. Her main passion is mentoring and interacting with young people to forge good relationships that lead to self-reliance, through contacts built via activities sponsored by Kikwetu Foundation.",
    image: {
      src: "/images/team/kikwetu-foundation-judy-muthoni.jpg",
      alt: "Judy Muthoni, member of the Kikwetu Foundation team",
      width: 1000,
      height: 1500,
    },
  },
];

export const teamGroupPhoto = {
  src: "/images/team/kikwetu-foundation-team-group-photo.jpg",
  alt: "The Kikwetu Foundation team gathered together for a group photo",
  width: 1600,
  height: 1066,
};
