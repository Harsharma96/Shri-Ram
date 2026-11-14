import { motion, AnimatePresence } from "motion/react";
import { Volume2, VolumeX } from "lucide-react";

interface MusicPlayerProps {
  isPlaying: boolean;
  isMuted: boolean;
  onToggle: () => void;
  visible?: boolean;
}

/**
 * Compact, Transparent Devotional Music Button ("bhoot chota sa & transparent").
 * Minimalist glassmorphic circular toggle:
 * - Active: Soft golden glowing Volume2 icon with subtle live pulse dot.
 * - Muted: Translucent VolumeX icon.
 * - Ultra-small 36px footprint so it never covers text or buttons on mobile.
 */
export function MusicPlayer({ isPlaying, isMuted, onToggle, visible = true }: MusicPlayerProps) {
  if (!visible) return null;

  const active = isPlaying && !isMuted;

  return (
    <AnimatePresence>
      <motion.aside
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.7 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40 select-none pointer-events-auto"
        aria-label="Audio Controls"
      >
        <button
          type="button"
          onClick={onToggle}
          title={active ? "॥ श्री राम चौपाई ॥ (म्यूट करने के लिए टैप करें)" : "भजन चालू करने के लिए टैप करें"}
          aria-label={active ? "म्यूट करें (Mute Chaupai)" : "भजन चलाएं (Play Chaupai)"}
          className={`group relative flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 rounded-full backdrop-blur-md transition-all duration-300 shadow-[0_2px_12px_rgba(0,0,0,0.25)] hover:scale-110 active:scale-95 cursor-pointer ${
            active
              ? "bg-black/25 hover:bg-black/40 border border-[#ffd77a]/50 hover:border-[#ffd77a] shadow-[0_0_12px_rgba(255,215,122,0.25)]"
              : "bg-black/20 hover:bg-black/35 border border-white/20 hover:border-white/40"
          }`}
        >
          {active ? (
            <div className="relative flex items-center justify-center">
              <Volume2 className="h-4 w-4 text-[#ffd77a] animate-pulse" />
              {/* Subtle live indicator beacon */}
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffd77a] opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#ffd77a]" />
              </span>
            </div>
          ) : (
            <VolumeX className="h-4 w-4 text-white/70 group-hover:text-white" />
          )}
        </button>
      </motion.aside>
    </AnimatePresence>
  );
}
