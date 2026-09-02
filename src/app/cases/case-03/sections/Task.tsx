"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/gsap";
import { useDrag } from "@/lib/useDrag";
import Reveal from "@/components/Reveal";

// 01 Задача — 1:1 из актуальной Figma (node 2079:17694, высота 1672).
// Дисплейный заголовок 175px. Вводный абзац. Фрейм «варианты» (node
// 2079:17726) — снап-карусель маркетинговых форматов во всю ширину
// экрана: один тик колеса мыши центрирует СЛЕДУЮЩУЮ карточку (строго по
// центру экрана), она становится «ключевой» и вырастает с 262 до 399px
// по высоте (ширина — по пропорции). Соседние карточки уходят за края
// экрана и там обрезаются кромкой окна (не «жёстким» краем 1440-сетки).
// Сами изображения не обрезаются — соотношение сторон карточки равно
// соотношению картинки.
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

const widthOf = (c: (typeof CARDS)[number], big: boolean) => (big ? H_BIG : H_SMALL) * (c.w / c.h);

// Сдвиг ленты, при котором карточка `active` встаёт ровно по центру
// экрана (center — половина ширины окна, меряется в рантайме).
function offsetFor(active: number, center: number) {
  let left = 0;
  for (let i = 0; i < active; i++) left += widthOf(CARDS[i], false) + GAP;
  return center - (left + widthOf(CARDS[active], true) / 2);
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
  const [center, setCenter] = useState(720);
  const idxRef = useRef(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    idxRef.current = index;
  }, [index]);

  // Центр карусели = центр окна (лента тянется на всю ширину экрана).
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => setCenter(el.clientWidth / 2);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Перетаскивание вбок вместо колеса (см. useDrag): тянем ленту за
  // пальцем, на отпускании — шаг индекса по дистанции/скорости, иначе снап.
  const [dragDX, setDragDX] = useState(0);
  const { dragging, bind } = useDrag({
    onMove: (dx) => {
      const cur = idxRef.current;
      const atEdge = (dx > 0 && cur === 0) || (dx < 0 && cur === CARDS.length - 1);
      setDragDX(atEdge ? dx * 0.32 : dx);
    },
    onEnd: (dx, vx) => {
      setDragDX(0);
      const cur = idxRef.current;
      let step = 0;
      if (dx <= -70 || vx <= -0.4) step = 1;
      else if (dx >= 70 || vx >= 0.4) step = -1;
      setIndex(Math.max(0, Math.min(CARDS.length - 1, cur + step)));
    },
  });

  const offset = offsetFor(index, center) + (dragging ? dragDX : 0);

  return (
    <section className="relative w-full overflow-clip bg-[#fafafa]">
      <div className="relative mx-auto h-[1672px] w-[1440px]">
        <div className="absolute left-[46px] top-[143px] flex items-center gap-[24px] whitespace-nowrap font-heading text-[175px] font-bold uppercase leading-[1.1] tracking-[5.25px]">
          <p className="text-[#008cff]">01</p>
          <p className="text-[#121212]">Задача</p>
        </div>

        <p className="absolute left-[46px] top-[368px] w-[668px] text-[14px] uppercase leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
          Нужно было создать не набор отдельных иллюстраций, а визуальную систему, которая объясняет
          функциональность продукта без текста и работает в разных форматах и контекстах.
        </p>

        {/* Доодл-«молния» (Figma node 2384:21368 → 1216 / 394). */}
        <Reveal variant="doodle" className="absolute left-[1216px] top-[394px] z-10 h-[121px] w-[93px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="block size-full max-w-none" src={`${A}/task-doodle-flash.svg`} />
        </Reveal>

        <p className="absolute left-[726px] top-[1140px] w-[564px] text-[14px] font-medium leading-[1.2] tracking-[0.28px] text-[#121212]">
          Система должна была:
        </p>

        <div className="absolute left-[726px] top-[1169px] flex gap-[12px]">
          <div className="flex w-[328px] flex-col gap-[12px]">
            <Req head={REQS[0][0]} sub={REQS[0][1]} />
            <Req head={REQS[1][0]} sub={REQS[1][1]} />
          </div>
          <div className="flex w-[328px] flex-col gap-[12px]">
            <Req head={REQS[2][0]} sub={REQS[2][1]} />
            <Req head={REQS[3][0]} sub={REQS[3][1]} />
          </div>
        </div>

        {/* 3D-стек монет (Figma node 2399:35306, x216 / y1293, 328×328). */}
        <Reveal variant="fade" className="absolute left-[216px] top-[1293px] size-[328px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="Стек 3D-монет Stablegate" className="block size-full" src={`${A}/task-coin.jpg`} />
        </Reveal>

        <p className="absolute left-[726px] top-[1369px] w-[624px] font-heading text-[32px] font-normal uppercase leading-[1.1] tracking-[0.96px] text-[#121212]">
          Каждая иллюстрация должна была объяснять функцию продукта ещё до того, как пользователь
          прочитает текст
        </p>

        {/* Подчёркивание-доодл под итоговой мыслью (Figma node 2384:21369) —
            строго под последней строкой, текст не перекрывает. */}
        <Reveal
          variant="line"
          start="top 92%"
          className="absolute left-[884px] top-[1556px] h-[35px] w-[394px]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="block size-full max-w-none" src={`${A}/task-doodle-arrow.svg`} />
        </Reveal>
      </div>

      {/* Лента «варианты» — снап-карусель во всю ширину экрана, ключевая
          карточка по центру. Перетаскивание вбок. */}
      <div
        ref={wrapRef}
        {...(reduced ? {} : bind)}
        className={`absolute inset-x-0 top-[595px] h-[399px] touch-pan-y select-none overflow-hidden ${
          reduced ? "" : dragging ? "cursor-grabbing" : "cursor-grab"
        }`}
      >
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
            className="flex h-full items-center gap-[16px] will-change-transform"
            style={{
              transform: `translateX(${offset}px)`,
              transition: dragging ? "none" : "transform 550ms cubic-bezier(0.33,1,0.68,1)",
            }}
          >
            {CARDS.map((c, i) => (
              <div
                key={c.src}
                data-active={i === index || undefined}
                className="relative h-[262px] shrink-0 overflow-hidden transition-[height] duration-[450ms] ease-[cubic-bezier(0.33,1,0.68,1)] data-[active]:h-[399px]"
                style={{ aspectRatio: `${c.w} / ${c.h}` }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={c.alt}
                  draggable={false}
                  className="block size-full max-w-none object-cover"
                  src={`${A}/${c.src}`}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
