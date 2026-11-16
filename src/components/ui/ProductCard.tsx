"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { useFavoritesStore } from "@/store/favorites";
import type { RugProduct } from "@/types/rug";
import { Badge } from "./Badge";
import { PriceTag } from "./PriceTag";

interface ProductCardProps {
  rug: RugProduct;
  priority?: boolean;
  eager?: boolean;
}

export function ProductCard({
  rug,
  priority = false,
  eager = false,
}: ProductCardProps) {
  const { slugs, toggleFavorite } = useFavoritesStore();
  const isFav = slugs.includes(rug.slug);
  const primaryTag = rug.tags[0];

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-[14px] border border-line bg-ivory-soft transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_14px_34px_rgba(20,33,58,0.10)]">
      {/* 2:3 vertical rug showcase image */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-sand/50">
        <Link
          href={`/halilar/${rug.slug}`}
          className="block h-full w-full"
          aria-label={`${rug.name} halısını incele`}
        >
          <Image
            src={rug.image}
            alt={`${rug.name} — ${rug.colorName}`}
            fill
            priority={priority}
            loading={!priority && eager ? "eager" : undefined}
            fetchPriority={priority ? "high" : undefined}
            quality={55}
            sizes="(max-width: 640px) 160px, (max-width: 1024px) 240px, 280px"
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035]"
          />
          <div
            aria-hidden="true"
            className="rug-weave-overlay pointer-events-none absolute inset-0 opacity-45"
          />
        </Link>

        {/* Top badges */}
        <div className="pointer-events-none absolute left-2 top-2 sm:left-3 sm:top-3 flex flex-wrap gap-1">
          {primaryTag && (
            <Badge
              variant={
                primaryTag === "Çok Satan" || primaryTag === "Yeni Sezon"
                  ? "terracotta"
                  : "ivory"
              }
              className="shadow-sm text-[10px] sm:text-xs px-2 py-0.5 sm:px-2.5 sm:py-1"
            >
              {primaryTag}
            </Badge>
          )}
        </div>

        {/* Favorite button */}
        <button
          type="button"
          onClick={() => toggleFavorite(rug.slug)}
          aria-label={
            isFav
              ? `${rug.name} favorilerden çıkar`
              : `${rug.name} favorilere ekle`
          }
          aria-pressed={isFav}
          className="absolute right-2 top-2 sm:right-3 sm:top-3 flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-line bg-ivory/90 text-navy backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-ivory cursor-pointer"
        >
          <Heart
            className={`h-3.5 w-3.5 sm:h-4 sm:w-4 transition-colors ${
              isFav ? "fill-terracotta text-terracotta" : "text-navy"
            }`}
            aria-hidden="true"
          />
        </button>

        {/* Bottom quick hover hint */}
        <div className="pointer-events-none absolute inset-x-2 bottom-2 sm:inset-x-3 sm:bottom-3 translate-y-2 opacity-0 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100">
          <div className="rounded-full bg-ivory/95 px-2.5 py-1 text-center text-[10px] sm:text-xs font-medium text-navy shadow-sm backdrop-blur-sm">
            {rug.sizes.length} farklı ölçü
          </div>
        </div>
      </div>

      {/* Product meta */}
      <div className="flex flex-1 flex-col p-2.5 sm:p-4">
        <div className="flex items-center justify-between gap-1.5 sm:gap-2">
          <span className="text-[9px] sm:text-[11px] font-semibold uppercase tracking-[0.14em] text-stone truncate">
            {rug.collection}
          </span>
          <span className="inline-flex shrink-0 items-center gap-0.5 sm:gap-1 text-[10px] sm:text-xs font-medium text-ink">
            <Star
              className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-terracotta text-terracotta"
              aria-hidden="true"
            />
            <span>{rug.rating.toFixed(1).replace(".", ",")}</span>
            <span className="text-stone">({rug.reviewCount})</span>
          </span>
        </div>

        <h3 className="mt-1 sm:mt-1.5 font-editorial text-xs sm:text-base lg:text-lg leading-snug text-ink line-clamp-1">
          <Link
            href={`/halilar/${rug.slug}`}
            className="transition-colors hover:text-navy focus-visible:outline-none"
          >
            {rug.name}
          </Link>
        </h3>

        <p className="hidden sm:block mt-1 line-clamp-2 text-xs leading-relaxed text-stone">
          {rug.shortDescription}
        </p>

        {/* Color & material row */}
        <div className="mt-1.5 sm:mt-3 flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-stone">
          <span
            aria-hidden="true"
            className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 shrink-0 rounded-full border border-ink/20"
            style={{ backgroundColor: rug.colorHex }}
          />
          <span className="truncate">{rug.material}</span>
        </div>

        {/* Footer price */}
        <div className="mt-auto flex items-baseline justify-between border-t border-line/70 pt-2 sm:pt-3.5 mt-2.5 sm:mt-4 gap-1">
          <PriceTag amount={rug.priceFrom} fromPrefix size="sm" />
          <Link
            href={`/halilar/${rug.slug}`}
            className="text-[11px] sm:text-xs font-semibold text-navy underline-offset-4 transition-colors hover:text-terracotta-deep hover:underline shrink-0"
          >
            İncele
          </Link>
        </div>
      </div>
    </article>
  );
}
