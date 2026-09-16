"use client";

/**
 * A fixed, very light film-grain layer over the whole page.
 * Pure SVG noise: no image request, no layout cost, pointer-events off.
 */
export default function Grain() {
  return (
    <svg className="grain" aria-hidden="true" focusable="false">
      <filter id="paper-grain">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.85"
          numOctaves="3"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.42" />
        </feComponentTransfer>
      </filter>
      <rect width="100%" height="100%" filter="url(#paper-grain)" />
    </svg>
  );
}
