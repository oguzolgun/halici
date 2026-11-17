import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "../ui/Container";

export function Footer() {
  return (
    <footer className="border-t border-line bg-sand/45 text-ink">
      <Container className="py-14 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" prefetch={false} aria-label="seç halı ana sayfa" className="inline-block">
              <Image
                src="/brand/sec-hali-logo.svg"
                alt="seç halı"
                width={148}
                height={46}
                unoptimized
                className="h-9 w-auto"
              />
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-stone-on-sand">
              Evinizin ışığına, ölçüsüne ve günlük yaşam temposuna uygun halıyı güvenle seçmeniz için küratörlü yerli dokuma koleksiyonları sunuyoruz.
            </p>
            <div className="space-y-2 pt-2 text-xs text-stone-on-sand">
              <p className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-navy" aria-hidden="true" />
                <span>Modoko Showroom, Ümraniye / İstanbul</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-navy" aria-hidden="true" />
                <span>0 (216) 555 01 42 (Hafta içi 09:30 – 18:30)</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-navy" aria-hidden="true" />
                <span>destek@sechali.com.tr</span>
              </p>
            </div>
          </div>

          {/* Ana Kategoriler */}
          <div className="lg:col-span-2 space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-navy">
              Ana Kategoriler
            </h2>
            <ul className="space-y-2 text-sm text-ink/85">
              <li>
                <Link href="/halilar?kategori=Mutfak+hal%C4%B1s%C4%B1" prefetch={false} className="hover:text-navy hover:underline underline-offset-4">
                  Mutfak Halısı
                </Link>
              </li>
              <li>
                <Link href="/halilar?kategori=Banyo+paspas%C4%B1" prefetch={false} className="hover:text-navy hover:underline underline-offset-4">
                  Banyo Paspası
                </Link>
              </li>
              <li>
                <Link href="/halilar?kategori=Salon+hal%C4%B1s%C4%B1" prefetch={false} className="hover:text-navy hover:underline underline-offset-4">
                  Salon Halısı
                </Link>
              </li>
              <li>
                <Link href="/halilar?kategori=%C3%87ocuk+hal%C4%B1s%C4%B1" prefetch={false} className="hover:text-navy hover:underline underline-offset-4">
                  Çocuk Halısı
                </Link>
              </li>
              <li>
                <Link href="/halilar?kategori=Yatak+odas%C4%B1+hal%C4%B1s%C4%B1" prefetch={false} className="hover:text-navy hover:underline underline-offset-4">
                  Yatak Odası Halısı
                </Link>
              </li>
              <li>
                <Link href="/halilar?kategori=Yolluk" prefetch={false} className="hover:text-navy hover:underline underline-offset-4">
                  Yolluk
                </Link>
              </li>
              <li>
                <Link href="/halilar?kategori=Kilim" prefetch={false} className="hover:text-navy hover:underline underline-offset-4">
                  Kilim
                </Link>
              </li>
              <li>
                <Link href="/halilar?kategori=Banyo+tak%C4%B1m%C4%B1" prefetch={false} className="hover:text-navy hover:underline underline-offset-4">
                  Banyo Takımı
                </Link>
              </li>
            </ul>
          </div>

          {/* Alt Kategoriler & Özellikler */}
          <div className="lg:col-span-3 space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-navy">
              Alt Kategoriler
            </h2>
            <ul className="space-y-2 text-sm text-ink/85">
              <li>
                <Link href="/halilar?altKategori=Outlet+%C3%BCr%C3%BCnler" prefetch={false} className="hover:text-navy hover:underline underline-offset-4">
                  Outlet Ürünler
                </Link>
              </li>
              <li>
                <Link href="/halilar?altKategori=Vintage+hal%C4%B1" prefetch={false} className="hover:text-navy hover:underline underline-offset-4">
                  Vintage Halı
                </Link>
              </li>
              <li>
                <Link href="/halilar?altKategori=Koridor+hal%C4%B1s%C4%B1" prefetch={false} className="hover:text-navy hover:underline underline-offset-4">
                  Koridor Halısı
                </Link>
              </li>
              <li>
                <Link href="/halilar?altKategori=Kaymaz+taban" prefetch={false} className="hover:text-navy hover:underline underline-offset-4">
                  Kaymaz Taban Halılar
                </Link>
              </li>
              <li>
                <Link href="/halilar?altKategori=Kesme+hal%C4%B1" prefetch={false} className="hover:text-navy hover:underline underline-offset-4">
                  Kesme Halı & Rulo
                </Link>
              </li>
              <li>
                <Link href="/halilar?altKategori=Makinede+y%C4%B1kanabilir" prefetch={false} className="hover:text-navy hover:underline underline-offset-4">
                  Makinede Yıkanabilir
                </Link>
              </li>
              <li>
                <Link href="/halilar?altKategori=Sisal+hal%C4%B1" prefetch={false} className="hover:text-navy hover:underline underline-offset-4">
                  Sisal & Jüt Halı
                </Link>
              </li>
              <li>
                <Link href="/halilar?altKategori=Dekoratif+hal%C4%B1" prefetch={false} className="hover:text-navy hover:underline underline-offset-4">
                  Dekoratif Halı Modelleri
                </Link>
              </li>
            </ul>
          </div>

          {/* Kurumsal & Yardım */}
          <div className="lg:col-span-3 space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-navy">
              Kurumsal & Destek
            </h2>
            <ul className="space-y-2.5 text-sm text-ink/85">
              <li>
                <Link href="/hakkimizda" prefetch={false} className="hover:text-navy hover:underline underline-offset-4">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/iletisim" prefetch={false} className="hover:text-navy hover:underline underline-offset-4">
                  İletişim & Showroom
                </Link>
              </li>
              <li>
                <Link href="/sepet" prefetch={false} className="hover:text-navy hover:underline underline-offset-4">
                  Sepetim
                </Link>
              </li>
              <li>
                <Link href="/design" prefetch={false} className="hover:text-navy hover:underline underline-offset-4">
                  Tasarım Sistemi
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 text-xs text-stone-on-sand sm:flex-row sm:items-center">
          <p>
            © 2026 Seç Halı Tekstil ve Ev Dekorasyon A.Ş. Tüm hakları saklıdır.
          </p>
          <p>
            256-bit SSL Güvenli Alışveriş • Türkiye Geneli Ücretsiz Kargo • 14 Gün Kolay İade
          </p>
        </div>
      </Container>
    </footer>
  );
}
