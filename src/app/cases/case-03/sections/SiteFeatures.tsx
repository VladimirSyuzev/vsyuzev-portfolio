"use client";

import { useState } from "react";
import { useLang } from "@/lib/lang";
import { C3 } from "../i18n";

// C3-02 «Секция сайта» — 1:1 из Figma (node 2022:14474). Плотный мокап
// секции сайта Stablegate (белая карточка + 4 карточки-фичи с 3D) —
// единый растровый ассет (см. FIGMA-BRIEF §5).
//
// <640 (node 2695:19371) — по умолчанию вписан по ширине (375), по
// нажатию РАСКРЫВАЕТСЯ до ~2.8× в горизонтально-прокручиваемом окне,
// чтобы прочитать мелкий текст мини-лендинга (как «Гайд» в кейсе 1).


export default function SiteFeatures() {
  const t = C3[useLang()];
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full overflow-clip bg-[#fafafa] xl:h-[940px] xl:w-[1440px]">
      {/* <640 — карточка-мокап из Figma «case-03 · 375» (node 2711:14007),
          обрезана ровно по белому прямоугольнику карточки (1340×873, без
          тени и полей — иначе край тени на #fafafa читался как лишняя
          линия). Скругление + мягкая тень — CSS. Поля секции 20/64 — CSS
          (в отличие от 834/1440, где единый бейк всей секции). По нажатию
          РАСКРЫВАЕТСЯ в горизонтально-прокручиваемом окне (как «Гайд» к.1). */}
      <div className="px-[20px] py-[64px] sm:hidden">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label={t.tapToExpand}
          className={`group relative block w-full ${open ? "cursor-zoom-out" : "cursor-zoom-in"}`}
        >
          <div
            className={`no-scrollbar w-full rounded-[16px] shadow-[0_18px_50px_-20px_rgba(18,18,18,0.22)] ${
              open ? "overflow-x-auto" : "overflow-hidden"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={t.siteFeaturesCaption}
              width={1340}
              height={873}
              className={`block h-auto max-w-none transition-[width] duration-[500ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${
                open ? "w-[1000px]" : "w-full"
              }`}
              src="/cases/case-03/sections/site-features-375.jpg"
            />
          </div>
          {!open && (
            <span className="pointer-events-none absolute bottom-[10px] right-[10px] rounded-full bg-[#121212]/80 px-[10px] py-[4px] text-[11px] font-medium uppercase tracking-[0.22px] text-white">
              {t.tapToExpand}
            </span>
          )}
        </button>
      </div>

      {/* 640–1023 — свой бейк из Figma «case-03 · 834» (node 2695:18575,
          834×651): у него своя ширина белой карточки (778) и свои поля. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt={t.siteFeaturesCaption}
        className="hidden w-full sm:block lg:hidden"
        src="/cases/case-03/sections/site-features-834.jpg"
      />
      {/* ≥1024 — 1440-бейк. ≥1440 — фикс-канвас 1:1 из Figma; 1024–1439 —
          тот же ассет пропорционально во всю доступную ширину. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt={t.siteFeaturesCaption}
        className="hidden w-full lg:block xl:absolute xl:inset-0 xl:size-full"
        src="/cases/case-03/sections/site-features.jpg"
      />
    </div>
  );
}
