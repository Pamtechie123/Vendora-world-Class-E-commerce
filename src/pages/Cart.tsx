import { Link } from "react-router-dom";
import { Trash2, ShoppingBag, ShieldCheck, ArrowRight } from "lucide-react";
import ProductImage from "../components/common/ProductImage";
import QuantityStepper from "../components/common/QuantityStepper";
import { useCart } from "../context/CartContext";

const FREE_SHIPPING_THRESHOLD = 100;
const SHIPPING_FEE = 6.99;

export default function Cart() {
  const { items, updateQuantity, removeFromCart, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50">
          <ShoppingBag size={28} className="text-primary" />
        </div>
        <h1 className="mt-6 text-2xl font-extrabold text-ink sm:text-3xl">Your cart is empty</h1>
        <p className="mt-3 max-w-md text-sm text-ink-muted sm:text-base">
          Looks like you haven't added anything yet. Start browsing to find something you'll love.
        </p>
        <Link
          to="/products"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-primary-dark"
        >
          Start Shopping
          <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;
  const amountToFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;

  return (
    <div className="container-page py-8 sm:py-10">
      <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">
        Shopping Cart <span className="text-ink-muted">({items.length})</span>
      </h1>

      {amountToFreeShipping > 0 && (
        <div className="mt-4 rounded-xl bg-secondary/10 px-4 py-3 text-sm font-medium text-secondary">
          Add ${amountToFreeShipping.toFixed(2)} more to unlock free shipping
        </div>
      )}

      <div className="mt-6 grid gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="flex gap-4 rounded-2xl border border-border bg-white p-4">
              <Link to={`/product/${product.id}`} className="h-24 w-24 shrink-0 overflow-hidden rounded-xl">
                <ProductImage
                  colorFrom={product.colorFrom}
                  colorTo={product.colorTo}
                  label={product.name}
                  keyword={product.imageKeyword ?? product.category}
                  seed={product.id}
                  className="h-full w-full"
                  iconSize={20}
                />
              </Link>

              <div className="flex min-w-0 flex-1 flex-col justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">
                    {product.storeName}
                  </p>
                  <Link
                    to={`/product/${product.id}`}
                    className="line-clamp-1 text-sm font-semibold text-ink hover:text-primary"
                  >
                    {product.name}
                  </Link>
                  <p className="mt-1 text-sm font-bold text-ink">${product.price.toFixed(2)}</p>
                </div>

                <div className="flex items-center justify-between">
                  <QuantityStepper
                    quantity={quantity}
                    onChange={(q) => updateQuantity(product.id, q)}
                    max={product.stock ?? 20}
                    size="sm"
                  />
                  <button
                    onClick={() => removeFromCart(product.id)}
                    aria-label={`Remove ${product.name} from cart`}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-ink-faint transition-colors hover:bg-rose-50 hover:text-rose-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <p className="hidden shrink-0 self-center text-right text-sm font-extrabold text-ink sm:block">
                ${(product.price * quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl border border-border bg-white p-6">
            <h2 className="text-base font-bold text-ink">Order Summary</h2>

            <div className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between text-ink-muted">
                <span>Subtotal</span>
                <span className="font-medium text-ink">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-ink-muted">
                <span>Shipping</span>
                <span className="font-medium text-ink">
                  {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between border-t border-border pt-3 text-base font-extrabold text-ink">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-5 flex gap-2">
              <input
                type="text"
                placeholder="Promo code"
                className="h-11 flex-1 rounded-full border border-border px-4 text-sm focus:border-primary focus:outline-none"
              />
              <button className="rounded-full border border-border px-4 text-sm font-semibold text-ink hover:border-primary hover:text-primary">
                Apply
              </button>
            </div>

            <Link
              to="/checkout"
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-bold text-white transition-colors hover:bg-primary-dark"
            >
              Proceed to Checkout
              <ArrowRight size={16} />
            </Link>

            <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-ink-muted">
              <ShieldCheck size={14} className="text-secondary" />
              Secure checkout with buyer protection
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}