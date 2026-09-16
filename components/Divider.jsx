"use client";

import Tulip from "@/components/Tulip";

/**
 * A hairline rule with a tiny tulip resting in the middle.
 * Used to breathe between sections instead of hard edges.
 */
export default function Divider({ className = "" }) {
  return (
    <div
      className={`flex items-center justify-center gap-3 px-8 ${className}`}
      aria-hidden="true"
    >
      <span className="rule w-full max-w-[110px]" />
      <Tulip
        tone="blush"
        className="h-7 w-auto shrink-0 opacity-70 tulip-open"
        stemColor="#B9C2B0"
      />
      <span className="rule w-full max-w-[110px]" />
    </div>
  );
}
