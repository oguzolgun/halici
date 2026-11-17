/**
 * Product Repository Layer
 *
 * All product catalog reads flow through this module so the mock JSON data
 * source (/data/rugs.json) can later be swapped for a headless CMS or REST/GraphQL API
 * without modifying UI components.
 */

import rawRugs from "../../data/rugs.json";
import { normalizeTurkish } from "./format";
import type {
  CustomerReview,
  RugCategory,
  RugFilterParams,
  RugProduct,
  RugSubcategory,
} from "@/types/rug";

const rugsData: RugProduct[] = rawRugs as RugProduct[];

export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    id: "rev-01",
    author: "Elif Demir",
    city: "İstanbul",
    rating: 5,
    date: "18 Ekim 2026",
    rugSlug: "mira-kabartma-modern-hali",
    rugName: "Mira Mimari Kabartma",
    sizePurchased: "200x290 cm",
    comment:
      "Fotoğraftaki dokusu gerçekte daha da zarif. Salonumuz sabah güneşi aldığında kabartma desenleri çok sakin ve kaliteli görünüyor. Teslimat ertesi gün sorunsuz ulaştı.",
    verified: true,
  },
  {
    id: "rev-02",
    author: "Mehmet Karahan",
    city: "Ankara",
    rating: 5,
    date: "2 Kasım 2026",
    rugSlug: "iznik-eskitme-lacivert-madalyon",
    rugName: "İznik Eskitme Madalyon",
    sizePurchased: "160x230 cm",
    comment:
      "Yemek masası altı için ince havlı bir model arıyorduk. Sandalyeler rahatça kayıyor, lacivert ve kiremit tonu meşe masayla harika bütünleşti.",
    verified: true,
  },
  {
    id: "rev-03",
    author: "Zeynep Yılmaz",
    city: "İzmir",
    rating: 5,
    date: "27 Ekim 2026",
    rugSlug: "bulut-masali-cocuk-odasi-halisi",
    rugName: "Bulut Masalı Çocuk Halısı",
    sizePurchased: "120x180 cm",
    comment:
      "Kızımın odası için aldık. Kesinlikle koku yapmıyor ve tüy dökmüyor. 30 derecede yıkayıp serdik, formu hiç bozulmadı.",
    verified: true,
  },
  {
    id: "rev-04",
    author: "Ahmet & Selin Aksoy",
    city: "Bursa",
    rating: 5,
    date: "5 Kasım 2026",
    rugSlug: "anadolu-geometrik-kilim",
    rugName: "Anadolu Geometrik Kilim",
    sizePurchased: "160x230 cm",
    comment:
      "Ölçü konusunda tereddüt etmiştik, sitedeki ölçü rehberi çok yardımcı oldu. Kırık beyaz zemini evi olduğundan daha ferah gösteriyor.",
    verified: true,
  },
];

export interface CategorySummary {
  slug: RugCategory;
  title: string;
  subtitle: string;
  image: string;
  count: number;
}

/**
 * Returns all 12 catalog products.
 */
export function getAllRugs(): RugProduct[] {
  return rugsData;
}

/**
 * Returns the 12 hanging rack items for the homepage RugRackHero.
 */
export function getHeroRugs(): RugProduct[] {
  return rugsData.slice(0, 12);
}

/**
 * Finds a single rug product by its URL slug.
 */
export function getRugBySlug(slug: string): RugProduct | undefined {
  return rugsData.find((rug) => rug.slug === slug);
}

/**
 * Returns bestselling rugs sorted by rating and review count.
 */
export function getBestsellers(limit = 8): RugProduct[] {
  return rugsData
    .toSorted((a, b) => {
      if (a.bestseller !== b.bestseller) return a.bestseller ? -1 : 1;
      return b.reviewCount - a.reviewCount;
    })
    .slice(0, limit);
}

/**
 * Returns related rugs prioritizing same category or style, excluding current slug.
 */
export function getRelatedRugs(rug: RugProduct, limit = 4): RugProduct[] {
  return rugsData
    .filter((item) => item.slug !== rug.slug)
    .sort((a, b) => {
      const scoreA =
        (a.category === rug.category ? 2 : 0) +
        (a.style === rug.style ? 1 : 0);
      const scoreB =
        (b.category === rug.category ? 2 : 0) +
        (b.style === rug.style ? 1 : 0);
      return scoreB - scoreA;
    })
    .slice(0, limit);
}

/**
 * Returns category summary cards with product counts and representative images.
 */
export function getCategoriesSummary(): CategorySummary[] {
  const definitions: Array<{
    slug: RugCategory;
    title: string;
    subtitle: string;
    image: string;
  }> = [
    {
      slug: "Mutfak halısı",
      title: "Mutfak Halısı",
      subtitle: "Leke tutmaz, silinebilir ve pratik dokular",
      image: "/rugs/rug-04.jpg",
    },
    {
      slug: "Banyo paspası",
      title: "Banyo Paspası",
      subtitle: "Hızlı kuruyan, yumuşak ve emici yüzey",
      image: "/rugs/rug-06.jpg",
    },
    {
      slug: "Salon halısı",
      title: "Salon Halısı",
      subtitle: "Geniş yaşam alanları için zengin ve mimari dokular",
      image: "/rugs/rug-01.jpg",
    },
    {
      slug: "Çocuk halısı",
      title: "Çocuk Halısı",
      subtitle: "Antialerjik, organik dokulu ve güvenli modeller",
      image: "/rugs/rug-07.jpg",
    },
    {
      slug: "Yatak odası halısı",
      title: "Yatak Odası Halısı",
      subtitle: "Güne konforla başlamanızı sağlayan yumuşaklık",
      image: "/rugs/rug-03.jpg",
    },
    {
      slug: "Yolluk",
      title: "Yolluk",
      subtitle: "Antre ve koridorlar için boydan boya zarafet",
      image: "/rugs/rug-12.jpg",
    },
    {
      slug: "Kilim",
      title: "Kilim",
      subtitle: "Geleneksel motifler ve çift taraflı doğal dokuma",
      image: "/rugs/rug-05.jpg",
    },
    {
      slug: "Banyo takımı",
      title: "Banyo Takımı",
      subtitle: "Takım uyumu ve kaymaz tabanlı set konsepti",
      image: "/rugs/rug-02.jpg",
    },
  ];

  return definitions.map((def) => ({
    ...def,
    count: rugsData.filter(
      (r) =>
        r.category === def.slug ||
        (r.categories && r.categories.includes(def.slug)) ||
        (def.slug === "Yolluk" && r.sizeOptions.some((s) => s.isRunner))
    ).length,
  }));
}

