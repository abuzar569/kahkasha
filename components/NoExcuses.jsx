"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsomorphicLayoutEffect, useReducedMotion } from "@/lib/hooks";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function NoExcuses() {
  const root = useRef(null);
  const panel = useRef(null);
  const reduced = useReducedMotion();

  const heading = "I know I messed up.";

  const lines = [
    "I know I hurt you, and I'm genuinely sorry.",
    "I don't want to make excuses for what I did.",
    "I wish I could take that moment back and do things differently.",
    "You didn't deserve to feel hurt because of me.",
    "I can't change what happened, but I can take responsibility for it.",
    "And I want you to know that I'm truly sorry, Kahkasha.",
  ];

  useIsomorphicLayoutEffect(() => {
    if (reduced) return;

    const ctx = gsap.context((self) => {
      const headingEl = self.selector(".ne-heading");
      const lineEls = self.selector(".ne-line");

      if (!lineEls.length) return;

      gsap.set(lineEls, { opacity: 0, y: 26 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=320%",
          pin: panel.current,
          anticipatePin: 1,
          scrub: 0.7,
        },
      });

      tl.fromTo(
        headingEl,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        0
      );

      lineEls.forEach((line, i) => {
        const at = 0.8 + i * 1.3;

        tl.to(
          line,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
          },
          at
        );

        if (i < lineEls.length - 1) {
          tl.to(
            line,
            {
              opacity: 0,
              y: -22,
              duration: 0.6,
            },
            at + 0.85
          );
        }
      });

      tl.to({}, { duration: 1.1 });
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={root}
      className="relative bg-[#241F1D] text-ivory"
      aria-labelledby="no-excuses-heading"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-10 h-10 bg-gradient-to-b from-transparent to-[#241F1D]"
      />

      <div
        ref={panel}
        className="relative flex h-[100svh] w-full flex-col items-center justify-center overflow-hidden px-8"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[18%] h-[46vh] w-[46vh] -translate-x-1/2 rounded-full bg-ember/20 blur-[90px]"
        />

        <h2
          id="no-excuses-heading"
          className="ne-heading relative max-w-[12ch] text-center font-serif text-[clamp(2.2rem,10vw,3.2rem)] font-light tracking-tightest text-ivory"
        >
          {heading}
        </h2>

        <span
          aria-hidden="true"
          className="relative mt-6 h-px w-16 bg-ivory/25"
        />

        {reduced ? (
          <div className="relative mt-10 max-w-[30ch] space-y-5 text-center">
            {lines.map((line) => (
              <p
                key={line}
                className="font-serif text-[clamp(1.25rem,5.6vw,1.7rem)] font-light leading-snug text-ivory/90"
              >
                {line}
              </p>
            ))}
          </div>
        ) : (
          <div className="relative mt-10 flex h-[34vh] max-h-[280px] w-full max-w-[34rem] items-center justify-center">
            {lines.map((line) => (
              <p
                key={line}
                className="ne-line absolute inset-0 flex items-center justify-center text-center font-serif text-[clamp(1.4rem,6.4vw,2.1rem)] font-light leading-[1.35] tracking-tightest text-ivory/95"
              >
                {line}
              </p>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}