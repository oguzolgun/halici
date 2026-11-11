import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="py-20 sm:py-28">
      <Container className="flex flex-col items-center text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-line bg-sand/50">
          <Image
            src="/brand/favicon.svg"
            alt=""
            width={36}
            height={36}
            aria-hidden="true"
          />
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta-deep">
          Hata 404
        </p>
        <h1 className="mt-3 font-editorial text-4xl text-ink sm:text-5xl">
          Aradığınız sayfa tezgahta bulunamadı.
        </h1>
        <p className="mt-4 max-w-md text-base leading-relaxed text-stone">
          Sayfa taşınmış veya kaldırılmış olabilir. Ana sayfadaki sürgülü halı rafından ya da kataloğumuzdan keşfe devam edebilirsiniz.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button href="/" variant="primary">
            Ana Sayfaya Dön
          </Button>
          <Button href="/halilar" variant="secondary">
            Halıları Keşfet
          </Button>
        </div>
      </Container>
    </section>
  );
}
