"use client";

import DrawIn from "@/components/DrawIn";
import VariantsCarousel from "@/components/VariantsCarousel";
import FullBleedScale from "@/components/FullBleedScale";
import { useLang } from "@/lib/lang";
import { C4 } from "../i18n";

// 05 Адаптация — 1:1 из актуальной Figma (node 2118:32680, высота 1676).
// Тёмный full-bleed. Дисплейный заголовок «05 / АДАПТАЦИЯ» (175px), два
// абзаца, доодл-«звёздочка», крупная мысль в обводке. Текст 1 — ЛЕВАЯ
// колонка (обновлено 2026-09-07: было справа).
//
// Трек «варианты» (Figma frame 2440:59724) — общий VariantsCarousel:
// снап-карусель форматов во всю ширину, перетаскивание вбок, бар снизу.
// tone="dark". Без параллакса/переливания/скруглений, картинка целиком.
//
// 1024–1439 — 1:1 из reflow-фрейма «case-04 · 1280» (node 2742:17994, 1280×1543).
// <1024 — 1:1 из reflow-фрейма «case-04 · 834» (node 2752:4705, 834×1250).
const A = "/cases/case-04/sections";

// Позиционирование карточек трека — общее для языков, alt приходит из i18n
// (t.cardAlt) внутри компонента.
const CARDS_META = [
  { src: `${A}/adapt-1.jpg`, w: 533, h: 798 },
  { src: `${A}/adapt-2.jpg`, w: 1153, h: 798 },
  { src: `${A}/adapt-3.jpg`, w: 1089, h: 798 },
  { src: `${A}/adapt-4.jpg`, w: 1196, h: 798 },
  { src: `${A}/adapt-5.jpg`, w: 1411, h: 798 },
  { src: `${A}/adapt-6.jpg`, w: 1620, h: 798 },
  { src: `${A}/adapt-7.jpg`, w: 1800, h: 675 },
  { src: `${A}/adapt-8.jpg`, w: 1800, h: 615 },
];

