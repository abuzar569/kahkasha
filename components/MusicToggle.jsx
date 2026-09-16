"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Music, Pause } from "lucide-react";

const TRACK = "/audio/song.mp3";

/**
 * Nothing autoplays. This button only appears if /public/audio/song.mp3
 * actually exists, so the page is complete without it.
 */
export default function MusicToggle() {
  const audioRef = useRef(null);
  const [available, setAvailable] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch(TRACK, { method: "HEAD" })
      .then((res) => {
        const type = res.headers.get("content-type") || "";
        if (!cancelled && res.ok && !type.includes("text/html")) {
          setAvailable(true);
        }
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      if (audio) audio.pause();
    };
  }, [available]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }

    audio.volume = 0.35;
    const attempt = audio.play();
    if (attempt && typeof attempt.then === "function") {
      attempt.then(() => setPlaying(true)).catch(() => setAvailable(false));
    } else {
      setPlaying(true);
    }
  };

  if (!available) return null;

  return (
    <>
      <audio ref={audioRef} src={TRACK} loop preload="none" />
      <motion.button
        type="button"
        onClick={toggle}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 0.8 }}
        aria-label={playing ? "Pause the music" : "Play some music"}
        className="fixed right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-paper/85 text-ash shadow-paper ring-1 ring-ink/5 backdrop-blur-sm active:scale-95"
        style={{ bottom: "calc(1rem + env(safe-area-inset-bottom))" }}
      >
        {playing ? (
          <Pause size={16} strokeWidth={1.6} aria-hidden="true" />
        ) : (
          <Music size={16} strokeWidth={1.6} aria-hidden="true" />
        )}
      </motion.button>
    </>
  );
}
