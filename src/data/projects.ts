import type { Project } from "@/types/project";

// PLACEHOLDER DATA — replace these entries with real projects before launch.
// See docs/content.md for notes on what to fill in here. All three reuse the
// same placeholder screenshot until real project screenshots are available.
const PLACEHOLDER_IMAGE = "/projects/placeholder-showcase-1.png";

export const projects: Project[] = [
  {
    slug: "placeholder-project-one",
    title: "Placeholder Project One",
    description:
      "Short placeholder description of what this project does and the problem it solves.",
    images: [PLACEHOLDER_IMAGE, PLACEHOLDER_IMAGE, PLACEHOLDER_IMAGE],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    liveUrl: "#",
    sourceUrl: "#",
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
];
