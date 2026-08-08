import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { CreditCard, Landmark, Wallet, Truck, CheckCircle2, Lock } from "lucide-react";
import { useCart } from "../context/CartContext";

type PaymentMethod = "card" | "bank" | "wallet" | "cod";

const PAYMENT_OPTIONS: { id: PaymentMethod; label: string; icon: typeof CreditCard; sub: string }[] = [
  { id: "card", label: "Debit / Credit Card", icon: CreditCard, sub: "Visa, Mastercard & more" },
  { id: "bank", label: "Bank Transfer", icon: Landmark, sub: "Direct from your bank" },
  { id: "wallet", label: "Vendora Wallet", icon: Wallet, sub: "Use your wallet balance" },
  { id: "cod", label: "Cash on Delivery", icon: Truck, sub: "Pay when it arrives" },
];

const SHIPPING_FEE = 6.99;
const FREE_SHIPPING_THRESHOLD = 100;

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const [payment, setPayment] = useState<PaymentMethod>("card");
  const [placing, setPlacing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;

  function handlePlaceOrder(e: FormEvent) {
    e.preventDefault();
    setPlacing(true);
    setTimeout(() => {
      setOrderNumber(`VD-${Math.floor(100000 + Math.random() * 900000)}`);
      setOrderPlaced(true);
      setPlacing(false);
      clearCart();
    }, 900);
  }

  if (orderPlaced) {
    return (
      <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/10">
          <CheckCircle2 size={30} className="text-secondary" />
        </div>
        <h1 className="mt-6 text-2xl font-extrabold text-ink sm:text-3xl">Order confirmed!</h1>
        <p className="mt-3 max-w-md text-sm text-ink-muted sm:text-base">
          Thanks for shopping with Vendora. Your order{" "}
          <span className="font-semibold text-ink">#{orderNumber}</span> has been placed
          and a confirmation has been sent to your email.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-white hover:bg-primary-dark"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <h1 className="text-2xl font-extrabold text-ink">Your cart is empty</h1>
        <p className="mt-2 text-sm text-ink-muted">Add items to your cart before checking out.</p>
        <Link
          to="/products"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-white hover:bg-primary-dark"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container-page py-8 sm:py-10">
      <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">Checkout</h1>

      <form onSubmit={handlePlaceOrder} className="mt-6 grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl border border-border bg-white p-6">
            <h2 className="text-base font-bold text-ink">Shipping Address</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <input required placeholder="Full name" className="input-field" />
              <input required type="tel" placeholder="Phone number" className="input-field" />
              <input required placeholder="Street address" className="input-field sm:col-span-2" />
              <input required placeholder="City" className="input-field" />
              <input required placeholder="State / Region" className="input-field" />
              <input required placeholder="Postal code" className="input-field" />
              <input required placeholder="Country" className="input-field" defaultValue="Nigeria" />
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-white p-6">
            <h2 className="text-base font-bold text-ink">Payment Method</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {PAYMENT_OPTIONS.map(({ id, label, icon: Icon, sub }) => (
                <label
                  key={id}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-colors ${
                    payment === id ? "border-primary bg-primary-50" : "border-border hover:border-primary/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={id}
                    checked={payment === id}
                    onChange={() => setPayment(id)}
                    className="h-4 w-4 text-primary focus:ring-primary"
                  />
                  <Icon size={19} className="text-ink-muted" />
                  <div>
                    <p className="text-sm font-semibold text-ink">{label}</p>
                    <p className="text-xs text-ink-muted">{sub}</p>
                  </div>
                </label>
              ))}
            </div>

            {payment === "card" && (
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <input required placeholder="Card number" className="input-field sm:col-span-2" />
                <input required placeholder="MM / YY" className="input-field" />
                <input required placeholder="CVC" className="input-field" />
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl border border-border bg-white p-6">
            <h2 className="text-base font-bold text-ink">Order Summary</h2>
            <div className="mt-4 max-h-56 space-y-3 overflow-y-auto pr-1">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex justify-between gap-3 text-sm">
                  <span className="line-clamp-1 text-ink-muted">
                    {product.name} <span className="text-ink-faint">&times;{quantity}</span>
                  </span>
                  <span className="shrink-0 font-medium text-ink">
                    ${(product.price * quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
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

            <button
              type="submit"
              disabled={placing}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-accent py-3.5 text-sm font-bold text-white transition-colors hover:bg-accent-dark disabled:opacity-60"
            >
              <Lock size={15} />
              {placing ? "Placing order..." : `Place Order — $${total.toFixed(2)}`}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}