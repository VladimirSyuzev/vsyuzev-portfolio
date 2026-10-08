"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FullBleedScale from "@/components/FullBleedScale";
import DrawIn from "@/components/DrawIn";
import { useLang } from "@/lib/lang";
import { C2 } from "./i18n";
import Task from "./sections/Task";
import Templates from "./sections/Templates";
import Pipeline from "./sections/Pipeline";
import Prompts from "./sections/Prompts";
import Weavy from "./sections/Weavy";
import Assembly from "./sections/Assembly";
import Summary from "./sections/Summary";

// Кейс 002 «AI-пайплайн для соцсетей» (Stablegate) — НОВЫЙ кейс, черновая
// сборка рядом со старым case-02 (тот заархивирован в _archive/case-02-v1 и
// пока живёт на /cases/case-02/). Собираем блок за блоком, каждый сразу во
// всех размерах. Маппинг слоёв на брейкпоинты — как в case-04:
//   xl ≥1440  → нативный холст 1440 (absolute 1:1 из Figma, node 3330:23834)
//   lg 1024…  → reflow 1280 (FullBleedScale grow, node 3647:91927)
//   sm 640…   → reflow 834  (node 3647:91926)
//   base <640 → reflow 375  (node 3647:91928)
// Hero-фон — растровый коллаж (фото руки с телефоном + запечённый blur) с
// прозрачностью, лежит на тёмном #121212; градиент-скрим снизу — CSS; номер
// и заголовок — живой DOM-текст поверх. «О проекте» на <1440 — единый
// резиновый flow (14px не «прыгает» на границах брейкпоинтов).
const HERO = "/cases/case-02/hero";

