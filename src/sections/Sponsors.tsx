import Image, { type StaticImageData } from "next/image";
import { Fragment } from "react";

import accenture from "~/assets/sponsors/accenture.png";
import backboard from "~/assets/sponsors/backboard.png";
import carDino from "~/assets/sponsors/car-dino.svg";
import genesys from "~/assets/sponsors/genesys.png";
import manulife from "~/assets/sponsors/manulife.svg";
import tinkered from "~/assets/sponsors/tinkered.png";
import windowBottom from "~/assets/sponsors/window-bottom.svg";
import windowTop from "~/assets/sponsors/window-top.svg";
import wsp from "~/assets/sponsors/wsp.png";
import gearDino from "~/assets/sponsors/yellow-gear-dino.svg";

const HEADING = "A thank you to our sponsors...";

/** One step per tier, Gold down to in-kind. */
type Size = "xlarge" | "large" | "medium" | "small";

/**
 * A logo container. `null` until Sponsorship confirms who fills it; a named
 * sponsor still waiting on its artwork or its link falls back to a wordmark
 * and to no link at all.
 */
type Slot = { name: string; href?: string; logo?: StaticImageData } | null;

/** A dino perched on the plank under a shelf; each one sits on it differently. */
type Mascot = { src: StaticImageData; className: string };

type Shelf = { size: Size; slots: Slot[]; mascot?: Mascot };

const empty = (count: number): Slot[] => Array<Slot>(count).fill(null);

// Each dino's own art decides how far it settles onto the plank below it.
const GEAR_DINO: Mascot = {
  src: gearDino,
  className: "mr-[10%] ml-auto w-[45%] translate-y-[1.2vw]",
};
const CAR_DINO: Mascot = {
  src: carDino,
  className: "mx-auto w-[95%] translate-y-[0.5vw]",
};

/** One tier each: a bigger logo on a higher shelf reads as a higher tier. */
const SILVER: Slot[] = [
  {
    name: "Manulife",
    href: "https://careers.manulife.com/global/en/students",
    logo: manulife,
  },
];

const BRONZE: Slot[] = [
  { name: "Accenture", href: "https://www.accenture.com/en", logo: accenture },
  { name: "Genesys", logo: genesys },
  { name: "WSP", logo: wsp },
];

const IN_KIND: Slot[] = [
  { name: "backboard.io", logo: backboard },
  { name: "Tinkered AI", href: "https://www.tinkered.ai", logo: tinkered },
];

/** Gold is unsold, so the tier is a shelf of placeholders for now. */
const GOLD: Slot[] = empty(1);

/** The two hanging columns, top shelf first. Empty slots are still for sale. */
const COLUMNS: Shelf[][] = [
  [
    { size: "large", slots: [...SILVER, ...empty(1)], mascot: GEAR_DINO },
    { size: "medium", slots: [...BRONZE, ...empty(2)] },
  ],
  [
    { size: "xlarge", slots: GOLD },
    { size: "small", slots: [...IN_KIND, ...empty(2)], mascot: CAR_DINO },
  ],
];

/** Mobile hangs one column, which gives each tier a shelf of its own. */
const MOBILE: Shelf[] = [
  { size: "xlarge", slots: GOLD },
  { size: "large", slots: [...SILVER, ...empty(1)] },
  { size: "medium", slots: [...BRONZE, ...empty(2)] },
  { size: "small", slots: [...IN_KIND, ...empty(2)] },
];

// Sized in vw: the design spans the full screen width, so it scales with it.
// One column carries the whole width on mobile, so the tiers grow to match --
// far enough that the top step is what the column can hold, not a free choice.
const SHELF_STACK: Record<Size, string> = {
  xlarge: "text-[min(24vw,6rem)] md:text-[max(1.375rem,6vw)]",
  large: "text-[min(19vw,4.75rem)] md:text-[max(1.25rem,5.4vw)]",
  medium: "text-[min(15vw,3.75rem)] md:text-[max(1.125rem,4.8vw)]",
  small: "text-[min(11vw,2.75rem)] md:text-[max(1rem,4.2vw)]",
};

/**
 * Windows hanging off the sides of the section, which clips them. The lower
 * pair is drawn on a lighter frame so it washes out into the bottom of the
 * gradient. Their drop is a share of the section rather than of the viewport,
 * which only tracks its width on desktop. Mobile drops them, and the dinos
 * with them, so the one narrow column reads as tiers and nothing else.
 */
const WINDOWS: { src: StaticImageData; className: string }[] = [
  { src: windowTop, className: "top-[15.4%] -left-[4vw]" },
  { src: windowTop, className: "top-[7.3%] -right-[3.5vw]" },
  { src: windowBottom, className: "top-[54.3%] -left-[2vw]" },
  { src: windowBottom, className: "top-[54.3%] -right-[3.3vw]" },
];

