"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/Reveal";
import { GLASS_BUBBLE } from "@/lib/glass";

// 05 Процесс — 1:1 из актуальной Figma (node 2022:14827, высота 2927).
// В новой версии Figma «Процесс», «Дизайн-система» и сет 3D-иконок слиты
// в один тёмный full-bleed раздел:
//  · заголовок 175px + вводный текст + доодл «»»»;
//  · трек «процесс» (node 2029:15514) — механика 1:1 как в кейсах 1 и 2
//    (наведённое колесо мыши гонит ленту ГОРИЗОНТАЛЬНО, нативный
//    scrollLeft), стекло-бабл — общий GLASS_BUBBLE (src/lib/glass.ts);
//  · «06 Дизайн-система» — текст + белая карточка из 4 3D-объектов;
//  · «Разные функции продукта. Один визуальный язык» в обводке-эллипсе;
//  · сет из 12 финальных 3D-иконок с подписями.
const A = "/cases/case-03/sections";

const STEPS = [
  { n: "01", title: "Sketch", desc: "Поиск идеи и композиции" },
  { n: "02", title: "Blocking", desc: "Построение базовых форм" },
  { n: "03", title: "Modeling", desc: "Создание финальной геометрии" },
  { n: "04", title: "Materials", desc: "Выбираем решение и согласовываем направление" },
  { n: "05", title: "Lighting", desc: "Постановка света и акцентов" },
  { n: "06", title: "Render", desc: "Финальный рендер и постобработка" },
  { n: "07", title: "Final Key Visual", desc: "Готовая иллюстрация" },
];

const PITCH = 340;

// Дизайн-система (Figma node 2387:22353) — белая карточка из 4 ОТДЕЛЬНЫХ
// 3D-объектов (не один запечённый ассет) + подписи. Ассеты 2x,
// прозрачный PNG, 262×262 в макете.
const DSYSTEM: [string, string][] = [
  ["dsystem-bank.png", "Bank"],
  ["dsystem-docs.png", "Supporting documents"],
  ["dsystem-onboarding.png", "Onboarding"],
  ["dsystem-manager.png", "Personal manager"],
];

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [padding, setPadding] = useState({ left: 46, right: 1440 / 2 - 164 });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width;
      if (!w) return;
      const gutter = Math.max(0, (w - 1440) / 2);
      setPadding({ left: 46 + gutter, right: w / 2 - 164 });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

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

  return (
    <div ref={sectionRef} className="relative h-[2927px] w-full overflow-clip bg-[#121212]">
      <div className="relative mx-auto h-full w-[1440px]">
        {/* — Процесс — */}
        <div className="absolute left-[46px] top-[143px] flex items-center gap-[24px] whitespace-nowrap font-heading text-[175px] font-bold uppercase leading-[1.1] tracking-[5.25px]">
          <p className="text-[#008cff]">05</p>
          <p className="text-white">Процесс</p>
        </div>

        <div className="absolute left-[46px] top-[457px] flex w-[670px] flex-col gap-[6px] text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70">
          <p>
            Каждая иллюстрация проходила один рабочий цикл: поиск метафоры, быстрый скетч,
            построение композиции, настройка материалов и освещения, затем финальный рендер.
          </p>
          <p>
            Такой подход позволял принимать ключевые решения на ранних этапах. Библиотека
            материалов и готовых объектов ускоряла создание новых сцен и помогала сохранять единый
            стиль.
          </p>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          className="absolute left-[46px] top-[580px] h-[286px] w-[1348px] max-w-none opacity-60"
          src={`${A}/process-stripes.svg`}
        />

        <Reveal variant="doodle" className="absolute left-[707px] top-[431px] z-10 h-[125px] w-[158px]">
          <img alt="" className="block size-full max-w-none" src={`${A}/process-doodle.svg`} />
        </Reveal>

        {/* — Дизайн-система — */}
        <div className="absolute left-1/2 top-[956px] flex -translate-x-1/2 items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
          <p className="text-[#008cff]">06</p>
          <p className="text-white">Дизайн-система</p>
        </div>

        <p className="absolute left-1/2 top-[1003px] w-[498px] -translate-x-1/2 text-center text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-80">
          Каждая иллюстрация создавалась как часть общей системы. Геометрия, материалы, освещение и
          цветовая палитра формировали единый визуальный язык независимо от темы конкретной сцены.
        </p>

        {/* Белая карточка из 4 ОТДЕЛЬНЫХ 3D-объектов + подписи
            (Figma node 2387:22353). */}
        <Reveal
          variant="fade"
          className="absolute left-[78px] top-[1143px] flex h-[399px] w-[1284px] items-center gap-[12px] rounded-[76px] bg-white px-[100px] py-[44px]"
        >
          {DSYSTEM.map(([src, label]) => (
            <div key={label} className="flex w-[262px] shrink-0 flex-col items-center gap-[12px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={label}
                className="block aspect-square w-full max-w-none object-contain"
                src={`${A}/${src}`}
              />
              <p className="w-full text-center text-[15.62px] font-medium leading-[1.44] text-[#2541ff]">
                {label}
              </p>
            </div>
          ))}
        </Reveal>

        {/* Обводка-эллипс вокруг фразы (Figma node 2387:22373). */}
        <Reveal
          variant="line"
          start="top 88%"
          className="absolute left-[408.24px] top-[1631.04px] h-[156px] w-[637px]"
        >
          <img alt="" className="block size-full max-w-none" src={`${A}/process-ellipse.svg`} />
        </Reveal>

        <p className="absolute left-1/2 top-[1676px] w-[669px] -translate-x-1/2 text-center font-heading text-[32px] font-normal uppercase leading-[1.1] tracking-[0.96px] text-white opacity-70">
          Разные функции продукта.
          <br />
          Один визуальный язык
        </p>

        {/* Сет из 12 3D-иконок (Figma node 2022:15013). */}
        <Reveal variant="fade" className="absolute left-[220px] top-[1984px] h-[738px] w-[1000px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="Сет из 12 3D-иконок Stablegate: Wallet, Bank, Gate, Onboarding, Fees, Coin, Security и др."
            className="block size-full"
            src={`${A}/process-iconset.jpg`}
          />
        </Reveal>
      </div>

      {/* Окно трека — во всю ширину экрана, горизонтальный скролл по колесу. */}
      <div
        ref={trackRef}
        className="no-scrollbar absolute left-0 top-[622px] h-[205px] w-full overflow-x-auto"
        style={{ paddingLeft: padding.left, paddingRight: padding.right, paddingTop: 40, paddingBottom: 40 }}
      >
        <div className="relative h-[125px] w-[2368px]">
          {STEPS.map((s, i) => (
            <div
              key={s.n}
              className={`absolute flex h-[125px] w-[328px] flex-col justify-center gap-[8px] border-[#008cff] ${GLASS_BUBBLE}`}
              style={{ left: i * PITCH, top: 0 }}
            >
              <p className="text-[14px] font-bold uppercase leading-[1.2] tracking-[0.84px] text-[#008cff]" style={{ fontFamily: "var(--font-body)" }}>
                {s.n}
              </p>
              <p className="text-[11px] font-medium uppercase leading-[1.2] tracking-[0.66px] text-white">{s.title}</p>
              <p className="text-[11px] leading-[1.2] tracking-[0.66px] text-white">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
