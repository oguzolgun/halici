import type { Metadata } from "next";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PriceTag } from "@/components/ui/PriceTag";
import { ProductCard } from "@/components/ui/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCardSkeleton } from "@/components/ui/Skeleton";
import { TrustBar } from "@/components/ui/TrustBar";
import { getAllRugs } from "@/lib/products";

export const metadata: Metadata = {
  title: "Tasarım Sistemi",
  description:
    "Seç Halı renk paleti, tipografi, boşluk, gölge ve bileşen tasarım sistemi.",
  alternates: { canonical: "/design" },
};

const COLOR_TOKENS = [
  { name: "Marka Laciverti", varName: "--navy", hex: "#1C335C", role: "Ana CTA, logo, başlık vurgusu (Logodan pipetlendi)" },
  { name: "Metin Mürekkep", varName: "--ink", hex: "#14213A", role: "Ana metin, başlıklar (14.75:1 kontrast)" },
  { name: "Sayfa Zemini (Fildişi)", varName: "--ivory", hex: "#F8F5EF", role: "Sayfa arka planı" },
  { name: "Kum Yüzey", varName: "--sand", hex: "#E9DFD0", role: "İkincil yüzeyler, TrustBar, kart zeminleri" },
  { name: "Terracotta Vurgu", varName: "--terracotta", hex: "#C2603E", role: "İkonlar, çerçeveler, küçük vurgular" },
  { name: "Terracotta (AA Metin)", varName: "--terracotta-deep", hex: "#A04526", role: "Küçük metin ve rozetler (5.72:1 AA kontrast)" },
  { name: "Taş Gri (İkincil Metin)", varName: "--stone", hex: "#6B6F7A", role: "Açıklamalar ve etiketler (4.62:1)" },
  { name: "Çizgi / Ayraç", varName: "--line", hex: "#E4DDD0", role: "İnce kenarlıklar ve ayırıcılar" },
];

