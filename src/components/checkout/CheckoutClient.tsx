"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  CreditCard,
  Lock,
  MapPin,
  PackageCheck,
  Truck,
} from "lucide-react";
import {
  calculateInstallment,
  formatTRY,
  FREE_SHIPPING_THRESHOLD,
  STANDARD_SHIPPING_FEE,
} from "@/lib/format";
import { useIsMounted } from "@/lib/hooks";
import { useCartStore } from "@/store/cart";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";
import { Skeleton } from "../ui/Skeleton";

type Step = 1 | 2 | 3 | 4;

export function CheckoutClient() {
  const mounted = useIsMounted();
  const { items, clearCart } = useCartStore();

  const [step, setStep] = useState<Step>(1);
  const [orderNumber, setOrderNumber] = useState("");
  const [formError, setFormError] = useState("");

  // Step 1: Address State
  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: "İstanbul",
    district: "",
    street: "",
  });

  // Step 2: Delivery Method
  const [deliveryMethod, setDeliveryMethod] = useState<"standard" | "express">(
    "standard"
  );

  // Step 3: Mock Payment Method
  const [paymentMethod, setPaymentMethod] = useState<"card" | "transfer">(
    "card"
  );
  const [installments, setInstallments] = useState(1);

  if (!mounted) {
    return (
      <Container className="py-12">
        <Skeleton className="h-96 w-full" />
      </Container>
    );
  }

  const subtotal = items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
  const baseShipping =
    subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
  const expressExtra = deliveryMethod === "express" ? 190 : 0;
  const shippingTotal = baseShipping + expressExtra;
  const grandTotal = subtotal + shippingTotal;

  if (step === 4) {
    return (
      <Container className="py-14 sm:py-20">
        <div className="mx-auto max-w-xl rounded-[14px] border border-line bg-ivory-soft p-8 text-center shadow-[var(--shadow-elevated)]">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-navy text-ivory">
            <PackageCheck className="h-8 w-8" aria-hidden="true" />
          </div>
          <Badge variant="sand" className="mt-5">
            Demo Sipariş Oluşturuldu
          </Badge>
          <h2 className="mt-3 font-editorial text-3xl text-ink">
            Teşekkürler, {address.fullName || "Değerli Müşterimiz"}!
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-stone">
            Sipariş talebiniz test ortamında başarıyla kaydedildi. Gerçek bir ödeme tahsil edilmemiştir.
          </p>

          <div className="mt-6 rounded-xl border border-line bg-sand/40 p-4 text-left text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-stone-on-sand">Sipariş Numarası</span>
              <strong className="font-mono text-ink">{orderNumber}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-on-sand">Teslimat Adresi</span>
              <strong className="text-ink">
                {address.district ? `${address.district}, ` : ""}
                {address.city}
              </strong>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-on-sand">Teslimat Türü</span>
              <strong className="text-ink">
                {deliveryMethod === "express"
                  ? "Randevulu Hızlı Teslimat"
                  : "Standart Kargo (1–3 İş Günü)"}
              </strong>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button href="/halilar" variant="primary">
              Alışverişe Devam Et
            </Button>
            <Button href="/" variant="secondary">
              Ana Sayfaya Dön
            </Button>
          </div>
        </div>
      </Container>
    );
  }

  if (items.length === 0) {
    return (
      <Container className="py-16">
        <div className="mx-auto max-w-md rounded-[14px] border border-dashed border-line bg-ivory-soft p-10 text-center">
          <h2 className="font-editorial text-2xl text-ink">
            Ödeme için sepetinizde ürün bulunmuyor.
          </h2>
          <Button href="/halilar" variant="primary" className="mt-5">
            Halıları Keşfet
          </Button>
        </div>
      </Container>
    );
  }

  const handleAddressNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.fullName.trim() || !address.phone.trim() || !address.street.trim()) {
      setFormError("Lütfen ad soyad, telefon ve açık adres alanlarını doldurunuz.");
      return;
    }
    setFormError("");
    setStep(2);
  };

  const handleCompleteMockOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const randomCode = `SH-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(randomCode);
    clearCart();
    setStep(4);
  };

  return (
    <Container className="py-10 sm:py-12">
      {/* Stepper Indicator */}
      <ol className="mb-8 grid grid-cols-3 gap-3 max-w-2xl">
        {[
          { num: 1, label: "Adres Bilgileri", icon: MapPin },
          { num: 2, label: "Teslimat", icon: Truck },
          { num: 3, label: "Ödeme", icon: CreditCard },
        ].map((s) => {
          const active = step === s.num;
          const completed = step > s.num;
          const Icon = s.icon;
          return (
            <li
              key={s.num}
              className={`flex items-center gap-2.5 rounded-[12px] border px-3 py-2.5 text-xs font-medium transition-colors ${
                active
                  ? "border-navy bg-navy text-ivory"
                  : completed
                  ? "border-navy/30 bg-sand/70 text-navy"
                  : "border-line bg-ivory-soft text-stone"
              }`}
            >
              {completed ? (
                <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
              ) : (
                <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
              )}
              <span className="truncate">
                {s.num}. {s.label}
              </span>
            </li>
          );
        })}
      </ol>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left: Step Forms */}
        <div className="lg:col-span-8">
          {step === 1 && (
            <form
              onSubmit={handleAddressNext}
              noValidate
              className="rounded-[14px] border border-line bg-ivory-soft p-6 sm:p-8 space-y-5 shadow-[var(--shadow-soft)]"
            >
              <h2 className="font-editorial text-2xl text-ink">
                1. Teslimat Adresi Bilgileri
              </h2>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <InputField
                  id="fullName"
                  label="Ad Soyad *"
                  value={address.fullName}
                  onChange={(v) => setAddress({ ...address, fullName: v })}
                  placeholder="Örn: Elif Demir"
                />
                <InputField
                  id="phone"
                  label="Telefon Numarası *"
                  type="tel"
                  value={address.phone}
                  onChange={(v) => setAddress({ ...address, phone: v })}
                  placeholder="05XX XXX XX XX"
                />
                <InputField
                  id="email"
                  label="E-posta Adresi"
                  type="email"
                  value={address.email}
                  onChange={(v) => setAddress({ ...address, email: v })}
                  placeholder="ornek@eposta.com"
                />
                <div>
                  <label
                    htmlFor="city"
                    className="mb-1.5 block text-xs font-semibold text-ink"
                  >
                    İl
                  </label>
                  <select
                    id="city"
                    value={address.city}
                    onChange={(e) =>
                      setAddress({ ...address, city: e.target.value })
                    }
                    className="h-11 w-full rounded-[10px] border border-line bg-ivory px-3.5 text-sm text-ink focus:border-navy focus:outline-none"
                  >
                    {["İstanbul", "Ankara", "İzmir", "Bursa", "Antalya", "Diğer"].map(
                      (c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      )
                    )}
                  </select>
                </div>
                <InputField
                  id="district"
                  label="İlçe"
                  value={address.district}
                  onChange={(v) => setAddress({ ...address, district: v })}
                  placeholder="Örn: Kadıköy"
                />
                <div className="sm:col-span-2">
                  <label
                    htmlFor="street"
                    className="mb-1.5 block text-xs font-semibold text-ink"
                  >
                    Açık Adres *
                  </label>
                  <textarea
                    id="street"
                    rows={3}
                    value={address.street}
                    onChange={(e) =>
                      setAddress({ ...address, street: e.target.value })
                    }
                    placeholder="Mahalle, sokak, bina no ve daire bilgisi"
                    className="w-full rounded-[10px] border border-line bg-ivory p-3.5 text-sm text-ink focus:border-navy focus:outline-none"
                  />
                </div>
              </div>

              {formError && (
                <p role="alert" className="text-xs font-medium text-terracotta-deep">
                  {formError}
                </p>
              )}

              <div className="flex justify-end pt-2">
                <Button type="submit" variant="primary" size="lg">
                  Teslimat Adımına Geç →
                </Button>
              </div>
            </form>
          )}

          {step === 2 && (
            <div className="rounded-[14px] border border-line bg-ivory-soft p-6 sm:p-8 space-y-5 shadow-[var(--shadow-soft)]">
              <h2 className="font-editorial text-2xl text-ink">
                2. Teslimat Seçeneği
              </h2>

              <div className="space-y-3">
                <label className="flex cursor-pointer items-start justify-between gap-4 rounded-[12px] border border-line bg-ivory p-4 has-[:checked]:border-navy has-[:checked]:bg-sand/40">
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="delivery"
                      checked={deliveryMethod === "standard"}
                      onChange={() => setDeliveryMethod("standard")}
                      className="mt-1 accent-navy"
                    />
                    <div>
                      <p className="text-sm font-semibold text-ink">
                        Standart Sigortalı Halı Kargosu
                      </p>
                      <p className="mt-0.5 text-xs text-stone">
                        1–3 iş günü içinde özenle rulo paketlenmiş olarak kapınıza teslim.
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-navy">
                    {baseShipping === 0 ? "Ücretsiz" : formatTRY(baseShipping)}
                  </span>
                </label>

                <label className="flex cursor-pointer items-start justify-between gap-4 rounded-[12px] border border-line bg-ivory p-4 has-[:checked]:border-navy has-[:checked]:bg-sand/40">
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="delivery"
                      checked={deliveryMethod === "express"}
                      onChange={() => setDeliveryMethod("express")}
                      className="mt-1 accent-navy"
                    />
                    <div>
                      <p className="text-sm font-semibold text-ink">
                        Randevulu Hızlı Teslimat (İstanbul / Ankara / İzmir)
                      </p>
                      <p className="mt-0.5 text-xs text-stone">
                        Ertesi iş günü seçtiğiniz saat aralığında özel araçla teslimat.
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-navy">
                    +{formatTRY(190)}
                  </span>
                </label>
              </div>

              <div className="flex items-center justify-between pt-3">
                <Button variant="secondary" onClick={() => setStep(1)}>
                  ← Adrese Dön
                </Button>
                <Button variant="primary" size="lg" onClick={() => setStep(3)}>
                  Ödeme Adımına Geç →
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <form
              onSubmit={handleCompleteMockOrder}
              className="rounded-[14px] border border-line bg-ivory-soft p-6 sm:p-8 space-y-6 shadow-[var(--shadow-soft)]"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="font-editorial text-2xl text-ink">
                  3. Ödeme Yöntemi (Demo)
                </h2>
                <Badge variant="outline">Gerçek ödeme alınmaz</Badge>
              </div>

              <div className="rounded-xl border border-line bg-sand/40 p-4 text-xs leading-relaxed text-stone-on-sand">
                Bu ekran Seç Halı prototip sipariş akışıdır; kredi kartı numaranızı girmeniz gerekmez ve gerçek ödeme işlemi gerçekleştirilmez.
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`rounded-[12px] border p-4 text-left transition-colors cursor-pointer ${
                    paymentMethod === "card"
                      ? "border-navy bg-navy text-ivory"
                      : "border-line bg-ivory text-ink"
                  }`}
                >
                  <p className="text-sm font-semibold">Kredi / Banka Kartı</p>
                  <p className="mt-0.5 text-xs opacity-80">
                    12 aya varan taksit seçeneği
                  </p>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("transfer")}
                  className={`rounded-[12px] border p-4 text-left transition-colors cursor-pointer ${
                    paymentMethod === "transfer"
                      ? "border-navy bg-navy text-ivory"
                      : "border-line bg-ivory text-ink"
                  }`}
                >
                  <p className="text-sm font-semibold">Havale / EFT (Demo)</p>
                  <p className="mt-0.5 text-xs opacity-80">
                    Sipariş onayı sonrası IBAN iletimi
                  </p>
                </button>
              </div>

              {paymentMethod === "card" && (
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-navy">
                    Taksit Planı Seçin
                  </p>
                  <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                    {[1, 3, 6, 12].map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setInstallments(m)}
                        className={`rounded-xl border p-3 text-left text-xs transition-colors cursor-pointer ${
                          installments === m
                            ? "border-navy bg-sand/70 font-semibold text-navy"
                            : "border-line bg-ivory text-ink"
                        }`}
                      >
                        <p>{m === 1 ? "Tek Çekim" : `${m} Taksit`}</p>
                        <p
                          className={`mt-0.5 tabular-nums ${
                            installments === m ? "text-stone-on-sand" : "text-stone"
                          }`}
                        >
                          {m === 1
                            ? formatTRY(grandTotal)
                            : `${formatTRY(calculateInstallment(grandTotal, m))}/ay`}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <Button variant="secondary" onClick={() => setStep(2)}>
                  ← Teslimata Dön
                </Button>
                <Button type="submit" variant="primary" size="lg">
                  <Lock className="h-4 w-4" aria-hidden="true" />
                  Demo Siparişi Tamamla ({formatTRY(grandTotal)})
                </Button>
              </div>
            </form>
          )}
        </div>

        {/* Right: Order Summary */}
        <aside className="lg:col-span-4">
          <div className="rounded-[14px] border border-line bg-ivory-soft p-6 space-y-5 shadow-[var(--shadow-soft)]">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <h3 className="font-editorial text-xl text-ink">
                Sepetiniz ({items.length})
              </h3>
              <Link
                href="/sepet"
                className="text-xs font-medium text-navy underline underline-offset-4"
              >
                Düzenle
              </Link>
            </div>

            <ul className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {items.map((item) => (
                <li key={item.key} className="flex items-center gap-3 text-xs">
                  <div className="relative h-14 w-10 shrink-0 overflow-hidden rounded-md border border-line">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-ink">{item.name}</p>
                    <p className="text-stone">
                      {item.sizeLabel} • {item.quantity} adet
                    </p>
                  </div>
                  <span className="font-semibold tabular-nums text-ink">
                    {formatTRY(item.unitPrice * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>

            <dl className="space-y-2 border-t border-line pt-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-stone">Ara Toplam</dt>
                <dd className="tabular-nums text-ink">{formatTRY(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-stone">Kargo & Teslimat</dt>
                <dd className="tabular-nums text-navy">
                  {shippingTotal === 0 ? "Ücretsiz" : formatTRY(shippingTotal)}
                </dd>
              </div>
              <div className="flex justify-between border-t border-line pt-3 font-semibold text-ink">
                <dt>Ödenecek Tutar</dt>
                <dd className="text-lg tabular-nums">{formatTRY(grandTotal)}</dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>
    </Container>
  );
}

function InputField({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-semibold text-ink">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-11 w-full rounded-[10px] border border-line bg-ivory px-3.5 text-sm text-ink placeholder:text-stone/70 focus:border-navy focus:outline-none"
      />
    </div>
  );
}
