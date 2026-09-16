"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ImageWithFallback from "@/components/ImageWithFallback";
import { memories, memoriesIntro } from "@/lib/content";
import { useIsomorphicLayoutEffect, useReducedMotion } from "@/lib/hooks";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* Each photo sits differently, like prints dropped on a table. */
const LAYOUT = [
  { width: "w-[76%]", align: "self-start", pull: "mt-0", nudge: "ml-0" },
  { width: "w-[62%]", align: "self-end", pull: "-mt-10", nudge: "mr-1" },
  { width: "w-[70%]", align: "self-start", pull: "-mt-6", nudge: "ml-3" },
  { width: "w-[64%]", align: "self-end", pull: "-mt-12", nudge: "mr-0" },
];

export default function Memories() {
  const root = useRef(null);
  const reduced = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      const intro = self.selector(".mem-intro");
      const frames = self.selector(".mem-frame");
      const captions = self.selector(".mem-caption");

      if (reduced) {
        gsap.set([...intro, ...frames, ...captions], {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
        });
        return;
      }

      gsap.set(intro, { opacity: 0, y: 22 });
      gsap.to(intro, {
        opacity: 1,
        y: 0,
        duration: 1.1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 70%", once: true },
      });

      frames.forEach((frame, i) => {
        const dir = i % 2 === 0 ? -1 : 1;
        const rest = Number(frame.dataset.rotate || 0);

        gsap.set(frame, {
          opacity: 0,
          y: 56,
          x: dir * 18,
          rotate: rest + dir * 6,
          scale: 0.92,
          filter: "blur(10px)",
        });

        gsap.to(frame, {
          opacity: 1,
          y: 0,
          x: 0,
          rotate: rest,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.3,
          ease: "power3.out",
          scrollTrigger: { trigger: frame, start: "top 88%", once: true },
        });

        // the print drifts a touch slower than the page
        gsap.to(frame.querySelector(".mem-image"), {
          yPercent: -6 - i * 1.5,
          ease: "none",
          scrollTrigger: {
            trigger: frame,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      gsap.set(captions, { opacity: 0, y: 12 });
      captions.forEach((caption) => {
        gsap.to(caption, {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.25,
          ease: "power2.out",
          scrollTrigger: { trigger: caption, start: "top 92%", once: true },
        });
      });
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={root}
      className="relative overflow-x-clip bg-ivory/60 px-7 py-24 sm:px-10 sm:py-32"
      aria-labelledby="memories-heading"
    >
      <div className="mx-auto max-w-[40rem]">
        <h2
          id="memories-heading"
          className="mem-intro font-serif text-[clamp(1.9rem,8.5vw,2.7rem)] font-light leading-[1.15] tracking-tightest text-ink"
        >
          {memoriesIntro.heading}
        </h2>
        <p className="mem-intro pretty mt-5 max-w-[33ch] font-sans text-[16.5px] leading-[1.75] text-ash">
          {memoriesIntro.sub}
        </p>
      </div>

      <div className="mx-auto mt-14 flex max-w-[40rem] flex-col">
        {memories.map((memory, i) => {
          const l = LAYOUT[i % LAYOUT.length];
          return (
            <figure
              key={memory.src}
              className={`mem-frame relative ${l.width} ${l.align} ${l.pull} ${l.nudge} will-change-transform`}
              data-rotate={memory.rotate}
              style={{ transform: `rotate(${memory.rotate}deg)` }}
            >
              {/* a piece of tape */}
              <span
                aria-hidden="true"
                className="absolute -top-3 left-1/2 z-10 h-6 w-16 -translate-x-1/2 -rotate-2 rounded-[1px] bg-blush/50 backdrop-blur-[1px]"
              />

              <div className="overflow-hidden rounded-[2px] bg-paper p-2.5 pb-3 shadow-photo">
                <div className="aspect-[4/5] w-full overflow-hidden">
                  <div className="mem-image h-full w-full scale-[1.25] will-change-transform">
                    <ImageWithFallback
                      src={memory.src}
                      alt={memory.alt}
                      className="h-full w-full object-cover"
                      fallbackLabel={`${memory.src.split("/").pop()} goes here`}
                    />
                  </div>
                </div>
              </div>

              <figcaption
                className={`mem-caption mt-3 font-hand text-[15.5px] leading-snug text-mute ${
                  i % 2 === 0 ? "text-left" : "text-right"
                }`}
              >
                {memory.caption}
              </figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
}
