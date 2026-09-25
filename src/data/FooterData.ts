export const TEAM_PHOTO_SLOT_COUNT = 12;

/** Figma's placeholder grey, used until real team photos land. */
export const TEAM_PHOTO_PLACEHOLDER_FILL = "#D9D9D9";

export type TeamPhoto = {
  name: string;
  /** Imported asset `src`. Null until photography is delivered. */
  src: string | null;
};

// TODO: replace with the real roster once team photos are delivered.
export const teamPhotos: TeamPhoto[] = Array.from(
  { length: TEAM_PHOTO_SLOT_COUNT },
  () => ({ name: "", src: null }),
);

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
