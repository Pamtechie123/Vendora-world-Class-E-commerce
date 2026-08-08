import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  reviewCount?: number;
  size?: number;
  showValue?: boolean;
}

export default function StarRating({
  rating,
  reviewCount,
  size = 14,
  showValue = false,
}: StarRatingProps) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i + 1 <= Math.round(rating);
          return (
            <Star
              key={i}
              size={size}
              className={filled ? "fill-accent text-accent" : "fill-transparent text-border"}
              strokeWidth={1.5}
            />
          );
        })}
      </div>
      {showValue && <span className="text-xs font-semibold text-ink">{rating.toFixed(1)}</span>}
      {reviewCount !== undefined && (
        <span className="text-xs text-ink-muted">({reviewCount.toLocaleString()})</span>
      )}
    </div>
  );
}