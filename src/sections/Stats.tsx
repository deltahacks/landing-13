import Image from "next/image";

import statsBg from "~/app/stats_bg.png";
import cloudDino from "~/sections/cloud_dino.webp";
import clouds from "~/sections/clouds.png";
import flyingDino from "~/sections/flying_dino.webp";
import parachuteDino from "~/sections/parachute_dino.webp";

const statFields = [
  {
    text: "24 workshops",
    curve: "top",
    className: "left-[44%] top-[30.5%]",
  },
  {
    text: "224+ projects submitted",
    curve: "top",
    className: "left-[64%] top-[34.5%]",
  },
  {
    text: "10+ schools",
    curve: "bottom",
    className: "left-[43.5%] top-[41%]",
  },
  {
    text: "1000+ hackers",
    curve: "bottom",
    className: "left-[52%] top-[48%] rotate-[28deg]",
  },
  {
    text: "60+ mentors",
    curve: "bottom",
    className: "left-[82%] top-[54%] rotate-[-35deg]",
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
        className="pointer-events-none absolute left-1/2 z-20 -translate-x-1/2 text-center text-[36px] leading-[100%] font-normal tracking-normal text-white"
        style={{
          top: "14.5%",
          width: "374px",
          height: "51px",
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
      <Image
        src={flyingDino}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-[11%] h-auto w-[48%] select-none"
        sizes="48vw"
      />
      <Image
        src={parachuteDino}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-[20%] top-[50%] h-auto w-[29%] select-none"
        sizes="29vw"
      />
      <Image
        src={cloudDino}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-[27%] left-[38%] h-auto w-[58%] select-none"
        sizes="58vw"
      />
      <Image
        src={clouds}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-auto w-full select-none"
        sizes="100vw"
      />
      {statFields.map((field) => (
        <p
          key={field.text}
          className={`pointer-events-none absolute z-20 whitespace-nowrap font-bold text-[20px] leading-[100%] tracking-normal text-white ${field.className}`}
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
                className="inline-block"
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
      ))}
    </section>
  );
}
