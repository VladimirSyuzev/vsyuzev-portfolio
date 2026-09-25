"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FullBleedScale from "@/components/FullBleedScale";
import HeroScrim from "@/components/HeroScrim";
import DrawIn from "@/components/DrawIn";
import { useLang } from "@/lib/lang";
import { C5 } from "./i18n";
import { CASES } from "@/lib/cases-data";
import Research from "./sections/Research";
import Idea from "./sections/Idea";
import Concept from "./sections/Concept";
import Details from "./sections/Details";
import Color from "./sections/Color";
import Result from "./sections/Result";

// Кейс 005 «Карты для пэтролхэдов» (Авто.ру × Т-Банк, иллюстрация карты
// DeLorean в духе Mad Max) — собран 1:1 из Figma (frame 2210:74380) по
// образцу кейсов 001–004: реальный DOM с настоящим текстом, векторные
// доодлы — SVG/прозрачный PNG, фото и иллюстрации — растровые ассеты.
// Тёмные блоки (Концепция, Работа с деталями) — full-bleed фон; мокап —
// цельное изображение на всю ширину экрана. Обложка/«О проекте» — высота
// 1:1 из Figma (hero 580 + белая часть 320), без min-h-screen. См.
// FIGMA-BRIEF.md.
//
// <1440 — reflow-слой «case-05 · 1280» (Figma frame 2827:41010): ветка
// `w-full xl:hidden` / `FullBleedScale width={1280}`, десктоп реклассится
// на `hidden xl:block`.
//
// Кейс под NDA — два входа на один и тот же компонент (по образцу
// case-01/case-02):
// - /cases/case-05 (full=false, по умолчанию) — публичная короткая версия:
//   обложка затемнена и заблюрена, «О проекте» — короткий тизер с главной
//   + NDA-пояснение + список INDEX, дальше сразу Footer (без разделов).
// - секретный незалинкованный URL (full=true) — полная версия: обложка без
//   затемнения, «О проекте» — полный текст, ниже все разделы и Footer.
//   См. src/app/cases/case-05-fc023ac012/page.tsx.
const CASE = "/cases/case-05/sections";

