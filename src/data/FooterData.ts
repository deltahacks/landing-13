export type FooterLink = {
  label: string;
  href: string;
};

export const footerLinks: FooterLink[] = [
  {
    label: "Code of Conduct",
    href: "https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md",
  },
  { label: "Privacy Policy", href: "https://mlh.io/privacy" },
];

export const CONTACT_EMAIL = "hello@deltahacks.com";

/** Verbatim from the design, including the leading "@". */
export const COPYRIGHT_TEXT = "@ Copyright 2026 DeltaHacks";
