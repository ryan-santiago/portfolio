import type { Metadata } from "next";
import { ViewTransition } from "react";
import { DotHeading } from "@/components/ui/DotHeading";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects | CodeRyan",
  description: "A selection of projects built by Ryan.",
};

export default function ProjectsPage() {
  return (
    <ViewTransition
      enter={{
        "nav-forward": "nav-forward",
        "nav-back": "nav-back",
        default: "none",
      }}
      exit={{
        "nav-forward": "nav-forward",
        "nav-back": "nav-back",
        default: "none",
      }}
      default="none"
    >
      <section className="mx-auto max-w-6xl px-6 py-20">
        <p className="text-xl font-semibold text-accent">
          A look at what I&apos;ve shipped 🚀
        </p>
        <DotHeading as="h1" className="mt-4 text-5xl md:text-6xl">
          Projects
        </DotHeading>

        <div className="mt-6 max-w-2xl rounded-2xl border border-dashed border-border bg-surface-alt p-6">
          <p className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-accent">
            <span aria-hidden="true">⚠️</span>
            Architectural disclaimer
          </p>
          <p className="mt-3 font-mono text-sm leading-relaxed text-charcoal-soft">
            A couple of legacy projects below no longer run. They rely on
            retired frameworks, dead cloud providers, or deprecated APIs.
            Consider them archaeological sites from my time living on the
            bleeding edge. I&apos;ve archived most, but saved a few iconic
            broken ones marked with ⛓️‍💥 — partly for nostalgia, partly as a
            monument to tech stack evolution.
          </p>
        </div>

        <div className="mt-12">
          <ProjectGrid projects={projects} />
        </div>
      </section>
    </ViewTransition>
  );
}
