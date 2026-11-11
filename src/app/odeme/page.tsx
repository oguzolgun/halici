import type { Metadata } from "next";
import { CheckoutClient } from "@/components/checkout/CheckoutClient";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Ödeme",
  description: "Seç Halı güvenli demo sipariş ve ödeme adımları.",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <div className="pb-16">
      <div className="border-b border-line bg-sand/35 py-8 sm:py-10">
        <Container>
          <Breadcrumb
            items={[
              { label: "Sepetim", href: "/sepet" },
              { label: "Ödeme" },
            ]}
          />
          <h1 className="mt-3 font-editorial text-3xl text-ink sm:text-4xl">
            Siparişi Tamamla
          </h1>
        </Container>
      </div>
      <CheckoutClient />
    </div>
  );
}
