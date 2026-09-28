import type { IconType } from "react-icons";
import { FaAws } from "react-icons/fa";
import {
  SiDocker,
  SiExpress,
  SiGraphql,
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiShadcnui,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiPrisma,
  SiNestjs,
  SiMysql,
  SiTraefikproxy,
  SiJsonwebtokens,
} from "react-icons/si";

// Lookup by the exact name used in a project's `techStack` array. Names
// without a match here render as a plain text badge (see TechBadge.tsx).
export const TECH_ICONS: Record<string, IconType> = {
  "Next.js": SiNextdotjs,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  "Tailwind CSS": SiTailwindcss,
  ShadCN: SiShadcnui,
  React: SiReact,
  "Node.js": SiNodedotjs,
  "Express.js": SiExpress,
  PostgreSQL: SiPostgresql,
  MongoDB: SiMongodb,
  GraphQL: SiGraphql,
  Docker: SiDocker,
  Vercel: SiVercel,
  AWS: FaAws,
  Prisma: SiPrisma,
  NestJS: SiNestjs,
  MySQL: SiMysql,
  Traefik: SiTraefikproxy,
  "JWT (RS256)": SiJsonwebtokens,
};
