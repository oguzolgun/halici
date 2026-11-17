import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  actionLabel?: string;
  actionHref?: string;
  align?: "left" | "center";
  className?: string;
  wide?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  actionLabel,
  actionHref,
  align = "left",
  className = "",
  wide = true,
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div
      className={`flex flex-col gap-4 ${
        isCenter
          ? "items-center text-center"
          : "md:flex-row md:items-end md:justify-between"
      } ${className}`}
    >
      <div
        className={
          isCenter
            ? "max-w-2xl"
            : wide
            ? "flex-1 max-w-full lg:max-w-4xl xl:max-w-5xl"
            : "flex-1 max-w-2xl lg:max-w-3xl"
        }
      >
        {eyebrow && (
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-terracotta-deep">
            {eyebrow}
          </p>
        )}
        <h2 className="font-editorial text-3xl leading-[1.15] text-ink sm:text-4xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 text-sm leading-relaxed text-stone-on-sand sm:text-base">
            {subtitle}
          </p>
        )}
      </div>

      {actionLabel && actionHref && !isCenter && (
        <Link
          href={actionHref}
          className="group inline-flex shrink-0 items-center gap-2 pb-1 text-sm font-semibold text-navy transition-colors hover:text-terracotta-deep"
        >
          <span>{actionLabel}</span>
          <ArrowRight
            className="h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      )}
    </div>
  );
}
