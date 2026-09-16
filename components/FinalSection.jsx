"use client";

import { motion } from "framer-motion";
import Tulip from "@/components/Tulip";
import { finale } from "@/lib/content";
import { useReducedMotion } from "@/lib/hooks";

const EASE = [0.22, 1, 0.36, 1];

/* A small, uneven row — a real bunch isn't symmetrical. */
const ROW = [
  { tone: "blush", h: "h-24", delay: 0, dur: 8 },
  { tone: "rose", h: "h-32", delay: 1.1, dur: 9.5 },
  { tone: "ember", h: "h-28", delay: 0.5, dur: 8.6 },
  { tone: "rose", h: "h-36", delay: 1.6, dur: 10.5 },
  { tone: "blush", h: "h-24", delay: 0.8, dur: 9 },
];

export default function FinalSection() {
  const reduced = useReducedMotion();

  const rise = (delay = 0) => ({
    initial: reduced ? { opacity: 0 } : { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.4 },
    transition: { duration: reduced ? 0.4 : 1.2, delay, ease: EASE },
  });

  return (
    <footer className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden px-7 pt-24 sm:px-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[45vh] bg-gradient-to-t from-blush/40 to-transparent"
      />

      <div className="relative mx-auto w-full max-w-[34rem] text-center">
        <motion.p
          className="font-sans text-[16.5px] leading-relaxed text-ash"
          {...rise(0)}
        >
          {finale.line}
        </motion.p>

        <motion.p
          className="mt-6 font-serif text-[clamp(2rem,9vw,2.9rem)] font-light italic leading-[1.15] tracking-tightest text-ember"
          {...rise(0.15)}
        >
          {finale.apology}
        </motion.p>

        <motion.p
          className="mx-auto mt-10 max-w-[28ch] font-hand text-[16.5px] leading-[1.9] text-mute"
          {...rise(0.3)}
        >
          {finale.signature.map((l) => (
            <span key={l} className="block">
              {l}
            </span>
          ))}
        </motion.p>

        <motion.p
          className="mt-12 font-sans text-[15px] tracking-wide text-ash"
          {...rise(0.45)}
        >
          {finale.last}
        </motion.p>
      </div>

      {/* the bunch */}
      <div className="relative mt-16 flex items-end justify-center gap-1 pb-[max(1rem,env(safe-area-inset-bottom))] sm:gap-3">
        {ROW.map((t, i) => (
          <motion.div
            key={i}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: reduced ? 0.4 : 1.3,
              delay: reduced ? 0 : 0.12 * i,
              ease: EASE,
            }}
          >
            <motion.div
              animate={reduced ? undefined : { y: [0, -7, 0], rotate: [0, i % 2 ? 1.6 : -1.6, 0] }}
              transition={{
                duration: t.dur,
                repeat: Infinity,
                ease: "easeInOut",
                delay: t.delay,
              }}
            >
              <Tulip
                tone={t.tone}
                className={`${t.h} w-auto tulip-open opacity-90`}
              />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </footer>
  );
}
