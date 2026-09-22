"use client";

import { stackHighlights } from "@/data/skills";
import { DotHeading } from "./DotHeading";

function scrollToExperience() {
  document
    .getElementById("experience")
    ?.scrollIntoView({ behavior: "smooth" });
}

export function AboutMeView() {
  return (
    <div className="flex min-h-screen flex-col justify-center gap-12 py-20">
      <div>
        <DotHeading as="h1" className="text-5xl md:text-6xl">
          About me
        </DotHeading>
        <p className="mt-6 max-w-xl border-l-4 border-accent pl-4 text-lg text-charcoal-soft">
          Leading teams and building fullstack products is what I love
          doing — and that&apos;s why I bring the same care to every
          project, from system architecture down to the last line of code.
        </p>
      </div>

      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <h3 className="text-lg font-bold text-charcoal">My Stack.</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {stackHighlights.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-alt px-4 py-2 text-sm font-medium text-charcoal-soft"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-3.5 w-3.5 text-accent"
                  aria-hidden="true"
                >
                  <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.86L12 17.77l-6.18 3.23L7 14.14 2 9.27l7.1-1.01L12 2z" />
                </svg>
                {item}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-charcoal">Keep Scrolling.</h3>
          <button
            type="button"
            onClick={scrollToExperience}
            className="group mt-4 flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-surface-alt transition-colors hover:bg-surface"
          >
            <span className="flex h-10 w-10 animate-bounce items-center justify-center rounded-full bg-accent/10 text-accent transition-colors group-hover:bg-accent/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </span>
            <span className="text-center">
              <span className="block font-semibold text-charcoal-soft">
                There&apos;s more below
              </span>
              <span className="mt-1 block text-sm text-charcoal-soft/70">
                My Experience and Skills, just a scroll away
              </span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
