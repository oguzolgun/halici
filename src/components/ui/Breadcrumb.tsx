import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  return (
    <nav aria-label="Sayfa konumu" className={className}>
      <ol className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm text-stone-on-sand">
        <li>
          <Link
            href="/"
            prefetch={false}
            className="transition-colors hover:text-navy"
          >
            Ana Sayfa
          </Link>
        </li>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={`${item.label}-${idx}`} className="flex items-center gap-1.5">
              <ChevronRight className="h-3.5 w-3.5 text-stone/60" aria-hidden="true" />
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  prefetch={false}
                  className="transition-colors hover:text-navy"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className="font-medium text-ink"
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
