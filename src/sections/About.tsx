import Image, { type StaticImageData } from "next/image";
import { type CSSProperties, type ReactNode } from "react";

import canopyImg from "~/assets/about/canopy.svg";
import dinoBlueImg from "~/assets/about/dino-blue.svg";
import dinoRedImg from "~/assets/about/dino-red.svg";
import dinoYellowImg from "~/assets/about/dino-yellow.svg";
import pteroBodyImg from "~/assets/about/ptero-body.svg";
import pteroWingBackImg from "~/assets/about/ptero-wing-back.svg";
import pteroWingFrontImg from "~/assets/about/ptero-wing-front.svg";
import sceneImg from "~/assets/about/scene.webp";

const HEADING = "Spend an unforgettable weekend...";

// The mock specifies different supporting copy per breakpoint.
const BODY_MOBILE =
  "DeltaHacks brings over 600 students from across North America to bring their ideas to life over 24 hours. Connect with like-minded hackers, attend workshops, and learn from mentors to make the most out of your 24 hours of building!";

const BODY_DESKTOP =
  "DeltaHacks brings over 600 students from across North America to bring their ideas to life over 24 hours. We supply the food, venue, workshops, and mentors, allowing you to make the most out of your 24 hours of building.";

/**
 * A layer's box, in percent of the frame around it.
 *
 * The dinosaurs stand on a log painted into the scene, so the characters and
 * the artwork have to scale in lockstep. The section is therefore locked to the
 * artboard's aspect ratio — 402x450 below `md`, 1440x942 above — and every
 * layer is measured against that box rather than against the viewport, which
 * holds the composition exact at any width.
 */
type Box = { x: number; y: number; w: number; h: number };

/** A box per breakpoint. `md` falls back to `base` where the mock reuses it. */
type Placement = { base: Box; md?: Box };

/** Custom properties, which `CSSProperties` alone will not carry. */
type Vars = CSSProperties & Record<`--${string}`, string>;

const SCENE: Placement = {
  base: { x: -63.421, y: -0.318, w: 171.119, h: 127.378 },
  md: { x: -0.069, y: -0.318, w: 100, h: 127.389 },
};

/** Overhangs the top edge. Off the artboard on mobile, so it is desktop-only. */
const CANOPY: Placement = { base: { x: 0, y: 0, w: 37.639, h: 4.034 } };

/** Back to front, so later entries paint over earlier ones. */
const DINOS: { colour: string; src: StaticImageData; at: Placement }[] = [
  {
    colour: "red",
    src: dinoRedImg,
    at: {
      base: { x: 58.525, y: 37.26, w: 26.532, h: 21.64 },
      md: { x: 71.136, y: 37.261, w: 15.417, h: 21.019 },
    },
  },
  {
    colour: "blue",
    src: dinoBlueImg,
    at: {
      base: { x: 33.674, y: 41.72, w: 26.209, h: 20.711 },
      md: { x: 56.631, y: 41.72, w: 15.139, h: 19.958 },
    },
  },
  {
    colour: "yellow",
    src: dinoYellowImg,
    at: {
      base: { x: 6.492, y: 40.02, w: 29.821, h: 23.671 },
      md: { x: 40.751, y: 40.023, w: 17.361, h: 23.248 },
    },
  },
];

const PTERO: Placement = {
  base: { x: 37.518, y: -10.971, w: 101.972, h: 74.029 },
  md: { x: 53.472, y: -17.622, w: 70.256, h: 87.277 },
};

// The wing and body boxes are measured against the pterodactyl's own box, so
// they only move when it does. The mobile mock draws the wings at a slightly
// different angle; since they are animated either way, one set of artwork
// serves both breakpoints.
const PTERO_WING_BACK: Placement = {
  base: { x: 5.032, y: 26.913, w: 46.951, h: 58.019 },
};
const PTERO_BODY: Placement = {
  base: { x: 23.462, y: 32.531, w: 38.055, h: 37.706 },
};
const PTERO_WING_FRONT: Placement = {
  base: { x: 41.786, y: 14.214, w: 47.545, h: 56.072 },
};

/**
 * The copy column. Its corner is placed like the art, but its width is a
 * measure rather than a fraction of the frame: type cannot scale all the way
 * down with the composition — at 768px a proportional body would be under 10px
 * — so it bottoms out at a readable size and the paragraph runs more lines than
 * the mock. Holding the mock's measure instead (35.379em, the width of its
 * column in its own body type) spends the empty sky on the column's right
 * rather than running the paragraph into the dinosaurs, and gives the mock's
 * 44.224% back at the widths where the type fits it. Below the mock's own 402px
 * the frame is narrower than the artboard, so the column takes more of it for
 * the same reason.
 */
