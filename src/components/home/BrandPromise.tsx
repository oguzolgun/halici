import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";

const PROMISE_POINTS = [
  "Seçkin yerli üreticilerden doğrudan temin — aracı maliyeti olmadan adil fiyat.",
  "Her üründe açık malzeme, hav yüksekliği ve dokuma bilgisi.",
  "Ev ışığınızda 14 gün deneyin; içinize sinmezse ücretsiz kargoyla iade edin.",
];

export function BrandPromise() {
  return (
    <section className="border-y border-line bg-sand/45 py-16 sm:py-24">
      <Container>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="relative lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[14px] border border-line shadow-[var(--shadow-elevated)]">
              <Image
                src="/rugs/rug-05.jpg"
                alt="Anadolu dokuma zanaati Seç Halı"
                fill
                quality={55}
                sizes="(max-width: 1024px) 300px, 540px"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="rug-weave-overlay pointer-events-none absolute inset-0 opacity-35"
              />
            </div>

            <div className="mt-4 rounded-[14px] border border-line bg-ivory p-4 shadow-[var(--shadow-soft)] sm:absolute sm:-bottom-6 sm:-right-6 sm:mt-0 sm:max-w-[260px]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-terracotta-deep">
                Zanaat & Kalite
              </p>
              <p className="mt-1 font-editorial text-lg text-ink">
                Gaziantep, Uşak ve Denizli tezgahlarından doğrudan evinize.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta-deep">
              Marka Sözümüz
            </p>
            <h2 className="font-editorial text-3xl leading-[1.15] text-ink sm:text-4xl lg:text-[42px]">
              Seç halı: doğru halıyı güvenle seçin.
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-stone-on-sand">
              Halı alışverişi çoğu zaman karmaşık fiyat etiketleri ve belirsiz görseller arasında yorucu bir sürece dönüşür. Seç Halı olarak bu süreci sadeleştiriyoruz: yalnızca yaşam alanlarında gerçekten iyi duran, bakımı kolay ve dokusu uzun ömürlü tasarımları bir araya getiriyoruz.
            </p>

            <ul className="space-y-3 pt-1">
              {PROMISE_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm text-ink">
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-navy"
                    aria-hidden="true"
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button href="/hakkimizda" variant="primary">
                Hikayemizi Keşfedin
              </Button>
              <Button href="/halilar" variant="secondary">
                Koleksiyona Göz Atın
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
