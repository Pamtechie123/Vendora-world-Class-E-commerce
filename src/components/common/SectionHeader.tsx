import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  viewAllHref?: string;
  align?: "left" | "center";
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  viewAllHref,
  align = "left",
}: SectionHeaderProps) {
  const isCenter = align === "center";
  return (
    <div
      className={`mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between ${
        isCenter ? "text-center sm:text-center" : ""
      }`}
    >
      <div className={isCenter ? "mx-auto max-w-2xl" : ""}>
        {eyebrow && (
          <p className="mb-1.5 text-xs font-bold uppercase tracking-widest text-primary">
            {eyebrow}
          </p>
        )}
        <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">{title}</h2>
        {subtitle && <p className="mt-1.5 text-sm text-ink-muted sm:text-base">{subtitle}</p>}
      </div>
      {viewAllHref && (
        <Link
          to={viewAllHref}
          className="group inline-flex shrink-0 items-center gap-1.5 self-start text-sm font-semibold text-primary transition-colors hover:text-primary-dark sm:self-auto"
        >
          View all
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}