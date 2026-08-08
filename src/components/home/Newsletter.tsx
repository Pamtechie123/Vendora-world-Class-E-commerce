import { useState, type FormEvent } from "react";
import { Mail, CheckCircle2 } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  return (
    <section className="bg-white">
      <div className="container-page py-12 sm:py-14">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary-dark px-6 py-12 text-center sm:px-12">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-secondary/20 blur-2xl" />

          <div className="relative mx-auto flex max-w-xl flex-col items-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/15">
              <Mail size={22} className="text-white" />
            </div>
            <h2 className="text-2xl font-extrabold text-white sm:text-3xl">Get deals before everyone else</h2>
            <p className="mt-2 text-sm text-white/75 sm:text-base">
              Join our newsletter for early access to flash sales, price drops
              and new arrivals — no spam, unsubscribe anytime.
            </p>

            {submitted ? (
              <div className="mt-6 flex items-center gap-2 rounded-full bg-white/15 px-5 py-3 text-sm font-semibold text-white">
                <CheckCircle2 size={18} className="text-secondary" />
                You're subscribed! Watch your inbox for deals.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 flex w-full max-w-md flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  aria-label="Email address"
                  className="h-12 flex-1 rounded-full border-0 bg-white px-5 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <button
                  type="submit"
                  className="h-12 shrink-0 rounded-full bg-accent px-6 text-sm font-bold text-white transition-colors hover:bg-accent-dark"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}