export interface Project {
  slug: string;
  title: string;
  description: string;
  /** First entry is used as the card thumbnail; all entries appear in the modal carousel. */
  images: string[];
  techStack: string[];
  liveUrl?: string;
  sourceUrl?: string;
  /** Marks a retired project that no longer runs — shown with a ⛓️‍💥 badge. */
  legacy?: boolean;
}
