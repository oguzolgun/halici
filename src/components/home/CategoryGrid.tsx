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

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/halilar?kategori=${encodeURIComponent(cat.slug)}`}
              className="group relative flex flex-col justify-between overflow-hidden rounded-[14px] border border-line bg-sand/65 p-5 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:bg-sand hover:shadow-[var(--shadow-elevated)]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-editorial text-2xl text-ink group-hover:text-navy">
                    {cat.title}
                  </h3>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ivory/80 text-navy transition-transform duration-300 group-hover:translate-x-0.5">
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-stone-on-sand">
                  {cat.subtitle}
                </p>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-wider text-navy">
                  {cat.count} model
                </p>
              </div>

              {/* Clean offset rug corner preview matching mockup */}
              <div className="relative mt-6 aspect-[4/5] w-full overflow-hidden rounded-[10px] border border-ink/10 shadow-[var(--shadow-soft)]">
                <Image
                  src={cat.image}
                  alt={`${cat.title} halı koleksiyonu`}
                  fill
                  quality={55}
                  sizes="(max-width: 640px) 180px, 240px"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="rug-weave-overlay pointer-events-none absolute inset-0 opacity-40"
                />
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
