export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  sold?: number;
  badge?: "New" | "Best Seller" | "Trending" | "Deal" | "Limited";
  colorFrom: string;
  colorTo: string;
  imageUrl?: string;
  storeName: string;
  freeShipping?: boolean;
  stock?: number;
  description?: string;
  specs?: { label: string; value: string }[];
  colorOptions?: string[];
  sizeOptions?: string[];
  imageKeyword?: string;
}


export interface Category {
  id: string;
  name: string;
  icon: string;
  itemCount: number;
  colorFrom: string;
  colorTo: string;
}

export interface Brand {
  id: string;
  name: string;
  initials: string;
  productCount: number;
  color: string;
}

export interface Collection {
  id: string;
  title: string;
  description: string;
  itemCount: number;
  colorFrom: string;
  colorTo: string;
}

export interface Store {
  id: string;
  name: string;
  category: string;
  rating: number;
  followers: string;
  initials: string;
  color: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  initials: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  colorFrom: string;
  colorTo: string;
}

export interface Review {
  id: string;
  author: string;
  initials: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface QAItem {
  id: string;
  question: string;
  answer: string;
  askedBy: string;
}