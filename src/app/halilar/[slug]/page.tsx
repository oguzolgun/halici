import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailClient } from "@/components/catalog/ProductDetailClient";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/ui/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAllRugs, getRelatedRugs, getRugBySlug } from "@/lib/products";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllRugs().map((rug) => ({ slug: rug.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const rug = getRugBySlug(slug);
  if (!rug) {
    return { title: "Halı Bulunamadı" };
  }

  return {
    title: `${rug.name} — ${rug.collection}`,
    description: rug.shortDescription,
    alternates: { canonical: `/halilar/${rug.slug}` },
    openGraph: {
      title: `${rug.name} | Seç Halı`,
      description: rug.shortDescription,
      images: [{ url: rug.image, width: 800, height: 1200, alt: rug.name }],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const rug = getRugBySlug(slug);

  if (!rug) {
    notFound();
  }

  const related = getRelatedRugs(rug, 4);
  const prices = rug.sizeOptions.map((s) => s.price);
  const lowPrice = Math.min(...prices);
  const highPrice = Math.max(...prices);
  const hasStock = rug.sizeOptions.some((s) => s.stock > 0);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: rug.name,
    image: `https://sechali.com.tr${rug.image}`,
    description: rug.description,
    sku: rug.id,
    brand: {
      "@type": "Brand",
      name: "Seç Halı",
    },
    material: rug.material,
    color: rug.colorName,
    offers: {
      "@type": "AggregateOffer",
      url: `https://sechali.com.tr/halilar/${rug.slug}`,
      priceCurrency: "TRY",
      lowPrice,
      highPrice,
      offerCount: rug.sizeOptions.length,
      availability: hasStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: rug.rating,
      reviewCount: rug.reviewCount,
    },
  };

  return (
    <div className="pb-20 pt-8 sm:pt-10">
      <Container className="space-y-12">
        <Breadcrumb
          items={[
            { label: "Halılar", href: "/halilar" },
            {
              label: rug.category,
              href: `/halilar?kategori=${encodeURIComponent(rug.category)}`,
            },
            { label: rug.name },
          ]}
        />

        <ProductDetailClient rug={rug} />

        {/* Related Products */}
        <section className="border-t border-line pt-14 space-y-8">
          <SectionHeading
            eyebrow="Tamamlayıcı Seçimler"
            title="Benzer Dokular ve Koleksiyonlar"
            actionLabel="Tümünü Gör"
            actionHref="/halilar"
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item.id} rug={item} />
            ))}
          </div>
        </section>
      </Container>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
    </div>
  );
}
