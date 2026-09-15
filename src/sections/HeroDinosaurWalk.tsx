"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import bigDino from "~/assets/hero/big-dino.svg";

type DinosaurProps = {
  className: string;
  cloneClassName: string;
  isFacingRight: boolean;
  walkClassName: string;
  isWalking: boolean;
};

function Dinosaur({
  className,
  cloneClassName,
  isFacingRight,
  walkClassName,
  isWalking,
}: DinosaurProps) {
  const walkingClasses = isWalking
    ? `will-change-transform motion-reduce:animate-none ${walkClassName}`
    : "";
  const dinosaurTransform = isFacingRight
    ? "-scale-x-100 -scale-y-100 rotate-[-171.62deg] skew-x-[-0.47deg]"
    : "-scale-y-100 rotate-[-171.62deg] skew-x-[-0.47deg]";

  return (
    <>
      <div className={`${className} ${walkingClasses}`}>
        <div
          className={
            isWalking
              ? "animate-hero-dino-bob size-full motion-reduce:animate-none"
              : "size-full"
          }
        >
          <div
            className={`relative mx-auto h-[86.22%] w-[89.31%] ${dinosaurTransform}`}
          >
            <Image
              src={bigDino}
              alt=""
              aria-hidden="true"
              fill
              sizes="37vw"
              className="object-fill select-none"
            />
          </div>
        </div>
      </div>
      <div className={`${cloneClassName} ${walkingClasses}`} aria-hidden="true">
        <div
          className={
            isWalking
              ? "animate-hero-dino-bob size-full motion-reduce:animate-none"
              : "size-full"
          }
        >
          <div
            className={`relative mx-auto h-[86.22%] w-[89.31%] ${dinosaurTransform}`}
          >
            <Image
              src={bigDino}
              alt=""
              fill
              sizes="37vw"
              className="object-fill select-none"
            />
          </div>
        </div>
      </div>
    </>
  );
}

function MobileDinosaur({
  className,
  isFacingRight,
}: {
  className: string;
  isFacingRight: boolean;
}) {
  return (
    <div className={className}>
      <div
        className={`relative size-full rotate-[8.38deg] skew-x-[0.47deg] ${
          isFacingRight ? "" : "-scale-x-100"
        }`}
      >
        <Image
          src={bigDino}
          alt=""
          aria-hidden="true"
          fill
          sizes="37vw"
          className="object-fill select-none"
        />
      </div>
    </div>
  );
}

export default function HeroDinosaurWalk() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isHeroVisible, setIsHeroVisible] = useState(false);

  useEffect(() => {
    const hero = heroRef.current;

    if (!hero) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsHeroVisible(entry?.isIntersecting ?? false),
      { threshold: 0.1 },
    );

    observer.observe(hero);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={heroRef}
      className="pointer-events-none absolute inset-0 z-[16] overflow-hidden"
      aria-hidden="true"
    >
      <div className="md:hidden">
        <MobileDinosaur
          isFacingRight
          className="absolute top-[70.04vw] left-[8.89vw] h-[44.21vw] w-[36.86vw]"
        />
        <MobileDinosaur
          isFacingRight
          className="absolute top-[74.03vw] left-[46.53vw] h-[40.02vw] w-[33.36vw]"
        />
      </div>
      <div className="hidden md:contents">
        <Dinosaur
          isFacingRight
          isWalking={isHeroVisible}
          walkClassName="animate-hero-dino-walk-left"
          className="absolute top-[18.681vw] left-[8.889vw] h-[32.374vw] w-[36.865vw]"
          cloneClassName="absolute top-[18.681vw] left-[calc(8.889vw-136.865vw)] h-[32.374vw] w-[36.865vw]"
        />
        <Dinosaur
          isFacingRight
          isWalking={isHeroVisible}
          walkClassName="animate-hero-dino-walk-right"
          className="absolute top-[21.597vw] left-[46.528vw] h-[29.297vw] w-[33.361vw]"
          cloneClassName="absolute top-[21.597vw] left-[calc(46.528vw-133.361vw)] h-[29.297vw] w-[33.361vw]"
        />
      </div>
    </div>
  );
}
