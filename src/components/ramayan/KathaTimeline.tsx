"use client";

import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "motion/react";
import { X } from "lucide-react";
import { Particles } from "./Ornaments";
import { imgSrc } from "@/lib/image";

/*
 * The "कार्यक्रम विवरण" poster, split into its parts so each one can animate on its own:
 * header, brass pole, and per event a round medallion, a plaque and the small gold divider above it.
 * The parts were cut from one 1024×1536 poster; every box below is [x, y, width, height] in those
 * pixels, so when all parts are in place they line up into the original poster exactly.
 */
import posterFull from "@/assets/karyakram/kv-full.webp";
import headerImg from "@/assets/karyakram/kv-header.webp";
import poleImg from "@/assets/karyakram/kv-pole.webp";
import med1 from "@/assets/karyakram/kv-med-1.webp";
import med2 from "@/assets/karyakram/kv-med-2.webp";
import med3 from "@/assets/karyakram/kv-med-3.webp";
import med4 from "@/assets/karyakram/kv-med-4.webp";
import body1 from "@/assets/karyakram/kv-body-1.webp";
import body2 from "@/assets/karyakram/kv-body-2.webp";
import body3 from "@/assets/karyakram/kv-body-3.webp";
import body4 from "@/assets/karyakram/kv-body-4.webp";
import div1 from "@/assets/karyakram/kv-div-1.webp";
import div2 from "@/assets/karyakram/kv-div-2.webp";
import div3 from "@/assets/karyakram/kv-div-3.webp";

const W = 1024;
const H = 1536;
type Box = readonly [x: number, y: number, w: number, h: number];
const POSTER: Box = [0, 0, W, H];

/** Position a part inside a frame (the whole poster, or one event's band), in percent. */
function place(b: Box, frame: Box = POSTER) {
  return {
    left: `${((b[0] - frame[0]) / frame[2]) * 100}%`,
    top: `${((b[1] - frame[1]) / frame[3]) * 100}%`,
    width: `${(b[2] / frame[2]) * 100}%`,
    height: `${(b[3] / frame[3]) * 100}%`,
  };
}

function union(...boxes: Box[]): Box {
  const x0 = Math.min(...boxes.map((b) => b[0]));
  const y0 = Math.min(...boxes.map((b) => b[1]));
  const x1 = Math.max(...boxes.map((b) => b[0] + b[2]));
  const y1 = Math.max(...boxes.map((b) => b[1] + b[3]));
  return [x0, y0, x1 - x0, y1 - y0];
}

const HEADER: Box = [92, 7, 840, 261];
const POLE: Box = [56, 200, 70, 1066];

type Plaque = {
  alt: string;
  body: any;
  bodyBox: Box;
  med: any;
  medBox: Box;
  /** Medallion circle: centre x, centre y, radius. */
  circle: readonly [number, number, number];
  /** Gold divider above this plaque (the first plaque has none). */
  div?: any;
  divBox?: Box;
};

const PLAQUES: Plaque[] = [
  {
    alt: "भव्य कलश यात्रा — 22 नवम्बर 2026, समय: प्रातः 09 बजे",
    body: body1,
    bodyBox: [252, 288, 750, 280],
    med: med1,
    medBox: [38, 277, 302, 301],
    circle: [186, 426.5, 147.5],
  },
  {
    alt: "श्री राम कथा — 22 नवम्बर 2026 से 30 नवम्बर 2026 तक, सायं 05:00 बजे से रात्रि 10:00 बजे तक",
    body: body2,
    bodyBox: [227, 607, 775, 288],
    med: med2,
    medBox: [38, 602, 293, 300],
    circle: [177, 751.5, 147.5],
    div: div1,
    divBox: [328, 564, 395, 54],
  },
  {
    alt: "यज्ञ / पूर्णाहुति — 01 दिसम्बर 2026, दोपहर 12 बजे",
    body: body3,
    bodyBox: [251, 930, 751, 266],
    med: med3,
    medBox: [38, 918, 293, 291],
    circle: [182, 1062.5, 142.5],
    div: div2,
    divBox: [367, 888, 287, 46],
  },
  {
    alt: "भण्डारा — दोपहर 02 बजे से प्रभु इच्छा तक",
    body: body4,
    bodyBox: [219, 1228, 778, 281],
    med: med4,
    medBox: [38, 1224, 288, 296],
    circle: [175, 1371.5, 144.5],
    div: div3,
    divBox: [328, 1192, 395, 54],
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

/** Medallion spins in and settles like a coin dropping into place. */
const medVariants: Variants = {
  hidden: { opacity: 0, scale: 0.35, rotate: -160 },
  show: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 120, damping: 14, mass: 0.9 },
  },
};

