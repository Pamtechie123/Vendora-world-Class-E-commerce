import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  Heart,
  ShoppingCart,
  User,
  Menu,
  X,
  MapPin,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import Logo from "../common/Logo";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

const NAV_LINKS = [
  { label: "Categories", href: "/products" },
  { label: "Flash Deals", href: "/products?filter=deals" },
  { label: "New Arrivals", href: "/products?filter=new" },
  { label: "Top Stores", href: "/products?filter=stores" },
  { label: "Sell on Vendora", href: "/login" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { itemCount } = useCart();
  const { count: wishlistCount } = useWishlist();

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    const params = query.trim() ? `?search=${encodeURIComponent(query.trim())}` : "";
    navigate(`/products${params}`);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/95 backdrop-blur">
      {/* Utility bar */}
      <div className="hidden bg-ink text-white sm:block">
        <div className="container-page flex h-9 items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-white/80">
            <MapPin size={13} />
            <span>Deliver to: Lagos, Nigeria</span>
          </div>
          <div className="flex items-center gap-5 text-white/80">
            <span>Download the app</span>
            <span>Help Center</span>
            <button className="flex items-center gap-1 hover:text-white">
              English <ChevronDown size={12} />
            </button>
            <button className="flex items-center gap-1 hover:text-white">
              USD <ChevronDown size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* Main row */}
      <div className="container-page flex h-16 items-center gap-3 sm:h-20 sm:gap-6">
        <button
          className="-ml-1 flex h-9 w-9 items-center justify-center rounded-lg text-ink lg:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <Link to="/" className="shrink-0">
          <Logo />
        </Link>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="relative hidden flex-1 max-w-2xl sm:block">
          <div className="flex items-center rounded-full border border-border bg-surface pl-4 pr-1.5 transition-colors focus-within:border-primary">
            <Sparkles size={16} className="mr-2 shrink-0 text-primary" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, brands and stores..."
              className="h-11 w-full bg-transparent text-sm text-ink placeholder:text-ink-faint focus:outline-none"
              aria-label="Search Vendora"
            />
            <button
              type="submit"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-white transition-colors hover:bg-primary-dark"
              aria-label="Search"
            >
              <Search size={16} />
            </button>
          </div>
        </form>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <Link
            to="/login"
            className="hidden items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-ink hover:bg-surface md:flex"
          >
            <User size={19} />
            Account
          </Link>
          <Link
            to="/wishlist"
            className="relative flex h-10 w-10 items-center justify-center rounded-lg text-ink hover:bg-surface"
            aria-label="Wishlist"
          >
            <Heart size={20} />
            {wishlistCount > 0 && (
              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
                {wishlistCount > 9 ? "9+" : wishlistCount}
              </span>
            )}
          </Link>
          <Link
            to="/cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-lg text-ink hover:bg-surface"
            aria-label="Cart"
          >
            <ShoppingCart size={20} />
            {itemCount > 0 && (
              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                {itemCount > 9 ? "9+" : itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile search */}
      <form onSubmit={handleSearch} className="container-page pb-3 sm:hidden">
        <div className="flex items-center rounded-full border border-border bg-surface pl-3 pr-1.5">
          <Search size={16} className="mr-2 shrink-0 text-ink-faint" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Vendora..."
            className="h-10 w-full bg-transparent text-sm text-ink placeholder:text-ink-faint focus:outline-none"
            aria-label="Search Vendora"
          />
        </div>
      </form>

      {/* Desktop nav */}
      <nav className="hidden border-t border-border lg:block">
        <div className="container-page flex h-11 items-center gap-7">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="text-sm font-medium text-ink-muted transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile nav */}
      {menuOpen && (
        <nav className="border-t border-border bg-white lg:hidden">
          <div className="container-page flex flex-col py-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-border/70 py-3 text-sm font-medium text-ink last:border-0"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="py-3 text-sm font-medium text-ink"
            >
              Account
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}