import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Truck,
  BadgePercent,
  Headset,
} from "lucide-react";
import Logo from "../common/Logo";

const FOOTER_COLUMNS = [
  {
    title: "Shop",
    links: [
      "All Categories",
      "Flash Deals",
      "New Arrivals",
      "Best Sellers",
      "Gift Cards",
      "Top-Rated Stores",
    ],
  },
  {
    title: "Sell on Vendora",
    links: [
      "Seller Center",
      "Start Selling",
      "Advertise Your Products",
      "Affiliate Program",
      "Influencer Program",
    ],
  },
  {
    title: "Customer Care",
    links: [
      "Help Center",
      "Track My Order",
      "Returns & Refunds",
      "Shipping Info",
      "Contact Us",
      "FAQs",
    ],
  },
  {
    title: "Company",
    links: [
      "About Us",
      "Careers",
      "Press",
      "Blog",
      "Privacy Policy",
      "Terms & Conditions",
      "Investor Relations",
    ],
  },
];

const TRUST_BADGES = [
  {
    icon: ShieldCheck,
    label: "Buyer Protection",
  },
  {
    icon: Truck,
    label: "Fast, Reliable Delivery",
  },
  {
    icon: BadgePercent,
    label: "Best Price Guarantee",
  },
  {
    icon: Headset,
    label: "24/7 Support",
  },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      {/* Trust Badges */}
      <div className="border-b border-white/10">
        <div className="container-page grid grid-cols-2 gap-6 py-6 sm:grid-cols-4">
          {TRUST_BADGES.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-3 text-sm text-white/80"
            >
              <Icon size={22} className="shrink-0 text-primary" />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-page grid grid-cols-2 gap-10 py-12 sm:grid-cols-3 lg:grid-cols-6">
        {/* Company Information */}
        <div className="col-span-2 lg:col-span-2">
          <Logo variant="light" />

          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
            A world-class multi-vendor marketplace connecting shoppers with
            trusted sellers across every category, powered by AI and built for
            trust.
          </p>

          <div className="mt-5 space-y-2 text-sm text-white/70">
            <div className="flex items-center gap-2">
              <MapPin size={15} className="text-white/40" />
              <span>12 Marina Way, Victoria Island, Lagos</span>
            </div>

            <div className="flex items-center gap-2">
              <Phone size={15} className="text-white/40" />
              <span>+234 903 8308 086</span>
            </div>

            <div className="flex items-center gap-2">
              <Mail size={15} className="text-white/40" />
              <span>anointingadenagbe564@gmail.com</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-white/40">GitHub:</span>
              <a
                href="https://github.com/anointingadenagbe564"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-white"
              >
                @anointingadenagbe564
              </a>
            </div>
          </div>

          {/* Social Media */}
          <div className="mt-5 flex items-center gap-3">
            {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social link"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-primary hover:text-white"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Footer Columns */}
        {FOOTER_COLUMNS.map((col) => (
          <div key={col.title}>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-white">
              {col.title}
            </h3>

            <ul className="space-y-2.5">
              {col.links.map((link) => (
                <li key={link}>
                  <Link
                    to="#"
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/50 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} Vendora. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <Link to="#" className="hover:text-white/80">
              Privacy Policy
            </Link>

            <Link to="#" className="hover:text-white/80">
              Terms & Conditions
            </Link>

            <Link to="#" className="hover:text-white/80">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}