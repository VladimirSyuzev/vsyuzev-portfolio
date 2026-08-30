"use client";

import { useEffect, useRef } from "react";
import Reveal from "@/components/Reveal";

// 01 Задача — 1:1 из актуальной Figma (node 2079:17694, высота 1672).
// Дисплейный заголовок 175px. Вводный абзац. Фрейм «варианты» (node
// 2079:17726) — горизонтальная лента маркетинговых форматов: механика та
// же, что у трека «Процесс» в кейсах 1 и 2 (наведённое колесо мыши гонит
// ленту ГОРИЗОНТАЛЬНО, нативный scrollLeft). Отличие: карточка, оказавшаяся
// в центре экрана, становится «ключевой» — вырастает с 262 до 399px по
// высоте (ширина — по пропорции), соседние остаются маленькими.
// Ниже — «Система должна была:» + 4 требования с галочками, крупная
// итоговая мысль с подчёркиванием и 3D-стек монет слева.
const A = "/cases/case-03/sections";

// 4 карточки фрейма «варианты» (Figma node 2079:17726). w/h — размеры
// карточки в макете (не пикселя ассета); ассеты — экспорт узлов 2x.
const CARDS = [
  { src: "task-var-hero.png", w: 709, h: 399, alt: "Слайд презентации: Transparent pricing 0,5–2%" },
  { src: "task-var-post1.png", w: 210, h: 262, alt: "Пост: Move digital assets with confidence" },
  { src: "task-var-post2.png", w: 262, h: 262, alt: "Пост: Payments without delays" },
  { src: "task-var-twitter.png", w: 393, h: 262, alt: "Пост: Real-time transactions" },
];

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
  const trackRef = useRef<HTMLDivElement>(null);

  // Колесо мыши над лентой → горизонтальный scrollLeft (как трек «Процесс»).
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    function onWheel(e: WheelEvent) {
      if (!el) return;
      const delta = e.deltaY;
      const atStart = el.scrollLeft <= 0;
      const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 1;
      if ((delta < 0 && atStart) || (delta > 0 && atEnd)) return;
      el.scrollLeft += delta;
      e.preventDefault();
    }
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  // Карточка, ближайшая к центру экрана, помечается data-active — CSS
  // растит её с 262 до 399px по высоте (transition). rAF-троттлинг.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let raf = 0;
    function update() {
      raf = 0;
      if (!el) return;
      const mid = window.innerWidth / 2;
      const cards = Array.from(el.querySelectorAll<HTMLElement>(".varcard"));
      let best = -1;
      let bestDist = Infinity;
      cards.forEach((c, i) => {
        const r = c.getBoundingClientRect();
        const d = Math.abs(r.left + r.width / 2 - mid);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      cards.forEach((c, i) => {
        if (i === best) c.setAttribute("data-active", "");
        else c.removeAttribute("data-active");
      });
    }
    function onScroll() {
      if (!raf) raf = requestAnimationFrame(update);
    }
    update();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

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

      {/* Лента «варианты» — Figma node 2079:17726, x350 / y527, h399.
          Колесо мыши гонит горизонтально; центральная карточка вырастает. */}
      <div
        ref={trackRef}
        className="vartrack no-scrollbar absolute left-[350px] right-0 top-[527px] flex h-[399px] items-center gap-[16px] overflow-x-auto pr-[720px]"
      >
        {CARDS.map((c) => (
          <div
            key={c.src}
            className="varcard relative h-[262px] shrink-0 overflow-hidden rounded-[16px] transition-[height] duration-[450ms] ease-[cubic-bezier(0.33,1,0.68,1)] data-[active]:h-[399px] motion-reduce:transition-none"
            style={{ aspectRatio: `${c.w} / ${c.h}` }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt={c.alt} className="block h-full w-full max-w-none object-cover" src={`${A}/${c.src}`} />
          </div>
        ))}
      </div>

      {/* Доодл-«молния» (Figma node 2384:21368). */}
      <Reveal variant="doodle" className="absolute left-[1195.74px] top-[396.96px] h-[107px] w-[85px]">
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

      <p className="absolute left-[726px] top-[1277px] w-[589px] font-heading text-[32px] font-normal uppercase leading-[1.1] tracking-[0.96px] text-[#121212]">
        Каждая иллюстрация должна была объяснять функцию продукта ещё до того, как пользователь
        прочитает текст
      </p>

      {/* Подчёркивание-доодл под итоговой мыслью (Figma node 2384:21369). */}
      <Reveal
        variant="line"
        start="top 92%"
        className="absolute left-[876px] top-[1441.94px] h-[35px] w-[394px]"
      >
        <img alt="" className="block size-full max-w-none" src={`${A}/task-doodle-arrow.svg`} />
      </Reveal>
    </div>
  );
}
