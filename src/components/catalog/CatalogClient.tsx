"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ChevronDown,
  Filter,
  RotateCcw,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { formatTRY } from "@/lib/format";
import { getFilteredRugs } from "@/lib/products";
import type { RugFilterParams, RugProduct } from "@/types/rug";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";
import { ProductCard } from "../ui/ProductCard";

interface FilterOptionsData {
  categories: string[];
  sizes: string[];
  colors: string[];
  styles: string[];
  rooms: string[];
  materials: string[];
  priceRange: { min: number; max: number };
}

interface CatalogClientProps {
  options: FilterOptionsData;
  totalCatalogCount: number;
}

const PRICE_BUCKETS = [
  { id: "all", label: "Tüm Fiyatlar", min: undefined, max: undefined },
  { id: "under-3500", label: "3.500 TL ve altı", min: undefined, max: 3500 },
  { id: "3500-4500", label: "3.500 – 4.500 TL", min: 3500, max: 4500 },
  { id: "over-4500", label: "4.500 TL ve üzeri", min: 4500, max: undefined },
];

const SORT_OPTIONS: Array<{
  value: NonNullable<RugFilterParams["sort"]>;
  label: string;
}> = [
  { value: "featured", label: "Önerilen Sıralama" },
  { value: "price-asc", label: "Fiyat: Düşükten Yükseğe" },
  { value: "price-desc", label: "Fiyat: Yüksekten Düşüğe" },
  { value: "rating", label: "En Çok Değerlendirilen" },
  { value: "newest", label: "Yeni Gelenler" },
];

const COLOR_HEX_MAP: Record<string, string> = {
  "Krem & Bej": "#E7DFD1",
  Lacivert: "#1C335C",
  Gri: "#B9BCC0",
  "Toprak & Terracotta": "#C2603E",
  Yeşil: "#265947",
  Pastel: "#E8C5C7",
  "Siyah & Antrasit": "#2C2E33",
  "Çok Renkli": "#C8A472",
};

const PAGE_SIZE = 6;

