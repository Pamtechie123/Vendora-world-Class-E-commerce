import type { MouseEvent } from "react";
import { Heart, ShoppingCart, Check } from "lucide-react";
import { Link } from "react-router-dom";
import type { Product } from "../../types";
import ProductImage from "./ProductImage";
import StarRating from "./StarRating";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

interface ProductCardProps {
  product: Product;
}

const badgeStyles: Record<NonNullable<Product["badge"]>, string> = {
  New: "bg-secondary text-white",
  "Best Seller": "bg-accent text-white",
  Trending: "bg-primary text-white",
  Deal: "bg-ink text-white",
  Limited: "bg-rose-500 text-white",
};

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, items } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  const inCart = items.some((i) => i.product.id === product.id);
  const wishlisted = isWishlisted(product.id);

  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(100 - (product.price / product.originalPrice) * 100)
      : null;

  function handleWishlist(e: MouseEvent) {
    e.preventDefault();
    toggleWishlist(product);
  }

  function handleAddToCart(e: MouseEvent) {
    e.preventDefault();
    addToCart(product, 1);
  }

  return (
    <Link
      to={`/product/${product.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
    >
      <div className="relative aspect-square w-full overflow-hidden">
        <ProductImage
          colorFrom={product.colorFrom}
          colorTo={product.colorTo}
          label={product.name}
          keyword={product.imageKeyword ?? product.category}
          seed={product.id}
          className="h-full w-full transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute left-2.5 top-2.5 flex flex-col gap-1.5">
          {product.badge && (
            <span
              className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${badgeStyles[product.badge]}`}
            >
              {product.badge}
            </span>
          )}
          {discount && (
            <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-bold text-accent shadow-sm">
              -{discount}%
            </span>
          )}
        </div>

        <button
          type="button"
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          onClick={handleWishlist}
          className={`absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full shadow-sm transition-all duration-200 ${
            wishlisted
              ? "bg-accent text-white opacity-100"
              : "bg-white/90 text-ink-muted opacity-0 hover:text-accent group-hover:opacity-100"
          }`}
        >
          <Heart size={16} className={wishlisted ? "fill-white" : ""} />
        </button>

        <button
          type="button"
          aria-label={inCart ? "Added to cart" : "Add to cart"}
          onClick={handleAddToCart}
          className={`absolute bottom-2.5 right-2.5 flex h-9 w-9 items-center justify-center rounded-full shadow-glow transition-all duration-200 ${
            inCart
              ? "translate-y-0 bg-secondary text-white opacity-100"
              : "translate-y-2 bg-primary text-white opacity-0 hover:bg-primary-dark group-hover:translate-y-0 group-hover:opacity-100"
          }`}
        >
          {inCart ? <Check size={16} /> : <ShoppingCart size={16} />}
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-3.5">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">
          {product.storeName}
        </p>
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-ink">
          {product.name}
        </h3>
        <StarRating rating={product.rating} reviewCount={product.reviewCount} size={12} />
        <div className="mt-auto flex items-baseline gap-2 pt-1">
          <span className="text-base font-extrabold text-ink">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-ink-faint line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        {product.freeShipping && (
          <p className="text-[11px] font-medium text-secondary">Free shipping</p>
        )}
      </div>
    </Link>
  );
}