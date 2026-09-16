"use client";

import { motion } from "framer-motion";
import Tulip from "@/components/Tulip";
import { hero } from "@/lib/content";
import { useReducedMotion } from "@/lib/hooks";

const EASE = [0.22, 1, 0.36, 1];

export default function Hero() {
  const reduced = useReducedMotion();
  // Wait for the opening overlay to lift before anything here moves.
  const base = reduced ? 0.1 : 2.3;

  const scrollToApology = () => {
    document.getElementById("apology")?.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "start",
    });
  };

  const rise = (delay) => ({
    initial: reduced ? { opacity: 0 } : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduced ? 0.4 : 1.1, delay, ease: EASE },
  });

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden px-7 pb-10 pt-[max(4.5rem,env(safe-area-inset-top))] sm:px-10">
      {/* soft wash behind the type */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-[60vh] w-[60vh] rounded-full bg-blush/45 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-1/3 h-[40vh] w-[40vh] rounded-full bg-ivory blur-3xl"
      />

      <div className="relative">
        <motion.p
          className="font-serif text-[clamp(2.4rem,11vw,3.6rem)] leading-[1.05] tracking-tightest text-ink"
          {...rise(base)}
        >
          {hero.greeting}
        </motion.p>

        <motion.h1
          className="mt-1 max-w-[16ch] font-serif text-[clamp(2.4rem,11vw,3.6rem)] font-light italic leading-[1.08] tracking-tightest text-ember"
          {...rise(base + 0.35)}
        >
          {hero.line}
        </motion.h1>

        <motion.div
          className="mt-7 max-w-[30ch] space-y-1 font-sans text-[15.5px] leading-relaxed text-ash"
          {...rise(base + 0.85)}
        >
          {hero.sub.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </motion.div>
      </div>

      {/* tulip */}
      <motion.div
        className="relative mx-auto -mb-6 mt-8 w-[58%] max-w-[240px]"
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: reduced ? 0.4 : 1.8, delay: base + 0.2, ease: EASE }}
      >
        <motion.div
          animate={reduced ? undefined : { y: [0, -12, 0], rotate: [0, 1.4, 0] }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: base + 1.5,
          }}
        >
          <Tulip
            tone="rose"
            className="h-auto w-full tulip-open drop-shadow-[0_18px_28px_rgba(168,62,69,0.14)]"
            title="A tulip"
          />
        </motion.div>
      </motion.div>

      {/* scroll hint */}
      <motion.button
        type="button"
        onClick={scrollToApology}
        className="relative flex flex-col items-center gap-2 border-0 bg-transparent p-0 text-current outline-none focus-visible:ring-2 focus-visible:ring-rose-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: base + 1.8 }}
        aria-label="Scroll to the apology section"
      >
        <span className="font-hand text-[15px] text-mute">{hero.scrollHint}</span>
        <motion.span
          aria-hidden="true"
          className="block h-8 w-px bg-gradient-to-b from-transparent to-mute/60"
          animate={reduced ? undefined : { opacity: [0.3, 1, 0.3], y: [0, 5, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.button>
    </section>
  );
}
