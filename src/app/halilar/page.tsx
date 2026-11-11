import { Suspense } from "react";
import type { Metadata } from "next";
import { CatalogClient } from "@/components/catalog/CatalogClient";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container";
import { ProductGridSkeleton } from "@/components/ui/Skeleton";
import { getAllRugs, getFilterOptions } from "@/lib/products";

export const metadata: Metadata = {
  title: "Halılar & Koleksiyonlar",
  description:
    "Modern, vintage, doğal jüt, kilim, çocuk odası ve yolluk halı modelleri. Ölçü, renk, oda ve malzemeye göre filtreleyin.",
  alternates: { canonical: "/halilar" },
};

export default function CatalogPage() {
  const options = getFilterOptions();
  const totalCount = getAllRugs().length;

  return (
    <div className="pb-16">
      <div className="border-b border-line bg-sand/35 py-10 sm:py-12">
        <Container>
          <Breadcrumb items={[{ label: "Halılar" }]} />
          <div className="mt-4 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta-deep">
              Seç Halı Kataloğu
            </p>
            <h1 className="mt-2 font-editorial text-3xl text-ink sm:text-4xl lg:text-5xl">
              Tüm Halı Koleksiyonları
            </h1>
            <p className="mt-2.5 text-sm leading-relaxed text-stone-on-sand sm:text-base">
              Odanızın metrekaresine ve ışık tonuna göre ölçü, doku ve renk filtreleriyle aradığınız halıyı kolayca bulun.
            </p>
          </div>
        </Container>
      </div>

      <Suspense
        fallback={
          <Container className="py-12">
            <ProductGridSkeleton count={6} />
          </Container>
        }
      >
        <CatalogClient options={options} totalCatalogCount={totalCount} />
      </Suspense>
    </div>
  );
}
