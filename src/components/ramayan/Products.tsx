import { ArrowUpRight } from "lucide-react";
import { products, shop, type Product } from "@/data/business";
import { Divider } from "./Ornaments";
import { Reveal, Stagger, StaggerItem } from "./Reveal";

export function Products() {
  return (
    <section className="relative px-4 py-14 sm:py-16" id="products">
      <div className="mx-auto max-w-sm">
        <Reveal className="text-center">
          <p className="eyebrow tracking-[0.28em] text-[0.7rem] font-extrabold uppercase text-gold-light">
            Handpicked for the festival
          </p>
          <h2 className="font-display mt-2 text-2xl sm:text-3xl font-black leading-tight text-cream">
            पावन <span className="text-gold-light italic">रामकथा</span> प्रसाद
          </h2>
          <Divider className="mx-auto mt-3 w-36" />
        </Reveal>

        <Stagger className="mt-8 grid grid-cols-2 gap-3.5 sm:gap-4" stagger={0.1}>
          {products.map((p) => (
            <StaggerItem key={p.id}>
              <ProductCard product={p} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: Product }) {
  const targetLink = product.link && product.link !== "#" ? product.link : shop.website;

  return (
    <article className="glass group relative flex h-full flex-col overflow-hidden rounded-2xl transition-transform duration-300 hover:-translate-y-1">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          width={400}
          height={400}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080512]/75 via-transparent to-transparent" />
        {product.badge && (
          <span className="absolute left-2.5 top-2.5 rounded-full bg-gradient-to-r from-gold-light via-gold to-gold-deep px-2 py-0.5 text-[0.52rem] font-bold uppercase tracking-[0.15em] text-[#080512]">
            {product.badge}
          </span>
        )}
      </div>

      {/* Body: Clean Name & Visit Web Button */}
      <div className="flex flex-1 flex-col justify-between p-3 sm:p-3.5 text-center">
        <h3 className="font-sans text-xs sm:text-[0.85rem] font-bold leading-snug text-cream line-clamp-1">
          {product.name}
        </h3>

        <a
          href={targetLink}
          target="_blank"
          rel="noreferrer"
          className="btn-gold !w-full !py-2 !px-2.5 !text-[0.72rem] sm:!text-xs !font-bold !rounded-xl flex items-center justify-center gap-1.5 mt-3 transition-all hover:scale-[1.02]"
        >
          Visit Web <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </article>
  );
}
