import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X, ChevronDown, PackageSearch } from "lucide-react";
import ProductCard from "../components/common/ProductCard";
import { products, categories } from "../data/mockData";

type SortOption = "relevance" | "price-asc" | "price-desc" | "rating" | "newest";

const SORT_LABELS: Record<SortOption, string> = {
  relevance: "Relevance",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
  rating: "Highest Rated",
  newest: "Newest First",
};

const PAGE_SIZE = 12;

export default function Products() {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search")?.toLowerCase() ?? "";
  const categoryParam = searchParams.get("category");

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryParam ? [categoryParam] : []
  );
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState<SortOption>("relevance");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  function toggleCategory(id: string) {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
    setVisibleCount(PAGE_SIZE);
  }

  function clearFilters() {
    setSelectedCategories([]);
    setMinRating(0);
    setMaxPrice(500);
    setInStockOnly(false);
  }

  const filtered = useMemo(() => {
    const categoryNames = selectedCategories.map(
      (id) => categories.find((c) => c.id === id)?.name
    );

    let result = products.filter((p) => {
      if (searchTerm && !p.name.toLowerCase().includes(searchTerm)) return false;
      if (categoryNames.length && !categoryNames.includes(p.category)) return false;
      if (p.rating < minRating) return false;
      if (p.price > maxPrice) return false;
      if (inStockOnly && (p.stock ?? 0) <= 0) return false;
      return true;
    });

    switch (sort) {
      case "price-asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result = [...result].sort(
          (a, b) => (a.badge === "New" ? -1 : 1) - (b.badge === "New" ? -1 : 1)
        );
        break;
      default:
        break;
    }
    return result;
  }, [searchTerm, selectedCategories, minRating, maxPrice, inStockOnly, sort]);

  const visibleProducts = filtered.slice(0, visibleCount);
  const activeFilterCount =
    selectedCategories.length +
    (minRating > 0 ? 1 : 0) +
    (maxPrice < 500 ? 1 : 0) +
    (inStockOnly ? 1 : 0);

  const FiltersPanel = (
    <div className="space-y-7">
      <div>
        <h3 className="mb-3 text-sm font-bold text-ink">Category</h3>
        <div className="space-y-2.5">
          {categories.map((cat) => (
            <label key={cat.id} className="flex cursor-pointer items-center gap-2.5 text-sm text-ink-muted">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat.id)}
                onChange={() => toggleCategory(cat.id)}
                className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
              />
              {cat.name}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-bold text-ink">Max Price</h3>
        <input
          type="range"
          min={20}
          max={500}
          step={10}
          value={maxPrice}
          onChange={(e) => {
            setMaxPrice(Number(e.target.value));
            setVisibleCount(PAGE_SIZE);
          }}
          className="w-full accent-primary"
        />
        <p className="mt-1 text-xs text-ink-muted">Up to ${maxPrice}</p>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-bold text-ink">Minimum Rating</h3>
        <div className="flex flex-wrap gap-2">
          {[0, 3, 3.5, 4, 4.5].map((r) => (
            <button
              key={r}
              onClick={() => {
                setMinRating(r);
                setVisibleCount(PAGE_SIZE);
              }}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                minRating === r
                  ? "border-primary bg-primary text-white"
                  : "border-border text-ink-muted hover:border-primary"
              }`}
            >
              {r === 0 ? "Any" : `${r}+`}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="flex cursor-pointer items-center gap-2.5 text-sm text-ink-muted">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => {
              setInStockOnly(e.target.checked);
              setVisibleCount(PAGE_SIZE);
            }}
            className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
          />
          In stock only
        </label>
      </div>

      {activeFilterCount > 0 && (
        <button onClick={clearFilters} className="text-xs font-semibold text-primary hover:underline">
          Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <div className="container-page py-8 sm:py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">
          {searchTerm ? `Results for "${searchParams.get("search")}"` : "All Products"}
        </h1>
        <p className="mt-1 text-sm text-ink-muted">
          {filtered.length.toLocaleString()} product{filtered.length !== 1 ? "s" : ""} found
        </p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-24 rounded-2xl border border-border bg-white p-5">
            <h2 className="mb-5 text-base font-bold text-ink">Filters</h2>
            {FiltersPanel}
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="mb-5 flex items-center justify-between gap-3">
            <button
              onClick={() => setFiltersOpen(true)}
              className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold text-ink lg:hidden"
            >
              <SlidersHorizontal size={15} />
              Filters
              {activeFilterCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-white">
                  {activeFilterCount}
                </span>
              )}
            </button>

            <div className="relative ml-auto">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="appearance-none rounded-full border border-border bg-white py-2 pl-4 pr-9 text-sm font-medium text-ink focus:border-primary focus:outline-none"
              >
                {(Object.keys(SORT_LABELS) as SortOption[]).map((key) => (
                  <option key={key} value={key}>
                    {SORT_LABELS[key]}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={15}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted"
              />
            </div>
          </div>

          {visibleProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-20 text-center">
              <PackageSearch size={36} className="text-ink-faint" />
              <p className="mt-4 text-base font-semibold text-ink">No products match your filters</p>
              <p className="mt-1 text-sm text-ink-muted">Try adjusting or clearing your filters.</p>
              <button
                onClick={clearFilters}
                className="mt-5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5 xl:grid-cols-4">
                {visibleProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {visibleCount < filtered.length && (
                <div className="mt-8 flex justify-center">
                  <button
                    onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}
                    className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-primary hover:text-primary"
                  >
                    Load more products
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {filtersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink/50" onClick={() => setFiltersOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-full max-w-xs overflow-y-auto bg-white p-5 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-base font-bold text-ink">Filters</h2>
              <button
                onClick={() => setFiltersOpen(false)}
                aria-label="Close filters"
                className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-surface"
              >
                <X size={18} />
              </button>
            </div>
            {FiltersPanel}
            <button
              onClick={() => setFiltersOpen(false)}
              className="mt-8 w-full rounded-full bg-primary py-3 text-sm font-bold text-white"
            >
              Show {filtered.length} results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
