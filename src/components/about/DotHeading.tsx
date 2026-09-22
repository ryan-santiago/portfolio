import type { ElementType, ReactNode } from "react";

export function DotHeading({
  as,
  className = "",
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  const Tag = as ?? "h2";

  return (
    <Tag className={`font-extrabold text-charcoal ${className}`}>
      {children}
      <span className="text-accent">.</span>
    </Tag>
  );
}
