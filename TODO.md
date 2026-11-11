# Seç Halı — Üretime Geçiş ve Kalan İşler (TODO)

Bu doküman, prototip ve vitrin aşaması tamamlanan **Seç Halı** e-ticaret uygulamasının canlı yayına alınmadan önce tamamlanması gereken ürün verisi, ödeme, yasal uyumluluk ve operasyonel adımlarını özetler.

---

## 1. Gerçek Katalog Verisi & Stüdyo Görselleri (Kritik)
- **Tedarikçi Onayı & Katalog Entegrasyonu:** Binbirdesen (veya anlaşmalı diğer üretici/tedarikçiler) ürün listesi, güncel fiyatlar, ölçü/stok matrisi ve yüksek çözünürlüklü ürün görselleri yazılı telif/satış izniyle temin edilmelidir. *(Kesinlikle otomatik veri kazıma / scraping veya harici hotlinking yapılmamalıdır.)*
- **Yer Tutucu Görsellerin Değiştirilmesi:** `/public/rugs/rug-01.jpg` – `rug-12.jpg` ve `/public/hero/showroom-wall.jpg` yapay zekâ / yer tutucu görselleri, gerçek stüdyo ve yaşam alanı fotoğraflarıyla değiştirilmelidir. Her ürün için gerçek doku, yakın plan ve oda içi perspektif kareleri (`/gallery`) eklenmelidir.
- **Repository Katmanı Bağlantısı:** `/src/lib/products.ts` içindeki `getAllRugs()`, `getRugBySlug()`, `getFilteredRugs()` vb. fonksiyonlar `/data/rugs.json` yerine canlı Headless CMS / PostgreSQL / REST veya GraphQL API'ye bağlanmalıdır.

## 2. Ödeme Altyapısı & Sipariş Yönetimi (`/odeme`)
- **iyzico veya PayTR Entegrasyonu:** Mevcut `/odeme` akışı gerçek tahsilat yapmayan 3 adımlı demo formdur. Canlı kart çekimi, 3D Secure yönlendirmesi, banka taksit tablolarının API üzerinden dinamik hesaplanması ve webhook doğrulaması eklenmelidir.
- **Stok Rezervasyonu & Sipariş Kaydı:** Sepete ekleme/ödeme anında sunucu taraflı stok doğrulaması yapılmalı, tamamlanan siparişler arka ofis paneline (kargo takip numarası, fatura, iade talebi yönetimi) düşmelidir.
- **Ücretsiz Kargo / Kupon Kuralları:** İndirim kuponları ve dinamik kargo kuralları sunucu tarafından doğrulanacak şekilde genişletilmelidir.

## 3. Kullanıcı Hesabı, İletişim & Bildirimler
- **Üyelik & Sipariş Takibi:** `Header.tsx` içindeki hesap/favori çekmecesine SMS/OTP veya e-posta tabanlı giriş, kayıtlı adresler ve *"Siparişim Nerede?"* takip ekranı eklenmelidir.
- **E-Bülten & İletişim Formu Backend'i:** `NewsletterBlock.tsx` (e-bülten kaydı) ve `ContactFormClient.tsx` (iletişim / showroom randevu formu) gerçek CRM veya e-posta gönderim servisine (Resend, Postmark vb.) bağlanmalıdır.
- **Kalıcı Favori & Sepet Senkronizasyonu:** Giriş yapan kullanıcılar için Zustand (`localStorage`) durumunun sunucuyla senkronize edilmesi önerilir.

## 4. Yasal Uyumluluk & E-Ticaret Mevzuatı (ETBİS)
- Türkiye e-ticaret mevzuatı gereği footer ve ödeme adımlarına şu sayfalar/onay kutuları eklenmelidir:
  - **KVKK Aydınlatma Metni & Çerez Politikası**
  - **Mesafeli Satış Sözleşmesi** (sipariş özetiyle dinamik oluşturulan)
  - **Ön Bilgilendirme Formu**
  - **İptal ve İade Koşulları**

## 5. SEO, Marka & Teknik Küçük İyileştirmeler
- **Canlı Alan Adı (Domain) Ayarı:** `src/app/layout.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts` ve ürün JSON-LD şemalarındaki `https://sechali.com.tr` alan adı ve iletişim bilgileri gerçek üretim alan adına göre doğrulanmalıdır.
- **Favicon & OG Görseli:** `src/app/icon.svg` + `public/brand/favicon.svg` mevcuttur; eski varsayılan şablon dosyası olan `src/app/favicon.ico` istenirse özel Seç Halı çoklu çözünürlüklü `.ico` ile güncellenebilir ve sosyal paylaşım için özel 1200×630 Open Graph görseli hazırlanabilir.
- **Logodan HEX Doğrulaması:** Marka laciverti `#1C335C` (görselden örneklenen ton) olarak tanımlanmıştır; baskı/vektör master dosyasındaki kesin Pantone/HEX koduyla son kontrol yapılmalıdır.
- **Browserslist / Legacy Polyfill İyileştirmesi:** Lighthouse raporunda Next.js çekirdeğinden kaynaklanan ~14 KiB polyfill uyarısı (`Array.prototype.at`, `flat` vb.) görülmektedir; canlıda modern tarayıcı hedefi için `package.json` `browserslist` yapılandırması daraltılabilir.
- **Gerçek Cihaz & Analitik Testi:** Fiziksel iOS Safari ve Android Chrome cihazlarda sürükleme/dokunmatik hissi kontrol edilmeli, KVKK onaylı analitik / dönüşüm izleme entegre edilmelidir.
