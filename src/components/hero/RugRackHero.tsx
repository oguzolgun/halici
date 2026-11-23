"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
  const [previewTab, setPreviewTab] = useState<"room" | "texture">("room");

  // User manual size selection override per rug (keyed by rug.id)
  const [selectedSizeByRug, setSelectedSizeByRug] = useState<Record<string, number>>({});

  // Compute active size index: use user selection for this rug if set, otherwise default to popular 160x230 size
  const defaultSizeIdx = useMemo(() => {
    if (!activeRug.sizeOptions || activeRug.sizeOptions.length === 0) return 0;
    const popularIdx = activeRug.sizeOptions.findIndex(
      (s) => s.label.includes("160x230") || s.label.includes("160 x 230")
    );
    return popularIdx !== -1 ? popularIdx : 0;
  }, [activeRug]);

  const selectedSizeIdx = selectedSizeByRug[activeRug.id] ?? defaultSizeIdx;

  const sizeOptions =
    activeRug.sizeOptions && activeRug.sizeOptions.length > 0
      ? activeRug.sizeOptions
      : [
          {
            label: activeRug.sizes[0] || "160x230 cm",
            widthCm: 160,
            lengthCm: 230,
            price: activeRug.priceFrom,
            stock: 8,
          },
        ];

  const currentSizeOption = sizeOptions[selectedSizeIdx] ?? sizeOptions[0];

  const STYLE_TABS = [
    { label: "Tüm Vitrin", targetIdx: 0 },
    { label: "Doğal Jüt", targetIdx: 3 },
    { label: "Vintage Eskitme", targetIdx: 1 },
    { label: "Mimari Kabartma", targetIdx: 0 },
    { label: "Doğal Yün", targetIdx: 5 },
    { label: "Çocuk Odası", targetIdx: 6 },
  ];

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

      {/* Editorial Hero Presentation Heading */}
      <Container className="relative z-20 mb-4 sm:mb-6 text-center max-w-3xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-terracotta-deep">
          Seç Halı Showroom Koleksiyonu
        </p>
        <h1 className="mt-1 font-editorial text-2xl sm:text-3xl lg:text-[40px] leading-[1.14] text-ink">
          Evinize yakışan halıyı güvenle seçin.
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-xs sm:text-sm leading-relaxed text-stone">
          Askıdaki halıları sürükleyerek veya ok tuşlarıyla dokuları inceleyin; odanıza ve bütçenize en uygun ebatı anında keşfedin.
        </p>
      </Container>

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

      {/* Visual Focal Pointer connecting hanging rack to the exhibition console */}
      <div className="relative z-20 flex justify-center -mb-2.5 pointer-events-none">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-line bg-ivory/95 px-3.5 py-1 text-[11px] font-semibold text-navy shadow-xs backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-terracotta animate-pulse" />
          <span>Şu An İncelenen Halı Künyesi</span>
        </div>
      </div>

      {/* Unified Showroom Exhibition Console */}
      <Container className="relative z-20 pb-10 pt-1 sm:pb-14">
        <div className="overflow-hidden rounded-2xl border border-line bg-ivory-soft/95 shadow-[0_16px_44px_rgba(20,33,58,0.08)] backdrop-blur-md">
          {/* Top Utility Bar: Live Showroom Badge + Style Jump Filters + Navigation */}
          <div className="flex flex-col gap-3 border-b border-line/75 bg-sand/35 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-7 sm:py-3.5">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-terracotta animate-pulse" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-navy">
                  Canlı Showroom Rafı
                </span>
              </div>

              {/* Style Quick Jump Chips (Desktop & Tablet) */}
              <div className="hidden lg:flex items-center gap-1.5 ml-3 border-l border-line/80 pl-3">
                {STYLE_TABS.map((tab) => {
                  const isCurrent = activeIndex === tab.targetIdx;
                  return (
                    <button
                      key={tab.label}
                      type="button"
                      onClick={() => snapToIndex(tab.targetIdx)}
                      className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors cursor-pointer ${
                        isCurrent
                          ? "bg-navy text-ivory font-semibold shadow-2xs"
                          : "text-stone hover:bg-sand/60 hover:text-ink"
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Slide Navigation & Indicator */}
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
                  className="relative h-1.5 w-20 sm:w-28 overflow-hidden rounded-full bg-sand"
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

          {/* Main Console Body: 2 Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-line/75">
            {/* Left Column: Living Space & Sensory Studio (5 cols) */}
            <div className="flex flex-col justify-between p-5 sm:p-7 lg:col-span-5 bg-sand/15 space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-terracotta-deep">
                    Mekan & Doku Önizlemesi
                  </span>
                  {/* Mode switcher tabs */}
                  <div className="inline-flex rounded-lg border border-line bg-ivory p-0.5 text-xs">
                    <button
                      type="button"
                      onClick={() => setPreviewTab("room")}
                      className={`rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors cursor-pointer ${
                        previewTab === "room"
                          ? "bg-navy text-ivory shadow-2xs font-semibold"
                          : "text-stone hover:text-ink"
                      }`}
                    >
                      Ev Ortamı
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewTab("texture")}
                      className={`rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors cursor-pointer ${
                        previewTab === "texture"
                          ? "bg-navy text-ivory shadow-2xs font-semibold"
                          : "text-stone hover:text-ink"
                      }`}
                    >
                      Doku Detayı
                    </button>
                  </div>
                </div>

                {/* Preview Viewport */}
                <div className="group relative h-48 sm:h-52 w-full overflow-hidden rounded-xl border border-line bg-ivory shadow-inner">
                  <Image
                    src={
                      previewTab === "room"
                        ? (activeRug.gallery[1] || activeRug.image)
                        : (activeRug.gallery[2] || activeRug.image)
                    }
                    alt={`${activeRug.name} ${previewTab === "room" ? "ev ortamı görünümü" : "doku detayı"}`}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 420px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-ivory text-xs">
                    <span className="font-medium drop-shadow-xs">
                      {previewTab === "room" ? "🛋️ Gerçek Zemin Perspektifi" : "🧶 Yakın Plan Dokuma & İplik"}
                    </span>
                    <span className="text-[10px] bg-ink/50 px-2 py-0.5 rounded-full backdrop-blur-xs">
                      {activeRug.weavingType}
                    </span>
                  </div>
                </div>
              </div>

              {/* 3 Practical Life Trust Badges */}
              <div className="grid grid-cols-3 gap-2 border-t border-line/75 pt-3 text-center">
                <div className="rounded-lg bg-ivory/80 p-2 border border-line/60">
                  <p className="text-[10px] font-medium text-stone">Hav Kalınlığı</p>
                  <p className="text-xs font-semibold text-ink mt-0.5">{activeRug.pileHeightMm} mm</p>
                </div>
                <div className="rounded-lg bg-ivory/80 p-2 border border-line/60">
                  <p className="text-[10px] font-medium text-stone">Robot Süpürge</p>
                  <p className="text-xs font-semibold text-navy mt-0.5">%100 Uyumlu</p>
                </div>
                <div className="rounded-lg bg-ivory/80 p-2 border border-line/60">
                  <p className="text-[10px] font-medium text-stone">Leke Dayanımı</p>
                  <p className="text-xs font-semibold text-terracotta-deep mt-0.5">Kolay Silinir</p>
                </div>
              </div>
            </div>

            {/* Right Column: Dynamic Active Rug Details & Size/Price Matrix (7 cols) */}
            <div className="flex flex-col justify-between p-5 sm:p-7 lg:col-span-7 bg-ivory/40 space-y-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeRug.id}
                  initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-4"
                >
                  {/* Top badges: Collection, Material & Star rating */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-sand/80 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-terracotta-deep">
                        {activeRug.collection}
                      </span>
                      <span aria-hidden="true" className="text-stone/40">•</span>
                      <span className="text-xs font-medium text-stone">
                        {activeRug.material}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-ink">
                      <div className="flex text-amber-500">
                        {"★".repeat(5)}
                      </div>
                      <span className="font-semibold">{activeRug.rating}</span>
                      <span className="text-stone text-[11px]">({activeRug.reviewCount} Değerlendirme)</span>
                    </div>
                  </div>

                  {/* Title & Short Description */}
                  <div>
                    <h2 className="font-editorial text-2xl sm:text-3xl text-ink">
                      {activeRug.name}
                    </h2>
                    <p className="mt-1 text-xs sm:text-sm text-stone leading-relaxed line-clamp-2">
                      {activeRug.shortDescription}
                    </p>
                  </div>

                  {/* Interactive Size Selector Pills */}
                  <div className="space-y-2 border-t border-line/75 pt-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-ink">
                        Ölçü Seçin:
                      </label>
                      <span className="text-[11px] text-stone">
                        {currentSizeOption.isRunner ? "Koridor / Yolluk boyutu" : "Salon & Yaşam boyutu"}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {sizeOptions.map((opt, sIdx) => {
                        const isSelected = sIdx === (sizeOptions[selectedSizeIdx] ? selectedSizeIdx : 0);
                        const isPopular = opt.label.includes("160x230") || opt.label.includes("160 x 230");
                        return (
                          <button
                            key={opt.label}
                            type="button"
                            onClick={() =>
                              setSelectedSizeByRug((prev) => ({
                                ...prev,
                                [activeRug.id]: sIdx,
                              }))
                            }
                            className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                              isSelected
                                ? "border-navy bg-navy text-ivory shadow-xs font-semibold"
                                : "border-line bg-ivory text-ink hover:border-navy/50 hover:bg-sand/40"
                            }`}
                          >
                            <span>{opt.label.replace(" cm", "")} cm</span>
                            {isPopular && (
                              <span className={`ml-1 text-[9px] font-semibold ${isSelected ? "text-sand" : "text-terracotta-deep"}`}>
                                ★ Popüler
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Price & Guarantee Row */}
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-t border-line/75 pt-3">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-editorial text-3xl font-bold text-navy">
                          {formatTRY(currentSizeOption.price)}
                        </span>
                        <span className="text-xs text-stone">KDV Dahil</span>
                      </div>
                      <p className="mt-0.5 text-[11px] text-stone">
                        Seçili ölçü için net fiyattır · Stokta son {currentSizeOption.stock} adet
                      </p>
                    </div>

                    <div className="text-[11px] text-terracotta-deep font-medium">
                      ✓ Ücretsiz Sigortalı Kargo
                    </div>
                  </div>

                  {/* Dual Action CTAs */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-1">
                    <Button
                      href={`/halilar/${activeRug.slug}?size=${encodeURIComponent(currentSizeOption.label)}`}
                      variant="primary"
                      size="lg"
                      className="flex-1 justify-center"
                    >
                      Halıyı İncele & Sipariş Ver →
                    </Button>

                    <Button
                      href={`/iletisim?numune=${encodeURIComponent(activeRug.name)}`}
                      variant="secondary"
                      size="lg"
                      className="justify-center"
                    >
                      Ücretsiz Numune İste
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
