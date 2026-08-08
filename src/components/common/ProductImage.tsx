import { useState } from "react";
import { ImageIcon } from "lucide-react";

interface ProductImageProps {
  colorFrom: string;
  colorTo: string;
  label?: string;
  imageUrl?: string;
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

export default function ProductImage({
  colorFrom,
  colorTo,
  label,
  imageUrl,
  keyword,
  seed,
  className = "",
  iconSize = 28,
}: ProductImageProps) {
  const [failed, setFailed] = useState(false);

  const query = keyword
    ? keyword.trim().split(/\s+/).join(",")
    : "";

  const lock = hashSeed(seed ?? label ?? "vendora");

  const source = imageUrl?.trim();

  const computedSrc =
    source ||
    (query
      ? `https://loremflickr.com/600/600/${encodeURIComponent(
          query
        )}?lock=${lock}`
      : undefined);

  if (!computedSrc || failed) {
    return (
      <div
        className={`relative flex items-center justify-center overflow-hidden ${className}`}
        style={{
          background: `linear-gradient(135deg, ${colorFrom} 0%, ${colorTo} 100%)`,
        }}
      >
        <div className="flex flex-col items-center justify-center gap-2 text-white/80">
          <ImageIcon size={iconSize} />
          {label && (
            <span className="px-3 text-center text-sm font-semibold">
              {label}
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <img
      src={computedSrc}
      alt={label ?? "Product image"}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
}