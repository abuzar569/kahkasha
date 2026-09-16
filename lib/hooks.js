"use client";

import { useEffect, useLayoutEffect, useState } from "react";

/**
 * useLayoutEffect on the client, useEffect on the server.
 * Prevents the React SSR warning while still letting GSAP set its
 * "from" states before the browser paints (no flash of unstyled text).
 */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * True when the person has asked their phone/computer to reduce motion.
 * Starts as false on the server so markup matches on hydration.
 */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();

    if (mq.addEventListener) {
      mq.addEventListener("change", update);
      return () => mq.removeEventListener("change", update);
    }
    mq.addListener(update);
    return () => mq.removeListener(update);
  }, []);

  return reduced;
}

/** True once the component has mounted in the browser. */
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
