import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CategorySummary } from "@/lib/products";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";

interface CategoryGridProps {
  categories: CategorySummary[];
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <section id="koleksiyonlar" className="border-t border-line bg-sand/30 py-16 sm:py-20">
      <Container className="space-y-10">
        <SectionHeading
          eyebrow="Koleksiyonlar"
          title="Her odanın ruhuna göre kürasyon"
          subtitle="Modern dokulardan Anadolu mirası eskitme serilere, beş temel koleksiyonumuzu keşfedin."
          actionLabel="Tümünü gör"
          actionHref="/halilar"
        />

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/halilar?kategori=${encodeURIComponent(cat.slug)}`}
              className="group relative flex flex-col justify-between overflow-hidden rounded-[14px] border border-line bg-sand/65 p-3.5 sm:p-5 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:bg-sand hover:shadow-[var(--shadow-elevated)]"
            >
              <div>
                <div className="flex items-center justify-between gap-1">
                  <h3 className="truncate font-editorial text-lg text-ink group-hover:text-navy sm:text-2xl">
                    {cat.title}
                  </h3>
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ivory/80 text-navy transition-transform duration-300 group-hover:translate-x-0.5 sm:h-7 sm:w-7">
                    <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" aria-hidden="true" />
                  </span>
                </div>
                <p className="mt-1 line-clamp-2 text-[11px] leading-tight text-stone-on-sand sm:mt-1.5 sm:line-clamp-none sm:text-xs sm:leading-relaxed">
                  {cat.subtitle}
                </p>
                <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-wider text-navy sm:mt-2 sm:text-[11px]">
                  {cat.count} model
                </p>
              </div>

              {/* Clean offset rug corner preview matching mockup */}
              <div className="relative mt-3 aspect-[4/5] w-full overflow-hidden rounded-[8px] border border-ink/10 shadow-[var(--shadow-soft)] sm:mt-6 sm:rounded-[10px]">
                <Image
                  src={cat.image}
                  alt={`${cat.title} halı koleksiyonu`}
                  fill
                  quality={55}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 240px"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="rug-weave-overlay pointer-events-none absolute inset-0 opacity-40"
                />
              </div>
            </Link>
          ))}

          {/* 6th Card: "Tüm Halılar" on mobile / tablet to complete 2-column & 3-column grid cleanly */}
          <Link
            href="/halilar"
            className="group relative flex flex-col justify-between overflow-hidden rounded-[14px] border border-navy/20 bg-navy p-3.5 sm:p-5 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:bg-navy/90 hover:shadow-[var(--shadow-elevated)] lg:hidden"
          >
            <div>
              <div className="flex items-center justify-between gap-1">
                <h3 className="truncate font-editorial text-lg text-ivory sm:text-2xl">
                  Tüm Halılar
                </h3>
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ivory/20 text-ivory transition-transform duration-300 group-hover:translate-x-0.5 sm:h-7 sm:w-7">
                  <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" aria-hidden="true" />
                </span>
              </div>
              <p className="mt-1 line-clamp-2 text-[11px] leading-tight text-ivory/80 sm:mt-1.5 sm:line-clamp-none sm:text-xs sm:leading-relaxed">
                Tüm koleksiyonları filtrelerle keşfedin
              </p>
              <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-wider text-terracotta sm:mt-2 sm:text-[11px]">
                Kataloğa Git →
              </p>
            </div>

            <div className="relative mt-3 aspect-[4/5] w-full overflow-hidden rounded-[8px] border border-ivory/15 bg-sand/20 shadow-[var(--shadow-soft)] sm:mt-6 sm:rounded-[10px]">
              <Image
                src="/rugs/rug-08.jpg"
                alt="Seç Halı tüm modeller"
                fill
                quality={55}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 240px"
                className="object-cover opacity-85 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              />
              <div
                aria-hidden="true"
                className="rug-weave-overlay pointer-events-none absolute inset-0 opacity-40"
              />
            </div>
          </Link>
        </div>
      </Container>
    </section>
  );
}
