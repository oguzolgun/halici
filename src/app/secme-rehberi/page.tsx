import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TrustBar } from "@/components/ui/TrustBar";

export const metadata: Metadata = {
  title: "Halı Seçme Rehberi | Seç Halı",
  description:
    "Evinizin metrekaresine, mobilya yerleşimine, odanın ışık tonuna ve kullanım alışkanlıklarınıza göre doğru halıyı seçmeniz için uzman rehberi.",
  alternates: { canonical: "/secme-rehberi" },
};

const ROOM_GUIDES = [
  {
    room: "Salon & Oturma Odası",
    title: "Geniş Alanlar İçin Mimari Uyum",
    recommendation: "160x230 cm veya 200x290 cm",
    tip: "Koltukların ön ayaklarının halının üzerine 15–20 cm basması mekana bütünlük kazandırır.",
    material: "Yün, pamuk veya kabartma dokulu eskitme seriler.",
    href: "/koleksiyonlar/salon-halisi",
  },
  {
    room: "Mutfak",
    title: "Pratiklik ve Kolay Temizlik",
    recommendation: "80x150 cm, 100x200 cm veya Kesme Rulo",
    tip: "Yemek dökülmelerine karşı silinebilir, leke tutmayan ve kaymaz tabanlı modeller tercih edilmelidir.",
    material: "Düz dokuma, silinebilir jüt veya yıkanabilir şönil.",
    href: "/koleksiyonlar/mutfak-halisi",
  },
  {
    room: "Banyo & Islak Hacimler",
    title: "Yüksek Emicilik & Kaymaz Güvenlik",
    recommendation: "Banyo Paspası & Takımı Setleri",
    tip: "Fayans üzerinde kaymayan jel/lateks taban ve hızlı kuruyan hav yapısı hayati önem taşır.",
    material: "Mikrofiber, organik pamuk, makinede yıkanabilir taban.",
    href: "/koleksiyonlar/banyo-paspasi",
  },
  {
    room: "Yatak Odası",
    title: "Huzurlu ve Yumuşak Zemin",
    recommendation: "Yatak kenarlarına 80x150 cm veya ayak ucuna 120x180 cm",
    tip: "Sabah yataktan kalktığınızda ayağınızın sıcak bir dokuya basması güne huzurlu başlamanızı sağlar.",
    material: "Yüksek havlı yumuşak dokuma veya doğal yün.",
    href: "/koleksiyonlar/yatak-odasi-halisi",
  },
  {
    room: "Çocuk Odası",
    title: "Antialerjik & Güvenli Zemin",
    recommendation: "120x180 cm veya 160x230 cm",
    tip: "Toz tutmayan, hav dökmeyen OEKO-TEX sertifikalı yıkanabilir ürünler çocuk sağlığı için idealdir.",
    material: "Organik pamuk, antialerjik yüzey, kaymaz taban.",
    href: "/koleksiyonlar/cocuk-halisi",
  },
  {
    room: "Koridor & Antre",
    title: "Uzun Ömürlü Dayanıklı Geçiş",
    recommendation: "80x150 cm veya 80x300 cm (Yolluk)",
    tip: "Kapı altlarının sürtünmemesi için hav yüksekliği 7–10 mm aralığında tutulmalıdır.",
    material: "Sıkı dokunmuş yolluk, kilim veya kesme rulo halı.",
    href: "/koleksiyonlar/yolluk",
  },
];

const STANDARD_SIZES = [
  { size: "80x150 cm", idealFor: "Antre, yatak kenarları ve küçük balkonlar", link: "/halilar?olcu=80x150" },
  { size: "80x300 cm", idealFor: "Uzun koridorlar ve antreler (Yolluk)", link: "/halilar?olcu=80x300" },
  { size: "100x200 cm", idealFor: "Mutfak tezgah önü ve ferah holler", link: "/halilar?olcu=100x200" },
  { size: "100x300 cm", idealFor: "Geniş koridorlar ve uzun antreler", link: "/halilar?olcu=100x300" },
  { size: "120x180 cm", idealFor: "Küçük oturma odaları, çalışma odaları", link: "/halilar?olcu=120x180" },
  { size: "160x230 cm", idealFor: "Standart salonlar, 3'lü koltuk önü (En popüler)", link: "/halilar?olcu=160x230" },
  { size: "200x290 cm", idealFor: "Geniş salonlar, köşe koltuklar ve yemek masaları", link: "/halilar?olcu=200x290" },
];

