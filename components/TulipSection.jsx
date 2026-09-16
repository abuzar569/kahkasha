"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Tulip from "@/components/Tulip";
import { tulips } from "@/lib/content";
import { useIsomorphicLayoutEffect, useReducedMotion } from "@/lib/hooks";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * The three tulips that appear one after another below the one that grows.
 * All drawn, no image files — different heights, tones and tilts so it reads
 * as a few flowers left on the page rather than a row of identical icons.
 */
const GARDEN = [
  { tone: "blush", height: "h-44 sm:h-52", align: "self-start", nudge: "ml-1", rest: -4.5, float: 9.5, delay: 0 },
  { tone: "rose", height: "h-60 sm:h-72", align: "self-center", nudge: "", rest: 1.8, float: 11, delay: 1.4 },
  { tone: "ember", height: "h-40 sm:h-48", align: "self-end", nudge: "mr-1", rest: 5, float: 8.5, delay: 0.7 },
];

export default function TulipSection() {
  const root = useRef(null);
  const bloom = useRef(null);
  const reduced = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      const heading = self.selector(".tulip-line");
      const stems = self.selector(".tulip-stem");
      const captions = self.selector(".tulip-caption");

      // Scoped to the big tulip only — otherwise these class names would also
      // grab the petals of the three tulips further down the section.
      const q = (sel) => gsap.utils.toArray(sel, bloom.current);
      const stem = q(".stem");
      const leafL = q(".leaf-left");
      const leafR = q(".leaf-right");
      const front = q(".petal-front");
      const left = q(".petal-left");
      const right = q(".petal-right");
      const fold = q(".petal-front-fold");

      if (reduced) {
        gsap.set([...heading, ...stems, ...captions], { opacity: 1, y: 0 });
        gsap.set(left, { rotate: -10 });
        gsap.set(right, { rotate: 10 });
        return;
      }

      /* --- heading --- */
      gsap.set(heading, { opacity: 0, y: 24 });
      gsap.to(heading, {
        opacity: 1,
        y: 0,
        duration: 1.1,
        stagger: 0.18,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 65%", once: true },
      });

      /* --- the bloom, drawn as you scroll --- */
      gsap.set(stem, { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.set([...leafL, ...leafR], { scale: 0, opacity: 0 });
      gsap.set(leafL, { transformOrigin: "100% 50%" });
      gsap.set(leafR, { transformOrigin: "0% 50%" });
      gsap.set([...front, ...left, ...right], { scaleY: 0.12, opacity: 0 });
      gsap.set(front, { transformOrigin: "50% 100%" });
      gsap.set(left, { transformOrigin: "100% 100%", rotate: 0 });
      gsap.set(right, { transformOrigin: "0% 100%", rotate: 0 });
      gsap.set(fold, { opacity: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: bloom.current,
          start: "top 85%",
          end: "bottom 55%",
          scrub: 0.8,
        },
      });

      tl.to(stem, { strokeDashoffset: 0, duration: 1 })
        .to(leafR, { scale: 1, opacity: 0.9, duration: 0.35 }, 0.35)
        .to(leafL, { scale: 1, opacity: 0.75, duration: 0.35 }, 0.5)
        .to(front, { scaleY: 1, opacity: 1, duration: 0.6 }, 0.62)
        .to(left, { scaleY: 1, opacity: 1, rotate: -10, duration: 0.7 }, 0.7)
        .to(right, { scaleY: 1, opacity: 1, rotate: 10, duration: 0.7 }, 0.72)
        .to(fold, { opacity: 1, duration: 0.3 }, 1.15);

      /* gentle parallax on the bloom itself */
      gsap.to(bloom.current, {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: bloom.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      /* --- the three tulips, one at a time --- */
      stems.forEach((el, i) => {
        const rest = Number(el.dataset.rest || 0);
        const dir = i % 2 === 0 ? -1 : 1;

        gsap.set(el, { opacity: 0, y: 54, rotate: rest + dir * 7, scale: 0.9 });
        gsap.to(el, {
          opacity: 1,
          y: 0,
          rotate: rest,
          scale: 1,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });

        // each drifts up at its own rate as the section passes
        gsap.to(el.querySelector(".tulip-drift"), {
          yPercent: -10 - i * 5,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });

      gsap.set(captions, { opacity: 0, y: 10 });
      captions.forEach((caption) => {
        gsap.to(caption, {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: { trigger: caption, start: "top 94%", once: true },
        });
      });
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={root}
      className="relative overflow-x-clip py-20 sm:py-28"
      aria-labelledby="tulip-heading"
    >
      <div className="px-7 sm:px-10">
        <div className="mx-auto max-w-[40rem]">
          <h2
            id="tulip-heading"
            className="tulip-line font-serif text-[clamp(1.9rem,8.5vw,2.7rem)] font-light leading-[1.15] tracking-tightest text-ink"
          >
            {tulips.heading[0]}
          </h2>
          <p className="tulip-line mt-2 font-serif text-[clamp(1.9rem,8.5vw,2.7rem)] font-light italic leading-[1.15] tracking-tightest text-rose">
            {tulips.heading[1]}
          </p>
        </div>
      </div>

      {/* the one that grows */}
      <div ref={bloom} className="relative mx-auto mt-14 w-[52%] max-w-[210px]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-[160%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blush/35 blur-3xl"
        />
        <Tulip tone="rose" className="relative h-auto w-full" title="A tulip opening" />
      </div>

      <p className="mt-10 px-7 text-center font-hand text-[16px] text-mute sm:px-10">
        {tulips.note}
      </p>

      {/* and a few more, left on the page */}
      <div className="mx-auto mt-16 flex max-w-[34rem] flex-col gap-10 px-8 sm:gap-12 sm:px-10">
        {GARDEN.map((t, i) => (
          <figure
            key={t.tone + i}
            data-rest={t.rest}
            className={`tulip-stem flex flex-col items-center ${t.align} ${t.nudge} will-change-transform`}
            style={{ transform: `rotate(${t.rest}deg)` }}
          >
            <div
              className={reduced ? "" : "tulip-drift"}
              style={{ willChange: "transform" }}
            >
              <div
                className={reduced ? "" : "drift"}
                style={{ animationDuration: `${t.float}s`, animationDelay: `${t.delay}s` }}
              >
                <Tulip
                  tone={t.tone}
                  className={`${t.height} w-auto tulip-open drop-shadow-[0_14px_22px_rgba(168,62,69,0.10)]`}
                />
              </div>
            </div>

            <figcaption className="tulip-caption mt-4 font-hand text-[15.5px] text-mute">
              {tulips.captions[i]}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}