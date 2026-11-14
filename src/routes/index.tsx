import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { Hero } from "@/components/ramayan/Hero";
import { GreetingScroll } from "@/components/ramayan/GreetingScroll";
import { KathaTimeline } from "@/components/ramayan/KathaTimeline";
import { BusinessIntro } from "@/components/ramayan/Business";
import { AboutUs } from "@/components/ramayan/About";
import { KathaSchedule } from "@/components/ramayan/KathaSchedule";
import { Closing } from "@/components/ramayan/Closing";
import { GateOpening } from "@/components/ramayan/GateOpening";
import { Watermark } from "@/components/ramayan/Watermark";
import { MusicPlayer } from "@/components/ramayan/MusicPlayer";
import { shop } from "@/data/business";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${shop.name} | जयदेवी शास्त्री आवास, इस्लामनगर (बदायूँ)` },
      {
        name: "description",
        content: `श्री रामचरितमानस कथा अमृत महोत्सव। कथा व्यास: सामाजिक संत श्री रवि जी समदर्शी महाराज। आयोजक: जयदेवी शास्त्री। स्थान: जयदेवी शास्त्री आवास, इस्लामनगर (बदायूँ)। संपर्क: 8273095177, 8475950474`,
      },
      { property: "og:title", content: `${shop.name} | जयदेवी शास्त्री आवास, इस्लामनगर` },
      {
        property: "og:description",
        content: `श्री रामचरितमानस पावन कथा महोत्सव - कथा व्यास: सामाजिक संत श्री रवि जी समदर्शी महाराज। आयोजक: जयदेवी शास्त्री। स्थान: जयदेवी शास्त्री आवास, इस्लामनगर (बदायूँ)।`,
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [gateOpen, setGateOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Directly start audio
  const playAudio = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.muted = isMuted;
      audio.volume = 0.8;
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  // Toggle playback or mute
  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!isMuted && isPlaying) {
      audio.muted = true;
      setIsMuted(true);
    } else {
      audio.muted = false;
      setIsMuted(false);
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  // Called when user taps to enter the temple
  const handleStartEnter = () => {
    if (!isMuted) {
      playAudio();
    }
  };

  // Fallback: On the first pointerdown / touch on screen, start audio if unmuted & paused
  useEffect(() => {
    const onUserInteraction = () => {
      const audio = audioRef.current;
      if (audio && audio.paused && !isMuted) {
        audio.volume = 0.8;
        audio
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
      }
    };
    window.addEventListener("pointerdown", onUserInteraction, { once: true });
    return () => window.removeEventListener("pointerdown", onUserInteraction);
  }, [isMuted]);

  return (
    <div className="min-h-screen w-full bg-[#df3b11] flex flex-col justify-start items-center selection:bg-gold/30 selection:text-gold-light">
      {/* Background Audio: Mangal Bhavan Amangal Hari - Ramayan Chaupai */}
      <audio
        ref={audioRef}
        src="/ramayan-chaupai.mp3"
        preload="auto"
        loop
        playsInline
      />

      {/* Floating Devotional Music Player */}
      <MusicPlayer
        isPlaying={isPlaying}
        isMuted={isMuted}
        onToggle={toggleMusic}
        visible={gateOpen}
      />

      {/* Clean Mobile-First Container (Full width on phone, centered mobile column on desktop) */}
      <main className="relative w-full max-w-[440px] min-h-screen text-foreground bg-[#df3b11] scroll-smooth overflow-x-hidden">
        {/* Interactive 3D Gate Opening */}
        <GateOpening
          onOpenComplete={() => setGateOpen(true)}
          onStartEnter={handleStartEnter}
        />

        {/* ══════════════════════════════════════════════════
            1. TOP: TEMPLE HERO SECTION
        ══════════════════════════════════════════════════ */}
        <Hero introReady={gateOpen} />

        {/* ══════════════════════════════════════════════════
            2. BELOW TEMPLE: UNIFORM SACRED SAFFRON (#df3b11)
        ══════════════════════════════════════════════════ */}
        <div className="relative bg-[#df3b11]">
          {/* All Sections Below Temple */}
          <div className="relative z-10 bg-[#df3b11]">
            <GreetingScroll />
            <KathaTimeline />
            <KathaSchedule />
            <AboutUs />
            <BusinessIntro />
            <Closing />
            {/* Watermark — the very last thing on the page */}
            <Watermark />
          </div>
        </div>
      </main>
    </div>
  );
}