export default function Case02DraftPage() {
  const lang = useLang();
  const t = C2[lang];

  // «О проекте» (светлая часть) для <1440 — единый резиновый блок.
  const aboutFlow = (
    <div className="w-full max-w-[1440px] xl:hidden">
      <div className="flex flex-col gap-[12px] px-[20px] py-[64px] sm:px-[28px] sm:py-[72px] lg:px-[40px] lg:py-[56px]">
        <p className="font-heading text-[26px] font-bold uppercase leading-[1.1] tracking-[0.78px] text-[#121212] sm:text-[32px] sm:tracking-[0.96px]">
          {t.aboutHeading}
        </p>
        <div className="flex flex-col gap-[32px] sm:flex-row sm:items-start sm:justify-between sm:gap-[40px]">
          <div className="flex w-[335px] max-w-full flex-col gap-[6px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70 sm:w-[382px] lg:w-[672px]">
            <p>{t.aboutIntro1}</p>
            <p>{t.aboutIntro2}</p>
          </div>
          <div className="relative flex shrink-0 flex-row gap-[32px] whitespace-nowrap text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212]">
            <div className="flex w-[102px] flex-col gap-[4px]">
              <p className="font-medium uppercase">{t.metaRole}</p>
              <p className="opacity-70">{t.metaRoleValue}</p>
            </div>
            <div className="flex w-[98px] flex-col gap-[4px]">
              <p className="font-medium uppercase">{t.metaClient}</p>
              <p className="opacity-70">{t.metaClientValue}</p>
            </div>
            {/* Доодл-подчёркивание под метой — только ≥640 (на 375 его нет). */}
            <DrawIn
              src={`${HERO}/underline-834.svg`}
              className="pointer-events-none hidden sm:absolute sm:left-0 sm:top-[44px] sm:block sm:h-[14px] sm:w-[290px]"
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex w-full flex-col items-center overflow-x-clip">
      <Header />
      <div className="h-[62px] w-full shrink-0" />

      {/* ── БЛОК 1 — Hero + «О проекте» ───────────────────────────────── */}
      <div className="relative flex w-full flex-col items-center overflow-clip bg-[#fafafa] lg:mb-[32px] xl:mb-0">
        {/* ≥1440 — Hero на ВСЮ ширину экрана (FullBleedScale grow, фон
            тянется за 1440), текст — в центрированной 1440-колонке поверх,
            не масштабируется (как в case-01/case-04). «О проекте» — отдельный
            центрированный 1440-блок ниже. */}
        <div className="hidden w-full xl:block">
          <div className="relative w-full">
            <FullBleedScale width={1440} height={580} mode="grow" className="w-full">
              <div className="relative h-[580px] w-[1440px] overflow-clip bg-[#121212]">
                {/* Готовый фон Hero (сцена + blur-блобы Figma, собран 1:1 из
                    коллажа 3640:83685) — точный размер 1440×580, object-cover.
                    В макете на 1440 градиент-прямоугольник отсутствует. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt={t.heroAlt} className="absolute inset-0 size-full object-cover" src={`${HERO}/bg-1440-v2.webp`} />
              </div>
            </FullBleedScale>

            {/* Номер + заголовок — центрированная 1440-колонка (frame
                3330:23946 @ 46/-2): «002» сверху, заголовок привязан к низу. */}
            <div className="pointer-events-none absolute inset-0 z-[2] mx-auto w-[1440px]">
              <p className="absolute left-[46px] top-[-2px] whitespace-nowrap font-heading text-[175px] font-bold leading-[1.2] tracking-[5.25px] text-white opacity-[0.56]">
                {t.coverNum}
              </p>
              <p className="absolute bottom-[135px] left-[46px] w-[1278px] font-heading text-[52px] font-bold uppercase leading-[1.2] tracking-[1.04px] text-white">
                {t.coverTitle1}
                <br />
                {t.coverTitle2}
              </p>
            </div>
          </div>

          {/* «О проекте» (frame 3641:86127 @ 46/682, w1288). */}
          <div className="mx-auto w-[1440px] pb-[96px] pt-[102px]">
            <div className="relative pl-[46px]">
              <p className="font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px] text-[#121212]">
                {t.aboutHeading}
              </p>
              <div className="mt-[12px] flex flex-row text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212]">
                <div className="flex w-[672px] flex-col gap-[6px] opacity-70">
                  <p>{t.aboutIntro1}</p>
                  <p>{t.aboutIntro2}</p>
                </div>
                <div className="relative ml-[348px] flex flex-row gap-[68px] whitespace-nowrap">
                  <div className="flex w-[102px] flex-col gap-[4px]">
                    <p className="font-medium uppercase">{t.metaRole}</p>
                    <p className="opacity-70">{t.metaRoleValue}</p>
                  </div>
                  <div className="flex w-[98px] flex-col gap-[4px]">
                    <p className="font-medium uppercase">{t.metaClient}</p>
                    <p className="opacity-70">{t.metaClientValue}</p>
                  </div>
                  {/* Синий доодл-подчёркивание под метой (node 3330:23956). */}
                  <DrawIn
                    src={`${HERO}/underline-1440.svg`}
                    className="pointer-events-none absolute left-0 top-[44px] h-[11px] w-[262px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 1024–1439 — Hero 1:1 из reflow-фрейма 1280 (node 3641:83687). */}
        <div className="hidden w-full lg:block xl:hidden">
          <FullBleedScale width={1280} height={828} mode="grow" className="w-full">
            <div className="relative h-[828px] w-[1280px] overflow-clip bg-[#121212]">
              {/* Готовый фон Hero (сцена + blur-блобы) 1280×828, object-cover. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt={t.heroAlt} className="absolute inset-0 size-full object-cover" src={`${HERO}/bg-1280-v2.webp`} />
              {/* Градиент-прямоугольник вниз к #121212 (node 3641:83689 @ y409,
                  h428) — тёмный низ под заголовок. */}
              <div className="absolute inset-x-0 top-[409px] h-[428px] bg-gradient-to-b from-transparent to-[#121212]" />
              <p className="absolute left-[40px] top-[72px] whitespace-nowrap font-heading text-[152px] font-bold leading-[1.2] tracking-[4.56px] text-white opacity-60">
                {t.coverNum}
              </p>
              <p className="absolute left-[40px] top-[631px] w-[1200px] font-heading text-[52px] font-bold uppercase leading-[1.2] tracking-[1.04px] text-white">
                {t.coverTitle1}
                <br />
                {t.coverTitle2}
              </p>
            </div>
          </FullBleedScale>
        </div>

        {/* 640–1023 — Hero 1:1 из reflow-фрейма 834 (node 3641:84435). */}
        <div className="hidden w-full sm:block lg:hidden">
          <FullBleedScale width={834} height={834} mode="grow" className="w-full">
            <div className="relative size-[834px] overflow-clip bg-[#121212]">
              {/* Готовый фон Hero (сцена + blur-блобы) 834×834, object-cover. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt={t.heroAlt} className="absolute inset-0 size-full object-cover" src={`${HERO}/bg-834-v2.webp`} />
              {/* Градиент-прямоугольник вниз к #121212 (node 3641:84437 @ y339,
                  h495) — тёмный низ под заголовок. */}
              <div className="absolute inset-x-0 top-[339px] h-[495px] bg-gradient-to-b from-transparent to-[#121212]" />
              <p className="absolute left-[40px] top-[66px] whitespace-nowrap font-heading text-[100px] font-bold leading-[1.2] tracking-[3px] text-white opacity-60">
                {t.coverNum}
              </p>
              <p className="absolute left-[40px] top-[637px] w-[573px] font-heading text-[52px] font-bold uppercase leading-[1.2] tracking-[1.04px] text-white">
                {t.coverTitle1}
                <br />
                {t.coverTitle2}
              </p>
            </div>
          </FullBleedScale>
        </div>

        {/* <640 — Hero 1:1 из reflow-фрейма 375 (node 3641:85174). */}
        <div className="w-full sm:hidden">
          <FullBleedScale width={375} height={356} mode="grow" className="w-full">
            <div className="relative h-[356px] w-[375px] overflow-clip bg-[#121212]">
              {/* Готовый фон Hero (сцена + blur-блобы) 375×356, object-cover. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt={t.heroAlt} className="absolute inset-0 size-full object-cover" src={`${HERO}/bg-375-v2.webp`} />
              {/* Градиент-прямоугольник вниз к #121212 (node 3641:85176 @ y82,
                  h274) — тёмный низ под заголовок. */}
              <div className="absolute inset-x-0 top-[82px] h-[274px] bg-gradient-to-b from-transparent to-[#121212]" />
              <p className="absolute left-[20px] top-[20px] whitespace-nowrap font-heading text-[44px] font-bold leading-none text-white opacity-60">
                {t.coverNum}
              </p>
              <p className="absolute left-[20px] top-[260px] w-[335px] font-heading text-[26px] font-bold uppercase leading-[1.15] tracking-[0.6px] text-white">
                {t.coverTitle1}
                <br />
                {t.coverTitle2}
              </p>
            </div>
          </FullBleedScale>
        </div>

        {/* «О проекте» — единый резиновый блок для <1440. */}
        {aboutFlow}
      </div>

      {/* ── БЛОК 2 — «01 Задача» ──────────────────────────────────────── */}
      <Task />

      {/* ── БЛОК 3 — «02 Шаблоны» ─────────────────────────────────────── */}
      <Templates />

      {/* ── БЛОК 4 — «03 Пайплайн» (тёмный) ───────────────────────────── */}
      <Pipeline />

      {/* ── БЛОК 5 — «04 Промты» ──────────────────────────────────────── */}
      <Prompts />

      {/* ── БЛОК 6 — «05 Weavy.AI» (тёмный) ───────────────────────────── */}
      <Weavy />

      {/* ── БЛОК 7 — «06 Сборка» (тёмный) ─────────────────────────────── */}
      <Assembly />

      {/* ── БЛОК 8 — «07 Итог» ────────────────────────────────────────── */}
      <Summary />

      {/* следующие блоки кейса добавляются ниже по мере сборки */}

      <Footer />
    </div>
  );
}
