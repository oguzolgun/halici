"use client";

import { useState } from "react";
import { Check, Mail } from "lucide-react";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";

export function NewsletterBlock() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@") || !email.includes(".")) {
      setStatus("error");
      return;
    }
    setStatus("success");
    setEmail("");
  };

  return (
    <section className="border-t border-line bg-navy py-16 text-ivory">
      <Container>
        <div className="mx-auto flex max-w-4xl flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="max-w-lg space-y-2.5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sand">
              Seç Halı E-Bülten
            </p>
            <h2 className="font-editorial text-3xl text-ivory sm:text-4xl">
              Yeni dokumalar ve dekorasyon notları
            </h2>
            <p className="text-sm leading-relaxed text-ivory/80">
              Mevsimsel koleksiyonlar, ölçü rehberleri ve yalnızca abonelere özel ilk sipariş ayrıcalıkları için ayda bir bülten gönderiyoruz.
            </p>
          </div>

          <div className="w-full max-w-md">
            {status === "success" ? (
              <div className="flex items-center gap-3 rounded-[14px] border border-ivory/25 bg-ivory/10 p-4 text-sm text-ivory">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-terracotta text-ivory">
                  <Check className="h-4 w-4" aria-hidden="true" />
                </span>
                <p>
                  Bültenimize kaydınız alındı. Hoş geldiniz indirim kodunuz e-posta kutunuzda.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-2.5">
                <div className="flex flex-col gap-2.5 sm:flex-row">
                  <label htmlFor="newsletter-email" className="sr-only">
                    E-posta adresiniz
                  </label>
                  <div className="relative flex-1">
                    <Mail
                      className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ivory/60"
                      aria-hidden="true"
                    />
                    <input
                      id="newsletter-email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (status === "error") setStatus("idle");
                      }}
                      placeholder="ornek@eposta.com"
                      className="h-12 w-full rounded-full border border-ivory/30 bg-ivory/10 pl-10 pr-4 text-sm text-ivory placeholder:text-ivory/60 focus:border-ivory focus:outline-none"
                    />
                  </div>
                  <Button type="submit" variant="ivory" size="md" className="h-12 shrink-0">
                    Abone Ol
                  </Button>
                </div>
                {status === "error" && (
                  <p className="pl-2 text-xs text-sand" role="alert">
                    Lütfen geçerli bir e-posta adresi giriniz.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
