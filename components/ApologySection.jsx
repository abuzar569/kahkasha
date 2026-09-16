"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { apology } from "@/lib/content";
import { useIsomorphicLayoutEffect, useReducedMotion } from "@/lib/hooks";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ApologySection() {
  const root = useRef(null);
  const reduced = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      const heading = self.selector(".apology-heading");
      const lines = self.selector(".reveal-line");
      const mark = self.selector(".heading-mark");

      if (reduced) {
        gsap.set([...heading, ...lines], { opacity: 1, y: 0 });
        gsap.set(mark, { scaleX: 1 });
        return;
      }

      gsap.set(heading, { opacity: 0, y: 26 });
      gsap.set(lines, { opacity: 0, y: 24 });
      gsap.set(mark, { scaleX: 0, transformOrigin: "left center" });

      gsap.to(heading, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 68%", once: true },
      });

      gsap.to(mark, {
        scaleX: 1,
        duration: 1.4,
        ease: "power3.inOut",
        scrollTrigger: { trigger: root.current, start: "top 62%", once: true },
      });

      lines.forEach((line) => {
        gsap.to(line, {
          opacity: 1,
          y: 0,
          duration: 1.15,
          ease: "power3.out",
          scrollTrigger: { trigger: line, start: "top 88%", once: true },
        });
      });
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="apology"
      ref={root}
      className="relative px-7 py-24 sm:px-10 sm:py-32"
      aria-labelledby="apology-heading"
    >
      <div className="mx-auto max-w-[40rem]">
        <h2
          id="apology-heading"
          className="apology-heading font-serif text-[clamp(2.1rem,9.5vw,3rem)] font-light leading-[1.12] tracking-tightest text-ink"
        >
          {apology.heading}
        </h2>

        <span
          aria-hidden="true"
          className="heading-mark mt-5 block h-px w-24 bg-rose/60"
        />

        <div className="mt-9 space-y-6">
          {apology.lines.map((line) => (
            <p
              key={line}
              className="reveal-line pretty max-w-[34ch] font-sans text-[17px] leading-[1.75] text-ash"
            >
              {line}
            </p>
          ))}
        </div>

        <p className="reveal-line mt-12 font-hand text-[16.5px] leading-relaxed text-mute">
          {apology.note}
        </p>
      </div>
    </section>
  );
}
