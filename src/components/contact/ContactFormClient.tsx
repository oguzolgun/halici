"use client";

import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { Button } from "../ui/Button";

export function ContactFormClient() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "Ölçü ve Model Danışmanlığı",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.includes("@") || !form.message.trim()) {
      setError("Lütfen adınız, geçerli e-posta adresiniz ve mesajınızı eksiksiz giriniz.");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-[14px] border border-line bg-ivory-soft p-8 text-center shadow-[var(--shadow-soft)] space-y-4">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-navy text-ivory">
          <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
        </div>
        <h3 className="font-editorial text-2xl text-ink">
          Mesajınız Ekibimize Ulaştı
        </h3>
        <p className="text-sm leading-relaxed text-stone">
          Teşekkürler {form.name}. Halı danışmanlarımız en geç 1 iş günü içinde{" "}
          <strong>{form.email}</strong> adresine dönüş yapacaktır.
        </p>
        <Button
          variant="secondary"
          onClick={() => {
            setSubmitted(false);
            setForm({
              name: "",
              email: "",
              subject: "Ölçü ve Model Danışmanlığı",
              message: "",
            });
          }}
        >
          Yeni Mesaj Gönder
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-[14px] border border-line bg-ivory-soft p-6 sm:p-8 space-y-5 shadow-[var(--shadow-soft)]"
    >
      <h2 className="font-editorial text-2xl text-ink">Bize Yazın</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-name"
            className="mb-1.5 block text-xs font-semibold text-ink"
          >
            Adınız Soyadınız *
          </label>
          <input
            id="contact-name"
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Örn: Zeynep Yılmaz"
            className="h-11 w-full rounded-[10px] border border-line bg-ivory px-3.5 text-sm text-ink focus:border-navy focus:outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="contact-email"
            className="mb-1.5 block text-xs font-semibold text-ink"
          >
            E-posta Adresiniz *
          </label>
          <input
            id="contact-email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="ornek@eposta.com"
            className="h-11 w-full rounded-[10px] border border-line bg-ivory px-3.5 text-sm text-ink focus:border-navy focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="contact-subject"
          className="mb-1.5 block text-xs font-semibold text-ink"
        >
          Konu
        </label>
        <select
          id="contact-subject"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          className="h-11 w-full rounded-[10px] border border-line bg-ivory px-3.5 text-sm text-ink focus:border-navy focus:outline-none"
        >
          <option>Ölçü ve Model Danışmanlığı</option>
          <option>Sipariş ve Teslimat Takibi</option>
          <option>İade & Değişim Talebi</option>
          <option>Kurumsal & Toptan İş Birliği</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="mb-1.5 block text-xs font-semibold text-ink"
        >
          Mesajınız *
        </label>
        <textarea
          id="contact-message"
          rows={4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Odanızın ölçüsü veya merak ettiğiniz halı hakkında detayları paylaşabilirsiniz..."
          className="w-full rounded-[10px] border border-line bg-ivory p-3.5 text-sm text-ink focus:border-navy focus:outline-none"
        />
      </div>

      {error && (
        <p role="alert" className="text-xs font-medium text-terracotta-deep">
          {error}
        </p>
      )}

      <Button type="submit" variant="primary" size="lg">
        <Send className="h-4 w-4" aria-hidden="true" />
        Mesajı Gönder
      </Button>
    </form>
  );
}
