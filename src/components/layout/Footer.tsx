import { CONTACT_EMAIL, MAILTO_HREF, SITE_NAME } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-6 py-8 text-sm text-charcoal-soft md:flex-row md:justify-between">
        <p>
          &copy; {year} {SITE_NAME}. All rights reserved.
        </p>
        <a href={MAILTO_HREF} className="transition-colors hover:text-accent">
          {CONTACT_EMAIL}
        </a>
      </div>
    </footer>
  );
}
