import { useEffect, useState } from "react";

interface CountdownTimerProps {
  targetHours?: number;
  variant?: "light" | "dark";
}

function getRemaining(target: number) {
  const diff = Math.max(0, target - Date.now());
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { hours, minutes, seconds };
}

export default function CountdownTimer({ targetHours = 8, variant = "light" }: CountdownTimerProps) {
  const [target] = useState(() => Date.now() + targetHours * 60 * 60 * 1000);
  const [time, setTime] = useState(() => getRemaining(target));

  useEffect(() => {
    const id = setInterval(() => setTime(getRemaining(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const cellClass = variant === "dark" ? "bg-white/15 text-white" : "bg-ink text-white";
  const units = [
    { label: "H", value: time.hours },
    { label: "M", value: time.minutes },
    { label: "S", value: time.seconds },
  ];

  return (
    <div className="flex items-center gap-1.5" role="timer" aria-label="Sale ends in">
      {units.map((u, i) => (
        <div key={u.label} className="flex items-center gap-1.5">
          <div className={`flex h-9 w-9 flex-col items-center justify-center rounded-lg text-sm font-bold tabular-nums ${cellClass}`}>
            {String(u.value).padStart(2, "0")}
          </div>
          {i < units.length - 1 && (
            <span className={variant === "dark" ? "text-white/70" : "text-ink-muted"}>:</span>
          )}
        </div>
      ))}
    </div>
  );
}