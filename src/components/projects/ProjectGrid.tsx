"use client";

import { useState } from "react";
import type { Project } from "@/types/project";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const openProject =
    projects.find((project) => project.slug === openSlug) ?? null;

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            onOpen={() => setOpenSlug(project.slug)}
          />
        ))}
      </div>

      {openProject && (
        <ProjectModal
          project={openProject}
          onClose={() => setOpenSlug(null)}
        />
      )}
    </>
  );
}
