import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Truck, RotateCcw, Sparkles } from "lucide-react";

const TRUST_ITEMS = [
  { icon: ShieldCheck, label: "Buyer Protection", sub: "On every order" },
  { icon: Truck, label: "Fast Delivery", sub: "As soon as tomorrow" },
  { icon: RotateCcw, label: "Easy Returns", sub: "30-day window" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-primary-dark">
      <div className="pointer-events-none absolute -right-24 -top-32 h-96 w-96 rounded-full bg-primary/40 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" />

      <div className="container-page relative grid gap-10 py-14 sm:py-20 lg:grid-cols-2 lg:items-center lg:py-24">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white">
            <Sparkles size={14} className="text-accent" />
            AI-powered shopping, personalized for you
          </div>

          <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]">
            Everything you need,
            <br />
            from sellers you can{" "}
            <span className="relative inline-block">
              trust
              <svg className="absolute -bottom-2 left-0 w-full" height="10" viewBox="0 0 200 10" fill="none" aria-hidden="true">
                <path d="M2 8C40 2 160 2 198 8" stroke="#F97316" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
            .
          </h1>

          <p className="mt-5 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg">
            Millions of products across thousands of verified stores — with
            smart search, real-time price alerts, and delivery you can track
            end to end.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-bold text-white shadow-glow transition-transform hover:-translate-y-0.5 hover:bg-accent-dark"
            >
              Start Shopping
              <ArrowRight size={17} />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/15"
            >
              Sell on Vendora
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
            {TRUST_ITEMS.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex flex-col gap-1.5">
                <Icon size={20} className="text-secondary" />
                <p className="text-xs font-semibold text-white sm:text-sm">{label}</p>
                <p className="hidden text-[11px] text-white/50 sm:block">{sub}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative"
        >
          <div className="relative mx-auto grid max-w-md grid-cols-2 gap-4">
            <div className="col-span-2 rounded-2xl bg-gradient-to-br from-accent to-orange-600 p-6 shadow-2xl">
              <p className="text-xs font-bold uppercase tracking-widest text-white/80">Flash Sale</p>
              <p className="mt-1 text-2xl font-extrabold text-white">Up to 60% off</p>
              <p className="mt-1 text-sm text-white/80">Electronics & Home</p>
            </div>
            <div className="rounded-2xl bg-white p-5 shadow-2xl">
              <p className="text-xs font-bold uppercase tracking-widest text-secondary">New In</p>
              <p className="mt-1 text-lg font-extrabold text-ink">Fashion Edit</p>
              <p className="mt-1 text-xs text-ink-muted">This week's arrivals</p>
            </div>
            <div className="rounded-2xl bg-secondary p-5 shadow-2xl">
              <p className="text-xs font-bold uppercase tracking-widest text-white/80">Group Buy</p>
              <p className="mt-1 text-lg font-extrabold text-white">Save Together</p>
              <p className="mt-1 text-xs text-white/80">Unlock lower prices</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}