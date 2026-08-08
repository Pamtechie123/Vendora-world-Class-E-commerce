import { Link } from "react-router-dom";
import { ArrowLeft, type LucideIcon } from "lucide-react";

interface ComingSoonProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function ComingSoon({ icon: Icon, title, description }: ComingSoonProps) {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50">
        <Icon size={28} className="text-primary" />
      </div>
      <h1 className="mt-6 text-2xl font-extrabold text-ink sm:text-3xl">{title}</h1>
      <p className="mt-3 max-w-md text-sm text-ink-muted sm:text-base">{description}</p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
      >
        <ArrowLeft size={16} />
        Back to Home
      </Link>
    </div>
  );
}
