"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Drawer } from "vaul";
import clsx from "clsx";

import Logo from "./svgs/Logo";
import InstagramIcon from "./svgs/InstagramIcon";
import LinkedinIcon from "./svgs/LinkedinIcon";
import DevpostIcon from "./svgs/DevpostIcon";
import TiktokIcon from "./svgs/TiktokIcon";
import MenuIcon from "./svgs/MenuIcon";
import CloseIcon from "./svgs/CloseIcon";
import MLHTrustBadge from "./svgs/MLHTrustBadge";

// Anchor targets for the site's sections. These sections don't exist yet —
// links safely no-op until they ship with matching IDs.
const sectionLinks = [
  { label: "About", href: "#about" },
  { label: "Statistics", href: "#statistics" },
  { label: "Speakers", href: "#speakers" },
  { label: "Sponsors", href: "#sponsors" },
  { label: "FAQ", href: "#faq" },
];

// TODO: confirm final social URLs before merge.
const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/deltahacks",
    Icon: InstagramIcon,
    placeholder: false,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/deltahacks",
    Icon: LinkedinIcon,
    placeholder: false,
  },
  {
    // TODO: replace with the real Devpost URL once the DH13 Devpost exists.
    label: "Devpost",
    href: "#",
    Icon: DevpostIcon,
    placeholder: true,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@deltahacks",
    Icon: TiktokIcon,
    placeholder: false,
  },
];

// TODO: confirm the approved MLH badge URL before merge, and verify the badge
// art renders the 2027 season (the year is drawn as vector paths).
const MLH_BADGE_URL =
  "https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2027-season&utm_content=black";

const focusRing =
  "rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);

  const hideSidebar = () => setOpen(false);

  // Subscribes once (lastScrollY lives in a ref, so the effect has no deps).
  // Desktop: always visible + frosted backdrop after a small scroll.
  // Mobile: hide while scrolling down past 100px, reveal while scrolling up.
  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 8);

      if (window.innerWidth < 768) {
        if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
          setIsNavVisible(false);
        } else if (currentScrollY < lastScrollY.current) {
          setIsNavVisible(true);
        }
      } else {
        setIsNavVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", controlNavbar, { passive: true });
    return () => window.removeEventListener("scroll", controlNavbar);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full">
      <nav
        aria-label="Primary"
        className={clsx(
          "text-ink relative flex w-full items-center justify-between gap-4 px-5 py-3 transition-all duration-300 ease-in-out md:px-10",
          scrolled
            ? "bg-white/70 shadow-sm backdrop-blur-md"
            : "bg-transparent",
          !isNavVisible && "-translate-y-[240%] md:translate-y-0",
        )}
      >
        {/* Left: logo + desktop section links */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            aria-label="DeltaHacks home"
            className={clsx("shrink-0", focusRing)}
          >
            <Logo className="h-9 w-9" />
          </Link>

          <ul className="hidden items-center gap-6 md:flex lg:gap-9">
            {sectionLinks.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={clsx(
                    "text-sm font-medium transition-opacity hover:opacity-60 lg:text-base",
                    focusRing,
                  )}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right (desktop): social links, with room reserved for the badge */}
        <div className="hidden items-center gap-5 md:flex md:pr-24 lg:pr-28">
          {socialLinks.map(({ label, href, Icon, placeholder }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              aria-disabled={placeholder || undefined}
              target={placeholder ? undefined : "_blank"}
              rel="noopener noreferrer"
              onClick={placeholder ? (e) => e.preventDefault() : undefined}
              className={clsx(
                "transition-opacity hover:opacity-60",
                placeholder && "cursor-default opacity-50",
                focusRing,
              )}
            >
              <Icon className="h-6 w-6" />
            </a>
          ))}
        </div>

        {/* MLH trust badge — hangs from the top-right corner on all viewports */}
        <a
          id="mlh-trust-badge"
          href={MLH_BADGE_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="MLH Trust Badge"
          className={clsx(
            "absolute top-0 right-16 z-30 block w-11 md:right-6 md:w-20",
            focusRing,
          )}
        >
          <MLHTrustBadge className="h-auto w-full" />
        </a>

        {/* Right (mobile): hamburger + drawer */}
        <div className="md:hidden">
          <Drawer.Root
            direction="right"
            open={open}
            onOpenChange={setOpen}
            noBodyStyles
          >
            <Drawer.Trigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                aria-expanded={open}
                aria-controls="mobile-nav-drawer"
                className={clsx("p-1", focusRing)}
              >
                <MenuIcon className="h-7 w-7" />
              </button>
            </Drawer.Trigger>

            <Drawer.Portal>
              <Drawer.Overlay className="fixed inset-0 z-40 bg-black/40" />
              <Drawer.Content
                id="mobile-nav-drawer"
                // Prevents focus jumping on close (vaul issue #569).
                onCloseAutoFocus={(e) => e.preventDefault()}
                className="text-ink fixed inset-y-0 right-0 z-50 flex h-full w-4/5 max-w-xs flex-col bg-gradient-to-b from-[#e8f6fd] to-[#cfeaf7] outline-none"
              >
                <Drawer.Title className="sr-only">Navigation Menu</Drawer.Title>

                <div className="flex justify-end p-5">
                  <button
                    type="button"
                    aria-label="Close menu"
                    onClick={hideSidebar}
                    className={clsx("p-1", focusRing)}
                  >
                    <CloseIcon className="h-6 w-6" />
                  </button>
                </div>

                <nav
                  aria-label="Mobile"
                  className="flex flex-1 flex-col justify-between px-8 pb-12"
                >
                  <ul className="flex flex-col gap-6 text-xl font-medium">
                    {sectionLinks.map(({ label, href }) => (
                      <li key={href}>
                        <Link
                          href={href}
                          onClick={hideSidebar}
                          className={clsx("inline-block", focusRing)}
                        >
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center gap-5">
                    {socialLinks.map(({ label, href, Icon, placeholder }) => (
                      <a
                        key={label}
                        href={href}
                        aria-label={label}
                        aria-disabled={placeholder || undefined}
                        target={placeholder ? undefined : "_blank"}
                        rel="noopener noreferrer"
                        onClick={
                          placeholder ? (e) => e.preventDefault() : hideSidebar
                        }
                        className={clsx(
                          "transition-opacity hover:opacity-60",
                          placeholder && "cursor-default opacity-50",
                          focusRing,
                        )}
                      >
                        <Icon className="h-8 w-8" />
                      </a>
                    ))}
                  </div>
                </nav>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