/**
 * Artwork is sized to cover a constant area rather than to fill a constant
 * box. The set runs from a 2:1 mark to an 8:1 wordmark, and one shared box
 * leaves the squat one towering over the long one; equal area reads as equal
 * weight instead. Next resolves the intrinsic size at build time, so each
 * logo's box falls out of its own proportions with nothing to hand-tune.
 */
const LOGO_AREA = 2.4;

function logoBox({ width, height }: StaticImageData) {
  const aspect = width / height;
  return {
    width: `${Math.sqrt(LOGO_AREA * aspect).toFixed(2)}em`,
    height: `${Math.sqrt(LOGO_AREA / aspect).toFixed(2)}em`,
  };
}

/** Stands in for a sponsor's artwork until the real logos land. */
function PlaceholderMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className="h-[0.9em] w-[0.9em]"
    >
      <path d="M10 3h11l-7 8.5H3z" />
      <path d="M10 12.5h11L14 21H3z" />
    </svg>
  );
}

function Logo({ slot }: { slot: Slot }) {
  const className = "flex items-center gap-[0.3em] font-bold italic";
  const content = slot?.logo ? (
    // The shelves hang against the dark half of the gradient, so the artwork is
    // washed to the same white as the placeholders rather than kept on-brand.
    <Image
      src={slot.logo}
      alt={slot.name}
      style={logoBox(slot.logo)}
      // The widest wordmark still outruns a single mobile column.
      className="max-w-full object-contain brightness-0 invert"
      sizes="25vw"
    />
  ) : slot ? (
    // A name runs longer than the "logo" placeholder, so it is set smaller to
    // keep the longest of them inside a single mobile column.
    <span className="text-[0.6em] whitespace-nowrap">{slot.name}</span>
  ) : (
    <>
      <PlaceholderMark />
      logo
    </>
  );

  return slot?.href ? (
    <a
      className={className}
      href={slot.href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {content}
    </a>
  ) : (
    <div className={className}>{content}</div>
  );
}

/** One hanging shelf: two ropes near its ends, and a plank under each tier. */
function Column({ shelves }: { shelves: Shelf[] }) {
  return (
    <div className="relative isolate flex flex-1 flex-col items-center text-white">
      {/* The ropes run past both edges of the section, which clips them. */}
      {["left-[5%]", "right-[5%]"].map((side) => (
        <span
          key={side}
          aria-hidden
          className={`absolute -inset-y-[100vw] -z-10 w-[max(2px,0.15vw)] bg-[repeating-linear-gradient(165deg,#2f2d2b_0_3px,#6b625a_3px_4px)] ${side}`}
        />
      ))}
      {shelves.map(({ size, slots, mascot }, shelfIndex) => (
        <Fragment key={shelfIndex}>
          <div
            className={`flex flex-col items-center gap-[0.75em] leading-none ${SHELF_STACK[size]}`}
          >
            {slots.map((slot, slotIndex) => (
              <Logo key={slotIndex} slot={slot} />
            ))}
          </div>
          {/* The mascot sits in flow above its plank, so it reserves the room
              it needs rather than reaching up into the shelf's logos. */}
          <div className="mt-[6vw] mb-[4.85vw] w-full">
            {mascot && (
              <Image
                src={mascot.src}
                alt=""
                aria-hidden
                className={`h-auto select-none ${mascot.className}`}
                sizes="25vw"
              />
            )}
            <div className="h-[3.6vw] w-full bg-[#3E332D] md:h-[2.1vw]" />
          </div>
        </Fragment>
      ))}
    </div>
  );
}

export default function Sponsors() {
  return (
    <section
      id="sponsors"
      aria-labelledby="sponsors-heading"
      className="relative w-full scroll-mt-20 overflow-hidden bg-[linear-gradient(180deg,#3C2520_0%,#7C5A4A_50%,#F3F2F1_100%)] px-[11vw] pt-[7vw] pb-[6vw] md:aspect-[1440/1684] md:pb-0"
    >
      <h2
        id="sponsors-heading"
        className="font-display relative z-30 text-center text-[max(1.0625rem,1.7vw)] text-white"
      >
        {HEADING}
      </h2>
      <div className="relative z-20 mt-[13.5vw] hidden items-start justify-center gap-[1.85vw] md:flex">
        {COLUMNS.map((shelves, columnIndex) => (
          <Column key={columnIndex} shelves={shelves} />
        ))}
      </div>
      <div className="relative z-20 mt-[13.5vw] flex md:hidden">
        <Column shelves={MOBILE} />
      </div>
      {WINDOWS.map(({ src, className }, index) => (
        <Image
          key={index}
          src={src}
          alt=""
          aria-hidden
          className={`absolute z-10 h-auto w-[19.5vw] max-md:hidden ${className}`}
          sizes="20vw"
        />
      ))}
    </section>
  );
}
