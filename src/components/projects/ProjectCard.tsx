import Image from "next/image";
import type { Project } from "@/types/project";
import { TechBadge } from "./TechBadge";

export function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen();
        }
      }}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-border bg-surface-alt text-left transition-shadow hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-surface">
        <Image
          src={project.images[0]}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-bold text-charcoal">{project.title}</h3>
        <p className="mt-2 flex-1 text-sm text-charcoal-soft">
          {project.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <TechBadge key={tech} name={tech} />
          ))}
        </div>
        {(project.liveUrl || project.sourceUrl) && (
          <div className="mt-4 flex gap-4 text-sm font-semibold">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                onClick={(event) => event.stopPropagation()}
                className="text-accent hover:text-accent-dark"
              >
                Live site
              </a>
            )}
            {project.sourceUrl && (
              <a
                href={project.sourceUrl}
                onClick={(event) => event.stopPropagation()}
                className="text-accent hover:text-accent-dark"
              >
                Source
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
