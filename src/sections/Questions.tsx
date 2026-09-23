import { CONTACT_EMAIL } from "~/data/FooterData";

import questionsBg1x from "~/assets/footer/questions-bg_1x.webp";
import questionsBg2x from "~/assets/footer/questions-bg_2x.webp";
import questionsBg3x from "~/assets/footer/questions-bg_3x.webp";
import questionsBg4x from "~/assets/footer/questions-bg_4x.webp";
import questionsBgMobile1x from "~/assets/footer/questions-bg-mobile_1x.webp";
import questionsBgMobile2x from "~/assets/footer/questions-bg-mobile_2x.webp";
import questionsBgMobile3x from "~/assets/footer/questions-bg-mobile_3x.webp";
import questionsBgMobile4x from "~/assets/footer/questions-bg-mobile_4x.webp";

const focusRing =
  "rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent";

/**
 * "Still got questions?" — the campfire scene above the footer bar.
 *
 * The artwork is a clean plate; every string and link is live HTML
 * positioned over it, at percentages measured from the Figma composite.
 */
const Questions: React.FC = () => (
  <section
    id="questions"
    className="relative isolate w-full scroll-mt-20 overflow-hidden bg-[#4b5d9b] md:bg-[#5961a2]"
  >
    {/* `@container` resolves the cqw units below against this box, so the copy
        scales with the artwork. It also implies `contain: layout`, making this
        a stacking context — which is why the sky colour sits on the <section>
        and not here, and why the plates below rely on DOM order, not z-index. */}
    <div className="@container relative aspect-[669/450] w-full md:aspect-[1446/816]">
      <img
        src={questionsBgMobile1x.src}
        srcSet={`${questionsBgMobile1x.src} 669w, ${questionsBgMobile2x.src} 1338w, ${questionsBgMobile3x.src} 2007w, ${questionsBgMobile4x.src} 2676w`}
        sizes="100vw"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -top-[0.9%] left-0 h-[100.9%] w-full object-cover select-none md:hidden"
      />
      <img
        src={questionsBg1x.src}
        srcSet={`${questionsBg1x.src} 1446w, ${questionsBg2x.src} 2892w, ${questionsBg3x.src} 4338w, ${questionsBg4x.src} 5784w`}
        sizes="100vw"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden h-full w-full object-cover select-none md:block"
      />

      {/* Each plate's own measured position (mobile 669x450, desktop 1440x816). */}
      <div className="absolute top-[14.4%] left-[34.8%] w-[58%] text-white md:top-[24.1%] md:left-[41.25%] md:w-[42%]">
        <h2 className="font-display text-[max(1.15rem,2.22cqw)] leading-tight">
          Still got questions?
        </h2>

        <p className="mt-[0.55em] max-w-[28.6em] text-[max(0.75rem,1.111cqw)] leading-[1.5]">
          Reach out to us at{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className={`underline underline-offset-2 transition-opacity hover:opacity-70 ${focusRing}`}
          >
            {CONTACT_EMAIL}
          </a>{" "}
          or any of our socials for more updates!
        </p>
      </div>
    </div>
  </section>
);

export default Questions;
