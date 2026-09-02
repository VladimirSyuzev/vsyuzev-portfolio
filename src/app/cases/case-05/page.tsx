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

// Кейс 005 «Карты для пэтролхэдов» (Авто.ру × Т-Банк, иллюстрация карты
// DeLorean в духе Mad Max) — собран 1:1 из Figma (frame 2210:74380) по
// образцу кейсов 001–004: реальный DOM с настоящим текстом, векторные
// доодлы — SVG/прозрачный PNG, фото и иллюстрации — растровые ассеты.
// Тёмные блоки (Концепция, Работа с деталями) — full-bleed фон; мокап —
// цельное изображение на всю ширину экрана. Обложка/«О проекте» — высота
// 1:1 из Figma (hero 580 + белая часть 320), без min-h-screen. См.
// FIGMA-BRIEF.md.
const CASE = "/cases/case-05/sections";

export default function Case05Page() {
  return (
    <div className="flex w-full flex-col items-center">
      <Header />
      <div className="h-[62px] w-full shrink-0" />

      {/* Обложка + «О проекте» — высота 1:1 из Figma (hero 580 + белая
          часть 320), без min-h-screen: иначе на высоких экранах белая
          часть растягивается и «Исследование» уезжает далеко вниз. */}
      <div className="relative flex w-full flex-col items-center overflow-clip bg-[#fafafa]">
        <div className="relative w-full">
          <FullBleedScale width={1440} height={580} mode="grow" className="w-full">
            <div className="relative h-[580px] w-[1440px] overflow-clip bg-[#5a0402]">
              <div
                className="absolute inset-0"
                style={{ background: "radial-gradient(130% 120% at 78% 45%, #b81412 0%, #7c0704 42%, #40060a 100%)" }}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Четыре лимитированные карты Т-Банка с иллюстрациями культовых автомобилей"
                className="absolute inset-0 size-full object-cover"
                src={`${CASE}/cover-cards.jpg`}
              />
            </div>
          </FullBleedScale>

          <HeroScrim color="#4d0000" />

          <div className="pointer-events-none absolute inset-0 z-[2] mx-auto w-[1440px]">
            <p className="absolute bottom-[138px] left-[46px] w-[1278px] whitespace-pre-wrap font-heading text-[52px] font-bold uppercase leading-[1.2] tracking-[1.04px] text-white">
              Карты <br />
              для пэтролхэдов
            </p>
            <p className="absolute left-[40px] top-[-2px] whitespace-nowrap font-heading text-[175px] font-bold leading-[1.2] tracking-[5.25px] text-white opacity-60">
              005
            </p>
          </div>
        </div>

        <div className="relative mx-auto w-[1440px]" style={{ height: 320 }}>
          <p className="absolute left-[46px] top-[102px] whitespace-nowrap font-heading text-[32px] font-bold leading-[1.1] tracking-[0.96px] text-[#121212]">
            О ПРОЕКТЕ
          </p>
          <p className="absolute left-[46px] top-[149px] w-[668px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
            В рамках коллаборации Авто.ру и Т-Банка была создана серия лимитированных банковских
            карт, посвящённых культовым автомобилям.
          </p>
          <p className="absolute left-[46px] top-[189px] w-[668px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
            К проекту пригласили четырёх иллюстраторов. Каждый получил один легендарный автомобиль и
            должен был переосмыслить его через собственный визуальный язык.
          </p>

          <div className="absolute left-[1066px] top-[149px] flex w-[102px] flex-col items-start gap-[4px]">
            <p className="text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px]">Позиция</p>
            <p className="text-[14px] leading-[1.2] tracking-[0.28px] opacity-70">Иллюстратор</p>
          </div>
          <div className="absolute left-[1236px] top-[149px] flex w-[130px] flex-col items-start gap-[4px]">
            <p className="text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px]">Клиент</p>
            <p className="text-[14px] leading-[1.2] tracking-[0.28px] opacity-70">Авто.ру и Т-Банк</p>
          </div>

          <Reveal variant="line" delay={0.25} className="absolute left-[1078px] top-[194px] h-[24px] w-[294px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" className="block size-full max-w-none" src="/cases/case-05/underline.svg" />
          </Reveal>
        </div>
      </div>

      <div className="mx-auto flex w-[1440px] flex-col items-start">
        <Research />
        <Idea />
      </div>

      {/* Концепция — тёмный full-bleed. */}
      <Concept />
      {/* Работа с деталями — тёмный full-bleed. */}
      <Details />

      <div className="mx-auto flex w-[1440px] flex-col items-start">
        <Color />
        <Result />
      </div>

      {/* Мокап — карта в руке на всю ширину экрана. */}
      <div className="w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="Карта Mad Max DeLorean в руке на красном фоне"
          className="block w-full"
          src={`${CASE}/mockup.jpg`}
        />
      </div>

      <Footer />
    </div>
  );
}
