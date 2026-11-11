import type { Metadata } from "next";
import { CartClient } from "@/components/checkout/CartClient";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Sepetim",
  description: "Seç Halı alışveriş sepeti ve taksit hesaplama.",
  robots: { index: false, follow: false },
};

export default function CartPage() {
  return (
    <div className="pb-16">
      <div className="border-b border-line bg-sand/35 py-8 sm:py-10">
        <Container>
          <Breadcrumb items={[{ label: "Sepetim" }]} />
          <h1 className="mt-3 font-editorial text-3xl text-ink sm:text-4xl">
            Alışveriş Sepetiniz
          </h1>
        </Container>
      </div>
      <CartClient />
    </div>
  );
}
