"use client";

import Image, { type StaticImageData } from "next/image";
import { type CSSProperties, useEffect, useRef, useState } from "react";

import wallpaper from "~/assets/speakers/background.webp";
import leftFrame from "~/assets/speakers/left-frame.webp";
import leftSpeaker from "~/assets/speakers/left-speaker.webp";
import middleFrame from "~/assets/speakers/middle-frame.webp";
import middleSpeaker from "~/assets/speakers/middle-speaker.webp";
import rightFrame from "~/assets/speakers/right-frame.webp";
import rightSpeaker from "~/assets/speakers/right-speaker.webp";

const FRAME_WIDTH = 1434;
const FRAME_HEIGHT = 1157;

type ArtworkBox = {
  x: number;
  y: number;
  width: number;
  height?: number;
  rotation?: number;
  borderRadius?: string;
};

type Crop = {
  left: number;
  top: number;
  width: number;
  height: number;
};

type Speaker = {
  name: string;
  title: string;
  portrait: StaticImageData;
  frame: StaticImageData;
  portraitBox: ArtworkBox;
  portraitCrop: Crop;
  frameBox: ArtworkBox;
  captionX: number;
};

const speakers: Speaker[] = [
  {
    name: "Ivan Zhang",
    title: "Co-founder of Cohere",
    portrait: leftSpeaker,
    frame: leftFrame,
    portraitBox: {
      x: 124.386,
      y: 499.469,
      width: 310.964,
      height: 208.78,
      rotation: 5.61,
    },
    portraitCrop: { left: -22.18, top: 0, width: 144.36, height: 120.95 },
    frameBox: { x: 66.952, y: 419.467, width: 441.408, rotation: 4.69 },
    captionX: 107,
  },
  {
    name: "Vivek Alamuri",
    title: "ML Engineer @ Snowflake",
    portrait: middleSpeaker,
    frame: middleFrame,
    portraitBox: {
      x: 631.06,
      y: 462.121,
      width: 207.881,
      height: 253.838,
      rotation: -5.68,
    },
    portraitCrop: {
      left: -34.18,
      top: -9.27,
      width: 144.08,
      height: 118,
    },
    frameBox: { x: 560.319, y: 371.354, width: 345.6, rotation: -5.04 },
    captionX: 608,
  },
  {
    name: "Chris Bautista",
    title: "Senior Software Engineer @ Netflix",
    portrait: rightSpeaker,
    frame: rightFrame,
    portraitBox: {
      x: 1024.338,
      y: 423.159,
      width: 249.089,
      height: 314.085,
      rotation: 6.63,
      borderRadius: "50%",
    },
    portraitCrop: {
      left: -17.99,
      top: 2.03,
      width: 132.3,
      height: 104.92,
    },
    frameBox: { x: 968.212, y: 392.212, width: 373.248, rotation: 7.66 },
    captionX: 1016,
  },
];

// Keep the exported artwork and live text aligned to the Figma artboard.
function placement(x: number, y: number, width: number): CSSProperties {
  return {
    left: `${(x / FRAME_WIDTH) * 100}%`,
    top: `${(y / FRAME_HEIGHT) * 100}%`,
    width: `${(width / FRAME_WIDTH) * 100}%`,
  };
}

function artworkPlacement({
  x,
  y,
  width,
  height,
  rotation = 0,
  borderRadius,
}: ArtworkBox): CSSProperties {
  return {
    ...placement(x, y, width),
    height:
      height === undefined ? undefined : `${(height / FRAME_HEIGHT) * 100}%`,
    transform: `rotate(${rotation}deg)`,
    transformOrigin: "center",
    borderRadius,
  };
}

function cropPlacement({ left, top, width, height }: Crop): CSSProperties {
  return {
    left: `${left}%`,
    top: `${top}%`,
    width: `${width}%`,
    height: `${height}%`,
  };
}

export default function Speakers() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hasEnteredView, setHasEnteredView] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || !("IntersectionObserver" in window)) {
      setHasEnteredView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;

        setHasEnteredView(true);
        observer.disconnect();
      },
      { threshold: 0.2 },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="speakers"
      aria-labelledby="speakers-heading"
      className="[container-type:inline-size] relative isolate aspect-[1434/1157] w-full scroll-mt-20 overflow-hidden bg-[#f4f2ed] font-sans text-white"
    >
      <Image
        src={wallpaper}
        alt=""
        aria-hidden="true"
        priority
        sizes="123vw"
        style={placement(-134, 39, 1759)}
        className="pointer-events-none absolute -z-10 h-auto max-w-none select-none"
      />
      <h2
        id="speakers-heading"
        style={placement(107, 286, 599)}
        className="font-display absolute text-[2.23152cqw] leading-[1.4] font-normal whitespace-nowrap"
      >
        Engage with industry professionals...
      </h2>
      <p
        style={placement(107, 333, 553)}
        className="absolute text-[1.25523cqw] leading-[1.33333] font-medium tracking-[-0.025em]"
      >
        DeltaHacks is your chance to learn directly from leading figures in
        tech. Here are just a few of the past keynote speakers we’ve invited to
        speak:
      </p>
      {speakers.map((speaker) => (
        <figure key={speaker.name}>
          <div
            style={{
              ...artworkPlacement(speaker.portraitBox),
              transform: hasEnteredView
                ? "rotate(0deg)"
                : `rotate(${speaker.portraitBox.rotation ?? 0}deg)`,
            }}
            className="peer hover:animate-speaker-wobble absolute overflow-hidden transition-transform duration-1000 ease-out motion-reduce:animate-none motion-reduce:transition-none"
          >
            <Image
              src={speaker.portrait}
              alt={`Portrait of ${speaker.name}`}
              priority
              sizes={`${Math.ceil((speaker.portraitBox.width / FRAME_WIDTH) * 150)}vw`}
              style={cropPlacement(speaker.portraitCrop)}
              className="absolute max-w-none"
            />
          </div>
          <Image
            src={speaker.frame}
            alt=""
            aria-hidden="true"
            priority
            sizes={`${Math.ceil((speaker.frameBox.width / FRAME_WIDTH) * 100)}vw`}
            style={{
              ...artworkPlacement(speaker.frameBox),
              transform: hasEnteredView
                ? "rotate(0deg)"
                : `rotate(${speaker.frameBox.rotation ?? 0}deg)`,
            }}
            className="peer-hover:animate-speaker-wobble pointer-events-none absolute z-10 h-auto max-w-none transition-transform duration-1000 ease-out select-none motion-reduce:animate-none motion-reduce:transition-none"
          />
          <figcaption
            style={placement(speaker.captionX, 777, 277)}
            className="absolute z-20 text-[1.25523cqw] leading-[1.33333] tracking-[-0.025em]"
          >
            <p className="font-bold">{speaker.name}</p>
            <p className="font-medium whitespace-nowrap">{speaker.title}</p>
          </figcaption>
        </figure>
      ))}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[4.14866%] bg-gradient-to-b from-transparent to-[#f4f2ed]"
      />
    </section>
  );
}
