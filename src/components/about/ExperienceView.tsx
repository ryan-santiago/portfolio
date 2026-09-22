"use client";

import { useState } from "react";
import { experience } from "@/data/experience";
import { DotHeading } from "@/components/ui/DotHeading";

export function ExperienceView() {
  const [activeId, setActiveId] = useState(experience[0].id);
  const active =
    experience.find((entry) => entry.id === activeId) ?? experience[0];

  return (
    <div className="flex min-h-screen flex-col justify-center gap-10 py-20">
      <DotHeading className="text-4xl md:text-5xl">Experience</DotHeading>

      <div className="grid gap-8 md:grid-cols-[220px_1fr] md:gap-16">
        <div className="flex gap-2 overflow-x-auto md:flex-col md:gap-1 md:overflow-visible">
          {experience.map((entry) => {
            const isActive = entry.id === active.id;
            return (
              <button
                key={entry.id}
                type="button"
                onClick={() => setActiveId(entry.id)}
                className={`shrink-0 whitespace-nowrap border-l-2 px-4 py-2 text-left text-sm transition-colors md:text-base ${
                  isActive
                    ? "border-accent font-semibold text-accent"
                    : "border-transparent font-medium text-charcoal-soft hover:text-charcoal"
                }`}
              >
                {entry.company}
              </button>
            );
          })}
        </div>

        <div key={active.id} className="fade-in-up">
          <p className="text-sm font-semibold uppercase tracking-widest text-charcoal-soft/70">
            {active.company}
          </p>

          <div className="mt-6 space-y-10 border-l-2 border-border pl-6">
            {active.roles.map((role) => (
              <div key={role.title} className="relative">
                <span className="absolute top-1.5 -left-6.75 h-3 w-3 rounded-full border-2 border-surface bg-accent" />
                <h3 className="text-xl font-bold text-charcoal md:text-2xl">
                  {role.title}
                </h3>
                <p className="mt-1 text-sm text-charcoal-soft">
                  {role.period}
                </p>
                <ul className="mt-4 space-y-3">
                  {role.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-3 text-charcoal-soft"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mt-1 h-4 w-4 shrink-0 text-accent"
                        aria-hidden="true"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
