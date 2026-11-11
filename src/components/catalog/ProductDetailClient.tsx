"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Check,
  ChevronDown,
  Heart,
  Minus,
  Plus,
  Ruler,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
  X,
  ZoomIn,
} from "lucide-react";
import { formatTRY } from "@/lib/format";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { useCartStore } from "@/store/cart";
import { useFavoritesStore } from "@/store/favorites";
import type { RugProduct } from "@/types/rug";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { PriceTag } from "../ui/PriceTag";

interface ProductDetailClientProps {
  rug: RugProduct;
}

const ACCORDION_ITEMS = (rug: RugProduct) => [
  {
    id: "delivery",
    title: "Teslimat & Ücretsiz Kargo",
    body: "Saat 15:00'e kadar verilen siparişler aynı gün kargoya hazırlanır ve 1–3 iş günü içinde kapınıza teslim edilir. 2.500 TL üzeri tüm halı siparişlerinde kargo ücretsizdir.",
  },
  {
    id: "returns",
    title: "14 Gün Kolay İade & Değişim",
    body: "Halınızı evinizin doğal ışığında ve mobilyalarınızla deneyin. Ölçü veya ton içinize sinmezse teslimattan itibaren 14 gün içinde ücretsiz kargoyla iade ya da değişim talep edebilirsiniz.",
  },
  {
    id: "care",
    title: "Bakım & Temizlik Önerileri",
    body: rug.careInstructions.join(" "),
  },
  {
    id: "specs",
    title: "Dokuma & Teknik Özellikler",
    body: `Dokuma Tekniği: ${rug.weavingType}. Hav Yüksekliği: ${rug.pileHeightMm} mm. Malzeme: ${rug.material}. Menşei: ${rug.origin}. Uygun Odalar: ${rug.rooms.join(", ")}.`,
  },
];