export default function Adaptation() {
  const lang = useLang();
  const t = C4[lang];
  const CARDS = CARDS_META.map((c, i) => ({ ...c, alt: t.cardAlt[i] }));
  return (
    <>
      {/* ≥1440 — нативный холст 1440. */}
      <div className="relative hidden h-[1676px] w-full overflow-clip bg-[#121212] xl:block">
        <div className="relative mx-auto h-full w-[1440px]">
          {/* Дисплейный заголовок (Figma frame 2118:32684 → x46 / y87, 175px). */}
          <div className="absolute left-[46px] top-[87px] flex flex-col font-heading text-[175px] font-bold uppercase leading-[1.1] tracking-[5.25px]">
            <span className="text-[#008cff]">05</span>
            <span className="text-white">{t.adaptHeading}</span>
          </div>

          {/* Текст 1 — ЛЕВАЯ колонка (46, 529), w-491, Aeonik Medium 14
              UPPERCASE. Ручные <br> после «система », «outdoor-носители ». */}
          <p className="absolute left-[46px] top-[529px] w-[491px] text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px] text-white opacity-70">
            {t.adaptIntro1}
          </p>

          {/* Доодл-«звёздочка» (Figma node 2284:39980 → x1150 / y529, 158×125). */}
          <DrawIn
            src={`${A}/asterisk.svg`}
            fit="contain"
            className="absolute left-[1150px] top-[529px] z-10 h-[125px] w-[158px]"
          />

          <p className="absolute left-[726px] top-[1140px] w-[498px] text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70">
            {t.adaptIntro2}
          </p>

          {/* Мысль (Figma node 2401:35699) + обводка-эллипс (2401:35701) —
              общая центрированная обёртка (раньше были независимыми
              элементами с фикс-координатами), эллипс в % от блока текста
              (184.7%/115.56%) — масштабируется вместе с текстом при другом
              числе строк (перевод на английский). */}
          <div className="absolute left-1/2 top-[1442px] w-[765px] -translate-x-1/2 -translate-y-1/2">
            <p className="relative z-10 text-center font-heading text-[32px] font-normal uppercase leading-[1.1] tracking-[0.96px] text-white opacity-70">
              {t.adaptQuote}
            </p>
            <DrawIn
              src={`${A}/adapt-ellipse.svg`}
              className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[184.7%] w-[115.56%] -translate-x-1/2 -translate-y-1/2"
            />
          </div>
        </div>

        {/* Снап-карусель форматов (Figma frame 2440:59724 → y654). */}
        <VariantsCarousel cards={CARDS} top={654} tone="dark" />
      </div>

      {/* 1024–1439 — 1:1 из Figma reflow-фрейма «case-04 · 1280» (node
          2742:17994, 1280×1543). Тёмный full-bleed, всё в одном канвасе
          (VariantsCarousel — внутри, top в координатах канваса). */}
      <div className="hidden w-full lg:block xl:hidden">
        <FullBleedScale width={1280} height={1543} mode="grow" className="w-full">
          <div className="relative h-[1543px] w-[1280px] overflow-clip bg-[#121212]">
            {/* Дисплейный заголовок «05 / АДАПТАЦИЯ» стопкой (40, 72), 152px. */}
            <div className="absolute left-[40px] top-[72px] flex flex-col whitespace-nowrap font-heading text-[152px] font-bold uppercase leading-none tracking-[4.56px]">
              <span className="text-[#008cff]">05</span>
              <span className="text-white">{t.adaptHeading}</span>
            </div>

            {/* Текст 1 — ЛЕВАЯ колонка (40, 440), w-346, Aeonik Medium 14
                UPPERCASE (Frame 2147232078). */}
            <p className="absolute left-[40px] top-[440px] w-[346px] text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px] text-white opacity-70">
              {t.adaptIntro1}
            </p>

            {/* Доодл-«звёздочка» (1007, 411.477, 158×125). */}
            <DrawIn
            src={`${A}/asterisk.svg`}
            fit="contain"
            className="absolute left-[1007px] top-[411.477px] z-10 h-[125px] w-[158px]"
          />

            {/* Снап-карусель форматов (Frame 2147232079 → y557). */}
            <VariantsCarousel cards={CARDS} top={557} tone="dark" />

            {/* Текст 2 — правая колонка (649, 1020), w-581 (Frame 2147232080).
                Ручной <br> после «читаемой ». */}
            <p className="absolute left-[649px] top-[1020px] w-[581px] text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70">
              {t.adaptIntro2}
            </p>

            {/* Мысль (355, 1267, w-570, center) + обводка-эллипс (Vector
                234257386) — общая центрированная обёртка, эллипс в % от
                блока текста (147%/87.72%) — масштабируется вместе с текстом
                при другом числе строк (перевод на английский). Ручные <br>
                после «адаптируется », «под разные носители ». */}
            <div className="absolute left-[640px] top-[1337px] w-[570px] -translate-x-1/2 -translate-y-1/2">
              <p className="relative z-10 text-center font-heading text-[32px] font-normal uppercase leading-[1.1] tracking-[0.96px] text-white opacity-70">
                {t.adaptQuote}
              </p>
              <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[147%] w-[87.72%] -translate-x-1/2 -translate-y-1/2">
                <DrawIn src={`${A}/adapt-ellipse-1280.svg`} className="absolute inset-[-1.41%_-0.59%]" />
              </div>
            </div>
          </div>
        </FullBleedScale>
      </div>

      {/* 640–1023 — 1:1 из Figma reflow-фрейма «case-04 · 834» (node 2752:4705,
          834×1250). Тёмный full-bleed, абсолютная раскладка, VariantsCarousel
          внутри канваса (top в координатах канваса). */}
      <div className="hidden w-full sm:block lg:hidden">
        <FullBleedScale width={834} height={1250} mode="grow" className="w-full">
          <div className="relative h-[1250px] w-[834px] overflow-clip bg-[#121212]">
            {/* Дисплейный заголовок «05 / АДАПТАЦИЯ» стопкой (28, 72), 100px. */}
            <div className="absolute left-[28px] top-[72px] flex flex-col whitespace-nowrap font-heading text-[100px] font-bold uppercase leading-none tracking-[3px]">
              <span className="text-[#008cff]">05</span>
              <span className="text-white">{t.adaptHeading}</span>
            </div>

            {/* Текст 1 (28, 336), w-389, Aeonik Medium 14 UPPERCASE.
                Ручной <br> после «формата ». */}
            <p className="absolute left-[28px] top-[336px] w-[389px] text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px] text-white opacity-70">
              {t.adaptIntro1}
            </p>

            {/* Доодл-«звёздочка» (614, 298.199, 158×125). */}
            <DrawIn
            src={`${A}/asterisk.svg`}
            fit="contain"
            className="absolute left-[614px] top-[298.199px] z-10 h-[125px] w-[158px]"
          />

            {/* Снап-карусель форматов (Frame 2147232079 → y451), hSmall 172. */}
            <VariantsCarousel cards={CARDS} top={451} hSmall={172} hBig={262} tone="dark" />

            {/* Текст 2 (28, 777), w-381 (узкая левая колонка). Ручной <br>
                после «фотография ». */}
            <p className="absolute left-[28px] top-[777px] w-[381px] text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70">
              {t.adaptIntro2}
            </p>

            {/* Мысль (center, w-378) + обводка-эллипс (Vector 234257386) —
                общая центрированная обёртка, эллипс в % от блока текста
                (147.76%/110.85%) — масштабируется вместе с текстом при
                другом числе строк (перевод на английский). Блок Frame
                2147232100 сдвинут вниз (y926) — текст 2 стал узкой колонкой
                в 5 строк. */}
            <div className="absolute left-1/2 top-[1052px] w-[378px] -translate-x-1/2 -translate-y-1/2">
              <p className="relative z-10 text-center font-heading text-[28px] font-normal uppercase leading-[1.1] tracking-[0.84px] text-white opacity-70">
                {t.adaptQuote}
              </p>
              <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[200%] w-[135%] -translate-x-1/2 -translate-y-1/2">
                <DrawIn src={`${A}/adapt-ellipse-834.svg`} className="absolute inset-[-1.65%_-0.72%]" />
              </div>
            </div>
          </div>
        </FullBleedScale>
      </div>

      {/* <640 — 1:1 из Figma reflow-фрейма «case-04 · 375» (node 2762:4705,
          375×900). Тёмный full-bleed, абсолютная раскладка, VariantsCarousel
          внутри канваса. Заголовок стопкой; мысль — БЕЗ обводки, тонкое
          подчёркивание (Vector 234257394). */}
      <div className="w-full sm:hidden">
        <FullBleedScale width={375} height={900} mode="grow" className="w-full">
          <div className="relative h-[900px] w-[375px] overflow-clip bg-[#121212]">
            {/* Заголовок стопкой + 2 абзаца (0/64, px-20, gap 12). */}
            <div className="absolute left-0 top-[64px] flex w-full flex-col gap-[12px] px-[20px]">
              <div className="flex w-[182px] flex-col font-heading text-[26px] font-bold uppercase">
                <span className="leading-none text-[#008cff]">05</span>
                <span className="leading-[1.1] tracking-[0.78px] text-white">{t.adaptHeading}</span>
              </div>
              <div className="flex w-[335px] flex-col gap-[6px] text-[14px] leading-[1.2] tracking-[0.28px] text-white">
                <p className="opacity-70">{t.adaptIntro1}</p>
                <p className="opacity-70">{t.adaptIntro2}</p>
              </div>
            </div>

            {/* Снап-карусель форматов (Frame 2821:37592 → y322). Ключевая
                карточка ужимается по ширине до 350 (панорамные билборды иначе
                вылезают за 375). */}
            <VariantsCarousel
              cards={CARDS}
              top={322}
              hSmall={89.615}
              hBig={254}
              maxActiveWidth={350}
              tone="dark"
            />

            {/* Мысль (20/672, w-335, влево). Текст ставится сразу на свою
                координату (без «воздушного» py-64) — иначе невидимая зона hit-area
                перекрывает бар карусели. Подчёркивание (Vector 234257394,
                2835:53383) привязано к НИЗУ текста (top-[calc(100%+4px)],
                не фикс-px 776.86) — не оторвётся при другом числе строк
                (перевод на английский). */}
            <div className="absolute left-[20px] top-[672px] w-[335px]">
              <p className="whitespace-pre-wrap font-heading text-[22px] font-normal uppercase leading-[1.15] tracking-[0.66px] text-white opacity-70">
                {lang === "ru" ? (
                  <>
                    Один Key Visual адаптируется{" "}
                    <br />
                    под разные носители без потери идеи
                  </>
                ) : (
                  t.adaptQuote
                )}
              </p>
              <div className="absolute left-0 top-[calc(100%+4px)] h-[17.209px] w-[335.94px]">
                <DrawIn src={`${A}/adapt-underline-375.svg`} className="absolute inset-[-17.43%_-0.89%]" />
              </div>
            </div>
          </div>
        </FullBleedScale>
      </div>
    </>
  );
}
