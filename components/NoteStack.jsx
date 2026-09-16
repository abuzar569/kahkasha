"use client";

import { motion } from "framer-motion";
import { littleThings } from "@/lib/content";
import { useReducedMotion } from "@/lib/hooks";

const EASE = [0.22, 1, 0.36, 1];

export default function NoteStack() {
  const reduced = useReducedMotion();

  return (
    <section className="relative px-7 py-20 sm:px-10 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <motion.p
          className="text-center font-hand text-[28px] text-ember"
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: reduced ? 0.2 : 0.9, ease: EASE }}
        >
          {littleThings.eyebrow}
        </motion.p>

        <motion.h2
          className="mt-3 text-center font-serif text-[clamp(2.1rem,5vw,3.15rem)] leading-none text-ink"
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: reduced ? 0.2 : 1.1, delay: 0.08, ease: EASE }}
        >
          {littleThings.heading}
        </motion.h2>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {littleThings.items.map((item, index) => (
            <motion.article
              key={item.title}
              className="paper-card rounded-[3px] p-6 shadow-paper"
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                duration: reduced ? 0.2 : 0.8,
                delay: index * 0.12,
                ease: EASE,
              }}
            >
              <div className="flex items-center justify-between gap-3 border-b border-ink/10 pb-3">
                <span className="font-hand text-[24px] text-ember">{item.title}</span>
                <span className="text-[11px] uppercase tracking-[0.22em] text-mute">
                  {index + 1}
                </span>
              </div>

              <p className="mt-5 text-[15px] leading-7 text-ash">{item.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
