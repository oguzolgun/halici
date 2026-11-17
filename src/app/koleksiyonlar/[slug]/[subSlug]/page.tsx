import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  HelpCircle,
  Ruler,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import {
  CollectionProductList,
  type HierarchyChip,
} from "@/components/collection/CollectionProductList";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TrustBar } from "@/components/ui/TrustBar";
import {
  getAllNestedPairs,
  getAvailableCategoriesForSubcategory,
  getAvailableSubcategoriesForCategory,
  getNestedCollectionData,
  getRugsForCollection,
} from "@/lib/collections";

interface NestedCollectionPageProps {
  params: Promise<{ slug: string; subSlug: string }>;
}

export async function generateStaticParams() {
  const pairs = getAllNestedPairs();
  return pairs.map((p) => ({
    slug: p.categorySlug,
    subSlug: p.subcategorySlug,
  }));
}

export async function generateMetadata({
  params,
}: NestedCollectionPageProps): Promise<Metadata> {
  const { slug, subSlug } = await params;
  const data = getNestedCollectionData(slug, subSlug);

  if (!data) {
    return {
      title: "Koleksiyon Bulunamadı | Seç Halı",
      description: "Aradığınız kategori kombinasyonu bulunamadı.",
    };
  }

  const siteUrl = "https://sechali.com.tr";
  const canonicalUrl = `${siteUrl}/koleksiyonlar/${data.category.slug}/${data.subcategory.slug}`;

  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: data.metaTitle,
      description: data.metaDescription,
      url: canonicalUrl,
      type: "website",
      locale: "tr_TR",
      siteName: "Seç Halı",
      images: [
        {
          url: data.image,
          width: 800,
          height: 1200,
          alt: `${data.name} Modelleri`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: data.metaTitle,
      description: data.metaDescription,
      images: [data.image],
    },
  };
}

