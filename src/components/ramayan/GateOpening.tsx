"use client";

import { AnimatePresence, motion, useReducedMotion, type Easing } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { FLAG_TIP_Y, SANCTUM_DOOR, SPIRE_KALASH_Y, TempleScene } from "./Hero";
import { GateBlessing } from "./GateBlessing";
import { Particles } from "./Ornaments";

interface GateOpeningProps {
  onOpenComplete?: () => void;
  onStartEnter?: () => void;
}

/**
 * Intro: Shri Ram Mandir at dusk, its sanctum door softly pulsing with light.
 *
 * On tap the dusk lifts, rays of light stream from the sanctum door, the camera takes a breath and
 * then flies into the door (the whole scene zooms around the door's exact point on screen), the
 * door's light floods the screen, and the page fades in out of that light.
 *
 * The scene is the hero's own TempleScene at its resting position, so the page underneath matches.
 */
const T = {
  zoomDelay: 0.35,
  zoom: 2.6,
  /** When the light from the door starts to flood the screen (seconds after tap). */
  flashFrom: 1.85,
  /** When the gate hands over to the page. */
  done: 3.0,
} as const;

/** Breath in, then an accelerating fly-in through the door. */
const ZOOM_KEYS = [1, 1.05, 12];
const ZOOM_TIMES = [0, 0.2, 1];
const ZOOM_EASE: Easing[] = ["easeOut", [0.7, 0, 0.95, 0.45]];

type Point = { x: number; y: number };

