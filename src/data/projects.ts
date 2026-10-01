import type { Project } from "@/types/project";

// PLACEHOLDER DATA — replace these entries with real projects before launch.
// See docs/content.md for notes on what to fill in here. All three reuse the
// same placeholder screenshot until real project screenshots are available.
const PLACEHOLDER_IMAGE = "/projects/placeholder-showcase-1.png";
const MICROSERVICE_MONOREPO_1 = "/projects/microservice-monorepo-1.png";
const MICROSERVICE_MONOREPO_2 = "/projects/microservice-monorepo-2.png";

const SKYMAIL_1 = "/projects/skymail-01.png";
const SKYMAIL_2 = "/projects/skymail-02.png";
const SKYMAIL_3 = "/projects/skymail-03.png";
const SKYMAIL_4 = "/projects/skymail-04.png";
const SKYMAIL_5 = "/projects/skymail-05.png";

export const projects: Project[] = [
  {
    slug: "microservice-monorepo",
    title: "Microservice Monorepo",
    description: `Independent microservices - each with it's own database and it's owner container. Stop one, and the other two keep answering through the same gateway.`,
    images: [MICROSERVICE_MONOREPO_1, MICROSERVICE_MONOREPO_2],
    techStack: [
      "NestJS",
      "TypeScript",
      "Prisma",
      "Docker",
      "Traefik",
      "JWT (RS256)",
    ],
    liveUrl: null,
    sourceUrl: "https://github.com/ryan-santiago/microservice-monorepo",
  },
  {
    slug: "skymail-project",
    title: "Skymail Project",
    description:
      "A clean, simple email sender. Bring your own SMTP account and send to anyone.",
    images: [SKYMAIL_1, SKYMAIL_2, SKYMAIL_3, SKYMAIL_4, SKYMAIL_5],
    techStack: ["HTML5", "CSS3", "VanillaJS", "Node.js", "Nodemailer"],
    liveUrl: "https://skymail.coderyan.dev",
    sourceUrl: "https://github.com/ryan-santiago/skymail",
  },
  {
    slug: "placeholder-project-three",
    title: "Placeholder Project Three",
    description:
      "Short placeholder description of what this project does and the problem it solves.",
    images: [PLACEHOLDER_IMAGE],
    techStack: ["React", "GraphQL", "Docker"],
    liveUrl: "#",
    sourceUrl: "#",
  },
  {
    slug: "placeholder-project-four",
    title: "Placeholder Project Four",
    description:
      "Short placeholder description of what this project does and the problem it solves.",
    images: [PLACEHOLDER_IMAGE],
    techStack: ["React", "GraphQL", "Docker"],
    liveUrl: "#",
    sourceUrl: "#",
  },
  {
    slug: "placeholder-project-five",
    title: "Placeholder Project Five",
    description:
      "Short placeholder description of what this project does and the problem it solves.",
    images: [PLACEHOLDER_IMAGE],
    techStack: ["React", "GraphQL", "Docker"],
    liveUrl: "#",
    sourceUrl: "#",
  },
  {
    slug: "placeholder-project-six",
    title: "Placeholder Project Six",
    description:
      "Short placeholder description of what this project does and the problem it solves.",
    images: [PLACEHOLDER_IMAGE],
    techStack: ["React", "GraphQL", "Docker"],
    liveUrl: "#",
    sourceUrl: "#",
  },
  {
    slug: "placeholder-project-seven",
    title: "Placeholder Project Seven",
    description:
      "Short placeholder description of what this project does and the problem it solves.",
    images: [PLACEHOLDER_IMAGE],
    techStack: ["React", "GraphQL", "Docker"],
    liveUrl: "#",
    sourceUrl: "#",
  },
  {
    slug: "placeholder-project-eight",
    title: "Placeholder Project Eight",
    description:
      "Short placeholder description of what this project does and the problem it solves.",
    images: [PLACEHOLDER_IMAGE],
    techStack: ["React", "GraphQL", "Docker"],
    liveUrl: "#",
    sourceUrl: "#",
  },
  {
    slug: "placeholder-project-nine",
    title: "Placeholder Project Nine",
    description:
      "Short placeholder description of what this project does and the problem it solves.",
    images: [PLACEHOLDER_IMAGE],
    techStack: ["React", "GraphQL", "Docker"],
    liveUrl: "#",
    sourceUrl: "#",
    legacy: true,
  },
  {
    slug: "placeholder-project-ten",
    title: "Placeholder Project Ten",
    description:
      "Short placeholder description of what this project does and the problem it solves.",
    images: [PLACEHOLDER_IMAGE],
    techStack: ["React", "GraphQL", "Docker"],
    liveUrl: "#",
    sourceUrl: "#",
    legacy: true,
  },
];
