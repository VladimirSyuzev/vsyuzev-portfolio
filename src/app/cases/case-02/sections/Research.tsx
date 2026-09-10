"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import DrawIn from "@/components/DrawIn";
import { useMinWidth } from "@/lib/breakpoint";

// 02 Исследование — на десктопе (≥1200) абсолют 1:1 из Figma (node
// 2009:12143, высота 1065). Ниже 1200 — поток: заголовок + вводный текст
// по левому краю, документ-карточки (единый экспорт 1008×645) на всю
// ширину сетки, доодл-«лупа» только на десктопе.
//
// 375 (Figma 2646:39222): карточки по умолчанию вписаны по ширине (335),
// по нажатию раскрываются до 1:1 в горизонтально-прокручиваемом окне —
// приём один в один с «Гайдом» кейса 1 (src/app/cases/case-01/sections/Guide.tsx).
const A = "/cases/case-02/sections";
const CARDS_ALT =
  "Список из 10 сервисов Yandex Cloud с метафорами, поиск формы иконок и итоговые иконки";

export default function Research() {
  const sm = useMinWidth(640);
  const [open, setOpen] = useState(false);

  return (
    <section className="w-full bg-[#fafafa] xl:relative xl:mx-auto xl:h-[1065px] xl:w-[1440px] xl:overflow-clip">
      {/* 375: заголовок→текст gap 12 (Figma 2631:4721). 1280: gap ≈24, py 72. */}
      <div className="flex flex-col gap-[12px] px-[var(--grid-margin)] py-[64px] sm:gap-[24px] sm:py-[72px] xl:contents">
        <div className="flex flex-col whitespace-nowrap font-heading text-[26px] font-bold uppercase leading-[1.1] tracking-[0.78px] sm:flex-row sm:items-center sm:gap-[12px] sm:text-[32px] sm:tracking-[0.96px] xl:absolute xl:left-[46px] xl:top-[134px] xl:text-[32px]">
          <p className="text-[#008cff]">02</p>
          <p className="text-[#121212]">Исследование</p>
        </div>

        {/* 375: интро на всю ширину 335. 1280 (Figma 2613:16468): интро почти во
            всю ширину — п.1 ≈889, п.2 ≈1062. */}
        <div className="flex flex-col gap-[6px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] sm:max-w-none lg:max-w-[1062px] xl:absolute xl:left-[46px] xl:top-[181px] xl:w-[498px]">
          <p className="opacity-70 lg:w-[889px] lg:max-w-full">
            Метафоры сервисов уже существовали, поэтому мы не искали новые образы, а переосмысляли
            знакомые символы внутри нового визуального языка. Для этого анализировали предыдущую
            библиотеку, первые примеры новых иконок и визуальные референсы.
          </p>
          <p className="opacity-70">
            Главной целью было сохранить узнаваемость сервисов и привести их к единому стилю.
          </p>
        </div>

        {/* Доодл-«лупа» — только на десктопе. */}
        <DrawIn
          src={`${A}/research-doodle.svg`}
          fit="contain"
          delay={0.1}
          className="hidden xl:absolute xl:left-[582px] xl:top-[138px] xl:z-10 xl:block xl:h-[168px] xl:w-[138px]"
        />

        {/* Карточки-документ — единый экспорт 1008×645 (макет 1440). 375: по
            нажатию раскрывается 1:1 (как «Гайд» кейса 1). */}
        {!sm ? (
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? "Свернуть карточки исследования" : "Раскрыть карточки исследования 1:1"}
            className={`group relative block w-full ${open ? "cursor-zoom-out" : "cursor-zoom-in"}`}
          >
            <div className={`no-scrollbar w-full ${open ? "overflow-x-auto" : "overflow-hidden"}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={CARDS_ALT}
                width={1008}
                height={645}
                className={`block h-auto max-w-none transition-[width] duration-[500ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${
                  open ? "w-[1008px]" : "w-full"
                }`}
                src={`${A}/research-cards.png`}
              />
            </div>
            {!open && (
              <span className="pointer-events-none absolute bottom-[10px] right-[10px] rounded-full bg-[#121212]/80 px-[10px] py-[4px] text-[11px] font-medium uppercase tracking-[0.22px] text-white">
                нажмите, чтобы раскрыть
              </span>
            )}
          </button>
        ) : (
          <Reveal
            variant="fade"
            className="w-full lg:mx-auto lg:max-w-[1008px] xl:absolute xl:left-[216px] xl:top-[318px] xl:h-[644.735px] xl:w-[1008px]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt={CARDS_ALT} className="block w-full" src={`${A}/research-cards.png`} />
          </Reveal>
        )}
      </div>
    </section>
  );
}