export function CatalogClient({
  options,
  totalCatalogCount,
}: CatalogClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Read filters from URL search params
  const filters = useMemo<RugFilterParams>(() => {
    const minStr = searchParams.get("minFiyat");
    const maxStr = searchParams.get("maxFiyat");
    return {
      q: searchParams.get("q") ?? "",
      category: searchParams.get("kategori") ?? "",
      size: searchParams.get("olcu") ?? "",
      color: searchParams.get("renk") ?? "",
      style: searchParams.get("stil") ?? "",
      room: searchParams.get("oda") ?? "",
      material: searchParams.get("malzeme") ?? "",
      minPrice: minStr ? Number(minStr) : undefined,
      maxPrice: maxStr ? Number(maxStr) : undefined,
      sort: (searchParams.get("sirala") as RugFilterParams["sort"]) ?? "featured",
    };
  }, [searchParams]);

  const filterKey = searchParams.toString();
  const [pagination, setPagination] = useState<{ key: string; count: number }>({
    key: filterKey,
    count: PAGE_SIZE,
  });
  const visibleCount =
    pagination.key === filterKey ? pagination.count : PAGE_SIZE;

  const [searchDraft, setSearchDraft] = useState<{
    syncedQ: string;
    value: string;
  }>({
    syncedQ: filters.q ?? "",
    value: filters.q ?? "",
  });
  const localSearch =
    searchDraft.syncedQ === (filters.q ?? "")
      ? searchDraft.value
      : filters.q ?? "";

  const setLocalSearch = (val: string) =>
    setSearchDraft({ syncedQ: filters.q ?? "", value: val });

  const filteredRugs: RugProduct[] = useMemo(
    () => getFilteredRugs(filters),
    [filters]
  );

  const updateParam = (updates: Record<string, string | undefined>) => {
    const next = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, val]) => {
      if (!val || val === "Tümü") {
        next.delete(key);
      } else {
        next.set(key, val);
      }
    });
    const qs = next.toString();
    router.replace(qs ? `/halilar?${qs}` : "/halilar", { scroll: false });
  };

  const clearAllFilters = () => {
    setLocalSearch("");
    router.replace("/halilar", { scroll: false });
  };

  const activeChips: Array<{ label: string; onClear: () => void }> = [];
  if (filters.q) {
    activeChips.push({
      label: `Arama: "${filters.q}"`,
      onClear: () => {
        setLocalSearch("");
        updateParam({ q: undefined });
      },
    });
  }
  if (filters.category) {
    activeChips.push({
      label: `Kategori: ${filters.category}`,
      onClear: () => updateParam({ kategori: undefined }),
    });
  }
  if (filters.room) {
    activeChips.push({
      label: `Oda: ${filters.room}`,
      onClear: () => updateParam({ oda: undefined }),
    });
  }
  if (filters.size) {
    activeChips.push({
      label: `Ölçü: ${filters.size}`,
      onClear: () => updateParam({ olcu: undefined }),
    });
  }
  if (filters.color) {
    activeChips.push({
      label: `Renk: ${filters.color}`,
      onClear: () => updateParam({ renk: undefined }),
    });
  }
  if (filters.style) {
    activeChips.push({
      label: `Stil: ${filters.style}`,
      onClear: () => updateParam({ stil: undefined }),
    });
  }
  if (filters.material) {
    activeChips.push({
      label: `Malzeme: ${filters.material}`,
      onClear: () => updateParam({ malzeme: undefined }),
    });
  }
  if (filters.minPrice || filters.maxPrice) {
    const bucketLabel =
      PRICE_BUCKETS.find(
        (b) => b.min === filters.minPrice && b.max === filters.maxPrice
      )?.label ??
      `${filters.minPrice ? formatTRY(filters.minPrice) : "0 TL"} – ${
        filters.maxPrice ? formatTRY(filters.maxPrice) : "Üstü"
      }`;
    activeChips.push({
      label: `Fiyat: ${bucketLabel}`,
      onClear: () => updateParam({ minFiyat: undefined, maxFiyat: undefined }),
    });
  }

  const displayedRugs = filteredRugs.slice(0, visibleCount);
  const remainingCount = Math.max(0, filteredRugs.length - displayedRugs.length);

  const FilterPanel = (
    <div className="space-y-6">
      {/* Search within catalog */}
      <div>
        <label
          htmlFor="catalog-search"
          className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-navy"
        >
          Katalogda Ara
        </label>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateParam({ q: localSearch.trim() || undefined });
          }}
          className="relative"
        >
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone"
            aria-hidden="true"
          />
          <input
            id="catalog-search"
            type="search"
            value={localSearch}
            onChange={(e) => {
              setLocalSearch(e.target.value);
              updateParam({ q: e.target.value.trim() || undefined });
            }}
            placeholder="Desen, malzeme, oda..."
            className="h-10 w-full rounded-full border border-line bg-ivory-soft pl-9 pr-4 text-sm text-ink placeholder:text-stone focus:border-navy focus:outline-none"
          />
        </form>
      </div>

      {/* Category */}
      <FilterGroup title="Kategori">
        <div className="flex flex-wrap gap-1.5">
          {["Tümü", ...options.categories].map((cat) => {
            const active =
              cat === "Tümü" ? !filters.category : filters.category === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() =>
                  updateParam({ kategori: cat === "Tümü" ? undefined : cat })
                }
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors cursor-pointer ${
                  active
                    ? "border-navy bg-navy text-ivory"
                    : "border-line bg-ivory-soft text-ink hover:border-navy/40"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </FilterGroup>

      {/* Room */}
      <FilterGroup title="Oda">
        <div className="space-y-1.5">
          {options.rooms.map((room) => {
            const active = filters.room === room;
            return (
              <button
                key={room}
                type="button"
                onClick={() =>
                  updateParam({ oda: active ? undefined : room })
                }
                className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-sm transition-colors cursor-pointer ${
                  active
                    ? "bg-navy text-ivory font-medium"
                    : "text-ink/85 hover:bg-sand/50"
                }`}
              >
                <span>{room}</span>
                {active && <span className="text-xs">✓</span>}
              </button>
            );
          })}
        </div>
      </FilterGroup>

      {/* Size */}
      <FilterGroup title="Ölçü">
        <div className="flex flex-wrap gap-1.5">
          {options.sizes.map((size) => {
            const active = filters.size === size;
            return (
              <button
                key={size}
                type="button"
                onClick={() =>
                  updateParam({ olcu: active ? undefined : size })
                }
                className={`rounded-full border px-2.5 py-1 text-xs transition-colors cursor-pointer ${
                  active
                    ? "border-navy bg-navy text-ivory font-medium"
                    : "border-line bg-ivory-soft text-ink hover:border-navy/40"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </FilterGroup>

      {/* Color */}
      <FilterGroup title="Renk Paleti">
        <div className="grid grid-cols-2 gap-1.5">
          {options.colors.map((color) => {
            const active = filters.color === color;
            return (
              <button
                key={color}
                type="button"
                onClick={() =>
                  updateParam({ renk: active ? undefined : color })
                }
                className={`flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-left text-xs transition-colors cursor-pointer ${
                  active
                    ? "border-navy bg-sand/70 font-semibold text-navy"
                    : "border-line bg-ivory-soft text-ink hover:border-navy/40"
                }`}
              >
                <span
                  aria-hidden="true"
                  className="h-3.5 w-3.5 shrink-0 rounded-full border border-ink/20"
                  style={{
                    backgroundColor: COLOR_HEX_MAP[color] ?? "#DDD3C4",
                  }}
                />
                <span className="truncate">{color}</span>
              </button>
            );
          })}
        </div>
      </FilterGroup>

      {/* Style */}
      <FilterGroup title="Stil">
        <div className="space-y-1.5">
          {options.styles.map((style) => {
            const active = filters.style === style;
            return (
              <button
                key={style}
                type="button"
                onClick={() =>
                  updateParam({ stil: active ? undefined : style })
                }
                className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-sm transition-colors cursor-pointer ${
                  active
                    ? "bg-navy text-ivory font-medium"
                    : "text-ink/85 hover:bg-sand/50"
                }`}
              >
                <span>{style}</span>
                {active && <span className="text-xs">✓</span>}
              </button>
            );
          })}
        </div>
      </FilterGroup>

      {/* Material */}
      <FilterGroup title="Malzeme">
        <div className="space-y-1.5">
          {options.materials.map((mat) => {
            const active = filters.material === mat;
            return (
              <button
                key={mat}
                type="button"
                onClick={() =>
                  updateParam({ malzeme: active ? undefined : mat })
                }
                className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-sm transition-colors cursor-pointer ${
                  active
                    ? "bg-navy text-ivory font-medium"
                    : "text-ink/85 hover:bg-sand/50"
                }`}
              >
                <span>{mat}</span>
                {active && <span className="text-xs">✓</span>}
              </button>
            );
          })}
        </div>
      </FilterGroup>

      {/* Price Range */}
      <FilterGroup title="Başlangıç Fiyatı">
        <div className="space-y-1.5">
          {PRICE_BUCKETS.map((bucket) => {
            const active =
              bucket.min === filters.minPrice &&
              bucket.max === filters.maxPrice;
            return (
              <button
                key={bucket.id}
                type="button"
                onClick={() =>
                  updateParam({
                    minFiyat: bucket.min ? String(bucket.min) : undefined,
                    maxFiyat: bucket.max ? String(bucket.max) : undefined,
                  })
                }
                className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-sm transition-colors cursor-pointer ${
                  active
                    ? "bg-navy text-ivory font-medium"
                    : "text-ink/85 hover:bg-sand/50"
                }`}
              >
                <span>{bucket.label}</span>
              </button>
            );
          })}
        </div>
      </FilterGroup>

      {activeChips.length > 0 && (
        <Button
          variant="secondary"
          size="sm"
          fullWidth
          onClick={clearAllFilters}
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          Filtreleri Temizle
        </Button>
      )}
    </div>
  );

  return (
    <Container className="py-10 sm:py-12">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Desktop Sidebar Filters */}
        <aside
          aria-label="Halı filtreleri"
          className="hidden lg:col-span-3 lg:block"
        >
          <div className="sticky top-24 rounded-[14px] border border-line bg-ivory-soft p-5 shadow-[var(--shadow-soft)]">
            <div className="mb-5 flex items-center justify-between border-b border-line pb-3">
              <h2 className="flex items-center gap-2 text-sm font-semibold text-ink">
                <SlidersHorizontal className="h-4 w-4 text-navy" aria-hidden="true" />
                Filtreler
              </h2>
              {activeChips.length > 0 && (
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="text-xs font-medium text-terracotta-deep hover:underline cursor-pointer"
                >
                  Temizle ({activeChips.length})
                </button>
              )}
            </div>
            {FilterPanel}
          </div>
        </aside>

        {/* Main Grid Area */}
        <div className="lg:col-span-9 space-y-6">
          <h2 className="sr-only">Halı Listesi</h2>
          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-[14px] border border-line bg-ivory-soft px-4 py-3">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="inline-flex items-center gap-2 rounded-full border border-navy/25 bg-ivory px-4 py-2 text-xs font-semibold text-navy lg:hidden cursor-pointer"
              >
                <Filter className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Filtrele</span>
                {activeChips.length > 0 && (
                  <span className="rounded-full bg-navy px-1.5 py-0.5 text-[10px] text-ivory">
                    {activeChips.length}
                  </span>
                )}
              </button>

              <p className="text-xs sm:text-sm text-stone">
                <strong className="font-semibold text-ink">
                  {filteredRugs.length}
                </strong>{" "}
                / {totalCatalogCount} halı gösteriliyor
              </p>
            </div>

            <div className="relative">
              <label htmlFor="catalog-sort" className="sr-only">
                Sıralama ölçütü
              </label>
              <select
                id="catalog-sort"
                value={filters.sort ?? "featured"}
                onChange={(e) => updateParam({ sirala: e.target.value })}
                className="appearance-none rounded-full border border-line bg-ivory py-2 pl-4 pr-9 text-xs font-medium text-ink focus:border-navy focus:outline-none cursor-pointer sm:text-sm"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone"
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Active Filter Chips */}
          {activeChips.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              {activeChips.map((chip) => (
                <button
                  key={chip.label}
                  type="button"
                  onClick={chip.onClear}
                  className="inline-flex items-center gap-1.5 rounded-full border border-navy/20 bg-sand/60 px-3 py-1 text-xs font-medium text-ink transition-colors hover:bg-sand cursor-pointer"
                >
                  <span>{chip.label}</span>
                  <X className="h-3 w-3 text-navy" aria-hidden="true" />
                </button>
              ))}
              <button
                type="button"
                onClick={clearAllFilters}
                className="px-2 py-1 text-xs font-semibold text-terracotta-deep hover:underline cursor-pointer"
              >
                Tümünü temizle
              </button>
            </div>
          )}

          {/* Product Grid or Empty State */}
          {filteredRugs.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-[14px] border border-dashed border-line bg-ivory-soft px-6 py-16 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-terracotta-deep">
                Sonuç Bulunamadı
              </p>
              <h2 className="mt-2 font-editorial text-2xl text-ink sm:text-3xl">
                Seçtiğiniz kriterlere uygun halı bulunamadı.
              </h2>
              <p className="mt-2 max-w-md text-sm text-stone">
                Farklı bir ölçü veya renk filtresi deneyebilir ya da tüm koleksiyonları görmek için filtreleri sıfırlayabilirsiniz.
              </p>
              <Button
                variant="primary"
                className="mt-6"
                onClick={clearAllFilters}
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                Filtreleri Temizle
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {displayedRugs.map((rug, index) => (
                  <ProductCard
                    key={rug.id}
                    rug={rug}
                    priority={index === 0}
                    eager={index < 3}
                  />
                ))}
              </div>

              {/* Load More Pagination */}
              {remainingCount > 0 && (
                <div className="flex flex-col items-center gap-3 pt-6">
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={() =>
                      setPagination({
                        key: filterKey,
                        count: visibleCount + PAGE_SIZE,
                      })
                    }
                  >
                    Daha Fazla Göster ({remainingCount} halı daha)
                  </Button>
                  <p className="text-xs text-stone">
                    {displayedRugs.length} / {filteredRugs.length} halı listeleniyor
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFiltersOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobil halı filtreleri"
          className="fixed inset-0 z-50 flex justify-end bg-ink/40 backdrop-blur-xs lg:hidden"
          onClick={() => setMobileFiltersOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex h-full w-full max-w-sm flex-col border-l border-line bg-ivory p-5 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-line pb-3">
              <h2 className="font-editorial text-xl text-ink">
                Filtreler ({filteredRugs.length})
              </h2>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                aria-label="Filtreleri kapat"
                className="rounded-full p-2 text-stone hover:bg-sand/60 cursor-pointer"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <div className="my-4 flex-1 overflow-y-auto pr-1">
              {FilterPanel}
            </div>
            <div className="border-t border-line pt-3">
              <Button
                variant="primary"
                fullWidth
                onClick={() => setMobileFiltersOpen(false)}
              >
                {filteredRugs.length} Halıyı Göster
              </Button>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-line/70 pt-4">
      <h3 className="mb-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-navy">
        {title}
      </h3>
      {children}
    </div>
  );
}
