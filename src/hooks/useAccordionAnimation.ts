import { useEffect, useRef, useCallback } from "react";

const ANIMATION_DURATION_MS = 200;

export function useAccordionAnimation(
  detailsRef: React.RefObject<HTMLDetailsElement | null>,
  isOpen: boolean,
  onToggle: () => void,
) {
  const animationRef = useRef<Animation | null>(null);
  const rafIdRef = useRef<number | null>(null);
  // Target state of the in-flight animation, or null when idle.
  const animatingToRef = useRef<boolean | null>(null);

  const onToggleRef = useRef(onToggle);
  onToggleRef.current = onToggle;

  const cancelPending = useCallback(() => {
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    if (animationRef.current) {
      animationRef.current.cancel();
      animationRef.current = null;
    }
  }, []);

  const onAnimationFinish = useCallback(
    (open: boolean) => {
      if (!detailsRef.current) return;

      detailsRef.current.open = open;
      animationRef.current = null;
      animatingToRef.current = null;

      detailsRef.current.style.height = "";
      detailsRef.current.style.overflow = "";
    },
    [detailsRef],
  );

  const shrink = useCallback(() => {
    if (!detailsRef.current) return;

    const el = detailsRef.current;

    cancelPending();

    const startHeight = `${el.offsetHeight}px`;

    const originalOpen = el.open;
    el.open = false;
    const collapsedHeight = el.offsetHeight;
    el.open = originalOpen;

    const endHeight = `${collapsedHeight}px`;

    animationRef.current = el.animate(
      { height: [startHeight, endHeight] },
      { duration: ANIMATION_DURATION_MS, easing: "ease-out" },
    );

    animationRef.current.onfinish = () => onAnimationFinish(false);
  }, [detailsRef, onAnimationFinish, cancelPending]);

  const expand = useCallback(() => {
    if (!detailsRef.current) return;

    const el = detailsRef.current;

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
      { duration: ANIMATION_DURATION_MS, easing: "ease-out" },
    );

    animationRef.current.onfinish = () => onAnimationFinish(true);
  }, [detailsRef, onAnimationFinish]);

  const open = useCallback(() => {
    if (!detailsRef.current) return;

    const el = detailsRef.current;

    cancelPending();

    el.style.height = `${el.offsetHeight}px`;
    el.open = true;

    rafIdRef.current = window.requestAnimationFrame(() => {
      rafIdRef.current = null;
      expand();
    });
  }, [detailsRef, expand, cancelPending]);

  const onClick = useCallback(
    (e: Event) => {
      if (!detailsRef.current) return;

      e.preventDefault();
      detailsRef.current.style.overflow = "hidden";

      onToggleRef.current();
    },
    [detailsRef],
  );

  useEffect(() => {
    const el = detailsRef.current;
    if (!el) return;

    const isAnimating = animatingToRef.current !== null;
    const currentlyOpen = isAnimating ? animatingToRef.current : el.open;

    if (currentlyOpen === isOpen) return;

    animatingToRef.current = isOpen;
    el.style.overflow = "hidden";

    if (isOpen) {
      open();
    } else {
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
      cancelPending();
    };
  }, [detailsRef, onClick, cancelPending]);
}
