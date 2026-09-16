"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Tulip from "@/components/Tulip";
import { useReducedMotion } from "@/lib/hooks";

/**
 * A short, quiet opening. Locks scrolling for ~2s so the page doesn't
 * start halfway down, then lifts away like a sheet of paper.
 */
export default function Preloader() {
  const reduced = useReducedMotion();
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    const { style } = document.body;
    const previous = style.overflow;
    style.overflow = "hidden";

    const t = setTimeout(() => setDone(true), reduced ? 300 : 2100);

    return () => {
      clearTimeout(t);
      style.overflow = previous;
    };
  }, [reduced]);

  useEffect(() => {
    if (done) document.body.style.overflow = "";
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-cream px-8"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: reduced ? 0 : -24 }}
          transition={{ duration: reduced ? 0.2 : 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <Tulip
              tone="blush"
              className="h-20 w-auto tulip-open"
              stemColor="#B9C2B0"
            />
          </motion.div>

          <motion.p
            className="mt-6 font-hand text-[17px] text-mute"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            for Kahkasha
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