export function ProductDetailClient({ rug }: ProductDetailClientProps) {
  const reducedMotion = usePrefersReducedMotion();
  const addItem = useCartStore((s) => s.addItem);
  const { slugs: favSlugs, toggleFavorite } = useFavoritesStore();

  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [zoomActive, setZoomActive] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const [selectedSizeIdx, setSelectedSizeIdx] = useState(
    rug.sizeOptions.length > 1 ? 1 : 0
  );
  const [quantity, setQuantity] = useState(1);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string>("delivery");
  const [addedBanner, setAddedBanner] = useState(false);

  const activeSize = rug.sizeOptions[selectedSizeIdx] ?? rug.sizeOptions[0];
  const activeImage = rug.gallery[activeImgIdx] ?? rug.image;
  const isFav = favSlugs.includes(rug.slug);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!zoomActive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    });
  };

  const handleAddToCart = () => {
    if (activeSize.stock <= 0) return;
    addItem({
      rugId: rug.id,
      slug: rug.slug,
      name: rug.name,
      collection: rug.collection,
      image: rug.image,
      sizeLabel: activeSize.label,
      colorName: rug.colorName,
      colorHex: rug.colorHex,
      unitPrice: activeSize.price,
      quantity,
      maxStock: activeSize.stock,
    });
    setAddedBanner(true);
    setTimeout(() => setAddedBanner(false), 3500);
  };

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
      {/* Left: Interactive Gallery with Zoom */}
      <div className="lg:col-span-6 space-y-4">
        <div
          onMouseEnter={() => setZoomActive(true)}
          onMouseLeave={() => setZoomActive(false)}
          onMouseMove={handleMouseMove}
          onClick={() => setLightboxOpen(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setLightboxOpen(true);
            }
          }}
          aria-label={`Yakınlaştır — ${rug.name} halı görseli`}
          className="group relative aspect-[2/3] w-full overflow-hidden rounded-[14px] border border-line bg-sand/50 shadow-[var(--shadow-soft)] cursor-zoom-in"
        >
          <Image
            src={activeImage}
            alt={`${rug.name} — görsel ${activeImgIdx + 1}`}
            fill
            priority
            fetchPriority="high"
            quality={55}
            sizes="(max-width: 640px) 215px, (max-width: 1024px) 420px, 540px"
            className="object-cover transition-transform duration-300 ease-out"
            style={
              zoomActive && !reducedMotion
                ? {
                    transform: "scale(1.85)",
                    transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                  }
                : undefined
            }
          />
          <div
            aria-hidden="true"
            className="rug-weave-overlay pointer-events-none absolute inset-0 opacity-35"
          />

          <span className="pointer-events-none absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full border border-line bg-ivory/90 px-3 py-1.5 text-xs font-medium text-navy shadow-sm backdrop-blur-xs">
            <ZoomIn className="h-3.5 w-3.5" aria-hidden="true" />
            Yakınlaştır
          </span>
        </div>

        {/* Thumbnails */}
        <div className="flex items-center gap-3 overflow-x-auto pb-1">
          {rug.gallery.map((imgSrc, idx) => {
            const active = idx === activeImgIdx;
            return (
              <button
                key={`${imgSrc}-${idx}`}
                type="button"
                onClick={() => setActiveImgIdx(idx)}
                aria-label={`Görsel ${idx + 1} seç`}
                aria-pressed={active}
                className={`relative aspect-[2/3] w-16 sm:w-20 shrink-0 overflow-hidden rounded-[10px] border-2 transition-all cursor-pointer ${
                  active
                    ? "border-navy shadow-md"
                    : "border-transparent opacity-75 hover:opacity-100"
                }`}
              >
                <Image
                  src={imgSrc}
                  alt={`${rug.name} önizleme ${idx + 1}`}
                  fill
                  quality={55}
                  sizes="(max-width: 640px) 64px, 80px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Right: Product Info, Variants, Size Matrix, Add to Cart & Accordion */}
      <div className="lg:col-span-6 space-y-6">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="sand">{rug.collection}</Badge>
              {rug.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant={tag === "Çok Satan" ? "terracotta" : "ivory"}
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <button
              type="button"
              onClick={() => toggleFavorite(rug.slug)}
              aria-pressed={isFav}
              aria-label={
                isFav
                  ? "Favorilerde — favorilerden çıkar"
                  : "Favorile — favorilere ekle"
              }
              className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-medium text-navy transition-colors hover:bg-sand/50 cursor-pointer"
            >
              <Heart
                className={`h-3.5 w-3.5 ${
                  isFav ? "fill-terracotta text-terracotta" : ""
                }`}
                aria-hidden="true"
              />
              <span>{isFav ? "Favorilerde" : "Favorile"}</span>
            </button>
          </div>

          <h1 className="mt-3 font-editorial text-3xl leading-tight text-ink sm:text-4xl">
            {rug.name}
          </h1>

          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-stone">
            <span className="inline-flex items-center gap-1 font-semibold text-ink">
              <Star
                className="h-4 w-4 fill-terracotta text-terracotta"
                aria-hidden="true"
              />
              {rug.rating.toFixed(1).replace(".", ",")}
            </span>
            <span>({rug.reviewCount} değerlendirme)</span>
            <span aria-hidden="true">•</span>
            <span>{rug.origin}</span>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-ink/85 sm:text-base">
            {rug.description}
          </p>
        </div>

        {/* Dynamic Price & Stock */}
        <div className="rounded-[14px] border border-line bg-sand/35 p-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <PriceTag
              amount={activeSize.price}
              showInstallment
              size="lg"
            />
            <div className="text-right">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                  activeSize.stock > 3
                    ? "bg-ivory text-navy border border-line"
                    : activeSize.stock > 0
                    ? "bg-terracotta-deep text-ivory"
                    : "bg-stone text-ivory"
                }`}
              >
                {activeSize.stock > 3
                  ? `Stokta var (${activeSize.stock} adet)`
                  : activeSize.stock > 0
                  ? `Son ${activeSize.stock} adet!`
                  : "Stokta kalmadı"}
              </span>
              <p className="mt-1 text-[11px] text-stone-on-sand">
                {activeSize.price >= 2500
                  ? "Ücretsiz Kargo kapsamındadır"
                  : "149 TL kargo veya 2.500 TL üzeri ücretsiz"}
              </p>
            </div>
          </div>
        </div>

        {/* Color Variants */}
        {rug.variants.length > 0 && (
          <div>
            <p className="mb-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-navy">
              Renk Seçeneği:{" "}
              <span className="font-normal normal-case text-ink">
                {rug.colorName}
              </span>
            </p>
            <div className="flex flex-wrap gap-2.5">
              {rug.variants.map((variant) => {
                const isCurrent = variant.slug === rug.slug;
                return (
                  <Link
                    key={`${variant.name}-${variant.hex}`}
                    href={variant.slug ? `/halilar/${variant.slug}` : "#"}
                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition-all ${
                      isCurrent
                        ? "border-navy bg-navy text-ivory font-semibold"
                        : "border-line bg-ivory-soft text-ink hover:border-navy/50"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className="h-3.5 w-3.5 rounded-full border border-ivory/60 shadow-xs"
                      style={{ backgroundColor: variant.hex }}
                    />
                    <span>{variant.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Size Matrix + Size Guide Trigger */}
        <div>
          <div className="mb-2.5 flex items-center justify-between gap-2">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-navy">
              Ölçü Seçimi:{" "}
              <span className="font-normal normal-case text-ink">
                {activeSize.label}
              </span>
            </p>
            <button
              type="button"
              onClick={() => setSizeGuideOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-terracotta-deep underline underline-offset-4 hover:text-navy cursor-pointer"
            >
              <Ruler className="h-3.5 w-3.5" aria-hidden="true" />
              Ölçü Rehberi
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {rug.sizeOptions.map((option, idx) => {
              const selected = idx === selectedSizeIdx;
              return (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => {
                    setSelectedSizeIdx(idx);
                    setQuantity(1);
                    setAddedBanner(false);
                  }}
                  aria-pressed={selected}
                  className={`flex flex-col items-start rounded-[12px] border px-3.5 py-2.5 text-left transition-all cursor-pointer ${
                    selected
                      ? "border-navy bg-navy text-ivory shadow-sm"
                      : "border-line bg-ivory-soft text-ink hover:border-navy/50"
                  }`}
                >
                  <span className="text-xs font-semibold">{option.label}</span>
                  <span
                    className={`mt-0.5 text-[11px] tabular-nums ${
                      selected ? "text-ivory/80" : "text-stone"
                    }`}
                  >
                    {formatTRY(option.price)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quantity & Add to Cart */}
        <div className="flex flex-col gap-3 pt-1 sm:flex-row">
          <div className="inline-flex h-12 items-center justify-between rounded-full border border-line bg-ivory-soft px-2 sm:w-36">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              aria-label="Adedi azalt"
              disabled={quantity <= 1}
              className="flex h-8 w-8 items-center justify-center rounded-full text-navy hover:bg-sand/60 disabled:opacity-35 cursor-pointer"
            >
              <Minus className="h-4 w-4" aria-hidden="true" />
            </button>
            <span
              aria-live="polite"
              className="text-sm font-semibold tabular-nums text-ink"
            >
              {quantity}
            </span>
            <button
              type="button"
              onClick={() =>
                setQuantity((q) => Math.min(activeSize.stock, q + 1))
              }
              aria-label="Adedi artır"
              disabled={quantity >= activeSize.stock}
              className="flex h-8 w-8 items-center justify-center rounded-full text-navy hover:bg-sand/60 disabled:opacity-35 cursor-pointer"
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={handleAddToCart}
            disabled={activeSize.stock <= 0}
          >
            <ShoppingBag className="h-4 w-4" aria-hidden="true" />
            Sepete Ekle — {formatTRY(activeSize.price * quantity)}
          </Button>
        </div>

        {addedBanner && (
          <div
            role="status"
            className="flex flex-wrap items-center justify-between gap-3 rounded-[12px] border border-navy/25 bg-sand/60 px-4 py-3 text-sm text-ink"
          >
            <span className="flex items-center gap-2 font-medium">
              <Check className="h-4 w-4 text-navy" aria-hidden="true" />
              {rug.name} ({activeSize.label}) sepetinize eklendi.
            </span>
            <Link
              href="/sepet"
              className="text-xs font-semibold text-navy underline underline-offset-4 hover:text-terracotta-deep"
            >
              Sepete Git →
            </Link>
          </div>
        )}

        {/* Quick Assurance Strip */}
        <div className="grid grid-cols-2 gap-3 text-xs text-stone">
          <div className="flex items-center gap-2 rounded-xl border border-line bg-ivory-soft px-3.5 py-2.5">
            <Truck className="h-4 w-4 text-navy shrink-0" aria-hidden="true" />
            <span>1–3 iş gününde kargoda</span>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-line bg-ivory-soft px-3.5 py-2.5">
            <ShieldCheck className="h-4 w-4 text-navy shrink-0" aria-hidden="true" />
            <span>14 gün kolay iade güvencesi</span>
          </div>
        </div>

        {/* Delivery / Return / Specs Accordion */}
        <div className="divide-y divide-line border-y border-line">
          {ACCORDION_ITEMS(rug).map((item) => {
            const isOpen = openAccordion === item.id;
            return (
              <div key={item.id}>
                <button
                  type="button"
                  onClick={() =>
                    setOpenAccordion(isOpen ? "" : item.id)
                  }
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between py-4 text-left text-sm font-semibold text-ink transition-colors hover:text-navy cursor-pointer"
                >
                  <span>{item.title}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-stone transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-navy" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>
                {isOpen && (
                  <div className="overflow-hidden">
                    <p className="pb-4 text-sm leading-relaxed text-stone">
                      {item.body}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Image Zoom Modal */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${rug.name} tam ekran görünümü`}
          onClick={() => setLightboxOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/75 p-4 backdrop-blur-xs"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative h-[82vh] w-full max-w-2xl overflow-hidden rounded-[14px] border border-line bg-ivory"
          >
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              aria-label="Yakın görünümü kapat"
              className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-ivory/95 text-ink shadow-md hover:bg-sand cursor-pointer"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
            <Image
              src={activeImage}
              alt={`${rug.name} yakın plan doku`}
              fill
              sizes="(max-width: 768px) 95vw, 700px"
              className="object-contain p-2"
            />
          </div>
        </div>
      )}

      {/* Size Guide ("Ölçü Rehberi") Modal */}
      {sizeGuideOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="size-guide-title"
          onClick={() => setSizeGuideOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/45 p-4 backdrop-blur-xs"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl overflow-hidden rounded-[14px] border border-line bg-ivory p-6 shadow-2xl sm:p-8"
          >
              <div className="flex items-start justify-between gap-4 border-b border-line pb-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-terracotta-deep">
                    Seç Halı Uzman Önerisi
                  </p>
                  <h2
                    id="size-guide-title"
                    className="mt-1 font-editorial text-2xl text-ink"
                  >
                    Odaya Göre Halı Ölçü Rehberi
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setSizeGuideOpen(false)}
                  aria-label="Ölçü rehberini kapat"
                  className="rounded-full p-2 text-stone hover:bg-sand/60 cursor-pointer"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <div className="mt-5 space-y-4 text-sm">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-line bg-ivory-soft p-4">
                    <p className="font-semibold text-navy">
                      Salon & Oturma Odası
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-stone">
                      Koltuk ön ayaklarının halının üzerine 15–20 cm basması odayı daha bütün ve geniş gösterir.
                    </p>
                    <p className="mt-2 text-xs font-semibold text-ink">
                      Önerilen: 160x230 cm veya 200x290 cm
                    </p>
                  </div>

                  <div className="rounded-xl border border-line bg-ivory-soft p-4">
                    <p className="font-semibold text-navy">Yemek Odası</p>
                    <p className="mt-1 text-xs leading-relaxed text-stone">
                      Sandalyeler geri çekildiğinde arka ayakların halı kenarında takılmaması için masa çevresinde +60 cm pay bırakın.
                    </p>
                    <p className="mt-2 text-xs font-semibold text-ink">
                      Önerilen: 200x290 cm veya 240x340 cm
                    </p>
                  </div>

                  <div className="rounded-xl border border-line bg-ivory-soft p-4">
                    <p className="font-semibold text-navy">Yatak Odası</p>
                    <p className="mt-1 text-xs leading-relaxed text-stone">
                      Çift kişilik yatağın alt üçte ikisini kapsayacak biçimde yanlardan 50–60 cm taşacak genişlik idealdir.
                    </p>
                    <p className="mt-2 text-xs font-semibold text-ink">
                      Önerilen: 160x230 cm veya iki yan 80x150 cm
                    </p>
                  </div>

                  <div className="rounded-xl border border-line bg-ivory-soft p-4">
                    <p className="font-semibold text-navy">Antre & Koridor</p>
                    <p className="mt-1 text-xs leading-relaxed text-stone">
                      Duvar kenarlarından 10–15 cm parke görünecek şekilde merkezlenen dar kesimler tercih edin.
                    </p>
                    <p className="mt-2 text-xs font-semibold text-ink">
                      Önerilen: 80x150 cm veya 80x300 cm
                    </p>
                  </div>
                </div>

                <div className="rounded-xl bg-sand/50 p-3.5 text-xs text-stone-on-sand">
                  <strong>İpucu:</strong> Sipariş vermeden önce zemine kağıt bant yapıştırarak seçtiğiniz ölçünün mobilyalarla dengesini kolayca gözlemleyebilirsiniz.
                </div>
              </div>
            </div>
          </div>
      )}
    </div>
  );
}
