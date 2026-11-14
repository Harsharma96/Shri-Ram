import { MotionConfig, animate, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { gateBlessing } from "@/data/business";

const ease = [0.22, 1, 0.36, 1] as const;
/** Eases out of the spire, speeds upward, then glides to rest. */
const flight = [0.5, 0, 0.15, 1] as const;

const T = {
  /** Pause after the temple appears before the first line leaves it. */
  start: 0.15,
  /** Gap between one line leaving the temple and the next. */
  step: 0.14,
  /** Time each line takes to fly from the spire to its place. */
  fly: 1.1,
  /** First shine across the gold heading. */
  shine: 2.4,
} as const;

/** Dark edge + warm glow, so the letters read on bright sky and dark clouds alike. */
const TEXT_SHADOW =
  "0 1px 2px rgba(30,4,0,0.95), 0 0 10px rgba(30,4,0,0.6), 0 0 22px rgba(255,160,60,0.35)";

/** A burst of golden light behind a line as it lands. */
function LandingGlow() {
  return (
    <span
      data-glow
      aria-hidden
      className="pointer-events-none absolute -inset-x-8 -inset-y-3 z-[-1] bg-[radial-gradient(ellipse_closest-side,rgba(255,214,130,0.6),rgba(255,170,60,0.22)_55%,transparent)] opacity-0"
    />
  );
}

/**
 * The blessing at the top of the temple intro — no box, just separate lines of text:
 * "॥ जय श्री राम ॥", "श्री रामचरितमानस" and the two chaupai lines. Each one flies up out of the
 * temple's spire as a spark of light, one after another, and lands in its place with a soft glow.
 * Plays by itself on load and fades away once the visitor taps to enter.
 *
 * Both points are px from the top of the screen:
 *   `flagTip`     the temple's flag-pole tip; on short screens the text shrinks to stay above it
 *   `launchFrom`  the spire's kalash, where the lines take off
 */
export function GateBlessing({
  hidden = false,
  flagTip,
  launchFrom,
}: {
  hidden?: boolean;
  flagTip?: number | undefined;
  launchFrom?: number | undefined;
}) {
  const reduceMotion = useReducedMotion();
  const boxRef = useRef<HTMLDivElement>(null);
  const flyRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dividerRef = useRef<HTMLDivElement>(null);
  const launched = useRef(false);
  const [natural, setNatural] = useState<{ top: number; height: number } | null>(null);

  // The block's unscaled position and size (offset* ignore transforms, so scaling can't feed back).
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const read = () => setNatural({ top: el.offsetTop, height: el.offsetHeight });
    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const maxBottom = flagTip != null ? flagTip - 12 : undefined;
  const fit =
    maxBottom != null && natural && natural.height > 0
      ? Math.min(1, Math.max(0.74, (maxBottom - natural.top) / natural.height))
      : 1;

  // Launch every line from the spire once we know where the temple is
  useEffect(() => {
    const box = boxRef.current;
    if (!box || launched.current) return;

    const launch = (fromY: number) => {
      if (launched.current) return;
      launched.current = true;

      flyRefs.current.forEach((el, i) => {
        if (!el) return;
        const delay = T.start + i * T.step;
        if (reduceMotion) {
          animate(el, { opacity: [0, 1] }, { duration: 0.6, delay });
          return;
        }
        // Distance from the spire to where this line rests (in the block's own, scaled, space)
        const restY = box.offsetTop + (el.offsetTop + el.offsetHeight / 2) * fit;
        const fromOffset = (fromY - restY) / fit;
        animate(el, { y: [fromOffset, 0], scale: [0.2, 1] }, { duration: T.fly, delay, ease: flight });
        animate(el, { opacity: [0, 1] }, { duration: 0.3, delay, ease: "easeOut" });
        animate(
          el,
          { filter: ["blur(6px) brightness(2.2)", "blur(0px) brightness(1)"] },
          { duration: T.fly * 0.9, delay, ease: "easeOut" },
        );
        const glow = el.querySelector<HTMLElement>("[data-glow]");
        if (glow) {
          animate(
            glow,
            { opacity: [0, 0.9, 0], scale: [0.5, 1.1, 1.35] },
            { duration: 1.1, delay: delay + T.fly * 0.45, ease: "easeOut" },
          );
        }
      });

      // The divider draws outward once the heading has landed
      const divider = dividerRef.current;
      if (divider) {
        const at = T.start + T.fly * 0.7;
        const [left, gem, right] = Array.from(divider.children) as HTMLElement[];
        animate(divider, { opacity: [0, 1] }, { duration: 0.3, delay: at });
        if (!reduceMotion && left && gem && right) {
          animate([left, right], { scaleX: [0, 1] }, { duration: 0.7, delay: at, ease });
          animate(gem, { scale: [0.3, 1], rotate: [-90, 0] }, { duration: 0.7, delay: at, ease });
        }
      }
    };

    if (launchFrom != null || flagTip != null) {
      launch(launchFrom ?? (flagTip ?? 0) + 24);
      return;
    }
    // Temple picture slow to load: take off from roughly where the spire will be
    const fallback = setTimeout(() => {
      const frameHeight = (box.offsetParent as HTMLElement | null)?.clientHeight ?? 700;
      launch(frameHeight * 0.42);
    }, 1400);
    return () => clearTimeout(fallback);
  }, [flagTip, launchFrom, fit, reduceMotion]);

  const heading = gateBlessing.heading.split(/\s+/);

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        ref={boxRef}
        className="pointer-events-none absolute inset-x-0 z-30 flex flex-col items-center px-4 text-center"
        style={{
          top: "calc(env(safe-area-inset-top, 0px) + max(18px, 3.6svh))",
          scale: fit,
          originY: 0,
        }}
        initial={false}
        animate={
          hidden
            ? { opacity: 0, y: -18, transitionEnd: { visibility: "hidden" } }
            : { opacity: 1, y: 0, visibility: "visible" }
        }
        transition={{ duration: 0.6, ease }}
      >
        {/* Sky darkens softly behind the words (an edgeless shadow, not a box) for legibility */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -top-12 -bottom-16 left-1/2 z-[-1] w-[135%] -translate-x-1/2 bg-[radial-gradient(ellipse_closest-side,rgba(28,5,10,0.5),rgba(28,5,10,0.22)_55%,transparent)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: T.start }}
        />

        {/* ॥ जय श्री राम ॥ */}
        <div
          ref={(el) => {
            flyRefs.current[0] = el;
          }}
          className="relative"
          style={{ opacity: 0 }}
        >
          <LandingGlow />
          <p
            className="font-royal flex flex-wrap justify-center gap-x-[0.3em] leading-[1.2]"
            style={{
              fontSize: "clamp(1.6rem, 5svh, 2.35rem)",
              filter:
                "drop-shadow(0 2px 1px rgba(45,6,0,0.9)) drop-shadow(0 0 16px rgba(255,180,80,0.5))",
            }}
          >
            {heading.map((word, i) => (
              <span
                key={i}
                className="text-shimmer-gold motion-safe:animate-gold-shimmer -mx-[0.08em] -my-[0.2em] inline-block px-[0.08em] py-[0.2em]"
                style={{ animationDelay: `${T.shine + i * 0.16}s` }}
              >
                {word}
              </span>
            ))}
          </p>
        </div>

        {/* Ornamental divider: line · diamond · line */}
        <div
          ref={dividerRef}
          aria-hidden
          className="flex w-full max-w-[220px] items-center gap-2"
          style={{ opacity: 0, marginBlock: "clamp(5px, 1.1svh, 9px)" }}
        >
          <span className="h-px flex-1 origin-right bg-gradient-to-l from-[#ffd98a] via-[#ffd98a]/60 to-transparent" />
          <svg viewBox="0 0 34 14" fill="none" className="h-3.5 w-[34px] text-[#ffd98a]">
            <path d="M17 1 23 7 17 13 11 7Z" stroke="currentColor" strokeWidth="1.1" />
            <circle cx="17" cy="7" r="1.8" fill="currentColor" />
            <path d="M3 7h6M25 7h6" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
          </svg>
          <span className="h-px flex-1 origin-left bg-gradient-to-r from-[#ffd98a] via-[#ffd98a]/60 to-transparent" />
        </div>

        {/* श्री रामचरितमानस */}
        <div
          ref={(el) => {
            flyRefs.current[1] = el;
          }}
          className="relative"
          style={{ opacity: 0 }}
        >
          <LandingGlow />
          <p
            className="font-hindi flex items-center gap-2 leading-[1.5] text-[#ffdf9a]"
            style={{ fontSize: "clamp(0.95rem, 2.6svh, 1.15rem)", textShadow: TEXT_SHADOW }}
          >
            <span aria-hidden className="text-[0.6em] text-[#ffd27a]">✦</span>
            {gateBlessing.title}
            <span aria-hidden className="text-[0.6em] text-[#ffd27a]">✦</span>
          </p>
        </div>

        {/* Chaupai — each line flies up on its own */}
        <div style={{ marginTop: "clamp(4px, 1svh, 8px)" }}>
          {gateBlessing.chaupai.map((line, i) => (
            <div
              key={i}
              ref={(el) => {
                flyRefs.current[2 + i] = el;
              }}
              className="relative"
              style={{ opacity: 0 }}
            >
              <LandingGlow />
              <p
                className="font-hindi text-[#fff6e2]"
                style={{
                  fontSize: "clamp(1rem, 2.8svh, 1.25rem)",
                  lineHeight: 1.55,
                  textShadow: TEXT_SHADOW,
                }}
              >
                {line}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </MotionConfig>
  );
}
