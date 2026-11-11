import type { Metadata } from "next";
import Image from "next/image";
import { Award, Compass, HeartHandshake, Sparkles } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { TrustBar } from "@/components/ui/TrustBar";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "Seç Halı'nın Anadolu dokuma mirasını modern yaşam alanlarıyla buluşturan marka hikayesi, üretim ortaklıkları ve kalite yaklaşımı.",
  alternates: { canonical: "/hakkimizda" },
};

const PILLARS = [
  {
    icon: Award,
    title: "Yerli Dokuma Mirası",
    text: "Gaziantep, Uşak ve Denizli'deki köklü tezgahlarla doğrudan çalışıyor; her koleksiyonu uzun yıllar formunu koruyacak iplik yoğunluğunda üretiyoruz.",
  },
  {
    icon: Compass,
    title: "Küratörlü Seçki",
    text: "Binlerce karmaşık desen yerine gerçek evlerin ışık, parke ve mobilya dengesine uyum sağlayan, küratörlü ve yalın bir koleksiyon sunuyoruz.",
  },
  {
    icon: HeartHandshake,
    title: "Şeffaf Deneyim",
    text: "İplik türü, hav yüksekliği ve ölçü önerilerini açıkça paylaşıyor; 14 gün evde deneme ve kolay iade hakkıyla sürprizlere yer bırakmıyoruz.",
  },
  {
    icon: Sparkles,
    title: "Aile Sağlığına Duyarlı",
    text: "Özellikle çocuk odası ve doğal serilerimizde OEKO-TEX Standart 100 sertifikalı, koku yapmayan, toz tutmayan organik iplikler kullanıyoruz.",
  },
];

export default function AboutPage() {
  return (
    <div className="pb-16">
      <div className="border-b border-line bg-sand/35 py-10 sm:py-14">
        <Container>
          <Breadcrumb items={[{ label: "Hakkımızda" }]} />
          <div className="mt-5 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta-deep">
              Hikayemiz & Yaklaşımımız
            </p>
            <h1 className="mt-2 font-editorial text-4xl text-ink sm:text-5xl">
              Doğru halıyı, sakin bir güvenle seçmeniz için yola çıktık.
            </h1>
            <p className="mt-4 text-base leading-relaxed text-stone-on-sand">
              Seç Halı, Anadolu’nun zanaat kültürünü çağdaş evlerin sade estetiğiyle buluşturmak amacıyla kurulan yeni nesil bir halı markasıdır.
            </p>
          </div>
        </Container>
      </div>

      {/* Editorial Story Grid */}
      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6 space-y-5">
              <h2 className="font-editorial text-3xl text-ink sm:text-4xl">
                Halıcının askı rafındaki samimiyet, dijital vitrinde.
              </h2>
              <p className="text-base leading-relaxed text-ink/85">
                Fiziksel bir halıcıya girdiğinizde askıdaki halıları tek tek kenara çekip ışığa tutar, dokusuna parmak uçlarınızla dokunursunuz. Ana sayfamızdaki Sürgülü Halı Rafı deneyimini tam da bu doğal inceleme hissini yaşatmak için tasarladık.
              </p>
              <p className="text-base leading-relaxed text-stone">
                Her aile için doğru halı farklıdır: küçük çocuklu evler için kolay silinebilen ve antialerjik pamuklu yüzeyler, kalabalık yemek masaları için sandalye dostu ince dokumalar, sakin yatak odaları içinse yumuşacık yüksek havlı yün seriler öneriyoruz.
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <Button href="/halilar" variant="primary">
                  Koleksiyonları Keşfet
                </Button>
                <Button href="/iletisim" variant="secondary">
                  Showroom&apos;u Ziyaret Et
                </Button>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="relative aspect-[2/3] overflow-hidden rounded-[14px] border border-line shadow-[var(--shadow-soft)]">
                <Image
                  src="/rugs/rug-05.jpg"
                  alt="Anadolu kilim dokuma detayı"
                  fill
                  priority
                  fetchPriority="high"
                  quality={60}
                  sizes="(max-width: 1024px) 180px, 300px"
                  className="object-cover"
                />
              </div>
              <div className="relative mt-8 aspect-[2/3] overflow-hidden rounded-[14px] border border-line shadow-[var(--shadow-soft)]">
                <Image
                  src="/rugs/rug-01.jpg"
                  alt="Modern mimari kabartma dokuma"
                  fill
                  quality={60}
                  sizes="(max-width: 1024px) 180px, 300px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Four Pillars */}
      <section className="border-t border-line bg-sand/30 py-14 sm:py-18">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="rounded-[14px] border border-line bg-ivory-soft p-6 shadow-[var(--shadow-soft)]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sand/80 text-navy">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 font-editorial text-xl text-ink">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone">
                    {pillar.text}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <TrustBar />
    </div>
  );
}
