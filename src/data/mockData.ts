import type {
  Product,
  Category,
  Brand,
  Collection,
  Store,
  Testimonial,
  BlogPost,
  Review,
  QAItem,
} from "../types";

// Curated gradient pairs (derived from the brand palette + neutrals) used as
// placeholder artwork until real product photography is added.
const GRADIENTS: [string, string][] = [
  ["#2563EB", "#1E3A8A"],
  ["#10B981", "#047857"],
  ["#F97316", "#C2410C"],
  ["#6366F1", "#2563EB"],
  ["#0EA5E9", "#2563EB"],
  ["#F59E0B", "#F97316"],
  ["#14B8A6", "#10B981"],
  ["#8B5CF6", "#6366F1"],
];

function gradient(i: number): [string, string] {
  return GRADIENTS[i % GRADIENTS.length];
}

const productImageKeywords = [
  "headphones",
  "smartwatch",
  "backpack",
  "coffee",
  "office chair",
  "skincare product",
  "bluetooth speaker",
  "cast iron cookware",
  "running shoes",
  "action camera",
  "desk organizer",
  "weighted blanket",
  "stainless steel water bottle",
  "building blocks toy",
  "wireless charging pad",
  "summer dress",
  "adjustable dumbbells",
  "aromatherapy diffuser",
  "gaming keyboard",
  "air fryer",
  "polarized sunglasses",
  "memory foam pillow",
  "travel tripod",
  "pet grooming kit",
];

const productImages = productImageKeywords.map((keyword, index) =>
  `https://loremflickr.com/900/900/${encodeURIComponent(keyword)}?lock=${index + 1}`
);

export const categories: Category[] = [
  { id: "electronics", name: "Electronics", icon: "Smartphone", itemCount: 12480, colorFrom: "#2563EB", colorTo: "#1E3A8A" },
  { id: "fashion", name: "Fashion", icon: "Shirt", itemCount: 34210, colorFrom: "#F97316", colorTo: "#C2410C" },
  { id: "home", name: "Home & Living", icon: "Sofa", itemCount: 18760, colorFrom: "#10B981", colorTo: "#047857" },
  { id: "beauty", name: "Beauty & Health", icon: "Sparkles", itemCount: 9540, colorFrom: "#8B5CF6", colorTo: "#6366F1" },
  { id: "sports", name: "Sports & Outdoors", icon: "Dumbbell", itemCount: 7320, colorFrom: "#0EA5E9", colorTo: "#2563EB" },
  { id: "toys", name: "Toys & Kids", icon: "Baby", itemCount: 5210, colorFrom: "#F59E0B", colorTo: "#F97316" },
  { id: "groceries", name: "Groceries", icon: "ShoppingBasket", itemCount: 6890, colorFrom: "#14B8A6", colorTo: "#10B981" },
  { id: "automotive", name: "Automotive", icon: "Car", itemCount: 3140, colorFrom: "#64748B", colorTo: "#1E293B" },
  { id: "books", name: "Books & Media", icon: "BookOpen", itemCount: 8990, colorFrom: "#F97316", colorTo: "#F59E0B" },
  { id: "pets", name: "Pet Supplies", icon: "PawPrint", itemCount: 2870, colorFrom: "#10B981", colorTo: "#14B8A6" },
];

const productNames = [
  "Wireless Noise-Cancelling Headphones",
  "Smart Fitness Watch Series 5",
  "Minimalist Leather Backpack",
  "Ceramic Pour-Over Coffee Set",
  "Ergonomic Mesh Office Chair",
  "Organic Vitamin C Serum",
  "Portable Bluetooth Speaker",
  "Cast Iron 3-Piece Cookware Set",
  "Running Shoes — Cloud Cushion",
  "4K Ultra HD Action Camera",
  "Bamboo Desk Organizer",
  "Weighted Blanket 15lb",
  "Stainless Steel Water Bottle",
  "Kids Building Blocks — 200pc",
  "Wireless Fast Charging Pad",
  "Linen Blend Summer Dress",
  "Adjustable Dumbbell Set",
  "Aromatherapy Diffuser",
  "Mechanical Gaming Keyboard",
  "Non-Stick Air Fryer 6L",
  "Polarized Sunglasses",
  "Memory Foam Pillow (2-pack)",
  "Compact Travel Tripod",
  "Pet Grooming Kit",
];

const storeNames = [
  "NovaTech", "Northwind Goods", "Everline Home", "PureLeaf Beauty", "SprintGear",
  "UrbanCraft", "BrightNest", "TrailBlaze Outdoors", "Loomstate Apparel", "Kindled Kitchen",
];

