"use client";

import { useEffect, useRef, useState } from "react";
import Question from "~/components/Question";
import { faq_questions } from "~/data/FAQQuestionData";
import computer1x from "~/assets/faq/computer_1x.webp";
import computer2x from "~/assets/faq/computer_2x.webp";
import computer3x from "~/assets/faq/computer_3x.webp";
import computer4x from "~/assets/faq/computer_4x.webp";
import faqBg1x from "~/assets/faq/faq-bg_1x.webp";
import faqBg2x from "~/assets/faq/faq-bg_2x.webp";
import faqBg3x from "~/assets/faq/faq-bg_3x.webp";
import faqBg4x from "~/assets/faq/faq-bg_4x.webp";
import faqSticky from "~/assets/faq/faq-sticky.svg";

const MD_BREAKPOINT_PX = 768;
// Mirrors the `md:top-[8%]` offset applied to the computer image below.
const COMPUTER_TOP_OFFSET_RATIO = 0.08;
const COMPUTER_VISIBLE_HEIGHT_RATIO = 1 - COMPUTER_TOP_OFFSET_RATIO;
// Mirrors the `right-[4%]` margin reserved for the dino mascot artwork.
const DINO_MARGIN_RATIO = 0.04;

const leftColumnQuestions = faq_questions.filter((_, index) => index % 2 === 0);
const rightColumnQuestions = faq_questions.filter(
  (_, index) => index % 2 === 1,
);

