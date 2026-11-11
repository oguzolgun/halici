"use client";

import { useCartStore } from "@/store/cart";
import {
  calculateInstallment,
  formatTRY,
  FREE_SHIPPING_THRESHOLD,
  STANDARD_SHIPPING_FEE,
} from "@/lib/format";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CreditCard,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  Truck,
} from "lucide-react";
import { useIsMounted } from "@/lib/hooks";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";
import { Skeleton } from "../ui/Skeleton";

export function CartClient() {
  const mounted = useIsMounted();
  const { items, updateQuantity, removeItem, clearCart } = useCartStore();

  if (!mounted) {
    return (
      <Container className="py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8 space-y-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
          <div className="lg:col-span-4">
            <Skeleton className="h-72 w-full" />
          </div>
        </div>
      </Container>
    );
  }

  if (items.length === 0) {
    return (
      <Container className="py-16 sm:py-24">
        <div className="mx-auto max-w-lg rounded-[14px] border border-dashed border-line bg-ivory-soft px-6 py-14 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sand/70 text-navy">
            <ShoppingBag className="h-6 w-6" aria-hidden="true" />
          </div>
          <h2 className="mt-4 font-editorial text-2xl text-ink sm:text-3xl">
            Sepetiniz şu an boş.
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-stone">
            Evinize yakışacak halıyı bulmak için koleksiyonlarımızı inceleyebilir veya ana sayfadaki sürgülü rafı gezebilirsiniz.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button href="/halilar" variant="primary">
              Halıları Keşfet
            </Button>
            <Button href="/" variant="secondary">
              Ana Sayfaya Dön
            </Button>
          </div>
        </div>
      </Container>
    );
  }

  const subtotal = items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingFee = isFreeShipping ? 0 : STANDARD_SHIPPING_FEE;
  const total = subtotal + shippingFee;
  const remainingForFreeShipping = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD - subtotal
  );
  const freeShippingPercent = Math.min(
    100,
    Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100)
  );

  return (
    <Container className="py-10 sm:py-12">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {/* Free Shipping Progress */}
          <div className="rounded-[14px] border border-line bg-sand/40 p-4">
            <div className="flex items-center justify-between gap-2 text-xs sm:text-sm">
              <span className="flex items-center gap-2 font-medium text-ink">
                <Truck className="h-4 w-4 text-navy" aria-hidden="true" />
                {isFreeShipping ? (
                  <span>
                    Tebrikler! Siparişiniz{" "}
                    <strong className="text-navy">Ücretsiz Kargo</strong>{" "}
                    kapsamındadır.
                  </span>
                ) : (
                  <span>
                    Ücretsiz kargo için sepetinize{" "}
                    <strong className="text-navy">
                      {formatTRY(remainingForFreeShipping)}
                    </strong>{" "}
                    tutarında ürün daha ekleyebilirsiniz.
                  </span>
                )}
              </span>
              <span className="font-semibold tabular-nums text-navy">
                %{freeShippingPercent}
              </span>
            </div>
            <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-ivory">
              <div
                className="h-full rounded-full bg-navy transition-all duration-500"
                style={{ width: `${freeShippingPercent}%` }}
              />
            </div>
          </div>

          <ul className="divide-y divide-line overflow-hidden rounded-[14px] border border-line bg-ivory-soft">
            {items.map((item) => (
              <li
                key={item.key}
                className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:p-5"
              >
                <Link
                  href={`/halilar/${item.slug}`}
                  className="relative aspect-[2/3] w-24 shrink-0 overflow-hidden rounded-[10px] border border-line bg-sand/50"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </Link>

                <div className="flex-1 min-w-0 space-y-1">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-terracotta-deep">
                    {item.collection}
                  </p>
                  <h3 className="font-editorial text-xl text-ink">
                    <Link
                      href={`/halilar/${item.slug}`}
                      className="hover:text-navy transition-colors"
                    >
                      {item.name}
                    </Link>
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone">
                    <span>
                      Ölçü: <strong className="text-ink">{item.sizeLabel}</strong>
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <span
                        aria-hidden="true"
                        className="h-3 w-3 rounded-full border border-ink/20"
                        style={{ backgroundColor: item.colorHex }}
                      />
                      {item.colorName}
                    </span>
                  </div>
                </div>

                {/* Quantity & Subtotal */}
                <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                  <p className="text-base font-semibold tabular-nums text-ink sm:text-lg">
                    {formatTRY(item.unitPrice * item.quantity)}
                  </p>

                  <div className="flex items-center gap-2">
                    <div className="inline-flex h-9 items-center rounded-full border border-line bg-ivory px-1">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.key, item.quantity - 1)
                        }
                        aria-label={`${item.name} adedini azalt`}
                        className="flex h-7 w-7 items-center justify-center rounded-full text-navy hover:bg-sand/70 cursor-pointer"
                      >
                        <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                      <span className="w-7 text-center text-xs font-semibold tabular-nums text-ink">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.key, item.quantity + 1)
                        }
                        disabled={item.quantity >= item.maxStock}
                        aria-label={`${item.name} adedini artır`}
                        className="flex h-7 w-7 items-center justify-center rounded-full text-navy hover:bg-sand/70 disabled:opacity-35 cursor-pointer"
                      >
                        <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeItem(item.key)}
                      aria-label={`${item.name} ürününü sepetten kaldır`}
                      className="flex h-9 w-9 items-center justify-center rounded-full text-stone transition-colors hover:bg-sand/60 hover:text-terracotta-deep cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <Link
              href="/halilar"
              className="text-xs font-semibold text-navy underline-offset-4 hover:underline"
            >
              ← Alışverişe devam et
            </Link>
            <button
              type="button"
              onClick={clearCart}
              className="text-xs font-medium text-stone hover:text-terracotta-deep cursor-pointer"
            >
              Sepeti temizle
            </button>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <aside className="lg:col-span-4 space-y-4">
          <div className="rounded-[14px] border border-line bg-ivory-soft p-6 shadow-[var(--shadow-soft)] space-y-5">
            <h2 className="font-editorial text-2xl text-ink">Sipariş Özeti</h2>

            <dl className="space-y-3 border-b border-line pb-4 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-stone">Ürünler Toplamı</dt>
                <dd className="font-medium tabular-nums text-ink">
                  {formatTRY(subtotal)}
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-stone">Kargo Ücreti</dt>
                <dd className="font-medium text-navy">
                  {isFreeShipping ? "Ücretsiz" : formatTRY(shippingFee)}
                </dd>
              </div>
            </dl>

            <div className="flex items-baseline justify-between">
              <span className="text-sm font-semibold text-ink">
                Genel Toplam
              </span>
              <span className="text-2xl font-semibold tabular-nums text-ink">
                {formatTRY(total)}
              </span>
            </div>

            <Button href="/odeme" variant="primary" size="lg" fullWidth>
              <span>Ödemeye Geç</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>

            {/* Installment Options Preview */}
            <div className="rounded-xl bg-sand/45 p-4 space-y-2.5">
              <p className="flex items-center gap-2 text-xs font-semibold text-navy">
                <CreditCard className="h-4 w-4" aria-hidden="true" />
                Taksit Seçenekleri
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs text-stone-on-sand">
                {[3, 6, 9, 12].map((months) => (
                  <div
                    key={months}
                    className="flex justify-between rounded-lg bg-ivory/80 px-2.5 py-1.5"
                  >
                    <span>{months} Taksit</span>
                    <strong className="tabular-nums text-ink">
                      {formatTRY(calculateInstallment(total, months))}/ay
                    </strong>
                  </div>
                ))}
              </div>
            </div>

            <p className="flex items-center gap-2 text-xs text-stone">
              <ShieldCheck className="h-4 w-4 shrink-0 text-navy" aria-hidden="true" />
              14 gün içinde koşulsuz kolay iade güvencesi.
            </p>
          </div>
        </aside>
      </div>
    </Container>
  );
}