/** Plaque unrolls to the right from behind its medallion. */
const bodyVariants: Variants = {
  hidden: { opacity: 0, x: -14, clipPath: "inset(0% 100% 0% 0%)" },
  show: {
    opacity: 1,
    x: 0,
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 1.05, delay: 0.3, ease: EASE },
  },
};

/** Gold divider opens out from its centre. */
const divVariants: Variants = {
  hidden: { opacity: 0, scaleX: 0 },
  show: { opacity: 1, scaleX: 1, transition: { duration: 0.7, ease: EASE } },
};

/** Twinkling sparkle star (positioned in poster pixels). */
function SparkleStar({ x, y, size, delay }: { x: number; y: number; size: number; delay: number }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      aria-hidden
      className="pointer-events-none absolute text-[#fff3c4]"
      style={{
        left: `${(x / W) * 100}%`,
        top: `${(y / H) * 100}%`,
        width: size,
        height: size,
        marginLeft: -size / 2,
        marginTop: -size / 2,
      }}
      animate={{ scale: [0, 1.2, 0], rotate: [0, 90, 180], opacity: [0, 1, 0] }}
      transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 1.4, delay, ease: "easeInOut" }}
    >
      <path d="M12 0L14.2 9.8L24 12L14.2 14.2L12 24L9.8 14.2L0 12L9.8 9.8L12 0Z" fill="currentColor" />
    </motion.svg>
  );
}

/** One event: divider, plaque and medallion, revealed together when it scrolls into view. */
function PlaqueGroup({ p, index, still }: { p: Plaque; index: number; still: boolean }) {
  const band = union(p.bodyBox, p.medBox, ...(p.divBox ? [p.divBox] : []));
  const [cx, cy] = p.circle;
  const [mx, my, mw, mh] = p.medBox;
  return (
    <motion.div
      className="absolute"
      style={place(band)}
      // If several events come into view together they still arrive one after another
      variants={{ hidden: {}, show: { transition: { delayChildren: index * 0.18 } } }}
      initial={still ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
    >
      {p.div && p.divBox && (
        <motion.img
          variants={divVariants}
          src={imgSrc(p.div)}
          alt=""
          draggable={false}
          className="absolute block"
          style={place(p.divBox, band)}
        />
      )}
      <motion.img
        variants={bodyVariants}
        src={imgSrc(p.body)}
        alt={p.alt}
        draggable={false}
        className="absolute block"
        style={place(p.bodyBox, band)}
      />
      <motion.img
        variants={medVariants}
        src={imgSrc(p.med)}
        alt=""
        draggable={false}
        className="absolute block"
        style={{ ...place(p.medBox, band), originX: (cx - mx) / mw, originY: (cy - my) / mh }}
      />
    </motion.div>
  );
}

/** Soft golden glow that breathes behind a medallion (drawn under the artwork, never over it). */
function Halo({ circle, index, still }: { circle: Plaque["circle"]; index: number; still: boolean }) {
  const [cx, cy, r] = circle;
  const R = r * 1.32;
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute"
      style={place([cx - R, cy - R, R * 2, R * 2])}
      initial={still ? false : { opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 1.2, ease: EASE }}
    >
      <motion.div
        className="h-full w-full rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,226,140,0.75) 0%, rgba(255,196,80,0.4) 48%, rgba(255,170,40,0) 72%)",
        }}
        animate={still ? { opacity: 0.8 } : { opacity: [0.55, 1, 0.55], scale: [0.96, 1.05, 0.96] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
      />
    </motion.div>
  );
}

