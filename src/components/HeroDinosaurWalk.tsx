"use client";

import Image from "next/image";
import { type RefObject, useEffect, useRef, useState } from "react";

import bigDino from "~/assets/hero/big-dino.svg";

type DesktopDinosaur = {
  baseClassName: string;
  cloneClassName: string;
  name: string;
  walkClassName: string;
};

const desktopDinosaurs: DesktopDinosaur[] = [
  {
    name: "left",
    walkClassName: "animate-hero-dino-walk-left",
    baseClassName:
      "absolute top-[18.681vw] left-[8.889vw] h-[32.374vw] w-[36.865vw]",
    cloneClassName:
      "absolute top-[18.681vw] left-[calc(8.889vw-136.865vw)] h-[32.374vw] w-[36.865vw]",
  },
  {
    name: "right",
    walkClassName: "animate-hero-dino-walk-right",
    baseClassName:
      "absolute top-[21.597vw] left-[46.528vw] h-[29.297vw] w-[33.361vw]",
    cloneClassName:
      "absolute top-[21.597vw] left-[calc(46.528vw-133.361vw)] h-[29.297vw] w-[33.361vw]",
  },
];

const mobileDinosaurPositions = [
  "absolute top-[61vw] left-[-6.38vw] h-[64.5vw] w-[47.18vw]",
  "absolute top-[70.69vw] left-[50.79vw] h-[44.18vw] w-[36.83vw]",
];

function DinosaurArt({ className }: { className: string }) {
  return (
    <div className={className}>
      <Image
        src={bigDino}
        alt=""
        aria-hidden="true"
        fill
        sizes="37vw"
        className="object-fill select-none"
      />
    </div>
  );
}

function DesktopDinosaurPass({
  className,
  isWalking,
  walkClassName,
}: {
  className: string;
  isWalking: boolean;
  walkClassName: string;
}) {
  const walkAnimation = isWalking
    ? `will-change-transform motion-reduce:animate-none ${walkClassName}`
    : "";
  const bobAnimation = isWalking
    ? "animate-hero-dino-bob motion-reduce:animate-none"
    : "";

  return (
    <div className={`${className} ${walkAnimation}`}>
      <div className={`size-full ${bobAnimation}`}>
        <DinosaurArt className="relative mx-auto h-[86.22%] w-[89.31%] -scale-x-100 -scale-y-100 rotate-[-171.62deg] skew-x-[-0.47deg]" />
      </div>
    </div>
  );
}

function useHeroVisibility(ref: RefObject<Element | null>) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hero = ref.current;

    if (!hero) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry?.isIntersecting ?? false),
      { threshold: 0.1 },
    );

    observer.observe(hero);

    return () => observer.disconnect();
  }, [ref]);

  return isVisible;
}

export default function HeroDinosaurWalk() {
  const heroRef = useRef<HTMLDivElement>(null);
  const isHeroVisible = useHeroVisibility(heroRef);

  return (
    <div
      ref={heroRef}
      className="pointer-events-none absolute inset-0 z-[16] overflow-hidden"
      aria-hidden="true"
    >
      <div className="md:hidden">
        {mobileDinosaurPositions.map((className) => (
          <div key={className} className={className}>
            <DinosaurArt className="relative size-full skew-x-[0.47deg]" />
          </div>
        ))}
      </div>
      <div className="hidden md:contents">
        {desktopDinosaurs.flatMap(
          ({ baseClassName, cloneClassName, name, walkClassName }) => [
            <DesktopDinosaurPass
              key={name}
              className={baseClassName}
              isWalking={isHeroVisible}
              walkClassName={walkClassName}
            />,
            <DesktopDinosaurPass
              key={`${name}-clone`}
              className={cloneClassName}
              isWalking={isHeroVisible}
              walkClassName={walkClassName}
            />,
          ],
        )}
      </div>
    </div>
  );
}
