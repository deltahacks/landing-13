import Image from "next/image";
import { Fragment } from "react";

import statsBg from "~/assets/stats_bg.webp";
import cloudDino from "~/assets/cloud_dino.webp";
import clouds from "~/assets/clouds.webp";
import flyingDino from "~/assets/flying_dino.webp";
import parachuteDino from "~/assets/parachute_dino.webp";
import styles from "./Stats.module.css";

const statFields = [
  {
    text: "24 workshops",
    curve: "top",
    desktopClassName: "left-[44%] top-[30.5%]",
    mobileClassName: "left-[6%] top-[22%]",
  },
  {
    text: "224+ projects submitted",
    curve: "top",
    desktopClassName: "left-[64%] top-[34.5%]",
    mobileClassName: "left-[10%] top-[32%]",
  },
  {
    text: "10+ schools",
    curve: "bottom",
    desktopClassName: "left-[43.5%] top-[41%]",
    mobileClassName: "left-[41%] top-[62%]",
  },
  {
    text: "1000+ hackers",
    curve: "bottom",
    desktopClassName: "left-[52%] top-[48%] rotate-[28deg]",
    mobileClassName: "left-[54%] top-[72%]",
  },
  {
    text: "60+ mentors",
    curve: "bottom",
    desktopClassName: "left-[82%] top-[54%] rotate-[-35deg]",
    mobileClassName: "left-[28%] top-[82%]",
  },
] as const;

const xJitterPx = 2.0;
const yJitterPx = 2.8;
const rotationJitterDeg = 12;
const spacingJitterEm = 0.30;
const spaceWidthEm = 0.46;
const curveRadiusPx = 120;
const curveArcDeg = 68;

function hashToUnit(input: string) {
  let hash = 2166136261;

  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  return (hash >>> 0) / 4294967295;
}

function toRange(value: number, min: number, max: number) {
  return min + (max - min) * value;
}

function getCurveTransform(
  curve: (typeof statFields)[number]["curve"],
  index: number,
  characterCount: number,
) {
  const progress = characterCount === 1 ? 0.5 : index / (characterCount - 1);
  const angle = toRange(progress, -curveArcDeg / 2, curveArcDeg / 2);
  const angleRadians = (angle * Math.PI) / 180;
  const endOffset = Math.cos((curveArcDeg / 2) * (Math.PI / 180));
  const direction = curve === "top" ? -1 : 1;
  const yOffset = direction * curveRadiusPx * (Math.cos(angleRadians) - endOffset);
  const tangentRotation = curve === "top" ? angle : -angle;

  return {
    yOffset,
    tangentRotation,
  };
}

export default function Stats() {
  return (
    <section
      id="statistics"
      className="relative w-full overflow-hidden bg-[#f7e8c8]"
    >
      <h2
        className="pointer-events-none absolute left-5 top-4 z-20 text-left text-[22px] leading-[100%] font-normal tracking-normal text-white md:left-1/2 md:top-[14.5%] md:w-93.5 md:-translate-x-1/2 md:text-center md:text-[36px]"
        style={{
          fontFamily: "var(--font-young-serif)",
        }}
      >
        Last year we had...
      </h2>
      <Image
        src={statsBg}
        alt="DeltaHacks statistics"
        placeholder="blur"
        priority
        className="block h-auto w-full max-w-none object-contain"
        sizes="100vw"
      />
      <div className={`${styles.flyingDinoEnter} pointer-events-none absolute left-[32%] top-[-7%] w-[80%] md:left-0 md:top-[11%] md:w-[48%]`}>
        <Image
          src={flyingDino}
          alt=""
          aria-hidden="true"
          className="h-auto w-full -scale-x-100 select-none md:scale-x-100"
          sizes="48vw"
        />
      </div>
      <Image
        src={parachuteDino}
        alt=""
        aria-hidden="true"
        className={`${styles.parachuteDinoFly} pointer-events-none absolute left-[0%] top-[50%] h-auto w-[42%] select-none md:left-[20%] md:top-[50%] md:w-[29%]`}
        sizes="29vw"
      />
      <Image
        src={cloudDino}
        alt=""
        aria-hidden="true"
        className={`${styles.cloudDinoDrift} pointer-events-none absolute left-[26%] top-[34%] h-auto w-[52%] select-none md:left-[38%] md:top-[27%] md:w-[58%]`}
        sizes="58vw"
      />
      <Image
        src={clouds}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-auto w-full select-none"
        sizes="100vw"
      />
      {statFields.map((field, index) => (
        <Fragment key={field.text}>
          <p
            key={`${field.text}-mobile`}
            className={`pointer-events-none absolute z-20 whitespace-nowrap font-bold text-[18px] leading-[100%] tracking-normal text-white md:hidden ${index === statFields.length - 1 ? "hidden" : ""} ${field.mobileClassName}`}
            style={{ fontFamily: "var(--font-satoshi)" }}
          >
            {field.text}
          </p>
          <p
            key={`${field.text}-desktop`}
            className={`pointer-events-none absolute z-20 hidden whitespace-nowrap font-bold text-[20px] leading-[100%] tracking-normal text-white md:block ${field.desktopClassName}`}
            style={{ fontFamily: "var(--font-satoshi)" }}
          >
            {Array.from(field.text).map((char, index) => {
              const seed = `${field.text}-${index}`;
              const curveTransform = getCurveTransform(
                field.curve,
                index,
                field.text.length,
              );
              const xJitter = toRange(hashToUnit(`${seed}-x`), -xJitterPx, xJitterPx);
              const yJitter = toRange(hashToUnit(`${seed}-y`), -yJitterPx, yJitterPx);
              const rotation = toRange(
                hashToUnit(`${seed}-r`),
                -rotationJitterDeg,
                rotationJitterDeg,
              );
              const marginRight =
                char === " "
                  ? `${spaceWidthEm}em`
                  : `${toRange(hashToUnit(`${seed}-s`), 0, spacingJitterEm).toFixed(3)}em`;

              return (
                <span
                  key={`${field.text}-${index}`}
                  className="pointer-events-auto inline-block transition-colors duration-200 ease-out hover:text-[#ffd166] hover:[text-shadow:0_0_10px_rgba(255,209,102,0.95),0_0_24px_rgba(255,209,102,0.55)]"
                  style={{
                    transform: `translate(${xJitter.toFixed(2)}px, ${(curveTransform.yOffset + yJitter).toFixed(2)}px) rotate(${curveTransform.tangentRotation.toFixed(2)}deg) rotate(${rotation.toFixed(2)}deg)`,
                    marginRight,
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              );
            })}
          </p>
        </Fragment>
      ))}
    </section>
  );
}
