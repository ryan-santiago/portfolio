import type { Metadata } from "next";
import { ViewTransition } from "react";
import { AboutMeView } from "@/components/about/AboutMeView";
import { ExperienceView } from "@/components/about/ExperienceView";
import { SkillsView } from "@/components/about/SkillsView";

export const metadata: Metadata = {
  title: "About | CodeRyan",
  description: "About Ryan — Tech Lead, Architect, and Fullstack Developer.",
};

export default function AboutPage() {
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
      <div className="mx-auto max-w-6xl px-6">
        <AboutMeView />
        <div id="experience" className="border-t border-border">
          <ExperienceView />
        </div>
        <div className="border-t border-border">
          <SkillsView />
        </div>
      </div>
    </ViewTransition>
  );
}
