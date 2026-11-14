import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, type PanInfo } from "motion/react";
import { ChevronLeft, ChevronRight, Heart, Sparkles } from "lucide-react";
import { Divider } from "./Ornaments";
import { Reveal } from "./Reveal";

import sareeImg from "@/assets/product-saree.jpg";
import diyasImg from "@/assets/product-diyas.jpg";
import sweetsImg from "@/assets/product-sweets.jpg";
import hamperImg from "@/assets/product-hamper.jpg";
import templeHeroImg from "@/assets/temple-hero.jpg";
import ramDarbarImg from "@/assets/ram-darbar.png";

interface GalleryItem {
  id: string;
  title: string;
  image: string;
}

const galleryItems: GalleryItem[] = [
  { id: "shringar", title: "पीताम्बर एवं दिव्य शृंगार", image: sareeImg },
  { id: "aarti", title: "दीप प्रज्वलन एवं संध्या आरती", image: diyasImg },
  { id: "prasad", title: "छप्पन भोग एवं पावन महाप्रसाद", image: sweetsImg },
  { id: "mandap", title: "कथा मंडप एवं व्यासपीठ", image: hamperImg },
  { id: "mandir", title: "भव्य श्री राम जन्मभूमि मंदिर", image: templeHeroImg },
  { id: "ramdarbar", title: "प्रभु श्री राम दरबार दर्शन", image: ramDarbarImg },
];

const CARD_W = 240;
const STEP = CARD_W + 24; // distance between card centres, so the next one peeks in
const NAVY_INK = "#2b2966";

/** Shortest signed distance from the current slide, in (-n/2, n/2], so the carousel loops. */
function slideOffset(idx: number, current: number, n: number) {
  let d = idx - current;
  if (d > n / 2) d -= n;
  if (d <= -n / 2) d += n;
  return d;
}

/* ─────────────────────────── String of fairy lights ─────────────────────────── */

type Wire = { x0: number; y0: number; cx: number; cy: number; x1: number; y1: number };

function bulbsAlong(wire: Wire, count: number) {
  return Array.from({ length: count }, (_, i) => {
    const t = (i + 1) / (count + 1);
    const u = 1 - t;
    return {
      x: u * u * wire.x0 + 2 * u * t * wire.cx + t * t * wire.x1,
      y: u * u * wire.y0 + 2 * u * t * wire.cy + t * t * wire.y1,
    };
  });
}

/** The string of lights across the top of the gallery. */
const LIGHTS = {
  narrow: { width: 440, wire: { x0: -10, y0: 6, cx: 220, cy: 52, x1: 450, y1: 6 }, count: 15 },
};

function FairyLights({ still }: { still: boolean }) {
  const { width, wire: WIRE, count } = LIGHTS.narrow;
  const BULBS = bulbsAlong(WIRE, count);
  return (
    <svg
      viewBox={`0 0 ${width} 70`}
      className="pointer-events-none absolute inset-x-0 top-0 z-30 w-full"
      aria-hidden
    >
      <path
        d={`M${WIRE.x0} ${WIRE.y0} Q${WIRE.cx} ${WIRE.cy} ${WIRE.x1} ${WIRE.y1}`}
        fill="none"
        stroke="#0d0c2b"
        strokeWidth="1.4"
      />
      {BULBS.map((b, i) => (
        <g key={i}>
          <line x1={b.x} y1={b.y} x2={b.x} y2={b.y + 4} stroke="#0d0c2b" strokeWidth="1" />
          <motion.g
            animate={still ? { opacity: 1 } : { opacity: [1, 0.55, 1] }}
            transition={{ duration: 1.8 + (i % 4) * 0.45, repeat: Infinity, delay: i * 0.17 }}
          >
            <circle cx={b.x} cy={b.y + 7} r="6" fill="#ffd77a" opacity="0.55" />
            <circle cx={b.x} cy={b.y + 7} r="2.7" fill="#fff1c4" />
          </motion.g>
        </g>
      ))}
    </svg>
  );
}

/* ─────────────────────────── Drifting petals & hearts ─────────────────────────── */

function Blossom({ size, color }: { size: number; color: string }) {
  return (
    <svg viewBox="-10 -10 20 20" width={size} height={size}>
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse key={a} cx="0" cy="-4.6" rx="3.3" ry="4.8" fill={color} transform={`rotate(${a})`} />
      ))}
      <circle r="2" fill="#ffe3ec" />
    </svg>
  );
}

