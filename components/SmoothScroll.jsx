"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Wraps the page and keeps scroll-driven animation well behaved on phones.
 *
 * Deliberately NOT a JS scroll-hijacking library: on iOS and Android the
 * native momentum scroll is smoother than anything we'd fake, and hijacked
 * scrolling fights with the address bar. Instead we:
 *   - stop ScrollTrigger from recalculating every time the address bar
 *     shows/hides (that's what causes pinned sections to jump on mobile),
 *   - refresh measurements once the webfonts are in,
 *   - refresh on a real resize / orientation change.
 */
export default function SmoothScroll({ children }) {
  useEffect(() => {
    ScrollTrigger.config({
      ignoreMobileResize: true,
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
    });

    let cancelled = false;
    const refresh = () => {
      if (!cancelled) ScrollTrigger.refresh();
    };

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(refresh).catch(() => {});
    }

    let lastWidth = window.innerWidth;
    const onResize = () => {
      // Ignore height-only changes (the mobile address bar collapsing)
      if (window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;
      refresh();
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", refresh);

    return () => {
      cancelled = true;
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", refresh);
    };
  }, []);

  return <div id="app-root">{children}</div>;
}