const CATEGORY_COLORS: Record<string, string[]> = {
  Fashion: ["#1E293B", "#2563EB", "#F97316", "#FFFFFF"],
  "Sports & Outdoors": ["#1E293B", "#10B981", "#0EA5E9"],
};
const CATEGORY_SIZES: Record<string, string[]> = {
  Fashion: ["XS", "S", "M", "L", "XL"],
  "Sports & Outdoors": ["S", "M", "L", "XL"],
};

export const products: Product[] = productNames.map((name, i) => {
  const [from, to] = gradient(i);
  const price = Math.round((15 + ((i * 37) % 180)) * 1.99) / 1;
  const hasDiscount = i % 3 !== 0;
  const original = hasDiscount ? Math.round(price * (1.2 + (i % 4) * 0.1)) : undefined;
  const badges: Product["badge"][] = ["New", "Best Seller", "Trending", "Deal", "Limited"];
  const category = categories[i % categories.length].name;
  return {
    id: `p${i + 1}`,
    name,
    category,
    price,
    originalPrice: original,
    rating: Math.round((3.6 + ((i * 13) % 14) / 10) * 10) / 10,
    reviewCount: 40 + ((i * 91) % 2400),
    sold: 20 + ((i * 57) % 900),
    badge: i % 5 === 0 ? undefined : badges[i % badges.length],
    colorFrom: from,
    colorTo: to,
    imageUrl: productImages[i],
    imageKeyword: productImageKeywords[i],
    storeName: storeNames[i % storeNames.length],
    freeShipping: i % 2 === 0,
    stock: 5 + ((i * 7) % 40),
    description:
      `The ${name} is thoughtfully designed for everyday use, combining durable materials with a clean, modern finish. ` +
      `Backed by ${storeNames[i % storeNames.length]}'s quality guarantee, it ships fast and is covered by Vendora Buyer Protection.`,
    specs: [
      { label: "Brand", value: storeNames[i % storeNames.length] },
      { label: "Category", value: category },
      { label: "Weight", value: `${(0.2 + (i % 9) * 0.15).toFixed(2)} kg` },
      { label: "Warranty", value: i % 2 === 0 ? "12 months" : "6 months" },
      { label: "Origin", value: i % 3 === 0 ? "Imported" : "Locally sourced" },
    ],

    colorOptions: CATEGORY_COLORS[category],
    sizeOptions: CATEGORY_SIZES[category],
  };
});

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getRelatedProducts(product: Product, limit = 5): Product[] {
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
}

export const flashSaleProducts = products.slice(0, 5);
export const dailyDeals = products.slice(5, 11);
export const recommendedProducts = products.slice(2, 10);
export const trendingProducts = products.filter((p) => p.badge === "Trending").concat(products.slice(0, 3)).slice(0, 8);
export const bestSellers = products.filter((p) => p.badge === "Best Seller").concat(products.slice(4, 8)).slice(0, 8);
export const newArrivals = products.filter((p) => p.badge === "New").concat(products.slice(6, 10)).slice(0, 8);

export const brands: Brand[] = [
  { id: "b1", name: "NovaTech", initials: "NT", productCount: 842, color: "#2563EB" },
  { id: "b2", name: "Northwind Goods", initials: "NG", productCount: 1204, color: "#F97316" },
  { id: "b3", name: "Everline Home", initials: "EH", productCount: 673, color: "#10B981" },
  { id: "b4", name: "PureLeaf Beauty", initials: "PB", productCount: 391, color: "#8B5CF6" },
  { id: "b5", name: "SprintGear", initials: "SG", productCount: 528, color: "#0EA5E9" },
  { id: "b6", name: "UrbanCraft", initials: "UC", productCount: 1046, color: "#F59E0B" },
  { id: "b7", name: "BrightNest", initials: "BN", productCount: 289, color: "#14B8A6" },
  { id: "b8", name: "Loomstate Apparel", initials: "LA", productCount: 967, color: "#6366F1" },
];

export const collections: Collection[] = [
  { id: "c1", title: "Work-From-Home Essentials", description: "Desk gear, seating & focus tools", itemCount: 128, colorFrom: "#2563EB", colorTo: "#1E3A8A" },
  { id: "c2", title: "Self-Care Sunday", description: "Beauty, wellness & relaxation picks", itemCount: 96, colorFrom: "#8B5CF6", colorTo: "#6366F1" },
  { id: "c3", title: "Weekend Adventure Kit", description: "Outdoor, travel & fitness gear", itemCount: 154, colorFrom: "#0EA5E9", colorTo: "#2563EB" },
  { id: "c4", title: "Modern Home Refresh", description: "Décor, kitchen & organization", itemCount: 210, colorFrom: "#10B981", colorTo: "#047857" },
];

