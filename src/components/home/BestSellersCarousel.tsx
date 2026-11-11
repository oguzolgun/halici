"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { RugProduct } from "@/types/rug";
import { Container } from "../ui/Container";
import { ProductCard } from "../ui/ProductCard";
import { SectionHeading } from "../ui/SectionHeading";

interface BestSellersCarouselProps {
  rugs: RugProduct[];
}

export function BestSellersCarousel({ rugs }: BestSellersCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: "prev" | "next") => {
    const el = scrollerRef.current;
    if (!el) return;
    const distance = Math.min(el.clientWidth * 0.8, 660);
    el.scrollBy({
      left: direction === "next" ? distance : -distance,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-16 sm:py-20">
      <Container className="space-y-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="En Çok Tercih Edilenler"
            title="Ailelerin favorisi çok satan halılar"
            subtitle="Yüzlerce evde yıllardır güvenle kullanılan, yüksek puanlı ve hızlı teslimata hazır tasarımlar."
          />

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              type="button"
              onClick={() => scrollByCard("prev")}
              aria-label="Çok satanlarda önceki halılar"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-ivory-soft text-navy transition-colors hover:border-navy hover:bg-sand/60 cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard("next")}
              aria-label="Çok satanlarda sonraki halılar"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-ivory-soft text-navy transition-colors hover:border-navy hover:bg-sand/60 cursor-pointer"
            >
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          tabIndex={0}
          aria-label="Çok satan halılar listesi"
          className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 focus-visible:outline-navy"
        >
          {rugs.map((rug) => (
            <div
              key={rug.id}
              className="w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-[23.6%]"
            >
              <ProductCard rug={rug} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