/**
 * Computes available filter facets dynamically from catalog data.
 */
export function getFilterOptions() {
  const sizes = Array.from(
    new Set(rugsData.flatMap((r) => r.sizes))
  ).toSorted();
  const colors = Array.from(
    new Set(rugsData.map((r) => r.colorFamily))
  );
  const styles = Array.from(new Set(rugsData.map((r) => r.style)));
  const rooms = Array.from(new Set(rugsData.flatMap((r) => r.rooms)));
  const materials = Array.from(
    new Set(rugsData.map((r) => r.material))
  );
  const categories: RugCategory[] = [
    "Mutfak halısı",
    "Banyo paspası",
    "Salon halısı",
    "Çocuk halısı",
    "Yatak odası halısı",
    "Yolluk",
    "Kilim",
    "Banyo takımı",
  ];

  const subcategories: RugSubcategory[] = [
    "Outlet ürünler",
    "Vintage halı",
    "Koridor halısı",
    "Kaymaz taban",
    "Kesme halı",
    "Makinede yıkanabilir",
    "Sisal halı",
    "Dekoratif halı",
  ];

  const prices = rugsData.map((r) => r.priceFrom);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(
    ...rugsData.flatMap((r) => r.sizeOptions.map((s) => s.price))
  );

  return {
    categories,
    subcategories,
    sizes,
    colors,
    styles,
    rooms,
    materials,
    priceRange: { min: minPrice, max: maxPrice },
  };
}

/**
 * Filters and sorts catalog products according to query parameters.
 */
export function getFilteredRugs(params: RugFilterParams): RugProduct[] {
  let results = [...rugsData];

  if (params.q && params.q.trim().length > 0) {
    const query = normalizeTurkish(params.q);
    results = results.filter((rug) => {
      const haystack = normalizeTurkish(
        [
          rug.name,
          rug.collection,
          rug.category,
          rug.style,
          rug.material,
          rug.colorName,
          rug.colorFamily,
          rug.shortDescription,
          ...rug.tags,
          ...rug.rooms,
        ].join(" ")
      );
      return haystack.includes(query);
    });
  }

  if (params.category && params.category !== "Tümü") {
    results = results.filter(
      (r) =>
        r.category === params.category ||
        (r.categories && r.categories.includes(params.category as RugCategory)) ||
        (params.category === "Yolluk" && r.sizeOptions.some((s) => s.isRunner))
    );
  }

  if (params.subcategory && params.subcategory !== "Tümü") {
    results = results.filter(
      (r) =>
        r.subcategory === params.subcategory ||
        (r.subcategories &&
          r.subcategories.includes(params.subcategory as RugSubcategory))
    );
  }

  if (params.size) {
    const norm = params.size.replace(/\s+/g, "").replace("cm", "").toLowerCase();
    results = results.filter(
      (r) =>
        r.sizes.some(
          (s) => s.replace(/\s+/g, "").replace("cm", "").toLowerCase() === norm
        ) ||
        r.sizeOptions.some(
          (s) =>
            s.label.replace(/\s+/g, "").replace("cm", "").toLowerCase() === norm
        )
    );
  }

  if (params.color) {
    results = results.filter((r) => r.colorFamily === params.color);
  }

  if (params.style) {
    results = results.filter((r) => r.style === params.style);
  }

  if (params.room) {
    const roomParam = params.room.toLowerCase();
    results = results.filter((r) =>
      r.rooms.some((rm) => rm.toLowerCase() === roomParam)
    );
  }

  if (params.material) {
    results = results.filter((r) => r.material === params.material);
  }

  if (typeof params.minPrice === "number") {
    results = results.filter((r) => r.priceFrom >= params.minPrice!);
  }

  if (typeof params.maxPrice === "number") {
    results = results.filter((r) => r.priceFrom <= params.maxPrice!);
  }

  switch (params.sort) {
    case "price-asc":
      return results.toSorted((a, b) => a.priceFrom - b.priceFrom);
    case "price-desc":
      return results.toSorted((a, b) => b.priceFrom - a.priceFrom);
    case "rating":
      return results.toSorted(
        (a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount
      );
    case "newest":
      return results.toSorted((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
    case "featured":
    default:
      return results.toSorted((a, b) => {
        if (a.bestseller !== b.bestseller) return a.bestseller ? -1 : 1;
        return b.reviewCount - a.reviewCount;
      });
  }
}

/**
 * Lightweight instant search helper for header search overlay.
 */
export function searchRugs(query: string, limit = 6): RugProduct[] {
  if (!query.trim()) return getBestsellers(limit);
  return getFilteredRugs({ q: query }).slice(0, limit);
}

export function getCustomerReviews(): CustomerReview[] {
  return CUSTOMER_REVIEWS;
}
