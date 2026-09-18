"use client";

import DrawIn from "@/components/DrawIn";
import { useLang } from "@/lib/lang";
import { C5 } from "../i18n";

// 03 Концепция — 1:1 из Figma (node 2210:74460, высота 900). Тёмный
// full-bleed. Заголовок «03 КОНЦЕПЦИЯ» (32px), текст слева и справа, два
// изображения (реальное фото DeLorean и постапокалиптический скетч) и
// доодл-стрелка.
//
// <1440 — единый резиновый flow (без FullBleedScale): раньше 3 холста
// (375/834/1280) держали 14px-текст внутри масштабируемого канваса — «плыл»
// вместе с холстом на промежуточных ширинах. Фото — как есть, без канваса,
// декор. Доодл-стрелки на <1440 нет (не было её и на 1280-канвасе).
const A = "/cases/case-05/sections";

export default function Concept() {
  const t = C5[useLang()];
  return (
    <>
      <div className="hidden w-full overflow-clip bg-[#121212] xl:block">
      <div className="relative mx-auto h-[900px] w-[1440px]">
        <div className="absolute left-[46px] top-[134px] flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
          <p className="text-[#008cff]">03</p>
          <p className="text-white">{t.conceptHeading}</p>
        </div>

        <p className="absolute left-[46px] top-[181px] w-[668px] text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70">
          {t.conceptPara1}
        </p>
        <p className="absolute left-[726px] top-[181px] w-[668px] text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70">
          {t.conceptPara2}
        </p>
        <p className="absolute left-[726px] top-[221px] w-[668px] text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70">
          {t.conceptPara3}
        </p>

        {/* Доодл-стрелка (Figma node 2284:39959). Геометрия и viewBox — из
            `export` (191×178, толщина обводки 6). Якорь: фоновый rect в
            экспорте имеет translate(-1249.32, -215), т.е. левый-верх SVG =
            точка секции (1249.32, 215) — НЕ bbox фрейма (1299.5), у SVG
            слева ~50px поля. */}
        <DrawIn
          src={`${A}/concept-arrow.svg`}
          fit="contain"
          className="absolute left-[1249.5px] top-[215px] z-10 h-[178px] w-[195px]"
        />

        {/* Фото + скетч (Figma frames 2223:80174 / 2215:79911 → y318, 668×427). */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={t.conceptPhotoAlt}
          className="absolute left-[46px] top-[318px] h-[427px] w-[668px] object-cover"
          src={`${A}/concept-photo.jpg`}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={t.conceptSketchAlt}
          className="absolute left-[726px] top-[318px] h-[427px] w-[668px] object-cover"
          src={`${A}/concept-sketch.jpg`}
        />
      </div>
      </div>

      <div className="flex w-full flex-col gap-[32px] bg-[#121212] px-[20px] py-[64px] sm:gap-[64px] sm:px-[28px] sm:py-[72px] lg:px-[40px] lg:py-[72px] xl:hidden">
        <div className="flex flex-col gap-[12px]">
          <div className="flex items-center gap-[12px] whitespace-nowrap font-heading text-[26px] font-bold uppercase leading-[1.1] tracking-[0.78px] sm:text-[32px] sm:tracking-[0.96px]">
            <span className="text-[#008cff]">03</span>
            <span className="text-white">{t.conceptHeading}</span>
          </div>
          <div className="flex flex-col gap-[12px] text-[14px] leading-[1.2] tracking-[0.28px] text-white sm:flex-row">
            <p className="opacity-70 sm:w-[calc(50%-6px)]">{t.conceptPara1}</p>
            <div className="flex flex-col gap-[6px] sm:w-[calc(50%-6px)]">
              <p className="opacity-70">{t.conceptPara2}</p>
              <p className="opacity-70">{t.conceptPara3}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[10.496px] sm:flex-row sm:gap-[12px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt={t.conceptPhotoAlt} className="block aspect-[335/216.566] w-full object-cover sm:hidden" src={`${A}/concept-img-1-375.jpg`} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt={t.conceptPhotoAlt} className="hidden aspect-[383/247.596] w-full object-cover sm:block sm:w-[calc(50%-6px)] lg:hidden" src={`${A}/concept-img-1-834.jpg`} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt={t.conceptPhotoAlt} className="hidden aspect-[594/384] w-full object-cover lg:block lg:w-[calc(50%-6px)]" src={`${A}/concept-img-1-1280.jpg`} />

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt={t.conceptSketchAlt} className="block aspect-[335/217.794] w-full object-cover sm:hidden" src={`${A}/concept-img-2-375.jpg`} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt={t.conceptSketchAlt} className="hidden aspect-[383/249] w-full object-cover sm:block sm:w-[calc(50%-6px)] lg:hidden" src={`${A}/concept-img-2-834.jpg`} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt={t.conceptSketchAlt} className="hidden aspect-[594/384] w-full object-cover lg:block lg:w-[calc(50%-6px)]" src={`${A}/concept-img-2-1280.jpg`} />
        </div>
      </div>
    </>
  );
}
