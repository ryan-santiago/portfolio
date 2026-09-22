import { TECH_ICONS } from "@/lib/tech-icons";

export function TechBadge({ name }: { name: string }) {
  const Icon = TECH_ICONS[name];

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-charcoal-soft">
      {Icon && <Icon className="h-3.5 w-3.5" aria-hidden="true" />}
      {name}
    </span>
  );
}
