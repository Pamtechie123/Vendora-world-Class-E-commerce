import { Link } from "react-router-dom";
import { brands } from "../../data/mockData";
import SectionHeader from "../common/SectionHeader";

export default function FeaturedBrands() {
  return (
    <section className="bg-surface">
      <div className="container-page py-12 sm:py-14">
        <SectionHeader eyebrow="Trusted Partners" title="Featured Brands" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              to={`/products?brand=${brand.id}`}
              className="flex flex-col items-center gap-2.5 rounded-2xl border border-border bg-white p-4 text-center transition-all hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div
                className="flex h-12 w-12 items-center justify-center rounded-full text-sm font-extrabold text-white"
                style={{ backgroundColor: brand.color }}
              >
                {brand.initials}
              </div>
              <p className="text-xs font-semibold text-ink">{brand.name}</p>
              <p className="text-[10px] text-ink-faint">{brand.productCount} items</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}