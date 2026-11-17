import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Compass, Palette, Ruler, Sofa } from "lucide-react";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";

const GUIDE_CARDS = [
  {
    key: "oda",
    icon: Sofa,
    eyebrow: "01 • Alana Göre",
    title: "Yaşam alanınızın temposuna uygun doku",
    description:
      "Salon, mutfak, banyo, yatak odası veya koridor kullanımına göre ideal halıyı belirleyin.",
    image: "/rugs/rug-01.jpg",
    links: [
      { label: "Salon Halısı", href: "/halilar?kategori=Salon+hal%C4%B1s%C4%B1" },
      { label: "Mutfak Halısı", href: "/halilar?kategori=Mutfak+hal%C4%B1s%C4%B1" },
      { label: "Banyo Paspası", href: "/halilar?kategori=Banyo+paspas%C4%B1" },
      { label: "Yolluk", href: "/halilar?kategori=Yolluk" },
    ],
    primaryHref: "/halilar?kategori=Salon+hal%C4%B1s%C4%B1",
  },
  {
    key: "olcu",
    icon: Ruler,
    eyebrow: "02 • Ölçüye Göre",
    title: "Mobilyalarla orantılı doğru boyut",
    description:
      "80x150'den 200x290'a 7 standart ebatımızla mobilyalarınıza ve odanıza tam oturan ölçüyü seçin.",
    image: "/rugs/rug-12.jpg",
    links: [
      { label: "80x150 cm", href: "/halilar?olcu=80x150" },
      { label: "80x300 Yolluk", href: "/halilar?olcu=80x300" },
      { label: "160x230 cm", href: "/halilar?olcu=160x230" },
      { label: "200x290 cm", href: "/halilar?olcu=200x290" },
    ],
    primaryHref: "/halilar?olcu=160x230",
  },
  {
    key: "stil",
    icon: Compass,
    eyebrow: "03 • Özelliğe Göre",
    title: "İhtiyacınıza uygun pratik zemin çözümleri",
    description:
      "Makinede yıkanabilir, kaymaz tabanlı, kesme veya otantik vintage serilerimizi keşfedin.",
    image: "/rugs/rug-05.jpg",
    links: [
      { label: "Vintage Halı", href: "/halilar?altKategori=Vintage+hal%C4%B1" },
      { label: "Kaymaz Taban", href: "/halilar?altKategori=Kaymaz+taban" },
      { label: "Yıkanabilir", href: "/halilar?altKategori=Makinede+y%C4%B1kanabilir" },
      { label: "Sisal & Jüt", href: "/halilar?altKategori=Sisal+hal%C4%B1" },
    ],
    primaryHref: "/halilar?altKategori=Makinede+y%C4%B1kanabilir",
  },
  {
    key: "renk",
    icon: Palette,
    eyebrow: "04 • Renge Göre",
    title: "Gün ışığını ve parkeyi dengeleyen tonlar",
    description:
      "Sıcak krem ve topraktan derin laciverte, odanızın ışık dengesine göre palet belirleyin.",
    image: "/rugs/rug-02.jpg",
    links: [
      { label: "Krem & Bej", href: "/halilar?renk=Krem+%26+Bej" },
      { label: "Lacivert", href: "/halilar?renk=Lacivert" },
      { label: "Toprak & Terracotta", href: "/halilar?renk=Toprak+%26+Terracotta" },
      { label: "Yeşil", href: "/halilar?renk=Ye%C5%9Fil" },
    ],
    primaryHref: "/halilar?renk=Krem+%26+Bej",
  },
];

export function RugSelectionGuide() {
  return (
    <section id="secme-rehberi" className="border-b border-line bg-ivory py-16 sm:py-20">
      <Container className="space-y-10">
        <SectionHeading
          eyebrow="Halı Seçme Rehberi"
          title="Dört adımda evinize en uygun halıyı bulun."
          subtitle="Ölçüden renge, kullanım yoğunluğundan stile kadar doğru soruları yanıtlayarak halı seçimini kolaylaştırıyoruz."
          actionLabel="Tüm kataloğu filtrele"
          actionHref="/halilar"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {GUIDE_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.key}
                className="group relative flex flex-col justify-between overflow-hidden rounded-[14px] border border-line bg-ivory-soft p-6 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)] sm:flex-row sm:gap-6 sm:p-7"
              >
                {/* Left Content */}
                <div className="flex flex-1 flex-col justify-between space-y-5">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sand/75 text-navy">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-terracotta-deep">
                        {card.eyebrow}
                      </span>
                    </div>

                    <h3 className="mt-3.5 font-editorial text-2xl leading-snug text-ink">
                      <Link
                        href={card.primaryHref}
                        className="hover:text-navy transition-colors"
                      >
                        {card.title}
                      </Link>
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-stone">
                      {card.description}
                    </p>
                  </div>

                  {/* Quick Filter Chips */}
                  <div className="flex flex-wrap gap-2">
                    {card.links.map((lnk) => (
                      <Link
                        key={lnk.href}
                        href={lnk.href}
                        className="inline-flex items-center gap-1 rounded-full border border-line bg-ivory px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:border-navy hover:bg-navy hover:text-ivory"
                      >
                        <span>{lnk.label}</span>
                        <ArrowUpRight className="h-3 w-3 opacity-65" aria-hidden="true" />
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Right Vertical Texture Preview */}
                <Link
                  href={card.primaryHref}
                  aria-label={card.title}
                  className="relative mt-5 aspect-[4/3] w-full shrink-0 overflow-hidden rounded-[10px] border border-line sm:mt-0 sm:aspect-[2/3] sm:w-36 lg:w-44"
                >
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    quality={55}
                    sizes="(max-width: 640px) 180px, 192px"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className="rug-weave-overlay pointer-events-none absolute inset-0 opacity-40"
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
