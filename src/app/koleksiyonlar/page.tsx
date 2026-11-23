import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TrustBar } from "@/components/ui/TrustBar";
import { getCategoriesSummary } from "@/lib/products";

export const metadata: Metadata = {
  title: "Koleksiyonlar | Seç Halı",
  description:
    "Mutfak, banyo, salon, çocuk odası, yatak odası, yolluk, kilim ve banyo takımı ana koleksiyonlarımızı ve özel alt kategorilerimizi keşfedin.",
  alternates: { canonical: "/koleksiyonlar" },
};

const CATEGORY_SLUG_MAP: Record<string, string> = {
  "Mutfak halısı": "mutfak-halisi",
  "Banyo paspası": "banyo-paspasi",
  "Salon halısı": "salon-halisi",
  "Çocuk halısı": "cocuk-halisi",
  "Yatak odası halısı": "yatak-odasi-halisi",
  "Yolluk": "yolluk",
  "Kilim": "kilim",
  "Banyo takımı": "banyo-takimi",
  "Outlet ürünler": "outlet-urunler",
  "Vintage halı": "vintage-hali",
  "Koridor halısı": "koridor-halisi",
  "Kaymaz taban": "kaymaz-taban",
  "Kesme halı": "kesme-hali",
  "Makinede yıkanabilir": "makinede-yikanabilir",
  "Sisal halı": "sisal-hali",
  "Dekoratif halı": "dekoratif-hali",
};

const SUB_CATEGORIES_DATA = [
  {
    title: "Outlet Ürünler",
    slug: "Outlet ürünler",
    desc: "Stok sonu ve sezon fırsatlarıyla sunulan indirimli birinci sınıf seriler.",
  },
  {
    title: "Vintage Halı",
    slug: "Vintage halı",
    desc: "Anadolu madalyon mirasından ilham alan, zamansız eskitme dokular.",
  },
  {
    title: "Koridor Halısı",
    slug: "Koridor halısı",
    desc: "Geçiş alanları ve antreler için dayanıklı ve şık koridor yollukları.",
  },
  {
    title: "Kaymaz Taban",
    slug: "Kaymaz taban",
    desc: "Fayans ve parkede kayma yapmayan, güvenli zemin sabitleyici taban.",
  },
  {
    title: "Kesme Halı",
    slug: "Kesme halı",
    desc: "Mekanınızın tam ölçüsüne göre özel kesilip kenarları overloklanan rulo halılar.",
  },
  {
    title: "Makinede Yıkanabilir",
    slug: "Makinede yıkanabilir",
    desc: "30 derecede kolayca yıkanabilen, leke tutmayan pratik aile serileri.",
  },
  {
    title: "Sisal & Jüt Halı",
    slug: "Sisal halı",
    desc: "Katkısız bitki lifleri ve doğal jütten dokunan nefes alan organik yüzey.",
  },
  {
    title: "Dekoratif Halı",
    slug: "Dekoratif halı",
    desc: "Modern mimari desenlerle yaşam alanınızın odak noktasını oluşturan tasarımlar.",
  },
];

