import type { Metadata } from "next";
import { RugRackHero } from "@/components/hero/RugRackHero";
import { BestSellersCarousel } from "@/components/home/BestSellersCarousel";
import { BrandPromise } from "@/components/home/BrandPromise";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { CustomerReviews } from "@/components/home/CustomerReviews";
import { NewsletterBlock } from "@/components/home/NewsletterBlock";
import { RugSelectionGuide } from "@/components/home/RugSelectionGuide";
import { TrustBar } from "@/components/ui/TrustBar";
import {
  getBestsellers,
  getCategoriesSummary,
  getCustomerReviews,
  getHeroRugs,
} from "@/lib/products";

export const metadata: Metadata = {
  title: "Seç Halı | Evinize Yakışan Halıyı Güvenle Seçin",
  description:
    "Sürgülü halı rafından dokuları karşılaştırın; modern, vintage, doğal jüt, çocuk odası ve yolluk koleksiyonlarını keşfedin.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const heroRugs = getHeroRugs();
  const categories = getCategoriesSummary();
  const bestsellers = getBestsellers(8);
  const reviews = getCustomerReviews();

  return (
    <>
      <RugRackHero rugs={heroRugs} />
      <TrustBar />
      <RugSelectionGuide />
      <CategoryGrid categories={categories} />
      <BestSellersCarousel rugs={bestsellers} />
      <BrandPromise />
      <CustomerReviews reviews={reviews} />
      <NewsletterBlock />
    </>
  );
}
