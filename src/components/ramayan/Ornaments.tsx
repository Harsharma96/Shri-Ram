"use client";

import { useMemo } from "react";

/** Floating golden light particles. */
export function Particles({ count = 26, className = "" }: { count?: number; className?: string }) {
  const dots = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: (i * 37 + 11) % 100,
        size: 2 + ((i * 7) % 4),
        delay: (i * 1.37) % 12,
        duration: 12 + ((i * 3) % 9),
        sway: ((i % 2 === 0 ? 1 : -1) * (10 + ((i * 5) % 30))),
      })),
    [count],
  );
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {dots.map((d, i) => (
        <span
          key={i}
          className="absolute bottom-[-5vh] rounded-full bg-gold-light animate-rise"
          style={{
            left: `${d.left}%`,
            width: d.size,
            height: d.size,
            animationDelay: `${d.delay}s`,
            animationDuration: `${d.duration}s`,
            ["--sway" as string]: `${d.sway}px`,
          }}
        />
      ))}
    </div>
  );
}

/** Ornamental divider: line · diamond · line */
export function Divider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`} aria-hidden>
      <span className="gold-line flex-1" />
      <svg width="34" height="14" viewBox="0 0 34 14" fill="none" className="text-gold">
        <path d="M17 1 23 7 17 13 11 7Z" stroke="currentColor" strokeWidth="1" />
        <circle cx="17" cy="7" r="1.6" fill="currentColor" />
        <path d="M0 7h8M26 7h8" stroke="currentColor" strokeWidth="1" />
      </svg>
      <span className="gold-line flex-1" />
    </div>
  );
}
