import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FullBleedScale from "@/components/FullBleedScale";
import HeroScrim from "@/components/HeroScrim";
import Reveal from "@/components/Reveal";
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
  return (
    <div className="flex w-full flex-col items-center">
      <Header />
      <div className="h-[62px] w-full shrink-0" />

      {/* Обложка + «О проекте» — высота 1:1 из Figma (hero 580 + белая
          часть 320), без min-h-screen: иначе на высоких экранах белая часть
          растягивается и «Задача» уезжает далеко вниз. */}
      <div className="relative flex w-full flex-col items-center overflow-clip bg-[#fafafa]">
        <div className="relative w-full">
          <FullBleedScale width={1440} height={580} mode="grow" className="w-full">
            <div className="relative h-[580px] w-[1440px] overflow-clip bg-[#0f1f4b]">
              <div
                className="absolute inset-0"
                style={{ background: "radial-gradient(120% 120% at 80% 10%, #4a74d6 0%, #2a4fb0 45%, #16337a 100%)" }}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Билборд Stablegate «CRYPTO. PAYMENTS. SETTLED.» на фоне неба"
                className="absolute inset-0 size-full object-cover object-[78%_18%]"
                src={`${CASE}/cover-billboard.jpg`}
              />
            </div>
          </FullBleedScale>

          <HeroScrim color="#2b57b4" />

          <div className="pointer-events-none absolute inset-0 z-[2] mx-auto w-[1440px]">
            <p className="absolute bottom-[138px] left-[46px] w-[1278px] whitespace-pre-wrap font-heading text-[52px] font-bold uppercase leading-[1.2] tracking-[1.04px] text-white">
              KEY VISUALS <br />
              ДЛЯ OUTDOOR-КАМПАНИИ
            </p>
            <p className="absolute left-[40px] top-[-2px] whitespace-nowrap font-heading text-[175px] font-bold leading-[1.2] tracking-[5.25px] text-white opacity-60">
              004
            </p>
          </div>
        </div>

        <div className="relative mx-auto w-[1440px]" style={{ height: 320 }}>
          <p className="absolute left-[46px] top-[102px] whitespace-nowrap font-heading text-[32px] font-bold leading-[1.1] tracking-[0.96px] text-[#121212]">
            О ПРОЕКТЕ
          </p>
          <p className="absolute left-[46px] top-[149px] w-[668px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
            Для Stablegate я разработал рекламную концепцию и серию key visuals для
            outdoor-коммуникации. Задачей было сделать сложный crypto-продукт понятным через знакомые
            жизненные сценарии и показать, как цифровые активы могут использоваться для реальных
            покупок.
          </p>
          <p className="absolute left-[46px] top-[224px] w-[668px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
            В проект вошли концепция, арт-дирекшн, генерация изображений, композиция, типографика и
            адаптация под разные outdoor-форматы.
          </p>

          <div className="absolute left-[1066px] top-[149px] flex w-[102px] flex-col items-start gap-[4px]">
            <p className="text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px]">Позиция</p>
            <p className="text-[14px] leading-[1.2] tracking-[0.28px] opacity-70">Дизайнер</p>
          </div>
          <div className="absolute left-[1236px] top-[149px] flex w-[98px] flex-col items-start gap-[4px]">
            <p className="text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px]">Клиент</p>
            <p className="text-[14px] leading-[1.2] tracking-[0.28px] opacity-70">Stablegate</p>
          </div>

          <Reveal variant="line" delay={0.25} className="absolute left-[1086px] top-[199px] h-[16px] w-[251px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" className="block size-full max-w-none" src="/cases/case-04/underline.svg" />
          </Reveal>
        </div>
      </div>

      <div className="mx-auto flex w-[1440px] flex-col items-start">
        <Task />
        <Concept />
      </div>

      {/* KEY VISUAL — один закреплённый тёмный full-bleed блок из двух
          слайдов (билборд / кропы), кроссфейд за один скролл. */}
      <KeyVisualSlides />

      <div className="mx-auto flex w-[1440px] flex-col items-start">
        <Series />
      </div>

      {/* Мокап 1 — билборд на всю ширину экрана. */}
      <div className="w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="LED-билборд Stablegate «CRYPTO. PAYMENTS. SETTLED.» в интерьере"
          className="block w-full"
          src={`${CASE}/mockup-1.jpg`}
        />
      </div>

      {/* Адаптация — тёмный full-bleed с треком форматов. */}
      <Adaptation />

      {/* Мокап 2 — ситилайт на остановке, на всю ширину экрана. */}
      <div className="w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="Ситилайт Stablegate на автобусной остановке"
          className="block w-full"
          src={`${CASE}/mockup-2.jpg`}
        />
      </div>

      <div className="mx-auto flex w-[1440px] flex-col items-start">
        <Final />
      </div>

      {/* Мокап 3 — два постера-ситилайта, на всю ширину экрана. */}
      <div className="w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="Два постера Stablegate: сценарии с яхтой и с домом"
          className="block w-full"
          src={`${CASE}/mockup-3.jpg`}
        />
      </div>

      <Footer />
    </div>
  );
}
