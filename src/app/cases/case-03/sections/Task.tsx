"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/gsap";
import Reveal from "@/components/Reveal";

// 01 Задача — 1:1 из актуальной Figma (node 2079:17694, высота 1672).
// Дисплейный заголовок 175px. Вводный абзац. Фрейм «варианты» (node
// 2079:17726) — снап-карусель маркетинговых форматов: один тик колеса
// мыши центрирует СЛЕДУЮЩУЮ карточку (строго по центру фрейма), она
// становится «ключевой» и вырастает с 262 до 399px по высоте (ширина —
// по пропорции), соседние остаются маленькими. Изображения не
// обрезаются — соотношение сторон карточки равно соотношению картинки.
// Ниже — «Система должна была:» + 4 требования с галочками, крупная
// итоговая мысль с подчёркиванием и 3D-стек монет слева.
const A = "/cases/case-03/sections";

// 4 карточки фрейма «варианты» (Figma node 2079:17726) — ассеты 2x,
// экспортированы пользователем. w/h = соотношение сторон карточки.
const CARDS = [
  { src: "variant1.jpg", w: 1419, h: 798, alt: "Слайд презентации: Transparent pricing 0,5–2%" },
  { src: "variant2.jpg", w: 639, h: 798, alt: "Пост: Move digital assets with confidence" },
  { src: "variant3.jpg", w: 798, h: 798, alt: "Пост: Payments without delays" },
  { src: "variant4.jpg", w: 1197, h: 798, alt: "Пост: Real-time transactions" },
];

const GAP = 16;
const H_SMALL = 262;
const H_BIG = 399;
// Центр фрейма «варианты» = центр 1440-сетки (сама сетка центрирована в
// окне, поэтому это же и центр экрана).
const CENTER = 720;

const widthOf = (c: (typeof CARDS)[number], big: boolean) => (big ? H_BIG : H_SMALL) * (c.w / c.h);

// Сдвиг ленты, при котором карточка `active` встаёт ровно по центру.
function offsetFor(active: number) {
  let left = 0;
  for (let i = 0; i < active; i++) left += widthOf(CARDS[i], false) + GAP;
  return CENTER - (left + widthOf(CARDS[active], true) / 2);
}

const REQS: [string, string][] = [
  ["Сохранять", "визуальную целостность"],
  ["Объяснять", "особенности продукта"],
  ["Масштабироваться", "в маркетинговых материалах"],
  ["Использоваться", "на любом фоне"],
];

function Req({ head, sub }: { head: string; sub: string }) {
  return (
    <div className="flex h-[34px] gap-[8px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="" className="h-[34px] w-[28px] shrink-0" src={`${A}/task-check.svg`} />
      <p className="text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
        {head}
        <br />
        {sub}
      </p>
    </div>
  );
}

export default function Task() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const idxRef = useRef(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    idxRef.current = index;
  }, [index]);

  // Колесо мыши над лентой → один тик = следующая/предыдущая карточка.
  // На краях ленты колесо не перехватываем — страница скроллится обычно.
  useEffect(() => {
    const el = wrapRef.current;
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

  const offset = offsetFor(index);

  return (
    <div className="relative h-[1672px] w-[1440px] overflow-clip bg-[#fafafa]">
      <div className="absolute left-[46px] top-[143px] flex items-center gap-[24px] whitespace-nowrap font-heading text-[175px] font-bold uppercase leading-[1.1] tracking-[5.25px]">
        <p className="text-[#008cff]">01</p>
        <p className="text-[#121212]">Задача</p>
      </div>

      <p className="absolute left-[46px] top-[368px] w-[668px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
        Нужно было создать не набор отдельных иллюстраций, а визуальную систему, которая объясняет
        функциональность продукта без текста и работает в разных форматах и контекстах.
      </p>

      {/* Лента «варианты» — снап-карусель, ключевая карточка по центру. */}
      <div ref={wrapRef} className="absolute inset-x-0 top-[527px] h-[399px] overflow-hidden">
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

      {/* Доодл-«молния» (Figma node 2384:21368). */}
      <Reveal variant="doodle" className="absolute left-[1195.74px] top-[396.96px] h-[107px] w-[85px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" className="block size-full max-w-none" src={`${A}/task-doodle-flash.svg`} />
      </Reveal>

      <p className="absolute left-[726px] top-[1003px] w-[564px] text-[14px] font-medium leading-[1.2] tracking-[0.28px] text-[#121212]">
        Система должна была:
      </p>

      <div className="absolute left-[726px] top-[1032px] flex gap-[12px]">
        <div className="flex w-[328px] flex-col gap-[12px]">
          <Req head={REQS[0][0]} sub={REQS[0][1]} />
          <Req head={REQS[1][0]} sub={REQS[1][1]} />
        </div>
        <div className="flex w-[328px] flex-col gap-[12px]">
          <Req head={REQS[2][0]} sub={REQS[2][1]} />
          <Req head={REQS[3][0]} sub={REQS[3][1]} />
        </div>
      </div>

      {/* 3D-стек монет (Figma node 2399:35306, x216 / y1201, 328×328). */}
      <Reveal variant="fade" className="absolute left-[216px] top-[1201px] size-[328px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="Стек 3D-монет Stablegate" className="block size-full" src={`${A}/task-coin.jpg`} />
      </Reveal>

      <p className="absolute left-[726px] top-[1277px] w-[624px] font-heading text-[32px] font-normal uppercase leading-[1.1] tracking-[0.96px] text-[#121212]">
        Каждая иллюстрация должна была объяснять функцию продукта ещё до того, как пользователь
        прочитает текст
      </p>

      {/* Подчёркивание-доодл под итоговой мыслью (Figma node 2384:21369) —
          строго под последней строкой, текст не перекрывает. */}
      <Reveal
        variant="line"
        start="top 92%"
        className="absolute left-[884px] top-[1462px] h-[35px] w-[394px]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" className="block size-full max-w-none" src={`${A}/task-doodle-arrow.svg`} />
      </Reveal>
    </div>
  );
}
