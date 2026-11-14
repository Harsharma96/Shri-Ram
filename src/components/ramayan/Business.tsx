"use client";

import { MapPin, MessageCircle, Phone } from "lucide-react";
import { contactInfo, shop, venueInfo } from "@/data/business";
import { Divider, Particles } from "./Ornaments";
import { Reveal, Stagger, StaggerItem } from "./Reveal";

export function BusinessIntro() {
  return (
    <section className="relative overflow-hidden px-4 py-7 sm:py-8" id="about">
      <Particles count={10} className="opacity-30" />

      <div className="relative mx-auto max-w-sm text-center">
        <Reveal>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-white/35 bg-white/15 px-4 py-1 mb-2.5">
            <span className="text-[0.65rem] text-[#fff8ea]">✦</span>
            <span className="font-hindi text-xs sm:text-[0.82rem] font-bold tracking-[0.2em] text-[#fff8ea] uppercase">
              दर्शन एवं संपर्क
            </span>
            <span className="text-[0.65rem] text-[#fff8ea]">✦</span>
          </div>
          <h2 className="font-hindi text-2xl sm:text-3xl font-black leading-tight text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] via-[#fff5c2] to-[#ffd27a] tracking-wide">
            कथा स्थल एवं संपर्क सूत्र
          </h2>
          <Divider className="mx-auto mt-2.5 w-36" />
        </Reveal>

        {/* Compact, tactile Contact Rows (Saffron & Crimson Glass Style) */}
        <Stagger className="mt-5 flex flex-col gap-2.5" stagger={0.06}>
          {/* स्थान (कथा स्थल) */}
          <InfoRow
            icon={<MapPin className="h-4 w-4" />}
            label="स्थान"
            value={venueInfo.fullAddress}
            href={venueInfo.mapsUrl}
          />

          {/* One full-width card per number, so the whole number always fits — even on small Android phones */}
          {contactInfo.contacts.map((c) => (
            <ContactCard key={c.phone} phone={c.phone} display={c.display} />
          ))}
        </Stagger>
      </div>
    </section>
  );
}

const WHATSAPP_TEXT = `जय श्री राम! मुझे ${shop.name} के संबंध में जानकारी चाहिए।`;

/** A mobile number written out in full, with round Call and WhatsApp buttons beside it. */
function ContactCard({ phone, display }: { phone: string; display: string }) {
  const digits = phone.replace(/\D/g, "").slice(-10);
  const tel = `tel:+91${digits}`;
  const whatsapp = `https://wa.me/91${digits}?text=${encodeURIComponent(WHATSAPP_TEXT)}`;
  return (
    <StaggerItem>
      <div className="glass flex items-center justify-between gap-3 rounded-2xl py-3 pl-4 pr-3">
        <a href={tel} className="min-w-0 text-left" aria-label={`कॉल करें ${digits}`}>
          <span className="mb-1 block font-hindi text-[0.72rem] font-bold leading-none tracking-[0.12em] text-[#ffe0b2]">
            मोबाइल नंबर
          </span>
          <span className="block whitespace-nowrap font-sans text-[1.18rem] font-extrabold leading-tight tracking-[0.04em] text-white tabular-nums">
            {display}
          </span>
        </a>
        <div className="flex shrink-0 items-center gap-2">
          <a
            href={tel}
            aria-label={`कॉल करें ${digits}`}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/40 bg-white/15 text-white transition-transform active:scale-95"
          >
            <Phone className="h-5 w-5" />
          </a>
          <a
            href={whatsapp}
            target="_blank"
            rel="noreferrer"
            aria-label={`व्हाट्सएप करें ${digits}`}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/40 bg-[#25D366] text-white transition-transform active:scale-95"
          >
            <MessageCircle className="h-5 w-5" />
          </a>
        </div>
      </div>
    </StaggerItem>
  );
}

function InfoRow({
  icon,
  label,
  value,
  href,
  className = "",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  className?: string;
}) {
  return (
    <StaggerItem className={className}>
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel="noreferrer"
        className="glass group flex items-center gap-3.5 rounded-2xl px-4 py-3 transition-all duration-300 hover:brightness-110"
      >
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/35 bg-white/15 text-[#fff8ea] transition-transform group-hover:scale-105">
          {icon}
        </span>
        <span className="min-w-0 text-left">
          <span className="block text-[0.68rem] uppercase font-bold tracking-[0.16em] text-[#ffe0b2] leading-none mb-1">
            {label}
          </span>
          {/* Wraps onto a second line on narrow phones instead of being cut off */}
          <span className="block break-words text-[0.92rem] sm:text-[0.98rem] font-bold text-white leading-snug font-hindi">
            {value}
          </span>
        </span>
      </a>
    </StaggerItem>
  );
}
