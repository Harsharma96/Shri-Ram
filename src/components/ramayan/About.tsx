import { motion } from "motion/react";
import { GraduationCap, Users } from "lucide-react";
import { about, organizerInfo, promoterInfo } from "@/data/business";
import { Reveal, Stagger, StaggerItem } from "./Reveal";

/** Small diya resting on a lotus, between two fine rules. */
function DiyaDivider() {
  return (
    <div className="mx-auto flex w-44 items-center gap-2" aria-hidden="true">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/60" />
      <svg viewBox="0 0 40 32" className="h-7 w-9">
        {/* Animated flame */}
        <motion.path
          d="M20 3c3 4 4 7 0 11c-4-4-3-7 0-11Z"
          fill="#ffcf3a"
          stroke="#e8590c"
          strokeWidth="1"
          style={{ originX: "50%", originY: "100%" }}
          animate={{ scaleY: [1, 1.12, 0.94, 1], scaleX: [1, 0.94, 1.04, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Diya bowl */}
        <path
          d="M9 16h22c-1 5-5 8-11 8s-10-3-11-8Z"
          fill="#e8590c"
          stroke="#ffd77a"
          strokeWidth="1"
        />
        {/* Lotus base petals */}
        <path d="M20 31c-4-2-6-5-5-8c3 1 5 4 5 8Z" fill="#d6336c" />
        <path d="M20 31c4-2 6-5 5-8c-3 1-5 4-5 8Z" fill="#d6336c" />
        <path d="M20 31c-7 0-11-2-13-6c4-1 9 1 13 6Z" fill="#c2255c" />
        <path d="M20 31c7 0 11-2 13-6c-4-1-9 1-13 6Z" fill="#c2255c" />
      </svg>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/60" />
    </div>
  );
}

/** Pink lotus between two sparkles and fine rules. */
function LotusDivider() {
  return (
    <div className="mx-auto flex w-48 items-center gap-2" aria-hidden="true">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/60" />
      <span className="text-[0.6rem] text-gold-light">✦</span>
      <svg viewBox="0 0 32 22" className="h-5 w-7">
        <path d="M16 3c3 3 4 8 0 15c-4-7-3-12 0-15Z" fill="#e64980" />
        <path d="M16 18c-1-6-4-10-9-11c-1 6 3 10 9 11Z" fill="#d6336c" />
        <path d="M16 18c1-6 4-10 9-11c1 6-3 10-9 11Z" fill="#d6336c" />
        <path d="M16 19c-5 1-10 0-14-4c5-2 10 0 14 4Z" fill="#c2255c" />
        <path d="M16 19c5 1 10 0 14-4c-5-2-10 0-14 4Z" fill="#c2255c" />
      </svg>
      <span className="text-[0.6rem] text-gold-light">✦</span>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/60" />
    </div>
  );
}

/** Words written in 'single quotes' in the story are set in gold instead of being quoted. */
function withHighlights(text: string) {
  return text.split(/'([^']+)'/).map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="font-bold text-[#ffd77a]">
        {part}
      </span>
    ) : (
      part
    ),
  );
}

/**
 * Introduction to the Katha — plain text only (no box, no background).
 * Text comes from `about` in data/business.ts; a blank line in `story` starts a new paragraph.
 */