export default function GuidePage() {
  return (
    <div className="pb-16">
      {/* Page Header */}
      <div className="border-b border-line bg-sand/35 py-10 sm:py-14">
        <Container>
          <Breadcrumb items={[{ label: "Halı Seçme Rehberi" }]} />
          <div className="mt-5 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta-deep">
              Uzman Rehberi
            </p>
            <h1 className="mt-2 font-editorial text-3xl text-ink sm:text-4xl lg:text-5xl">
              Doğru Halıyı Güvenle Seçme Rehberi
            </h1>
            <p className="mt-3.5 text-base leading-relaxed text-stone-on-sand">
              Evinizin metrekaresine, mobilya yerleşimine, odanın ışık tonuna ve
              günlük yaşam temposuna en uygun halıyı bulmanız için adım adım tavsiyeler.
            </p>
          </div>
        </Container>
      </div>

      {/* Step 1: Odaya & Alana Göre Seçim */}
      <section className="py-16 sm:py-20">
        <Container className="space-y-10">
          <SectionHeading
            eyebrow="Alan & Fonksiyon"
            title="Her Odanın İhtiyacı Farklıdır"
            subtitle="Salonun şıklığından mutfağın pratikliğine, hangi odaya hangi dokunun uygun olduğunu keşfedin."
            actionLabel="Tüm odaları incele"
            actionHref="/halilar"
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ROOM_GUIDES.map((item) => (
              <div
                key={item.room}
                className="flex flex-col justify-between rounded-[14px] border border-line bg-ivory-soft p-6 transition-all duration-300 hover:shadow-md"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-terracotta-deep">
                      {item.room}
                    </span>
                  </div>
                  <h3 className="font-editorial text-xl text-ink">{item.title}</h3>
                  <div className="space-y-2 text-xs leading-relaxed text-stone">
                    <p>
                      <strong className="font-semibold text-ink">Önerilen Ölçü:</strong>{" "}
                      {item.recommendation}
                    </p>
                    <p>
                      <strong className="font-semibold text-ink">Uzman İpucu:</strong>{" "}
                      {item.tip}
                    </p>
                    <p>
                      <strong className="font-semibold text-ink">Uygun Doku:</strong>{" "}
                      {item.material}
                    </p>
                  </div>
                </div>

                <div className="mt-6 border-t border-line/60 pt-4">
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy hover:text-terracotta-deep"
                  >
                    <span>{item.room} Modellerini Gör</span>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Step 2: Ölçü ve Yerleşim Tablosu */}
      <section className="border-t border-line bg-sand/30 py-16 sm:py-20">
        <Container className="space-y-10">
          <SectionHeading
            eyebrow="Ölçü & Orantı"
            title="Standart Ebatlar ile Mobilya Uyumu"
            subtitle="Küçük halı odayı daraltır, doğru ölçü mekanı ferahlatır. Hangi ölçü nerede kullanılmalı?"
          />

          <div className="overflow-hidden rounded-2xl border border-line bg-ivory shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-line bg-sand/50 text-[11px] font-semibold uppercase tracking-wider text-navy">
                    <th className="p-4 sm:px-6">Standart Ölçü</th>
                    <th className="p-4 sm:px-6">İdeal Kullanım Alanı</th>
                    <th className="p-4 sm:px-6 text-right">Modeller</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line/60 text-xs sm:text-sm text-ink/90">
                  {STANDARD_SIZES.map((sz) => (
                    <tr key={sz.size} className="hover:bg-sand/20 transition-colors">
                      <td className="p-4 sm:px-6 font-semibold text-navy whitespace-nowrap">
                        {sz.size}
                      </td>
                      <td className="p-4 sm:px-6 text-stone">{sz.idealFor}</td>
                      <td className="p-4 sm:px-6 text-right whitespace-nowrap">
                        <Link
                          href={sz.link}
                          className="inline-flex items-center gap-1 font-semibold text-navy hover:text-terracotta-deep hover:underline"
                        >
                          <span>İncele</span>
                          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </section>

      {/* Step 3: Özellik ve Malzeme */}
      <section className="py-16 sm:py-20">
        <Container className="space-y-10">
          <SectionHeading
            eyebrow="Malzeme & Özellikler"
            title="İhtiyacınıza Uygun Zemin Teknolojisi"
            subtitle="Yıkanabilirlik, kaymaz taban veya doğal iplikler: Hangisi sizin için doğru?"
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-[14px] border border-line bg-ivory-soft p-5 space-y-2.5">
              <h3 className="font-editorial text-lg text-ink">Kaymaz Taban</h3>
              <p className="text-xs text-stone leading-relaxed">
                Fayans, granit ve laminat parkelerde halının toplanmasını ve kaymasını engeller. Özellikle banyo ve koridorlarda güvenlik sağlar.
              </p>
              <Link href="/koleksiyonlar/kaymaz-taban" className="inline-block pt-1 text-xs font-semibold text-navy hover:underline">
                Kaymaz Halıları Gör →
              </Link>
            </div>

            <div className="rounded-[14px] border border-line bg-ivory-soft p-5 space-y-2.5">
              <h3 className="font-editorial text-lg text-ink">Makinede Yıkanabilir</h3>
              <p className="text-xs text-stone leading-relaxed">
                Evcil hayvanlı ve çocuklu aileler için 30 derecede kolayca makinede yıkanabilen, hijyenik ve pratik temizlik avantajı.
              </p>
              <Link href="/koleksiyonlar/makinede-yikanabilir" className="inline-block pt-1 text-xs font-semibold text-navy hover:underline">
                Yıkanabilir Modeller →
              </Link>
            </div>

            <div className="rounded-[14px] border border-line bg-ivory-soft p-5 space-y-2.5">
              <h3 className="font-editorial text-lg text-ink">Sisal & Jüt Halılar</h3>
              <p className="text-xs text-stone leading-relaxed">
                Doğal bitkisel liflerden dokunur. Statik elektrik üretmez, tozu içine hapsetmez ve bohem/doğal bir zemin sıcaklığı verir.
              </p>
              <Link href="/koleksiyonlar/sisal-hali" className="inline-block pt-1 text-xs font-semibold text-navy hover:underline">
                Jüt & Sisal Halılar →
              </Link>
            </div>

            <div className="rounded-[14px] border border-line bg-ivory-soft p-5 space-y-2.5">
              <h3 className="font-editorial text-lg text-ink">Vintage & Eskitme</h3>
              <p className="text-xs text-stone leading-relaxed">
                Geleneksel Türk motiflerinin modern soluk renklerle yeniden yorumlanması. Klasik ile çağdaş mobilyaları mükemmel dengeler.
              </p>
              <Link href="/koleksiyonlar/vintage-hali" className="inline-block pt-1 text-xs font-semibold text-navy hover:underline">
                Vintage Koleksiyonu →
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Catalog CTA */}
      <section className="py-14 sm:py-16">
        <Container>
          <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-line bg-sand/60 p-8 text-center sm:p-12 lg:flex-row lg:text-left">
            <div className="max-w-xl space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta-deep">
                Kataloğu Keşfedin
              </p>
              <h2 className="font-editorial text-2xl text-ink sm:text-3xl">
                Aradığınız halıyı filtrelerle hemen bulun.
              </h2>
              <p className="text-sm text-stone">
                Oda, ölçü, renk, stil ve malzeme filtrelerini kullanarak evinize yakışan halıyı güvenle seçin.
              </p>
            </div>
            <Button href="/halilar" variant="primary" size="lg">
              Tüm Halıları Filtrele
            </Button>
          </div>
        </Container>
      </section>

      <TrustBar />
    </div>
  );
}
