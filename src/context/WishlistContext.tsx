import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "../types";

interface WishlistContextValue {
  items: Product[];
  isWishlisted: (productId: string) => boolean;
  toggleWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  count: number;
}

const WishlistContext = createContext<WishlistContextValue | undefined>(
  undefined
);
const STORAGE_KEY = "vendora_wishlist";

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as Product[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore storage errors (e.g. private browsing) */
    }
  }, [items]);

  function isWishlisted(productId: string) {
    return items.some((p) => p.id === productId);
  }

  function toggleWishlist(product: Product) {
    setItems((prev) =>
      prev.some((p) => p.id === product.id)
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product]
    );
  }

  function removeFromWishlist(productId: string) {
    setItems((prev) => prev.filter((p) => p.id !== productId));
  }

  return (
    <WishlistContext.Provider
      value={{
        items,
        isWishlisted,
        toggleWishlist,
        removeFromWishlist,
        count: items.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx)
    throw new Error("useWishlist must be used within a WishlistProvider");
  return ctx;
}