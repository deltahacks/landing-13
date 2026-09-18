"use client";

import Image, { type StaticImageData } from "next/image";
import {
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import greenBackground from "~/assets/speakers/green-background.png";
import leftFrame from "~/assets/speakers/frames/left-frame.webp";
import middleFrame from "~/assets/speakers/frames/middle-frame.webp";
import rightFrame from "~/assets/speakers/frames/right-frame.webp";
// import leftSpeaker from "~/assets/speakers/portraits/left-speaker.webp";
// import middleSpeaker from "~/assets/speakers/portraits/middle-speaker.webp";
// import rightSpeaker from "~/assets/speakers/portraits/right-speaker.webp";
import woodenPanelling from "~/assets/speakers/wooden-panelling.png";

const FRAME_WIDTH = 1434;
const FRAME_HEIGHT = 1157;

const MOBILE_GREEN_TILES = [
  { left: "-96.77%", width: "81.59%", height: "124.29%" },
  {
    left: "-15.16%",
    width: "81.59%",
    height: "124.29%",
    transform: "scaleX(-1)",
  },
  { left: "66.17%", width: "81.59%", height: "124.29%" },
] satisfies CSSProperties[];

const DESKTOP_GREEN_TILES = [
  { left: "-9.34%", top: "3.37%", width: "40.93%", height: "90.15%" },
  {
    left: "31.59%",
    top: "3.37%",
    width: "40.93%",
    height: "90.15%",
    transform: "scaleX(-1)",
  },
  { left: "72.38%", top: "3.37%", width: "40.93%", height: "90.15%" },
] satisfies CSSProperties[];

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
  portrait?: StaticImageData | string;
  frame: StaticImageData;
  portraitBox: ArtworkBox;
  portraitCrop: Crop;
  frameBox: ArtworkBox;
  captionX: number;
  mobileWidth: number;
  mobileSideTop?: number;
};

const speakers: Speaker[] = [
  {
    name: "Ivan Zhang",
    title: "Co-founder of Cohere",
    // portrait: leftSpeaker,
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
    mobileWidth: 72,
  },
  {
    name: "Vivek Alamuri",
    title: "ML Engineer @ Snowflake",
    // portrait: middleSpeaker,
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
    mobileWidth: 50,
    mobileSideTop: 9,
  },
  {
    name: "Chris Bautista",
    title: "Senior Software Engineer @ Netflix",
    // portrait: rightSpeaker,
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
    mobileWidth: 56,
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

function OptionalPortrait({
  src,
  alt,
  width,
  height,
  sizes,
  style,
  className,
}: {
  src?: StaticImageData | string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  style: CSSProperties;
  className: string;
}) {
  const sourceKey = typeof src === "string" ? src : src?.src;
  const [failedSource, setFailedSource] = useState<string | null>(null);

  if (!src || failedSource === sourceKey) return null;

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      draggable={false}
      onError={() => setFailedSource(sourceKey ?? "")}
      className={className}
      style={style}
    />
  );
}

function GreenWall({
  tiles,
  sizes,
}: {
  tiles: CSSProperties[];
  sizes: string;
}) {
  return (
    <>
      {tiles.map((style, index) => (
        <div
          key={index}
          aria-hidden="true"
          style={style}
          className="pointer-events-none absolute -z-10 select-none"
        >
          <Image
            src={greenBackground}
            alt=""
            fill
            priority
            sizes={sizes}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(48,55,40,0.71)] to-[rgba(168,195,154,0.71)]" />
        </div>
      ))}
    </>
  );
}

type CarouselSlot = "left" | "active" | "right";

function getCarouselSlot(index: number, activeIndex: number): CarouselSlot {
  if (index === activeIndex) return "active";

  return index === (activeIndex + 1) % speakers.length ? "left" : "right";
}

