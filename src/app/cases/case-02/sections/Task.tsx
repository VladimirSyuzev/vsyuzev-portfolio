"use client";

import RevealImg from "@/components/RevealImg";
import DrawIn from "@/components/DrawIn";
import { useLang } from "@/lib/lang";
import { C2 } from "../i18n";

// Блок 2 «01 Задача» — 1:1 из Figma (node 3330:24147 / reflow 3641:83709 /
// 3641:84457 / 3641:85194). Заголовок «01 Задача», два абзаца, мокап iPhone
// с профилем Stablegate (растр), синий доодл-шеврон », крупная мысль
// «Рутина — это не работа дизайнера…». На 1440/1280 мысль слева + доодл-
// подчёркивание; на 834/375 мысль по центру + доодл-эллипс (обводка).
const A = "/cases/case-02/task";

export default function Task() {
  const lang = useLang();
  const t = C2[lang];

  const phone = (
    <RevealImg alt={t.taskPhoneAlt} src={`${A}/phone.webp`} className="block h-auto w-full" />
  );

  return (
    <section className="w-full bg-[#fafafa]">
      {/* ─ ≥1440 — нативный холст 1440×1128 ─ */}
      <div className="relative mx-auto hidden h-[1128px] w-[1440px] xl:block">
        <div className="absolute left-[46px] top-[134px] flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
          <span className="text-[#008cff]">01</span>
          <span className="text-[#121212]">{t.taskHeading}</span>
        </div>
        <div className="absolute left-[46px] top-[181px] flex w-[668px] flex-col gap-[6px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
          <p>{t.taskIntro1}</p>
          <p>{t.taskIntro2}</p>
        </div>
        <div className="absolute left-[872px] top-[171px] w-[363px]">{phone}</div>
        <DrawIn src={`${A}/chevron.svg`} className="pointer-events-none absolute left-[556px] top-[455px] h-[125px] w-[158px]" />
        <p data-no-typo className="absolute left-[46px] top-[729px] w-[540px] whitespace-pre-wrap font-heading text-[32px] font-normal uppercase leading-[1.1] tracking-[0.96px] text-[#121212] opacity-70">
          {t.taskThought}
        </p>
        <DrawIn src={`${A}/underline.svg`} className="pointer-events-none absolute left-[197px] top-[832px] h-[30px] w-[351px]" />
      </div>

      {/* ─ 1024–1439 — 1:1 по reflow-фрейму 1280 (node 3641:83709): секция
          padding 72/40 → левая колонка высотой 745 (space-between: заголовок
          + абзацы сверху, мысль снизу) = высота секции 889. Телефон — абсолют
          @ x761/y119 (59.5% ширины), шеврон — внутри колонки @ 436/257
          (правый край колонки 594), подчёркивание — на 5.8px под колонкой.
          Фикс. высота → телефон не вылезает на футер. ─ */}
      <div className="hidden w-full lg:block xl:hidden">
        <div className="relative mx-auto h-[889px] w-full max-w-[1440px] px-[40px] py-[72px]">
          <div className="absolute left-[59.45%] top-[119px] w-[363px]">{phone}</div>
          <div className="relative flex h-[745px] w-[min(594px,calc(59.45%-64px))] flex-col justify-between">
            <div className="flex flex-col gap-[12px]">
              <div className="flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
                <span className="text-[#008cff]">01</span>
                <span className="text-[#121212]">{t.taskHeading}</span>
              </div>
              <div className="flex flex-col gap-[6px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
                <p>{t.taskIntro1}</p>
                <p>{t.taskIntro2}</p>
              </div>
            </div>
            <DrawIn src={`${A}/chevron.svg`} className="pointer-events-none absolute right-0 top-[292px] h-[125px] w-[158px] min-[1200px]:top-[257px]" />
            <p data-no-typo className="w-[540px] max-w-full whitespace-pre-wrap font-heading text-[32px] font-normal uppercase leading-[1.1] tracking-[0.96px] text-[#121212] opacity-70">
              {t.taskThought}
            </p>
            <DrawIn src={`${A}/underline-1280.svg`} className="pointer-events-none absolute left-[157px] top-[747px] h-[24px] w-[333px]" />
          </div>
        </div>
      </div>

      {/* ─ <1024 — stacked (834 + 375) ─ */}
      <div className="w-full lg:hidden">
        <div className="flex flex-col gap-[32px] px-[20px] py-[64px] max-sm:pb-[63px] max-sm:pt-[65px] sm:gap-[62px] sm:px-[28px] sm:pb-[67px] sm:pt-[73px]">
          <div className="flex flex-col gap-[12px]">
            <div className="flex items-center gap-[12px] whitespace-nowrap font-heading text-[26px] font-bold uppercase leading-[1.1] tracking-[0.78px] sm:text-[32px] sm:tracking-[0.96px]">
              <span className="text-[#008cff]">01</span>
              <span className="text-[#121212]">{t.taskHeading}</span>
            </div>
            <div className="flex max-w-[779px] flex-col gap-[6px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70 max-sm:mt-[3px]">
              <p>{t.taskIntro1}</p>
              <p>{t.taskIntro2}</p>
            </div>
          </div>

          {/* Кадр с мокапом фикс. высоты (макет: 375 → 617, 834 → 704). Телефон
              по центру: 375 — 286.42×554 @ y31; 834 — 363.53×704 @ y0. Шеврон —
              слева кадра @ y-4 (только ≥760px: ниже он налез бы на телефон). */}
          <div className="relative h-[617px] max-sm:mt-[1px] sm:mt-[17px] sm:h-[704px]">
            <DrawIn src={`${A}/chevron.svg`} className="pointer-events-none absolute left-0 top-[-4.45px] hidden h-[125px] w-[158px] min-[760px]:block" />
            <div className="absolute left-1/2 top-[31.26px] w-[286.42px] -translate-x-1/2 sm:top-0 sm:w-[363.53px]">{phone}</div>
          </div>

          {/* Мысль по центру + доодл-эллипс (обводка). */}
          <div className="relative mx-auto flex w-full max-w-[560px] items-center justify-center py-[32px] sm:max-w-[779px] sm:py-[48px]">
            <p data-no-typo className="relative z-10 w-[335px] max-w-full whitespace-pre-wrap text-center font-heading text-[22px] font-normal uppercase leading-[1.15] tracking-[0.6px] text-[#121212] opacity-70 sm:w-[457px] sm:text-[32px] sm:tracking-[0.96px]">
              {t.taskThought}
            </p>
            {/* 375 — овал из макета 375 (348×154); 834 — свой овал 523×196 (+3px обводки
                с каждой стороны → 529×202), по центру кадра 779, верх на 0 кадра. */}
            <DrawIn src={`${A}/ellipse.svg`} className="pointer-events-none absolute left-1/2 top-1/2 h-[150px] w-[348px] -translate-x-1/2 -translate-y-1/2 sm:hidden" />
            <DrawIn src={`${A}/ellipse-834.svg`} className="pointer-events-none absolute left-1/2 top-[-3px] hidden h-[202px] w-[529px] -translate-x-1/2 sm:block" />
          </div>
        </div>
      </div>
    </section>
  );
}
