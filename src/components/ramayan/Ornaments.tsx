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

/** Subtle rangoli mandala (SVG) used as a glowing background motif. */
export function Rangoli({ className = "" }: { className?: string }) {
  const petals = Array.from({ length: 12 });
  return (
    <svg viewBox="0 0 200 200" className={`text-gold ${className}`} aria-hidden fill="none">
      <circle cx="100" cy="100" r="96" stroke="currentColor" strokeOpacity="0.35" />
      <circle cx="100" cy="100" r="70" stroke="currentColor" strokeOpacity="0.5" strokeDasharray="2 6" />
      <circle cx="100" cy="100" r="28" stroke="currentColor" strokeOpacity="0.6" />
      {petals.map((_, i) => (
        <g key={i} transform={`rotate(${i * 30} 100 100)`}>
          <path
            d="M100 8c10 18 10 36 0 54-10-18-10-36 0-54Z"
            stroke="currentColor"
            strokeOpacity="0.55"
          />
          <path d="M100 72c5 9 5 18 0 26-5-8-5-17 0-26Z" fill="currentColor" fillOpacity="0.35" />
          <circle cx="100" cy="16" r="1.8" fill="currentColor" />
        </g>
      ))}
      <circle cx="100" cy="100" r="6" fill="currentColor" fillOpacity="0.8" />
    </svg>
  );
}

/** Corner ornament for framed sections */
export function Corner({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={`text-gold ${className}`} aria-hidden fill="none">
      <path d="M2 58V14C2 7 7 2 14 2h44" stroke="currentColor" strokeOpacity="0.7" />
      <path d="M8 58V18c0-5 5-10 10-10h40" stroke="currentColor" strokeOpacity="0.35" />
      <circle cx="14" cy="14" r="2.5" fill="currentColor" />
      <path d="M14 8c3 3 3 9 0 12-3-3-3-9 0-12ZM8 14c3-3 9-3 12 0-3 3-9 3-12 0Z" fill="currentColor" fillOpacity="0.7" />
    </svg>
  );
}

/** Flickering diya glow (CSS only) */
export function Flame({ className = "" }: { className?: string }) {
  return (
    <span className={`relative inline-block ${className}`} aria-hidden>
      <span className="absolute inset-0 rounded-full bg-gold-light/70 animate-flicker" />
      <span className="absolute inset-[25%] rounded-full bg-cream animate-flicker" style={{ animationDelay: "0.4s" }} />
    </span>
  );
}