export function KathaTimeline() {
  const [isZoomed, setIsZoomed] = useState(false);
  const still = useReducedMotion() ?? false;
  const posterRef = useRef<HTMLDivElement>(null);

  // The brass pole draws itself downward as the poster scrolls past, a glowing spark at its tip.
  const { scrollYProgress } = useScroll({ target: posterRef, offset: ["start 80%", "end 75%"] });
  const poleClip = useTransform(scrollYProgress, [0, 1], ["inset(0% 0% 100% 0%)", "inset(0% 0% 0% 0%)"]);
  const sparkTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const sparkOpacity = useTransform(scrollYProgress, [0, 0.04, 0.94, 1], [0, 1, 1, 0]);

  return (
    <section className="relative overflow-hidden px-2.5 py-8 text-center sm:px-4" aria-label="कार्यक्रम विवरण">
      {/* Background ambient particles */}
      <Particles count={16} className="opacity-35" />

      <div className="relative mx-auto max-w-[430px]">
        <div
          ref={posterRef}
          className="relative w-full cursor-pointer select-none"
          style={{ aspectRatio: `${W} / ${H}` }}
          onClick={() => setIsZoomed(true)}
        >
          {/* Glows sit underneath every part */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute"
            style={{
              ...place([140, -40, 744, 360]),
              background:
                "radial-gradient(ellipse at 50% 50%, rgba(255,226,140,0.55) 0%, rgba(255,190,70,0.25) 45%, transparent 72%)",
            }}
            animate={still ? { opacity: 0.8 } : { opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          {PLAQUES.map((p, i) => (
            <Halo key={i} circle={p.circle} index={i} still={still} />
          ))}

          {/* Brass pole */}
          <div className="pointer-events-none absolute" style={place(POLE)}>
            <motion.img
              src={imgSrc(poleImg)}
              alt=""
              draggable={false}
              className="block h-full w-full"
              style={still ? {} : { clipPath: poleClip }}
            />
            {!still && (
              <motion.span
                aria-hidden
                className="absolute left-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  top: sparkTop,
                  opacity: sparkOpacity,
                  background:
                    "radial-gradient(circle, #fffbe6 0%, rgba(255,220,120,0.9) 35%, rgba(255,180,60,0) 70%)",
                }}
              />
            )}
          </div>

          {/* Header: drops in and settles */}
          <motion.img
            src={imgSrc(headerImg)}
            alt="कार्यक्रम विवरण"
            draggable={false}
            className="absolute block"
            style={{ ...place(HEADER), originY: 0 }}
            initial={still ? false : { opacity: 0, y: -28, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ type: "spring", stiffness: 110, damping: 13 }}
          />

          {/* The four events, one after another as they come into view */}
          {PLAQUES.map((p, i) => (
            <PlaqueGroup key={i} p={p} index={i} still={still} />
          ))}

          {/* Sparkles on the crest and the bells */}
          {!still && (
            <>
              <SparkleStar x={512} y={22} size={18} delay={0.4} />
              <SparkleStar x={186} y={238} size={14} delay={1.3} />
              <SparkleStar x={838} y={238} size={14} delay={2.2} />
              <SparkleStar x={90} y={212} size={12} delay={3} />
            </>
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          Interactive Fullscreen Modal for High-Res View
      ══════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 p-3 select-none backdrop-blur-sm"
            onClick={() => setIsZoomed(false)}
          >
            {/* Close Button Top-Right */}
            <button
              type="button"
              onClick={() => setIsZoomed(false)}
              className="absolute top-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white border border-white/30 hover:bg-white/30 cursor-pointer"
              aria-label="बंद करें"
            >
              <X className="h-6 w-6" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="relative max-h-[92vh] max-w-[94vw] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={imgSrc(posterFull)}
                alt="भव्य धार्मिक कार्यक्रम विवरण"
                className="max-h-[88vh] w-auto object-contain block mx-auto"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
