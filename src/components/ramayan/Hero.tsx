"use client";

import { motion, type MotionValue } from "motion/react";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import heroBgMobile from "@/assets/hero-bg-mobile.webp";
import heroCloudsMobile from "@/assets/hero-clouds-mobile.webp";
import templeMobile from "@/assets/temple-mobile.webp";
import ramShrine from "@/assets/ram-lalla-darshan.webp";
import { heroTitle } from "@/data/business";
import { Particles } from "./Ornaments";
import { FlowerShower } from "./FlowerShower";
import { imgSrc } from "@/lib/image";

type Motionable<T> = MotionValue<T> | T;

/** Centre of the lit sanctum door within the temple picture (fractions of its width/height). */
export const SANCTUM_DOOR = { x: 0.498, y: 0.763 } as const;

/** Height of the flag-pole tip (the temple's highest point) within the temple picture. */
export const FLAG_TIP_Y = 0.14;

/** Height of the golden kalash crowning the main spire, within the temple picture. */
export const SPIRE_KALASH_Y = 0.31;

/**
 * The temple scene, in three depth layers — each with a phone (portrait) and a desktop (landscape)
 * picture:
 *   far   sunset river and clouds; taller than the screen so it can glide upward on scroll,
 *         and always drifting very slowly
 *   mid   the temple, standing on the clouds (title `children` render just behind it, so the
 *         letters can rise out from behind the spire)
 *   near  a bank of clouds in front of the temple's base, which rises fastest
 * Moving the layers at different speeds is what makes the scroll feel like real depth.
 * The gate renders the same scene (at the hero's resting values) for a seamless hand-off.
 */
