import { marqueeItems } from "@/data/business";

function Row({ reverse = false, className = "" }: { reverse?: boolean; className?: string }) {
  const items = [...marqueeItems, ...marqueeItems];
  return (
    <div className="flex overflow-hidden" aria-hidden={reverse}>
      <div className={`flex w-max shrink-0 items-center ${reverse ? "animate-marquee-reverse" : "animate-marquee"} ${className}`}>
        {items.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="font-hindi whitespace-nowrap px-4 text-sm font-semibold tracking-wider">{item}</span>
            <span className="h-1 w-1 rounded-full bg-gold" />
          </span>
        ))}
      </div>
    </div>
  );
}

export function Marquee() {
  return (
    <section className="relative py-6" aria-label="Featured products">
      <div className="gold-line mb-3" />
      <div className="space-y-2 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <Row className="text-gold" />
        <Row reverse className="text-cream/50" />
      </div>
      <div className="gold-line mt-3" />
    </section>
  );
}
