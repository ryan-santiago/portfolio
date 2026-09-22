"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Project } from "@/types/project";
import { TechBadge } from "./TechBadge";

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(0);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const imageCount = project.images.length;
  const hasMultipleImages = imageCount > 1;

  useEffect(() => {
    closeButtonRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.dataset.modalOpen = "true";

    return () => {
      document.body.style.overflow = previousOverflow;
      delete document.body.dataset.modalOpen;
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") setIndex((i) => (i + 1) % imageCount);
      if (event.key === "ArrowLeft") {
        setIndex((i) => (i - 1 + imageCount) % imageCount);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, imageCount]);

  const goTo = (nextIndex: number) => {
    setIndex((nextIndex + imageCount) % imageCount);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      className="fixed inset-0 z-100 flex items-center justify-center bg-charcoal/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-y-auto rounded-2xl bg-surface shadow-xl"
      >
        <div className="relative aspect-video w-full shrink-0 overflow-hidden bg-charcoal">
          <div
            className="flex h-full transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {project.images.map((src, i) => (
              <div key={src + i} className="relative h-full w-full shrink-0">
                <Image
                  src={src}
                  alt={`${project.title} screenshot ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 768px, 100vw"
                />
              </div>
            ))}
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-charcoal/60 text-white transition-colors hover:bg-charcoal/80"
          >
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
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>

          {hasMultipleImages && (
            <>
              <button
                type="button"
                onClick={() => goTo(index - 1)}
                aria-label="Previous image"
                className="absolute left-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-charcoal/60 text-white transition-colors hover:bg-charcoal/80"
              >
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
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => goTo(index + 1)}
                aria-label="Next image"
                className="absolute right-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-charcoal/60 text-white transition-colors hover:bg-charcoal/80"
              >
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
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>

              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                {project.images.map((src, i) => (
                  <button
                    key={src + i}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Go to image ${i + 1}`}
                    className={`h-2 w-2 rounded-full transition-colors ${
                      i === index ? "bg-white" : "bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="p-6 sm:p-8">
          <h3 className="text-2xl font-bold text-charcoal">
            {project.title}
          </h3>
          <p className="mt-3 text-charcoal-soft">{project.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <TechBadge key={tech} name={tech} />
            ))}
          </div>
          {(project.liveUrl || project.sourceUrl) && (
            <div className="mt-6 flex gap-4 text-sm font-semibold">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  className="text-accent hover:text-accent-dark"
                >
                  Live site
                </a>
              )}
              {project.sourceUrl && (
                <a
                  href={project.sourceUrl}
                  className="text-accent hover:text-accent-dark"
                >
                  Source
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