export const topStores: Store[] = [
  { id: "s1", name: "NovaTech", category: "Electronics", rating: 4.9, followers: "128K", initials: "NT", color: "#2563EB" },
  { id: "s2", name: "Everline Home", category: "Home & Living", rating: 4.8, followers: "94K", initials: "EH", color: "#10B981" },
  { id: "s3", name: "Loomstate Apparel", category: "Fashion", rating: 4.9, followers: "212K", initials: "LA", color: "#F97316" },
  { id: "s4", name: "PureLeaf Beauty", category: "Beauty & Health", rating: 4.7, followers: "76K", initials: "PB", color: "#8B5CF6" },
];

export const testimonials: Testimonial[] = [
  { id: "t1", name: "Amara O.", role: "Verified Buyer", quote: "Checkout was effortless and my order arrived two days early. The order tracking updates were spot on.", rating: 5, initials: "AO" },
  { id: "t2", name: "Daniel K.", role: "Verified Buyer", quote: "The price alert saved me nearly 20% on a laptop stand I'd been watching for weeks. Genuinely useful.", rating: 5, initials: "DK" },
  { id: "t3", name: "Priya S.", role: "Verified Buyer", quote: "Loved being able to compare three sellers side by side before choosing. Return process was painless too.", rating: 4, initials: "PS" },
  { id: "t4", name: "Marcus T.", role: "Verified Buyer", quote: "Live shopping events are addictive — bought a whole outfit during a seller's evening stream.", rating: 5, initials: "MT" },
];

export const blogPosts: BlogPost[] = [
  { id: "bl1", title: "How to Spot a Great Deal (Not Just a Discount)", excerpt: "A quick framework for judging real value before you check out.", category: "Buying Guide", readTime: "4 min read", colorFrom: "#2563EB", colorTo: "#1E3A8A" },
  { id: "bl2", title: "Setting Up a Productive Home Office on Any Budget", excerpt: "Our picks for desks, chairs and lighting that punch above their price.", category: "Home", readTime: "6 min read", colorFrom: "#10B981", colorTo: "#047857" },
  { id: "bl3", title: "A Seller's Guide to Your First 30 Days on Vendora", excerpt: "Everything new sellers should set up before their first sale.", category: "Selling", readTime: "8 min read", colorFrom: "#F97316", colorTo: "#C2410C" },
  { id: "bl4", title: "Reading Reviews Like a Pro", excerpt: "What to look for beyond the star rating to avoid buyer's remorse.", category: "Buying Guide", readTime: "3 min read", colorFrom: "#8B5CF6", colorTo: "#6366F1" },
];

const SAMPLE_REVIEWS: Omit<Review, "id">[] = [
  { author: "Amara O.", initials: "AO", rating: 5, date: "2 weeks ago", comment: "Exactly as described and arrived earlier than expected. Great quality for the price.", verified: true },
  { author: "Daniel K.", initials: "DK", rating: 4, date: "1 month ago", comment: "Solid product overall. Packaging could be a bit sturdier but nothing arrived damaged.", verified: true },
  { author: "Priya S.", initials: "PS", rating: 5, date: "1 month ago", comment: "This is my second purchase from this store — consistent quality both times.", verified: true },
  { author: "Marcus T.", initials: "MT", rating: 3, date: "2 months ago", comment: "Good value, though sizing ran slightly different than expected. Customer support was helpful.", verified: false },
];

const SAMPLE_QA: Omit<QAItem, "id">[] = [
  { question: "Does this come with a warranty?", answer: "Yes — see the warranty period listed in the Specifications tab. Extended coverage is available at checkout.", askedBy: "Chidinma A." },
  { question: "Is international shipping available for this item?", answer: "Yes, this seller ships internationally. Delivery estimates are shown at checkout based on your address.", askedBy: "Femi O." },
  { question: "Can I return this if it doesn't fit / isn't what I expected?", answer: "Yes, this item is covered under Vendora's 30-day return policy as long as it's unused and in original packaging.", askedBy: "Grace N." },
];

export function getProductReviews(productId: string): Review[] {
  // Deterministic pseudo-random pick based on product id so each product
  // shows a consistent, slightly different set of reviews.
  const seed = productId.charCodeAt(productId.length - 1) || 0;
  return SAMPLE_REVIEWS.map((r, i) => ({ ...r, id: `${productId}-r${i}` })).slice(
    0,
    3 + (seed % 2)
  );
}

export function getProductQA(productId: string): QAItem[] {
  return SAMPLE_QA.map((q, i) => ({ ...q, id: `${productId}-q${i}` }));
}