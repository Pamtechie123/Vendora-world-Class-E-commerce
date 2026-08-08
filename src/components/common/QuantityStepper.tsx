import { Minus, Plus } from "lucide-react";

interface QuantityStepperProps {
  quantity: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
}

export default function QuantityStepper({
  quantity,
  onChange,
  min = 1,
  max = 99,
  size = "md",
}: QuantityStepperProps) {
  const btnSize = size === "sm" ? "h-7 w-7" : "h-9 w-9";
  const textSize = size === "sm" ? "text-xs w-7" : "text-sm w-9";

  return (
    <div className="inline-flex items-center rounded-full border border-border">
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={quantity <= min}
        onClick={() => onChange(Math.max(min, quantity - 1))}
        className={`flex ${btnSize} items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-surface disabled:opacity-30`}
      >
        <Minus size={14} />
      </button>
      <span className={`text-center font-semibold text-ink ${textSize}`}>
        {quantity}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        disabled={quantity >= max}
        onClick={() => onChange(Math.min(max, quantity + 1))}
        className={`flex ${btnSize} items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-surface disabled:opacity-30`}
      >
        <Plus size={14} />
      </button>
    </div>
  );
}