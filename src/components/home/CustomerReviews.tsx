import Link from "next/link";
import { Quote, Star } from "lucide-react";
import type { CustomerReview } from "@/types/rug";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";

interface CustomerReviewsProps {
  reviews: CustomerReview[];
}

export function CustomerReviews({ reviews }: CustomerReviewsProps) {
  return (
    <section className="py-16 sm:py-20">
      <Container className="space-y-10">
        <SectionHeading
          eyebrow="Müşteri Deneyimleri"
          title="Evlerinden memnuniyetle bahseden aileler"
          subtitle="Siparişlerini teslim alıp halılarını serdikten sonra paylaşan gerçek yorumlardan seçkiler."
          align="center"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="flex flex-col justify-between rounded-[14px] border border-line bg-ivory-soft p-6 shadow-[var(--shadow-soft)]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div
                    role="img"
                    className="flex items-center gap-0.5"
                    aria-label={`5 üzerinden ${review.rating} yıldız`}
                  >
                    {Array.from({ length: review.rating }).map((_, idx) => (
                      <Star
                        key={idx}
                        className="h-4 w-4 fill-terracotta text-terracotta"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <Quote className="h-4 w-4 text-stone/40" aria-hidden="true" />
                </div>

                <p className="mt-4 text-sm leading-relaxed text-ink/90">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>

              <div className="mt-6 border-t border-line pt-4">
                <p className="text-sm font-semibold text-ink">
                  {review.author}
                </p>
                <p className="text-xs text-stone">
                  {review.city} • {review.sizePurchased}
                </p>
                <Link
                  href={`/halilar/${review.rugSlug}`}
                  className="mt-2 inline-block text-xs font-semibold text-navy underline-offset-4 hover:text-terracotta-deep hover:underline"
                >
                  {review.rugName} →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
