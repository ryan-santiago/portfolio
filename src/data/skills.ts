import type { SkillCategory } from "@/types/skill";

// PLACEHOLDER DATA — derived from the stack tags used in src/data/projects.ts.
// Adjust to Ryan's real skillset before launch. See docs/content.md.
export const stackHighlights: string[] = [
  "Tech Leadership",
  "System Architecture",
  "Fullstack Development",
  "Team Mentorship",
  "Clean Code Advocate",
  "Problem Solving",
];

export const skillCategories: SkillCategory[] = [
  {
    category: "Web Design",
    items: ["UI/UX Design", "Responsive Design", "Wireframing", "User Research"],
  },
  {
    category: "Frontend",
    items: ["JavaScript", "React", "Next.js", "Tailwind CSS"],
  },
  {
    category: "Backend",
    items: ["Node.js", "PostgreSQL", "Express.js", "AWS"],
  },
  {
    category: "Soft Skills",
    items: ["Effective Communication", "Team Leadership", "Mentorship", "Ownership"],
  },
];
