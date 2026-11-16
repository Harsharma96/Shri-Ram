"use client";

import { useState } from "react";
import { Check, Copy, MessageCircle, Share2, Sparkles } from "lucide-react";
import cardImg from "@/assets/shri-ramkatha-card-opt.jpg";
import { shop, venueInfo, contactInfo } from "@/data/business";
import { Divider, Particles } from "./Ornaments";
import { Reveal } from "./Reveal";
import { imgSrc } from "@/lib/image";

export function ShareInvite() {
  const [copied, setCopied] = useState(false);

  const getShareUrl = () => {
    if (typeof window !== "undefined") {
      return window.location.href;
    }
    return "https://shri-ram-charit-manas.vercel.app";
  };

  const getShareText = () => {
    const url = getShareUrl();
    return (
      `🚩 *॥ श्री राम चरित मानस कथा महोत्सव ॥* 🚩\n\n` +
      `*परम पावन श्री रामचरितमानस अमृतवर्षा*\n` +
      `प्रभु श्री राम की इस पावन अमृतवर्षा में आप सभी सपरिवार सादर आमंत्रित हैं।\n\n` +
      `🎙️ *कथा व्यास:* सामाजिक संत श्री रवि जी समदर्शी महाराज\n` +
      `📅 *दिनांक:* 22 नवम्बर से 30 नवम्बर 2026\n` +
      `📍 *स्थान:* ${venueInfo.fullAddress}\n` +
      `📞 *संपर्क सूत्र:* ${contactInfo.contacts.map((c) => c.phone).join(", ")}\n\n` +
      `👇 *डिजिटल निमंत्रण पत्र एवं दर्शन हेतु लिंक पर क्लिक करें:*\n` +
      url
    );
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(getShareText());
    const whatsappUrl = `https://api.whatsapp.com/send?text=${text}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${shop.name} | डिजिटल निमंत्रण पत्र`,
          text: getShareText(),
          url: getShareUrl(),
        });
        return;
      } catch (err) {
        // User cancelled or share failed, fallback to whatsapp
      }
    }
    handleWhatsAppShare();
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(getShareUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Fallback
      const input = document.createElement("input");
      input.value = getShareUrl();
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <section
      id="share-invite"
      className="relative overflow-hidden px-4 py-8 sm:py-10"
      aria-label="Share Invitation Card"
    >
      <Particles count={10} className="opacity-30" />

      <div className="relative mx-auto max-w-sm text-center">
        {/* Section Heading */}
        <Reveal>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-white/35 bg-white/15 px-4 py-1 mb-2.5">
            <span className="text-[0.65rem] text-[#fff8ea]">✦</span>
            <span className="font-hindi text-xs sm:text-[0.82rem] font-bold tracking-[0.2em] text-[#fff8ea] uppercase">
              पावन निमंत्रण साझा करें
            </span>
            <span className="text-[0.65rem] text-[#fff8ea]">✦</span>
          </div>
          <h2 className="font-hindi text-2xl sm:text-3xl font-black leading-tight text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] via-[#fff5c2] to-[#ffd27a] tracking-wide">
            शुभ संदेश एवं निमंत्रण भेजें
          </h2>
          <p className="font-hindi text-xs sm:text-sm text-white/95 mt-2 leading-relaxed">
            अपने स्नेहीजनों, परिजनों व इष्ट-मित्रों को यह पावन निमंत्रण पत्र भेजकर पुण्य के भागी बनें।
          </p>
          <Divider className="mx-auto mt-2.5 w-36" />
        </Reveal>

        {/* Grand Invitation Card Preview */}
        <Reveal delay={0.1} className="mt-6">
          <div className="group relative overflow-hidden rounded-2xl border-2 border-[#ffd77a]/70 bg-gradient-to-b from-[#2a0c0c] to-[#1a0505] p-1.5 shadow-[0_12px_36px_rgba(0,0,0,0.55),0_0_24px_rgba(255,215,122,0.25)] transition-all duration-300 hover:scale-[1.01] hover:border-[#ffd77a]">
            {/* Glowing Golden Ring */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#ffd77a]/20 via-transparent to-[#ffffff]/10 pointer-events-none" />

            {/* Poster Card Image */}
            <div className="relative overflow-hidden rounded-xl aspect-[16/9] bg-[#1a0505]">
              <img
                src={imgSrc(cardImg)}
                alt="श्री रामकथा निमंत्रण पत्र"
                width={1200}
                height={675}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              
              {/* Top Divine Badge */}
              <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 rounded-full bg-black/70 backdrop-blur-md border border-[#ffd77a]/50 px-3 py-1 shadow-md">
                <Sparkles className="h-3 w-3 text-[#ffd77a]" />
                <span className="font-hindi text-[0.7rem] font-bold text-[#ffd77a] tracking-wide">
                  डिजिटल निमंत्रण कार्ड
                </span>
              </div>
            </div>

            {/* Sub-text explanation */}
            <div className="p-2.5 text-center">
              <p className="font-hindi text-[0.78rem] text-[#fff1cc]/95 font-medium leading-relaxed">
                व्हाट्सएप पर शेयर करने पर यह सुंदर निमंत्रण कार्ड अपने आप दिखाई देगा
              </p>
            </div>
          </div>
        </Reveal>

        {/* Action Buttons */}
        <Reveal delay={0.15} className="mt-5 flex flex-col gap-3">
          {/* Main WhatsApp Share Button */}
          <button
            type="button"
            onClick={handleNativeShare}
            className="group relative flex w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#25D366] via-[#1EBE5D] to-[#128C7E] px-6 py-3.5 text-white font-hindi font-bold text-base sm:text-lg shadow-[0_6px_24px_rgba(37,211,102,0.45)] hover:shadow-[0_8px_30px_rgba(37,211,102,0.65)] hover:scale-[1.02] active:scale-95 transition-all duration-200 cursor-pointer"
          >
            <MessageCircle className="h-5 w-5 fill-current" />
            <span>व्हाट्सएप पर निमंत्रण भेजें</span>
            <Share2 className="h-4 w-4 opacity-80 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Copy Link Button */}
          <button
            type="button"
            onClick={handleCopyLink}
            className="group flex w-full items-center justify-center gap-2 rounded-full border border-[#ffd77a]/60 bg-[#b82f0c]/60 hover:bg-[#a62808] px-5 py-2.5 text-[#fff1cc] font-hindi font-semibold text-sm transition-all duration-200 active:scale-95 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-emerald-400" />
                <span className="text-emerald-300 font-bold">✓ लिंक कॉपी हो गया!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 text-[#ffd77a]" />
                <span>वेबसाइट लिंक कॉपी करें</span>
              </>
            )}
          </button>
        </Reveal>
      </div>
    </section>
  );
}
