import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  variant: "primary" | "secondary";
  children: ReactNode;
};

const VARIANT_CLASSES: Record<ButtonProps["variant"], string> = {
  primary: "bg-charcoal text-white hover:bg-charcoal-soft",
  secondary:
    "bg-transparent border border-charcoal text-charcoal hover:bg-surface-alt",
};

export function Button({ href, variant, children }: ButtonProps) {
  const isExternal = href.startsWith("mailto:") || href.startsWith("http");
  const baseClasses =
    "inline-block rounded-full px-6 py-3 text-center font-semibold transition-colors";
  const className = `${baseClasses} ${VARIANT_CLASSES[variant]}`;

  if (isExternal) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