function MobileSpeakerArtwork({
  speaker,
  slot,
}: {
  speaker: Speaker;
  slot: CarouselSlot;
}) {
  const frameHeight =
    speaker.frame.height === 0
      ? 0
      : (speaker.mobileWidth * speaker.frame.height) / speaker.frame.width;
  const portraitLeft =
    ((speaker.portraitBox.x - speaker.frameBox.x) / speaker.frameBox.width) *
    100;
  const portraitTop =
    ((speaker.portraitBox.y - speaker.frameBox.y) /
      ((speaker.frame.height / speaker.frame.width) * speaker.frameBox.width)) *
    100;
  const portraitWidth =
    (speaker.portraitBox.width / speaker.frameBox.width) * 100;
  const portraitHeight =
    (((speaker.portraitBox.height ?? 0) / FRAME_HEIGHT) * 100 * FRAME_HEIGHT) /
    ((speaker.frame.height / speaker.frame.width) * speaker.frameBox.width);

  const slotClassName = {
    active: "left-1/2 top-0 z-20 opacity-100",
    left: "left-0 z-10 opacity-60",
    right: "left-full z-10 opacity-60",
  }[slot];

  return (
    <div
      aria-hidden={slot !== "active"}
      style={{
        width: `${speaker.mobileWidth}%`,
        aspectRatio: `${speaker.frame.width} / ${speaker.frame.height}`,
        top: slot === "active" ? undefined : `${speaker.mobileSideTop ?? 12}%`,
        transform: `${
          slot === "active"
            ? "translateX(-50%) scale(1)"
            : slot === "left"
              ? "translateX(-8%) scale(.72)"
              : "translateX(-90%) scale(.72)"
        }`,
        // Keep an explicit minimum in the DOM for browsers that resolve aspect
        // ratios after image decode; it prevents the stage from jumping.
        minHeight: `${frameHeight}vw`,
      }}
      className={`absolute origin-center transition-[transform,opacity] duration-500 ease-out motion-reduce:transition-none ${slotClassName}`}
    >
      {speaker.portrait && (
        <div
          style={{
            left: `${portraitLeft}%`,
            top: `${portraitTop}%`,
            width: `${portraitWidth}%`,
            height: `${portraitHeight}%`,
            borderRadius: speaker.portraitBox.borderRadius,
          }}
          className="absolute overflow-hidden"
        >
          <OptionalPortrait
            src={speaker.portrait}
            alt={slot === "active" ? `Portrait of ${speaker.name}` : ""}
            width={Math.max(1, Math.round(speaker.portraitBox.width))}
            height={Math.max(1, Math.round(speaker.portraitBox.height ?? 1))}
            sizes="72vw"
            className="pointer-events-none absolute max-w-none select-none"
            style={cropPlacement(speaker.portraitCrop)}
          />
        </div>
      )}
      <Image
        src={speaker.frame}
        alt=""
        aria-hidden="true"
        fill
        sizes="72vw"
        draggable={false}
        className="pointer-events-none object-contain select-none"
      />
    </div>
  );
}

function MobileSpeakerCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const pointerStart = useRef<{ x: number; y: number; id: number } | null>(
    null,
  );

  const showLeftSpeaker = () =>
    setActiveIndex((current) => (current + 1) % speakers.length);
  const showRightSpeaker = () =>
    setActiveIndex(
      (current) => (current - 1 + speakers.length) % speakers.length,
    );

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    pointerStart.current = {
      x: event.clientX,
      y: event.clientY,
      id: event.pointerId,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const start = pointerStart.current;
    pointerStart.current = null;

    if (!start || start.id !== event.pointerId) return;

    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;

    if (Math.abs(deltaX) < 36 || Math.abs(deltaX) < Math.abs(deltaY)) return;

    if (deltaX > 0) showLeftSpeaker();
    else showRightSpeaker();
  };

  const activeSpeaker = speakers[activeIndex]!;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Past keynote speakers"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          showLeftSpeaker();
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          showRightSpeaker();
        }
      }}
      className="absolute inset-x-0 top-[34%] h-[60%] touch-pan-y focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white md:hidden"
    >
      <p className="sr-only">
        Swipe, drag, or use the left and right arrow keys to change speakers.
      </p>
      <div
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => {
          pointerStart.current = null;
        }}
        className="relative h-[80%] cursor-grab overflow-hidden active:cursor-grabbing"
      >
        {speakers.map((speaker, index) => {
          const slot = getCarouselSlot(index, activeIndex);

          return (
            <button
              key={speaker.name}
              type="button"
              aria-label={
                slot === "active"
                  ? `${speaker.name}, current speaker`
                  : `Show ${speaker.name}`
              }
              tabIndex={slot === "active" ? -1 : 0}
              onClick={() => {
                if (slot !== "active") setActiveIndex(index);
              }}
              className="contents focus-visible:outline-2 focus-visible:outline-white"
            >
              <MobileSpeakerArtwork speaker={speaker} slot={slot} />
            </button>
          );
        })}
      </div>
      <div
        aria-live="polite"
        aria-atomic="true"
        className="absolute inset-x-[12%] top-[82%] text-center text-[clamp(0.75rem,3vw,0.875rem)] leading-[1.25] tracking-[-0.025em]"
      >
        <p className="font-bold">{activeSpeaker.name}</p>
        <p className="font-medium">{activeSpeaker.title}</p>
      </div>
      <button type="button" onClick={showLeftSpeaker} className="sr-only">
        Previous speaker
      </button>
      <button type="button" onClick={showRightSpeaker} className="sr-only">
        Next speaker
      </button>
    </div>
  );
}

