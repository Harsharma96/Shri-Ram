"use client";

import { motion, useReducedMotion } from "motion/react";
import marigoldOrange from "@/assets/flowers/flower-marigold-orange.webp";
import marigoldYellow from "@/assets/flowers/flower-marigold-yellow.webp";
import roseRed from "@/assets/flowers/flower-rose-red.webp";
import rosePink from "@/assets/flowers/flower-rose-pink.webp";
import roseYellow from "@/assets/flowers/flower-rose-yellow.webp";
import hibiscusRed from "@/assets/flowers/flower-hibiscus-red.webp";
import hibiscusPink from "@/assets/flowers/flower-hibiscus-pink.webp";
import lotusPink from "@/assets/flowers/flower-lotus-pink.webp";
import { imgSrc } from "@/lib/image";

/**
 * Pushp varsha — real flowers (marigold, rose, hibiscus, lotus) raining down when the darshan
 * opens: one grand shower across the whole screen, then a gentle, endless fall at the left and
 * right edges so the darshan itself stays clear.
 */

// Marigolds and roses most often, like a real puja shower.
const KINDS = [
  marigoldOrange, marigoldOrange, marigoldOrange,
  marigoldYellow, marigoldYellow, marigoldYellow,
  roseRed, roseRed, rosePink, rosePink,
  hibiscusRed, hibiscusPink, lotusPink, roseYellow,
];

// Seeded random numbers, so the server and the browser render exactly the same shower.
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Flower = {
  src: any;
  left: number; // % across
  size: number; // px
  delay: number; // s
  duration: number; // s
  sway: number; // px
  spinFrom: number; // deg
  spin: number; // deg
  flips: number; // full 3D turns while falling
};

function makeFlowers(count: number, seed: number, opts: {
  left: () => number;
  size: [number, number];
  delay: [number, number];
  duration: [number, number];
}): Flower[] {
  const r = seeded(seed);
  const between = ([a, b]: [number, number]) => a + r() * (b - a);
  return Array.from({ length: count }, () => ({
    src: KINDS[Math.floor(r() * KINDS.length)]!,
    left: opts.left(),
    size: Math.round(between(opts.size)),
    delay: between(opts.delay),
    duration: between(opts.duration),
    sway: (r() < 0.5 ? -1 : 1) * (10 + r() * 26),
    spinFrom: r() * 360,
    spin: (r() < 0.5 ? -1 : 1) * (160 + r() * 380),
    flips: 1 + Math.floor(r() * 2),
  }));
}

// The opening shower: across the whole width, arriving over ~3 seconds.
const burstRand = seeded(11);
const BURST = makeFlowers(34, 7, {
  left: () => 1 + burstRand() * 96,
  size: [22, 44],
  delay: [0.1, 3],
  duration: [4.6, 7.4],
});

// The gentle shower that keeps going, only at the edges.
const edgeRand = seeded(23);
const EDGE = makeFlowers(10, 19, {
  left: () => (edgeRand() < 0.5 ? 1 + edgeRand() * 18 : 81 + edgeRand() * 17),
  size: [18, 28],
  delay: [3.5, 14],
  duration: [10, 15],
});

function FallingFlower({ f, loop }: { f: Flower; loop: boolean }) {
  // Small flowers read as farther away: a touch softer and fainter.
  const far = f.size < 28;
  const timing = { duration: f.duration, delay: f.delay, ...(loop ? { repeat: Infinity, repeatDelay: 0.6 } : {}) };
  return (
    <motion.img
      src={imgSrc(f.src)}
      alt=""
      draggable={false}
      className="absolute top-0 select-none"
      style={{
        left: `${f.left}%`,
        width: f.size,
        marginLeft: -f.size / 2,
        filter: far ? "blur(0.6px) drop-shadow(0 2px 3px rgba(80,20,0,0.25))" : "drop-shadow(0 3px 4px rgba(80,20,0,0.3))",
        zIndex: far ? 1 : 2,
      }}
      initial={{ y: "-12vh", opacity: 0 }}
      animate={{
        y: ["-12vh", "112vh"],
        x: [0, f.sway, -f.sway * 0.6, f.sway * 0.3],
        rotate: [f.spinFrom, f.spinFrom + f.spin],
        rotateY: [0, 360 * f.flips],
        opacity: [0, far ? 0.85 : 1, far ? 0.85 : 1, 0],
      }}
      transition={{
        default: { ...timing, ease: "linear" },
        x: { ...timing, ease: "easeInOut" },
        opacity: { ...timing, times: [0, 0.06, 0.88, 1] },
      }}
    />
  );
}

export function FlowerShower({ start }: { start: boolean }) {
  const reduceMotion = useReducedMotion();
  if (!start || reduceMotion) return null;
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0" style={{ perspective: 900 }}>
      {BURST.map((f, i) => (
        <FallingFlower key={`b${i}`} f={f} loop={false} />
      ))}
      {EDGE.map((f, i) => (
        <FallingFlower key={`e${i}`} f={f} loop />
      ))}
    </div>
  );
}
