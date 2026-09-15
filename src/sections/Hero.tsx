import Image from "next/image";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";

import applyNowArrow from "~/assets/hero/btn-icon/apply-now-arrow.svg";
import clouds from "~/assets/hero/clouds/clouds_1x.webp";
import greeneryForeground from "~/assets/hero/greenery_foreground/greenery_foreground_1x.webp";
import hills from "~/assets/hero/hills/hills_1x.webp";
import dinosaurs from "~/assets/hero/dinos.svg";
import portal from "~/assets/hero/Portal.svg";
import { posthogServerClient } from "~/lib/posthog";

import HeroDinosaurWalk from "./HeroDinosaurWalk";

async function areApplicationsOpen() {
  try {
    const flags = await posthogServerClient.evaluateFlags("landing-hero");
    return flags.isEnabled("applications-open") === true;
  } catch {
    return false;
  }
}

export default async function Hero() {
  noStore();
  const applicationsOpen = await areApplicationsOpen();

  return (
    <section
      className="relative isolate -mt-[3.75rem] min-h-[max(100svh,161.94vw)] overflow-hidden bg-[linear-gradient(to_bottom,#7fc5f9_7.187%,#87e6fb_19.878%,#d3f7ff_41.131%)] md:min-h-[max(100svh,75.35vw)]"
      aria-label="DeltaHacks 13"
    >
      <Image
        src={clouds}
        alt=""
        aria-hidden="true"
        priority
        sizes="(min-width: 768px) 100vw, 137vw"
        className="pointer-events-none absolute top-[44.53vw] left-1/2 z-10 h-auto w-[136.57vw] max-w-none -translate-x-1/2 select-none md:top-0 md:w-full"
      />
      <div
        className="absolute top-[108.46vw] right-0 bottom-0 left-0 z-[15] bg-[#80d574] md:top-[46.875vw]"
        aria-hidden="true"
      />
      <Image
        src={hills}
        alt=""
        aria-hidden="true"
        priority
        sizes="(min-width: 768px) 100vw, 137vw"
        className="pointer-events-none absolute top-[44.53vw] left-1/2 z-20 h-auto w-[136.57vw] max-w-none -translate-x-1/2 select-none md:top-0 md:w-full"
      />
      <HeroDinosaurWalk />
      <div
        className="pointer-events-none absolute top-[96.52vw] left-[18.89vw] z-[17] h-[14.68vw] w-[61.11vw] bg-white blur-[55.3px] md:top-[38.125vw] md:left-[18.889vw] md:h-[10.833vw] md:w-[61.111vw]"
        aria-hidden="true"
      />
      <Image
        src={greeneryForeground}
        alt=""
        aria-hidden="true"
        priority
        sizes="(min-width: 768px) 100vw, 137vw"
        className="pointer-events-none absolute top-[83.19vw] left-1/2 z-30 h-auto w-[136.57vw] max-w-none -translate-x-1/2 select-none md:top-[28.33vw] md:w-full"
      />
      <h1 className="font-display absolute top-[37.81vw] left-[calc(50%+5px)] z-30 m-0 -translate-x-1/2 text-[clamp(36px,9.95vw,40px)] leading-none font-normal tracking-[-0.4px] whitespace-nowrap text-[#32464c] md:top-[10.625vw] md:left-1/2 md:text-[clamp(40px,4.861vw,70px)] md:tracking-[-0.0486vw]">
        DeltaHacks 13
      </h1>
      <p className="absolute top-[50.25vw] left-[calc(50%+5px)] z-30 m-0 -translate-x-1/2 text-[clamp(13px,3.48vw,14px)] leading-normal font-bold whitespace-nowrap text-[#303a3d] md:top-[16.667vw] md:left-1/2 md:text-[clamp(12px,1.25vw,18px)]">
        McMaster&apos;s Annual Hackathon for Change
      </p>
      <p className="absolute top-[54.98vw] left-[calc(50%+5px)] z-30 m-0 -translate-x-1/2 text-[clamp(13px,3.48vw,14px)] leading-normal font-bold whitespace-nowrap text-[#303a3d] md:top-[18.542vw] md:left-1/2 md:text-[clamp(12px,1.25vw,18px)]">
        Jan 10-11, 2027 • In Person
      </p>
      {applicationsOpen && (
        <Link
          href="https://portal.deltahacks.com"
          target="_blank"
          rel="noreferrer"
          className="absolute top-[61.19vw] left-[calc(50%+5px)] z-30 inline-flex h-[47px] w-[132px] -translate-x-1/2 items-center justify-center gap-2 rounded-[15px] bg-gradient-to-r from-[#303a3d] to-[#355c68] pt-px text-[16px] leading-none font-bold text-white shadow-[2px_5px_0_#303a3d,0px_4px_4px_rgba(0,0,0,0.25)] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:top-[21.319vw] md:left-1/2 md:h-[clamp(34px,3.264vw,47px)] md:w-[clamp(128px,12.222vw,176px)] md:text-[clamp(15px,1.389vw,20px)]"
        >
          Apply Now
          <Image
            src={applyNowArrow}
            alt=""
            aria-hidden="true"
            className="md:w-[clamp(13px,1.319vw,19px)]"
          />
        </Link>
      )}
      <Image
        src={portal}
        alt="A glowing DeltaHacks portal"
        priority
        sizes="(min-width: 768px) 71vw, 97vw"
        className="pointer-events-none absolute top-[73.13vw] left-[calc(50%+5px)] z-40 h-auto w-[106vw] max-w-none -translate-x-1/2 select-none md:top-[21.6vw] md:left-1/2 md:w-[76.5vw]"
      />
      <Image
        src={dinosaurs}
        alt=""
        aria-hidden="true"
        priority
        sizes="(min-width: 768px) 47vw, 64vw"
        className="pointer-events-none absolute top-[120.15vw] left-1/2 z-50 h-auto w-[64.4vw] max-w-none -translate-x-1/2 select-none md:top-[55.35vw] md:left-[28.125vw] md:w-[46.94vw] md:translate-x-0"
      />
    </section>
  );
}
