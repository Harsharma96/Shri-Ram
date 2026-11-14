import ramDarbarCutout from "@/assets/ram-darbar-cutout.png";
import { ramayanMessage } from "@/data/business";
import { Divider, Particles } from "./Ornaments";
import { Reveal } from "./Reveal";

export function Closing() {
  return (
    <section className="relative overflow-hidden pt-7 pb-0 px-4" aria-label="Closing Mangal Kamna">
      {/* Subtle ambient sparkles */}
      <Particles count={10} className="opacity-30" />

      {/* Clean, simple sacred greeting */}
      <div className="relative z-10 mx-auto flex max-w-sm flex-col items-center text-center mb-5">
        <Reveal>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-white/35 bg-white/15 px-4 py-1 mb-2.5">
            <span className="text-[0.65rem] text-[#fff8ea]">✦</span>
            <span className="font-hindi text-xs sm:text-[0.82rem] font-bold tracking-[0.2em] text-[#fff8ea] uppercase">
              पावन मंगल कामना
            </span>
            <span className="text-[0.65rem] text-[#fff8ea]">✦</span>
          </div>
          <h2 className="font-hindi text-[2.6rem] sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] via-[#fff5c2] to-[#ffd27a] tracking-wide leading-tight">
            {ramayanMessage.heading}
          </h2>
          <p className="font-hindi text-sm sm:text-base text-white mt-3 max-w-xs leading-relaxed font-bold">
            {ramayanMessage.wish}
          </p>
          <Divider className="mx-auto mt-3.5 w-32" />
        </Reveal>
      </div>

      {/* Ram Darbar tableau resting at the very bottom of the page, edge to edge */}
      <div className="relative z-10 -mx-4">
        {/* Warm divine halo glowing behind the idols */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-full animate-flicker"
          style={{
            background:
              "radial-gradient(ellipse 58% 60% at 50% 58%, rgba(245,197,66,0.42) 0%, rgba(234,88,12,0.2) 45%, transparent 75%)",
          }}
        />
        {/* Golden floor glow under the base */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-[8%] -bottom-3 h-10 rounded-[50%]"
          style={{
            background: "radial-gradient(ellipse at 50% 50%, rgba(245,197,66,0.55) 0%, rgba(245,158,11,0.18) 50%, transparent 75%)",
          }}
        />

        <Reveal delay={0.15} amount={0.2}>
          <img
            src={ramDarbarCutout}
            alt="Shri Ram Darbar"
            className="relative z-10 mx-auto w-full max-w-[420px]"
            loading="lazy"
          />
        </Reveal>
      </div>
    </section>
  );
}
