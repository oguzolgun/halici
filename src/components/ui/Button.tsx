import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "ivory";
type ButtonSize = "sm" | "md" | "lg";

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
}

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-xs tracking-wide",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-3.5 text-base",
};

/**
 * Editorial action button.
 * - Primary: Navy background with ivory text; hover sweeps deep terracotta from the left.
 * - Secondary: Navy outline button with subtle sand fill on hover.
 */
export function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  fullWidth = false,
  ...rest
}: ButtonProps) {
  const widthClass = fullWidth ? "w-full" : "";

  const baseClass =
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-medium transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none";

  const variantClasses: Record<ButtonVariant, string> = {
    primary: "bg-navy text-ivory shadow-[0_6px_18px_rgba(28,51,92,0.18)]",
    secondary:
      "border border-navy/25 bg-transparent text-navy hover:border-navy hover:bg-sand/60",
    ghost:
      "bg-transparent text-navy hover:bg-sand/50",
    ivory:
      "bg-ivory text-navy hover:bg-sand shadow-[0_4px_14px_rgba(20,33,58,0.12)]",
  };

  const combinedClass = `${baseClass} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClass} ${className}`;

  const innerContent = (
    <>
      {variant === "primary" && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-terracotta-deep transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
        />
      )}
      <span className="relative z-10 inline-flex items-center justify-center gap-2">
        {children}
      </span>
    </>
  );

  if ("href" in rest && typeof rest.href === "string") {
    const { href, ...linkProps } = rest;
    return (
      <Link href={href} className={combinedClass} {...linkProps}>
        {innerContent}
      </Link>
    );
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button
      type={buttonProps.type ?? "button"}
      className={combinedClass}
      {...buttonProps}
    >
      {innerContent}
    </button>
  );
}
