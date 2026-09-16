"use client";

import { useState } from "react";

/**
 * A plain <img> that swaps itself for a soft placeholder if the file is
 * missing. That way the site still looks finished before the real photos
 * are dropped into /public/images, and nothing ever shows a broken icon.
 *
 * `fallback` lets a caller supply their own placeholder (the tulip section
 * passes an SVG tulip).
 */
export default function ImageWithFallback({
  src,
  alt = "",
  className = "",
  imgClassName = "",
  fallback,
  fallbackLabel,
  ...rest
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-ivory via-blush/40 to-blush/70 ${className}`}
        {...rest}
      >
        {fallback || (
          <span className="px-4 text-center font-hand text-[15px] leading-snug text-rose/80">
            {fallbackLabel || "add your photo here"}
          </span>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      draggable="false"
      onError={() => setFailed(true)}
      className={`${className} ${imgClassName}`}
      {...rest}
    />
  );
}
