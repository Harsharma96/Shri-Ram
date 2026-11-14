/**
 * Ornate Blossom used in the "Made with … Invitima" watermark.
 * Rich 8-petal sacred lotus motif with glowing core and golden jewel.
 */
function Blossom() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Subtle warm glow behind the flower */}
      <div className="absolute inset-0 rounded-full bg-[#ff4d8d]/35 blur-[3px] transform scale-125" />
      <svg
        viewBox="-14 -14 28 28"
        className="relative h-7 w-7 sm:h-8 sm:w-8 shrink-0 drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="invitima-petal-1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ff70a5" />
            <stop offset="100%" stopColor="#d81b60" />
          </linearGradient>
          <linearGradient id="invitima-petal-2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ff9ec1" />
            <stop offset="100%" stopColor="#ec407a" />
          </linearGradient>
          <radialGradient id="invitima-center-gold" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff385" />
            <stop offset="65%" stopColor="#f5b842" />
            <stop offset="100%" stopColor="#c27803" />
          </radialGradient>
        </defs>

        {/* 8 Lotus Blossom Petals */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => (
          <path
            key={a}
            d="M0 -2 C3 -5 2.8 -11 0 -13.5 C-2.8 -11 -3 -5 0 -2 Z"
            fill={i % 2 === 0 ? "url(#invitima-petal-1)" : "url(#invitima-petal-2)"}
            transform={`rotate(${a})`}
          />
        ))}

        {/* Center rings & golden jewel */}
        <circle r="3.4" fill="#880e4f" />
        <circle r="2.3" fill="url(#invitima-center-gold)" />
        <circle r="1" fill="#ffffff" opacity="0.95" />
      </svg>
    </div>
  );
}

/**
 * Grand, royal "Made with Invitima" watermark.
 * Seamlessly colored with the sacred saffron (#df3b11) background.
 * Features prominent typography, glowing lotus blossom, and royal golden pill border.
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
        <Blossom />
        <span className="text-xl sm:text-2xl font-bold font-serif tracking-wider bg-gradient-to-r from-[#ffffff] via-[#ffeaa7] to-[#ffd77a] bg-clip-text text-transparent group-hover:from-[#ffffff] group-hover:via-[#fff4cc] group-hover:to-[#f5b842] drop-shadow-[0_1px_3px_rgba(0,0,0,0.35)]">
          Invitima
        </span>
      </a>
    </footer>
  );
}
