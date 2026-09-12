"use client";

import DrawIn from "@/components/DrawIn";
import { useLang } from "@/lib/lang";
import { C2 } from "../i18n";

// 03 Визуальный язык — тёмный full-bleed блок (#121212 на всю ширину).
// На десктопе (≥1200) внутренний контент — абсолют 1:1 из Figma (node
// 2236:94095, высота 1377). Ниже 1200 — поток: заголовок, оба абзаца,
// фото (резка металла) на всю ширину сетки, обводка-эллипс скрыта.
const A = "/cases/case-02/sections";

export default function VisualLanguage() {
  const lang = useLang();
  const t = C2[lang];
  return (
    <div className="w-full overflow-clip bg-[#121212]">
      <div className="mx-auto w-full max-w-[1440px] xl:relative xl:h-[1377px]">
        {/* 1280 (Figma 2613:16469): заголовок + 2 абзаца (595) в общем блоке
            gap 12, дальше фото 1200×536, дальше цитата 672. Крупные группы gap 64. */}
        <div className="flex flex-col gap-[32px] px-[var(--grid-margin)] py-[64px] sm:gap-[64px] sm:py-[72px] xl:contents">
          <div className="flex flex-col gap-[12px] lg:w-[595px] lg:max-w-full xl:contents">
            <div className="flex flex-col whitespace-nowrap font-heading text-[26px] font-bold uppercase leading-[1.1] tracking-[0.78px] sm:flex-row sm:items-center sm:gap-[12px] sm:text-[32px] sm:tracking-[0.96px] xl:absolute xl:left-[44px] xl:top-[134px] xl:text-[32px]">
              <p className="text-[#008cff]">03</p>
              <p className="text-white">{t.visualHeading}</p>
            </div>

            <p className="text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70 sm:max-w-[560px] lg:max-w-full xl:absolute xl:left-[44px] xl:top-[181px] xl:w-[500px]">
              {t.visualPara1}
            </p>

            <p className="text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70 sm:max-w-[560px] lg:max-w-full xl:absolute xl:left-[726px] xl:top-[866px] xl:w-[498px]">
              {t.visualPara2}
            </p>
          </div>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={t.visualPhotoAlt}
            className="aspect-[335/300] w-full object-cover sm:aspect-[778/480] sm:rounded-[8px] lg:aspect-[1200/536] lg:rounded-none xl:absolute xl:left-[46px] xl:top-[318px] xl:h-[536px] xl:w-[1348px]"
            src={`${A}/visual-photo.jpg`}
          />

          {/* 375: цитата без ручного переноса (авто-wrap), обводка тянется в %
              от фактической высоты (см. Task.tsx — тот же приём). */}
          <div className="py-[32px] sm:hidden">
            <div className="relative">
              <p className="max-w-[303px] text-center font-heading text-[22px] font-normal uppercase leading-[1.1] tracking-[0.66px] text-white opacity-70">
                {t.visualQuote}
              </p>
              <DrawIn
                src={`${A}/reflow/visual-ellipse-375.svg`}
                className="pointer-events-none absolute left-1/2 top-1/2 h-[214%] w-[111%] max-w-none -translate-x-1/2 -translate-y-1/2 -rotate-[1.37deg]"
              />
            </div>
          </div>

          {/* 834/1280: перенос после «строился», обводка −1.37°. Раньше была
              фикс-px (660×114.3 / 787×136.3) — подогнана под RU (2 строки);
              на более длинном EN-тексте (3 строки) обводка была тесна
              тексту. Теперь — внутри той же обёртки, что и текст, размер в
              % от факт. высоты/ширины блока цитаты (см. xl-версию ниже и
              Task.tsx — тот же приём): подстроена под текущий RU-рендер
              1:1, но масштабируется вместе с текстом при другом числе строк. */}
          <div className="relative hidden justify-center py-[44px] sm:flex lg:py-[64px] xl:contents">
            <div className="relative xl:absolute xl:left-1/2 xl:top-[1133px] xl:w-[667px] xl:-translate-x-1/2 xl:-translate-y-1/2">
              <p className="max-w-[589px] text-center font-heading text-[28px] font-normal uppercase leading-[1.1] tracking-[0.84px] text-white opacity-70 lg:max-w-[672px] lg:text-[32px] lg:tracking-[0.96px] xl:w-[667px] xl:text-[32px]">
                {lang === "ru" ? (
                  <>
                    Новый стиль строился{" "}<br />
                    не из линий, а из цельной формы
                  </>
                ) : (
                  <>
                    The new style was built{" "}<br />
                    not from lines, but from a solid shape
                  </>
                )}
              </p>
              <DrawIn
                src={`${A}/visual-ellipse.svg`}
                fit="contain"
                className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 xl:block xl:h-[216%] xl:w-[119.8%]"
              />
              <DrawIn
                src={`${A}/reflow/visual-ellipse-1280.svg`}
                fit="contain"
                className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[186%] w-[116%] -translate-x-1/2 -translate-y-1/2 -rotate-[1.37deg] sm:block lg:h-[194%] lg:w-[121%] xl:hidden"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