// Fixed positions (not random) so server and client render the same markup.
const PETALS = [
  { left: "5%", top: "6%", size: 14, color: "#f4a3c0", dur: 9 },
  { left: "86%", top: "9%", size: 11, color: "#c9a7f0", dur: 11 },
  { left: "14%", top: "38%", size: 10, color: "#f7b6cb", dur: 10 },
  { left: "92%", top: "44%", size: 13, color: "#f4a3c0", dur: 12 },
  { left: "3%", top: "68%", size: 12, color: "#c9a7f0", dur: 9.5 },
  { left: "80%", top: "76%", size: 10, color: "#f7b6cb", dur: 10.5 },
  { left: "48%", top: "92%", size: 9, color: "#f4a3c0", dur: 8.5 },
  { left: "24%", top: "88%", size: 11, color: "#f7b6cb", dur: 11.5 },
];
const HEARTS = [
  { left: "9%", top: "54%", size: 12 },
  { left: "88%", top: "62%", size: 10 },
  { left: "60%", top: "95%", size: 11 },
];

function FloatingPetals({ still }: { still: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {PETALS.map((p, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: p.left, top: p.top }}
          animate={still ? { opacity: 0.6 } : { y: [0, 16, 0], rotate: [0, 50, 0], opacity: [0.45, 0.85, 0.45] }}
          initial={{ opacity: 0.6 }}
          transition={{ duration: p.dur, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
        >
          <Blossom size={p.size} color={p.color} />
        </motion.div>
      ))}
      {HEARTS.map((h, i) => (
        <Heart
          key={i}
          className="absolute text-[#f4a3c0]/30"
          style={{ left: h.left, top: h.top, width: h.size, height: h.size }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────── Polaroid card ─────────────────────────── */

function Polaroid({
  item,
  active,
  liked,
  onLike,
  sway,
}: {
  item: GalleryItem;
  active: boolean;
  liked: boolean;
  onLike: () => void;
  sway: boolean;
}) {
  return (
    <motion.div
      style={{ transformOrigin: "50% 0%" }}
      animate={sway ? { rotate: [-1.1, 1.1] } : { rotate: 0 }}
      transition={
        sway
          ? { duration: 3.4, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }
          : { duration: 0.6 }
      }
      className="relative"
    >
      {/* Pink clothespin holding the photo on the string */}
      <div className="absolute -top-3 left-1/2 z-10 h-6 w-3.5 -translate-x-1/2 rounded-[3px] bg-gradient-to-b from-[#f9bccb] to-[#e98aa3]">
        <span className="absolute inset-x-0 top-2.5 h-[2px] bg-[#c96a85]/70" />
      </div>

      <div className="rounded-[3px] bg-[#fbf8f2] p-2.5 pb-0">
        <div className="relative h-[264px] overflow-hidden bg-[#0d0c2b]">
          <img
            src={item.image}
            alt={item.title}
            draggable={false}
            loading="lazy"
            className="h-full w-full select-none object-cover object-center"
          />
          <motion.button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onLike();
            }}
            whileTap={{ scale: 0.85 }}
            tabIndex={active ? 0 : -1}
            aria-label={liked ? `Unlike ${item.title}` : `Like ${item.title}`}
            aria-pressed={liked}
            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90"
          >
            <motion.span
              key={liked ? "on" : "off"}
              initial={{ scale: liked ? 0.4 : 1 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 14 }}
              className="flex"
            >
              <Heart
                className="h-4 w-4 text-[#e5486f]"
                fill={liked ? "#e5486f" : "transparent"}
                strokeWidth={2.2}
              />
            </motion.span>
          </motion.button>
        </div>

        <p
          className="font-script flex h-[62px] items-center justify-center px-2 text-center text-[1.5rem] leading-[1.05] text-balance"
          style={{ color: NAVY_INK }}
        >
          {item.title}
        </p>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────── Gallery ─────────────────────────── */

export function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [liked, setLiked] = useState<Set<string>>(() => new Set());
  const dragging = useRef(false);
  const reduceMotion = useReducedMotion() ?? false;
  const n = galleryItems.length;

  // Auto-advance every 4.5 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => setCurrentIndex((prev) => (prev + 1) % n), 4500);
    return () => clearInterval(timer);
  }, [isAutoPlaying, n]);

  const go = (idx: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(((idx % n) + n) % n);
  };

  const toggleLike = (id: string) =>
    setLiked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -45 || info.velocity.x < -450) go(currentIndex + 1);
    else if (info.offset.x > 45 || info.velocity.x > 450) go(currentIndex - 1);
    // Let the click that follows a drag see `dragging` before it is cleared
    setTimeout(() => (dragging.current = false), 0);
  };

  return (
    <section className="relative overflow-hidden py-16" id="gallery" aria-label="Shri Ram Katha Darshan">
      {/* Navy night-sky backdrop, faded at top and bottom into the page */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 85% 55% at 50% 45%, #2d2c7a 0%, #1f1e5e 45%, #16154a 100%)",
          maskImage:
            "linear-gradient(to bottom, transparent 0, black 56px, black calc(100% - 56px), transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0, black 56px, black calc(100% - 56px), transparent 100%)",
        }}
      />
      <FloatingPetals still={reduceMotion} />

      {/* Section Header */}
      <Reveal className="relative z-10 px-4 text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-white/5 px-3.5 py-1">
          <Sparkles className="h-3.5 w-3.5 animate-pulse text-gold-light" />
          <span className="font-hindi text-[0.72rem] font-bold tracking-[0.18em] text-gold-light">
            दिव्य झांकी • पावन दर्शन
          </span>
        </div>
        <h2 className="font-hindi mt-2.5 text-2xl font-bold leading-tight text-cream sm:text-3xl">
          श्री रामकथा <span className="text-gold-light">दर्शन</span>
        </h2>
        <p className="font-hindi mx-auto mt-2 max-w-[300px] text-xs leading-relaxed text-cream/80">
          प्रभु श्री राम की पावन लीलाओं और कथा के अलौकिक दृश्य
        </p>
        <Divider className="mx-auto mt-3 w-36" />
      </Reveal>

      {/* Polaroids hanging from a string of lights */}
      <div
        className="relative mt-8"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <FairyLights still={reduceMotion} />

        <motion.div
          className="relative h-[392px] w-full cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragStart={() => {
            dragging.current = true;
            setIsAutoPlaying(false);
          }}
          onDragEnd={handleDragEnd}
          aria-roledescription="carousel"
          aria-label="Gallery photos"
        >
          {galleryItems.map((item, idx) => {
            const d = slideOffset(idx, currentIndex, n);
            const active = d === 0;
            const visible = Math.abs(d) <= 1;
            const tilt = idx % 2 === 0 ? -1 : 1;
            return (
              <motion.div
                key={item.id}
                className="absolute left-1/2 top-[34px]"
                style={{
                  width: CARD_W,
                  marginLeft: -CARD_W / 2,
                  zIndex: active ? 20 : 10 - Math.abs(d),
                  pointerEvents: visible ? "auto" : "none",
                  cursor: active ? undefined : "pointer",
                }}
                initial={false}
                animate={{
                  x: d * STEP,
                  y: active ? 0 : 24,
                  rotate: active ? tilt * 1.5 : tilt * 5,
                  scale: active ? 1 : 0.9,
                  opacity: visible ? 1 : 0,
                }}
                transition={{ type: "spring", stiffness: 210, damping: 27 }}
                onClick={() => {
                  if (!active && !dragging.current) go(idx);
                }}
                aria-hidden={!active}
              >
                <Polaroid
                  item={item}
                  active={active}
                  liked={liked.has(item.id)}
                  onLike={() => toggleLike(item.id)}
                  sway={active && !reduceMotion}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Controls */}
      <div className="relative z-10 mt-5 flex items-center justify-center gap-5">
        <button
          type="button"
          onClick={() => go(currentIndex - 1)}
          aria-label="Previous photo"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-cream transition-all hover:bg-white/20 active:scale-95"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-1.5">
          {galleryItems.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => go(idx)}
              aria-label={`Photo ${idx + 1}: ${item.title}`}
              aria-current={idx === currentIndex}
              className={`h-1.5 cursor-pointer rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? "w-6 bg-[#f4a3c0]"
                  : "w-1.5 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(currentIndex + 1)}
          aria-label="Next photo"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-cream transition-all hover:bg-white/20 active:scale-95"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}
