import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Heart,
  ShoppingCart,
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
  Check,
  ChevronRight,
} from "lucide-react";
import ProductImage from "../components/common/ProductImage";
import StarRating from "../components/common/StarRating";
import QuantityStepper from "../components/common/QuantityStepper";
import ProductCard from "../components/common/ProductCard";
import ComingSoon from "../components/common/ComingSoon";
import { PackageSearch } from "lucide-react";
import {
  getProductById,
  getRelatedProducts,
  getProductReviews,
  getProductQA,
} from "../data/mockData";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

type Tab = "description" | "specs" | "reviews" | "qa";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = id ? getProductById(id) : undefined;

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | undefined>();
  const [selectedSize, setSelectedSize] = useState<string | undefined>();
  const [activeTab, setActiveTab] = useState<Tab>("description");
  const [added, setAdded] = useState(false);

  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  if (!product) {
    return (
      <ComingSoon
        icon={PackageSearch}
        title="Product Not Found"
        description="This product may have sold out or the link is no longer valid."
      />
    );
  }

  const related = getRelatedProducts(product);
  const reviews = getProductReviews(product.id);
  const qa = getProductQA(product.id);
  const wishlisted = isWishlisted(product.id);
  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(100 - (product.price / product.originalPrice) * 100)
      : null;

  function handleAddToCart() {
    addToCart(product!, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  const TABS: { id: Tab; label: string }[] = [
    { id: "description", label: "Description" },
    { id: "specs", label: "Specifications" },
    { id: "reviews", label: `Reviews (${reviews.length})` },
    { id: "qa", label: "Q&A" },
  ];

  return (
    <div className="container-page py-8 sm:py-10">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1.5 text-xs text-ink-muted">
        <Link to="/" className="hover:text-primary">Home</Link>
        <ChevronRight size={12} />
        <Link to={`/products?category=${product.category}`} className="hover:text-primary">
          {product.category}
        </Link>
        <ChevronRight size={12} />
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* Gallery */}
        <div>
          <div className="aspect-square w-full overflow-hidden rounded-2xl">
            <ProductImage
              colorFrom={product.colorFrom}
              colorTo={product.colorTo}
              imageUrl={product.imageUrl}
              label={product.name}
              className="h-full w-full"
              iconSize={56}
            />
          </div>
          <div className="mt-3 grid grid-cols-4 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <button
                key={i}
                className="aspect-square overflow-hidden rounded-xl border-2 border-transparent transition-colors hover:border-primary"
              >
                <ProductImage
                  colorFrom={product.colorFrom}
                  colorTo={product.colorTo}
                  imageUrl={product.imageUrl}
                  label={`${product.name} view ${i + 1}`}
                  className="h-full w-full"
                  iconSize={18}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            {product.storeName}
          </p>
          <h1 className="mt-1.5 text-2xl font-extrabold leading-snug text-ink sm:text-3xl">
            {product.name}
          </h1>

          <div className="mt-3 flex items-center gap-3">
            <StarRating rating={product.rating} showValue size={16} />
            <span className="text-sm text-ink-muted">
              {product.reviewCount.toLocaleString()} reviews
            </span>
            {product.sold && (
              <span className="text-sm text-ink-muted">&middot; {product.sold} sold</span>
            )}
          </div>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="text-3xl font-extrabold text-ink">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <>
                <span className="text-lg text-ink-faint line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
                <span className="rounded-full bg-accent-50 px-2.5 py-1 text-xs font-bold text-accent">
                  -{discount}%
                </span>
              </>
            )}
          </div>

          {product.colorOptions && (
            <div className="mt-6">
              <p className="mb-2 text-sm font-semibold text-ink">Color</p>
              <div className="flex flex-wrap gap-2.5">
                {product.colorOptions.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    aria-label={`Select color ${c}`}
                    className={`h-9 w-9 rounded-full border-2 transition-transform hover:scale-110 ${
                      selectedColor === c ? "border-primary" : "border-border"
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>
          )}

          {product.sizeOptions && (
            <div className="mt-5">
              <p className="mb-2 text-sm font-semibold text-ink">Size</p>
              <div className="flex flex-wrap gap-2">
                {product.sizeOptions.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`rounded-lg border px-3.5 py-2 text-sm font-semibold transition-colors ${
                      selectedSize === s
                        ? "border-primary bg-primary text-white"
                        : "border-border text-ink-muted hover:border-primary"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 flex items-center gap-4">
            <p className="text-sm font-semibold text-ink">Quantity</p>
            <QuantityStepper quantity={quantity} onChange={setQuantity} max={product.stock ?? 20} />
            <span className="text-xs text-ink-muted">{product.stock} in stock</span>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <button
              onClick={handleAddToCart}
              className={`flex flex-1 items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold text-white shadow-glow transition-colors sm:flex-none sm:px-8 ${
                added ? "bg-secondary" : "bg-primary hover:bg-primary-dark"
              }`}
            >
              {added ? <Check size={17} /> : <ShoppingCart size={17} />}
              {added ? "Added to Cart" : "Add to Cart"}
            </button>
            <button
              onClick={() => toggleWishlist(product)}
              className={`flex items-center justify-center gap-2 rounded-full border px-6 py-3.5 text-sm font-bold transition-colors ${
                wishlisted
                  ? "border-accent bg-accent-50 text-accent"
                  : "border-border text-ink hover:border-accent hover:text-accent"
              }`}
            >
              <Heart size={17} className={wishlisted ? "fill-accent" : ""} />
              {wishlisted ? "Wishlisted" : "Wishlist"}
            </button>
          </div>

          <div className="mt-8 space-y-3 rounded-2xl border border-border bg-surface p-5">
            <div className="flex items-center gap-3">
              <Truck size={18} className="shrink-0 text-primary" />
              <p className="text-sm text-ink">
                {product.freeShipping ? "Free delivery" : "Standard delivery"} — estimated 3–5 business days
              </p>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck size={18} className="shrink-0 text-secondary" />
              <p className="text-sm text-ink">Covered by Vendora Buyer Protection</p>
            </div>
            <div className="flex items-center gap-3">
              <RotateCcw size={18} className="shrink-0 text-accent" />
              <p className="text-sm text-ink">30-day free returns</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-14">
        <div className="flex gap-6 overflow-x-auto border-b border-border">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`shrink-0 border-b-2 py-3.5 text-sm font-semibold transition-colors ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-ink-muted hover:text-ink"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="py-8">
          {activeTab === "description" && (
            <p className="max-w-3xl text-sm leading-relaxed text-ink-muted">
              {product.description}
            </p>
          )}

          {activeTab === "specs" && (
            <div className="max-w-2xl divide-y divide-border rounded-xl border border-border">
              {product.specs?.map((spec) => (
                <div key={spec.label} className="flex justify-between px-5 py-3 text-sm">
                  <span className="text-ink-muted">{spec.label}</span>
                  <span className="font-medium text-ink">{spec.value}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="max-w-2xl space-y-5">
              {reviews.map((review) => (
                <div key={review.id} className="rounded-xl border border-border p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                        {review.initials}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <p className="text-sm font-semibold text-ink">{review.author}</p>
                          {review.verified && (
                            <span className="rounded-full bg-secondary/10 px-1.5 py-0.5 text-[10px] font-bold text-secondary">
                              Verified
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star key={i} size={11} className="fill-accent text-accent" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-ink-faint">{review.date}</span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">{review.comment}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "qa" && (
            <div className="max-w-2xl space-y-5">
              {qa.map((item) => (
                <div key={item.id} className="rounded-xl border border-border p-5">
                  <p className="text-sm font-semibold text-ink">Q: {item.question}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">A: {item.answer}</p>
                  <p className="mt-2 text-xs text-ink-faint">Asked by {item.askedBy}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Similar products */}
      {related.length > 0 && (
        <div className="mt-6">
          <h2 className="mb-5 text-xl font-extrabold text-ink">You Might Also Like</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5 lg:grid-cols-5">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
