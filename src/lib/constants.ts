export const SITE_NAME_PRIMARY = "Code";
export const SITE_NAME_SECONDARY = "Ryan";
export const SITE_NAME = `${SITE_NAME_PRIMARY}${SITE_NAME_SECONDARY}`;

export const CONTACT_EMAIL = "ryan.santiago.ict@gmail.com";
export const MAILTO_HREF = `mailto:${CONTACT_EMAIL}`;

export type NavItem = {
  label: string;
  href: string;
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
];
