import { useEffect, useRef, useCallback } from "react";

export function useAccordionAnimation(
  detailsRef: React.RefObject<HTMLDetailsElement | null>,
  isOpen: boolean,
  onToggle: () => void,
) {
  const animationRef = useRef<Animation | null>(null);
  const isClosingRef = useRef(false);
  const isExpandingRef = useRef(false);

  const onAnimationFinish = useCallback(
    (open: boolean) => {
      if (!detailsRef.current) return;

      detailsRef.current.open = open;
      animationRef.current = null;
      isClosingRef.current = false;
      isExpandingRef.current = false;

      detailsRef.current.style.height = "";
      detailsRef.current.style.overflow = "";
    },
    [detailsRef],
  );

  const shrink = useCallback(() => {
    if (!detailsRef.current) return;

    const el = detailsRef.current;

    isClosingRef.current = true;

    const startHeight = `${el.offsetHeight}px`;

    const originalOpen = el.open;
    el.open = false;
    const collapsedHeight = el.offsetHeight;
    el.open = originalOpen;

    const endHeight = `${collapsedHeight}px`;

    if (animationRef.current) {
      animationRef.current.cancel();
    }

    animationRef.current = el.animate(
      { height: [startHeight, endHeight] },
      { duration: 200, easing: "ease-out" },
    );

    animationRef.current.onfinish = () => onAnimationFinish(false);
    animationRef.current.oncancel = () => {
      isClosingRef.current = false;
    };
  }, [detailsRef, onAnimationFinish]);

  const expand = useCallback(() => {
    if (!detailsRef.current) return;

    const el = detailsRef.current;

    isExpandingRef.current = true;

    const startHeight = `${el.offsetHeight}px`;

    const originalHeight = el.style.height;
    el.style.height = "auto";
    const naturalHeight = el.offsetHeight;
    el.style.height = originalHeight;

    const endHeight = `${naturalHeight}px`;

    if (animationRef.current) {
      animationRef.current.cancel();
    }

    animationRef.current = el.animate(
      { height: [startHeight, endHeight] },
      { duration: 200, easing: "ease-out" },
    );

    animationRef.current.onfinish = () => onAnimationFinish(true);
    animationRef.current.oncancel = () => {
      isExpandingRef.current = false;
    };
  }, [detailsRef, onAnimationFinish]);

  const open = useCallback(() => {
    if (!detailsRef.current) return;

    const el = detailsRef.current;

    el.style.height = `${el.offsetHeight}px`;
    el.open = true;

    window.requestAnimationFrame(() => expand());
  }, [detailsRef, expand]);

  const onClick = useCallback(
    (e: Event) => {
      if (!detailsRef.current) return;

      e.preventDefault();
      detailsRef.current.style.overflow = "hidden";

      onToggle();
    },
    [detailsRef, onToggle],
  );

  useEffect(() => {
    if (!detailsRef.current) return;

    const el = detailsRef.current;
    const currentlyOpen = el.open;

    if (isClosingRef.current || isExpandingRef.current) return;

    if (isOpen && !currentlyOpen) {
      el.style.overflow = "hidden";
      open();
    } else if (!isOpen && currentlyOpen) {
      el.style.overflow = "hidden";
      shrink();
    }
  }, [isOpen, detailsRef, open, shrink]);

  useEffect(() => {
    const el = detailsRef.current;
    if (!el) return;

    const summary = el.querySelector("summary");
    if (!summary) return;

    summary.addEventListener("click", onClick);

    return () => {
      summary.removeEventListener("click", onClick);
      if (animationRef.current) {
        animationRef.current.cancel();
      }
    };
  }, [detailsRef, onClick]);
}
