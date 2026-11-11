/**
 * Locale-aware formatting and Turkish text normalization utilities.
 */

const tryFormatter = new Intl.NumberFormat("tr-TR", {
  style: "currency",
  currency: "TRY",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const tryDecimalFormatter = new Intl.NumberFormat("tr-TR", {
  style: "currency",
  currency: "TRY",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatTRY(amount: number, showDecimals = false): string {
  return showDecimals
    ? tryDecimalFormatter.format(amount)
    : tryFormatter.format(amount);
}

export function formatNumberTR(value: number): string {
  return new Intl.NumberFormat("tr-TR").format(value);
}

/**
 * Calculates monthly installment amount up to 12 months.
 */
export function calculateInstallment(
  totalPrice: number,
  months = 12
): number {
  if (months <= 0) return totalPrice;
  return Math.round(totalPrice / months);
}

/**
 * Normalizes Turkish characters (İ, ı, Ş, ş, Ğ, ğ, Ü, ü, Ö, ö, Ç, ç)
 * for accurate client/repository search matching.
 */
export function normalizeTurkish(input: string): string {
  return input
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i")
    .trim();
}

export const FREE_SHIPPING_THRESHOLD = 2500;
export const STANDARD_SHIPPING_FEE = 149;
