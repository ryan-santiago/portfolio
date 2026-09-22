import type { Metadata } from "next";
import { ViewTransition } from "react";
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
        <h1 className="text-4xl font-extrabold text-charcoal">Projects</h1>
        <p className="mt-4 max-w-2xl text-lg text-charcoal-soft">
          A selection of things I&apos;ve built. (Placeholder entries for now
          — real projects coming soon.)
        </p>
        <div className="mt-12">
          <ProjectGrid projects={projects} />
        </div>
      </section>
    </ViewTransition>
  );
}
