"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useReducedMotion } from "@/lib/gsap";
import Reveal from "@/components/Reveal";

// 06 Финальный результат — 1:1 из актуальной Figma (node 2210:78310,
// высота 1149). Пользователь перекомпоновал секцию: заголовок «06 /
// ФИНАЛЬНЫЙ РЕЗУЛЬТАТ» и два абзаца — слева (x46), доодл-«звёздочка»
// справа, крупная мысль в обводке по центру.
//
// Ряд «варианты» (Figma frame 2440:56862) — снап-карусель во всю ширину
// экрана, механика и свойства 1:1 как «Адаптация» в кейсе 4: один тик
// колеса = следующая карточка; активная встаёт по центру и вырастает
// (262→399h), ширина — по пропорции ассета. Первая карточка (карта Mad
// Max DeLorean) центрирована при загрузке.
const A = "/cases/case-05/sections";

// Ассеты пользователя (case-05/варианты → result-var-1…4). Все ~1265×798.
const CARDS = [
  { src: "result-var-1.png", w: 1265, h: 798, alt: "Готовая карта Mad Max DeLorean" },
  { src: "result-var-2.png", w: 1270, h: 798, alt: "Карта в интерьере проекта" },
  { src: "result-var-3.png", w: 1271, h: 798, alt: "Карта среди других карт коллекции" },
  { src: "result-var-4.png", w: 1267, h: 798, alt: "Фрагмент финальной иллюстрации" },
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

export default function Result() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [center, setCenter] = useState(720);
  const idxRef = useRef(0);
  const starRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    idxRef.current = index;
  }, [index]);

  // Доодл-«звёздочка» реагирует на каждое переключение карточки —
  // короткий «пульс»: увеличение и возврат в норму (по просьбе).
  // Первый рендер (index 0) пропускаем.
  const starFirst = useRef(true);
  useEffect(() => {
    if (starFirst.current) {
      starFirst.current = false;
      return;
    }
    if (reduced || !starRef.current) return;
    gsap.fromTo(
      starRef.current,
      { scale: 1, rotate: 0 },
      {
        scale: 1.22,
        rotate: -4,
        duration: 0.16,
        ease: "power2.out",
        yoyo: true,
        repeat: 1,
        transformOrigin: "50% 50%",
        onComplete: () => gsap.set(starRef.current, { clearProps: "scale,rotate" }),
      },
    );
  }, [index, reduced]);

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
    <div className="relative h-[1149px] w-full overflow-x-clip bg-[#fafafa]">
      <div className="relative mx-auto h-full w-[1440px]">
        {/* Заголовок — слева (Figma frame 2210:78313 → x46 / y134). */}
        <div className="absolute left-[46px] top-[134px] flex items-center gap-[16px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
          <p className="text-[#008cff]">06</p>
          <p className="text-[#121212]">Финальный результат</p>
        </div>

        {/* Два абзаца — слева (Figma nodes 2210:78311 → y181, 2412:4340 → y221). */}
        <p className="absolute left-[46px] top-[181px] w-[496px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
          Вместо очередной интерпретации машины времени появился новый образ культового автомобиля.
        </p>
        <p className="absolute left-[46px] top-[221px] w-[496px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
          DeLorean сохранил узнаваемый силуэт, но оказался в другой реальности — мире, где главной
          ценностью становится не возможность путешествовать во времени, а способность выжить и
          продолжать движение вперёд.
        </p>

        {/* Доодл-«звёздочка» (Figma node 2284:39991 → x1009 / y270, 158×125).
            Reveal — появление по скроллу; внутренний div (starRef) —
            «пульс» при каждом переключении карточки карусели. */}
        <Reveal variant="doodle" className="absolute left-[1009px] top-[270px] z-10 h-[125px] w-[158px]">
          <div ref={starRef} className="size-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" className="block size-full max-w-none" src={`${A}/result-star.svg`} />
          </div>
        </Reveal>

        {/* Обводка-эллипс вокруг мысли (Figma node 2412:4342). Геометрия из
            `export`; якорь по translate фонового rect: левый-верх SVG =
            точка секции (389.39, 865.61); viewBox расширен на поля (-4/-24),
            поэтому смещаем элемент на эти же поля. */}
        <Reveal variant="line" start="top 86%" className="absolute left-[385px] top-[842px] h-[254px] w-[670px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="block size-full max-w-none" src={`${A}/result-ellipse.svg`} />
        </Reveal>
        {/* Мысль (Figma node 2412:4341 → x386 / y924, w668, по центру). */}
        <p className="absolute left-1/2 top-[924px] w-[668px] -translate-x-1/2 text-center font-heading text-[32px] font-normal uppercase leading-[1.1] tracking-[0.96px] text-[#121212] opacity-70">
          Узнаваемый автомобиль получил историю, которую раньше с ним не связывали
        </p>
      </div>

      {/* Снап-карусель «варианты» — во всю ширину экрана, активная карточка
          по центру (Figma frame 2440:56862 → y386, первая карточка h399). */}
      <div ref={trackRef} className="absolute inset-x-0 top-[386px] h-[399px] overflow-hidden">
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
