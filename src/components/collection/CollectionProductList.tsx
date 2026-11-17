"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, SlidersHorizontal, Sparkles } from "lucide-react";
import { ProductCard } from "@/components/ui/ProductCard";
import type { CollectionItem } from "@/lib/collections";
import type { RugProduct } from "@/types/rug";

export interface HierarchyChip {
  label: string;
  slug: string;
  count: number;
  href: string;
  active?: boolean;
}

interface CollectionProductListProps {
  collection: CollectionItem;
  rugs: RugProduct[];
  hierarchyChips?: HierarchyChip[];
  hierarchyTitle?: string;
  activeSubSlug?: string;
}

type SortOption = "featured" | "price-asc" | "price-desc" | "rating" | "newest";

export function CollectionProductList({
  collection,
  rugs,
  hierarchyChips = [],
  hierarchyTitle,
  activeSubSlug,
}: CollectionProductListProps) {
  const [selectedSize, setSelectedSize] = useState<string>("Tümü");
  const [sortBy, setSortBy] = useState<SortOption>("featured");

  // Collect available unique sizes from this collection's rugs
  const availableSizes = useMemo(() => {
    const set = new Set<string>();
    rugs.forEach((r) => {
      r.sizes.forEach((s) => set.add(s));
    });
    // Standard order
    const order = [
      "80x150",
      "80x300",
      "100x200",
      "100x300",
      "120x180",
      "160x230",
      "200x290",
    ];
    return Array.from(set).sort((a, b) => {
      const idxA = order.indexOf(a);
      const idxB = order.indexOf(b);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return a.localeCompare(b);
    });
  }, [rugs]);

  // Filter rugs by size
  const filteredRugs = useMemo(() => {
    if (selectedSize === "Tümü") return rugs;
    return rugs.filter((r) => r.sizes.includes(selectedSize));
  }, [rugs, selectedSize]);

  // Sort filtered rugs
  const sortedRugs = useMemo(() => {
    const list = [...filteredRugs];
    switch (sortBy) {
      case "price-asc":
        return list.sort((a, b) => a.priceFrom - b.priceFrom);
      case "price-desc":
        return list.sort((a, b) => b.priceFrom - a.priceFrom);
      case "rating":
        return list.sort(
          (a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount
        );
      case "newest":
        return list.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
      case "featured":
      default:
        return list.sort((a, b) => {
          if (a.bestseller !== b.bestseller) return a.bestseller ? -1 : 1;
          return b.reviewCount - a.reviewCount;
        });
    }
  }, [filteredRugs, sortBy]);

  // Full catalog filter url
  const fullCatalogHref =
    collection.type === "kategori"
      ? `/halilar?kategori=${encodeURIComponent(collection.targetName)}`
      : `/halilar?altKategori=${encodeURIComponent(collection.targetName)}`;

  return (
    <div className="space-y-6">
      {/* WRG Home Style: Subcategory / Hierarchy Tabs */}
      {hierarchyChips.length > 0 && (
        <div className="rounded-2xl border border-line bg-sand/35 p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-terracotta-deep" aria-hidden="true" />
              <p className="text-xs font-semibold uppercase tracking-wider text-navy">
                {hierarchyTitle ||
                  (collection.type === "kategori"
                    ? `${collection.name} Alt Kategorileri & Özellikler`
                    : `${collection.name} Bulunan Alanlar & Odalar`)}
              </p>
            </div>
            <span className="text-[11px] text-stone">
              {hierarchyChips.length} Seçenek
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {hierarchyChips.map((chip) => {
              const isActive = chip.active || chip.slug === activeSubSlug;
              return (
                <Link
                  key={chip.slug}
                  href={chip.href}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-medium transition-all ${
                    isActive
                      ? "bg-navy text-ivory shadow-xs font-semibold"
                      : "border border-line/80 bg-ivory text-ink/85 hover:border-navy/40 hover:bg-sand/60 hover:text-navy"
                  }`}
                >
                  <span>{chip.label}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[10px] tabular-nums ${
                      isActive
                        ? "bg-ivory/20 text-ivory"
                        : "bg-sand/70 text-stone"
                    }`}
                  >
                    {chip.count}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Control bar: Size Pills + Sort Dropdown */}
      <div className="flex flex-col gap-4 border-b border-line pb-5 sm:flex-row sm:items-center sm:justify-between">
        {/* Size Pills */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <span className="mr-1 text-[11px] font-semibold uppercase tracking-wider text-stone">
            Ölçü:
          </span>
          <button
            type="button"
            onClick={() => setSelectedSize("Tümü")}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors cursor-pointer ${
              selectedSize === "Tümü"
                ? "bg-navy text-ivory shadow-xs"
                : "border border-line bg-sand/40 text-ink/80 hover:bg-sand/80"
            }`}
          >
            Tümü ({rugs.length})
          </button>
          {availableSizes.map((sz) => (
            <button
              key={sz}
              type="button"
              onClick={() => setSelectedSize(sz)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors cursor-pointer ${
                selectedSize === sz
                  ? "bg-navy text-ivory shadow-xs"
                  : "border border-line bg-sand/40 text-ink/80 hover:bg-sand/80"
              }`}
            >
              {sz}
            </button>
          ))}
        </div>

        {/* Sort & Model Counter */}
        <div className="flex items-center justify-between gap-3 sm:justify-end">
          <span className="text-xs text-stone">
            <strong className="font-semibold text-ink">{sortedRugs.length}</strong> model listeleniyor
          </span>

          <label className="flex items-center gap-2 text-xs text-stone">
            <span className="hidden sm:inline">Sıralama:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              aria-label="Ürün sıralama"
              className="rounded-lg border border-line bg-ivory px-2.5 py-1.5 text-xs font-medium text-ink focus:border-navy focus:outline-none cursor-pointer"
            >
              <option value="featured">Öne Çıkanlar</option>
              <option value="price-asc">Fiyat: Düşükten Yükseğe</option>
              <option value="price-desc">Fiyat: Yüksekten Düşüğe</option>
              <option value="rating">Müşteri Puanı</option>
              <option value="newest">En Yeniler</option>
            </select>
          </label>
        </div>
      </div>

      {/* Rugs Grid: 2 columns on mobile, 3 on tablet, 4 on desktop */}
      {sortedRugs.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
          {sortedRugs.map((rug, idx) => (
            <ProductCard
              key={rug.id}
              rug={rug}
              priority={idx < 2}
              eager={idx < 4}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-line bg-sand/20 p-10 text-center space-y-3">
          <p className="font-editorial text-lg text-ink">
            Seçilen ölçüye uygun model bulunamadı.
          </p>
          <p className="text-xs text-stone">
            Farklı bir standart ebat seçebilir veya tüm ölçüleri görüntüleyebilirsiniz.
          </p>
          <button
            type="button"
            onClick={() => setSelectedSize("Tümü")}
            className="rounded-lg bg-navy px-4 py-2 text-xs font-semibold text-ivory hover:bg-navy/90 cursor-pointer"
          >
            Tüm Ölçüleri Göster
          </button>
        </div>
      )}

      {/* Catalog Deep Link banner */}
      <div className="flex flex-col items-center justify-between gap-4 rounded-xl border border-line/80 bg-sand/40 p-4 sm:flex-row sm:p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ivory text-navy shadow-xs">
            <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-semibold text-ink sm:text-sm">
              Renk, stil, dokuma ve bütçeye göre daha detaylı arama yapın
            </p>
            <p className="text-[11px] text-stone">
              Tüm filtreleri yan yana karşılaştırmak için ana halı kataloğunu açabilirsiniz.
            </p>
          </div>
        </div>

        <Link
          href={fullCatalogHref}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-navy/30 bg-ivory px-3.5 py-2 text-xs font-semibold text-navy transition-all hover:border-navy hover:bg-navy hover:text-ivory"
        >
          <span>Halı Kataloğunda Filtrele</span>
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
