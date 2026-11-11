import { Award, CreditCard, RotateCcw, Truck } from "lucide-react";
import { Container } from "./Container";

const TRUST_ITEMS = [
  {
    icon: Truck,
    title: "Ücretsiz Kargo",
    subtitle: "2.500 TL üzeri tüm siparişlerde kapıya teslim",
  },
  {
    icon: RotateCcw,
    title: "Kolay İade",
    subtitle: "14 gün içinde koşulsuz ve ücretsiz değişim",
  },
  {
    icon: CreditCard,
    title: "12 Ay Taksit",
    subtitle: "Tüm banka kartlarına esnek taksit imkanı",
  },
  {
    icon: Award,
    title: "Yerli Üretim",
    subtitle: "Gaziantep, Uşak ve Denizli atölyelerinden",
  },
];

interface TrustBarProps {
  compact?: boolean;
  className?: string;
}

export function TrustBar({ compact = false, className = "" }: TrustBarProps) {
  return (
    <section
      aria-label="Seç Halı güvenceleri"
      className={`border-y border-line bg-sand/70 ${
        compact ? "py-4" : "py-5 sm:py-6"
      } ${className}`}
    >
      <Container>
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {TRUST_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex items-center gap-3 sm:gap-3.5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-navy/15 bg-ivory text-navy shadow-[0_2px_8px_rgba(20,33,58,0.05)]">
                  <Icon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" strokeWidth={1.75} aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-ink">
                    {item.title}
                  </p>
                  <p className="hidden text-xs text-stone-on-sand sm:block">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
