import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { collections } from "../../data/mockData";
import SectionHeader from "../common/SectionHeader";

export default function PopularCollections() {
  return (
    <section className="bg-white">
      <div className="container-page py-12 sm:py-14">
        <SectionHeader eyebrow="Curated for You" title="Popular Collections" subtitle="Themed edits that make gifting and self-shopping easier." />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {collections.map((c) => (
            <Link
              key={c.id}
              to={`/products?collection=${c.id}`}
              className="group relative flex h-44 flex-col justify-end overflow-hidden rounded-2xl p-5 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover"
              style={{ background: `linear-gradient(145deg, ${c.colorFrom}, ${c.colorTo})` }}
            >
              <ArrowUpRight size={18} className="absolute right-4 top-4 text-white/70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              <p className="text-[11px] font-bold uppercase tracking-wide text-white/70">{c.itemCount} items</p>
              <h3 className="mt-1 text-lg font-extrabold leading-snug text-white">{c.title}</h3>
              <p className="mt-1 text-xs text-white/80">{c.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}