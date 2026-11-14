"use client";

import { motion } from "motion/react";
import speakerImg from "@/assets/speaker.webp";
import { Particles } from "./Ornaments";
import { imgSrc } from "@/lib/image";

function SparkleStar({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="none"
      className={`pointer-events-none absolute text-[#fff3c4] ${className}`}
      animate={{
        scale: [0, 1.2, 0],
        rotate: [0, 90, 180],
        opacity: [0, 1, 0],
      }}
      transition={{
        duration: 2.4,
        repeat: Infinity,
        repeatDelay: 1.2,
        delay,
        ease: "easeInOut",
      }}
    >
      <path
        d="M12 0L14.2 9.8L24 12L14.2 14.2L12 24L9.8 14.2L0 12L9.8 9.8L12 0Z"
        fill="currentColor"
      />
    </motion.svg>
  );
}

function GoldLotus({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 24" className={className} aria-hidden>
      <defs>
        <linearGradient id="speaker-lotus" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff2bf" />
          <stop offset="55%" stopColor="#e7ba3b" />
          <stop offset="100%" stopColor="#a8700f" />
        </linearGradient>
      </defs>
      <g fill="url(#speaker-lotus)">
        <path d="M20 2c4 4 5 10 0 18c-5-8-4-14 0-18Z" />
        <path d="M20 20c-1-7-5-12-11-13c-1 7 4 12 11 13Z" />
        <path d="M20 20c1-7 5-12 11-13c1 7-4 12-11 13Z" />
        <path d="M20 21c-6 1-12 0-17-5c6-2 12 0 17 5Z" />
        <path d="M20 21c6 1 12 0 17-5c-6-2-12 0-17 5Z" />
      </g>
    </svg>
  );
}

export function KathaSchedule() {
  return (
    <section
      className="relative pt-4 pb-8 sm:pt-6 sm:pb-10 px-4 flex flex-col items-center justify-center overflow-hidden"
      aria-label="Katha Vyas Presentation"
    >
      {/* Floating subtle sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        <Particles count={16} className="opacity-40" />
      </div>

      <motion.div
        className="relative z-10 w-full max-w-[420px] flex flex-col items-center text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Eyebrow Pill Badge */}
        <motion.div
          className="inline-flex items-center gap-1.5 rounded-full border border-white/35 bg-white/15 px-4 py-1 mb-2.5"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="text-[0.65rem] text-[#fff8ea]">✦</span>
          <span className="font-hindi text-xs sm:text-[0.82rem] font-bold tracking-[0.2em] text-[#fff8ea] uppercase">
            पावन व्यासपीठ
          </span>
          <span className="text-[0.65rem] text-[#fff8ea]">✦</span>
        </motion.div>

        {/* Main Section Title */}
        <motion.h2
          className="font-hindi text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] via-[#fff5c2] to-[#ffd27a] tracking-wide mb-1"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          ॥ कथा व्यास ॥
        </motion.h2>

        {/* Speaker Image Container with Divine Golden Glow */}
        <div className="relative w-full max-w-[360px] flex items-center justify-center my-2">
          {/* Breathing Divine Halo Aura behind Maharaj ji */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 h-[320px] w-[320px] rounded-full mix-blend-screen"
            style={{
              background:
                "radial-gradient(circle, rgba(255,225,120,0.48) 0%, rgba(245,140,20,0.25) 42%, transparent 72%)",
            }}
            animate={{ opacity: [0.65, 0.95, 0.65], scale: [0.94, 1.05, 0.94] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Sparkle Stars on the Halo */}
          <SparkleStar className="left-[12%] top-[18%] h-5 w-5" delay={0.4} />
          <SparkleStar className="right-[14%] top-[22%] h-4 w-4" delay={1.8} />

          {/* Transparent Speaker Cutout */}
          <motion.img
            src={imgSrc(speakerImg)}
            alt="सामाजिक संत श्री रवि जी समदर्शी महाराज"
            draggable={false}
            className="relative z-10 w-full h-auto object-contain select-none"
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        {/* Royal Speaker Name Plaque */}
        <motion.div
          className="relative w-full max-w-[380px] mt-2 px-4 py-3.5 sm:px-5 sm:py-4 rounded-2xl bg-gradient-to-b from-[#6e1302]/85 via-[#520d00]/90 to-[#3b0800]/95 border border-[#ffd77a]/60 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-md flex flex-col items-center text-center overflow-hidden"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {/* Ornate Golden Filigree Corners */}
          <span className="absolute top-2 left-2 text-[#ffd77a]/70 text-[0.65rem] select-none" aria-hidden="true">✦</span>
          <span className="absolute top-2 right-2 text-[#ffd77a]/70 text-[0.65rem] select-none" aria-hidden="true">✦</span>
          <span className="absolute bottom-2 left-2 text-[#ffd77a]/70 text-[0.65rem] select-none" aria-hidden="true">✦</span>
          <span className="absolute bottom-2 right-2 text-[#ffd77a]/70 text-[0.65rem] select-none" aria-hidden="true">✦</span>

          {/* Top & Bottom Golden Border Glow Lines */}
          <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-[#ffd77a]/60 to-transparent" />
          <div className="absolute bottom-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-[#ffd77a]/60 to-transparent" />

          {/* 1. Revered Title / Honorific Badge */}
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#f5b842]/55 bg-[#f5b842]/15 px-3.5 py-0.5 mb-2">
            <span className="text-[0.55rem] text-[#ffd77a]">✦</span>
            <span className="font-hindi text-xs sm:text-[0.82rem] font-bold tracking-widest text-[#ffd77a]">
              सामाजिक संत
            </span>
            <span className="text-[0.55rem] text-[#ffd77a]">✦</span>
          </div>

          {/* 2. Main Revered Name in Royal Gold Typography */}
          <h3 className="font-hindi text-[1.4rem] sm:text-[1.75rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] via-[#fff6cf] to-[#ffd77a] tracking-wide leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]">
            <span className="whitespace-nowrap">श्री रवि जी</span>{" "}
            <span className="whitespace-nowrap">समदर्शी महाराज</span>
          </h3>

          {/* 3. Golden Lotus Divider */}
          <div className="flex items-center justify-center gap-2.5 my-2 w-full max-w-[200px] opacity-80">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#ffd77a]" />
            <GoldLotus className="h-3.5 w-6 text-[#ffd77a]" />
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#ffd77a]" />
          </div>

          {/* 4. Sacred Amritvarsha Subtitle */}
          <p className="font-hindi text-sm sm:text-base font-bold text-[#fff8ea] tracking-wider">
            के पावन श्रीमुख से अमृतवर्षा
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
