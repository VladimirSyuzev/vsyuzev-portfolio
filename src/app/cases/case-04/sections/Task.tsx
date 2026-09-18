"use client";

import DrawIn from "@/components/DrawIn";
import { useLang } from "@/lib/lang";
import { C4 } from "../i18n";

// 01 Задача — 1:1 из актуальной Figma (node 2034:15705, высота 900).
// Заголовок «01 Задача» (32px). Два абзаца сверху. Ниже — цельная
// растровая композиция (фото дома/машины + телефон-мокап) с наложенной
// крупной мыслью «Сложный crypto-продукт…» (Wix Madefor Display Regular).
// На xl/1280/834 мысль запечена в саму композицию — на EN подставляется
// отдельно экспортированный WebP с английским текстом (task-composite*-en.webp,
// см. Figma EXPORT/c4_task.png), RU остаётся на исходных JPG.
//
// 1024–1439 — reflow «case-04 · 1280» (node 2736:17992, 1280×786).
//  640–1023 — reflow «case-04 · 834» (node 2748:4698, 834×622.198).
//     <640  — reflow «case-04 · 375» (node 2819:36103, 375×917.198): мысль
//             и обводка-эллипс — отдельные элементы (не запечены).
const A = "/cases/case-04/sections";

export default function Task() {
  const lang = useLang();
  const t = C4[lang];
  return (
    <>
      {/* ≥1440 — нативный холст 1440. */}
      <div className="relative hidden h-[900px] w-[1440px] overflow-clip bg-[#fafafa] xl:block">
        <div className="absolute left-[46px] top-[134px] flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
          <p className="text-[#008cff]">01</p>
          <p className="text-[#121212]">{t.taskHeading}</p>
        </div>

        <p className="absolute left-[46px] top-[181px] w-[498px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
          {t.taskIntro1}
        </p>
        <p className="absolute left-[556px] top-[181px] w-[498px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
          {t.taskIntro2}
        </p>

        {/* Композиция (Figma frame 2034:15720 → x0 / y318, 1394×602). Мысль
            «Сложный crypto-продукт…» (node 2399:35339) запечена в композиции
            поверх приглушённого фото — как слоганы в мокапах кейсов 2/3. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={t.taskCompositeAlt}
          className="absolute left-0 top-[318px] w-[1394px]"
          src={lang === "en" ? `${A}/task-composite-en.webp` : `${A}/task-composite.jpg`}
        />
        <p className="sr-only">{t.taskQuote}</p>
      </div>

      {/* <1440 — единый резиновый flow: раньше 3 холста (375/834/1280)
          держали 14px-абзацы внутри масштабируемого канваса — текст «плыл»
          вместе с холстом на промежуточных ширинах (13.7→16.9px в тире
          834). Композиция (фото+мокап, местами с запечённой мыслью) — как
          есть, просто картинка на всю ширину, холст ей не нужен. */}
      <div className="flex w-full flex-col overflow-clip bg-[#fafafa] xl:hidden">
        <div className="flex flex-col gap-[12px] px-[20px] pt-[64px] pb-[32px] sm:px-[28px] sm:pt-[72px] sm:pb-[64px] lg:px-[40px] lg:pb-[47px]">
          <div className="flex items-center gap-[12px] whitespace-nowrap font-heading text-[26px] font-bold uppercase leading-[1.1] tracking-[0.78px] sm:text-[32px] sm:tracking-[0.96px] lg:items-baseline lg:gap-[20px]">
            <span className="text-[#008cff]">01</span>
            <span className="text-[#121212]">{t.taskHeading}</span>
          </div>
          <div className="flex flex-col gap-[6px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] lg:flex-row lg:gap-[26px]">
            <p className="w-[335px] max-w-full opacity-70 sm:w-full lg:w-[580px]">{t.taskIntro1}</p>
            <p className="w-[335px] max-w-full opacity-70 sm:w-full lg:w-[592px]">{t.taskIntro2}</p>
          </div>
        </div>

        {/* Композиция — свой файл/аспект на каждом тире (в 834/1280 мысль
            запечена в картинку, в 375 — отдельно живым текстом ниже). */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={t.taskCompositeAlt}
          className="hidden aspect-[1240/535.495] w-full object-cover lg:block xl:hidden"
          src={lang === "en" ? `${A}/task-composite-1280-en.webp` : `${A}/task-composite-1280.jpg`}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={t.taskCompositeAlt}
          className="hidden aspect-[834/348.198] w-full object-cover sm:block lg:hidden"
          src={lang === "en" ? `${A}/task-composite-834-en.webp` : `${A}/task-composite-834.jpg`}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={t.taskComposite375Alt}
          className="block aspect-[375/348.198] w-full object-cover sm:hidden"
          src={`${A}/task-composite-375.jpg`}
        />
        <p className="sr-only lg:hidden">{t.taskQuote}</p>

        {/* Мысль + обводка-эллипс — только 375 (в 834/1280 запечена в
            композицию выше). Эллипс в % от блока текста (не от холста). */}
        <div className="relative flex w-full shrink-0 items-center justify-center py-[64px] sm:hidden">
          <div className="relative w-[294px]">
            <p className="relative z-10 whitespace-pre-wrap text-center font-heading text-[22px] font-normal uppercase leading-[1.1] tracking-[0.66px] text-[#121212] opacity-80">
              {lang === "ru" ? (
                <>
                  Сложный crypto-продукт нужно{" "}
                  <br />
                  было объяснить{" "}
                  <br />
                  за несколько секунд
                </>
              ) : (
                t.taskQuote
              )}
            </p>
            <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[168.1%] w-[117.5%] -translate-x-1/2 -translate-y-1/2">
              <DrawIn src={`${A}/task-ellipse-375.svg`} className="absolute inset-[-1.84%_-0.87%]" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
