import Hero from "../components/home/Hero";
import CategoryGrid from "../components/home/CategoryGrid";
import ProductSection from "../components/home/ProductSection";
import FeaturedBrands from "../components/home/FeaturedBrands";
import PopularCollections from "../components/home/PopularCollections";
import TopRatedStores from "../components/home/TopRatedStores";
import Testimonials from "../components/home/Testimonials";
import BlogGuides from "../components/home/BlogGuides";
import Newsletter from "../components/home/Newsletter";
import AppDownload from "../components/home/AppDownload";
import {
  flashSaleProducts,
  dailyDeals,
  recommendedProducts,
  trendingProducts,
  bestSellers,
  newArrivals,
} from "../data/mockData";

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <ProductSection eyebrow="Limited Time" title="Flash Sales" subtitle="Deep discounts that disappear when the clock runs out." products={flashSaleProducts} showCountdown background="surface" viewAllHref="/products?filter=deals" />
      <ProductSection eyebrow="Refreshed Daily" title="Daily Deals" subtitle="New markdowns every 24 hours across every category." products={dailyDeals} viewAllHref="/products?filter=deals" />
      <FeaturedBrands />
      <ProductSection eyebrow="Just For You" title="Recommended Picks" subtitle="Personalized based on what shoppers like you are loving." products={recommendedProducts} background="surface" />
      <ProductSection eyebrow="Rising Fast" title="Trending Now" products={trendingProducts} />
      <PopularCollections />
      <ProductSection eyebrow="Fan Favorites" title="Best Sellers" subtitle="The most-loved products across the Vendora marketplace." products={bestSellers} background="surface" />
      <ProductSection eyebrow="Just Landed" title="New Arrivals" products={newArrivals} />
      <TopRatedStores />
      <Testimonials />
      <BlogGuides />
      <Newsletter />
      <AppDownload />
    </>
  );
}