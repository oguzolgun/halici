"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, ShoppingBag, Sparkles, X } from "lucide-react";
import { calculateInstallment, formatTRY } from "@/lib/format";
import { useCartStore } from "@/store/cart";
import type { RugProduct } from "@/types/rug";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";

interface QuickViewModalProps {
  rug: RugProduct | null;
  onClose: () => void;
}

function QuickViewContent({
  rug,
  onClose,
}: {
  rug: RugProduct;
  onClose: () => void;
}) {
  const reducedMotion = useReducedMotion();
  const addItem = useCartStore((s) => s.addItem);

  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [addedFeedback, setAddedFeedback] = useState(false);

  const activeSize = rug.sizeOptions[selectedSizeIndex] ?? rug.sizeOptions[0];

  const handleAddToCart = () => {
    if (!activeSize || activeSize.stock <= 0) return;
    addItem({
      rugId: rug.id,
      slug: rug.slug,
      name: rug.name,
      collection: rug.collection,
      image: rug.image,
      sizeLabel: activeSize.label,
      colorName: rug.colorName,
      colorHex: rug.colorHex,
      unitPrice: activeSize.price,
      quantity: 1,
      maxStock: activeSize.stock,
    });
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2400);
  };

  return (
    <motion.div
      initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      onClick={(e) => e.stopPropagation()}
      className="relative grid w-full max-w-3xl grid-cols-1 overflow-hidden rounded-[14px] border border-line bg-ivory shadow-[0_28px_70px_rgba(20,33,58,0.28)] md:grid-cols-12"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Hızlı bakış penceresini kapat"
        className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-line bg-ivory/95 text-ink transition-colors hover:bg-sand cursor-pointer"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>

      <div className="relative aspect-[4/3] bg-sand/50 md:col-span-5 md:aspect-auto md:min-h-[420px]">
        <Image
          src={rug.image}
          alt={rug.name}
          fill
          quality={60}
          sizes="(max-width: 768px) 300px, 320px"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="rug-weave-overlay pointer-events-none absolute inset-0 opacity-40"
        />
      </div>

      <div className="flex flex-col justify-between p-6 md:col-span-7 md:p-8">
        <div>
          <div className="flex flex-wrap items-center gap-2 pr-8">
            <Badge variant="sand">{rug.collection}</Badge>
            <Badge variant="outline">{rug.category}</Badge>
          </div>

          <h2
            id="quick-view-title"
            className="mt-3 font-editorial text-2xl text-ink sm:text-3xl"
          >
            {rug.name}
          </h2>

          <p className="mt-2 text-sm leading-relaxed text-stone">
            {rug.shortDescription}
          </p>

          <div className="mt-5 flex items-baseline justify-between border-y border-line py-3.5">
            <div>
              <p className="text-2xl font-semibold tabular-nums text-ink">
                {formatTRY(activeSize.price)}
              </p>
              <p className="text-xs text-stone">
                12 ay taksitle ayda{" "}
                <strong className="text-navy">
                  {formatTRY(calculateInstallment(activeSize.price, 12))}
                </strong>
              </p>
            </div>
            <span className="text-xs font-medium text-navy">
              {activeSize.stock > 0
                ? `Stokta (${activeSize.stock} adet)`
                : "Tükendi"}
            </span>
          </div>

          <div className="mt-5">
            <p className="mb-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-stone">
              Ölçü Seçimi
            </p>
            <div className="flex flex-wrap gap-2">
              {rug.sizeOptions.map((option, idx) => {
                const active = idx === selectedSizeIndex;
                return (
                  <button
                    key={option.label}
                    type="button"
                    onClick={() => {
                      setSelectedSizeIndex(idx);
                      setAddedFeedback(false);
                    }}
                    className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                      active
                        ? "border-navy bg-navy text-ivory"
                        : "border-line bg-ivory-soft text-ink hover:border-navy/50"
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          <dl className="mt-5 grid grid-cols-2 gap-3 text-xs">
            <div className="rounded-xl bg-sand/40 px-3 py-2">
              <dt className="text-stone-on-sand">Malzeme</dt>
              <dd className="font-medium text-ink">{rug.material}</dd>
            </div>
            <div className="rounded-xl bg-sand/40 px-3 py-2">
              <dt className="text-stone-on-sand">Üretim</dt>
              <dd className="font-medium text-ink">{rug.origin}</dd>
            </div>
          </dl>
        </div>

        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
          <Button
            variant="primary"
            fullWidth
            onClick={handleAddToCart}
            disabled={activeSize.stock <= 0}
          >
            {addedFeedback ? (
              <>
                <Check className="h-4 w-4" aria-hidden="true" />
                Sepete Eklendi
              </>
            ) : (
              <>
                <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                Sepete Ekle
              </>
            )}
          </Button>

          <Button
            href={`/halilar/${rug.slug}`}
            variant="secondary"
            fullWidth
            onClick={onClose}
          >
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Detaylı İncele
          </Button>
        </div>

        {addedFeedback && (
          <p className="mt-3 text-center text-xs text-navy">
            Ürün sepetinize eklendi.{" "}
            <Link
              href="/sepet"
              onClick={onClose}
              className="font-semibold underline underline-offset-4 hover:text-terracotta-deep"
            >
              Sepete git →
            </Link>
          </p>
        )}
      </div>
    </motion.div>
  );
}

export function QuickViewModal({ rug, onClose }: QuickViewModalProps) {
  useEffect(() => {
    if (!rug) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [rug, onClose]);

  return (
    <AnimatePresence>
      {rug && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="quick-view-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/45 p-4 backdrop-blur-xs"
        >
          <QuickViewContent key={rug.id} rug={rug} onClose={onClose} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
