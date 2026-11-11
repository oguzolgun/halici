"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowRight,
  ChevronDown,
  Heart,
  Menu,
  Search,
  ShoppingBag,
  User,
  X,
} from "lucide-react";
import { formatTRY, normalizeTurkish } from "@/lib/format";
import { useIsMounted } from "@/lib/hooks";
import { useCartStore } from "@/store/cart";
import { useFavoritesStore } from "@/store/favorites";
import type { RugProduct } from "@/types/rug";
import { Container } from "../ui/Container";

const MEGA_CATEGORIES = [
  { label: "Modern Halılar", href: "/halilar?kategori=Modern", desc: "Mimari kabartma & yalın çizgiler" },
  { label: "Vintage & Eskitme", href: "/halilar?kategori=Vintage", desc: "Madalyon mirasından modern yorumlar" },
  { label: "Doğal Jüt & Kilim", href: "/halilar?kategori=Do%C4%9Fal", desc: "Katkısız jüt, sisal ve yün kilimler" },
  { label: "Çocuk Odası", href: "/halilar?kategori=%C3%87ocuk", desc: "OEKO-TEX sertifikalı, yıkanabilir" },
  { label: "Yolluklar", href: "/halilar?kategori=Yolluk", desc: "Antre ve koridorlar için 80x150 / 80x300" },
];

const MEGA_ROOMS = [
  { label: "Salon & Oturma Odası", href: "/halilar?oda=Salon+%26+Oturma+Odas%C4%B1" },
  { label: "Yatak Odası", href: "/halilar?oda=Yatak+Odas%C4%B1" },
  { label: "Yemek Odası", href: "/halilar?oda=Yemek+Odas%C4%B1" },
  { label: "Çocuk Odası", href: "/halilar?oda=%C3%87ocuk+Odas%C4%B1" },
  { label: "Antre & Koridor", href: "/halilar?oda=Antre+%26+Koridor" },
];

