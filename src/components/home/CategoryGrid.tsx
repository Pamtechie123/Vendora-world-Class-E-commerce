import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { categories } from "../../data/mockData";
import SectionHeader from "../common/SectionHeader";

export default function CategoryGrid() {
  return (
    <section className="bg-white">
      <div className="container-page py-12 sm:py-14">
        <SectionHeader eyebrow="Browse" title="Shop by Category" subtitle="Curated collections updated daily based on what's trending." />
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 sm:gap-4 lg:grid-cols-10">
          {categories.map((cat) => {
            const Icon = (Icons[cat.icon as keyof typeof Icons] ?? Icons.Package) as LucideIcon;
            return (
              <Link
                key={cat.id}
                to={`/products?category=${cat.id}`}
                className="group flex flex-col items-center gap-2.5 rounded-2xl border border-border bg-white p-3.5 text-center transition-all hover:-translate-y-1 hover:border-transparent hover:shadow-card-hover sm:p-4"
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl transition-transform group-hover:scale-105 sm:h-14 sm:w-14"
                  style={{ background: `linear-gradient(135deg, ${cat.colorFrom}, ${cat.colorTo})` }}
                >
                  <Icon size={22} className="text-white" strokeWidth={1.75} />
                </div>
                <div>
                  <p className="text-xs font-semibold leading-tight text-ink sm:text-sm">{cat.name}</p>
                  <p className="mt-0.5 text-[10px] text-ink-faint">{cat.itemCount.toLocaleString()}+</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}