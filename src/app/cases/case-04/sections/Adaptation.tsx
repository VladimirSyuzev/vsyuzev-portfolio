"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/gsap";
import Reveal from "@/components/Reveal";

// 05 Адаптация — 1:1 из актуальной Figma (node 2118:32680, высота 1676).
// Тёмный full-bleed. Дисплейный заголовок «05 / АДАПТАЦИЯ» (175px), два
// абзаца, доодл-«звёздочка», крупная мысль в обводке.
//
// Трек «варианты» (Figma frame 2440:59724) — снап-карусель форматов во всю
// ширину экрана (механика 1:1 как «Задача» в кейсе 3): один тик колеса =
// следующая карточка. Активная карточка встаёт по ЦЕНТРУ экрана и
// вырастает (262→399h по высоте, ширина — по пропорции ассета), предыдущая
// уменьшается обратно до размера остальных. Без CSS-скруглений — как в
// исходных ассетах.
const A = "/cases/case-04/sections";

// Ассеты пользователя (adapt-1…8.jpg). w/h — соотношение сторон формата.
const CARDS = [
  { src: "adapt-1.jpg", w: 533, h: 798, alt: "Вертикальный постер CRYPTO. PAYMENTS. SETTLED." },
  { src: "adapt-2.jpg", w: 1153, h: 798, alt: "Формат 3:2 с фотографией и белой панелью" },
  { src: "adapt-3.jpg", w: 1089, h: 798, alt: "Формат с двумя постерами" },
  { src: "adapt-4.jpg", w: 1196, h: 798, alt: "Горизонтальный формат с фотографией" },
  { src: "adapt-5.jpg", w: 1411, h: 798, alt: "Широкий горизонтальный формат" },
  { src: "adapt-6.jpg", w: 1620, h: 798, alt: "Билборд-формат" },
  { src: "adapt-7.jpg", w: 1800, h: 675, alt: "Вытянутый билборд-формат" },
  { src: "adapt-8.jpg", w: 1800, h: 615, alt: "Панорамный билборд-формат" },
];

const GAP = 16;
const H_SMALL = 262;
const H_BIG = 399;

const widthOf = (c: (typeof CARDS)[number], big: boolean) => (big ? H_BIG : H_SMALL) * (c.w / c.h);

// Сдвиг ленты, при котором карточка `active` центрируется по экрану.
function offsetFor(active: number, center: number) {
  let left = 0;
  for (let i = 0; i < active; i++) left += widthOf(CARDS[i], false) + GAP;
  return center - (left + widthOf(CARDS[active], true) / 2);
}

export default function Adaptation() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [center, setCenter] = useState(720);
  const idxRef = useRef(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    idxRef.current = index;
  }, [index]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const measure = () => setCenter(el.clientWidth / 2);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el || reduced) return;
    let locked = false;
    function onWheel(e: WheelEvent) {
      const dir = e.deltaY > 0 ? 1 : -1;
      const cur = idxRef.current;
      if ((dir < 0 && cur === 0) || (dir > 0 && cur === CARDS.length - 1)) return;
      e.preventDefault();
      if (locked) return;
      locked = true;
      setIndex(cur + dir);
      window.setTimeout(() => {
        locked = false;
      }, 600);
    }
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [reduced]);

  const offset = offsetFor(index, center);

  return (
    <div className="relative h-[1676px] w-full overflow-clip bg-[#121212]">
      <div className="relative mx-auto h-full w-[1440px]">
        {/* Дисплейный заголовок (Figma frame 2118:32684 → x46 / y87, 175px). */}
        <div className="absolute left-[46px] top-[87px] flex flex-col font-heading text-[175px] font-bold uppercase leading-[1.1] tracking-[5.25px]">
          <span className="text-[#008cff]">05</span>
          <span className="text-white">Адаптация</span>
        </div>

        <p className="absolute left-[726px] top-[529px] w-[491px] text-[14px] uppercase leading-[1.2] tracking-[0.28px] text-white opacity-70">
          После разработки ключевого формата система была адаптирована под разные outdoor-носители и
          соотношения сторон
        </p>

        {/* Доодл-«звёздочка» (Figma node 2284:39980 → x1150 / y529, 158×125). */}
        <Reveal variant="doodle" className="absolute left-[1150px] top-[529px] z-10 h-[125px] w-[158px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="block size-full max-w-none" src={`${A}/asterisk.png`} />
        </Reveal>

        <p className="absolute left-[726px] top-[1140px] w-[498px] text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70">
          Белая панель, крупная типографика, фотография и фирменная цветовая среда сохранялись во
          всех версиях. При этом менялись пропорции блоков, масштаб текста и положение изображения,
          чтобы коммуникация оставалась читаемой в любом формате.
        </p>

        {/* Обводка-эллипс (Figma node 2401:35701 → x290 / y1377, 884×130). */}
        <Reveal variant="line" start="top 88%" className="absolute left-[290px] top-[1377px] h-[130px] w-[884px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="block size-full max-w-none" src={`${A}/adapt-ellipse.svg`} />
        </Reveal>
        {/* Мысль (Figma node 2401:35699 → x338 / y1407, w765, по центру). */}
        <p className="absolute left-1/2 top-[1407px] w-[765px] -translate-x-1/2 text-center font-heading text-[32px] font-normal uppercase leading-[1.1] tracking-[0.96px] text-white opacity-70">
          Один Key Visual адаптируется под разные носители без потери идеи
        </p>
      </div>

      {/* Снап-карусель форматов — во всю ширину экрана, активная карточка
          по центру (Figma frame 2440:59724, первая карточка h399). */}
      <div ref={trackRef} className="absolute inset-x-0 top-[654px] h-[399px] overflow-hidden">
        {reduced ? (
          <div className="no-scrollbar flex h-full items-center gap-[16px] overflow-x-auto pl-[46px] pr-[720px]">
            {CARDS.map((c) => (
              <div
                key={c.src}
                className="relative h-[262px] shrink-0 overflow-hidden"
                style={{ aspectRatio: `${c.w} / ${c.h}` }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt={c.alt} className="block size-full max-w-none object-cover" src={`${A}/${c.src}`} />
              </div>
            ))}
          </div>
        ) : (
          <div
            className="flex h-full items-center gap-[16px] transition-transform duration-[550ms] ease-[cubic-bezier(0.33,1,0.68,1)] will-change-transform"
            style={{ transform: `translateX(${offset}px)` }}
          >
            {CARDS.map((c, i) => (
              <div
                key={c.src}
                data-active={i === index || undefined}
                className="relative h-[262px] shrink-0 overflow-hidden transition-[height] duration-[450ms] ease-[cubic-bezier(0.33,1,0.68,1)] data-[active]:h-[399px]"
                style={{ aspectRatio: `${c.w} / ${c.h}` }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt={c.alt} className="block size-full max-w-none object-cover" src={`${A}/${c.src}`} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
