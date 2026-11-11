import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  weight: ["600"],
  variable: "--font-fraunces",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sechali.com.tr"),
  title: {
    default: "Seç Halı | Evinize Yakışan Halıyı Güvenle Seçin",
    template: "%s | Seç Halı",
  },
  description:
    "Modern, vintage, doğal jüt, kilim, çocuk odası ve yolluk halı koleksiyonları. Türkiye geneli ücretsiz kargo, 12 ay taksit ve 14 gün kolay iade güvencesiyle Seç Halı.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://sechali.com.tr",
    siteName: "Seç Halı",
    title: "Seç Halı | Evinize Yakışan Halıyı Güvenle Seçin",
    description:
      "Yerli üretim modern, vintage, doğal jüt ve Anadolu kilim koleksiyonlarıyla evinizin dokusunu tamamlayın.",
    images: [
      {
        url: "/hero/showroom-wall.jpg",
        width: 1024,
        height: 571,
        alt: "Seç Halı Showroom",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Seç Halı | Evinize Yakışan Halıyı Güvenle Seçin",
    description:
      "Yerli üretim modern, vintage, doğal jüt ve Anadolu kilim koleksiyonları.",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Seç Halı",
  url: "https://sechali.com.tr",
  logo: "https://sechali.com.tr/brand/sec-hali-logo.svg",
  description:
    "Orta ve üst segment aileler için küratörlü yerli üretim modern, vintage ve doğal halı koleksiyonları sunan Türk e-ticaret markası.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Modoko Sanayi Sitesi, 3. Cadde No: 42",
    addressLocality: "Ümraniye",
    addressRegion: "İstanbul",
    postalCode: "34775",
    addressCountry: "TR",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+90-216-555-0142",
    contactType: "customer service",
    availableLanguage: ["Turkish"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${fraunces.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ivory text-ink">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-navy focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-ivory"
        >
          Ana içeriğe atla
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </body>
    </html>
  );
}
