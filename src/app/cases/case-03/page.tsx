import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FullBleedScale from "@/components/FullBleedScale";
import Reveal from "@/components/Reveal";
import SiteFeatures from "./sections/SiteFeatures";
import Task from "./sections/Task";
import Research from "./sections/Research";
import VisualSystem from "./sections/VisualSystem";
import PrinciplesSlides from "./sections/PrinciplesSlides";
import Process from "./sections/Process";
import Summary from "./sections/Summary";

// Кейс 003 «3D-иллюстраций для финтех-продукта» (Stablegate) — собран
// 1:1 из Figma (frame 2022:14228) по образцу кейсов 001/002: реальный
// DOM с настоящим текстом, векторные ассеты — SVG, плотные 3D-рендеры и
// фото — растровые ассеты. Тёмные блоки — full-bleed фон; блоки-картинки
// (мокапы, фото, 3D-сеты) — пропорционально на всю ширину экрана.
// Обложка/«О проекте» — весь первый экран (min-h-screen, FullBleedScale).
export default function Case03Page() {
  return (
    <div className="flex w-full flex-col items-center">
      <Header />
      <div className="h-[62px] w-full shrink-0" />

      {/* Обложка + «О проекте» — весь первый экран. */}
      <div className="relative flex min-h-screen w-full flex-col items-center overflow-clip bg-[#fafafa]">
        <div className="relative w-full">
          <FullBleedScale width={1440} height={580} mode="grow" className="w-full">
            <div className="relative h-[580px] w-[1440px] overflow-clip bg-[#121212]">
              <div className="absolute left-[461px] top-[-92px] h-[678px] w-[1020px]">
                <img
                  alt="Сайт Stablegate на экране ноутбука"
                  className="absolute inset-0 size-full object-cover"
                  src="/cases/case-03/sections/cover-mockup.jpg"
                />
              </div>
              <div
                className="absolute left-[-145px] top-[-92px] h-[687px] w-[652px] blur-[14.5px]"
                style={{ background: "linear-gradient(to bottom, #425afa 13.3%, #2738cc 55.6%, #1a2ba1 97.9%)" }}
              />
              <div className="absolute left-[-299px] top-[-345px] h-[1270px] w-[2039px] mix-blend-multiply">
                <div className="absolute inset-[-23.62%_-14.71%]">
                  <img alt="" className="block size-full max-w-none" src="/cases/case-03/sections/cover-subtract.svg" />
                </div>
              </div>
            </div>
          </FullBleedScale>

          <div className="pointer-events-none absolute inset-0 mx-auto w-[1440px]">
            <p className="absolute bottom-[138px] left-[46px] w-[1278px] whitespace-pre-wrap font-heading text-[52px] font-bold uppercase leading-[1.2] tracking-[1.04px] text-white">
              3D-иллюстраций <br />
              для финтех-продукта
            </p>
            <p className="absolute left-[40px] top-[-2px] whitespace-nowrap font-heading text-[175px] font-bold leading-[1.2] tracking-[5.25px] text-white" style={{ opacity: 0.56 }}>
              003
            </p>
          </div>
        </div>

        <div className="relative mx-auto w-[1440px] flex-1" style={{ minHeight: 318 }}>
          <p className="absolute left-[46px] top-[102px] whitespace-nowrap font-heading text-[32px] font-bold leading-[1.1] tracking-[0.96px] text-[#121212]">
            О ПРОЕКТЕ
          </p>
          <p className="absolute left-[46px] top-[148px] w-[670px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
            Для Stablegate я разработал систему 3D key visuals, которая помогает быстро и наглядно
            объяснять ключевые функции и преимущества финтех-продукта. Проект включал весь цикл
            работы: от поиска визуальных метафор и построения дизайн-системы до создания финальных
            иллюстраций, которые используются на сайте, в презентациях, email-рассылках,
            социальных сетях и других маркетинговых материалах.
          </p>

          <div className="absolute left-[1066px] top-[149px] flex w-[102px] flex-col items-start gap-[4px]">
            <p className="text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px]">Позиция</p>
            <p className="text-[14px] leading-[1.2] tracking-[0.28px] opacity-70">3D Artist</p>
          </div>
          <div className="absolute left-[1236px] top-[149px] flex w-[98px] flex-col items-start gap-[4px]">
            <p className="text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px]">Клиент</p>
            <p className="text-[14px] leading-[1.2] tracking-[0.28px] opacity-70">Stablegate</p>
          </div>

          <Reveal variant="line" delay={0.3} className="absolute left-[1079.81px] top-[199.26px] h-[11.294px] w-[261.713px]">
            <div className="absolute inset-[-26.56%_-1.15%]">
              <img alt="" className="block size-full max-w-none" src="/cases/case-03/sections/cover-underline.svg" />
            </div>
          </Reveal>
        </div>
      </div>

      {/* Секция сайта — светлая белая карточка. */}
      <div className="mx-auto flex w-[1440px] flex-col items-start">
        <SiteFeatures />
        <Task />
        <Research />
      </div>

      {/* Визуальная система — тёмный full-bleed. */}
      <VisualSystem />
      {/* Принципы дизайна — 2 слайда, закреплённый блок с кроссфейдом по
          скроллу (как «Проблема / Экран» в кейсе 1), тёмный full-bleed. */}
      <PrinciplesSlides />
      {/* Процесс + Дизайн-система + сет 3D-иконок — один тёмный full-bleed
          раздел (слит в актуальной Figma), трек по колесу мыши. */}
      <Process />

      {/* Итог — тёмный текст на светлом фоне, мокап-фрейм пропорционально
          во всю ширину экрана (потому вне центрированной 1440-сетки). */}
      <Summary />

      <Footer />
    </div>
  );
}