const MEGA_SIZES = [
  { label: "80 x 150 cm", href: "/halilar?olcu=80+x+150+cm" },
  { label: "80 x 300 cm (Yolluk)", href: "/halilar?olcu=80+x+300+cm" },
  { label: "120 x 180 cm", href: "/halilar?olcu=120+x+180+cm" },
  { label: "160 x 230 cm", href: "/halilar?olcu=160+x+230+cm" },
  { label: "200 x 290 cm", href: "/halilar?olcu=200+x+290+cm" },
  { label: "240 x 340 cm", href: "/halilar?olcu=240+x+340+cm" },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const mounted = useIsMounted();
  const [scrolled, setScrolled] = useState(false);
  const [panelState, setPanelState] = useState<{
    kind: "mega" | "mobile" | "search" | "account" | null;
    path: string;
  }>({ kind: null, path: pathname });
  const [searchQuery, setSearchQuery] = useState("");

  const activePanel = panelState.path === pathname ? panelState.kind : null;
  const megaOpen = activePanel === "mega";
  const mobileOpen = activePanel === "mobile";
  const searchOpen = activePanel === "search";
  const accountOpen = activePanel === "account";

  const setMegaOpen = (open: boolean | ((prev: boolean) => boolean)) => {
    setPanelState((prev) => {
      const current = prev.path === pathname && prev.kind === "mega";
      const next = typeof open === "function" ? open(current) : open;
      return { kind: next ? "mega" : null, path: pathname };
    });
  };
  const setMobileOpen = (open: boolean | ((prev: boolean) => boolean)) => {
    setPanelState((prev) => {
      const current = prev.path === pathname && prev.kind === "mobile";
      const next = typeof open === "function" ? open(current) : open;
      return { kind: next ? "mobile" : null, path: pathname };
    });
  };
  const setSearchOpen = (open: boolean) =>
    setPanelState({ kind: open ? "search" : null, path: pathname });
  const setAccountOpen = (open: boolean) =>
    setPanelState({ kind: open ? "account" : null, path: pathname });

  const searchInputRef = useRef<HTMLInputElement>(null);
  const megaTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [catalogCache, setCatalogCache] = useState<RugProduct[] | null>(null);

  const cartItems = useCartStore((s) => s.items);
  const favoriteSlugs = useFavoritesStore((s) => s.slugs);
  const totalCount = mounted
    ? cartItems.reduce((acc, item) => acc + item.quantity, 0)
    : 0;

  // Lazy-load product index only when visitor opens Search or Favorites/Account drawer
  useEffect(() => {
    if (!searchOpen && !(accountOpen && favoriteSlugs.length > 0)) return;
    if (catalogCache) return;
    let active = true;
    import("@/lib/products").then((mod) => {
      if (active) setCatalogCache(mod.getAllRugs());
    });
    return () => {
      active = false;
    };
  }, [searchOpen, accountOpen, favoriteSlugs.length, catalogCache]);

  const favoriteRugs = useMemo(
    () =>
      mounted && catalogCache
        ? catalogCache.filter((r) => favoriteSlugs.includes(r.slug))
        : [],
    [mounted, catalogCache, favoriteSlugs]
  );

  const searchResults = useMemo(() => {
    if (!catalogCache) return [];
    const trimmed = searchQuery.trim();
    if (!trimmed) {
      return [...catalogCache]
        .sort((a, b) =>
          a.bestseller !== b.bestseller
            ? a.bestseller
              ? -1
              : 1
            : b.reviewCount - a.reviewCount
        )
        .slice(0, 5);
    }
    const normalized = normalizeTurkish(trimmed);
    return catalogCache
      .filter((rug) =>
        normalizeTurkish(
          [
            rug.name,
            rug.collection,
            rug.category,
            rug.style,
            rug.material,
            rug.colorName,
            rug.colorFamily,
            rug.shortDescription,
            ...rug.tags,
            ...rug.rooms,
          ].join(" ")
        ).includes(normalized)
      )
      .slice(0, 5);
  }, [catalogCache, searchQuery]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) {
      const id = setTimeout(() => searchInputRef.current?.focus(), 60);
      return () => clearTimeout(id);
    }
  }, [searchOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPanelState({ kind: null, path: pathname });
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [pathname]);

  const handleMegaEnter = () => {
    if (megaTimeoutRef.current) clearTimeout(megaTimeoutRef.current);
    setMegaOpen(true);
  };

  const handleMegaLeave = () => {
    megaTimeoutRef.current = setTimeout(() => setMegaOpen(false), 160);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    setSearchOpen(false);
    router.push(trimmed ? `/halilar?q=${encodeURIComponent(trimmed)}` : "/halilar");
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled
            ? "border-b border-line bg-ivory/90 shadow-[0_4px_20px_rgba(20,33,58,0.06)] backdrop-blur-md"
            : "border-b border-line/60 bg-ivory/80 backdrop-blur-sm"
        }`}
      >
        <Container className="flex h-[74px] items-center justify-between gap-4">
          {/* Left: Mobile hamburger + Brand SVG Logo */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
              aria-expanded={mobileOpen}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-navy transition-colors hover:bg-sand/60 lg:hidden cursor-pointer"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>

            <Link
              href="/"
              prefetch={false}
              aria-label="seç halı ana sayfa"
              className="inline-flex items-center rounded-md py-1 focus-visible:outline-navy"
            >
              <Image
                src="/brand/sec-hali-logo.svg"
                alt="seç halı"
                width={156}
                height={49}
                priority
                className="h-9 w-auto sm:h-10"
              />
            </Link>
          </div>

          {/* Center: Desktop Editorial Nav */}
          <nav
            aria-label="Ana menü"
            className="hidden items-center gap-8 lg:flex"
          >
            <div
              className="relative"
              onMouseEnter={handleMegaEnter}
              onMouseLeave={handleMegaLeave}
            >
              <button
                type="button"
                onClick={() => setMegaOpen((prev) => !prev)}
                aria-expanded={megaOpen}
                aria-controls="mega-menu-halilar"
                className={`inline-flex items-center gap-1.5 py-2 text-sm font-medium transition-colors cursor-pointer ${
                  pathname.startsWith("/halilar")
                    ? "text-navy font-semibold"
                    : "text-ink/85 hover:text-navy"
                }`}
              >
                <span>Halılar</span>
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-300 ${
                    megaOpen ? "rotate-180 text-terracotta-deep" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
            </div>

            <Link
              href="/#koleksiyonlar"
              prefetch={false}
              className="py-2 text-sm font-medium text-ink/85 transition-colors hover:text-navy"
            >
              Koleksiyonlar
            </Link>

            <Link
              href="/#secme-rehberi"
              prefetch={false}
              className="py-2 text-sm font-medium text-ink/85 transition-colors hover:text-navy"
            >
              Seçme Rehberi
            </Link>

            <Link
              href="/hakkimizda"
              prefetch={false}
              className={`py-2 text-sm font-medium transition-colors ${
                pathname === "/hakkimizda"
                  ? "text-navy font-semibold"
                  : "text-ink/85 hover:text-navy"
              }`}
            >
              Hakkımızda
            </Link>

            <Link
              href="/iletisim"
              prefetch={false}
              className={`py-2 text-sm font-medium transition-colors ${
                pathname === "/iletisim"
                  ? "text-navy font-semibold"
                  : "text-ink/85 hover:text-navy"
              }`}
            >
              İletişim
            </Link>
          </nav>

          {/* Right: Search, Account, Cart */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Halı ara"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-navy transition-colors hover:bg-sand/70 cursor-pointer"
            >
              <Search className="h-[19px] w-[19px]" strokeWidth={1.75} aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => setAccountOpen(true)}
              aria-label="Hesabım ve favoriler"
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-navy transition-colors hover:bg-sand/70 cursor-pointer"
            >
              <User className="h-[19px] w-[19px]" strokeWidth={1.75} aria-hidden="true" />
              {mounted && favoriteSlugs.length > 0 && (
                <span
                  aria-hidden="true"
                  className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-terracotta"
                />
              )}
            </button>

            <Link
              href="/sepet"
              prefetch={false}
              className="relative inline-flex h-10 items-center gap-2 rounded-full border border-line bg-ivory-soft px-3 text-navy transition-all hover:border-navy/40 hover:bg-sand/50"
            >
              <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden="true" />
              <span className="sr-only sm:not-sr-only sm:text-xs sm:font-semibold">
                Sepet{" "}
              </span>
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-navy px-1.5 text-[11px] font-semibold tabular-nums text-ivory">
                {totalCount}
              </span>
              <span className="sr-only"> ürün</span>
            </Link>
          </div>
        </Container>

        {/* Desktop Category Mega Menu */}
        {megaOpen && (
          <div
            id="mega-menu-halilar"
            onMouseEnter={handleMegaEnter}
            onMouseLeave={handleMegaLeave}
            className="absolute inset-x-0 top-full hidden border-b border-line bg-ivory/98 shadow-[0_24px_48px_rgba(20,33,58,0.12)] backdrop-blur-md transition-opacity duration-200 lg:block"
          >
            <Container className="grid grid-cols-12 gap-8 py-8">
              <div className="col-span-4 space-y-3 border-r border-line pr-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-terracotta-deep">
                  Kategoriler
                </p>
                <ul className="space-y-2.5">
                  {MEGA_CATEGORIES.map((cat) => (
                    <li key={cat.href}>
                      <Link
                        href={cat.href}
                        className="group block rounded-lg px-2.5 py-1.5 transition-colors hover:bg-sand/50"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-ink group-hover:text-navy">
                            {cat.label}
                          </span>
                          <ArrowRight className="h-3.5 w-3.5 text-stone opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" aria-hidden="true" />
                        </div>
                        <p className="text-xs text-stone">{cat.desc}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-span-3 space-y-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-terracotta-deep">
                  Odaya Göre
                </p>
                <ul className="space-y-2">
                  {MEGA_ROOMS.map((room) => (
                    <li key={room.href}>
                      <Link
                        href={room.href}
                        className="block py-1 text-sm text-ink/85 transition-colors hover:text-navy hover:underline underline-offset-4"
                      >
                        {room.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-span-2 space-y-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-terracotta-deep">
                  Ölçüye Göre
                </p>
                <ul className="space-y-2">
                  {MEGA_SIZES.map((sz) => (
                    <li key={sz.href}>
                      <Link
                        href={sz.href}
                        className="block py-1 text-sm text-ink/85 transition-colors hover:text-navy hover:underline underline-offset-4"
                      >
                        {sz.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Featured editorial spotlight */}
              <div className="col-span-3">
                <Link
                  href="/halilar/anadolu-geometrik-kilim"
                  className="group flex flex-col overflow-hidden rounded-[14px] border border-line bg-sand/40 p-3 transition-shadow hover:shadow-md"
                >
                  <div className="relative aspect-[3/2] w-full overflow-hidden rounded-[10px]">
                    <Image
                      src="/rugs/rug-05.jpg"
                      alt="Anadolu Geometrik Kilim"
                      fill
                      sizes="280px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-terracotta-deep">
                    Editörün Seçimi
                  </p>
                  <p className="mt-0.5 font-editorial text-base text-ink">
                    Anadolu Geometrik Kilim
                  </p>
                  <p className="text-xs text-stone-on-sand">
                    {formatTRY(2950)}&apos;den başlayan fiyatlarla →
                  </p>
                </Link>
              </div>
            </Container>
          </div>
        )}

        {/* Mobile Drawer Navigation */}
        {mobileOpen && (
          <div className="overflow-hidden border-t border-line bg-ivory lg:hidden">
            <Container className="space-y-5 py-6">
              <div className="space-y-1">
                <Link
                  href="/halilar"
                  className="block rounded-lg px-3 py-2.5 text-base font-semibold text-navy hover:bg-sand/50"
                >
                  Tüm Halılar
                </Link>
                {MEGA_CATEGORIES.map((cat) => (
                  <Link
                    key={cat.href}
                    href={cat.href}
                    className="block rounded-lg px-3 py-2 text-sm text-ink/90 hover:bg-sand/50"
                  >
                    {cat.label}
                  </Link>
                ))}
              </div>
              <div className="border-t border-line pt-4 space-y-1">
                <Link
                  href="/#secme-rehberi"
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-ink hover:bg-sand/50"
                >
                  Halı Seçme Rehberi
                </Link>
                <Link
                  href="/hakkimizda"
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-ink hover:bg-sand/50"
                >
                  Hakkımızda
                </Link>
                <Link
                  href="/iletisim"
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-ink hover:bg-sand/50"
                >
                  İletişim
                </Link>
              </div>
            </Container>
          </div>
        )}
      </header>

      {/* Search Modal */}
      {searchOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Halı arama penceresi"
          className="fixed inset-0 z-50 flex items-start justify-center bg-ink/40 px-4 pt-20 backdrop-blur-xs"
          onClick={() => setSearchOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl overflow-hidden rounded-[14px] border border-line bg-ivory shadow-[0_24px_60px_rgba(20,33,58,0.22)]"
          >
              <form
                onSubmit={handleSearchSubmit}
                className="flex items-center gap-3 border-b border-line px-4 py-3.5"
              >
                <Search className="h-5 w-5 text-navy" aria-hidden="true" />
                <input
                  ref={searchInputRef}
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Halı, koleksiyon, renk veya oda ara... (örn: jüt, lacivert, kilim)"
                  aria-label="Arama terimi"
                  className="w-full bg-transparent text-sm text-ink placeholder:text-stone focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  aria-label="Aramayı kapat"
                  className="rounded-full p-1.5 text-stone hover:bg-sand/60 hover:text-ink cursor-pointer"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </form>

              <div className="max-h-[60vh] overflow-y-auto p-4">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-stone">
                  {searchQuery.trim()
                    ? `"${searchQuery}" için sonuçlar`
                    : "Popüler Halılar"}
                </p>

                {searchResults.length === 0 ? (
                  <p className="py-8 text-center text-sm text-stone">
                    Eşleşen halı bulunamadı. Farklı bir kelime deneyebilirsiniz.
                  </p>
                ) : (
                  <ul className="divide-y divide-line/60">
                    {searchResults.map((rug) => (
                      <li key={rug.id}>
                        <Link
                          href={`/halilar/${rug.slug}`}
                          onClick={() => setSearchOpen(false)}
                          className="flex items-center gap-4 rounded-xl px-2 py-2.5 transition-colors hover:bg-sand/40"
                        >
                          <div className="relative h-16 w-11 shrink-0 overflow-hidden rounded-md bg-sand">
                            <Image
                              src={rug.image}
                              alt={rug.name}
                              fill
                              sizes="44px"
                              className="object-cover"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-[11px] uppercase tracking-wider text-stone">
                              {rug.collection}
                            </p>
                            <p className="truncate font-editorial text-base text-ink">
                              {rug.name}
                            </p>
                          </div>
                          <span className="text-sm font-semibold tabular-nums text-navy">
                            {formatTRY(rug.priceFrom)}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-4 border-t border-line pt-3 text-right">
                  <Link
                    href={
                      searchQuery.trim()
                        ? `/halilar?q=${encodeURIComponent(searchQuery.trim())}`
                        : "/halilar"
                    }
                    onClick={() => setSearchOpen(false)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy hover:text-terracotta-deep"
                  >
                    Tüm sonuçları katalogda gör <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
      )}

      {/* Account & Favorites Drawer Modal */}
      {accountOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Hesabım ve favoriler"
          className="fixed inset-0 z-50 flex justify-end bg-ink/40 backdrop-blur-xs"
          onClick={() => setAccountOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex h-full w-full max-w-md flex-col border-l border-line bg-ivory p-6 shadow-2xl"
          >
              <div className="flex items-center justify-between border-b border-line pb-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-terracotta-deep">
                    Seç Halı Üyelik
                  </p>
                  <h2 className="font-editorial text-2xl text-ink">
                    Favoriler & Hesabım
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setAccountOpen(false)}
                  aria-label="Paneli kapat"
                  className="rounded-full p-2 text-stone hover:bg-sand/60 hover:text-ink cursor-pointer"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <div className="mt-5 flex-1 overflow-y-auto space-y-6">
                <div className="rounded-[14px] border border-line bg-sand/40 p-4">
                  <p className="text-sm font-semibold text-ink">
                    Misafir Alışveriş Deneyimi
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-stone-on-sand">
                    Seç Halı&apos;da üye olmadan sepet oluşturabilir, beğendiğiniz halıları favorilerinize ekleyip daha sonra karşılaştırabilirsiniz.
                  </p>
                </div>

                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="flex items-center gap-2 text-sm font-semibold text-ink">
                      <Heart className="h-4 w-4 text-terracotta" aria-hidden="true" />
                      Favori Halılarınız ({favoriteRugs.length})
                    </h3>
                  </div>

                  {favoriteRugs.length === 0 ? (
                    <div className="rounded-[14px] border border-dashed border-line p-6 text-center">
                      <p className="text-sm text-stone">
                        Henüz favori halı eklemediniz.
                      </p>
                      <Link
                        href="/halilar"
                        onClick={() => setAccountOpen(false)}
                        className="mt-3 inline-block text-xs font-semibold text-navy underline underline-offset-4"
                      >
                        Koleksiyonları keşfedin
                      </Link>
                    </div>
                  ) : (
                    <ul className="space-y-3">
                      {favoriteRugs.map((rug) => (
                        <li key={rug.id}>
                          <Link
                            href={`/halilar/${rug.slug}`}
                            onClick={() => setAccountOpen(false)}
                            className="flex items-center gap-3 rounded-[12px] border border-line bg-ivory-soft p-2.5 transition-colors hover:bg-sand/40"
                          >
                            <div className="relative h-16 w-11 shrink-0 overflow-hidden rounded-md">
                              <Image
                                src={rug.image}
                                alt={rug.name}
                                fill
                                sizes="44px"
                                className="object-cover"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="truncate font-editorial text-sm text-ink">
                                {rug.name}
                              </p>
                              <p className="text-xs text-stone">
                                {formatTRY(rug.priceFrom)}&apos;den itibaren
                              </p>
                            </div>
                            <ArrowRight className="h-4 w-4 text-navy" aria-hidden="true" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <div className="border-t border-line pt-4">
                <Link
                  href="/sepet"
                  onClick={() => setAccountOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-navy py-3 text-sm font-medium text-ivory transition-colors hover:bg-terracotta-deep"
                >
                  Sepetime Git ({totalCount})
                </Link>
              </div>
            </div>
          </div>
      )}
    </>
  );
}
