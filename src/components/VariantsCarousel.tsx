"use client";

import { useEffect, useRef, useState } from "react";
import TrackArrows from "@/components/TrackArrows";
import { edgeFadeMaskStyle } from "@/lib/edgeFadeMask";
import { useStepCarousel } from "@/lib/useStepCarousel";

// VariantsCarousel — общий трек «варианты» для кейсов 3/4/5. Снап-карусель
// во всю ширину экрана: активная карточка по центру и вырастает
// (hSmall → hBig), перетаскивание вбок (курсор-рука), колесо/жест трекпада
// (один жест = одна карточка), боковые стрелки ‹ › (TrackArrows) по краям
// трека. Бара из сегментов снизу НЕТ (по просьбе пользователя — как у ленты
// «Шаблоны» в кейсе «AI-пайплайн»). Механика жестов — общий useStepCarousel.
//
// По просьбе пользователя: без параллакса, без «переливания» и без
// скруглений. Изображение показывается ЦЕЛИКОМ и в состоянии ключевой
// карточки, и в состоянии второстепенной (контейнер держит соотношение
// сторон ассета, картинка object-contain — ничего не обрезается).
export type VCard = { src: string; w: number; h: number; alt: string };

const GAP = 16;

export default function VariantsCarousel({
  cards,
  top,
  hSmall = 262,
  hBig = 399,
  gap = GAP,
  activeGap = 0,
  maxActiveWidth,
  tone = "light",
  onIndexChange,
  className,
}: {
  cards: VCard[];
  top: number;
  hSmall?: number;
  hBig?: number;
  // Зазор между карточками (по умолчанию 16) и ДОПОЛНИТЕЛЬНЫЙ отступ по бокам
  // активной карточки (по умолчанию 0) — для макетов, где рядом с крупной
  // карточкой зазор больше (Figma «Итог» кейса 2: 12 между мелкими, 28 у крупной).
  gap?: number;
  activeGap?: number;
  // Ограничитель ширины ключевой (активной) карточки. Если по hBig карточка
  // шире maxActiveWidth — она ужимается по ширине до maxActiveWidth, высота
  // уменьшается пропорционально (нужно на узких экранах: панорамные билборды
  // 3:1 иначе вылезают за вьюпорт).
  maxActiveWidth?: number;
  tone?: "light" | "dark";
  onIndexChange?: (i: number) => void;
  className?: string;
}) {
  const activeCardRef = useRef<HTMLDivElement>(null);
  const [center, setCenter] = useState(720);
  // Фактический зазор (px) от краёв трека до краёв активной карточки —
  // измеряется по реальному рендеру, чтобы край-маска гарантированно не
  // наезжала на ключевое изображение, даже если карточка не по центру.
  const [clear, setClear] = useState<{ l: number; r: number } | null>(null);
  const { trackRef, index, setIndex, step, dragging, bind, dragDX, reduced, last } = useStepCarousel(cards.length);

  useEffect(() => {
    onIndexChange?.(index);
  }, [index, onIndexChange]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const measure = () => setCenter(el.clientWidth / 2);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [trackRef]);

  // Высота активной карточки: hBig, либо меньше — если по hBig ширина
  // превысила бы maxActiveWidth (тогда ужимаемся по ширине, сохраняя AR).
  const bigHeightOf = (c: VCard) => {
    const w = hBig * (c.w / c.h);
    return maxActiveWidth && w > maxActiveWidth ? maxActiveWidth * (c.h / c.w) : hBig;
  };
  const widthOf = (c: VCard, big: boolean) =>
    (big ? bigHeightOf(c) : hSmall) * (c.w / c.h);

  const offsetFor = (active: number) => {
    let left = 0;
    for (let i = 0; i < active; i++) left += widthOf(cards[i], false) + gap;
    return center - (left + activeGap + widthOf(cards[active], true) / 2);
  };

  const offset = offsetFor(index) + (dragging ? dragDX : 0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => {
      const card = activeCardRef.current;
      if (!card) return;
      const tr = track.getBoundingClientRect();
      const cr = card.getBoundingClientRect();
      if (!tr.width) return;
      setClear({ l: cr.left - tr.left, r: tr.right - cr.right });
    };
    // после следующего кадра (когда translateX трека реально отрисован),
    // плюс контрольный замер после transition сдвига
    const raf = requestAnimationFrame(() => requestAnimationFrame(measure));
    const t = window.setTimeout(measure, 620);
    const onScroll = () => measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [index, center, dragging, trackRef]);

  return (
    <div className={`absolute inset-x-0 ${className ?? ""}`} style={{ top }}>
      <div
        ref={trackRef}
        {...(reduced ? {} : bind)}
        className={`relative overflow-hidden touch-pan-y select-none ${
          reduced ? "" : dragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{
          height: hBig,
          ...edgeFadeMaskStyle(center * 2, {
            adaptive: true,
            clearLeft: clear?.l,
            clearRight: clear?.r,
          }),
        }}
      >
        {reduced ? (
          <div className="no-scrollbar flex h-full items-center gap-[16px] overflow-x-auto pl-[46px] pr-[720px]">
            {cards.map((c) => (
              <div
                key={c.src}
                className="relative shrink-0"
                style={{ height: hSmall, aspectRatio: `${c.w} / ${c.h}` }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt={c.alt} className="block size-full max-w-none object-contain" src={c.src} />
              </div>
            ))}
          </div>
        ) : (
          <div
            className="flex h-full items-center will-change-transform"
            style={{
              gap,
              transform: `translateX(${offset}px)`,
              transition: dragging ? "none" : "transform 550ms cubic-bezier(0.33,1,0.68,1)",
            }}
          >
            {cards.map((c, i) => (
              <div
                key={c.src}
                ref={i === index ? activeCardRef : undefined}
                data-active={i === index || undefined}
                onClick={() => setIndex(i)}
                className={`relative shrink-0 transition-[height,margin] duration-[450ms] ease-[cubic-bezier(0.33,1,0.68,1)] ${i === index ? "" : "cursor-pointer"}`}
                style={{
                  height: i === index ? bigHeightOf(c) : hSmall,
                  aspectRatio: `${c.w} / ${c.h}`,
                  marginInline: i === index ? activeGap : 0,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={c.alt}
                  draggable={false}
                  className="block size-full max-w-none object-contain"
                  src={c.src}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Боковые кнопки ‹ › — снаружи трека (на нём mask, она отключила бы
          backdrop-blur кнопок), по центру ряда карточек. Бара снизу нет. */}
      <TrackArrows
        className="absolute inset-x-0 top-0"
        style={{ height: hBig }}
        onDark={tone === "dark"}
        onPrev={() => step(-1)}
        onNext={() => step(1)}
        canPrev={index > 0}
        canNext={index < last}
      />
    </div>
  );
}
