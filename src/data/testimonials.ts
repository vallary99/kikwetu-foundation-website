import type { Testimonial } from "@/types/content";

/**
 * Volunteer testimonials.
 *
 * Quotes are taken from the Foundation's volunteer testimonial graphics
 * (Instagram series). Wording is kept as the volunteers wrote it; only clear
 * spelling slips were corrected (e.g. "greatful" → "grateful").
 * Neha and Ishita's graphics carried no portrait, so their cards use an initial.
 */
const portrait = (slug: string, name: string) => ({
  src: `/images/testimonials/kikwetu-foundation-volunteer-${slug}.jpg`,
  alt: `${name}, Kikwetu Foundation volunteer`,
  width: 400,
  height: 400,
});

export const testimonials: Testimonial[] = [
  {
    slug: "timothy",
    name: "Timothy",
    country: "Philippines",
    headline: "A Fortress of Hope",
    quote:
      "Working with the Kikwetu Foundation made me realize the simplicity of small efforts combining into a powerful force that can affect positive change. Strengths combined and weaknesses complemented. Our team of volunteers are exciting and motivating to work with. They have exceptional talents and values that inspired me to be better for things I care about. Knowing about the culture where the organization thrives taught me how to be more respectful and empathic. This is all thanks to Sir Kennedy, an inspiring appreciative mentor who sees the good in every person. Through their projects, the Foundation has become a fortress of hope for the Kenyan youth, and a source of inspiration for the people around the world.",
    image: portrait("timothy", "Timothy"),
  },
  {
    slug: "pauline",
    name: "Pauline",
    country: "Kenya",
    headline: "A Youth Project",
    quote:
      "Being a part of Kikwetu has been an amazing experience. Working with the youth on issues like drugs and substance abuse, sexual education, and mental health has been a great experience; [as well as] getting to interact with them and hearing their opinions on different topics and to share knowledge. The journey of empowering the youths was great and with the support from the team and Mr. Kennedy, [they] have made the experience interesting. Thanks so much, Kikwetu!",
    image: portrait("pauline", "Pauline"),
  },
  {
    slug: "virginia",
    name: "Virginia",
    country: "Italy",
    headline: "An amazing NGO",
    quote:
      "I've started online-volunteering for the Kikwetu Foundation in the social media area, and I couldn't be much more prouder to be part of this organization. I knew in general what the situation in Kenya was but Kendy, the founder, was very keen to help me understand it more, he also took time to explain me the purposes of every project he created to improve children's education - and each of them is remarkable! His passion is tangible and this develops my passion for the organization and my work. If you think that you're passionate about making a difference in this world and help other people, this is the right organization to do it.",
    image: portrait("virginia", "Virginia"),
  },
  {
    slug: "ythera",
    name: "Ythera",
    country: "Kenya",
    headline: "Home away from Home",
    quote:
      "Volunteering in Kikwetu Foundation has been a wonderful experience for me. So many values have been instilled in me since I joined the organization in 2016. I have learned to be more accountable, to be more accommodative of others, and to be respectful. I have also gained interpersonal skills and I have learned to share. Kikwetu foundation has become my home; I have found lifetime friends, mentors and counsellors. The leader of the organization is liberal minded and a very wise gentleman. It is through observing him that I've learned that hard work, resilience, and a kind heart play a major role in how we go by and by each day, and how we should tackle our daily problems. I am grateful to the Kikwetu foundation because I am proud of who I am becoming.",
    image: portrait("ythera", "Ythera"),
  },
  {
    slug: "mercy",
    name: "Mercy",
    country: "United Kingdom",
    headline: "An insightful period of learning",
    quote:
      "While I am happy about the contributions my skills have brought to Kikwetu Foundation, it has also been a great period of learning for me. I have learnt about the impact the organisations make in the lives of rural youths in Kenya and I have also developed my skills in research and grant writing. I love that the organisation focuses on the marginalized and seeks to help them achieve their greatest potentials. Kendy the chairman has been a great leader to work with. His appreciation of the commitment and contributions of volunteers is very encouraging.",
    image: portrait("mercy", "Mercy"),
  },
  {
    slug: "nariman",
    name: "Nariman",
    country: "Romania",
    headline: "Good Vibes",
    quote:
      "My experience so far has been very pleasant. Kendy (the founder) has been very helpful in educating me about Kenya's current state of affairs. Due to his open-minded nature and approach, I've always felt comfortable in stating my opinions or asking any questions freely. Becoming part of the team felt like joining a group of friends, rather than co-workers, due to the positive atmosphere. I'm excited to contribute in any way that I can to this great cause. I would recommend it to anyone who's passionate about human rights in general.",
    image: portrait("nariman", "Nariman"),
  },
  {
    slug: "neha",
    name: "Neha",
    country: "India",
    headline: "The best place for volunteering",
    quote:
      "The members of this organisation makes it more interesting to work with them and it's very amazing experience to work within Kikwetu Foundation as online volunteer and now I am looking forward for performing offline volunteering too with them in future. Apart from this, I have learnt many things here and still learning day by day. I really want to thank my Sir Kendy Mbugua for giving me this chance and in cases of my mistakes, for making them visible to me and after all that for not giving up on me. He is one of the best mentors I have ever met. I am very honoured to be volunteer here and having good learning experience. Thank you Kikwetu Foundation.",
  },
  {
    slug: "ishita",
    name: "Ishita",
    country: "India",
    headline: "Excellent Initiative",
    quote:
      "Volunteering is so much more than just giving time. Being part of Kikwetu Foundation has helped me understand the organisation setup at its core and importance of all their missions and value statements. Kendy is very supportive and passionate and has displayed ample patience with my numerous questions and emails. This volunteering opportunity has not only added me valuable skills but also given me opportunity to learn and interact with people who have been working long-term in the field of development.",
  },
];