export default function DesignSystemPage() {
  const sampleRugs = getAllRugs().slice(0, 3);

  return (
    <div className="pb-20">
      <div className="border-b border-line bg-sand/35 py-12 sm:py-16">
        <Container>
          <Breadcrumb items={[{ label: "Tasarım Sistemi" }]} />
          <div className="mt-6 max-w-3xl">
            <Badge variant="terracotta">Tasarım Sistemi v1.0</Badge>
            <h1 className="mt-4 font-editorial text-4xl text-ink sm:text-5xl">
              Seç Halı Editoryal Tasarım Dili
            </h1>
            <p className="mt-4 text-base leading-relaxed text-stone-on-sand">
              Sakin, güven veren ve zamansız ev tekstili estetiği. Logonun geometrik sans kontrastını Fraunces serif başlıklarla dengeleyen, sıcak fildişi ve kum tonları üzerine kurulu bileşen kütüphanesi.
            </p>
          </div>
        </Container>
      </div>

      {/* Brand Marks */}
      <section className="py-14">
        <Container className="space-y-8">
          <SectionHeading
            eyebrow="01 • Marka Kimliği"
            title="Logo & Sadeleştirilmiş Favicon"
            subtitle="PNG zeminden arındırılmış şeffaf vektör SVG ve 32 px okunabilirlik için tek kalın geometrili favicon sembolü."
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="flex flex-col justify-between rounded-[14px] border border-line bg-ivory-soft p-6 shadow-[var(--shadow-soft)]">
              <p className="text-xs font-semibold uppercase tracking-wider text-stone">
                Ana Logo (Şeffaf SVG — Fildişi Zemin)
              </p>
              <div className="my-8 flex items-center justify-center rounded-xl border border-dashed border-line bg-ivory p-6">
                <Image
                  src="/brand/sec-hali-logo.svg"
                  alt="seç halı ana logo"
                  width={220}
                  height={68}
                />
              </div>
              <p className="text-xs text-stone">
                `/public/brand/sec-hali-logo.svg` • #1C335C
              </p>
            </div>

            <div className="flex flex-col justify-between rounded-[14px] border border-line bg-navy p-6 text-ivory shadow-[var(--shadow-soft)]">
              <p className="text-xs font-semibold uppercase tracking-wider text-ivory/75">
                Koyu Zemin Varyantı
              </p>
              <div className="my-8 flex items-center justify-center rounded-xl border border-dashed border-ivory/25 p-6">
                <Image
                  src="/brand/sec-hali-logo-ivory.svg"
                  alt="seç halı fildişi logo"
                  width={220}
                  height={68}
                />
              </div>
              <p className="text-xs text-ivory/75">
                `/public/brand/sec-hali-logo-ivory.svg` • #F8F5EF
              </p>
            </div>

            <div className="flex flex-col justify-between rounded-[14px] border border-line bg-ivory-soft p-6 shadow-[var(--shadow-soft)]">
              <p className="text-xs font-semibold uppercase tracking-wider text-stone">
                Favicon (16px / 32px / 64px)
              </p>
              <div className="my-8 flex items-center justify-center gap-6">
                <Image src="/brand/favicon.svg" alt="64px" width={64} height={64} />
                <Image src="/brand/favicon.svg" alt="32px" width={32} height={32} />
                <Image src="/brand/favicon.svg" alt="16px" width={16} height={16} />
              </div>
              <p className="text-xs text-stone">
                Dış sekizgen çerçeve + merkez eşkenar dörtgen
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Color Tokens */}
      <section className="border-t border-line py-14">
        <Container className="space-y-8">
          <SectionHeading
            eyebrow="02 • Renk Tokenları"
            title="Palet ve Erişilebilirlik Kontrastı"
            subtitle="Tüm metin kombinasyonları WCAG AA (≥ 4.5:1) kontrast standardını karşılar."
          />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {COLOR_TOKENS.map((token) => (
              <div
                key={token.varName}
                className="overflow-hidden rounded-[14px] border border-line bg-ivory-soft shadow-[var(--shadow-soft)]"
              >
                <div
                  className="h-24 w-full border-b border-line"
                  style={{ backgroundColor: token.hex }}
                />
                <div className="p-4">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-semibold text-ink">
                      {token.name}
                    </h3>
                    <code className="rounded bg-sand/70 px-1.5 py-0.5 text-xs font-medium text-navy">
                      {token.hex}
                    </code>
                  </div>
                  <p className="mt-1 text-xs font-mono text-stone">
                    var({token.varName})
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-stone">
                    {token.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Typography */}
      <section className="border-t border-line py-14">
        <Container className="space-y-8">
          <SectionHeading
            eyebrow="03 • Tipografi & Hareket"
            title="Fraunces 600 & Plus Jakarta Sans"
            subtitle="Başlıklarda sıkı harf aralıklı serif zarafeti; arayüzde yüksek okunabilirlik sunan modern sans."
          />

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="rounded-[14px] border border-line bg-ivory-soft p-8 space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-terracotta-deep">
                Fraunces 600 • Başlık Ölçeği
              </p>
              <p className="font-editorial text-5xl text-ink">
                Evinize yakışan halıyı seçin.
              </p>
              <p className="font-editorial text-3xl text-ink">
                Anadolu dokuma mirası, modern yaşam alanları.
              </p>
              <p className="font-editorial text-xl text-ink">
                Kart ve ürün başlıkları (1.25rem / 600)
              </p>
            </div>

            <div className="rounded-[14px] border border-line bg-ivory-soft p-8 space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-terracotta-deep">
                Plus Jakarta Sans • Arayüz & Hareket Tokenları
              </p>
              <p className="text-base leading-relaxed text-ink">
                Gövde metni 16px boyutunda, 1.6 satır yüksekliğinde okunur. Türkçe karakterler (ç, ğ, ı, İ, ö, ş, ü) için latin-ext alt kümesi etkinleştirilmiştir.
              </p>
              <p className="text-sm text-stone">
                İkincil bilgi metni (Stone #6B6F7A) ve ölçü açıklamaları.
              </p>
              <div className="rounded-xl border border-line bg-sand/40 p-4 text-xs font-mono text-ink space-y-1">
                <p>Radius Kart: 14px • Radius Pill: 999px</p>
                <p>Easing: cubic-bezier(0.22, 1, 0.36, 1) • 300–550ms</p>
                <p>Container Max Width: 1320px</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Buttons, Badges & PriceTag */}
      <section className="border-t border-line py-14">
        <Container className="space-y-8">
          <SectionHeading
            eyebrow="04 • Etkileşim Bileşenleri"
            title="Butonlar, Rozetler, Fiyat Etiketi ve İskeletler"
          />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-[14px] border border-line bg-ivory-soft p-6 space-y-6">
              <div>
                <h3 className="mb-3 text-sm font-semibold text-ink">Butonlar</h3>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="primary">Halıyı İncele</Button>
                  <Button variant="secondary">Ölçü Rehberi</Button>
                  <Button variant="ghost">Hızlı Bak</Button>
                  <Button variant="ivory">Fildişi Buton</Button>
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-sm font-semibold text-ink">Rozetler</h3>
                <div className="flex flex-wrap items-center gap-2.5">
                  <Badge variant="terracotta">Çok Satan</Badge>
                  <Badge variant="navy">Yeni Sezon</Badge>
                  <Badge variant="sand">Yerli Üretim</Badge>
                  <Badge variant="ivory">%100 Doğal Yün</Badge>
                  <Badge variant="outline">Sınırlı Stok</Badge>
                </div>
              </div>
            </div>

            <div className="rounded-[14px] border border-line bg-ivory-soft p-6 space-y-6">
              <div>
                <h3 className="mb-3 text-sm font-semibold text-ink">
                  PriceTag (tr-TR / TRY)
                </h3>
                <div className="flex flex-wrap items-start gap-8">
                  <PriceTag amount={4650} fromPrefix size="md" />
                  <PriceTag amount={8490} showInstallment size="lg" />
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-sm font-semibold text-ink">Breadcrumb</h3>
                <Breadcrumb
                  items={[
                    { label: "Halılar", href: "/halilar" },
                    { label: "Modern", href: "/halilar?kategori=Modern" },
                    { label: "Mira Mimari Kabartma" },
                  ]}
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* TrustBar */}
      <section className="py-6">
        <Container className="mb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-terracotta-deep">
            05 • Güven Bandı (TrustBar)
          </p>
        </Container>
        <TrustBar />
      </section>

      {/* Product Cards + Skeleton */}
      <section className="py-14">
        <Container className="space-y-8">
          <SectionHeading
            eyebrow="06 • Ürün Kartları"
            title="ProductCard & Yükleme İskeleti"
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {sampleRugs.map((rug) => (
              <ProductCard key={rug.id} rug={rug} />
            ))}
            <ProductCardSkeleton />
          </div>
        </Container>
      </section>
    </div>
  );
}
