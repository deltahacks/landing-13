"use client";

import { useEffect, useRef, useState } from "react";
import Question from "~/components/Question";
import { faq_questions } from "~/data/FAQQuestionData";

const MD_BREAKPOINT_PX = 768;

const leftColumnQuestions = faq_questions.filter((_, index) => index % 2 === 0);
const rightColumnQuestions = faq_questions.filter((_, index) => index % 2 === 1);

const FAQ: React.FC = () => {
  const [openLeftColumnIndex, setOpenLeftColumnIndex] = useState<
    number | null
  >(null);
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
    const recompute = () => {
      const outer = outerRef.current;
      const computer = computerRef.current;
      const content = contentRef.current;
      if (!outer || !computer || !content) return;

      if (window.innerWidth < MD_BREAKPOINT_PX) {
        outer.style.minHeight = "";
        return;
      }

      const requiredBelowOuterOffset =
        0.04 * computer.offsetHeight + content.offsetHeight;
      outer.style.minHeight = `${Math.ceil(requiredBelowOuterOffset / 0.92)}px`;
    };

    recompute();

    const resizeObserver = new ResizeObserver(recompute);
    if (computerRef.current) resizeObserver.observe(computerRef.current);
    if (contentRef.current) resizeObserver.observe(contentRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <section
      id="faq"
      className="relative isolate w-full overflow-hidden bg-gradient-to-b from-slate-200 to-slate-300"
    >
      <img
        src="/faq/faq-bg_1x.webp"
        srcSet="/faq/faq-bg_1x.webp 1444w, /faq/faq-bg_2x.webp 2888w, /faq/faq-bg_3x.webp 4332w, /faq/faq-bg_4x.webp 5776w"
        sizes="100vw"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 hidden h-full w-full select-none object-cover min-[1445px]:block"
      />

      <div
        ref={outerRef}
        className="relative mx-auto w-full md:aspect-[1000/1096] md:max-w-[1444px]"
      >
        <div className="absolute inset-0 -z-10 overflow-hidden md:contents">
          <img
            src="/faq/faq-bg_1x.webp"
            srcSet="/faq/faq-bg_1x.webp 1444w, /faq/faq-bg_2x.webp 2888w, /faq/faq-bg_3x.webp 4332w, /faq/faq-bg_4x.webp 5776w"
            sizes="100vw"
            alt=""
            aria-hidden="true"
            className="pointer-events-none h-full w-full select-none object-cover object-left-top md:absolute md:top-0 md:left-0 md:h-full md:w-full md:-z-10 min-[1445px]:hidden"
          />
        </div>

        <div
          ref={computerRef}
          className="relative isolate mx-auto w-full md:absolute md:inset-x-0 md:top-[8%] md:w-[85%]"
        >
          <div className="absolute inset-0 overflow-hidden md:contents">
            <img
              src="/faq/computer_1x.webp"
              srcSet="/faq/computer_1x.webp 1138w, /faq/computer_2x.webp 2276w, /faq/computer_3x.webp 3414w, /faq/computer_4x.webp 4552w"
              sizes="(min-width: 768px) 85vw, 100vw"
              alt=""
              aria-hidden="true"
              className="pointer-events-none h-full w-full select-none object-cover object-left-top md:h-auto md:w-full md:object-fill"
            />
          </div>

          <div
            ref={contentRef}
            className="relative z-10 flex w-full flex-col items-center px-[10%] pt-[12vh] pb-20 md:absolute md:top-[4%] md:left-[8%] md:w-[84%] md:items-stretch md:px-0 md:pt-0 md:pb-16"
          >
            <img
              src="/faq/faq-sticky.svg"
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

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-16 backdrop-blur-md [mask-image:linear-gradient(to_bottom,transparent,black)]"
      />
    </section>
  );
};

export default FAQ;
