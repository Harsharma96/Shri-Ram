import { useState, useEffect, useRef, useCallback } from "react";
import { Check, Copy, MessageCircle, Sparkles, Timer as TimerIcon, Gift, PartyPopper } from "lucide-react";
import { offer, shop, whatsappLink } from "@/data/business";
import { Corner, Particles } from "./Ornaments";
import { Reveal } from "./Reveal";

export function Offer() {
  const [copied, setCopied] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Live Countdown Timer
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    // Target: Valid till 25 October or 3-day urgent festive window
    const now = new Date();
    let target = new Date(now.getFullYear(), 9, 25, 23, 59, 59); // Oct 25
    if (target.getTime() <= now.getTime()) {
      target = new Date(now.getTime() + (3 * 24 + 14) * 60 * 60 * 1000);
    }

    const updateTimer = () => {
      const diff = Math.max(0, target.getTime() - Date.now());
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);

      setTimeLeft({
        days: String(d).padStart(2, "0"),
        hours: String(h).padStart(2, "0"),
        minutes: String(m).padStart(2, "0"),
        seconds: String(s).padStart(2, "0"),
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(offer.coupon);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  const handleReveal = useCallback(() => {
    if (isRevealed) return;
    setIsRevealed(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3500);
  }, [isRevealed]);

  return (
    <section className="relative overflow-hidden px-4 py-8" id="offer">
      <Particles count={14} className="opacity-40" />

      {/* Confetti Burst Overlay */}
      {showConfetti && <FestiveConfetti />}

      <div className="relative mx-auto max-w-sm">
        <Reveal amount={0.3}>
          <div
            className="relative rounded-3xl p-[1.5px]"
            style={{
              background:
                "linear-gradient(135deg, #ffd875 0%, #f59e0b 35%, #b91c1c 70%, #d97706 100%)",
            }}
          >
            <div className="glass-fog ornament-frame relative overflow-hidden rounded-3xl px-4 py-6 text-center">
              <Corner className="absolute left-3 top-3 h-6 w-6" />
              <Corner className="absolute right-3 top-3 h-6 w-6 rotate-90" />
              <Corner className="absolute bottom-3 right-3 h-6 w-6 rotate-180" />
              <Corner className="absolute bottom-3 left-3 h-6 w-6 -rotate-90" />

              {/* Title & Badge */}
              <p className="eyebrow flex items-center justify-center gap-1.5 text-[0.7rem] font-bold tracking-[0.25em] text-gold-light">
                <Sparkles className="h-3.5 w-3.5 text-gold-light animate-pulse" /> {offer.title}
              </p>
              <h2 className="font-display text-gold-light mt-1.5 text-3xl sm:text-4xl font-black leading-none tracking-wide">
                {offer.discount}
              </h2>
              <p className="font-sans mt-1 text-xs font-bold tracking-wide text-gold-light/95">
                {offer.subtitle}
              </p>

              {/* ══════════════════════════════════════════════════
                  1. LIVE FESTIVE COUNTDOWN TIMER
              ══════════════════════════════════════════════════ */}
              <div className="mx-auto mt-4 max-w-[290px] rounded-2xl border border-gold/30 bg-[#0c0502]/85 p-2.5">
                <div className="flex items-center justify-center gap-1.5 text-[0.62rem] font-black uppercase tracking-[0.2em] text-amber-300">
                  <TimerIcon className="h-3 w-3 text-gold-light animate-spin" style={{ animationDuration: "8s" }} />
                  <span>Offer Ends In • सीमित समय छूट</span>
                </div>

                <div className="mt-2 grid grid-cols-4 gap-1.5">
                  <TimerDigit value={timeLeft.days} label="Days" />
                  <TimerDigit value={timeLeft.hours} label="Hours" />
                  <TimerDigit value={timeLeft.minutes} label="Mins" />
                  <TimerDigit value={timeLeft.seconds} label="Secs" isPulse />
                </div>
              </div>

              {/* ══════════════════════════════════════════════════
                  2. INTERACTIVE SCRATCH CARD FOR COUPON
              ══════════════════════════════════════════════════ */}
              <div className="mx-auto mt-4 max-w-[280px]">
                <div className="flex items-center justify-center gap-1 text-[0.6rem] font-bold uppercase tracking-wider text-amber-200/90 mb-1.5">
                  {isRevealed ? (
                    <span className="flex items-center gap-1 text-emerald-400 font-extrabold animate-bounce">
                      <PartyPopper className="h-3.5 w-3.5" /> Coupon Unlocked! बधाई हो!
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-gold-light">
                      <Gift className="h-3 w-3" /> Scratch below to reveal secret coupon!
                    </span>
                  )}
                </div>

                <div className="relative mx-auto h-[62px] w-full select-none overflow-hidden rounded-2xl border-2 border-dashed border-gold/80 bg-gradient-to-r from-[#180903] via-[#240e05] to-[#180903]">
                  {/* Underneath: Revealed Coupon Code */}
                  <div className="absolute inset-0 flex items-center justify-between px-4 py-2">
                    <div className="text-left">
                      <p className="text-[0.55rem] font-black uppercase tracking-[0.28em] text-gold-light leading-none">
                        PROMO CODE
                      </p>
                      <p className="font-display text-lg font-black tracking-[0.25em] text-cream mt-1 leading-none">
                        {offer.coupon}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={copy}
                      disabled={!isRevealed}
                      className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-black transition-all ${
                        isRevealed
                          ? "bg-gradient-to-r from-gold-light via-gold to-gold-deep text-[#080512] hover:scale-105 active:scale-95"
                          : "opacity-40 cursor-not-allowed bg-gold/20 text-cream/50"
                      }`}
                      aria-label="Copy coupon code"
                    >
                      {copied ? (
                        <>
                          <Check className="h-3.5 w-3.5 stroke-[3]" />
                          <span>COPIED!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5 stroke-[2.5]" />
                          <span>COPY</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Overneath: Canvas Scratch Layer */}
                  {!isRevealed && (
                    <ScratchCanvas onReveal={handleReveal} isRevealed={isRevealed} />
                  )}
                </div>

                {/* Instant Tap Option for ease */}
                {!isRevealed && (
                  <button
                    type="button"
                    onClick={handleReveal}
                    className="mt-1.5 text-[0.62rem] font-bold text-gold-light/80 hover:text-gold-light underline decoration-dashed transition-colors"
                  >
                    Or tap here to instantly reveal
                  </button>
                )}
              </div>

              <p className="mt-2 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-cream/70">
                {offer.validity}
              </p>

              <p className="mx-auto mt-2.5 max-w-[280px] text-xs font-semibold leading-relaxed text-cream/90">
                {offer.description}
              </p>

              <div className="mt-4 flex flex-col gap-2">
                <a href={offer.ctaLink} className="btn-gold !py-2 !text-xs !rounded-xl">
                  {offer.cta}
                </a>
                <a
                  href={whatsappLink(
                    `Namaste ${shop.name}! I scratched and got the coupon code ${offer.coupon}. I'd like to place an order.`
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-whatsapp !py-2 !text-xs !rounded-xl"
                >
                  <MessageCircle className="h-3.5 w-3.5" /> Order on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Individual Countdown Unit */
function TimerDigit({ value, label, isPulse = false }: { value: string; label: string; isPulse?: boolean }) {
  return (
    <div className="flex flex-col items-center rounded-xl bg-gradient-to-b from-[#1a0a04] to-[#0c0402] border border-gold/35 p-1.5">
      <span
        className={`font-display text-lg sm:text-xl font-black text-amber-200 tracking-wider tabular-nums ${
          isPulse ? "animate-pulse text-gold-light" : ""
        }`}
      >
        {value}
      </span>
      <span className="text-[0.52rem] font-bold uppercase tracking-wider text-cream/60 mt-0.5">
        {label}
      </span>
    </div>
  );
}

/** Interactive HTML5 Canvas Scratch Surface */
function ScratchCanvas({ onReveal, isRevealed }: { onReveal: () => void; isRevealed: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawing = useRef(false);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);

  // Initialize Gold Foil on Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    // Gold Foil Shimmer Gradient
    const grad = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    grad.addColorStop(0, "#ffd54f");
    grad.addColorStop(0.25, "#d97706");
    grad.addColorStop(0.5, "#fff3b0");
    grad.addColorStop(0.75, "#b45309");
    grad.addColorStop(1, "#f59e0b");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Decorative sparkles / diamond stars pattern
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    for (let x = 12; x < rect.width; x += 24) {
      for (let y = 10; y < rect.height; y += 20) {
        ctx.beginPath();
        ctx.arc(x, y, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Border inner glow on scratch card
    ctx.strokeStyle = "#fff275";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(3, 3, rect.width - 6, rect.height - 6);

    // Prominent call-to-action text on foil
    ctx.fillStyle = "#1e0902";
    ctx.font = "900 12px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("✨ SCRATCH TO REVEAL ✨", rect.width / 2, rect.height / 2 - 7);

    ctx.font = "bold 9.5px sans-serif";
    ctx.fillStyle = "#451a03";
    ctx.fillText("कूपन कोड के लिए स्क्रैच करें", rect.width / 2, rect.height / 2 + 9);
  }, []);

  // Calculate percentage of area scratched
  const checkScratchPercentage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;
    let transparent = 0;
    const totalSampled = data.length / 16; // sample every 4th pixel (RGBA = 4 * 4)

    for (let i = 3; i < data.length; i += 16) {
      if (data[i] < 120) {
        transparent++;
      }
    }

    const ratio = transparent / totalSampled;
    // Auto reveal when 38% has been scratched
    if (ratio >= 0.38) {
      onReveal();
    }
  }, [isRevealed, onReveal]);

  // Erase circular path along swipe/drag
  const scratchAt = useCallback(
    (x: number, y: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.globalCompositeOperation = "destination-out";
      ctx.lineWidth = 32;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      if (lastPoint.current) {
        ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
        ctx.lineTo(x, y);
      } else {
        ctx.arc(x, y, 16, 0, Math.PI * 2);
      }
      ctx.stroke();

      lastPoint.current = { x, y };
      checkScratchPercentage();
    },
    [checkScratchPercentage]
  );

  // Mouse handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDrawing.current = true;
    const rect = e.currentTarget.getBoundingClientRect();
    lastPoint.current = null;
    scratchAt(e.clientX - rect.left, e.clientY - rect.top);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    scratchAt(e.clientX - rect.left, e.clientY - rect.top);
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
    lastPoint.current = null;
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    isDrawing.current = true;
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    lastPoint.current = null;
    scratchAt(touch.clientX - rect.left, touch.clientY - rect.top);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    scratchAt(touch.clientX - rect.left, touch.clientY - rect.top);
  };

  const handleTouchEnd = () => {
    isDrawing.current = false;
    lastPoint.current = null;
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="absolute inset-0 h-full w-full cursor-grab active:cursor-grabbing touch-none z-10 transition-opacity duration-500"
    />
  );
}

/** Lightweight Festive Confetti Celebration */
function FestiveConfetti() {
  const particles = Array.from({ length: 24 });
  const colors = ["#f59e0b", "#ffd700", "#ef4444", "#10b981", "#ec4899", "#f97316"];

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {particles.map((_, i) => {
        const left = Math.random() * 90 + 5;
        const color = colors[i % colors.length];
        const delay = Math.random() * 0.4;
        const duration = 1.8 + Math.random() * 1.2;
        const size = 6 + Math.random() * 6;

        return (
          <div
            key={i}
            className="absolute rounded-sm animate-fall"
            style={{
              left: `${left}%`,
              top: "-20px",
              width: `${size}px`,
              height: `${size * 1.5}px`,
              backgroundColor: color,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        );
      })}
    </div>
  );
}
