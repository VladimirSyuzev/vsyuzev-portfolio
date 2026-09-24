"use client";

import Reveal from "@/components/Reveal";
import DrawIn from "@/components/DrawIn";
import VariantsCarousel from "@/components/VariantsCarousel";
import { C3_TEXT } from "../tokens";
import { useBreakpoint } from "@/lib/breakpoint";
import { useLang } from "@/lib/lang";
import { C3 } from "../i18n";

// 01 Задача — 1:1 из актуальной Figma (node 2079:17694, высота 1672).
// Дисплейный заголовок 175px. Вводный абзац. Фрейм «варианты» (node
// 2079:17726) — общий VariantsCarousel: снап-карусель маркетинговых
// форматов во всю ширину, перетаскивание вбок, бар снизу.
// Ниже — «Система должна была:» + 4 требования с галочками, крупная
// итоговая мысль с подчёркиванием и 3D-стек монет слева.
const A = "/cases/case-03/sections";

// Размеры/пути карточек — язык-независимые (сами слайды не переводятся,
// баковый ассет), alt-текст берётся из словаря C3[lang].cardAlt1..4.
const CARD_META = [
  { src: `${A}/variant1.webp`, w: 624, h: 798 },
  { src: `${A}/variant2.webp`, w: 1419, h: 798 },
  { src: `${A}/variant3.webp`, w: 639, h: 798 },
  { src: `${A}/variant4.webp`, w: 798, h: 798 },
];

function Req({ head, sub, icon = "task-check.svg" }: { head: string; sub: string; icon?: string }) {
  return (
    <div className="flex h-[34px] gap-[8px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="" className="h-[34px] w-[28px] shrink-0" src={`${A}/${icon}`} />
      <p className="text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
        {head}
        <br />
        {sub}
      </p>
    </div>
  );
}

