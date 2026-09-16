"use client";

import { useId } from "react";

/**
 * An inline SVG tulip.
 *
 * Parts are given class names so GSAP can animate them:
 *   .petal-left / .petal-right / .petal-front / .stem / .leaf
 *
 * Add the class "tulip-open" on a wrapper to show it already bloomed
 * (see globals.css) — used in the hero, where nothing needs to grow.
 */

const TONES = {
  rose: { light: "#F3D3D2", mid: "#E2A5A6", deep: "#C8767D", front: "#EDBFBF" },
  blush: { light: "#FAE7E4", mid: "#EFC9C6", deep: "#DCA9A8", front: "#F6DAD7" },
  ember: { light: "#E3A3A0", mid: "#C86F73", deep: "#A83E45", front: "#D48A8C" },
  cream: { light: "#FBF1E8", mid: "#F0DECE", deep: "#DCC3AF", front: "#F8E9DC" },
};

export default function Tulip({
  tone = "rose",
  className = "",
  stemColor = "#8C9C82",
  title,
  ...rest
}) {
  const uid = useId().replace(/:/g, "");
  const c = TONES[tone] || TONES.rose;

  const gLeft = `tl-${uid}-l`;
  const gRight = `tl-${uid}-r`;
  const gFront = `tl-${uid}-f`;

  return (
    <svg
      viewBox="0 0 200 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : "true"}
      aria-label={title || undefined}
      className={className}
      {...rest}
    >
      <defs>
        <linearGradient id={gLeft} x1="60" y1="50" x2="110" y2="170">
          <stop offset="0%" stopColor={c.mid} />
          <stop offset="100%" stopColor={c.deep} />
        </linearGradient>
        <linearGradient id={gRight} x1="140" y1="50" x2="95" y2="170">
          <stop offset="0%" stopColor={c.mid} />
          <stop offset="100%" stopColor={c.deep} />
        </linearGradient>
        <linearGradient id={gFront} x1="100" y1="46" x2="100" y2="172">
          <stop offset="0%" stopColor={c.light} />
          <stop offset="70%" stopColor={c.front} />
          <stop offset="100%" stopColor={c.mid} />
        </linearGradient>
      </defs>

      {/* stem — pathLength=1 so a dash offset of 1 → 0 "grows" it */}
      <path
        className="stem"
        d="M100 166 C 97 212, 105 256, 100 332"
        pathLength="1"
        stroke={stemColor}
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* leaves */}
      <path
        className="leaf leaf-right"
        d="M101 232 C 129 216, 157 228, 169 252 C 141 266, 115 254, 101 238 Z"
        fill={stemColor}
        opacity="0.9"
      />
      <path
        className="leaf leaf-left"
        d="M99 256 C 71 244, 45 258, 33 286 C 63 296, 87 282, 99 262 Z"
        fill={stemColor}
        opacity="0.75"
      />

      {/* bloom */}
      <path
        className="petal petal-left"
        d="M100 54 C 80 68, 66 98, 66 126 C 66 150, 80 168, 100 172 C 88 142, 88 86, 100 54 Z"
        fill={`url(#${gLeft})`}
      />
      <path
        className="petal petal-right"
        d="M100 54 C 120 68, 134 98, 134 126 C 134 150, 120 168, 100 172 C 112 142, 112 86, 100 54 Z"
        fill={`url(#${gRight})`}
      />
      <path
        className="petal petal-front"
        d="M100 46 C 118 66, 128 100, 124 132 C 121 156, 112 170, 100 172 C 88 170, 79 156, 76 132 C 72 100, 82 66, 100 46 Z"
        fill={`url(#${gFront})`}
      />
      {/* a single fold line so the front petal doesn't read as a flat blob */}
      <path
        className="petal petal-front-fold"
        d="M100 58 C 96 92, 96 140, 100 168"
        stroke={c.deep}
        strokeOpacity="0.28"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
