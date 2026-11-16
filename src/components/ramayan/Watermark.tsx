"use client";

import emblemImg from "@/assets/shri-ramkatha-emblem.png";
import { imgSrc } from "@/lib/image";

/**
 * Ornate Golden Shri Ram Katha Emblem used in the "Made with … Invitima" watermark.
 * Features warm golden divine aura and crisp drop shadow.
 */
function EmblemLogo() {
  return (
    <div className="relative flex items-center justify-center shrink-0">
      {/* Subtle warm golden aura behind the emblem */}
      <div className="absolute inset-0 rounded-full bg-[#ffd77a]/35 blur-[5px] transform scale-125" />
      <img
        src={imgSrc(emblemImg)}
        alt="श्री रामकथा निमंत्रण Emblem"
        width={38}
        height={38}
        className="relative h-8 w-8 sm:h-9 sm:w-9 object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]"
      />
    </div>
  );
}

/**
 * Grand, royal "Made with Invitima" watermark.
 * Seamlessly colored with the sacred saffron (#df3b11) background.
 * Features prominent typography, glowing golden Jai Shri Ram emblem, and royal golden pill border.
 */
export function Watermark() {
  return (
    <footer className="relative w-full bg-[#df3b11] pt-6 pb-14 px-4 flex flex-col items-center justify-center overflow-hidden">
      {/* Elegant Golden Filigree Divider */}
      <div className="flex items-center justify-center gap-3 w-full max-w-[280px] mb-4 opacity-80">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#ffd77a]/40 to-[#ffd77a]" />
        <span className="text-[#ffd77a] text-xs font-serif tracking-widest">✦ ॐ ✦</span>
        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#ffd77a]/40 to-[#ffd77a]" />
      </div>

      {/* Royal Watermark Pill Badge */}
      <a
        href="https://invitima.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Made with Invitima"
        className="group relative inline-flex items-center justify-center gap-3 px-6 py-2.5 rounded-full bg-[#b82f0c]/75 hover:bg-[#a62808] border border-[#ffd77a]/55 hover:border-[#ffd77a] shadow-[0_4px_22px_rgba(0,0,0,0.25)] hover:shadow-[0_6px_28px_rgba(255,215,122,0.35)] transition-all duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer"
      >
        <span className="text-sm sm:text-base font-medium tracking-wide text-[#fff1cc]/95 font-sans">
          Made with
        </span>
        <EmblemLogo />
        <span className="text-xl sm:text-2xl font-bold font-serif tracking-wider bg-gradient-to-r from-[#ffffff] via-[#ffeaa7] to-[#ffd77a] bg-clip-text text-transparent group-hover:from-[#ffffff] group-hover:via-[#fff4cc] group-hover:to-[#f5b842] drop-shadow-[0_1px_3px_rgba(0,0,0,0.35)]">
          Invitima
        </span>
      </a>
    </footer>
  );
}
