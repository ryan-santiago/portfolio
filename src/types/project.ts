export interface Project {
  slug: string;
  title: string;
  description: string;
  /** First entry is used as the card thumbnail; all entries appear in the modal carousel. */
  images: string[];
  techStack: string[];
  /** Omit or set to null when there is no live site — the "Live site" link is hidden. */
  liveUrl?: string | null;
  sourceUrl?: string;
  /** Marks a retired project that no longer runs — shown with a ⛓️‍💥 badge. */
  legacy?: boolean;
}
