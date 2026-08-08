import { Apple, PlayCircle, Star, Bell, Zap } from "lucide-react";

const APP_HIGHLIGHTS = [
  { icon: Zap, label: "Exclusive app-only flash deals" },
  { icon: Bell, label: "Instant price-drop alerts" },
  { icon: Star, label: "Faster checkout & order tracking" },
];

export default function AppDownload() {
  return (
    <section className="bg-surface">
      <div className="container-page py-12 sm:py-14">
        <div className="grid items-center gap-10 overflow-hidden rounded-3xl bg-ink px-6 py-10 sm:px-10 lg:grid-cols-2 lg:px-14 lg:py-14">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-secondary">Vendora Mobile</p>
            <h2 className="text-2xl font-extrabold leading-tight text-white sm:text-3xl">Shop smarter with the Vendora app</h2>
            <p className="mt-3 max-w-md text-sm text-white/60 sm:text-base">
              Get a faster, more personal shopping experience — with push
              notifications for deals you actually care about.
            </p>

            <ul className="mt-6 space-y-3">
              {APP_HIGHLIGHTS.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                    <Icon size={15} className="text-secondary" />
                  </span>
                  <span className="text-sm text-white/85">{label}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap gap-3">
              <button className="flex items-center gap-2.5 rounded-xl bg-white px-4 py-2.5 text-left transition-transform hover:-translate-y-0.5">
                <Apple size={24} className="text-ink" />
                <span>
                  <span className="block text-[10px] leading-none text-ink-muted">Download on the</span>
                  <span className="block text-sm font-bold leading-tight text-ink">App Store</span>
                </span>
              </button>
              <button className="flex items-center gap-2.5 rounded-xl bg-white px-4 py-2.5 text-left transition-transform hover:-translate-y-0.5">
                <PlayCircle size={24} className="text-ink" />
                <span>
                  <span className="block text-[10px] leading-none text-ink-muted">Get it on</span>
                  <span className="block text-sm font-bold leading-tight text-ink">Google Play</span>
                </span>
              </button>
            </div>
          </div>

          <div className="relative mx-auto h-64 w-full max-w-xs sm:h-80">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative h-full w-44 rounded-[2rem] border-4 border-white/15 bg-gradient-to-b from-primary to-primary-dark shadow-2xl sm:w-52">
                <div className="absolute left-1/2 top-3 h-1 w-10 -translate-x-1/2 rounded-full bg-white/25" />
                <div className="flex h-full flex-col items-center justify-center gap-3 px-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 text-lg font-extrabold text-white">V</span>
                  <p className="text-center text-xs font-semibold text-white/90">
                    Your marketplace,
                    <br /> in your pocket
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}