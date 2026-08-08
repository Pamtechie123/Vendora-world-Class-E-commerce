import { Link } from "react-router-dom";
import { Heart, ArrowRight } from "lucide-react";
import ProductCard from "../components/common/ProductCard";
import { useWishlist } from "../context/WishlistContext";

export default function Wishlist() {
  const { items } = useWishlist();

  if (items.length === 0) {
    return (
      <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50">
          <Heart size={28} className="text-primary" />
        </div>
        <h1 className="mt-6 text-2xl font-extrabold text-ink sm:text-3xl">Your wishlist is empty</h1>
        <p className="mt-3 max-w-md text-sm text-ink-muted sm:text-base">
          Tap the heart icon on any product to save it here for later.
        </p>
        <Link
          to="/products"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-primary-dark"
        >
          Browse Products
          <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="container-page py-8 sm:py-10">
      <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">
        My Wishlist <span className="text-ink-muted">({items.length})</span>
      </h1>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5 lg:grid-cols-4 xl:grid-cols-5">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
