import type { ReactNode } from "react";

type BadgeVariant = "terracotta" | "navy" | "sand" | "ivory" | "outline";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  // Uses WCAG AA deep terracotta (#A04526) for 5.7:1 contrast with ivory text
  terracotta: "bg-terracotta-deep text-ivory",
  navy: "bg-navy text-ivory",
  sand: "bg-sand text-ink",
  ivory: "bg-ivory/95 text-ink border border-line",
  outline: "border border-terracotta/50 bg-ivory text-terracotta-deep",
};

export function Badge({
  children,
  variant = "sand",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium tracking-wide ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
