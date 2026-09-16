"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, X } from "lucide-react";
import { envelope } from "@/lib/content";
import { useReducedMotion } from "@/lib/hooks";

const EASE = [0.22, 1, 0.36, 1];

export default function Envelope() {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const noteRef = useRef(null);

  const toggle = () => {
    const next = !open;
    setOpen(next);
    if (next) {
      // keep the note in view after it expands
      window.setTimeout(() => {
        noteRef.current?.scrollIntoView({
          behavior: reduced ? "auto" : "smooth",
          block: "center",
        });
      }, 420);
    }
  };

  return (
    <section className="relative px-7 py-24 sm:px-10 sm:py-28">
      <div className="mx-auto flex max-w-[34rem] flex-col items-center">
        <button
          type="button"
          onClick={toggle}
          aria-expanded={open}
          aria-controls="last-note"
          className="group flex w-full max-w-[280px] flex-col items-center gap-4 rounded-md p-3 active:scale-[0.98] transition-transform duration-200"
        >
          <span className="font-hand text-[17px] text-ash">
            {envelope.prompt}
          </span>

          {/* the envelope */}
          <span
            aria-hidden="true"
            className="relative block w-full"
            style={{ perspective: "700px" }}
          >
            <span className="block h-[104px] w-full rounded-[3px] bg-gradient-to-b from-[#FFFCF8] to-[#F7EDE5] shadow-paper ring-1 ring-ink/5" />

            {/* flap — an SVG triangle so it scales with the envelope */}
            <motion.span
              className="absolute inset-x-0 top-0 block origin-top"
              style={{ transformStyle: "preserve-3d" }}
              animate={{ rotateX: open ? -168 : 0 }}
              transition={{ duration: reduced ? 0.2 : 0.75, ease: EASE }}
            >
              <svg
                viewBox="0 0 280 62"
                preserveAspectRatio="none"
                className="block h-[62px] w-full drop-shadow-[0_2px_2px_rgba(43,37,34,0.06)]"
              >
                <polygon points="0,0 280,0 140,62" fill="#F2E4D9" />
                <polyline
                  points="0,0 140,62 280,0"
                  fill="none"
                  stroke="#E3D2C4"
                  strokeWidth="1.5"
                />
              </svg>
            </motion.span>

            {/* wax-ish seal */}
            <motion.span
              className="absolute left-1/2 top-[46px] h-6 w-6 -translate-x-1/2 rounded-full bg-ember/85 shadow-soft"
              animate={{ opacity: open ? 0 : 1, scale: open ? 0.6 : 1 }}
              transition={{ duration: 0.4, ease: EASE }}
            />
          </span>

          <motion.span
            className="text-mute"
            animate={
              reduced || open ? { y: 0 } : { y: [0, 4, 0] }
            }
            transition={{ duration: 2.4, repeat: open ? 0 : Infinity, ease: "easeInOut" }}
          >
            <ChevronDown
              size={20}
              strokeWidth={1.5}
              className={`transition-transform duration-500 ${open ? "rotate-180" : ""}`}
              aria-hidden="true"
            />
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id="last-note"
              ref={noteRef}
              key="note"
              className="w-full overflow-hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: reduced ? 0.2 : 0.7, ease: EASE }}
            >
              <motion.div
                className="paper-card mt-7 rounded-[3px] px-6 py-9 text-center shadow-paper"
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: -18, rotate: 1.2 }}
                animate={{ opacity: 1, y: 0, rotate: 0.6 }}
                transition={{ duration: reduced ? 0.2 : 0.8, delay: 0.1, ease: EASE }}
              >
                {envelope.noteLines.map((l) => (
                  <p
                    key={l}
                    className="font-hand text-[19px] leading-[1.9] text-ink/85"
                  >
                    {l}
                  </p>
                ))}

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="mt-7 inline-flex min-h-[44px] items-center gap-1.5 px-4 font-sans text-[14px] text-mute active:text-ash"
                >
                  <X size={15} strokeWidth={1.5} aria-hidden="true" />
                  {envelope.close}
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