export function GateOpening({
  onOpenComplete,
  onStartEnter,
}: GateOpeningProps) {
  const [hasStarted, setHasStarted] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [door, setDoor] = useState<Point | null>(null);
  /**
   * Distances from the top of the screen to the flag-pole tip (the blessing stays above it) and to
   * the spire's kalash (the blessing's lines fly up out of it).
   */
  const [templeMarks, setTempleMarks] = useState<{ flagTip: number; spire: number } | null>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const templeRef = useRef<HTMLDivElement>(null);
  const finishTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const reduceMotion = useReducedMotion();

  // Lock body scroll while gate is closed
  useEffect(() => {
    if (!isOpened) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpened]);

  useEffect(() => () => clearTimeout(finishTimer.current), []);

  // Where the sanctum door is on screen — the zoom, glow, rays and flash all centre on it.
  useEffect(() => {
    const measure = () => {
      const frame = frameRef.current?.getBoundingClientRect();
      const temple = templeRef.current?.getBoundingClientRect();
      if (!frame || !temple || temple.height === 0) return;
      const d = SANCTUM_DOOR;
      setDoor({
        x: temple.left - frame.left + temple.width * d.x,
        y: temple.top - frame.top + temple.height * d.y,
      });
      setTempleMarks({
        flagTip: temple.top - frame.top + temple.height * FLAG_TIP_Y,
        spire: temple.top - frame.top + temple.height * SPIRE_KALASH_Y,
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (templeRef.current) ro.observe(templeRef.current);
    if (frameRef.current) ro.observe(frameRef.current);
    return () => ro.disconnect();
  }, [isOpened]);

  // Complete opening sequence
  const finishOpening = () => {
    clearTimeout(finishTimer.current);
    setIsOpened(true);
    onOpenComplete?.();
  };

  const handleOpenGate = () => {
    if (hasStarted) return;
    setHasStarted(true);
    onStartEnter?.();
    finishTimer.current = setTimeout(finishOpening, reduceMotion ? 400 : T.done * 1000);
  };

  const open = hasStarted && !reduceMotion;
  const at = door ? `${door.x}px ${door.y}px` : "50% 72%";
  const doorStyle = door ? { left: door.x, top: door.y } : { left: "50%", top: "72%" };

  return (
    <AnimatePresence>
      {!isOpened && (
        <motion.div
          key="gate"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black select-none"
          aria-label="Ram Mandir Dwar"
        >
          {/* Phone-width frame on mobile, full screen from tablets up (tap anywhere to enter) */}
          <div
            ref={frameRef}
            onClick={handleOpenGate}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleOpenGate();
              }
            }}
            role="button"
            tabIndex={0}
            aria-label="Enter — open the temple doors"
            className="relative h-full w-full max-w-[480px] cursor-pointer overflow-hidden bg-black outline-none"
          >
            {/* Camera — the whole scene flies into the sanctum door */}
            <motion.div
              className="absolute inset-0 will-change-transform"
              style={{ transformOrigin: at }}
              initial={false}
              animate={{ scale: open ? ZOOM_KEYS : 1 }}
              transition={
                open
                  ? { duration: T.zoom, delay: T.zoomDelay, times: ZOOM_TIMES, ease: ZOOM_EASE }
                  : { duration: 0.4 }
              }
            >
              <TempleScene templeRef={templeRef} priority />

              {/* Light inside the sanctum door: breathes while waiting, swells on entry */}
              <motion.div
                aria-hidden
                className="pointer-events-none absolute z-30 h-[min(30vw,200px)] w-[min(30vw,200px)] rounded-full"
                style={{
                  ...doorStyle,
                  x: "-50%",
                  y: "-50%",
                  background:
                    "radial-gradient(circle, rgba(255,250,228,0.95) 0%, rgba(255,214,120,0.6) 28%, rgba(255,170,60,0.18) 55%, transparent 72%)",
                  mixBlendMode: "screen",
                }}
                initial={false}
                animate={
                  open
                    ? { opacity: [0.6, 1, 1], scale: [1, 1.5, 2.2] }
                    : { opacity: [0.35, 0.75, 0.35], scale: [0.9, 1.08, 0.9] }
                }
                transition={
                  open
                    ? { duration: T.zoom, delay: 0.1, ease: "easeIn" }
                    : { duration: 2.6, repeat: Infinity, ease: "easeInOut" }
                }
              />
            </motion.div>

            {/* Dusk: a deeper, quieter light while waiting; lifts as the doors open */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 80% 70% at 50% 60%, transparent 35%, rgba(12,4,16,0.55) 100%), linear-gradient(to bottom, rgba(12,4,16,0.45) 0%, rgba(12,4,16,0.1) 30%, rgba(12,4,16,0.1) 70%, rgba(12,4,16,0.55) 100%)",
              }}
              initial={false}
              animate={{ opacity: open ? 0 : 1 }}
              transition={{ duration: 1 }}
            />

            {/* Rays of light streaming from the sanctum door */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute h-[260vmax] w-[260vmax]"
              style={{
                ...doorStyle,
                x: "-50%",
                y: "-50%",
                background:
                  "repeating-conic-gradient(from 0deg, rgba(255,226,150,0) 0deg 5deg, rgba(255,226,150,0.2) 5deg 8deg)",
                maskImage:
                  "radial-gradient(circle, black 0%, rgba(0,0,0,0.6) 14%, transparent 42%)",
                WebkitMaskImage:
                  "radial-gradient(circle, black 0%, rgba(0,0,0,0.6) 14%, transparent 42%)",
                mixBlendMode: "screen",
              }}
              initial={false}
              animate={open ? { opacity: [0, 0.9, 1], rotate: 18 } : { opacity: 0, rotate: 0 }}
              transition={{ duration: T.done, ease: "easeOut" }}
            />

            {/* Waiting state: rings ripple out from the door to invite a tap */}
            <AnimatePresence>
              {!hasStarted &&
                [0, 1.2].map((delay) => (
                  <motion.span
                    key={delay}
                    aria-hidden
                    className="pointer-events-none absolute h-16 w-16 rounded-full border border-[#ffe7a0]/80"
                    style={{ ...doorStyle, x: "-50%", y: "-50%" }}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: [0, 0.9, 0], scale: [0.6, 2.4, 3.2] }}
                    exit={{ opacity: 0, transition: { duration: 0.3 } }}
                    transition={{ duration: 2.4, delay, repeat: Infinity, ease: "easeOut" }}
                  />
                ))}
            </AnimatePresence>

            {/* The door's light floods the screen, and the page appears out of it */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background: `radial-gradient(circle at ${at}, #fffdf4 0%, #fff0c2 22%, #ffd27a 48%, #f0a13e 80%, #c8661c 100%)`,
              }}
              initial={{ opacity: 0 }}
              animate={open ? { opacity: [0, 0, 1] } : { opacity: 0 }}
              transition={{ duration: T.done, times: [0, T.flashFrom / T.done, 1], ease: "easeIn" }}
            />

            {/* Floating Sparkles & Particles */}
            <div className="pointer-events-none absolute inset-0 z-20">
              <Particles count={18} className="opacity-70" />
            </div>

            {/* Blessing at the top: जय श्री राम, श्री रामचरितमानस and the chaupai fly up out of the temple */}
            <GateBlessing
              hidden={hasStarted}
              flagTip={templeMarks?.flagTip}
              launchFrom={templeMarks?.spire}
            />

            {/* Tap prompt */}
            <motion.div
              className="pointer-events-none absolute inset-x-0 bottom-[7%] z-30 flex justify-center"
              initial={{ opacity: 0, y: 8 }}
              animate={hasStarted ? { opacity: 0, y: 8 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: hasStarted ? 0 : 0.9 }}
            >
              <motion.span
                animate={{ opacity: [0.75, 1, 0.75] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                className="flex items-center gap-2 rounded-full border border-gold/50 bg-black/60 px-4 py-2 font-sans text-[0.68rem] font-bold uppercase tracking-[0.28em] text-gold-light"
              >
                <span className="text-[0.55rem]">✦</span>
                <span className="font-hindi text-[0.95rem] tracking-[0.06em] normal-case">
                  दर्शन करें
                </span>
                <span className="text-gold/70">•</span>
                Tap to enter
                <span className="text-[0.55rem]">✦</span>
              </motion.span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
