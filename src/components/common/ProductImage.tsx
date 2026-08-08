import { useState } from "react";
import { ImageIcon } from "lucide-react";

interface ProductImageProps {
  colorFrom: string;
  colorTo: string;
  label?: string;
  keyword?: string;
  seed?: string | number;
  className?: string;
  iconSize?: number;
}

function hashSeed(value: string | number): number {
  const str = String(value);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % 1000;
}

/**
 * Shows a real, topically-relevant stock photo (via a free keyword-based
 * photo service — no API key required) so products look like an actual
 * store instead of colored placeholders. Falls back to a branded gradient
 * tile automatically if the photo fails to load.
 *
 * To swap in real product photography later: just pass an actual image
 * URL through a new `src` prop, or replace the `src` build below.
 */
export default function ProductImage({
  colorFrom,
  colorTo,
  label,
  keyword,
  seed,
  className = "",
  iconSize = 28,
}: ProductImageProps) {
  const [failed, setFailed] = useState(false);

  const query = keyword ? keyword.trim().split(/\s+/).join(",") : "";
  const lock = hashSeed(seed ?? label ?? "vendora");
  const src = query ? `https://loremflickr.com/600/600/${encodeURIComponent(query)}?lock=${lock}` : undefined;

  if (!src || failed) {
    return (
      <div
        className={`relative flex items-center justify-center overflow-hidden ${className}`}
        style={{
          background: `linear-gradient(135deg, ${colorFrom} 0%, ${colorTo} 100%)`,
        }}
      >
        <div className="absolute inset-0 bg-white/5 opacity-40" />
        <ImageIcon size={iconSize} strokeWidth={1.5} className="relative text-white/80" />
        {label && <span className="sr-only">{label}</span>}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={label ?? "Product image"}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
}