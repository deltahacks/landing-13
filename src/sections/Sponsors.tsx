import Image from "next/image";
import { Fragment } from "react";

import dino from "~/assets/sponsors/dino.webp";

const HEADING = "A thank you to our sponsors...";

type Size = "large" | "small";

/** A logo container. Empty until Sponsorship confirms who fills it. */
type Slot = { name: string; href: string } | null;

/** `mascot` perches the dino on the plank under this shelf. */
type Shelf = { size: Size; slots: Slot[]; mascot?: boolean };

const empty = (count: number): Slot[] => Array<Slot>(count).fill(null);

/**
 * The two hanging columns, top shelf first. A bigger logo on a higher shelf
 * reads as a higher tier, so the counts below stand in for the layout only:
 * the finalized list, its links, and its artwork arrive in September.
 */
const COLUMNS: Shelf[][] = [
  [
    { size: "large", slots: empty(2) },
    { size: "small", slots: empty(6) },
  ],
  [
    { size: "large", slots: empty(1) },
    { size: "small", slots: empty(6), mascot: true },
  ],
];

// Sized in vw: the design spans the full screen width, so it scales with it.
const SHELF_STACK: Record<Size, string> = {
  large: "text-[max(1.25rem,5.5vw)]",
  small: "text-[max(0.875rem,4vw)]",
};

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

const PANES = Array.from({ length: 35 });

/**
 * A window hanging off the side of the section, which clips it. The frame is
 * the grid's own background showing through the gaps, so every mullion is the
 * same width; `fade` washes the glass and the frame out toward the bottom.
 */
function Window({ className, fade }: { className: string; fade?: boolean }) {
  return (
    <div
      aria-hidden
      className={`absolute z-10 grid h-[27.3vw] w-[19.5vw] grid-cols-5 grid-rows-7 gap-[4px] bg-[#4A3A32] p-[4px] ${className}`}
    >
      {PANES.map((_, index) => (
        <span key={index} className="bg-[#D5EDE7]" />
      ))}
      {fade && (
        <span className="absolute inset-0 bg-[linear-gradient(#fff0_35%,#fffc)]" />
      )}
    </div>
  );
}

function Logo({ slot }: { slot: Slot }) {
  const className = "flex items-center gap-[0.3em] font-bold italic";
  const content = (
    <>
      <PlaceholderMark />
      {slot?.name ?? "logo"}
    </>
  );

  return slot ? (
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
            className={`flex flex-col items-center gap-[0.7em] leading-none ${SHELF_STACK[size]}`}
          >
            {slots.map((slot, slotIndex) => (
              <Logo key={slotIndex} slot={slot} />
            ))}
          </div>
          <div className="relative mt-[10vw] mb-[4.85vw] h-[1.6vw] w-full bg-[#3E332D]">
            {mascot && (
              <Image
                src={dino}
                alt=""
                aria-hidden="true"
                className="absolute right-[10%] bottom-full h-auto w-[45%] translate-y-[1.2vw] select-none"
                sizes="20vw"
              />
            )}
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
      className="relative aspect-[1440/1684] w-full scroll-mt-20 overflow-hidden bg-[linear-gradient(180deg,#3C2520_0%,#7C5A4A_50%,#F3F2F1_100%)] px-[11vw] pt-[7vw]"
    >
      <h2
        id="sponsors-heading"
        className="font-display relative z-30 text-center text-[max(0.875rem,1.7vw)] text-white"
      >
        {HEADING}
      </h2>
      <div className="relative z-20 mt-[13.5vw] flex items-start justify-center gap-[1.85vw]">
        {COLUMNS.map((shelves, columnIndex) => (
          <Column key={columnIndex} shelves={shelves} />
        ))}
      </div>
      <Window className="top-[19.3vw] -left-[1.5vw]" fade />
      <Window className="top-[14vw] -right-[1vw]" />
      <Window className="top-[84vw] left-[3.9vw]" />
      <Window className="top-[75.3vw] -right-[1vw]" />
    </section>
  );
}
