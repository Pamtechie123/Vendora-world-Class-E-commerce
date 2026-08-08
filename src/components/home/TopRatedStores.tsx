import { Link } from "react-router-dom";
import { Star, CheckCircle2 } from "lucide-react";
import { topStores } from "../../data/mockData";
import SectionHeader from "../common/SectionHeader";

export default function TopRatedStores() {
  return (
    <section className="bg-surface">
      <div className="container-page py-12 sm:py-14">
        <SectionHeader
          eyebrow="Shop With Confidence"
          title="Top-Rated Stores"
          subtitle="Verified sellers with consistently excellent service."
          viewAllHref="/products?filter=stores"
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {topStores.map((store) => (
            <Link
              key={store.id}
              to={`/products?store=${store.id}`}
              className="flex items-center gap-4 rounded-2xl border border-border bg-white p-5 transition-all hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-base font-extrabold text-white"
                style={{ backgroundColor: store.color }}
              >
                {store.initials}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="truncate text-sm font-bold text-ink">{store.name}</p>
                  <CheckCircle2 size={14} className="shrink-0 text-secondary" />
                </div>
                <p className="text-xs text-ink-muted">{store.category}</p>
                <div className="mt-1.5 flex items-center gap-1.5">
                  <Star size={13} className="fill-accent text-accent" />
                  <span className="text-xs font-semibold text-ink">{store.rating}</span>
                  <span className="text-xs text-ink-faint">&middot; {store.followers} followers</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}