function AboutStory() {
  const paragraphs = about.story.split(/\n\s*\n/).filter((p) => p.trim());
  return (
    <section
      id="about-us"
      className="relative px-6 py-9 text-center"
      aria-label={about.eyebrow}
    >
      <div className="relative mx-auto max-w-[350px]">
        <Reveal>
          {/* Small heading line */}
          <p className="font-hindi flex items-center justify-center gap-2.5 text-[0.82rem] font-bold tracking-[0.22em] text-[#ffe0b2]">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#ffe0b2]/70" />
            {about.eyebrow}
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#ffe0b2]/70" />
          </p>

          <h2 className="font-hindi mt-2 text-[2.1rem] font-black leading-tight tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] via-[#fff1b8] to-[#ffc95c]">
            {about.title}
          </h2>

          <div className="mt-3">
            <DiyaDivider />
          </div>
        </Reveal>

        {paragraphs.map((para, i) => (
          <Reveal key={i} delay={0.1 + i * 0.1}>
            {i > 0 && (
              <p className="my-4 text-[0.7rem] tracking-[0.6em] text-[#ffd77a]/80" aria-hidden="true">
                ✦ ✦ ✦
              </p>
            )}
            <p
              className={`font-hindi text-pretty text-[1.06rem] font-medium leading-[1.95] text-white/95 ${
                i === 0 ? "mt-5" : ""
              }`}
            >
              {withHighlights(para)}
            </p>
          </Reveal>
        ))}

        {about.thanks && (
          <Reveal delay={0.1 + paragraphs.length * 0.1}>
            <div className="mx-auto mt-7 h-px w-24 bg-gradient-to-r from-transparent via-[#ffd77a]/70 to-transparent" />
            <p className="font-hindi mt-4 text-balance text-[1.2rem] font-black leading-snug tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-[#fff8dc] to-[#ffcf66]">
              {about.thanks}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}

/** Organizer & Promoter details styled in royal devotional aesthetic. */
function OrganizerAndPromoters() {
  return (
    <section
      id="organizer-promoters"
      className="relative px-4 pt-3 pb-8 text-center"
      aria-label="आयोजक एवं प्रवर्तक"
    >
      <div className="relative mx-auto max-w-[400px]">
        {/* Organizer Header */}
        <Reveal>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-white/35 bg-white/15 px-4 py-1 mb-2.5">
            <span className="text-[0.65rem] text-[#fff8ea]">✦</span>
            <span className="font-hindi text-xs sm:text-[0.82rem] font-bold tracking-[0.2em] text-[#fff8ea] uppercase">
              {organizerInfo.eyebrow}
            </span>
            <span className="text-[0.65rem] text-[#fff8ea]">✦</span>
          </div>
          <h2 className="font-hindi text-2xl sm:text-3xl font-black leading-tight text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] via-[#fff5c2] to-[#ffd27a] tracking-wide">
            {organizerInfo.label}
          </h2>
          <div className="mt-2.5">
            <LotusDivider />
          </div>
        </Reveal>

        {/* Organizer Grand Card (Styled with Saffron/Crimson Glass) */}
        <Reveal delay={0.1}>
          <div className="glass relative mt-5 rounded-2xl p-5 sm:p-6 transition-all duration-300">
            {/* Sacred Om Emblem */}
            <div className="relative mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-white/15 text-[#fff8ea]">
              <span className="font-hindi text-xl text-[#fff8ea] select-none font-bold">ॐ</span>
            </div>

            {/* Organizer Name */}
            <h3 className="font-hindi text-2xl sm:text-[1.95rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] via-[#fff5c2] to-[#ffd27a] tracking-wide">
              {organizerInfo.name}
            </h3>

            {/* Decorative Divider */}
            <div className="my-3.5 flex items-center justify-center gap-2">
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-white/50" />
              <span className="text-[0.6rem] text-[#fff8ea]">✦</span>
              <span className="h-px w-12 bg-gradient-to-l from-transparent to-white/50" />
            </div>

            {/* Titles / Designations */}
            <div className="flex flex-col gap-2">
              {organizerInfo.titles.map((title, idx) => (
                <div
                  key={idx}
                  className="glass-sub flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-center transition-all duration-300 hover:brightness-110"
                >
                  <span className="text-[0.55rem] text-[#ffe0b2]">✦</span>
                  <span className="font-hindi text-[0.88rem] sm:text-[0.95rem] font-bold text-white leading-snug">
                    {title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Promoters (प्रवर्तक) Section */}
        <Reveal delay={0.2} className="mt-8">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-white/35 bg-white/15 px-4 py-1 mb-2.5">
            <span className="text-[0.65rem] text-[#fff8ea]">✦</span>
            <span className="font-hindi text-xs sm:text-[0.82rem] font-bold tracking-[0.2em] text-[#fff8ea] uppercase">
              {promoterInfo.eyebrow}
            </span>
            <span className="text-[0.65rem] text-[#fff8ea]">✦</span>
          </div>
          <h2 className="font-hindi text-2xl sm:text-3xl font-black leading-tight text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] via-[#fff5c2] to-[#ffd27a] tracking-wide">
            {promoterInfo.title}
          </h2>
          <div className="mt-2.5">
            <LotusDivider />
          </div>
        </Reveal>

        {/* Promoters Cards */}
        <Stagger className="mt-5 flex flex-col gap-2.5" stagger={0.08}>
          {promoterInfo.entities.map((entity, idx) => (
            <StaggerItem key={idx}>
              <div className="glass group relative rounded-2xl p-4 transition-all duration-300 hover:brightness-110">
                <div className="flex items-center gap-3.5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/35 bg-white/15 text-white transition-transform group-hover:scale-105">
                    {idx === 0 ? (
                      <GraduationCap className="h-5 w-5 text-white" />
                    ) : (
                      <Users className="h-5 w-5 text-white" />
                    )}
                  </span>
                  <div className="min-w-0 text-left">
                    <span className="block text-[0.68rem] uppercase font-bold tracking-[0.16em] text-[#ffe0b2] leading-none mb-1">
                      {entity.category}
                    </span>
                    <h4 className="font-hindi text-[1.12rem] font-black text-white leading-tight">
                      {entity.name}
                    </h4>
                    <p className="font-hindi text-xs font-semibold text-[#ffeed4] mt-0.5 leading-tight">
                      {entity.address}
                    </p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/** "About us" + "Organizer & Promoters" cleanly rendered. */
export function AboutUs() {
  return (
    <div className="relative">
      <AboutStory />
      <OrganizerAndPromoters />
    </div>
  );
}
