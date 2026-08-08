import type { Product } from "../../types";
import ProductCard from "../common/ProductCard";
import SectionHeader from "../common/SectionHeader";
import CountdownTimer from "../common/CountdownTimer";

interface ProductSectionProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  products: Product[];
  viewAllHref?: string;
  showCountdown?: boolean;
  background?: "white" | "surface";
}

export default function ProductSection({
  eyebrow,
  title,
  subtitle,
  products,
  viewAllHref = "/products",
  showCountdown = false,
  background = "white",
}: ProductSectionProps) {
  return (
    <section className={background === "surface" ? "bg-surface" : "bg-white"}>
      <div className="container-page py-12 sm:py-14">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} viewAllHref={viewAllHref} />
          {showCountdown && (
            <div className="mb-6 flex items-center gap-2 self-start rounded-xl bg-ink px-3 py-2 sm:self-auto">
              <span className="text-xs font-semibold text-white/80">Ends in</span>
              <CountdownTimer variant="dark" />
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5 lg:grid-cols-4 xl:grid-cols-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}