"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Tulip from "@/components/Tulip";
import { space } from "@/lib/content";
import { useIsomorphicLayoutEffect, useReducedMotion } from "@/lib/hooks";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * The most open, least busy screen on the page. One tulip drifting far
 * behind the type, everything else is air.
 */
export default function SpaceSection() {
  const root = useRef(null);
  const reduced = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      const items = self.selector(".space-item");
      const ghost = self.selector(".space-tulip");

      if (reduced) {
        gsap.set(items, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(items, { opacity: 0, y: 20 });
      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 1.4,
        stagger: 0.28,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 62%", once: true },
      });

      gsap.fromTo(
        ghost,
        { yPercent: 12, rotate: -4 },
        {
          yPercent: -14,
          rotate: 3,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={root}
      className="relative flex min-h-[100svh] items-center overflow-hidden px-8 py-28 sm:px-10"
      aria-labelledby="space-heading"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <Tulip
          tone="blush"
          className="space-tulip h-[62vh] max-h-[520px] w-auto tulip-open opacity-[0.22] blur-[1px]"
          stemColor="#CBD3C4"
        />
      </div>

      <div className="relative mx-auto w-full max-w-[34rem] text-center">
        <h2
          id="space-heading"
          className="space-item balance font-serif text-[clamp(1.9rem,8.4vw,2.8rem)] font-light leading-[1.2] tracking-tightest text-ink"
        >
          {space.heading}
        </h2>

        <div className="space-item mt-10 space-y-3 font-sans text-[16.5px] leading-[1.9] text-ash">
          {space.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        <span aria-hidden="true" className="space-item rule mx-auto mt-12 block w-24" />

        <p className="space-item mt-12 font-serif text-[clamp(1.15rem,5.4vw,1.5rem)] font-light italic leading-snug text-rose">
          {space.closing}
        </p>
      </div>
    </section>
  );
}
