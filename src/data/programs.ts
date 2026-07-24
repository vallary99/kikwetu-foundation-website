import type { Program } from "@/types/content";

export const programs: Program[] = [
  {
    slug: "k-hub-project",
    name: "The K-Hub Project",
    status: "current",
    icon: "bi-cpu",
    summary:
      "Our flagship, sustainable initiative equipping African youth with ICT skills and fostering innovation, training 20,000 young people from the Eastlands area in software development and tech skills by 2035.",
    description: [
      "The K-Hub Project is Kikwetu Foundation's sustainable and transformative initiative aimed at equipping African youth with essential ICT skills and fostering innovation. It builds on the Foundation's history of empowering Nairobi's underprivileged youth, dating back to our roots in a Dandora cyber café.",
      "The project aims to train 20,000 young people from the Eastlands area in software development and technology skills by 2035, bridging the digital divide and creating equal opportunity for youth regardless of socioeconomic background.",
      "K-Hub is structured around three courses: Technology (digital literacy, operating systems, internet use, digital tools, and productivity software), Software Developing (foundational programming, control structures, web development, and version control with Git), and Programming (object-oriented programming, design patterns, software architecture, and project management, applied through hands-on labs and capstone projects).",
    ],
    objectives: [
      "Enhance digital literacy and skills",
      "Promote youth entrepreneurship",
      "Foster technological innovation",
    ],
    beneficiaries: "Young people from Nairobi's Eastlands area, targeting 20,000 trained by 2035.",
    expectedImpact:
      "A digitally literate generation of youth equipped with software development and technology skills, bridging the digital divide and opening pathways to employment and entrepreneurship.",
    image: {
      src: "/images/kikwetu-foundation-youth-graduation-ceremony.jpg",
      alt: "Kikwetu Foundation K-Hub graduates in caps and gowns at their class of 2021 graduation ceremony",
      width: 1800,
      height: 1200,
    },
  },
  {
    slug: "tambua-mentorship-program",
    name: "Tambua Mentorship Program",
    status: "past",
    icon: "bi-signpost-split",
    summary:
      "A mentorship initiative for high school, university, and college students focused on skills, talent, and celebrating African culture.",
    description: [
      "The Tambua Mentorship Program targets students in high school, universities and colleges, and other tertiary levels, focusing on skills improvement, life after school, talent nurturing, the arts, and celebrating African culture.",
      "The program also addresses academics, sexual education, peer pressure, drug and substance abuse, mental illness, and general life skills, giving students well-rounded support beyond the classroom.",
      "Through the Tambua high-school track, secondary students access leadership training and support services. Scholars are selected based on disadvantage and demonstrated leadership potential in their community.",
    ],
    objectives: [
      "Improve academic and life skills among high school and tertiary students",
      "Nurture talent and celebrate African culture",
      "Provide peer-pressure, mental health, and substance-abuse support",
    ],
    beneficiaries: "Secondary school, university, and college students selected based on disadvantage and community leadership potential.",
    expectedImpact:
      "Better-equipped students with stronger leadership skills, confidence, and life-skills support, exemplified by beneficiaries such as Victor Gikara, who uses his training to mobilize his community and build students' confidence in school.",
    image: {
      src: "/images/kikwetu-foundation-community-outreach-students.jpg",
      alt: "Students in green school uniforms taking part in a Kikwetu Foundation community outreach event",
      width: 1600,
      height: 1062,
    },
  },
  {
    slug: "i-lead-africa",
    name: "I Lead Africa (ILA)",
    status: "past",
    icon: "bi-flag",
    summary:
      "A campus-level network giving youth a platform to showcase leadership and entrepreneurial skills.",
    description: [
      "I Lead Africa (ILA) Network is an initiative that provides youth at campus level with a platform to showcase their leadership and entrepreneurial skills while equipping them with knowledge to take those skills further.",
    ],
    objectives: [
      "Give campus-level youth a platform to showcase leadership skills",
      "Build entrepreneurial knowledge and capability",
    ],
    beneficiaries: "University and college students across Kenya.",
    expectedImpact: "A network of youth leaders equipped with entrepreneurial knowledge and platforms to put it into practice.",
    image: {
      src: "/images/kikwetu-foundation-youth-community-gathering.jpg",
      alt: "Young Kenyan leaders and Kikwetu Foundation volunteers gathered outdoors during an I Lead Africa network event",
      width: 1800,
      height: 1346,
    },
  },
  {
    slug: "caravan-of-love",
    name: "Caravan of Love",
    status: "past",
    icon: "bi-heart",
    summary:
      "A charitable outreach programme bringing support, love, and knowledge directly to children in need.",
    description: [
      "Caravan of Love seeks to make a tangible, real difference in a child's life by providing much-needed love, support, and knowledge.",
      "Through the Caravan of Love, Kikwetu Foundation has undertaken activities including visits to children's homes, Fun Days, Crazy Olympics, and motivational talks.",
    ],
    objectives: [
      "Visit and support children's homes",
      "Run Fun Days and Crazy Olympics activities for children",
      "Deliver motivational talks",
    ],
    beneficiaries: "Children in children's homes and underserved communities.",
    expectedImpact: "Children who feel seen, supported, and motivated, with a tangible improvement in their day-to-day wellbeing.",
    image: {
      src: "/images/kikwetu-foundation-volunteers-share-for-care.jpg",
      alt: "Kikwetu Foundation volunteers wearing Share For Care t-shirts during a Caravan of Love community outreach",
      width: 1400,
      height: 1327,
    },
  },
  {
    slug: "vote-for-education",
    name: "Vote for Education",
    status: "past",
    icon: "bi-mortarboard",
    summary:
      "A campaign providing education access to impoverished children and youth, in line with the UN Sustainable Development Goals.",
    description: [
      "The Vote for Education campaign provides education to impoverished children and youth, supporting the goal of quality education in line with the United Nations' Sustainable Development Goals (SDGs).",
      "Kikwetu Foundation has contributed to building schools including the Outreach Community Center in Kariobangi North, Tollan Children's Education Center in Kaberia, and Soul Mercy Education Complex in Dandora.",
    ],
    objectives: [
      "Provide education access to impoverished children and youth",
      "Support quality education in line with UN SDG 4",
      "Contribute to building and equipping community schools",
    ],
    beneficiaries: "Impoverished children and youth in Nairobi's Eastlands-area communities.",
    expectedImpact: "Expanded access to education and school infrastructure in underserved communities such as Kariobangi North, Kaberia, and Dandora.",
    image: {
      src: "/images/kikwetu-foundation-community-outreach-students.jpg",
      alt: "Students taking part in a Kikwetu Foundation Vote for Education community outreach event",
      width: 1600,
      height: 1062,
    },
  },
];

export const currentPrograms = programs.filter((p) => p.status === "current");
export const pastPrograms = programs.filter((p) => p.status === "past");

export function getProgramBySlug(slug: string): Program | undefined {
  return programs.find((p) => p.slug === slug);
}
