import { calculateInstallment, formatTRY } from "@/lib/format";

interface PriceTagProps {
  amount: number;
  /** Shows "'den başlayan fiyat" suffix cleanly */
  fromPrefix?: boolean;
  /** Optional installment hint below or inline */
  showInstallment?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: "text-sm font-semibold",
  md: "text-base font-semibold",
  lg: "text-2xl font-semibold sm:text-3xl",
};

export function PriceTag({
  amount,
  fromPrefix = false,
  showInstallment = false,
  size = "md",
  className = "",
}: PriceTagProps) {
  const formatted = formatTRY(amount);
  const monthly = formatTRY(calculateInstallment(amount, 12));

  return (
    <div className={`inline-flex flex-col ${className}`}>
      <div className="flex flex-wrap items-baseline gap-1.5 text-ink">
        <span className={`${sizeMap[size]} tabular-nums tracking-tight`}>
          {formatted}
        </span>
        {fromPrefix && (
          <span className="text-xs font-normal text-stone-on-sand">
            &apos;den başlayan fiyat
          </span>
        )}
      </div>
      {showInstallment && (
        <span className="mt-0.5 text-xs text-stone-on-sand">
          12 aya varan taksit: ayda{" "}
          <strong className="font-medium text-navy">{monthly}</strong>
        </span>
      )}
    </div>
  );
}
