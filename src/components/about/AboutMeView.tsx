import { stackHighlights } from "@/data/skills";
import { SOCIAL_LINKS } from "@/lib/socials";
import { DotHeading } from "@/components/ui/DotHeading";

export function AboutMeView() {
  return (
    <div className="relative flex min-h-[calc(100vh-4.5rem)] flex-col justify-center gap-12 py-20">
      <div>
        <p className="text-xl font-semibold text-accent">
          A little more about me 👋
        </p>
        <DotHeading as="h1" className="mt-4 text-5xl md:text-6xl">
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
          <h3 className="text-lg font-bold text-charcoal">Socials.</h3>
          <div className="mt-4 grid grid-cols-2 gap-x-10 gap-y-6 sm:gap-x-14">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.name}
                style={{ "--brand": social.color } as React.CSSProperties}
                className="group flex items-center gap-3"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--brand)]/20 bg-[var(--brand)]/5 text-[var(--brand)]/70 shadow-sm transition-all duration-200 group-hover:scale-110 group-hover:border-[var(--brand)]/40 group-hover:bg-[var(--brand)]/10 group-hover:text-[var(--brand)] group-hover:shadow-md sm:h-12 sm:w-12">
                  <social.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="text-sm font-medium text-charcoal-soft transition-colors group-hover:text-charcoal">
                  {social.name}
                </span>
              </a>
            ))}
          </div>

          <div className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-alt px-4 py-2 text-sm font-medium text-charcoal-soft">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3.5 w-3.5 text-accent"
              aria-hidden="true"
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Based in the Philippines
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 sm:bottom-10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5 animate-bounce text-accent"
        >
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
        <span className="text-xs font-semibold tracking-widest text-charcoal-soft/70">
          SCROLL DOWN
        </span>
      </div>
    </div>
  );
}
