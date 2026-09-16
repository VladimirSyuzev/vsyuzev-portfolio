"use client";

import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FullBleedScale from "@/components/FullBleedScale";
import HeroScrim from "@/components/HeroScrim";
import DrawIn from "@/components/DrawIn";
import { useLang } from "@/lib/lang";
import { C2 } from "../i18n";
import { CASES } from "@/lib/cases-data";
import Task from "./Task";
import Research from "./Research";
import VisualLanguage from "./VisualLanguage";
import Process from "./Process";
import First16px from "./First16px";

// Вся разметка страницы кейса 002 — здесь (клиентский компонент, нужен
// useLang). «06 Итог» (Summary.tsx) остаётся async server component (читает
// SVG стены иконок с диска) и приходит СНАРУЖИ готовым элементом через
// summarySlot — Client Component не может импортировать/рендерить async
// Server Component напрямую, только принять как children/prop от сервера
// (см. page.tsx).
//
// Кейс под NDA — два входа на один и тот же компонент (по образцу case-01,
// см. CaseOnePage.tsx):
// - /cases/case-02 (full=false, по умолчанию) — публичная короткая версия:
//   заголовок без имени клиента, обложка затемнена и заблюрена, «О проекте»
//   — тизер с главной + NDA-пояснение + список INDEX, дальше сразу Footer.
// - секретный незалинкованный URL (full=true) — полная версия: заголовок и
//   обложка как в исходном макете, «О проекте» — полный текст, ниже все
//   разделы и Footer. См. src/app/cases/case-02-23da49fa68/page.tsx.
export default function CaseBody({ summarySlot, full = false }: { summarySlot: ReactNode; full?: boolean }) {
  const lang = useLang();
  const t = C2[lang];
  const teaser = CASES.find((c) => c.slug === "case-02")!;
  const aboutIntro = lang === "en" ? teaser.descriptionEn : teaser.description;
  // Заголовок обложки — короткая версия без имени клиента (тот же текст,
  // что в тизере «Кейсы» на главной), полная версия — исходные coverLine1/2.
  const heroLine1 = full ? t.coverLine1 : lang === "en" ? "ICONS" : "ИКОНКИ";
  const heroLine2 = full ? t.coverLine2 : lang === "en" ? "FOR A CLOUD PLATFORM" : "ДЛЯ ОБЛАЧНОЙ ПЛАТФОРМЫ";
  return (
    <div className="flex w-full flex-col items-center">
      <Header />
      <div className="h-[62px] w-full shrink-0" />

      {/* Обложка + «О проекте» — высота 1:1 из Figma (hero 580 + белая
          часть 318), без min-h-screen: иначе на высоких экранах белая
          часть растягивалась и отрывала «Задачу» дальше, чем в макете.
          Ниже 1200 «О проекте» — поток в сетке (см. RESPONSIVE.md). */}
      <div className="relative flex w-full flex-col items-center overflow-clip bg-[#fafafa]">
        <div className="relative w-full">
          {/* ≥1440 — масштабированный холст 1440 (мокап растёт с шириной). */}
          <div className="hidden xl:block">
            <FullBleedScale width={1440} height={580} mode="grow" className="w-full">
              <div className="relative h-[580px] w-[1440px] overflow-clip bg-[#121212]">
                <div className="absolute left-0 top-[-221px] h-[1095.464px] w-[1642.995px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt={t.coverAlt}
                    className="absolute inset-0 size-full object-cover"
                    src="/cases/case-02/sections/cover-mockup.png"
                  />
                </div>
              </div>
            </FullBleedScale>

            <HeroScrim color="#1b1b21" />

            {!full && (
              // Кейс под NDA: затемнение + блюр на всю площадь блока Hero.
              // z-[1] — строго под текстовым слоем (z-[2] выше), поэтому
              // заголовок остаётся читаемым — прямоугольник визуально под
              // текстом, а не поверх него (см. case-01).
              <div className="pointer-events-none absolute inset-0 z-[1] bg-[#121212]/40 backdrop-blur-[7px] sm:backdrop-blur-[8.3px] lg:backdrop-blur-[9.5px] xl:backdrop-blur-[10px]" />
            )}

            <div className="pointer-events-none absolute inset-0 z-[2] mx-auto w-full max-w-[1440px] px-[var(--grid-margin)] xl:px-0">
              <p className="absolute bottom-[16%] left-[var(--grid-margin)] w-[80%] max-w-[1180px] whitespace-pre-wrap font-heading text-[clamp(1.9rem,6vw,52px)] font-bold uppercase leading-[1.2] tracking-[1.04px] text-white xl:bottom-[138px] xl:left-[46px] xl:!text-[52px]">
                {heroLine1} <br />
                {heroLine2}
              </p>
              <p className="absolute left-[var(--grid-margin)] top-[-2px] whitespace-nowrap font-heading text-[clamp(4rem,14vw,175px)] font-bold leading-[1.2] tracking-[5.25px] text-white opacity-60 xl:left-[40px] xl:!text-[175px]">
                002
              </p>
            </div>
          </div>

          {/* <1440 — reflow: три отдельных масштабируемых холста
              (FullBleedScale) вместо одного «резинового» блока с фикс-
              высотой и свободной шириной — тот подход ломал пропорции и
              обрезал мокап на любой ширине между брейкпоинтами (см.
              аналогичный фикс в case-01/CaseOnePage.tsx). */}
          {/* 375 (Figma 2637:30543): блок 375×356; мокап 534×356 центрирован
              (`left: calc(50%-232.5px)` = -45px на канвасе 375); скрим 375×274
              @ (0,82); текст-блок на весь блок, паддинг pt20/px20/pb36 —
              «002» 44px вверху, заголовок 26px/ls 0.6 внизу. */}
          <div className="w-full sm:hidden">
            <FullBleedScale width={375} height={356} mode="grow" className="w-full">
              <div className="relative h-[356px] w-[375px] overflow-clip bg-[#121212]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={t.coverAlt}
                  className="absolute left-[-45px] top-0 h-[356px] w-[534px] max-w-none object-cover"
                  src="/cases/case-02/sections/cover-mockup.png"
                />
                <div
                  className="pointer-events-none absolute inset-x-0 top-[82px] h-[274px] mix-blend-multiply"
                  style={{ background: "linear-gradient(to bottom, rgba(18,18,18,0), #121212)" }}
                />
                {!full && (
                  <div className="pointer-events-none absolute inset-0 z-[1] bg-[#121212]/40 backdrop-blur-[7px]" />
                )}
                <div className="absolute inset-0 z-[2] flex flex-col justify-between px-[20px] pb-[36px] pt-[20px] font-heading font-bold uppercase text-white">
                  <p className="text-[44px] leading-none opacity-60">002</p>
                  <p className="whitespace-pre-line text-[26px] leading-[1.15] tracking-[0.6px]">
                    {heroLine1}{"\n"}{heroLine2}
                  </p>
                </div>
              </div>
            </FullBleedScale>
          </div>

          {/* 834 (Figma 2637:30523): блок 834×834; мокап 1512×1008 @ (−282,−90);
              скрим 834×593 @ (0,241) mix-blend-multiply; текст-блок 573×696 @
              (40,66) — «002» 100px/ls 3 вверху, заголовок 52px/ls 1.04 внизу
              (space-between). */}
          <div className="hidden w-full sm:block lg:hidden">
            <FullBleedScale width={834} height={834} mode="grow" className="w-full">
              <div className="relative h-[834px] w-[834px] overflow-clip bg-[#121212]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={t.coverAlt}
                  className="absolute left-[-282px] top-[-90px] h-[1008px] w-[1512px] max-w-none object-cover"
                  src="/cases/case-02/sections/cover-mockup.png"
                />
                <div
                  className="pointer-events-none absolute inset-x-0 top-[241px] h-[593px] mix-blend-multiply"
                  style={{ background: "linear-gradient(to bottom, rgba(18,18,18,0), #121212)" }}
                />
                {!full && (
                  <div className="pointer-events-none absolute inset-0 z-[1] bg-[#121212]/40 backdrop-blur-[8.3px]" />
                )}
                <div className="absolute left-[40px] top-[66px] z-[2] flex h-[696px] w-[573px] flex-col justify-between font-heading font-bold uppercase text-white">
                  <p className="text-[100px] leading-[1.2] tracking-[3px] opacity-60">002</p>
                  <p className="whitespace-pre-line text-[52px] leading-[1.2] tracking-[1.04px]">
                    {heroLine1}{"\n"}{heroLine2}
                  </p>
                </div>
              </div>
            </FullBleedScale>
          </div>

          {/* 1280 (Figma 2613:16465): 1280×828; мокап 1643×1095 @ (−50,−134);
              скрим 1277×593 @ (3,244); текст 1000×683 @ (40,72); «002» 152px. */}
          <div className="hidden w-full lg:block xl:hidden">
            <FullBleedScale width={1280} height={828} mode="grow" className="w-full">
              <div className="relative h-[828px] w-[1280px] overflow-clip bg-[#121212]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={t.coverAlt}
                  className="absolute left-[-50px] top-[-134px] h-[1095px] w-[1643px] max-w-none object-cover"
                  src="/cases/case-02/sections/cover-mockup.png"
                />
                <div
                  className="pointer-events-none absolute left-[3px] top-[244px] h-[593px] w-[1277px] mix-blend-multiply"
                  style={{ background: "linear-gradient(to bottom, rgba(18,18,18,0), #121212)" }}
                />
                {!full && (
                  <div className="pointer-events-none absolute inset-0 z-[1] bg-[#121212]/40 backdrop-blur-[9.5px]" />
                )}
                <div className="absolute left-[40px] top-[72px] z-[2] flex h-[683px] w-[1000px] flex-col justify-between font-heading font-bold uppercase text-white">
                  <p className="text-[152px] leading-[1.2] tracking-[4.56px] opacity-60">002</p>
                  <p className="whitespace-pre-line text-[52px] leading-[1.2] tracking-[1.04px]">
                    {heroLine1}{"\n"}{heroLine2}
                  </p>
                </div>
              </div>
            </FullBleedScale>
          </div>
        </div>

        {/* Белая часть под hero — на десктопе абсолют 1440×318, ниже 1200
            поток. 1280 (Figma 2613:16466): один ряд — абзац 593 слева,
            мета-колонки справа (justify-between), паддинг 40 / 56. */}
        <div className="w-full max-w-[1440px] xl:relative xl:mx-auto">
          <div
            className={
              full
                ? "flex flex-col gap-[12px] px-[20px] py-[64px] sm:px-[40px] sm:py-[72px] lg:py-[56px] xl:contents"
                : "flex flex-col gap-[12px] px-[20px] pt-[64px] pb-[32px] sm:px-[40px] sm:pt-[72px] sm:pb-[64px] lg:pt-[56px] xl:contents"
            }
          >
            <p className="font-heading text-[26px] font-bold leading-[1.1] tracking-[0.78px] text-[#121212] sm:text-[32px] sm:tracking-[0.96px] xl:absolute xl:left-[46px] xl:top-[102px] xl:whitespace-nowrap xl:text-[32px]">
              {t.aboutHeading}
            </p>
            <div className="flex flex-col gap-[32px] sm:flex-row sm:items-start sm:justify-between sm:gap-[40px] xl:contents">
            {full ? (
              <p className="text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70 sm:w-[calc(50%-6px)] xl:absolute xl:left-[46px] xl:top-[149px] xl:w-[668px]">
                {aboutIntro}
              </p>
            ) : (
              <div className="flex flex-col gap-[32px] sm:w-[calc(50%-6px)] sm:gap-[64px] xl:absolute xl:left-[46px] xl:top-[149px] xl:flex xl:w-[668px] xl:flex-col xl:gap-[64px]">
                <p className="text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
                  {aboutIntro}
                </p>
                {/* Кейс под NDA: пояснение вместо полного разбора. */}
                <p className="text-[14px] uppercase leading-[1.2] tracking-[0.28px] text-[#121212]">
                  {t.ndaNotice}
                </p>
              </div>
            )}

            <div className="flex flex-col sm:gap-[64px] xl:contents">
              <div className="relative flex flex-wrap gap-x-[24px] gap-y-[16px] sm:flex-nowrap sm:gap-x-[40px] xl:contents">
                <div className="flex flex-col items-start gap-[4px] sm:w-[102px] xl:absolute xl:left-[896px] xl:top-[149px]">
                  <p className="text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px]">{t.metaRole}</p>
                  <p className="text-[14px] leading-[1.2] tracking-[0.28px] opacity-70">{t.metaRoleValue}</p>
                </div>
                <div className="flex flex-col items-start gap-[4px] sm:w-[98px] xl:absolute xl:left-[1066px] xl:top-[149px]">
                  <p className="text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px]">{t.metaTeam}</p>
                  <p className="text-[14px] leading-[1.2] tracking-[0.28px] opacity-70">{t.metaTeamValue}</p>
                </div>
                <div className="flex flex-col items-start gap-[4px] sm:w-[98px] xl:absolute xl:left-[1236px] xl:top-[149px]">
                  <p className="text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px]">{t.metaClient}</p>
                  <p className="text-[14px] leading-[1.2] tracking-[0.28px] opacity-70">{t.metaClientValue}</p>
                </div>

                {/* Декор-подчёркивание под метой — reflow 834/1280 (в макете
                    Figma есть, на 375 нет, на xl — своя абсолютная копия ниже). */}
                <DrawIn
                  src="/cases/case-02/sections/cover-underline.svg"
                  className="pointer-events-none absolute right-0 top-[calc(100%+8px)] hidden h-[16px] w-[340px] max-w-full sm:block xl:hidden"
                />
              </div>
              {!full && (
                // INDEX на 834/1280 — под блоком меты (Позиция/Команда/
                // Клиент), gap 64px (xl использует отдельную копию ниже).
                <div className="hidden flex-col gap-[12px] text-left sm:flex xl:hidden">
                  <p className="text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px] text-[#121212]">
                    INDEX
                  </p>
                  <ol className="flex flex-col gap-[8px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
                    {t.indexItems.map((item, i) => (
                      <li key={item}>
                        {String(i + 1).padStart(2, "0")} {item}
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
            </div>

            <DrawIn
              src="/cases/case-02/sections/cover-underline.svg"
              delay={0.35}
              play="mount"
              className="hidden xl:absolute xl:left-[917.94px] xl:top-[200.02px] xl:block xl:h-[22.356px] xl:w-[414.405px]"
            />

            {!full && (
              // INDEX на 375 и xl — отдельными блоками (375: под всей
              // строкой; xl: абсолютно под линией-подчёркиванием, см. выше).
              <div className="flex flex-col gap-[12px] pt-[12px] text-left sm:hidden xl:absolute xl:left-[896px] xl:top-[255px] xl:flex xl:flex-col xl:pt-0">
                <p className="text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px] text-[#121212]">
                  INDEX
                </p>
                <ol className="flex flex-col gap-[8px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
                  {t.indexItems.map((item, i) => (
                    <li key={item}>
                      {String(i + 1).padStart(2, "0")} {item}
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
          {/* Распорка держит высоту белого блока под hero на xl. Короткая
              версия ниже из-за INDEX — 124px отступ от его низа (замер
              через getBoundingClientRect, см. case-01). */}
          <div className={full ? "hidden xl:block xl:h-[318px]" : "hidden xl:block xl:h-[549px]"} aria-hidden />
        </div>
      </div>

      {full && (
        <>
          <Task />
          <Research />

          {/* Визуальный язык — тёмный full-bleed фон. */}
          <VisualLanguage />

          {/* Процесс — окно трека во всю ширину экрана (горизонтальный скролл
              по колесу, как «Построение процесса» в кейсе 1), поэтому прямой
              ребёнок full-width root, не внутри 1440-обёртки. */}
          <Process />

          {/* Сначала 16px — блок пинится и проигрывает scroll-анимацию иконки
              (см. First16px.tsx), поэтому прямой ребёнок full-width root. */}
          <First16px />

          {/* Мокап 1 — изображение на всю ширину экрана. */}
          <div className="w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={t.mockup1Alt}
              className="block w-full"
              src="/cases/case-02/sections/mockup-1.png"
            />
          </div>

          {summarySlot}

          {/* Мокап 2 — изображение на всю ширину экрана. */}
          <div className="w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={t.mockup2Alt}
              className="block w-full"
              src="/cases/case-02/sections/mockup-2.png"
            />
          </div>
        </>
      )}

      <Footer />
    </div>
  );
}
