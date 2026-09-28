import type { Project } from "@/types/project";

// PLACEHOLDER DATA — replace these entries with real projects before launch.
// See docs/content.md for notes on what to fill in here. All three reuse the
// same placeholder screenshot until real project screenshots are available.
const PLACEHOLDER_IMAGE = "/projects/placeholder-showcase-1.png";
const MICROSERVICE_MONOREPO_1 = "/projects/microservice-monorepo-1.png";
const MICROSERVICE_MONOREPO_2 = "/projects/microservice-monorepo-2.png";

export const projects: Project[] = [
  {
    slug: "microservice-monorepo",
    title: "Microservice Monorepo",
    description:
      "Short placeholder description of what this project does and the problem it solves.",
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
    slug: "placeholder-project-two",
    title: "Placeholder Project Two",
    description:
      "Short placeholder description of what this project does and the problem it solves.",
    images: [PLACEHOLDER_IMAGE, PLACEHOLDER_IMAGE],
    techStack: ["Node.js", "PostgreSQL", "AWS"],
    liveUrl: "#",
    sourceUrl: "#",
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
