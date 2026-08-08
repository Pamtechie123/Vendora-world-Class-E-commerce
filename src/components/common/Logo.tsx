interface LogoProps {
  variant?: "dark" | "light";
  className?: string;
}

export default function Logo({ variant = "dark", className = "" }: LogoProps) {
  const textColor = variant === "light" ? "text-white" : "text-ink";
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-glow">
        <span className="text-lg font-extrabold text-white">V</span>
        <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-accent ring-2 ring-white" />
      </span>
      <span className={`text-xl font-extrabold tracking-tight ${textColor}`}>
        Vendora
      </span>
    </div>
  );
}