export default function CollectionsPage() {
  const categories = getCategoriesSummary();

  return (
    <div className="pb-16">
      {/* Page Header */}
      <div className="border-b border-line bg-sand/35 py-10 sm:py-14">
        <Container>
          <Breadcrumb items={[{ label: "Koleksiyonlar" }]} />
          <div className="mt-5 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta-deep">
              Seç Halı Kürasyonu
            </p>
            <h1 className="mt-2 font-editorial text-3xl text-ink sm:text-4xl lg:text-5xl">
              Tüm Halı Koleksiyonları
            </h1>
            <p className="mt-3.5 text-base leading-relaxed text-stone-on-sand">
              Mutfaktan salona, banyodan çocuk odasına kadar 8 ana koleksiyonumuz
              ve evinize özel alt kategorilerimizle yaşam alanınıza en uygun dokuyu seçin.
            </p>
          </div>
        </Container>
      </div>

      {/* Main Categories Section */}
      <section className="py-16 sm:py-20">
        <Container className="space-y-10">
          <SectionHeading
            eyebrow="Temel Yaşam Alanları"
            title="Her Odanın Ruhuna Uygun Ana Koleksiyonlar"
            subtitle="Evinizin farklı yaşam alanları için özel olarak tasarlanan ana kategorilerimizi inceleyin."
            actionLabel="Tüm kataloğu gör"
            actionHref="/halilar"
          />

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6 lg:grid-cols-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/koleksiyonlar/${CATEGORY_SLUG_MAP[cat.slug] || "salon-halisi"}`}
                className="group relative flex flex-col justify-between overflow-hidden rounded-[14px] border border-line bg-sand/40 p-4 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:bg-sand/70 hover:shadow-[var(--shadow-elevated)] sm:p-5"
              >
                <div>
                  <div className="flex items-center justify-between gap-1">
                    <h2 className="truncate font-editorial text-lg text-ink group-hover:text-navy sm:text-2xl">
                      {cat.title}
                    </h2>
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ivory text-navy transition-transform duration-300 group-hover:translate-x-0.5 sm:h-7 sm:w-7">
                      <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" aria-hidden="true" />
                    </span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-stone-on-sand sm:mt-1.5">
                    {cat.subtitle}
                  </p>
                  <p className="mt-2 text-[11px] font-semibold uppercase tracking-wider text-navy">
                    {cat.count} model
                  </p>
                </div>

                <div className="relative mt-4 aspect-[4/5] w-full overflow-hidden rounded-[8px] border border-ink/10 shadow-[var(--shadow-soft)] sm:mt-6 sm:rounded-[10px]">
                  <Image
                    src={cat.image}
                    alt={`${cat.title} halı koleksiyonu`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 280px"
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

      {/* Subcategories & Special Features */}
      <section className="border-t border-line bg-sand/30 py-16 sm:py-20">
        <Container className="space-y-10">
          <SectionHeading
            eyebrow="Özellikler & Özel Seriler"
            title="İhtiyacınıza Yönelik Alt Kategoriler"
            subtitle="Kaymaz tabandan yıkanabilir modellere, kesme rulodan outlet fırsatlarına kadar zemin çözümleri."
            actionLabel="Filtrelerle keşfet"
            actionHref="/halilar"
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SUB_CATEGORIES_DATA.map((sub) => (
              <Link
                key={sub.slug}
                href={`/koleksiyonlar/${CATEGORY_SLUG_MAP[sub.slug] || "vintage-hali"}`}
                className="group flex flex-col justify-between rounded-[14px] border border-line bg-ivory-soft p-5 transition-all duration-300 hover:-translate-y-1 hover:border-navy/40 hover:shadow-md"
              >
                <div>
                  <h3 className="font-editorial text-xl text-ink group-hover:text-navy">
                    {sub.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-stone">
                    {sub.desc}
                  </p>
                </div>
                <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-navy group-hover:text-terracotta-deep">
                  <span>Modelleri İncele</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Catalog CTA Banner */}
      <section className="py-14 sm:py-16">
        <Container>
          <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-line bg-navy p-8 text-center text-ivory sm:p-12 lg:flex-row lg:text-left">
            <div className="max-w-xl space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">
                Detaylı Filtreleme
              </p>
              <h2 className="font-editorial text-2xl text-ivory sm:text-3xl">
                Aradığınız ölçü, renk ve bütçeye göre halınızı bulun.
              </h2>
              <p className="text-sm text-ivory/80">
                80x150&apos;den 200x290&apos;a kadar standart ebatları veya rulo kesme seçeneklerini katalogda karşılaştırın.
              </p>
            </div>
            <Button href="/halilar" variant="ivory" size="lg">
              Tüm Kataloğu Aç
            </Button>
          </div>
        </Container>
      </section>

      <TrustBar />
    </div>
  );
}