export default function Task() {
  const lang = useLang();
  const t = C3[lang];
  const CARDS = [
    { ...CARD_META[0], alt: t.cardAlt1 },
    { ...CARD_META[1], alt: t.cardAlt2 },
    { ...CARD_META[2], alt: t.cardAlt3 },
    { ...CARD_META[3], alt: t.cardAlt4 },
  ];
  const REQS = t.reqs;
  // <1440 — единый резиновый flow (см. блок ниже): структурная раскладка
  // (доодл-молния, группировка «монета + чек-лист + цитата») различается
  // не только размерами, но и порядком/составом элементов между тирами
  // (на 375 монета зажата МЕЖДУ чек-листом и цитатой, на 1280 монета —
  // отдельная колонка РЯДОМ со всем текстовым блоком) — это не выражается
  // чистым CSS (order не разводит вложенность), поэтому структура берётся
  // из useBreakpoint(), а не только из Tailwind-классов.
  const bp = useBreakpoint();
  const isLgUp = bp === "tabletL" || bp === "desktop";
  const isMobile = bp === "mobile";
  const carouselHSmall = isMobile ? 117 : 262;
  const carouselHBig = isMobile ? 178 : 399;
  const carouselH = carouselHBig + 54; // +высота бара (стрелки+точки)
  const reqIcon = isMobile ? "task-check-375.svg" : isLgUp ? "task-check.svg" : "task-check-834.svg";
  return (
    <section className="relative w-full overflow-clip bg-[#fafafa]">
      {/* ≥1440 — 1:1 из Figma-канваса 1440. */}
      <div className="relative mx-auto hidden h-[1672px] w-[1440px] xl:block">
        <div className="absolute left-[46px] top-[143px] flex items-center gap-[24px] whitespace-nowrap font-heading text-[175px] font-bold uppercase leading-[1.1] tracking-[5.25px]">
          <p className="text-[#008cff]">01</p>
          <p className="text-[#121212]">{t.taskHeading}</p>
        </div>

        <p className="absolute left-[46px] top-[368px] w-[668px] text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px] text-[#121212]">
          {t.taskIntro}
        </p>

        {/* Доодл-«молния» (Figma node 2384:21368 → 1216 / 394). */}
        <DrawIn
          src={`${A}/task-doodle-flash.svg`}
          fit="contain"
          className="absolute left-[1216px] top-[394px] z-10 h-[121px] w-[93px]"
        />

        <p className="absolute left-[726px] top-[1140px] w-[564px] text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px] text-[#121212]">
          {t.systemMustLabel}
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
          <img alt={t.coinAlt} className="block size-full" src={`${A}/task-coin.jpg`} />
        </Reveal>

        {/* Цитата + подчёркивание — общая обёртка, линия привязана к НИЗУ
            текста (top-[calc(100%+11px)], не фикс-px) — иначе при другом
            числе строк (перевод) она оторвалась бы от последней строки. */}
        <div className="absolute left-[726px] top-[1369px] w-[624px]">
          <p className="font-heading text-[32px] font-normal uppercase leading-[1.1] tracking-[0.96px] text-[#121212]">
            {t.taskQuote}
          </p>
          <DrawIn
            src={`${A}/task-doodle-arrow.svg`}
            className="absolute left-[158px] top-[calc(100%+11px)] h-[35px] w-[394px]"
          />
        </div>
      </div>

      {/* ≥1440 — лента «варианты» (Figma node 2079:17726 → y595). Прямой
          ребёнок <section> (обёртка hidden xl:block без своего position),
          поэтому absolute inset-x-0 внутри VariantsCarousel тянется на всю
          ширину экрана, а не обрезается 1440-боксом. */}
      <div className="hidden xl:block">
        <VariantsCarousel cards={CARDS} top={595} tone="light" />
      </div>

      {/* <1440 — единый резиновый flow (без FullBleedScale): раньше это были
          3 отдельных холста (375/834/1280), внутри которых 14px-текст
          (интро, «Система должна была:», пункты чек-листа) скейлился
          вместе с холстом — на промежуточных ширинах (например 833→1023px)
          визуально «плыл» от ~13.7 до ~16.9px. Теперь текст — обычный
          DOM-flow, всегда честные 14px; колонки/раскладка сужаются вместе
          с шириной экрана, автолэйаут раздвигает низ при переносе строк.
          Карусель (VariantsCarousel) сама всегда position:absolute —
          резервируем под неё высоту (hBig+54 бар) отдельным relative-блоком. */}
      <div className="flex w-full flex-col gap-[32px] overflow-clip bg-[#fafafa] px-[20px] py-[64px] sm:gap-[64px] sm:px-[28px] sm:py-[72px] lg:px-[40px] xl:hidden">
        <div className="flex flex-col gap-[12px] sm:gap-[32px]">
          <div className="relative flex items-center gap-[12px] whitespace-nowrap font-heading text-[26px] font-bold uppercase leading-none sm:gap-[24px] sm:text-[100px] sm:leading-[1.1] lg:text-[175px] lg:tracking-[5.25px]">
            <span className="text-[#008cff]">01</span>
            <span className="text-[#121212]">{t.taskHeading}</span>
            {/* Доодл-«молния» — только sm+ (в макете 375 её нет); 834 —
                повёрнута 14°, 1280 — без поворота, оба варианта позиционируются
                относительно этой заголовочной строки. */}
            {!isMobile && (
              <DrawIn
                src={isLgUp ? `${A}/task-doodle-flash.svg` : `${A}/task-flash-834.svg`}
                fit="contain"
                className={
                  isLgUp
                    ? "pointer-events-none absolute left-[1037px] top-[179px] z-10 h-[121px] w-[93px]"
                    : "pointer-events-none absolute left-[572px] top-[135px] z-10 h-[103px] w-[78px] rotate-[14deg]"
                }
              />
            )}
          </div>
          <p className="w-[335px] max-w-full text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px] text-[#121212] sm:w-[384px] lg:w-[594px]">
            {t.taskIntro}
          </p>
        </div>

        <div className="relative w-full" style={{ height: carouselH }}>
          <VariantsCarousel cards={CARDS} top={0} hSmall={carouselHSmall} hBig={carouselHBig} tone="light" />
        </div>

        {isLgUp ? (
          /* 1280 — монета слева, справа колонка «Система должна была:» +
              чек-лист + цитата (в макете именно так, не 3 равных колонки).
              Сверено с Figma (фрейм 2707:41599, 1200 шириной): монета не
              прижата к левому краю — отступ слева 138px, до текстовой
              колонки 140px (было gap-40, монета флаш-лефт) — 138+328+140+594
              = 1200, ровно ширина контента. */
          <div className="flex items-center gap-[140px]">
            <Reveal variant="fade" className="ml-[138px] size-[328px] shrink-0 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt={t.coinAlt} className="block size-full" src={`${A}/task-coin.jpg`} />
            </Reveal>
            {/* gap 52px — сверено с Figma: фрейм лейбл+грид 161 высотой,
                реальный контент (17 текст + 12 gap + 80 сетка = 109) —
                оставшиеся 52px это и есть зазор до монеты/цитаты, gap
                колонки #2707:41638 не задан (0), весь зазор — «воздух»
                внутри первого фрейма. */}
            <div className="flex w-[594px] max-w-full flex-col gap-[52px]">
              <div className="flex flex-col gap-[12px]">
                <p className="text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
                  {t.systemMustLabel}
                </p>
                <div className="flex gap-[12px]">
                  <div className="flex w-[291px] flex-col gap-[12px]">
                    <Req head={REQS[0][0]} sub={REQS[0][1]} icon={reqIcon} />
                    <Req head={REQS[1][0]} sub={REQS[1][1]} icon={reqIcon} />
                  </div>
                  <div className="flex w-[291px] flex-col gap-[12px]">
                    <Req head={REQS[2][0]} sub={REQS[2][1]} icon={reqIcon} />
                    <Req head={REQS[3][0]} sub={REQS[3][1]} icon={reqIcon} />
                  </div>
                </div>
              </div>
              <div className="relative">
                <p className={`text-[#121212] ${C3_TEXT.quote}`}>
                  {lang === "ru" ? (
                    <>
                      Каждая иллюстрация
                      <br />
                      должна была объяснять
                      <br />
                      функцию продукта ещё
                      <br />
                      до того, как пользователь
                      <br />
                      прочитает текст
                    </>
                  ) : (
                    t.taskQuote
                  )}
                </p>
                {/* Сверено с Figma (node 3085:14361, фрейм 2695:17969):
                    реальный бокс линии 387.57×28.56 (не 388×90, как было
                    раньше) — без fit="contain" бокс 90px растягивал штрих по
                    высоте втрое и лёгкий наклон (~4.2° в самом SVG,
                    подтверждён в макете) визуально утраивался до ~11°.
                    Позиция — +147px от левого края цитаты, +9px под низом
                    текста (было -19px, наезжало на текст). */}
                <DrawIn
                  src={`${A}/task-doodle-arrow.svg`}
                  fit="contain"
                  className="pointer-events-none absolute left-[147px] top-[calc(100%+9px)] h-[28.56px] w-[387.57px]"
                />
              </div>
            </div>
          </div>
        ) : (
          /* 375/834 — чек-лист, затем (только на 375) монета, затем цитата. */
          <div className="flex flex-col gap-[32px] sm:gap-[64px]">
            <div className="flex flex-col gap-[12px]">
              <p className="w-[335px] max-w-full text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70 sm:w-[594px]">
                {t.systemMustLabel}
              </p>
              <div className="flex flex-col gap-[12px] sm:flex-row">
                <div className="flex flex-col gap-[12px] sm:w-[228px]">
                  <Req head={REQS[0][0]} sub={REQS[0][1]} icon={reqIcon} />
                  <Req head={REQS[1][0]} sub={REQS[1][1]} icon={reqIcon} />
                </div>
                <div className="flex flex-col gap-[12px] sm:w-[291px]">
                  <Req head={REQS[2][0]} sub={REQS[2][1]} icon={reqIcon} />
                  <Req head={REQS[3][0]} sub={REQS[3][1]} icon={reqIcon} />
                </div>
              </div>
            </div>

            {isMobile && (
              <Reveal variant="fade" className="size-[328px] max-w-full overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt={t.coinAlt} className="block size-full" src={`${A}/task-coin.jpg`} />
              </Reveal>
            )}

            <div className={bp === "tabletP" ? "relative mx-auto w-[471px] max-w-full text-center" : "relative w-[329px] max-w-full"}>
              <p
                className={
                  bp === "tabletP"
                    ? "font-heading text-[28px] font-normal uppercase leading-[1.1] tracking-[0.84px] text-[#121212] opacity-70"
                    : "font-heading text-[22px] font-normal uppercase leading-[1.1] tracking-[0.66px] text-[#121212] opacity-70"
                }
              >
                {bp === "tabletP" && lang === "ru" ? (
                  <>
                    Каждая иллюстрация
                    <br />
                    должна была объяснять
                    <br />
                    функцию продукта ещё
                    <br />
                    до того, как пользователь
                    <br />
                    прочитает текст
                  </>
                ) : (
                  t.taskQuote
                )}
              </p>
              {bp === "tabletP" ? (
                <DrawIn
                  src={`${A}/task-underline-834.svg`}
                  className="pointer-events-none absolute left-[calc(50%+11px)] top-[calc(100%+1px)] h-[25.17px] w-[459.5px] -translate-x-1/2"
                />
              ) : (
                <div className="absolute left-0 top-[calc(100%+6px)] h-[23.08px] w-[339px]">
                  <DrawIn src={`${A}/task-underline-375.svg`} className="absolute inset-[-13%_-0.88%]" />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
