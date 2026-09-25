import clsx from "clsx";

import TeamCarousel from "~/components/TeamCarousel";
import { COPYRIGHT_TEXT, footerLinks } from "~/data/FooterData";

import footerBg1x from "~/assets/footer/footer-bg_1x.webp";
import footerBg2x from "~/assets/footer/footer-bg_2x.webp";
import footerBg3x from "~/assets/footer/footer-bg_3x.webp";
import footerBg4x from "~/assets/footer/footer-bg_4x.webp";
import footerBgMobile1x from "~/assets/footer/footer-bg-mobile_1x.webp";
import footerBgMobile2x from "~/assets/footer/footer-bg-mobile_2x.webp";
import footerBgMobile3x from "~/assets/footer/footer-bg-mobile_3x.webp";
import footerBgMobile4x from "~/assets/footer/footer-bg-mobile_4x.webp";
import seamFade1x from "~/assets/footer/seam-fade_1x.webp";
import seamFade2x from "~/assets/footer/seam-fade_2x.webp";
import seamFade3x from "~/assets/footer/seam-fade_3x.webp";
import seamFade4x from "~/assets/footer/seam-fade_4x.webp";
import seamFadeMobile1x from "~/assets/footer/seam-fade-mobile_1x.webp";
import seamFadeMobile2x from "~/assets/footer/seam-fade-mobile_2x.webp";
import seamFadeMobile3x from "~/assets/footer/seam-fade-mobile_3x.webp";
import seamFadeMobile4x from "~/assets/footer/seam-fade-mobile_4x.webp";

const focusRing =
  "rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent";

/**
 * The green footer bar beneath the campfire scene. The plate is a vertical
 * gradient, so it stretches behind flowed content rather than being locked to
 * the 1440x289 export ratio — the links stay readable if the type ever wraps.
 */
const Footer: React.FC = () => (
  // `overflow-x-clip` rather than `overflow-hidden`: the seam fade is wider
  // than the frame and must not add page-level horizontal scroll, but it also
  // has to spill vertically above the top edge. `clip` bounds one axis without
  // forcing the other into a scroll container, which `hidden` would.
  <footer className="@container relative isolate w-full overflow-x-clip">
    <img
      src={footerBgMobile1x.src}
      srcSet={`${footerBgMobile1x.src} 402w, ${footerBgMobile2x.src} 804w, ${footerBgMobile3x.src} 1206w, ${footerBgMobile4x.src} 1608w`}
      sizes="100vw"
      alt=""
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover select-none md:hidden"
    />
    <img
      src={footerBg1x.src}
      srcSet={`${footerBg1x.src} 1440w, ${footerBg2x.src} 2880w, ${footerBg3x.src} 4320w, ${footerBg4x.src} 5760w`}
      sizes="100vw"
      alt=""
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 hidden h-full w-full object-cover select-none md:block"
    />

    {/* Feathered band over the seam with the scene above. Exported wider than
        the frame (1466 vs 1440) because the last ~13px at each end ramp down,
        so the bleed pushes that falloff off screen. */}
    <img
      src={seamFadeMobile1x.src}
      srcSet={`${seamFadeMobile1x.src} 434w, ${seamFadeMobile2x.src} 868w, ${seamFadeMobile3x.src} 1302w, ${seamFadeMobile4x.src} 1736w`}
      sizes="108vw"
      alt=""
      aria-hidden="true"
      className="pointer-events-none absolute top-0 -left-[4%] -z-[5] h-[43px] w-[108%] max-w-none -translate-y-1/2 select-none md:hidden"
    />
    <img
      src={seamFade1x.src}
      srcSet={`${seamFade1x.src} 1466w, ${seamFade2x.src} 2932w, ${seamFade3x.src} 4398w, ${seamFade4x.src} 5864w`}
      sizes="102vw"
      alt=""
      aria-hidden="true"
      className="pointer-events-none absolute top-0 -left-[1%] -z-[5] hidden h-[43px] w-[102%] max-w-none -translate-y-1/2 select-none md:block"
    />

    <TeamCarousel />

    <nav
      aria-label="Footer"
      className="font-display mt-[calc(-2.04px_+_4.2389cqw)] flex flex-wrap items-center justify-center gap-x-[calc(13.48px_+_2.1195cqw)] gap-y-2 px-4 text-[calc(8.963px_+_0.7803cqw)] text-white"
    >
      {footerLinks.map(({ label, href }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={clsx("transition-opacity hover:opacity-70", focusRing)}
        >
          {label}
        </a>
      ))}
    </nav>

    <p className="font-display mt-[calc(3.929px_+_1.7341cqw)] pb-[calc(50.206px_+_1.7148cqw)] text-center text-[calc(9.779px_+_1.0501cqw)] text-white">
      {COPYRIGHT_TEXT}
    </p>
  </footer>
);

export default Footer;