const COPY: Vars = {
  "--copy-x": "7.214%",
  "--copy-y": "9%",
  "--copy-w": "72%",
  "--copy-sm-y": "11.33%",
  "--copy-sm-w": "58.955%",
  "--copy-md-x": "5%",
  "--copy-md-y": "17.41%",
  "--copy-md-w": "max(35.379em, 44.224%)",
};

const COPY_LAYER = [
  "absolute z-10 font-sans text-white",
  "top-(--copy-y) left-(--copy-x) w-(--copy-w)",
  "min-[402px]:top-(--copy-sm-y) min-[402px]:w-(--copy-sm-w)",
  "md:top-(--copy-md-y) md:left-(--copy-md-x) md:w-(--copy-md-w)",
  // Body size lives here rather than on the paragraph so that the column's
  // `em` measure resolves against it.
  "text-[clamp(0.625rem,2.9851vw,1rem)] md:text-[clamp(0.9375rem,1.25vw,1.5rem)]",
].join(" ");

const ART_LAYER = [
  "pointer-events-none absolute select-none",
  "top-(--y) left-(--x) h-(--h) w-(--w)",
  "md:top-(--md-y) md:left-(--md-x) md:h-(--md-h) md:w-(--md-w)",
].join(" ");

function place({ base, md = base }: Placement): Vars {
  return {
    "--x": `${base.x}%`,
    "--y": `${base.y}%`,
    "--w": `${base.w}%`,
    "--h": `${base.h}%`,
    "--md-x": `${md.x}%`,
    "--md-y": `${md.y}%`,
    "--md-w": `${md.w}%`,
    "--md-h": `${md.h}%`,
  };
}

/** A piece of the artwork: never announced, never interactive. */
function Art({
  src,
  at,
  className = "",
}: {
  src: StaticImageData;
  at: Placement;
  className?: string;
}) {
  return (
    <Image
      src={src}
      alt=""
      aria-hidden
      unoptimized
      style={place(at)}
      className={`${ART_LAYER} ${className}`}
    />
  );
}

/** A box that its children are in turn placed against. */
function Group({
  at,
  className = "",
  children,
}: {
  at: Placement;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div style={place(at)} className={`${ART_LAYER} ${className}`}>
      {children}
    </div>
  );
}

function Copy() {
  return (
    <div style={COPY} className={COPY_LAYER}>
      <h2
        id="about-heading"
        className="font-display mb-[0.25em] text-[clamp(1rem,4.9751vw,1.5rem)] leading-none md:mb-[0.36em] md:text-[clamp(1.375rem,2.2222vw,2.75rem)] md:leading-normal"
      >
        {HEADING}
      </h2>
      <p className="font-medium">
        <span className="md:hidden">{BODY_MOBILE}</span>
        <span className="hidden md:inline">{BODY_DESKTOP}</span>
      </p>
    </div>
  );
}

/** The painted forest. Overflows the frame at the bottom by design. */
function Scene() {
  return (
    <Group at={SCENE}>
      <Image
        src={sceneImg}
        alt=""
        aria-hidden
        fill
        placeholder="blur"
        sizes="(max-width: 767px) 172vw, 100vw"
        className="object-cover"
      />
    </Group>
  );
}

/** The wings are separate layers so they can beat, as the design file asks. */
function Pterodactyl() {
  return (
    <Group at={PTERO}>
      <Art
        src={pteroWingBackImg}
        at={PTERO_WING_BACK}
        className="animate-ptero-flap-back origin-[80%_30%] motion-reduce:animate-none"
      />
      <Art src={pteroBodyImg} at={PTERO_BODY} />
      <Art
        src={pteroWingFrontImg}
        at={PTERO_WING_FRONT}
        className="animate-ptero-flap-front origin-[10%_60%] motion-reduce:animate-none"
      />
    </Group>
  );
}

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative aspect-[402/450] w-full scroll-mt-20 overflow-hidden bg-[linear-gradient(180deg,#1a2e26_0%,#ced4da_87.22%)] md:aspect-[1440/942]"
    >
      {/* First in the DOM so the copy leads the reading order. */}
      <Copy />
      <Scene />
      <Art src={canopyImg} at={CANOPY} className="hidden md:block" />
      {DINOS.map(({ colour, src, at }) => (
        <Art key={colour} src={src} at={at} />
      ))}
      <Pterodactyl />
    </section>
  );
}
