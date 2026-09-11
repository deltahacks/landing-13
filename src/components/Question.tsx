"use client";
import React, { useRef } from "react";
import { useAccordionAnimation } from "~/hooks/useAccordionAnimation";

export interface QuestionType {
  question: string;
  answer: string;
}

type QuestionProps = QuestionType & {
  isOpen: boolean;
  onToggle: () => void;
};

const Question: React.FC<QuestionProps> = ({
  question,
  answer,
  isOpen,
  onToggle,
}) => {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  useAccordionAnimation(detailsRef, isOpen, onToggle);

  return (
    <details
      ref={detailsRef}
      className={`group w-full ${isOpen ? "open" : ""}`}
    >
      <summary className="flex min-h-[46px] w-full cursor-pointer list-none items-center justify-between gap-3 rounded-lg bg-gradient-to-b from-[#4F758E] to-[#748A98] px-3 py-2 text-left text-base font-medium text-white shadow-[0_2px_2.3px_0_rgba(0,0,0,0.25),inset_0_-2px_9.3px_0_rgba(0,0,0,0.06)] transition-[filter] hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:min-h-[56px] md:px-4 md:py-3 2xl:min-h-[76px] 2xl:px-6 2xl:py-4 2xl:text-xl">
        <span>{question}</span>
        <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-red-400 shadow-sm 2xl:h-10 2xl:w-10">
          <svg
            viewBox="0 0 20 20"
            fill="none"
            className={`h-5 w-5 text-white transition-transform duration-200 2xl:h-6 2xl:w-6 ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            <path
              d="M5 7.5L10 12.5L15 7.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </summary>
      <div className="content w-full rounded-b-lg bg-white px-5 py-5 text-base leading-relaxed text-slate-800 shadow-[0_2px_2.3px_0_rgba(0,0,0,0.25)] 2xl:px-7 2xl:py-6 2xl:text-lg">
        {answer}
      </div>
    </details>
  );
};

export default Question;
