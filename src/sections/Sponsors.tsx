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

type Size = "xlarge" | "large" | "medium" | "small";

/** `null` is an unsold slot. */
type Slot = { name: string; href?: string; logo?: StaticImageData } | null;

type Mascot = { src: StaticImageData; className: string };

type Shelf = { size: Size; slots: Slot[]; mascot?: Mascot };

const empty = (count: number): Slot[] => Array<Slot>(count).fill(null);

const GEAR_DINO: Mascot = {
  src: gearDino,
  className: "mr-[10%] ml-auto w-[45%] translate-y-[1.2vw]",
};
const CAR_DINO: Mascot = {
  src: carDino,
  className: "mx-auto w-[95%] translate-y-[0.5vw]",
};

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

const GOLD: Slot[] = empty(1);

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

const MOBILE: Shelf[] = [
  { size: "xlarge", slots: GOLD },
  { size: "large", slots: [...SILVER, ...empty(1)] },
  { size: "medium", slots: [...BRONZE, ...empty(2)] },
  { size: "small", slots: [...IN_KIND, ...empty(2)] },
];

const SHELF_STACK: Record<Size, string> = {
  xlarge: "text-[min(24vw,6rem)] md:text-[max(1.375rem,6vw)]",
  large: "text-[min(19vw,4.75rem)] md:text-[max(1.25rem,5.4vw)]",
  medium: "text-[min(15vw,3.75rem)] md:text-[max(1.125rem,4.8vw)]",
  small: "text-[min(11vw,2.75rem)] md:text-[max(1rem,4.2vw)]",
};

const WINDOWS: { src: StaticImageData; className: string }[] = [
  { src: windowTop, className: "top-[15.4%] -left-[4vw]" },
  { src: windowTop, className: "top-[7.3%] -right-[3.5vw]" },
  { src: windowBottom, className: "top-[54.3%] -left-[2vw]" },
  { src: windowBottom, className: "top-[54.3%] -right-[3.3vw]" },
];

// Constant area per logo so wide and squat marks carry equal weight.
const LOGO_AREA = 2.4;

function logoBox({ width, height }: StaticImageData) {
  const aspect = width / height;
  return {
    width: `${Math.sqrt(LOGO_AREA * aspect).toFixed(2)}em`,
    height: `${Math.sqrt(LOGO_AREA / aspect).toFixed(2)}em`,
  };
}

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
    <Image
      src={slot.logo}
      alt={slot.name}
      style={logoBox(slot.logo)}
      className="max-w-full object-contain brightness-0 invert"
      sizes="25vw"
    />
  ) : slot ? (
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

function Column({ shelves }: { shelves: Shelf[] }) {
  return (
    <div className="relative isolate flex flex-1 flex-col items-center text-white">
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
          <div className="mt-[6vw] mb-[4.85vw] w-full">
            {mascot && (
              <Image
                src={mascot.src}
                alt=""
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
        A thank you to our sponsors...
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
          className={`absolute z-10 h-auto w-[19.5vw] max-md:hidden ${className}`}
          sizes="20vw"
        />
      ))}
    </section>
  );
}