export default async function NestedCollectionPage({
  params,
}: NestedCollectionPageProps) {
  const { slug, subSlug } = await params;
  const data = getNestedCollectionData(slug, subSlug);

  if (!data) {
    notFound();
  }

  const { category, subcategory, rugs, faqs } = data;

  // Sibling subcategories inside this upper category (WRG Home style hierarchy tabs)
  const allSubcategoriesInCat = getAvailableSubcategoriesForCategory(category.slug);
  const totalCatRugs = getRugsForCollection(category).length;

  const hierarchyChips: HierarchyChip[] = [
    {
      label: `Tüm ${category.name} Modelleri`,
      slug: "all",
      count: totalCatRugs,
      href: `/koleksiyonlar/${category.slug}`,
      active: false,
    },
    ...allSubcategoriesInCat.map((item) => ({
      label: item.subcategory.name,
      slug: item.subcategory.slug,
      count: item.count,
      href: `/koleksiyonlar/${category.slug}/${item.subcategory.slug}`,
      active: item.subcategory.slug === subcategory.slug,
    })),
  ];

  // Other upper categories that also have this subcategory (e.g. Other rooms with Machine Washable rugs)
  const otherCategoriesWithSub = getAvailableCategoriesForSubcategory(subcategory.slug).filter(
    (item) => item.category.slug !== category.slug
  );

  // Structured Data
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Anasayfa",
        item: "https://sechali.com.tr",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Koleksiyonlar",
        item: "https://sechali.com.tr/koleksiyonlar",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: category.name,
        item: `https://sechali.com.tr/koleksiyonlar/${category.slug}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: `${subcategory.name} ${category.name}`,
        item: `https://sechali.com.tr/koleksiyonlar/${category.slug}/${subcategory.slug}`,
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: data.name,
    description: data.metaDescription,
    numberOfItems: rugs.length,
    itemListElement: rugs.map((rug, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: rug.name,
      url: `https://sechali.com.tr/halilar/${rug.slug}`,
      image: `https://sechali.com.tr${rug.image}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <div className="pb-16">
        {/* Hero Header */}
        <div className="border-b border-line bg-sand/35 py-10 sm:py-14">
          <Container>
            <Breadcrumb
              items={[
                { label: "Koleksiyonlar", href: "/koleksiyonlar" },
                { label: category.name, href: `/koleksiyonlar/${category.slug}` },
                { label: subcategory.name },
              ]}
            />

            <div className="mt-5 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
              {/* Left Column: Heading & SEO Copy */}
              <div className="space-y-4 lg:col-span-8">
                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    href={`/koleksiyonlar/${category.slug}`}
                    className="rounded-full bg-navy/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-navy hover:bg-navy/20 transition-colors"
                  >
                    {category.name}
                  </Link>
                  <span className="text-stone/40">•</span>
                  <Link
                    href={`/koleksiyonlar/${subcategory.slug}`}
                    className="rounded-full bg-terracotta/15 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-terracotta-deep hover:bg-terracotta/25 transition-colors"
                  >
                    {subcategory.name}
                  </Link>
                  <span className="text-stone/40">•</span>
                  <span className="text-xs font-medium text-stone">
                    {rugs.length} Model Listeleniyor
                  </span>
                </div>

                <h1 className="font-editorial text-3xl leading-[1.14] text-ink sm:text-4xl lg:text-[40px]">
                  {data.h1}
                </h1>

                <p className="max-w-3xl text-sm leading-relaxed text-stone-on-sand sm:text-base">
                  {data.intro}
                </p>

                {/* Key Benefits */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2 text-xs text-ink/80">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-navy" aria-hidden="true" />
                    <span>Ücretsiz Kargo</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-navy" aria-hidden="true" />
                    <span>14 Gün Kolay İade</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-navy" aria-hidden="true" />
                    <span>Yerli Dokuma Kalitesi</span>
                  </span>
                </div>
              </div>

              {/* Right Column: Hero Visual Badge */}
              <div className="lg:col-span-4">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-line bg-sand/60 shadow-[var(--shadow-soft)] sm:aspect-[16/10] lg:aspect-[4/3]">
                  <Image
                    src={data.image}
                    alt={`${data.name} görseli`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 360px"
                    className="object-cover"
                  />
                  <div
                    aria-hidden="true"
                    className="rug-weave-overlay pointer-events-none absolute inset-0 opacity-40"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-ivory">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-terracotta">
                      {category.name} Kürasyonu
                    </p>
                    <p className="font-editorial text-base sm:text-lg text-ivory">
                      {subcategory.name} Serisi
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Product Section with WRG Home Hierarchy Tabs */}
        <section className="py-12 sm:py-16">
          <Container className="space-y-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-terracotta-deep">
                  Özel Seçim
                </p>
                <h2 className="font-editorial text-2xl text-ink sm:text-3xl">
                  {category.name} — {subcategory.name} Modelleri
                </h2>
              </div>
              <p className="text-xs text-stone sm:text-sm">
                Farklı bir alt kategoriye geçebilir veya ölçüye göre filtreleyebilirsiniz.
              </p>
            </div>

            <CollectionProductList
              collection={category}
              rugs={rugs}
              hierarchyChips={hierarchyChips}
              hierarchyTitle={`${category.name} İçindeki Diğer Alt Kategoriler`}
              activeSubSlug={subcategory.slug}
            />
          </Container>
        </section>

        {/* Guide & Care Combined Box */}
        <section className="border-y border-line bg-sand/25 py-14 sm:py-16">
          <Container>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="rounded-xl border border-line bg-ivory p-6 shadow-2xs space-y-3">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sand/70 text-navy">
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <h3 className="font-editorial text-lg text-ink">
                    Öne Çıkan Özellikler
                  </h3>
                </div>
                <ul className="space-y-2 text-xs leading-relaxed text-stone">
                  {subcategory.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta-deep" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-line bg-ivory p-6 shadow-2xs space-y-3">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sand/70 text-navy">
                    <Ruler className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <h3 className="font-editorial text-lg text-ink">
                    Uyumlu Ölçüler
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {category.idealSizes.map((sz, i) => (
                    <span
                      key={i}
                      className="rounded-lg border border-line/75 bg-sand/40 px-2.5 py-1 text-xs font-medium text-ink"
                    >
                      {sz}
                    </span>
                  ))}
                </div>
                <p className="text-[11px] leading-relaxed text-stone">
                  Mekanınıza en uygun ölçüyü netleştirmek için{" "}
                  <Link
                    href="/secme-rehberi"
                    className="font-semibold text-navy hover:underline"
                  >
                    Seçme Rehberi
                  </Link>
                  &apos;mize göz atın.
                </p>
              </div>

              <div className="rounded-xl border border-line bg-ivory p-6 shadow-2xs space-y-3">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sand/70 text-navy">
                    <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <h3 className="font-editorial text-lg text-ink">
                    Temizlik ve Kullanım
                  </h3>
                </div>
                <ul className="space-y-2 text-xs leading-relaxed text-stone">
                  {subcategory.careTips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-navy" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </section>

        {/* SEO FAQ Section */}
        {faqs.length > 0 && (
          <section className="py-14 sm:py-16">
            <Container className="max-w-3xl space-y-8">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-sand/60 px-3 py-1 text-xs font-semibold text-navy">
                  <HelpCircle className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Sıkça Sorulan Sorular</span>
                </div>
                <h2 className="font-editorial text-2xl text-ink sm:text-3xl">
                  {data.name} Hakkında Merak Edilenler
                </h2>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, i) => (
                  <details
                    key={i}
                    className="group rounded-xl border border-line bg-ivory-soft p-4 transition-colors open:bg-sand/30 sm:p-5"
                  >
                    <summary className="flex cursor-pointer items-center justify-between gap-3 text-sm font-semibold text-ink sm:text-base">
                      <span>{faq.question}</span>
                      <ChevronDown
                        className="h-4 w-4 shrink-0 text-stone transition-transform duration-300 group-open:rotate-180"
                        aria-hidden="true"
                      />
                    </summary>
                    <p className="mt-3 text-xs leading-relaxed text-stone sm:text-sm">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* Cross-linking: Other rooms with this subcategory */}
        {otherCategoriesWithSub.length > 0 && (
          <section className="border-t border-line bg-sand/20 py-14 sm:py-16">
            <Container className="space-y-8">
              <SectionHeading
                eyebrow="Tüm Yaşam Alanlarında"
                title={`Diğer Odalarda ${subcategory.name}`}
                subtitle={`${subcategory.name} özelliğine sahip diğer ana koleksiyonlarımızı keşfedin.`}
                actionLabel={`Tüm ${subcategory.name}`}
                actionHref={`/koleksiyonlar/${subcategory.slug}`}
              />

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">
                {otherCategoriesWithSub.map((item) => (
                  <Link
                    key={item.category.slug}
                    href={`/koleksiyonlar/${item.category.slug}/${subcategory.slug}`}
                    className="group relative flex flex-col justify-between overflow-hidden rounded-[14px] border border-line bg-ivory p-4 transition-all duration-300 hover:-translate-y-1 hover:border-navy/40 hover:shadow-md"
                  >
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-terracotta-deep">
                        {subcategory.name}
                      </span>
                      <h3 className="mt-1 font-editorial text-base text-ink group-hover:text-navy sm:text-lg">
                        {item.category.name}
                      </h3>
                      <p className="mt-1 text-xs text-stone">
                        {item.count} model mevcut
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-line/60 pt-2">
                      <span className="text-xs font-semibold text-navy group-hover:underline">
                        İncele
                      </span>
                      <ArrowRight
                        className="h-3.5 w-3.5 text-navy transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* Global Catalog CTA */}
        <section className="py-12 sm:py-14">
          <Container>
            <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-line bg-navy p-8 text-center text-ivory sm:p-10 lg:flex-row lg:text-left">
              <div className="max-w-xl space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">
                  Filtreli Halı Kataloğu
                </p>
                <h2 className="font-editorial text-2xl text-ivory sm:text-3xl">
                  {category.name} için tüm renk ve modeller
                </h2>
                <p className="text-xs sm:text-sm text-ivory/80">
                  Geniş kataloğumuzda renk, doku, hav yüksekliği ve fiyat aralığı filtreleriyle arama yapın.
                </p>
              </div>
              <Button
                href={`/halilar?kategori=${encodeURIComponent(category.targetName)}&altKategori=${encodeURIComponent(subcategory.targetName)}`}
                variant="ivory"
                size="lg"
              >
                Katalogda Filtrele
              </Button>
            </div>
          </Container>
        </section>

        <TrustBar />
      </div>
    </>
  );
}
