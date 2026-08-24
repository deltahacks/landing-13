import Image from "next/image";

import canopyImg from "~/assets/about/canopy.svg";
import dinoBlueImg from "~/assets/about/dino-blue.svg";
import dinoRedImg from "~/assets/about/dino-red.svg";
import dinoYellowImg from "~/assets/about/dino-yellow.svg";
import pteroBodyImg from "~/assets/about/ptero-body.svg";
import pteroWingBackImg from "~/assets/about/ptero-wing-back.svg";
import pteroWingFrontImg from "~/assets/about/ptero-wing-front.svg";
import sceneImg from "~/assets/about/scene.webp";

/* -------------------------------------------------------------------------- */
/*  Copy — edit freely, the layout does not depend on its length.              */
/* -------------------------------------------------------------------------- */

const HEADING = "Spend an unforgettable weekend...";

/** The design specifies different supporting copy per breakpoint. */
const BODY_DESKTOP =
  "DeltaHacks brings over 600 students from across North America to bring their ideas to life over 24 hours. We supply the food, venue, workshops, and mentors, allowing you to make the most out of your 24 hours of building.";

const BODY_MOBILE =
  "DeltaHacks brings over 600 students from across North America to bring their ideas to life over 24 hours. Connect with like-minded hackers, attend workshops, and learn from mentors to make the most out of your 24 hours of building!";

/* -------------------------------------------------------------------------- */
/*  Layout                                                                     */
/*                                                                             */
/*  The dinosaurs sit on a log that is painted into the background, so the      */
/*  artwork and the characters have to scale in lockstep or the dinos drift     */
/*  off the log. Everything below is therefore positioned as a percentage of    */
/*  a box locked to the Figma frame's aspect ratio — 402x450 on mobile,         */
/*  1440x942 from `md` up — which keeps the composition exact at any width.     */
/* -------------------------------------------------------------------------- */

/** Decorative art: never announced, never interactive. */
const ART = "pointer-events-none absolute select-none";

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative aspect-[402/450] w-full scroll-mt-20 overflow-hidden bg-[linear-gradient(180deg,#1a2e26_0%,#ced4da_87.22%)] md:aspect-[1440/942]"
    >
      {/* Copy sits above the artwork, and first in the DOM so it leads the
          reading order.

          The column widens as the viewport narrows. Type cannot scale all the
          way down with the composition — at 768px a proportional body would be
          under 10px — so it bottoms out at a readable size, which makes the
          paragraph run more lines than the mock. Widening the column spends the
          empty sky to its right and keeps the copy clear of the dinosaurs; the
          design's own 44% column returns at `xl`, where the type fits it. */}
      <div className="absolute top-[9%] left-[7.214%] z-10 w-[72%] text-white min-[402px]:top-[11.33%] min-[402px]:w-[58.955%] md:top-[17.41%] md:left-[5%] md:w-[70%] lg:w-[56%] xl:w-[44.224%]">
        <h2
          id="about-heading"
          className="font-display mb-[0.25em] text-[clamp(1rem,4.9751vw,1.5rem)] leading-none md:mb-[0.36em] md:text-[clamp(1.375rem,2.2222vw,2.75rem)] md:leading-normal"
        >
          {HEADING}
        </h2>
        <p className="font-sans text-[clamp(0.625rem,2.9851vw,1rem)] font-medium md:text-[clamp(0.9375rem,1.25vw,1.5rem)]">
          <span className="md:hidden">{BODY_MOBILE}</span>
          <span className="hidden md:inline">{BODY_DESKTOP}</span>
        </p>
      </div>

      {/* Painted forest scene. Overflows the frame at the bottom by design. */}
      <div className="pointer-events-none absolute top-[-0.318%] left-[-63.421%] h-[127.378%] w-[171.119%] md:top-[-0.318%] md:left-[-0.069%] md:h-[127.389%] md:w-full">
        <Image
          src={sceneImg}
          alt=""
          aria-hidden
          fill
          placeholder="blur"
          sizes="(max-width: 767px) 172vw, 100vw"
          className="object-cover"
        />
      </div>

      {/* Tree canopy overhanging the top edge. Sits off-screen on mobile. */}
      <Image
        src={canopyImg}
        alt=""
        aria-hidden
        unoptimized
        className={`${ART} top-0 left-0 hidden h-[4.034%] w-[37.639%] md:block`}
      />

      {/* Three dinosaurs on the log, back to front. */}
      <Image
        src={dinoRedImg}
        alt=""
        aria-hidden
        unoptimized
        className={`${ART} top-[37.26%] left-[58.525%] h-[21.64%] w-[26.532%] md:top-[37.261%] md:left-[71.136%] md:h-[21.019%] md:w-[15.417%]`}
      />
      <Image
        src={dinoBlueImg}
        alt=""
        aria-hidden
        unoptimized
        className={`${ART} top-[41.72%] left-[33.674%] h-[20.711%] w-[26.209%] md:top-[41.72%] md:left-[56.631%] md:h-[19.958%] md:w-[15.139%]`}
      />
      <Image
        src={dinoYellowImg}
        alt=""
        aria-hidden
        unoptimized
        className={`${ART} top-[40.02%] left-[6.492%] h-[23.671%] w-[29.821%] md:top-[40.023%] md:left-[40.751%] md:h-[23.248%] md:w-[17.361%]`}
      />

      {/* Pterodactyl. The wings are separate layers so they can beat — the
          design file ships them pre-separated for exactly this. Their
          placement is relative to this box, so only the box moves per
          breakpoint. The mobile mock draws the wings at a slightly different
          angle; since they are animated either way, one set of artwork serves
          both and the box is anchored on the body, which is common to both. */}
      <div className="pointer-events-none absolute top-[-10.971%] left-[37.518%] h-[74.029%] w-[101.972%] md:top-[-17.622%] md:left-[53.472%] md:h-[87.277%] md:w-[70.256%]">
        <Image
          src={pteroWingBackImg}
          alt=""
          aria-hidden
          unoptimized
          className={`${ART} animate-ptero-flap-back top-[26.913%] left-[5.032%] h-[58.019%] w-[46.951%] origin-[80%_30%] motion-reduce:animate-none`}
        />
        <Image
          src={pteroBodyImg}
          alt=""
          aria-hidden
          unoptimized
          className={`${ART} top-[32.531%] left-[23.462%] h-[37.706%] w-[38.055%]`}
        />
        <Image
          src={pteroWingFrontImg}
          alt=""
          aria-hidden
          unoptimized
          className={`${ART} animate-ptero-flap-front top-[14.214%] left-[41.786%] h-[56.072%] w-[47.545%] origin-[10%_60%] motion-reduce:animate-none`}
        />
      </div>
    </section>
  );
}
