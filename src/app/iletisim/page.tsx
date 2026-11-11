import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { ContactFormClient } from "@/components/contact/ContactFormClient";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "İletişim & Showroom",
  description:
    "Seç Halı İstanbul Modoko showroom adresi, müşteri destek hattı ve dekorasyon danışmanlığı iletişim formu.",
  alternates: { canonical: "/iletisim" },
};

export default function ContactPage() {
  return (
    <div className="pb-20">
      <div className="border-b border-line bg-sand/35 py-10 sm:py-14">
        <Container>
          <Breadcrumb items={[{ label: "İletişim" }]} />
          <div className="mt-5 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta-deep">
              Showroom & Müşteri Danışmanlığı
            </p>
            <h1 className="mt-2 font-editorial text-4xl text-ink sm:text-5xl">
              Size nasıl yardımcı olabiliriz?
            </h1>
            <p className="mt-3 text-base leading-relaxed text-stone-on-sand">
              Odanızın fotoğrafını ya da ölçülerini paylaşın; doğru boyut ve doku seçimi için ekibimizle birlikte karar verin.
            </p>
          </div>
        </Container>
      </div>

      <Container className="py-12 sm:py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5 space-y-5">
            <div className="rounded-[14px] border border-line bg-ivory-soft p-6 space-y-5 shadow-[var(--shadow-soft)]">
              <h2 className="font-editorial text-2xl text-ink">
                İletişim Bilgileri
              </h2>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-navy" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-ink">
                      Seç Halı Showroom (İstanbul)
                    </p>
                    <p className="text-stone">
                      Modoko Sanayi Sitesi, 3. Cadde No: 42, Ümraniye / İstanbul
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-navy" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-ink">Telefon & Destek</p>
                    <p className="text-stone">0 (216) 555 01 42</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-navy" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-ink">E-posta</p>
                    <p className="text-stone">destek@sechali.com.tr</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-navy" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-ink">Çalışma Saatleri</p>
                    <p className="text-stone">
                      Pazartesi – Cumartesi: 09:30 – 19:00
                    </p>
                    <p className="text-stone">Pazar: 11:00 – 18:00</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[14px] border border-line bg-sand/45 p-6 space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-terracotta-deep">
                Showroom Randevusu
              </p>
              <p className="font-editorial text-xl text-ink">
                Askı sistemimizde dokuları yerinde görün.
              </p>
              <p className="text-xs leading-relaxed text-stone-on-sand">
                Koltuk kumaş örneğinizi veya parke tonunuzu showroomumuza getirerek gün ışığında birebir eşleştirme yapabilirsiniz.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ContactFormClient />
          </div>
        </div>
      </Container>
    </div>
  );
}
