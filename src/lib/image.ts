/**
 * Safe image source extractor for Next.js / Vite interoperability.
 * Handles both string paths and Next.js StaticImageData objects ({ src: string }).
 */
export function imgSrc(asset: any): string {
  if (!asset) return "";
  if (typeof asset === "string") return asset;
  if (typeof asset === "object" && typeof asset.src === "string") return asset.src;
  return String(asset);
}

