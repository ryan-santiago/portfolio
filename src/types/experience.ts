export interface RoleEntry {
  title: string;
  period: string;
  highlights: string[];
}

export interface ExperienceEntry {
  id: string;
  company: string;
  /** Ordered most-recent-first. A promotion history at one company is
   * multiple entries here rather than multiple ExperienceEntry rows. */
  roles: RoleEntry[];
}