export function TempleScene({
  bgY = "0%",
  templeY = "0vh",
  templeScale = 1,
  cloudsY = "6vh",
  priority = false,
  templeRef,
  children,
}: {
  bgY?: Motionable<string>;
  templeY?: Motionable<string>;
  templeScale?: Motionable<number>;
  cloudsY?: Motionable<string>;
  priority?: boolean;
  /** The temple's box — the gate measures it to aim its zoom at the sanctum door. */
  templeRef?: React.Ref<HTMLDivElement>;
  children?: React.ReactNode;
}) {
  const fetchPriority = priority ? "high" : "auto";
  return (
    <>
      <motion.div
        aria-hidden
        className="absolute inset-x-0 top-0 z-0 h-[128%] overflow-hidden will-change-transform"
        style={{ y: bgY }}
      >
        <picture className="block h-full w-full animate-bg-drift">
          <img
            src={imgSrc(heroBgMobile)}
            alt=""
            className="h-full w-full object-cover object-top"
            fetchPriority={fetchPriority}
          />
        </picture>
      </motion.div>

      {children}

      {/* Divine Golden Halo radiating softly behind the ornate temple spires */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 bottom-[28svh] z-10 h-[520px] w-[520px] -translate-x-1/2 rounded-full mix-blend-screen"
        style={{
          background:
            "radial-gradient(circle, rgba(255,215,110,0.48) 0%, rgba(255,160,40,0.24) 45%, transparent 72%)",
        }}
        animate={{ opacity: [0.7, 1, 0.7], scale: [0.95, 1.06, 0.95] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Phones: grand, prominent & edge-to-edge width */}
      <motion.div
        ref={templeRef}
        className="pointer-events-none absolute bottom-[2svh] left-1/2 z-20 w-[128%] -translate-x-1/2 will-change-transform [mask-image:linear-gradient(to_bottom,black_84%,transparent_100%)]"
        style={{ y: templeY, scale: templeScale, originY: 1 }}
      >
        <picture className="block">
          <img
            src={imgSrc(templeMobile)}
            alt="Shri Ram Mandir glowing at sunset, above the clouds"
            className="block h-auto w-full"
            fetchPriority={fetchPriority}
          />
        </picture>
      </motion.div>

      {/* Reaches well below the screen, so its bottom edge never shows as it rises */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-[26vh] z-25 h-[calc(22%+26vh)] will-change-transform"
        style={{ y: cloudsY }}
      >
        <picture className="block h-full w-full">
          <img src={imgSrc(heroCloudsMobile)} alt="" className="h-full w-full object-cover object-top" />
        </picture>
      </motion.div>
    </>
  );
}

/**
 * Darshan inside the sanctum — Prabhu Shri Ram (Ram Lalla) under the flower canopy.
 * - Crystal clear face without dark shadows or intrusive overlays.
 * - Clean, stable presentation: NO zoom on scroll.
 * - Prominent, animated "नीचे स्क्रॉल करें" (Scroll Down) button to guide visitors.
 */
export function Hero({ introReady = true }: { introReady?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={ref}
      className="relative h-svh md:h-[min(860px,90svh)] w-full overflow-hidden bg-[#df3b11]"
      aria-label="Shri Ram darshan"
      style={{
        maskImage:
          "linear-gradient(to bottom, black 0%, black calc(100% - 60px), transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, black 0%, black calc(100% - 60px), transparent 100%)",
      }}
    >
      {/* No visible text — the name stays for screen readers and search engines */}
      <h1 className="sr-only">
        {heroTitle.top} {heroTitle.bottom}
      </h1>

      {/* Main Ram Lalla Shrine Image - NO ZOOM on scroll, perfectly centered, crystal clear */}
      <div className="absolute inset-0 z-0">
        <img
          src={imgSrc(ramShrine)}
          alt="Prabhu Shri Ram (Ram Lalla) in the sanctum, under a canopy of marigold and jasmine"
          className="h-full w-full object-cover object-center select-none"
          fetchPriority="high"
        />
      </div>

      {/* Pushp varsha: real flowers rain down once the gate opens, then keep falling at the edges */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[9] overflow-hidden"
      >
        <FlowerShower start={introReady} />
      </div>

      {/* Floating subtle golden particles */}
      <div className="pointer-events-none absolute inset-0 z-[5]">
        <Particles count={14} className="opacity-50" />
      </div>

      {/* The door's golden light clearing gently once the gate opens */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[8] bg-[radial-gradient(circle_at_50%_45%,#fff6dc_0%,#ffd98a_45%,#f0a13e_100%)]"
        initial={{ opacity: 0.75 }}
        animate={{ opacity: introReady ? 0 : 0.75 }}
        transition={{ duration: 1.8, delay: 0.15, ease: "easeOut" }}
      />

      {/* Bottom Vignette ONLY at the very bottom (floor), smoothly blending into #df3b11 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-20 z-10 bg-gradient-to-t from-[#df3b11] via-[#df3b11]/70 to-transparent"
      />

      {/* Prominent, Royal Devotional Scroll Down Indicator */}
      <div className="absolute inset-x-0 bottom-4 z-30 flex justify-center pointer-events-auto">
        <motion.button
          onClick={() => {
            const el = document.getElementById("greeting-scroll");
            if (el) {
              el.scrollIntoView({ behavior: "smooth" });
            } else {
              window.scrollBy({ top: window.innerHeight * 0.85, behavior: "smooth" });
            }
          }}
          className="group flex flex-col items-center gap-1.5 focus:outline-none cursor-pointer select-none"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="नीचे स्क्रॉल करें"
        >
          {/* Glowing Glass Pill Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-[#ba2e0a] px-4 py-1.5 transition-all duration-300 group-hover:border-white/60 group-hover:bg-[#df3b11]">
            <span className="text-[0.65rem] text-[#fff8ea] animate-pulse">✦</span>
            <span className="font-hindi text-xs sm:text-sm font-bold tracking-[0.2em] text-[#ffffff] uppercase">
              नीचे स्क्रॉल करें
            </span>
            <span className="text-[0.65rem] text-[#fff8ea] animate-pulse">✦</span>
          </div>

          {/* Bouncing Chevron Arrow */}
          <motion.div
            className="flex h-7 w-7 items-center justify-center rounded-full border border-white/40 bg-white/20 text-[#fff8ea] transition-colors group-hover:bg-white/30"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="h-4 w-4 text-[#fff8ea] stroke-[2.5]" />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
}
