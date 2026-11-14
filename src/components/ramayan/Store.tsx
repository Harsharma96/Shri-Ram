import { Clock, Globe, Instagram, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import { shop, whatsappLink } from "@/data/business";
import { Logo } from "./Business";
import { Divider } from "./Ornaments";
import { Reveal } from "./Reveal";

export function Store() {
  return (
    <section className="relative px-4 py-8" id="store">
      <div className="mx-auto max-w-sm">
        <Reveal className="text-center">
          <p className="eyebrow tracking-[0.28em] text-[0.7rem] font-extrabold uppercase text-gold-light">Our store</p>
          <h2 className="font-display mt-1.5 text-2xl sm:text-3xl font-black leading-tight text-cream">
            Step Into the <span className="text-gold-light italic">Light</span>
          </h2>
          <Divider className="mx-auto mt-2 w-36" />
        </Reveal>

        <div className="mt-5 flex flex-col gap-4">
          {/* Store image */}
          <Reveal className="relative overflow-hidden rounded-2xl aspect-[16/10]" amount={0.2}>
            <img
              src={shop.storeImage}
              alt={`${shop.name} कथा स्थल`}
              width={800}
              height={500}
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080512] via-[#080512]/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 p-3.5">
              <Logo className="h-12 w-12 shrink-0 text-xl font-black" />
              <div className="min-w-0">
                <h3 className="font-display text-gold-light truncate text-xl font-black tracking-wide">{shop.name}</h3>
                <p className="font-sans truncate text-xs font-bold text-gold-light/95">{shop.tagline}</p>
              </div>
            </div>
          </Reveal>

          {/* Details card */}
          <Reveal delay={0.1} className="glass-fog rounded-2xl p-4">
            <p className="text-xs font-semibold leading-relaxed text-cream/90">{shop.description}</p>
            <ul className="mt-3.5 space-y-2.5 text-xs font-semibold">
              <li className="flex gap-2.5 items-start">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-light" />
                <span className="text-cream leading-snug">{shop.address}</span>
              </li>
              <li className="flex gap-2.5 items-center">
                <Clock className="h-3.5 w-3.5 shrink-0 text-gold-light" />
                <span className="text-cream">{shop.hours}</span>
              </li>
              <li className="flex gap-2.5 items-center">
                <Phone className="h-3.5 w-3.5 shrink-0 text-gold-light" />
                <a className="text-cream hover:text-gold font-bold" href={`tel:${shop.phone.replace(/\s/g, "")}`}>{shop.phone}</a>
              </li>
              <li className="flex gap-2.5 items-center">
                <Instagram className="h-3.5 w-3.5 shrink-0 text-gold" />
                <a className="text-cream hover:text-gold" href={`https://instagram.com/${shop.instagram}`} target="_blank" rel="noreferrer">@{shop.instagram}</a>
              </li>
              <li className="flex gap-2.5 items-center">
                <Globe className="h-3.5 w-3.5 shrink-0 text-gold" />
                <a className="text-cream hover:text-gold" href={shop.website} target="_blank" rel="noreferrer">{shop.website.replace(/^https?:\/\//, "")}</a>
              </li>
            </ul>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <a href={shop.mapsUrl} target="_blank" rel="noreferrer" className="btn-gold !py-2 !text-xs !rounded-xl flex items-center justify-center gap-1.5">
                <Navigation className="h-3.5 w-3.5" /> Visit Store
              </a>
              <a href={whatsappLink(`Namaste ${shop.name}! I'd like to get in touch.`)} target="_blank" rel="noreferrer" className="btn-whatsapp !py-2 !text-xs !rounded-xl flex items-center justify-center gap-1.5">
                <MessageCircle className="h-3.5 w-3.5" /> Contact
              </a>
            </div>
          </Reveal>

          {/* Map-style visual */}
          <Reveal delay={0.15}>
            <a
              href={shop.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="glass group relative block overflow-hidden rounded-2xl p-1"
              aria-label="Open location in Google Maps"
            >
              <div
                className="relative h-28 overflow-hidden rounded-xl bg-[#0c081c]"
                style={{
                  backgroundImage:
                    "linear-gradient(color-mix(in oklab, var(--gold) 12%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklab, var(--gold) 12%, transparent) 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              >
                <svg className="absolute inset-0 h-full w-full text-gold/40" viewBox="0 0 400 144" fill="none" preserveAspectRatio="none">
                  <path d="M0 96C80 90 120 40 200 44s140 60 200 30" stroke="currentColor" strokeWidth="5" />
                  <path d="M60 0c10 60 30 90 90 144M300 0c-10 50 10 90 60 144" stroke="currentColor" strokeWidth="2.5" />
                </svg>
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
                  <span className="absolute left-1/2 top-full h-5 w-5 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-gold/50" />
                  <MapPin className="relative h-7 w-7 fill-marigold text-gold-light" />
                </span>
                <span className="absolute bottom-2 left-3 rounded-full bg-black/80 px-2.5 py-0.5 text-[0.6rem] uppercase tracking-[0.2em] text-gold transition-colors group-hover:bg-gold group-hover:text-[#080512]">
                  Open in Maps ↗
                </span>
              </div>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
