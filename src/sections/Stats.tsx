import Image from "next/image";
import { Fragment } from "react";

import statsBg from "~/assets/stats/stats_bg.webp";
import cloudDino from "~/assets/stats/cloud_dino.webp";
import clouds from "~/assets/stats/clouds.webp";
import flyingDino from "~/assets/stats/flying_dino.webp";
import parachuteDino from "~/assets/stats/parachute_dino.webp";
import styles from "../styles/Stats.module.css";

const statFields = [
  {
    text: "24 workshops",
    curve: "top",
  },
  {
    text: "224+ projects submitted",
    curve: "top",
  },
  {
    text: "10+ schools",
    curve: "bottom",
  },
  {
    text: "1000+ hackers",
    curve: "bottom",
  },
  {
    text: "60+ mentors",
    curve: "bottom",
  },
] as const;

const xJitterPx = 2.0;
const yJitterPx = 2.8;
const rotationJitterDeg = 12;
const spacingJitterEm = 0.3;
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
  const yOffset =
    direction * curveRadiusPx * (Math.cos(angleRadians) - endOffset);
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
        className={`${styles.fontYoungSerif} pointer-events-none absolute top-4 left-5 z-20 text-left text-[22px] leading-[100%] font-normal tracking-normal text-white md:top-[14.5%] md:left-1/2 md:w-93.5 md:-translate-x-1/2 md:text-center md:text-[36px]`}
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
      <div
        className={`${styles.flyingDinoEnter} pointer-events-none absolute top-[-7%] left-[32%] w-[80%] md:top-[11%] md:left-0 md:w-[48%]`}
      >
        <Image
          src={flyingDino}
          alt=""
          aria-hidden="true"
          className="h-auto w-full -scale-x-100 select-none md:scale-x-100"
          sizes="(max-width: 768px) 80vw, 48vw"
        />
      </div>
      <Image
        src={parachuteDino}
        alt=""
        aria-hidden="true"
        className={`${styles.parachuteDinoFly} pointer-events-none absolute top-[50%] left-[0%] h-auto w-[42%] select-none md:top-[50%] md:left-[20%] md:w-[29%]`}
        sizes="(max-width: 768px) 42vw, 29vw"
      />
      <Image
        src={cloudDino}
        alt=""
        aria-hidden="true"
        className={`${styles.cloudDinoDrift} pointer-events-none absolute top-[34%] left-[26%] h-auto w-[52%] select-none md:top-[27%] md:left-[38%] md:w-[58%]`}
        sizes="(max-width: 768px) 52vw, 58vw"
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
            className={`${styles.fontSatoshi} pointer-events-none absolute z-20 text-[18px] leading-[100%] font-bold tracking-normal whitespace-nowrap text-white md:hidden ${index === statFields.length - 1 ? "hidden" : ""} ${styles[`stat${index}Mobile`]}`}
          >
            {field.text}
          </p>
          <p
            key={`${field.text}-desktop`}
            className={`${styles.fontSatoshi} pointer-events-none absolute z-20 hidden text-[20px] leading-[100%] font-bold tracking-normal whitespace-nowrap text-white md:block ${styles[`stat${index}Desktop`]}`}
          >
            {Array.from(field.text).map((char, index) => {
              const seed = `${field.text}-${index}`;
              const curveTransform = getCurveTransform(
                field.curve,
                index,
                field.text.length,
              );
              const xJitter = toRange(
                hashToUnit(`${seed}-x`),
                -xJitterPx,
                xJitterPx,
              );
              const yJitter = toRange(
                hashToUnit(`${seed}-y`),
                -yJitterPx,
                yJitterPx,
              );
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
                  className="pointer-events-auto inline-block transition-colors duration-200 ease-out text-white hover:text-[#ffd166] hover:[text-shadow:0_0_10px_rgba(255,209,102,0.95),0_0_24px_rgba(255,209,102,0.55)]"
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
