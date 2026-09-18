"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FullBleedScale from "@/components/FullBleedScale";
import HeroScrim from "@/components/HeroScrim";
import DrawIn from "@/components/DrawIn";
import { useLang } from "@/lib/lang";
import { C4 } from "./i18n";
import Task from "./sections/Task";
import Concept from "./sections/Concept";
import KeyVisualSlides from "./sections/KeyVisualSlides";
import Series from "./sections/Series";
import Adaptation from "./sections/Adaptation";
import Final from "./sections/Final";

// Кейс 004 «KEY VISUALS для outdoor-кампании» (Stablegate) — собран 1:1 из
// Figma (frame 2034:15643) по образцу кейсов 001–003: реальный DOM с
// настоящим текстом, векторные доодлы — SVG/прозрачный PNG, рекламные
// мокапы и AI-сцены — растровые ассеты. Тёмные блоки (KEY VISUAL, Кропы,
// Адаптация) — full-bleed фон; мокап-секции — цельное изображение на всю
// ширину экрана. Обложка/«О проекте» — весь первый экран (min-h-screen,
// FullBleedScale grow). См. FIGMA-BRIEF.md.
const CASE = "/cases/case-04/sections";

export default function Case04Page() {
  const lang = useLang();
  const t = C4[lang];
  return (
    <div className="flex w-full flex-col items-center overflow-x-clip">
      <Header />
      <div className="h-[62px] w-full shrink-0" />

      {/* Обложка + «О проекте» — высота 1:1 из Figma (hero 580 + белая
          часть 320), без min-h-screen: иначе на высоких экранах белая часть
          растягивается и «Задача» уезжает далеко вниз.
          ≥1440 — нативный холст 1440. <1440 — 1:1 из reflow-фрейма
          «case-04 · 1280» (node 2730:17992): HERO 1280×828 + отдельный
          блок «О проекте» 1280×283. */}
      <div className="relative flex w-full flex-col items-center overflow-clip bg-[#fafafa] lg:mb-[32px] xl:mb-0">
        <div className="hidden w-full xl:block">
        <div className="relative w-full">
          <FullBleedScale width={1440} height={580} mode="grow" className="w-full">
            <div className="relative h-[580px] w-[1440px] overflow-clip bg-[#0f1f4b]">
              <div
                className="absolute inset-0"
                style={{ background: "radial-gradient(120% 120% at 80% 10%, #4a74d6 0%, #2a4fb0 45%, #16337a 100%)" }}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={t.coverAlt}
                className="absolute inset-0 size-full object-cover object-[78%_18%]"
                src={`${CASE}/cover-billboard.jpg`}
              />
            </div>
          </FullBleedScale>

          <HeroScrim color="#2b57b4" />

          <div className="pointer-events-none absolute inset-0 z-[2] mx-auto w-[1440px]">
            <p className="absolute bottom-[138px] left-[46px] w-[1278px] whitespace-pre-wrap font-heading text-[52px] font-bold uppercase leading-[1.2] tracking-[1.04px] text-white">
              {t.coverLine1} <br />
              {t.coverLine2}
            </p>
            <p className="absolute left-[40px] top-[-2px] whitespace-nowrap font-heading text-[175px] font-bold leading-[1.2] tracking-[5.25px] text-white opacity-60">
              004
            </p>
          </div>
        </div>

        <div className="relative mx-auto w-[1440px]" style={{ height: 320 }}>
          <p className="absolute left-[46px] top-[102px] whitespace-nowrap font-heading text-[32px] font-bold leading-[1.1] tracking-[0.96px] text-[#121212]">
            {t.aboutHeading}
          </p>
          <p className="absolute left-[46px] top-[149px] w-[668px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
                      {t.aboutIntro}
                    </p>

          <div className="absolute left-[1066px] top-[149px] flex w-[102px] flex-col items-start gap-[4px]">
            <p className="text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px]">{t.metaRole}</p>
            <p className="text-[14px] leading-[1.2] tracking-[0.28px] opacity-70">{t.metaRoleValue}</p>
          </div>
          <div className="absolute left-[1236px] top-[149px] flex w-[98px] flex-col items-start gap-[4px]">
            <p className="text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px]">{t.metaClient}</p>
            <p className="text-[14px] leading-[1.2] tracking-[0.28px] opacity-70">{t.metaClientValue}</p>
          </div>

          <DrawIn
            src="/cases/case-04/underline.svg"
            delay={0.25}
            play="mount"
            className="absolute left-[1086px] top-[199px] h-[16px] w-[251px]"
          />
        </div>
        </div>

        {/* 1024–1439 — HERO 1:1 из Figma reflow-фрейма «case-04 · 1280»
            (node 2730:17992). «О проекте» ниже вынесен из холста в общий
            резиновый блок (см. конец секции) — как в кейсах 1/2/5: шрифт
            не скачет на границе брейкпоинтов (было — холст 834 давал
            scale~1.2, холст 1280 сразу за ним ~0.8, шрифт «прыгал» вдвое
            на 1023→1024px). */}
        <div className="hidden w-full lg:block xl:hidden">
          <FullBleedScale width={1280} height={828} mode="grow" className="w-full">
            <div className="relative h-[828px] w-[1280px] overflow-clip bg-[#121212]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={t.coverAlt}
                className="absolute inset-0 size-full object-cover"
                src={`${CASE}/hero-billboard-1280.jpg`}
              />
              {/* Скрим (Rectangle 2087332625, 0/394, 1280×443). */}
              <div className="absolute inset-x-0 top-[394px] h-[443px] bg-gradient-to-b from-transparent to-[#121212]" />
              {/* Текст (Frame 2147231976, 40/72, w-1000 h-683, justify-between):
                  «004» сверху, заголовок снизу. */}
              <p className="absolute left-[40px] top-[72px] whitespace-nowrap font-heading text-[152px] font-bold leading-[1.2] tracking-[4.56px] text-white opacity-60">
                004
              </p>
              <p className="absolute left-[40px] top-[631px] w-[1200px] whitespace-pre-wrap font-heading text-[52px] font-bold uppercase leading-[1.2] tracking-[1.04px] text-white">
                {t.coverLine1} <br />
                {t.coverLine2}
              </p>
            </div>
          </FullBleedScale>
        </div>

        {/* 640–1023 — HERO 1:1 из Figma reflow-фрейма «case-04 · 834»
            (node 2747:18016). */}
        <div className="hidden w-full sm:block lg:hidden">
          <FullBleedScale width={834} height={834} mode="grow" className="w-full">
            <div className="relative size-[834px] overflow-clip bg-[#121212]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={t.coverAlt}
                className="absolute inset-0 size-full object-cover"
                src={`${CASE}/hero-billboard-834.jpg`}
              />
              {/* Скрим (Rectangle 2087332625, y391, h446). */}
              <div className="absolute inset-x-0 top-[391px] h-[446px] bg-gradient-to-b from-transparent to-[#121212]" />
              {/* Текст (Frame 2147232086, 40/66, w-760): «004» сверху (100px),
                  заголовок снизу (52px). Заголовок — 3 строки (макет обновлён):
                  ручной <br> после «KEY VISUALS », дальше «ДЛЯ OUTDOOR-КАМПАНИИ»
                  переносится сама → y516 в фрейме = top-582. */}
              <p className="absolute left-[40px] top-[66px] whitespace-nowrap font-heading text-[100px] font-bold leading-[1.2] tracking-[3px] text-white opacity-60">
                004
              </p>
              <p className="absolute left-[40px] top-[582px] w-[760px] whitespace-pre-wrap font-heading text-[52px] font-bold uppercase leading-[1.2] tracking-[1.04px] text-white">
                {t.coverLine1} <br />
                {t.coverLine2}
              </p>
            </div>
          </FullBleedScale>
        </div>

        {/* <640 — HERO 1:1 из Figma reflow-фрейма «case-04 · 375 · мобайл»
            (node 2759:18046). */}
        <div className="w-full sm:hidden">
          <FullBleedScale width={375} height={356} mode="grow" className="w-full">
            <div className="relative h-[356px] w-[375px] overflow-clip bg-[#121212]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={t.coverAlt}
                className="absolute inset-0 size-full object-cover"
                src={`${CASE}/hero-375.jpg`}
              />
              {/* «004» (20, 20) — Wix Madefor Display Bold 44, leading-none,
                  opacity 60. */}
              <p className="absolute left-[20px] top-[20px] whitespace-nowrap font-heading text-[44px] font-bold leading-none text-white opacity-60">
                004
              </p>
              {/* Заголовок (20, 250, w-335) — Wix Madefor Display Bold 26 /
                  lh 115% / tracking 0.156px. Ручной <br> после «KEY VISUALS  »;
                  «ДЛЯ OUTDOOR-КАМПАНИИ» переносится сама → 3 строки. */}
              <p className="absolute left-[20px] top-[250px] w-[335px] whitespace-pre-wrap font-heading text-[26px] font-bold uppercase leading-[1.15] tracking-[0.156px] text-white">
                {t.coverLine1}{" "}
                <br />
                {t.coverLine2}
              </p>
            </div>
          </FullBleedScale>
        </div>

        {/* «О проекте» — единый резиновый блок (без scale-холста) для всех
            ширин 375–1439: обычный CSS-flow с sm:/lg: Tailwind-модификаторами,
            как в case-01/case-02/case-05. Ширина текстовой колонки —
            calc(50%-6px) на sm+ (1 из 2 колонок на 834, 2 из 4 на 1280 —
            гаттер 12px, см. RESPONSIVE.md). */}
        <div className="w-full max-w-[1440px] xl:hidden">
          <div className="flex flex-col gap-[12px] px-[20px] py-[64px] sm:px-[28px] sm:py-[72px] lg:px-[40px] lg:py-[64px]">
            <p className="font-heading text-[26px] font-bold uppercase leading-[1.1] tracking-[0.78px] text-[#121212] sm:text-[32px] sm:tracking-[0.96px]">
              {t.aboutHeading}
            </p>
            <div className="flex flex-col gap-[32px] sm:flex-row sm:items-start sm:justify-between sm:gap-[40px]">
              <p className="w-[335px] max-w-full whitespace-pre-wrap text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70 sm:w-[calc(50%-6px)]">
                {t.aboutIntro}
              </p>
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
                  src={`${CASE}/underline-1280.svg`}
                  className="pointer-events-none hidden sm:absolute sm:left-0 sm:top-[44px] sm:block sm:h-[11px] sm:w-[180px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-start lg:mb-[32px] xl:mb-0">
        <Task />
        <Concept />
      </div>

      {/* KEY VISUAL — один закреплённый тёмный full-bleed блок из двух
          слайдов (билборд / кропы), кроссфейд за один скролл. */}
      <div className="w-full lg:mb-[32px] xl:mb-0">
        <KeyVisualSlides />
      </div>

      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-start lg:mb-[32px] xl:mb-0">
        <Series />
      </div>

      {/* Мокап 1 — билборд на всю ширину экрана. 1024–1439 — свой кроп из
          reflow-фрейма 1280 (node 2740:18004, 1280×720); 640–1023 — из 834
          (node 2818:30125, 834×540); <640 — из 375 (node 2762:4698, 375×281).
          Следующий блок (Адаптация) — тёмный full-bleed, да и сам мокап —
          тёмное ночное фото: отступ красим в #121212 (padding, не margin),
          иначе светлый фон страницы показывался бы швом между двумя тёмными
          изображениями. */}
      <div className="w-full bg-[#121212] lg:pb-[32px] xl:pb-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={t.mockup1Alt}
          className="hidden w-full xl:block"
          src={`${CASE}/mockup-1.jpg`}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={t.mockup1Alt}
          className="hidden w-full lg:block xl:hidden"
          src={`${CASE}/mockup-1-1280.jpg`}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={t.mockup1Alt}
          className="hidden w-full sm:block lg:hidden"
          src={`${CASE}/mockup-1-834.jpg`}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={t.mockup1Alt}
          className="block w-full sm:hidden"
          src={`${CASE}/mockup-1-375.jpg`}
        />
      </div>

      {/* Адаптация — тёмный full-bleed с треком форматов. Следующий блок
          (Мокап 2) — тоже тёмное фото: отступ красим в #121212 по той же
          причине, что и перед этим блоком. */}
      <div className="w-full bg-[#121212] lg:pb-[32px] xl:pb-0">
        <Adaptation />
      </div>

      {/* Мокап 2 — ситилайт на остановке, на всю ширину экрана. 1024–1439 —
          свой кроп из reflow-фрейма «case-04 · 1280» (node 2768:22827, 1280×900);
          <1024 — из 834 (node 2818:36003, 834×625). */}
      <div className="w-full lg:mb-[32px] xl:mb-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={t.mockup2Alt}
          className="hidden w-full xl:block"
          src={`${CASE}/mockup-2.jpg`}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={t.mockup2Alt}
          className="hidden w-full lg:block xl:hidden"
          src={`${CASE}/mockup-2-1280.jpg`}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={t.mockup2Alt}
          className="hidden w-full sm:block lg:hidden"
          src={`${CASE}/mockup-2-834.jpg`}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={t.mockup2Alt}
          className="block w-full sm:hidden"
          src={`${CASE}/mockup-2-375.jpg`}
        />
      </div>

      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-start lg:mb-[32px] xl:mb-0">
        <Final />
      </div>

      {/* Мокап 3 — два постера-ситилайта, на всю ширину экрана. 1024–1439 —
          свой кроп из reflow-фрейма «case-04 · 1280» (node 2795:22843, 1280×800);
          640–1023 — из 834 (node 2819:36028, 834×521.25); <640 — из 375
          (node 2825:41000, 375×234.375). */}
      <div className="w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={t.mockup3Alt}
          className="hidden w-full xl:block"
          src={`${CASE}/mockup-3.jpg`}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={t.mockup3Alt}
          className="hidden w-full lg:block xl:hidden"
          src={`${CASE}/mockup-3-1280.jpg`}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={t.mockup3Alt}
          className="hidden w-full sm:block lg:hidden"
          src={`${CASE}/mockup-3-834.jpg`}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={t.mockup3Alt}
          className="block w-full sm:hidden"
          src={`${CASE}/mockup-3-375.jpg`}
        />
      </div>

      <Footer />
    </div>
  );
}