const FAQ: React.FC = () => {
  const [openLeftColumnIndex, setOpenLeftColumnIndex] = useState<number | null>(
    null,
  );
  const [openRightColumnIndex, setOpenRightColumnIndex] = useState<
    number | null
  >(null);
  const [openMobileIndex, setOpenMobileIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const handleLeftColumnToggle = (index: number) =>
    setOpenLeftColumnIndex((prev) => (prev === index ? null : index));
  const handleRightColumnToggle = (index: number) =>
    setOpenRightColumnIndex((prev) => (prev === index ? null : index));
  const handleMobileToggle = (index: number) =>
    setOpenMobileIndex((prev) => (prev === index ? null : index));

  useEffect(() => {
    const updateIsMobile = () =>
      setIsMobile(window.innerWidth < MD_BREAKPOINT_PX);
    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);
    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  const outerRef = useRef<HTMLDivElement>(null);
  const computerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mobileLayoutKey = "";
    const recompute = () => {
      const outer = outerRef.current;
      const computer = computerRef.current;
      const content = contentRef.current;
      if (!outer || !computer || !content) return;

      if (window.innerWidth < MD_BREAKPOINT_PX) {
        outer.style.minHeight = "";
        // Opening an answer also triggers this observer. Skip measuring again unless the viewport, fonts, or sticky image size has changed.
        const layoutKey = `${content.clientWidth}:${window.innerHeight}:${document.fonts.status}:${content.querySelector("img")?.offsetHeight}`;
        if (layoutKey === mobileLayoutKey) return;
        mobileLayoutKey = layoutKey;

        // Measure a hidden copy so we don't open or change any of the real cards.
        const measurement = content.cloneNode(true) as HTMLDivElement;
        measurement.setAttribute("aria-hidden", "true");
        measurement.inert = true;
        measurement.style.cssText = "position:absolute;visibility:hidden;";
        const questions = Array.from(measurement.querySelectorAll("details"));
        // Open every copied answer and clear any height left by an animation so we can measure the full text.
        for (const question of questions) {
          question.open = true;
          question.style.height = "";
          question.style.overflow = "";
        }
        computer.appendChild(measurement);
        // Subtract the question header to get just the space each answer adds.
        const answerHeights = questions.map(
          (question) =>
            question.getBoundingClientRect().height -
            (question.querySelector("summary")?.getBoundingClientRect()
              .height ?? 0),
        );
        // Start with everything open, subtract all the answers, then add back the tallest one.
        const reservedHeight =
          measurement.getBoundingClientRect().height -
          answerHeights.reduce((total, height) => total + height, 0) +
          Math.max(0, ...answerHeights);
        measurement.remove();
        // Keep this much room even when the cards are closed, so opening one doesn't make the container taller and resize both art layers.
        computer.style.setProperty(
          "--faq-mobile-min-height",
          `${Math.ceil(reservedHeight)}px`,
        );
        return;
      }

      // Measure again if we resize back to the mobile layout later.
      mobileLayoutKey = "";
      const requiredBelowOuterOffset =
        DINO_MARGIN_RATIO * computer.offsetHeight + content.offsetHeight;
      outer.style.minHeight = `${Math.ceil(requiredBelowOuterOffset / COMPUTER_VISIBLE_HEIGHT_RATIO)}px`;
    };

    recompute();

    const resizeObserver = new ResizeObserver(recompute);
    if (computerRef.current) resizeObserver.observe(computerRef.current);
    if (contentRef.current) resizeObserver.observe(contentRef.current);

    // The final font can wrap answers differently, so refresh the reserved height once it loads, even if the viewport hasn't changed.
    const onFontsLoaded = () => {
      if (window.innerWidth >= MD_BREAKPOINT_PX) return;
      mobileLayoutKey = "";
      recompute();
    };
    document.fonts.addEventListener("loadingdone", onFontsLoaded);

    return () => {
      resizeObserver.disconnect();
      document.fonts.removeEventListener("loadingdone", onFontsLoaded);
    };
  }, []);

  return (
    <div className="relative w-full">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-48 -translate-y-1/2 [mask-image:linear-gradient(to_bottom,transparent,black,transparent)] backdrop-blur-xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-48 translate-y-1/2 [mask-image:linear-gradient(to_bottom,transparent,black,transparent)] backdrop-blur-xl"
      />
      <section
        id="faq"
        className="relative isolate w-full scroll-mt-20 overflow-hidden bg-gradient-to-b from-slate-200 to-slate-300"
      >
        <img
          src={faqBg1x.src}
          srcSet={`${faqBg1x.src} 1444w, ${faqBg2x.src} 2888w, ${faqBg3x.src} 4332w, ${faqBg4x.src} 5776w`}
          sizes="100vw"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-20 hidden h-full w-full object-cover select-none min-[1445px]:block"
        />

        <div
          ref={outerRef}
          className="relative mx-auto w-full md:aspect-[1000/1096] md:max-w-[1444px]"
        >
          <div className="absolute inset-0 -z-10 overflow-hidden md:contents">
            <img
              src={faqBg1x.src}
              srcSet={`${faqBg1x.src} 1444w, ${faqBg2x.src} 2888w, ${faqBg3x.src} 4332w, ${faqBg4x.src} 5776w`}
              sizes="100vw"
              alt=""
              aria-hidden="true"
              className="pointer-events-none h-full w-full object-cover object-left-top select-none min-[1445px]:hidden md:absolute md:top-0 md:left-0 md:-z-10 md:h-full md:w-full"
            />
          </div>

          {/* Reserved for future dinosaur mascot artwork (decorative, layered like last year's FAQShelf) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-[4%] bottom-0 z-10 hidden md:block"
          />

          <div
            ref={computerRef}
            className="relative isolate mx-auto w-full max-md:min-h-[var(--faq-mobile-min-height)] md:absolute md:inset-x-0 md:top-[8%] md:w-[85%]"
          >
            <div className="absolute inset-0 overflow-hidden md:contents">
              <img
                src={computer1x.src}
                srcSet={`${computer1x.src} 1138w, ${computer2x.src} 2276w, ${computer3x.src} 3414w, ${computer4x.src} 4552w`}
                sizes="(min-width: 768px) 85vw, 100vw"
                alt=""
                aria-hidden="true"
                className="pointer-events-none h-full w-full object-cover object-left-top select-none md:h-auto md:w-full md:object-fill"
              />
            </div>

            <div
              ref={contentRef}
              className="relative z-10 flex w-full flex-col items-center px-[10%] pt-[12vh] pb-20 md:absolute md:top-[4%] md:left-[8%] md:w-[84%] md:items-stretch md:px-0 md:pt-0 md:pb-16"
            >
              <img
                src={faqSticky.src}
                alt=""
                aria-hidden="true"
                className="pointer-events-none z-10 w-[32%] -rotate-3 select-none md:w-[18%] md:self-center"
              />

              <div className="mt-6 flex w-full flex-col gap-3 md:mt-10 md:flex-row md:gap-6 2xl:mt-14 2xl:gap-8">
                <div className="flex flex-1 flex-col gap-3 2xl:gap-4">
                  {leftColumnQuestions.map(({ question, answer }, index) => {
                    const globalIndex = index * 2;
                    return (
                      <Question
                        key={question}
                        question={question}
                        answer={answer}
                        isOpen={
                          isMobile
                            ? openMobileIndex === globalIndex
                            : openLeftColumnIndex === index
                        }
                        onToggle={() =>
                          isMobile
                            ? handleMobileToggle(globalIndex)
                            : handleLeftColumnToggle(index)
                        }
                      />
                    );
                  })}
                </div>
                <div className="flex flex-1 flex-col gap-3 2xl:gap-4">
                  {rightColumnQuestions.map(({ question, answer }, index) => {
                    const globalIndex = index * 2 + 1;
                    return (
                      <Question
                        key={question}
                        question={question}
                        answer={answer}
                        isOpen={
                          isMobile
                            ? openMobileIndex === globalIndex
                            : openRightColumnIndex === index
                        }
                        onToggle={() =>
                          isMobile
                            ? handleMobileToggle(globalIndex)
                            : handleRightColumnToggle(index)
                        }
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
