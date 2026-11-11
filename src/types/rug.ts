/**
 * Domain types for the Seç Halı catalog, filtering, cart, and mock checkout.
 */

export type RugCategory = "Modern" | "Vintage" | "Çocuk" | "Doğal" | "Yolluk";

export type RugStyle =
  | "Minimalist"
  | "Anadolu & Kilim"
  | "Vintage Eskitme"
  | "Bohem & Doğal"
  | "Çocuk & Oyun";

export type RugRoom =
  | "Salon & Oturma Odası"
  | "Yatak Odası"
  | "Yemek Odası"
  | "Çocuk Odası"
  | "Antre & Koridor";

export type RugMaterial =
  | "Yün & Pamuk"
  | "Doğal Jüt & Sisal"
  | "Bambu İpeği & Akrilik"
  | "Organik Pamuk"
  | "Şönil & Pamuk";

export type RugColorFamily =
  | "Krem & Bej"
  | "Lacivert"
  | "Gri"
  | "Toprak & Terracotta"
  | "Yeşil"
  | "Pastel"
  | "Siyah & Antrasit"
  | "Çok Renkli";

export interface RugSizeOption {
  /** Human-readable size label, e.g. "160 x 230 cm" */
  label: string;
  widthCm: number;
  lengthCm: number;
  /** Price in TRY for this specific dimension */
  price: number;
  /** Remaining units in stock */
  stock: number;
  /** Whether this size is ideal for corridor/runner placement */
  isRunner?: boolean;
}

export interface RugColorVariant {
  name: string;
  hex: string;
  /** Optional linked product slug if another rug represents this color */
  slug?: string;
}

export interface RugProduct {
  id: string;
  slug: string;
  name: string;
  collection: string;
  /** Main 2:3 vertical showcase image path under /public */
  image: string;
  /** Gallery image paths (first item equals image) */
  gallery: string[];
  /** Quick summary array of size labels for cards and hero */
  sizes: string[];
  /** Detailed dimension pricing and inventory matrix */
  sizeOptions: RugSizeOption[];
  /** Lowest available price in TRY (for "…'den başlayan fiyat") */
  priceFrom: number;
  tags: string[];
  category: RugCategory;
  style: RugStyle;
  rooms: RugRoom[];
  material: RugMaterial;
  colorFamily: RugColorFamily;
  colorName: string;
  colorHex: string;
  variants: RugColorVariant[];
  pileHeightMm: number;
  origin: string;
  weavingType: string;
  bestseller: boolean;
  isNew?: boolean;
  rating: number;
  reviewCount: number;
  shortDescription: string;
  description: string;
  careInstructions: string[];
}

export interface RugFilterParams {
  q?: string;
  category?: string;
  size?: string;
  color?: string;
  style?: string;
  room?: string;
  material?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?:
    | "featured"
    | "price-asc"
    | "price-desc"
    | "rating"
    | "newest";
}

export interface CustomerReview {
  id: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  rugSlug: string;
  rugName: string;
  sizePurchased: string;
  comment: string;
  verified: boolean;
}

export interface CartItem {
  /** Composite key `${rugId}::${sizeLabel}::${colorName}` */
  key: string;
  rugId: string;
  slug: string;
  name: string;
  collection: string;
  image: string;
  sizeLabel: string;
  colorName: string;
  colorHex: string;
  unitPrice: number;
  quantity: number;
  maxStock: number;
}
