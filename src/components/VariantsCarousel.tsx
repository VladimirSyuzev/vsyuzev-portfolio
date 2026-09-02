"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/gsap";
import { useDrag } from "@/lib/useDrag";

// VariantsCarousel — общий трек «варианты» для кейсов 3/4/5. Механика:
// снап-карусель во всю ширину экрана, активная карточка по центру и
// вырастает (hSmall → hBig), перетаскивание вбок (курсор-рука).
//
// Эффект «лентикуляра» (по референсу reactbits lenticular-carousel, сам
// компонент из reactbits Pro — недоступен, воспроизведён по скриншоту):
//  · параллакс — картинка внутри карточки смещается против её ухода от
//    центра экрана и живёт за пальцем во время перетаскивания;
//  · переливание — голографический градиент + вертикальные «линзовые»
//    полосы поверх карточки, позиция блика едет вместе с карточкой;
//  · снизу — бар из сегментов (количество + активный) и стрелки ‹ ›.
export type VCard = { src: string; w: number; h: number; alt: string };

const GAP = 16;

export default function VariantsCarousel({
  cards,
  top,
  hSmall = 262,
  hBig = 399,
  tone = "light",
  radius = 18,
  onIndexChange,
  className,
}: {
  cards: VCard[];
  top: number;
  hSmall?: number;
  hBig?: number;
  tone?: "light" | "dark";
  radius?: number;
  onIndexChange?: (i: number) => void;
  className?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [center, setCenter] = useState(720);
  const [dragDX, setDragDX] = useState(0);
  const idxRef = useRef(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    idxRef.current = index;
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
  }, []);

  const widthOf = (c: VCard, big: boolean) => (big ? hBig : hSmall) * (c.w / c.h);

  const offsetFor = (active: number) => {
    let left = 0;
    for (let i = 0; i < active; i++) left += widthOf(cards[i], false) + GAP;
    return center - (left + widthOf(cards[active], true) / 2);
  };

  const step = (dir: number) =>
    setIndex((cur) => Math.max(0, Math.min(cards.length - 1, cur + dir)));

  const { dragging, bind } = useDrag({
    onMove: (dx) => {
      const cur = idxRef.current;
      const atEdge = (dx > 0 && cur === 0) || (dx < 0 && cur === cards.length - 1);
      setDragDX(atEdge ? dx * 0.32 : dx);
    },
    onEnd: (dx, vx) => {
      setDragDX(0);
      let d = 0;
      if (dx <= -70 || vx <= -0.4) d = 1;
      else if (dx >= 70 || vx >= 0.4) d = -1;
      step(d);
    },
  });

  const offset = offsetFor(index) + (dragging ? dragDX : 0);

  // Левый край каждой карточки в координатах ленты (для параллакса/блика).
  const lefts: number[] = [];
  {
    let x = 0;
    for (let i = 0; i < cards.length; i++) {
      lefts.push(x);
      x += widthOf(cards[i], i === index) + GAP;
    }
  }

  const ctrl = tone === "dark" ? "text-white" : "text-[#121212]";
  const seg = tone === "dark" ? "bg-white" : "bg-[#121212]";

  return (
    <div className={`absolute inset-x-0 ${className ?? ""}`} style={{ top }}>
      <div
        ref={trackRef}
        {...(reduced ? {} : bind)}
        className={`relative overflow-hidden touch-pan-y select-none ${
          reduced ? "" : dragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{ height: hBig }}
      >
        {reduced ? (
          <div className="no-scrollbar flex h-full items-center gap-[16px] overflow-x-auto pl-[46px] pr-[720px]">
            {cards.map((c) => (
              <div
                key={c.src}
                className="relative h-[262px] shrink-0 overflow-hidden"
                style={{ aspectRatio: `${c.w} / ${c.h}` }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt={c.alt} className="block size-full max-w-none object-cover" src={c.src} />
              </div>
            ))}
          </div>
        ) : (
          <div
            className="flex h-full items-center gap-[16px] will-change-transform"
            style={{
              transform: `translateX(${offset}px)`,
              transition: dragging ? "none" : "transform 550ms cubic-bezier(0.33,1,0.68,1)",
            }}
          >
            {cards.map((c, i) => {
              const cardW = widthOf(c, i === index);
              // смещение центра карточки от центра экрана (px)
              const d = offset + lefts[i] + cardW / 2 - center;
              const parallax = Math.max(-46, Math.min(46, -d * 0.05));
              // позиция голографического блика едет вместе с карточкой и
              // сильнее «ходит» во время перетаскивания.
              const shine = 50 - Math.max(-70, Math.min(70, d / 9));
              const active = i === index;
              return (
                <div
                  key={c.src}
                  data-active={active || undefined}
                  className="relative h-[262px] shrink-0 overflow-hidden transition-[height] duration-[450ms] ease-[cubic-bezier(0.33,1,0.68,1)] data-[active]:h-[399px]"
                  style={{ aspectRatio: `${c.w} / ${c.h}`, borderRadius: radius || undefined }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt={c.alt}
                    draggable={false}
                    className="block size-full max-w-none object-cover will-change-transform"
                    src={c.src}
                    style={{
                      transform: `translate3d(${parallax}px,0,0) scale(1.14)`,
                      transition: dragging ? "none" : "transform 550ms cubic-bezier(0.33,1,0.68,1)",
                    }}
                  />
                  {/* линзовые полосы — тонкий вертикальный «растр» линзы */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 mix-blend-soft-light opacity-60"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(90deg, rgba(255,255,255,0.12) 0 1px, rgba(0,0,0,0.08) 1px 3px)",
                    }}
                  />
                  {/* голографическая радуга — screen поверх (видна и на
                      тёмных кадрах), позиция едет вместе с карточкой */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 mix-blend-screen transition-opacity duration-300"
                    style={{
                      opacity: active ? 0.58 : 0.32,
                      backgroundSize: "300% 100%",
                      backgroundPosition: `${shine}% 0`,
                      backgroundImage:
                        "linear-gradient(100deg, transparent 22%, rgba(255,70,150,0.4) 34%, rgba(150,90,255,0.38) 42%, rgba(60,190,255,0.46) 49%, rgba(80,255,200,0.4) 57%, rgba(255,220,110,0.38) 65%, rgba(255,255,255,0.32) 71%, transparent 82%)",
                    }}
                  />
                  {/* та же радуга через overlay — добавляет насыщенности на
                      светлых участках кадра */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 mix-blend-overlay transition-opacity duration-300"
                    style={{
                      opacity: active ? 0.5 : 0.28,
                      backgroundSize: "300% 100%",
                      backgroundPosition: `${shine}% 0`,
                      backgroundImage:
                        "linear-gradient(100deg, transparent 24%, rgba(255,70,150,0.62) 35%, rgba(150,90,255,0.52) 43%, rgba(60,190,255,0.66) 50%, rgba(80,255,200,0.52) 58%, rgba(255,220,110,0.52) 66%, transparent 80%)",
                    }}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Бар состояния */}
      <div className={`mt-[26px] flex items-center justify-center gap-[18px] ${ctrl}`}>
        <button
          type="button"
          aria-label="Предыдущий вариант"
          onClick={() => step(-1)}
          disabled={index === 0}
          className="grid size-[28px] place-items-center opacity-60 transition-opacity hover:opacity-100 disabled:opacity-20"
        >
          <svg width="9" height="16" viewBox="0 0 9 16" fill="none">
            <path d="M8 1 1.5 8 8 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex items-center gap-[6px]">
          {cards.map((c, i) => (
            <button
              key={c.src}
              type="button"
              aria-label={`Вариант ${i + 1}`}
              aria-current={i === index || undefined}
              onClick={() => setIndex(i)}
              className={`h-[2px] rounded-full transition-all duration-300 ${seg} ${
                i === index ? "w-[26px] opacity-100" : "w-[16px] opacity-30"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Следующий вариант"
          onClick={() => step(1)}
          disabled={index === cards.length - 1}
          className="grid size-[28px] place-items-center opacity-60 transition-opacity hover:opacity-100 disabled:opacity-20"
        >
          <svg width="9" height="16" viewBox="0 0 9 16" fill="none">
            <path d="M1 1 7.5 8 1 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
