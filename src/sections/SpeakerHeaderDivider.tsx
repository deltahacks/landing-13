import Image from "next/image";

import birthOfVenus from "~/assets/speakers/transition/birth-of-venus.webp";
import monaDino from "~/assets/speakers/transition/mona-dino.webp";
import starryNight from "~/assets/speakers/transition/starry-night.webp";
import waterLilies from "~/assets/speakers/transition/water-lilies.webp";

/**
 * Decorative artwork at the Stats → Speakers seam. This takes no document
 * space: the artwork deliberately floats above the two neighbouring sections.
 */
export default function SpeakerHeaderDivider() {
  return (
    <div
      aria-hidden="true"
      className="relative z-30 h-0 w-full overflow-visible"
    >
      <div className="pointer-events-none absolute top-[-50vw] right-0 left-0 h-[90vw] overflow-visible md:top-[-23vw] md:h-[43vw]">
        <Image
          src={starryNight}
          alt=""
          priority
          sizes="(max-width: 767px) 76vw, 38vw"
          className="absolute top-[29%] left-[-25%] z-10 h-auto w-[76%] max-w-none md:top-[13%] md:-left-[9%] md:w-[43%]"
        />
        <Image
          src={monaDino}
          alt=""
          priority
          sizes="(max-width: 767px) 72vw, 38vw"
          className="absolute top-[14%] left-[20%] z-20 h-auto w-[72%] max-w-none md:top-[-3%] md:left-[18%] md:w-[43%]"
        />
        <Image
          src={birthOfVenus}
          alt=""
          priority
          sizes="(max-width: 767px) 70vw, 37vw"
          className="absolute top-[32%] left-[65%] z-30 h-auto w-[70%] max-w-none md:top-[19%] md:left-[46%] md:w-[43%]"
        />
        <Image
          src={waterLilies}
          alt=""
          priority
          sizes="38vw"
          className="absolute top-[23%] left-[76%] z-40 hidden h-auto w-[37%] max-w-none md:top-[0%] md:left-[72%] md:block md:w-[43%]"
        />
      </div>
    </div>
  );
}