export default function CaseFivePage({ full = false }: { full?: boolean }) {
  const lang = useLang();
  const t = C5[lang];
  const teaser = CASES.find((c) => c.slug === "case-05")!;
  const aboutIntro = lang === "en" ? teaser.descriptionEn : teaser.description;
  return (
    <div className="flex w-full flex-col items-center overflow-x-clip">
      <Header />
      <div className="h-[62px] w-full shrink-0" />

      {/* Обложка + «О проекте» — высота 1:1 из Figma (hero 580 + белая
          часть 320), без min-h-screen: иначе на высоких экранах белая
          часть растягивается и «Исследование» уезжает далеко вниз. */}
      <div className="relative flex w-full flex-col items-center overflow-clip bg-[#fafafa] lg:mb-[32px] xl:mb-0">
        {/* ≥1440 — нативный холст 1440. */}
        <div className="hidden w-full flex-col items-center xl:flex">
          <div className="relative w-full">
            <FullBleedScale width={1440} height={580} mode="grow" className="w-full">
              <div className="relative h-[580px] w-[1440px] overflow-clip bg-[#5a0402]">
                <div
                  className="absolute inset-0"
                  style={{ background: "radial-gradient(130% 120% at 78% 45%, #b81412 0%, #7c0704 42%, #40060a 100%)" }}
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={t.coverAlt}
                  className="absolute inset-0 size-full object-cover"
                  src={full ? `${CASE}/cover-cards.jpg` : `${CASE}/cover-cards-nda.webp`}
                />
              </div>
            </FullBleedScale>

            <HeroScrim color="#4d0000" />

            <div className="pointer-events-none absolute inset-0 z-[2] mx-auto w-[1440px]">
              <p className="absolute bottom-[138px] left-[46px] w-[1278px] whitespace-pre-wrap font-heading text-[52px] font-bold uppercase leading-[1.2] tracking-[1.04px] text-white">
                {t.coverLine1} <br />
                {t.coverLine2}
              </p>
              <p className="absolute left-[40px] top-[-2px] whitespace-nowrap font-heading text-[175px] font-bold leading-[1.2] tracking-[5.25px] text-white opacity-60">
                005
              </p>
            </div>
          </div>

          <div className="relative mx-auto w-[1440px]" style={{ height: full ? 320 : 552 }}>
            <p className="absolute left-[46px] top-[102px] whitespace-nowrap font-heading text-[32px] font-bold leading-[1.1] tracking-[0.96px] text-[#121212]">
              {t.aboutHeading}
            </p>
            {full ? (
              <p className="absolute left-[46px] top-[149px] w-[668px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
                {t.aboutIntro}
              </p>
            ) : (
              <div className="absolute left-[46px] top-[149px] flex w-[668px] flex-col gap-[64px]">
                <p className="text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
                  {aboutIntro}
                </p>
                {/* Кейс под NDA: пояснение вместо полного разбора. */}
                <p className="text-[14px] uppercase leading-[1.2] tracking-[0.28px] text-[#121212]">
                  {t.ndaNotice}
                </p>
              </div>
            )}

            <div className="absolute left-[1066px] top-[149px] flex w-[102px] flex-col items-start gap-[4px]">
              <p className="text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px]">{t.metaRole}</p>
              <p className="text-[14px] leading-[1.2] tracking-[0.28px] opacity-70">{t.metaRoleValue}</p>
            </div>
            <div className="absolute left-[1236px] top-[149px] flex w-[130px] flex-col items-start gap-[4px]">
              <p className="text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px]">{t.metaClient}</p>
              <p className="text-[14px] leading-[1.2] tracking-[0.28px] opacity-70">{t.metaClientValue}</p>
            </div>

            <DrawIn
              src="/cases/case-05/underline.svg"
              delay={0.25}
              play="mount"
              className="absolute left-[1078px] top-[194px] h-[24px] w-[294px]"
            />

            {!full && (
              // INDEX — список всех разделов кейса (не в Figma, добавлено
              // под задачу NDA, см. case-01), левым краем вровень с метой.
              <div className="absolute left-[1066px] top-[258px] flex flex-col gap-[12px]">
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

        {/* 1024–1439 — HERO 1:1 из Figma reflow-фрейма «case-05 · 1280»
            (node 2827:41010). «О проекте» ниже вынесен из холста в общий
            резиновый блок (см. конец секции) — чтобы шрифт не скакал на
            границе с 834/375 (см. case-01/case-02). */}
        <div className="hidden w-full lg:block xl:hidden">
          <FullBleedScale width={1280} height={828} mode="grow" className="w-full">
            <div className="relative h-[828px] w-[1280px] overflow-clip bg-[#121212]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={t.heroAlt1280}
                className="absolute inset-0 size-full object-cover"
                src={full ? `${CASE}/hero-1280.jpg` : `${CASE}/hero-1280-nda.webp`}
              />
              {/* Скрим (Rectangle 2087332625, 0/396, 1280×441, multiply). */}
              <div className="absolute inset-x-0 top-[396px] h-[441px] bg-gradient-to-b from-transparent to-[#121212] mix-blend-multiply" />
              {/* Текст (Frame 2147231976, 40/72, w-1000 h-683, justify-between):
                  «005» сверху, заголовок снизу. */}
              <p className="absolute left-[40px] top-[72px] whitespace-nowrap font-heading text-[152px] font-bold leading-[1.2] tracking-[4.56px] text-white opacity-60">
                005
              </p>
              <p className="absolute left-[40px] top-[631px] w-[1278px] whitespace-pre-wrap font-heading text-[52px] font-bold uppercase leading-[1.2] tracking-[1.04px] text-white">
                {t.coverLine1} <br />
                {t.coverLine2}
              </p>
            </div>
          </FullBleedScale>
        </div>

        {/* 640–1023 — HERO 1:1 из Figma reflow-фрейма «case-05 · 834»
            (node 2828:45514). */}
        <div className="hidden w-full sm:block lg:hidden">
          <FullBleedScale width={834} height={834} mode="grow" className="w-full">
            <div className="relative h-[834px] w-[834px] overflow-clip bg-[#121212]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={t.heroAlt834}
                className="absolute inset-0 size-full object-cover"
                src={full ? `${CASE}/hero-834.jpg` : `${CASE}/hero-834-nda.webp`}
              />
              {/* Текст (Frame 2828:45522, 40/66, w-760, flex-col gap-457):
                  «005» 100px сверху, заголовок 52px снизу. */}
              <div className="absolute left-[40px] top-[66px] flex w-[760px] flex-col gap-[457px] font-heading font-bold leading-[1.2] text-white">
                <span className="text-[100px] tracking-[3px] opacity-60">005</span>
                <span className="whitespace-pre-wrap text-[52px] uppercase tracking-[1.04px]">
                  {t.coverLine1}{" "}
                  <br />
                  {t.coverLine2}
                </span>
              </div>
            </div>
          </FullBleedScale>
        </div>

        {/* <640 — HERO 1:1 из Figma reflow-фрейма «case-05 · 375»
            (node 2828:49132). */}
        <div className="w-full sm:hidden">
          <FullBleedScale width={375} height={356} mode="grow" className="w-full">
            <div className="relative h-[356px] w-[375px] overflow-clip bg-[#121212]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={t.heroAlt375}
                className="absolute inset-0 size-full object-cover"
                src={full ? `${CASE}/hero-375.jpg` : `${CASE}/hero-375-nda.webp`}
              />
              <p className="absolute left-[20px] top-[20px] whitespace-nowrap font-heading text-[44px] font-bold leading-none text-white opacity-60">
                005
              </p>
              <p className="absolute left-[20px] top-[250px] w-[335px] whitespace-pre-wrap font-heading text-[26px] font-bold uppercase leading-[1.15] tracking-[0.16px] text-white">
                {t.coverLine1} <br />
                {t.coverLine2}
              </p>
            </div>
          </FullBleedScale>
        </div>

        {/* «О проекте» — единый резиновый блок (без scale-холста) для всех
            ширин 375–1439: обычный CSS-flow с sm:/lg: Tailwind-модификаторами,
            как в case-01/case-02 — шрифт не скачет на границе брейкпоинтов
            (в отличие от отдельного масштабируемого холста на каждый размер).
            Ширина текстовой колонки — calc(50%-6px) на sm+ (1 из 2 колонок на
            834, 2 из 4 на 1280 — по сетке по 12px гаттер, см. RESPONSIVE.md). */}
        <div className="w-full max-w-[1440px] xl:hidden">
          <div
            className={
              full
                ? "flex flex-col gap-[12px] px-[20px] pt-[64px] pb-[64px] sm:px-[28px] sm:pt-[72px] sm:pb-[72px] lg:px-[40px] lg:pt-[64px] lg:pb-[64px]"
                : "flex flex-col gap-[12px] px-[20px] pt-[64px] pb-[32px] sm:px-[28px] sm:pt-[72px] sm:pb-[64px] lg:px-[40px] lg:pt-[64px]"
            }
          >
            <p className="font-heading text-[26px] font-bold uppercase leading-[1.1] tracking-[0.78px] text-[#121212] sm:text-[32px] sm:tracking-[0.96px]">
              {t.aboutHeading}
            </p>
            <div className="flex flex-col gap-[32px] sm:flex-row sm:items-start sm:justify-between sm:gap-[40px]">
              {full ? (
                <p className="w-[335px] max-w-full text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70 sm:w-[calc(50%-6px)]">
                  {t.aboutIntro}
                </p>
              ) : (
                <div className="flex w-[335px] max-w-full flex-col gap-[32px] sm:w-[calc(50%-6px)] sm:gap-[64px]">
                  <p className="text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
                    {aboutIntro}
                  </p>
                  {/* Кейс под NDA: пояснение вместо полного разбора. */}
                  <p className="text-[14px] uppercase leading-[1.2] tracking-[0.28px] text-[#121212]">
                    {t.ndaNotice}
                  </p>
                </div>
              )}
              <div className="flex flex-col sm:gap-[64px]">
                <div className="relative flex flex-wrap gap-x-[24px] gap-y-[16px] whitespace-nowrap text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] sm:flex-nowrap sm:gap-x-[40px]">
                  <div className="flex flex-col gap-[4px]">
                    <p className="font-medium uppercase">{t.metaRole}</p>
                    <p className="opacity-70">{t.metaRoleValue}</p>
                  </div>
                  <div className="flex flex-col gap-[4px]">
                    <p className="font-medium uppercase">{t.metaClient}</p>
                    <p className="opacity-70">{t.metaClientValue}</p>
                  </div>
                  {/* ДУДЛ — подчёркивание под метой (только ≥640, в макете на
                      375 его нет). */}
                  <DrawIn
                    src={`${CASE}/oproekte-underline-834.svg`}
                    className="pointer-events-none hidden sm:absolute sm:left-0 sm:top-[44px] sm:block sm:h-[11px] sm:w-[220px]"
                  />
                </div>
                {!full && (
                  // INDEX на 834/1280 — под блоком меты (Позиция/Клиент),
                  // gap 64px.
                  <div className="hidden flex-col gap-[12px] text-left sm:flex">
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
            {!full && (
              // INDEX на 375 — отдельным блоком под всей строкой.
              <div className="flex flex-col gap-[12px] pt-[12px] text-left sm:hidden">
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
      </div>

      {full && (
        <>
          <div className="mx-auto flex w-full max-w-[1440px] flex-col items-start lg:mb-[32px] xl:mb-0">
            <Research />
            <Idea />
          </div>

          {/* Концепция — тёмный full-bleed. Следующий блок (Работа с
              деталями) тоже тёмный — отступ красим в тот же #121212
              (padding, не margin), иначе светлый фон страницы показывался
              бы швом между двумя тёмными секциями (как в case-03). */}
          <div className="w-full bg-[#121212] lg:pb-[32px] xl:pb-0">
            <Concept />
          </div>
          {/* Работа с деталями — тёмный full-bleed. Следующий блок (Цвет)
              светлый — обычный margin. */}
          <div className="w-full lg:mb-[32px] xl:mb-0">
            <Details />
          </div>

          <div className="mx-auto flex w-full max-w-[1440px] flex-col items-start lg:mb-[32px] xl:mb-0">
            <Color />
          </div>

          {/* Финальный результат — карусель «варианты» тянется на всю ширину
              экрана, потому вне центрированной 1440-сетки (контент блока внутри
              сам центрируется на 1440). */}
          <div className="w-full lg:mb-[32px] xl:mb-0">
            <Result />
          </div>

          {/* Мокап — карта в руке на всю ширину экрана. ≥1440 — mockup.jpg
              (аспект 1.791); 1024–1439 — mockup-1280.jpg (1280×804, аспект 1.592);
              640–1023 — mockup-834.jpg (node 2835:53405, 834×659, аспект 1.266);
              <640 — mockup-375.jpg (node 2828:52709, 375×296, аспект 1.267).
              Без нижнего отступа — последний блок перед футером. */}
          <div className="w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={t.mockupAlt}
              className="hidden w-full xl:block"
              src={`${CASE}/mockup.jpg`}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={t.mockupAlt}
              className="hidden w-full lg:block xl:hidden"
              src={`${CASE}/mockup-1280.jpg`}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={t.mockupAlt}
              className="hidden w-full sm:block lg:hidden"
              src={`${CASE}/mockup-834.jpg`}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={t.mockupAlt}
              className="block w-full sm:hidden"
              src={`${CASE}/mockup-375.jpg`}
            />
          </div>
        </>
      )}

      <Footer />
    </div>
  );
}
