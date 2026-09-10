"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FullBleedScale from "@/components/FullBleedScale";
import HeroScrim from "@/components/HeroScrim";
import Reveal from "@/components/Reveal";
import Research from "./sections/Research";
import Idea from "./sections/Idea";
import Concept from "./sections/Concept";
import Details from "./sections/Details";
import Color from "./sections/Color";
import Result from "./sections/Result";
import { useLang } from "@/lib/lang";
import { CASES } from "@/lib/cases-data";
import { C5 } from "./i18n";

// Кейс 005 «{title}» (Авто.ру × Т-Банк, иллюстрация карты
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
const CASE = "/cases/case-05/sections";

export default function Case05Page() {
  const lang = useLang();
  const t = C5[lang];
  const title = lang === "en" ? CASES[4].titleEn : CASES[4].title;
  return (
    <div className="flex w-full flex-col items-center overflow-x-clip">
      <Header />
      <div className="h-[62px] w-full shrink-0" />

      {/* Обложка + «О проекте» — высота 1:1 из Figma (hero 580 + белая
          часть 320), без min-h-screen: иначе на высоких экранах белая
          часть растягивается и «Исследование» уезжает далеко вниз. */}
      <div className="relative flex w-full flex-col items-center overflow-clip bg-[#fafafa]">
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
                  alt=""
                  className="absolute inset-0 size-full object-cover"
                  src={`${CASE}/cover-cards.jpg`}
                />
              </div>
            </FullBleedScale>

            <HeroScrim color="#4d0000" />

            <div className="pointer-events-none absolute inset-0 z-[2] mx-auto w-[1440px]">
              <p className="absolute bottom-[138px] left-[46px] w-[1278px] whitespace-pre-wrap font-heading text-[52px] font-bold uppercase leading-[1.2] tracking-[1.04px] text-white">
                {title}
              </p>
              <p className="absolute left-[40px] top-[-2px] whitespace-nowrap font-heading text-[175px] font-bold leading-[1.2] tracking-[5.25px] text-white opacity-60">
                005
              </p>
            </div>
          </div>

          <div className="relative mx-auto w-[1440px]" style={{ height: 320 }}>
            <p className="absolute left-[46px] top-[102px] whitespace-nowrap font-heading text-[32px] font-bold leading-[1.1] tracking-[0.96px] text-[#121212]">{t.aboutHeading}</p>
            <p className="absolute left-[46px] top-[149px] w-[668px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
              {t.aboutPara1}
            </p>
            <p className="absolute left-[46px] top-[189px] w-[668px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
              {t.aboutPara2}
            </p>

            <div className="absolute left-[1066px] top-[149px] flex w-[102px] flex-col items-start gap-[4px]">
              <p className="text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px]">{t.metaRole}</p>
              <p className="text-[14px] leading-[1.2] tracking-[0.28px] opacity-70">{t.metaRoleValue}</p>
            </div>
            <div className="absolute left-[1236px] top-[149px] flex w-[130px] flex-col items-start gap-[4px]">
              <p className="text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px]">{t.metaClient}</p>
              <p className="text-[14px] leading-[1.2] tracking-[0.28px] opacity-70">{t.metaClientValue}</p>
            </div>

            <Reveal variant="line" delay={0.25} className="absolute left-[1078px] top-[194px] h-[24px] w-[294px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" className="block size-full max-w-none" src="/cases/case-05/underline.svg" />
            </Reveal>
          </div>
        </div>

        {/* 1024–1439 — 1:1 из Figma reflow-фрейма «case-05 · 1280» (node 2827:41010). */}
        <div className="hidden w-full lg:block xl:hidden">
          {/* HERO (node 2827:41011, 1280×828) — тёмная панель #121212,
              AI-рендер карт на красном фоне + скрим снизу. */}
          <FullBleedScale width={1280} height={828} mode="grow" className="w-full">
            <div className="relative h-[828px] w-[1280px] overflow-clip bg-[#121212]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                className="absolute inset-0 size-full object-cover"
                src={`${CASE}/hero-1280.jpg`}
              />
              {/* Скрим (Rectangle 2087332625, 0/396, 1280×441, multiply). */}
              <div className="absolute inset-x-0 top-[396px] h-[441px] bg-gradient-to-b from-transparent to-[#121212] mix-blend-multiply" />
              {/* Текст (Frame 2147231976, 40/72, w-1000 h-683, justify-between):
                  «005» сверху, заголовок снизу. */}
              <p className="absolute left-[40px] top-[72px] whitespace-nowrap font-heading text-[152px] font-bold leading-[1.2] tracking-[4.56px] text-white opacity-60">
                005
              </p>
              <p className="absolute left-[40px] top-[631px] w-[1278px] whitespace-pre-wrap font-heading text-[52px] font-bold uppercase leading-[1.2] tracking-[1.04px] text-white">
                {title}
              </p>
            </div>
          </FullBleedScale>

          {/* 01 · Обложка (О проекте) (node 2827:41018, 1280×249) — #fafafa,
              flex-col gap-24 px-40 py-64. */}
          <FullBleedScale width={1280} height={249} mode="grow" className="w-full">
            <div className="relative flex h-[249px] w-[1280px] flex-col items-start gap-[24px] bg-[#fafafa] px-[40px] py-[64px]">
              <div className="flex w-[1199px] flex-col items-start gap-[12px] [word-break:break-word]">
                <p className="font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px] text-[#121212]">{t.aboutHeading}</p>
                <div className="flex w-full items-start justify-between text-[14px] leading-[1.2] tracking-[0.28px]">
                  <div className="flex w-[592px] flex-col items-start gap-[6px] text-[#121212]">
                    <p className="opacity-70">
                      {t.aboutPara1}
                    </p>
                    <p className="opacity-70">
                      {t.aboutPara2}
                    </p>
                  </div>
                  <div className="flex items-center gap-[40px] whitespace-nowrap text-[#121212]">
                    <div className="flex flex-col items-start gap-[4px]">
                      <p className="font-medium uppercase">{t.metaRole}</p>
                      <p className="opacity-70">{t.metaRoleValue}</p>
                    </div>
                    <div className="flex flex-col items-start gap-[4px]">
                      <p className="font-medium uppercase">{t.metaClient}</p>
                      <p className="opacity-70">{t.metaClientValue}</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Подчёркивание-доодл (Vector 234257363, 988/158, 258×7). */}
              <Reveal
                variant="line"
                delay={0.25}
                className="absolute left-[988px] top-[158px] h-[7px] w-[258px]"
              >
                <div className="absolute inset-[-42.86%_-1.16%]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="" className="block size-full max-w-none" src={`${CASE}/oproekte-underline-1280.svg`} />
                </div>
              </Reveal>
            </div>
          </FullBleedScale>
        </div>

        {/* 640–1023 — 1:1 из Figma reflow-фрейма «case-05 · 834» (node 2828:45514). */}
        <div className="hidden w-full sm:block lg:hidden">
          {/* HERO (node 2828:45516, 834×834) — тёмная панель #121212, свой
              AI-рендер (Gemini 2026-08-24_06-36-12) на красном фоне: эллипс-
              свечение + скрим уже запечены в hero-834.jpg. */}
          <FullBleedScale width={834} height={834} mode="grow" className="w-full">
            <div className="relative h-[834px] w-[834px] overflow-clip bg-[#121212]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                className="absolute inset-0 size-full object-cover"
                src={`${CASE}/hero-834.jpg`}
              />
              {/* Текст (Frame 2828:45522, 40/66, w-760, flex-col gap-457):
                  «005» 100px сверху, заголовок 52px снизу. */}
              <div className="absolute left-[40px] top-[66px] flex w-[760px] flex-col gap-[457px] font-heading font-bold leading-[1.2] text-white">
                <span className="text-[100px] tracking-[3px] opacity-60">005</span>
                <span className="whitespace-pre-wrap text-[52px] uppercase tracking-[1.04px]">
                  {title}
                </span>
              </div>
            </div>
          </FullBleedScale>

          {/* 01 · Обложка (О проекте) (node 2828:45525, 834×316) — #fafafa,
              поле 28 / верх 72, gap 12. Декор-линия под мета-колонками
              (Vector 234257363, node 2885:14358). */}
          <FullBleedScale width={834} height={316} mode="grow" className="w-full">
            <div className="relative flex h-[316px] w-[834px] flex-col items-start bg-[#fafafa] px-[28px] py-[72px]">
              <div className="flex w-[778px] flex-col items-start gap-[12px] [word-break:break-word]">
                <p className="font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px] text-[#121212]">{t.aboutHeading}</p>
                <div className="flex w-full items-start justify-between text-[14px] leading-[1.2] tracking-[0.28px]">
                  <div className="flex w-[383px] flex-col items-start gap-[6px] text-[#121212]">
                    <p className="opacity-70">
                      {t.aboutPara1}
                    </p>
                    <p className="opacity-70">
                      {t.aboutPara2}
                    </p>
                  </div>
                  <div className="flex items-center gap-[40px] whitespace-nowrap text-[#121212]">
                    <div className="relative flex flex-col items-start gap-[4px]">
                      <p className="font-medium uppercase">{t.metaRole}</p>
                      <p className="opacity-70">{t.metaRoleValue}</p>
                      {/* Декор-линия под мета (Vector 234257363, node 2885:14358) —
                          внутри колонки «Позиция» (0, 45), 249×7, тянется под обе
                          колонки. */}
                      <Reveal
                        variant="line"
                        delay={0.25}
                        className="absolute left-0 top-[45px] h-[7px] w-[249px]"
                      >
                        <div className="absolute inset-[-42.86%_-1.2%]">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img alt="" className="block size-full max-w-none" src={`${CASE}/oproekte-underline-834.svg`} />
                        </div>
                      </Reveal>
                    </div>
                    <div className="flex flex-col items-start gap-[4px]">
                      <p className="font-medium uppercase">{t.metaClient}</p>
                      <p className="opacity-70">{t.metaClientValue}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FullBleedScale>
        </div>

        {/* <640 — 1:1 из Figma reflow-фрейма «case-05 · 375» (node 2828:49132). */}
        <div className="w-full sm:hidden">
          {/* HERO (node 2828:49133, 375×356) — тёмная панель #121212, свод
              биллборд-мокапа (рендер + свечение + скрим запечены в hero-375.jpg). */}
          <FullBleedScale width={375} height={356} mode="grow" className="w-full">
            <div className="relative h-[356px] w-[375px] overflow-clip bg-[#121212]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                className="absolute inset-0 size-full object-cover"
                src={`${CASE}/hero-375.jpg`}
              />
              <p className="absolute left-[20px] top-[20px] whitespace-nowrap font-heading text-[44px] font-bold leading-none text-white opacity-60">
                005
              </p>
              <p className="absolute left-[20px] top-[250px] w-[335px] whitespace-pre-wrap font-heading text-[26px] font-bold uppercase leading-[1.15] tracking-[0.16px] text-white">
                {title}
              </p>
            </div>
          </FullBleedScale>

          {/* 01 · Обложка (О проекте) (node 2828:49143, 375×432) — #fafafa,
              поле 20 / верх 64, gap 32. Декор-линии под мета в макете НЕТ. */}
          <FullBleedScale width={375} height={432} mode="grow" className="w-full">
            <div className="flex h-[432px] w-[375px] flex-col items-start gap-[32px] bg-[#fafafa] px-[20px] py-[64px] [word-break:break-word]">
              <div className="flex w-[335px] flex-col items-start gap-[12px] text-[#121212]">
                <p className="font-heading text-[26px] font-bold uppercase leading-[1.1] tracking-[0.78px]">{t.aboutHeading}</p>
                <div className="flex flex-col gap-[6px] text-[14px] leading-[1.2] tracking-[0.28px]">
                  <p className="w-[335px] opacity-70">
                    {t.aboutPara1}
                  </p>
                  <p className="w-[335px] opacity-70">
                    {t.aboutPara2}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-[40px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212]">
                <div className="flex flex-col items-start gap-[4px]">
                  <p className="font-medium uppercase">{t.metaRole}</p>
                  <p className="whitespace-nowrap opacity-70">{t.metaRoleValue}</p>
                </div>
                <div className="flex flex-col items-start gap-[4px]">
                  <p className="font-medium uppercase">{t.metaClient}</p>
                  <p className="opacity-70">{t.metaClientValue}</p>
                </div>
              </div>
            </div>
          </FullBleedScale>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-start">
        <Research />
        <Idea />
      </div>

      {/* Концепция — тёмный full-bleed. */}
      <Concept />
      {/* Работа с деталями — тёмный full-bleed. */}
      <Details />

      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-start">
        <Color />
      </div>

      {/* Финальный результат — карусель «варианты» тянется на всю ширину
          экрана, потому вне центрированной 1440-сетки (контент блока внутри
          сам центрируется на 1440). */}
      <Result />

      {/* Мокап — карта в руке на всю ширину экрана. ≥1440 — mockup.jpg
          (аспект 1.791); 1024–1439 — mockup-1280.jpg (1280×804, аспект 1.592);
          640–1023 — mockup-834.jpg (node 2835:53405, 834×659, аспект 1.266);
          <640 — mockup-375.jpg (node 2828:52709, 375×296, аспект 1.267). */}
      <div className="w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          className="hidden w-full xl:block"
          src={`${CASE}/mockup.jpg`}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          className="hidden w-full lg:block xl:hidden"
          src={`${CASE}/mockup-1280.jpg`}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          className="hidden w-full sm:block lg:hidden"
          src={`${CASE}/mockup-834.jpg`}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          className="block w-full sm:hidden"
          src={`${CASE}/mockup-375.jpg`}
        />
      </div>

      <Footer />
    </div>
  );
}
