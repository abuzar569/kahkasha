"use client";

import { motion } from "framer-motion";
import Tulip from "@/components/Tulip";
import { letter } from "@/lib/content";
import { useReducedMotion } from "@/lib/hooks";

const EASE = [0.22, 1, 0.36, 1];

export default function Letter() {
  const reduced = useReducedMotion();

  const line = (i) => ({
    initial: reduced ? { opacity: 0 } : { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.35 },
    transition: {
      duration: reduced ? 0.4 : 1,
      delay: reduced ? 0 : 0.08 * i,
      ease: EASE,
    },
  });

  return (
    <section className="relative px-5 py-24 sm:px-10 sm:py-32" aria-labelledby="letter-heading">
      <motion.article
        className="paper-card relative mx-auto max-w-[36rem] rounded-[3px] px-6 py-10 shadow-paper sm:px-12 sm:py-14"
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 40, rotate: -0.8 }}
        whileInView={{ opacity: 1, y: 0, rotate: -0.4 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: reduced ? 0.4 : 1.4, ease: EASE }}
      >
        {/* faint tulip watermark in the corner of the page */}
        <Tulip
          tone="blush"
          className="pointer-events-none absolute -right-2 top-6 h-24 w-auto tulip-open opacity-[0.16]"
          stemColor="#C9D0C2"
        />

        <div className="paper-ruled relative">
          <motion.h2
            id="letter-heading"
            className="font-serif text-[clamp(1.8rem,7.5vw,2.3rem)] font-light tracking-tightest text-ink"
            {...line(0)}
          >
            {letter.salutation}
          </motion.h2>

          <div className="mt-7 space-y-6">
            {letter.paragraphs.map((p, i) => (
              <motion.p
                key={p}
                className="pretty font-sans text-[16.5px] leading-[1.78] text-ash"
                {...line(i + 1)}
              >
                {p}
              </motion.p>
            ))}
          </div>

          <motion.p
            className="mt-10 text-right font-hand text-[18px] text-rose"
            {...line(letter.paragraphs.length + 1)}
          >
            {letter.signOff}
          </motion.p>
        </div>
      </motion.article>
    </section>
  );
}
