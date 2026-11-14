import {
  animate,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import bannerRod from "@/assets/katha-banner-rod.webp";
import bannerCloth from "@/assets/katha-banner-cloth.webp";
import { Particles } from "./Ornaments";

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

/** Banner layers, positioned in % of the 904 × 1740 artwork. */
const SCROLL = {
  rod: { left: "0%", top: "0%", width: "100%", height: "8.735%" },
  paper: { left: "0%", top: "0%", width: "100%", height: "100%" },
  paperTop: 6.896,
  paperSpan: 93.104,
  roll: { left: "13.5%", width: "73.0%" },
} as const;

const ROLL_GRADIENT =
  "linear-gradient(180deg, #3d0303 0%, #7d0c08 16%, #c8301f 38%, #ee6a4e 48%, #c42a1b 58%, #7a0b07 82%, #320202 100%)";
const CAP_GRADIENT =
  "linear-gradient(180deg, #6b3f06 0%, #c98a1b 25%, #fff2bf 48%, #e7ba3b 62%, #7a4a08 100%)";

/**
 * Ornate Hindi Ram Katha Festival Banner with authentic scroll unrolling animation.
 */
function WishScroll({ open }: { open: boolean }) {
  // 0 = rolled up under the rod, 1 = fully unrolled
  const unroll = useMotionValue(0);
  useEffect(() => {
    const controls = open
      ? animate(unroll, 1, { delay: 0.35, duration: 1.6, ease: [0.33, 1, 0.68, 1] })
      : animate(unroll, 0, { duration: 0.55, ease: [0.4, 0, 1, 1] });
    return () => controls.stop();
  }, [open, unroll]);

  // Reveal edge, in % of the artwork height
  const line = useTransform(unroll, (p) => SCROLL.paperTop + p * SCROLL.paperSpan);
  const paperClip = useMotionTemplate`inset(0 0 calc(100% - ${line}%) 0)`;
  const rollTop = useMotionTemplate`${line}%`;
  const rollSize = useTransform(unroll, [0, 1], [3.2, 1.8]);
  const rollHeight = useMotionTemplate`${rollSize}%`;
  const rollOpacity = useTransform(line, [88, 96], [1, 0]);

  return (
    <motion.div
      className="relative w-[min(94vw,410px)]"
      style={{
        aspectRatio: "904 / 1740",
        containerType: "inline-size",
      }}
      initial={false}
      animate={open ? { y: 0, opacity: 1 } : { y: -30, opacity: 0 }}
      transition={{
        y: { type: "spring", stiffness: 140, damping: 16, mass: 0.9 },
        opacity: { duration: 0.35 },
      }}
    >
      {/* Gentle hanging sway */}
      <motion.div
        className="absolute inset-0"
        style={{ originX: 0.5, originY: 0 }}
        animate={{ rotate: [-0.6, 0.6, -0.6] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* The banner cloth — revealed from the top as it unrolls */}
        <motion.div
          className="absolute inset-0"
          style={{ clipPath: paperClip, WebkitClipPath: paperClip }}
        >
          <img
            src={bannerCloth}
            alt="श्री रामकथा महोत्सव बैनर"
            draggable={false}
            className="absolute inset-0 h-full w-full object-contain select-none"
          />
        </motion.div>

        {/* Rolled-up paper riding the reveal edge */}
        <motion.div
          aria-hidden
          className="absolute"
          style={{
            left: SCROLL.roll.left,
            width: SCROLL.roll.width,
            top: rollTop,
            height: rollHeight,
            y: "-50%",
            opacity: rollOpacity,
          }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{ background: ROLL_GRADIENT }}
          />
          <div
            className="absolute -left-[1.2cqw] -top-[16%] h-[132%] w-[2.6cqw] rounded-[0.8cqw]"
            style={{ background: CAP_GRADIENT }}
          />
          <div
            className="absolute -right-[1.2cqw] -top-[16%] h-[132%] w-[2.6cqw] rounded-[0.8cqw]"
            style={{ background: CAP_GRADIENT }}
          />
        </motion.div>

        {/* Rod across the top */}
        <img
          src={bannerRod}
          alt=""
          draggable={false}
          className="pointer-events-none absolute left-0 top-0 w-full select-none z-20"
        />

        {/* Floating Sparkles around the sacred banner */}
        <SparkleStar className="left-[4%] top-[3%] h-[4.2cqw] w-[4.2cqw]" delay={0.4} />
        <SparkleStar className="right-[4%] top-[3%] h-[4.2cqw] w-[4.2cqw]" delay={1.6} />
        <SparkleStar className="left-[16%] top-[23%] h-[3.8cqw] w-[3.8cqw]" delay={0.8} />
        <SparkleStar className="right-[16%] top-[23%] h-[3.8cqw] w-[3.8cqw]" delay={2.0} />
        <SparkleStar className="left-[50%] -translate-x-1/2 bottom-[2%] h-[4cqw] w-[4cqw]" delay={1.2} />
      </motion.div>
    </motion.div>
  );
}

export function GreetingScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.2, once: false });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isInView) {
      setOpen(true);
    }
  }, [isInView]);

  return (
    <section
      id="greeting-scroll"
      ref={ref}
      className="relative pt-6 pb-6 px-4 flex flex-col items-center justify-center overflow-hidden"
      aria-label="श्री रामकथा महोत्सव बैनर"
    >
      {/* Floating subtle sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        <Particles count={14} className="opacity-45" />
      </div>

      <WishScroll open={open} />
    </section>
  );
}
