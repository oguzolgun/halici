"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
  type PanInfo,
} from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { formatTRY } from "@/lib/format";
import { useIsFinePointer } from "@/lib/hooks";
import type { RugProduct } from "@/types/rug";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";
import { PriceTag } from "../ui/PriceTag";

interface RugRackHeroProps {
  rugs: RugProduct[];
}

interface RackPanelProps {
  rug: RugProduct;
  index: number;
  initialIndex: number;
  activeIndex: number;
  trackX: MotionValue<number>;
  step: number;
  isDragging: boolean;
  shouldLoadImage: boolean;
  reducedMotion: boolean;
  onSelect: (index: number) => void;
}

/**
 * Individual hanging rug panel attached to the showroom brushed-steel rail.
 * Computes 3D perspective tilt, scale, depth shadow, and brightness continuously
 * from the shared trackX motion value while CSS .rack-stage holds exact geometry.
 */
function RackPanel({
  rug,
  index,
  initialIndex,
  activeIndex,
  trackX,
  step,
  isDragging,
  shouldLoadImage,
  reducedMotion,
  onSelect,
}: RackPanelProps) {
  // Continuous distance in slots relative to the viewport center (0 = active rug)
  const slotDistance = useTransform(
    trackX,
    (latestX) => index - initialIndex + latestX / step
  );

  const scale = useTransform(
    slotDistance,
    [-2.5, -1, 0, 1, 2.5],
    reducedMotion ? [0.96, 0.98, 1, 0.98, 0.96] : [0.87, 0.94, 1.05, 0.94, 0.87]
  );

  const rotateY = useTransform(
    slotDistance,
    [-2.5, -1, -0.3, 0, 0.3, 1, 2.5],
    reducedMotion ? [0, 0, 0, 0, 0, 0, 0] : [11, 8, 4.5, 0, -4.5, -8, -11]
  );

  const zOffset = useTransform(
    slotDistance,
    [-2, -1, 0, 1, 2],
    reducedMotion ? [0, 0, 0, 0, 0] : [-48, -18, 46, -18, -48]
  );

  const brightness = useTransform(
    slotDistance,
    [-2.5, -1, 0, 1, 2.5],
    [0.82, 0.9, 1, 0.9, 0.82]
  );

  const filterBrightness = useTransform(brightness, (b) => `brightness(${b})`);
  const isActive = index === activeIndex;
  const zIndex = 30 - Math.abs(index - activeIndex);

  return (
    <motion.div
      role="group"
      aria-roledescription="slide"
      aria-label={`${index + 1} / 12: ${rug.name}`}
      style={{
        position: "absolute",
        left: "50%",
        top: 0,
        width: "var(--rack-panel-w)",
        marginLeft: `calc(var(--rack-panel-w) / -2 + ${index - initialIndex} * var(--rack-step))`,
        zIndex,
        scale,
        rotateY,
        z: zOffset,
        filter: filterBrightness,
        transformStyle: "preserve-3d",
        transformOrigin: "50% 8%",
        willChange: isDragging ? "transform" : "auto",
      }}
      className="select-none"
    >
      {/* Brushed steel hanging clips connecting rug top edge to the showroom rail */}
      <div
        aria-hidden="true"
        className="pointer-events-none relative z-20 mx-auto flex w-[76%] items-end justify-between -mb-1"
      >
        {[0, 1].map((clipIdx) => (
          <div key={clipIdx} className="flex flex-col items-center">
            {/* Rail collar hook */}
            <div className="h-3 w-2.5 rounded-t-sm border border-[#777F8B] bg-gradient-to-b from-[#ECEFF3] to-[#9AA2AF] shadow-xs" />
            {/* Metal pinch clamp */}
            <div className="h-2.5 w-4 rounded-b-[3px] border border-[#67707C] bg-gradient-to-b from-[#DFE3E8] via-[#B4BCC7] to-[#87909D] shadow-[0_2px_4px_rgba(20,33,58,0.28)]" />
          </div>
        ))}
      </div>

      {/* Clickable Rug Panel */}
      <button
        type="button"
        onClick={() => onSelect(index)}
        aria-pressed={isActive}
        aria-label={`${String(index + 1).padStart(2, "0")} / 12: ${rug.name} — ${rug.collection}, ${formatTRY(rug.priceFrom)}'den başlayan fiyat. ${isActive ? "Şu an seçili" : "Ortaya getirmek için seçin"}`}
        className={`group relative block h-[297px] w-full overflow-hidden rounded-[6px] border transition-shadow duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy sm:h-[312px] lg:h-[327px] ${
          isActive
            ? "border-ink/20 shadow-[var(--shadow-rug-active)] cursor-grab active:cursor-grabbing"
            : "border-ink/10 shadow-[var(--shadow-rug-side)] cursor-pointer"
        }`}
      >
        {shouldLoadImage ? (
          <Image
            src={rug.image}
            alt={`${rug.name} halı dokusu`}
            fill
            priority={index < 3}
            fetchPriority={index === 2 ? "high" : undefined}
            loading={index < 3 ? undefined : "lazy"}
            draggable={false}
            quality={60}
            sizes="(max-width: 640px) 170px, 240px"
            className="pointer-events-none object-cover"
          />
        ) : (
          <div
            aria-hidden="true"
            className="h-full w-full bg-gradient-to-b from-sand/75 via-ivory to-sand/65"
          />
        )}

        {/* Subtle tactile textile weave overlay */}
        <div
          aria-hidden="true"
          className="rug-weave-overlay pointer-events-none absolute inset-0 opacity-45"
        />

        {/* Soft edge light highlight to mimic hanging wool depth */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/8 via-transparent to-ivory/15"
        />
      </button>

      {/* Short cotton fringes hanging at the bottom of the rug */}
      <div
        aria-hidden="true"
        className="rug-fringes pointer-events-none mx-0.5 opacity-95"
      />

      {/* Soft contact shadow cast onto the showroom wall behind/beneath the rug */}
      <div
        aria-hidden="true"
        className={`pointer-events-none mx-auto mt-1.5 h-3 w-[88%] rounded-full blur-md transition-opacity duration-500 ${
          isActive ? "bg-ink/22 opacity-100" : "bg-ink/14 opacity-70"
        }`}
      />
    </motion.div>
  );
}

/**
 * Interactive showroom hanging-rack hero ("Sürgülü Halı Rafı").
 * Supports pointer drag with release inertia & snap, horizontal trackpad/wheel
 * scrolling, left/right arrow keys, prev/next buttons, and accessible reduced-motion mode.
 */
export function RugRackHero({ rugs }: RugRackHeroProps) {
  const reducedMotion = Boolean(useReducedMotion());
  const stageRef = useRef<HTMLDivElement>(null);
  const wheelSnapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const didDragRef = useRef(false);

  // Responsive horizontal step metrics matching CSS .rack-stage breakpoints
  const [step, setStep] = useState(174);
  const [isWideStage, setIsWideStage] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Start on rug 03 ("03 / 12") so both sides of the hanging rack are populated immediately
  const initialIndex = Math.min(2, rugs.length - 1);
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [isDragging, setIsDragging] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(false);
  const [hasMovedPointer, setHasMovedPointer] = useState(false);
  const isFinePointer = useIsFinePointer();

  const trackX = useMotionValue(0);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothCursorX = useSpring(pointerX, { stiffness: 420, damping: 32 });
  const smoothCursorY = useSpring(pointerY, { stiffness: 420, damping: 32 });

  const activeIndexRef = useRef(activeIndex);
  const stepRef = useRef(step);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    stepRef.current = step;
  }, [step]);

  // Measure stage width via ResizeObserver callback
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const measureWidth = (width: number) => {
      let nextStep = 174;
      if (width < 640) {
        nextStep = 158;
      } else if (width < 1024) {
        nextStep = 166;
      }
      stepRef.current = nextStep;
      setStep(nextStep);
      setIsWideStage(width >= 640);
      trackX.set(-(activeIndexRef.current - initialIndex) * nextStep);
    };

    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? window.innerWidth;
      measureWidth(width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [initialIndex, trackX]);

  const snapToIndex = useCallback(
    (targetIdx: number, velocity = 0) => {
      const clamped = Math.max(0, Math.min(rugs.length - 1, targetIdx));
      setHasInteracted(true);
      setActiveIndex(clamped);
      const targetX = -(clamped - initialIndex) * stepRef.current;

      if (reducedMotion) {
        trackX.set(targetX);
        return;
      }

      animate(trackX, targetX, {
        type: "spring",
        stiffness: 260,
        damping: 30,
        mass: 0.9,
        velocity,
      });
    },
    [initialIndex, rugs.length, trackX, reducedMotion]
  );

  // Drag end with velocity-based inertia projection + nearest-rug snap
  const handleDragStart = () => {
    setHasInteracted(true);
    setIsDragging(true);
    didDragRef.current = true;
  };

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    setIsDragging(false);
    setTimeout(() => {
      didDragRef.current = false;
    }, 90);
    const currentStep = stepRef.current;
    const projectedX = trackX.get() + info.velocity.x * 0.16;
    const rawIdx = Math.round(initialIndex - projectedX / currentStep);
    snapToIndex(rawIdx, info.velocity.x);
  };

  // Horizontal wheel and trackpad swipe support (without hijacking vertical scroll)
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      const horizontalIntent =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey;
      if (!horizontalIntent) return;

      e.preventDefault();
      setHasInteracted(true);
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      const currentStep = stepRef.current;
      const minX = -(rugs.length - 1 - initialIndex) * currentStep;
      const maxX = initialIndex * currentStep;
      const nextX = Math.max(minX, Math.min(maxX, trackX.get() - delta * 0.9));
      trackX.set(nextX);

      const nearest = Math.max(
        0,
        Math.min(rugs.length - 1, Math.round(initialIndex - nextX / currentStep))
      );
      if (nearest !== activeIndexRef.current) {
        setActiveIndex(nearest);
      }

      if (wheelSnapTimer.current) clearTimeout(wheelSnapTimer.current);
      wheelSnapTimer.current = setTimeout(() => {
        snapToIndex(nearest);
      }, 130);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      if (wheelSnapTimer.current) clearTimeout(wheelSnapTimer.current);
    };
  }, [initialIndex, rugs.length, snapToIndex, trackX]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (
      e.key === "ArrowLeft" ||
      e.key === "ArrowRight" ||
      e.key === "Home" ||
      e.key === "End"
    ) {
      setHasInteracted(true);
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      snapToIndex(activeIndex - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      snapToIndex(activeIndex + 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      snapToIndex(0);
    } else if (e.key === "End") {
      e.preventDefault();
      snapToIndex(rugs.length - 1);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isFinePointer || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (x > 24 && x < rect.width - 24 && y > 8 && y < rect.height - 8) {
      pointerX.set(x);
      pointerY.set(y);
      if (!hasMovedPointer) setHasMovedPointer(true);
      if (!cursorVisible) setCursorVisible(true);
    } else {
      setCursorVisible(false);
    }
  };

  const activeRug = rugs[activeIndex] ?? rugs[0];
  const minTrackX = -(rugs.length - 1 - initialIndex) * step;
  const maxTrackX = initialIndex * step;
  const progressPercent = ((activeIndex + 1) / rugs.length) * 100;

  return (
    <section
      aria-label="Seç Halı vitrini"
      className="relative overflow-hidden border-b border-line bg-ivory pt-5 sm:pt-7 lg:pt-8"
    >
      {/* Showroom background wall with subtle ivory wash for contrast */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <Image
          src="/hero/showroom-wall.jpg"
          alt=""
          fill
          priority
          fetchPriority="high"
          quality={55}
          sizes="(max-width: 640px) 300px, 1080px"
          className="object-cover object-bottom opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ivory via-ivory/82 to-ivory/95" />
      </div>

      {/* Interactive Hanging Rack Carousel Stage */}
      <div
        ref={stageRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Sürgülü Halı Rafı"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onPointerEnter={() => isFinePointer && hasMovedPointer && setCursorVisible(true)}
        onPointerLeave={() => setCursorVisible(false)}
        onPointerMove={handlePointerMove}
        className={`rack-stage relative z-10 w-full select-none focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-navy ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
      >
        {/* Full-width Brushed Steel Rail */}
        <div
          aria-hidden="true"
          className="brushed-steel-rail pointer-events-none relative z-10 mx-auto h-2.5 w-full"
        />

        {/* Perspective Stage Viewport */}
        <div
          className="relative mx-auto h-[356px] w-full overflow-hidden pt-0 pb-3 sm:h-[372px] lg:h-[388px]"
          style={{
            perspective: "1200px",
          }}
        >
          {/* Draggable Track */}
          <motion.div
            drag="x"
            dragConstraints={{ left: minTrackX, right: maxTrackX }}
            dragElastic={0.14}
            dragMomentum={false}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            style={{
              x: trackX,
              transformStyle: "preserve-3d",
              willChange: isDragging ? "transform" : "auto",
            }}
            className="relative h-[342px] w-full sm:h-[358px] lg:h-[374px]"
          >
            {rugs.map((rug, idx) => (
              <RackPanel
                key={rug.id}
                rug={rug}
                index={idx}
                initialIndex={initialIndex}
                activeIndex={activeIndex}
                trackX={trackX}
                step={step}
                isDragging={isDragging}
                shouldLoadImage={
                  idx <= 3 ||
                  (isWideStage && idx <= 7) ||
                  hasInteracted ||
                  Math.abs(idx - activeIndex) <= 1
                }
                reducedMotion={reducedMotion}
                onSelect={(selectedIdx) => {
                  if (!didDragRef.current) snapToIndex(selectedIdx);
                }}
              />
            ))}
          </motion.div>

          {/* Soft side vignettes to frame the 12-rug showroom strip */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 z-30 hidden w-20 bg-gradient-to-r from-ivory via-ivory/60 to-transparent lg:block"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 z-30 hidden w-20 bg-gradient-to-l from-ivory via-ivory/60 to-transparent lg:block"
          />
        </div>

        {/* Custom floating circular "sürükle" cursor on desktop pointer hover */}
        {isFinePointer && !reducedMotion && (
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{
              opacity: cursorVisible && hasMovedPointer ? 1 : 0,
              scale: isDragging ? 0.85 : cursorVisible && hasMovedPointer ? 1 : 0.75,
            }}
            transition={{ duration: 0.2 }}
            style={{
              x: smoothCursorX,
              y: smoothCursorY,
              translateX: "-50%",
              translateY: "-50%",
            }}
            className="pointer-events-none absolute left-0 top-0 z-40 hidden h-14 w-14 items-center justify-center rounded-full border border-ivory/35 bg-navy/90 text-[11px] font-medium tracking-wide text-ivory shadow-[0_8px_20px_rgba(20,33,58,0.28)] backdrop-blur-xs md:flex"
          >
            {isDragging ? "bırak" : "sürükle"}
          </motion.div>
        )}
      </div>

      {/* Unified Showroom Exhibition Console */}
      <Container className="relative z-20 pb-10 pt-2 sm:pb-14">
        <div className="overflow-hidden rounded-2xl border border-line bg-ivory-soft/95 shadow-[0_16px_44px_rgba(20,33,58,0.06)] backdrop-blur-md">
          {/* Top Utility Bar: Live Showroom Badge + Integrated Rack Controls */}
          <div className="flex flex-col gap-3 border-b border-line/75 bg-sand/35 px-5 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-7 sm:py-3.5">
            <div className="flex items-center gap-2.5">
              <span className="flex h-2 w-2 rounded-full bg-terracotta animate-pulse" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-navy">
                Canlı Showroom Rafı
              </span>
              <span className="hidden text-stone/50 sm:inline" aria-hidden="true">
                •
              </span>
              <span className="hidden text-xs text-stone sm:inline">
                Sürükleyin veya ok tuşlarıyla dokuları inceleyin
              </span>
            </div>

            {/* Integrated Controls */}
            <div className="flex items-center justify-between gap-3 sm:justify-end">
              <button
                type="button"
                onClick={() => snapToIndex(activeIndex - 1)}
                disabled={activeIndex === 0}
                aria-label="Önceki halı"
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line bg-ivory text-navy transition-all hover:border-navy hover:bg-sand/60 disabled:pointer-events-none disabled:opacity-30 cursor-pointer shadow-2xs"
              >
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              </button>

              <div className="flex items-center gap-2.5">
                <span
                  aria-live="polite"
                  className="w-12 shrink-0 text-center text-xs font-semibold tabular-nums tracking-wider text-ink"
                >
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(rugs.length).padStart(2, "0")}
                </span>

                <div
                  role="progressbar"
                  aria-label="Raf konumu"
                  aria-valuemin={1}
                  aria-valuemax={rugs.length}
                  aria-valuenow={activeIndex + 1}
                  className="relative h-1.5 w-24 sm:w-36 overflow-hidden rounded-full bg-sand"
                >
                  <div
                    className="h-full rounded-full bg-navy transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => snapToIndex(activeIndex + 1)}
                disabled={activeIndex === rugs.length - 1}
                aria-label="Sonraki halı"
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line bg-ivory text-navy transition-all hover:border-navy hover:bg-sand/60 disabled:pointer-events-none disabled:opacity-30 cursor-pointer shadow-2xs"
              >
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Main Console Body: 2 Columns smoothly integrated with a subtle divider */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-line/75">
            {/* Left Column: Editorial Headline & Brand CTA */}
            <div className="flex flex-col justify-between p-6 sm:p-7 lg:col-span-5 space-y-4">
              <div className="space-y-2.5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-terracotta-deep">
                  Seç Halı Showroom Koleksiyonu
                </p>
                <h1 className="font-editorial text-2xl leading-[1.12] text-ink sm:text-3xl lg:text-[32px]">
                  Evinize yakışan halıyı seçin.
                </h1>
                <p className="text-xs sm:text-sm leading-relaxed text-stone">
                  Binlerce halı, güvenle seçin. Rafı sürükleyerek veya ok tuşlarıyla koleksiyonu keşfedin.
                </p>
              </div>

              <div className="pt-2">
                <Button href="/halilar" variant="secondary" size="md">
                  Tüm Koleksiyonu Gör
                </Button>
              </div>
            </div>

            {/* Right Column: Dynamic Active Rug Details */}
            <div className="flex flex-col justify-center p-6 sm:p-7 lg:col-span-7 bg-ivory/50">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeRug.id}
                  initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center"
                >
                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-sand/80 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-terracotta-deep">
                        {activeRug.collection}
                      </span>
                      <span aria-hidden="true" className="text-stone/40">
                        •
                      </span>
                      <span className="text-xs font-medium text-stone">
                        {activeRug.material}
                      </span>
                    </div>

                    <h2 className="truncate font-editorial text-xl text-ink sm:text-2xl lg:text-[26px]">
                      {activeRug.name}
                    </h2>

                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-stone">
                      <span className="font-medium text-ink">Ölçüler:</span>
                      <span className="text-[11px] sm:text-xs">
                        {activeRug.sizes.join(" · ")}
                      </span>
                    </div>
                  </div>

                  <div className="flex shrink-0 flex-col items-start gap-2.5 border-t border-line/70 pt-3 sm:items-end sm:border-t-0 sm:pt-0">
                    <PriceTag amount={activeRug.priceFrom} fromPrefix size="lg" />

                    <Button
                      href={`/halilar/${activeRug.slug}`}
                      variant="primary"
                      size="md"
                    >
                      Halıyı İncele
                    </Button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
