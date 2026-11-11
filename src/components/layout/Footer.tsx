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

          {/* Koleksiyonlar */}
          <div className="lg:col-span-2 space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-navy">
              Koleksiyonlar
            </h2>
            <ul className="space-y-2.5 text-sm text-ink/85">
              <li>
                <Link href="/halilar?kategori=Modern" prefetch={false} className="hover:text-navy hover:underline underline-offset-4">
                  Modern Halılar
                </Link>
              </li>
              <li>
                <Link href="/halilar?kategori=Vintage" prefetch={false} className="hover:text-navy hover:underline underline-offset-4">
                  Vintage & Eskitme
                </Link>
              </li>
              <li>
                <Link href="/halilar?kategori=Do%C4%9Fal" prefetch={false} className="hover:text-navy hover:underline underline-offset-4">
                  Doğal Jüt & Kilim
                </Link>
              </li>
              <li>
                <Link href="/halilar?kategori=%C3%87ocuk" prefetch={false} className="hover:text-navy hover:underline underline-offset-4">
                  Çocuk Odası
                </Link>
              </li>
              <li>
                <Link href="/halilar?kategori=Yolluk" prefetch={false} className="hover:text-navy hover:underline underline-offset-4">
                  Yolluklar
                </Link>
              </li>
            </ul>
          </div>

          {/* Seçme Rehberi */}
          <div className="lg:col-span-3 space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-navy">
              Halı Seçme Rehberi
            </h2>
            <ul className="space-y-2.5 text-sm text-ink/85">
              <li>
                <Link href="/halilar?oda=Salon+%26+Oturma+Odas%C4%B1" prefetch={false} className="hover:text-navy hover:underline underline-offset-4">
                  Salon için Halı Ölçüleri
                </Link>
              </li>
              <li>
                <Link href="/halilar?oda=Yemek+Odas%C4%B1" prefetch={false} className="hover:text-navy hover:underline underline-offset-4">
                  Yemek Masası Altı Rehberi
                </Link>
              </li>
              <li>
                <Link href="/halilar?oda=Yatak+Odas%C4%B1" prefetch={false} className="hover:text-navy hover:underline underline-offset-4">
                  Yatak Odası Konfor Seçimi
                </Link>
              </li>
              <li>
                <Link href="/halilar?malzeme=Do%C4%9Fal+J%C3%BCt+%26+Sisal" prefetch={false} className="hover:text-navy hover:underline underline-offset-4">
                  Doğal Lif Bakım Önerileri
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
