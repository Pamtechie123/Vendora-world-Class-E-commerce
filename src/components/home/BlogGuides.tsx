import { Link } from "react-router-dom";
import { Clock, ArrowRight } from "lucide-react";
import { blogPosts } from "../../data/mockData";
import SectionHeader from "../common/SectionHeader";
import ProductImage from "../common/ProductImage";

export default function BlogGuides() {
  return (
    <section className="bg-surface">
      <div className="container-page py-12 sm:py-14">
        <SectionHeader eyebrow="Learn & Discover" title="Blog & Buying Guides" subtitle="Tips to help you shop smarter — and sell better." viewAllHref="/blog" />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {blogPosts.map((post) => (
            <Link
              key={post.id}
              to="#"
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white transition-all hover:-translate-y-1 hover:shadow-card-hover"
            >
              <ProductImage colorFrom={post.colorFrom} colorTo={post.colorTo} label={post.title} className="h-36 w-full" iconSize={24} />
              <div className="flex flex-1 flex-col gap-2 p-4">
                <span className="w-fit rounded-full bg-primary-50 px-2.5 py-0.5 text-[11px] font-bold text-primary">{post.category}</span>
                <h3 className="line-clamp-2 text-sm font-bold leading-snug text-ink">{post.title}</h3>
                <p className="line-clamp-2 text-xs text-ink-muted">{post.excerpt}</p>
                <div className="mt-auto flex items-center justify-between pt-2">
                  <span className="flex items-center gap-1 text-[11px] text-ink-faint">
                    <Clock size={12} /> {post.readTime}
                  </span>
                  <ArrowRight size={15} className="text-primary transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}