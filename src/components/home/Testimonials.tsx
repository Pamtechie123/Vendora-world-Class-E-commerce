import { Quote, Star } from "lucide-react";
import { testimonials } from "../../data/mockData";
import SectionHeader from "../common/SectionHeader";

export default function Testimonials() {
  return (
    <section className="bg-white">
      <div className="container-page py-12 sm:py-14">
        <SectionHeader eyebrow="Loved by Shoppers" title="What Our Customers Say" align="center" />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t) => (
            <div key={t.id} className="flex flex-col rounded-2xl border border-border bg-surface p-6">
              <Quote size={22} className="mb-3 text-primary/30" />
              <p className="flex-1 text-sm leading-relaxed text-ink">"{t.quote}"</p>
              <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink">{t.name}</p>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={11} className="fill-accent text-accent" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}