export default function Speakers() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hasEnteredView, setHasEnteredView] = useState(false);
  const [entranceRotations, setEntranceRotations] = useState<number[]>(() =>
    speakers.map((speaker) => speaker.frameBox.rotation ?? 0),
  );
  const [rotationsReady, setRotationsReady] = useState(false);

  useEffect(() => {
    setEntranceRotations(
      speakers.map(() => {
        const direction = Math.random() < 0.5 ? -1 : 1;
        const magnitude = 2.5 + Math.random() * 3;

        return direction * magnitude;
      }),
    );

    const animationFrame = window.requestAnimationFrame(() => {
      setRotationsReady(true);
    });

    return () => window.cancelAnimationFrame(animationFrame);
  }, []);

  useEffect(() => {
    if (!rotationsReady) return;

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
  }, [rotationsReady]);

  return (
    <section
      ref={sectionRef}
      id="speakers"
      aria-label="Past keynote speakers"
      className="[container-type:inline-size] relative isolate aspect-[8/11] w-full scroll-mt-20 overflow-hidden bg-[#677659] font-sans text-white md:aspect-[1434/1157] md:bg-[#f4f2ed]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 md:hidden"
      >
        <div className="absolute inset-x-0 top-0 aspect-[6/7] overflow-hidden">
          <GreenWall tiles={MOBILE_GREEN_TILES} sizes="82vw" />
        </div>
        <Image
          src={woodenPanelling}
          alt=""
          priority
          sizes="100vw"
          className="absolute inset-x-0 bottom-0 h-auto w-full select-none"
        />
      </div>
      <div className="absolute inset-x-0 top-0 aspect-[6/7] md:hidden">
        <h2
          id="speakers-heading-mobile"
          className="font-display absolute top-[6.8%] left-[9%] w-[76%] text-[clamp(1.25rem,5vw,1.5rem)] leading-[1.18] font-normal"
        >
          Engage with industry professionals...
        </h2>
        <p className="absolute top-[19.5%] left-[9%] w-[79%] text-[clamp(0.75rem,3vw,0.875rem)] leading-[1.25] font-medium tracking-[-0.025em]">
          DeltaHacks is your chance to learn directly from leading figures in
          tech. Here are just a few of the past keynote speakers we’ve invited
          to speak:
        </p>
        <MobileSpeakerCarousel />
      </div>
      <div className="hidden md:contents">
        <GreenWall tiles={DESKTOP_GREEN_TILES} sizes="41vw" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[77.18%] left-[-0.91%] -z-10 h-[21.87%] w-[84.87%]"
        >
          <Image
            src={woodenPanelling}
            alt=""
            fill
            priority
            sizes="85vw"
            className="object-fill select-none"
          />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[77.18%] left-[82.5%] -z-10 h-[21.87%] w-[18.41%] -scale-x-100 overflow-hidden"
        >
          <Image
            src={woodenPanelling}
            alt=""
            priority
            sizes="85vw"
            className="absolute top-0 left-[-361.15%] h-full w-[461.54%] max-w-none select-none"
          />
        </div>
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
          tech. Here are just a few of the past keynote speakers we’ve invited
          to speak:
        </p>
        {speakers.map((speaker, index) => (
          <figure key={speaker.name}>
            {speaker.portrait && (
              <div
                style={{
                  ...artworkPlacement(speaker.portraitBox),
                  transform: hasEnteredView
                    ? "rotate(0deg)"
                    : `rotate(${entranceRotations[index] ?? 0}deg)`,
                }}
                className="peer hover:animate-speaker-wobble absolute overflow-hidden transition-transform duration-1000 ease-out motion-reduce:animate-none motion-reduce:transition-none"
              >
                <OptionalPortrait
                  src={speaker.portrait}
                  alt={`Portrait of ${speaker.name}`}
                  width={Math.max(1, Math.round(speaker.portraitBox.width))}
                  height={Math.max(
                    1,
                    Math.round(speaker.portraitBox.height ?? 1),
                  )}
                  sizes={`${Math.ceil((speaker.portraitBox.width / FRAME_WIDTH) * 150)}vw`}
                  style={cropPlacement(speaker.portraitCrop)}
                  className="absolute max-w-none"
                />
              </div>
            )}
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
                  : `rotate(${entranceRotations[index] ?? 0}deg)`,
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
      </div>
    </section>
  );
}
