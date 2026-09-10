import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FullBleedScale from "@/components/FullBleedScale";
import HeroScrim from "@/components/HeroScrim";
import DrawIn from "@/components/DrawIn";
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
    <div className="flex w-full flex-col items-center overflow-x-clip">
      <Header />
      <div className="h-[62px] w-full shrink-0" />

      {/* Обложка + «О проекте» — весь первый экран.
          ≥1440 — 1:1 из Figma-канваса 1440 (FullBleedScale, абсолютные
          координаты). <1440 — отдельная раскладка 1:1 из Figma reflow-фрейма
          «case-03 · 1280» (node 2695:17651): обложка ниже и без бокового
          блик-градиента, «003» и заголовок стоят колонкой, а не
          top-left/bottom-anchored порознь. */}
      {/* min-h-screen — только ≥640: на десктопе/планшете обложка + «О проекте»
          занимают первый экран. На 375 обложка — фикс-картинка 356px, «О
          проекте» течёт сама → min-h-screen давал бы ~70px пустоты снизу. */}
      <div className="relative flex w-full flex-col items-center overflow-clip bg-[#fafafa] sm:min-h-screen">
        <div className="relative w-full">
          {/* ≥1440 */}
          <div className="hidden xl:block">
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

            <HeroScrim color="#0b1266" />

            <div className="pointer-events-none absolute inset-0 z-[2] mx-auto w-[1440px]">
              <p className="absolute bottom-[138px] left-[46px] w-[1278px] whitespace-pre-wrap font-heading text-[52px] font-bold uppercase leading-[1.2] tracking-[1.04px] text-white">
                3D-иллюстраций <br />
                для финтех-продукта
              </p>
              <p className="absolute left-[40px] top-[-2px] whitespace-nowrap font-heading text-[175px] font-bold leading-[1.2] tracking-[5.25px] text-white" style={{ opacity: 0.56 }}>
                003
              </p>
            </div>
          </div>

          {/* 1024–1439 — 1:1 из Figma reflow-фрейма «case-03 · 1280» (node
              2704:41352, h828). FullBleedScale масштабирует фикс-канвас
              1280×828 под реальную ширину — все координаты 1:1 из Figma. */}
          <div className="hidden w-full lg:block xl:hidden">
            <FullBleedScale width={1280} height={828} mode="grow" className="w-full">
              <div className="relative h-[828px] w-[1280px] overflow-clip bg-[#121212]">
                {/* Фото ноутбука (behance-675a93f92dc0a 1). */}
                <img
                  alt="Сайт Stablegate на экране ноутбука"
                  className="absolute left-[-35.35px] top-[-282.1px] h-[1109.675px] w-[1667.974px] max-w-none object-cover"
                  src="/cases/case-03/sections/hero1280-mockup.jpg"
                />
                {/* Синий блюр-градиент слева. */}
                <div
                  className="absolute left-[-1026.76px] top-[-282.1px] h-[1123.918px] w-[1066.658px] blur-[23.722px]"
                  style={{ background: "linear-gradient(to bottom, #425afa 13.319%, #2738cc 55.604%, #1a2ba1 97.889%)" }}
                />
                {/* Subtract — multiply-blend blur-форма. */}
                <div className="absolute left-[-1475.01px] top-[-696px] h-[2077.694px] w-[3335.762px] mix-blend-multiply">
                  <div className="absolute inset-[-23.62%_-14.71%]">
                    <img alt="" className="block size-full max-w-none" src="/cases/case-03/sections/hero1280-subtract.svg" />
                  </div>
                </div>
                {/* Ellipse 6794 — multiply-blend, наклон -61.82°. */}
                <div className="absolute left-[-2271px] top-[-656.1px] flex h-[3027.104px] w-[3842.988px] items-center justify-center mix-blend-multiply">
                  <div className="rotate-[-61.82deg]">
                    <div className="relative h-[3534.25px] w-[1540.825px]">
                      <div className="absolute inset-[-9.26%_-21.24%]">
                        <img alt="" className="block size-full max-w-none" src="/cases/case-03/sections/hero1280-ellipse.svg" />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Тёмный градиент-скрим снизу (multiply) — читаемость текста. */}
                <div
                  className="absolute left-[3px] top-[244px] h-[593px] w-[1277px] mix-blend-multiply"
                  style={{ background: "linear-gradient(to bottom, rgba(18,18,18,0), #121212)" }}
                />
                {/* Текст: «003» вверху, заголовок внизу — одна левая колонка. */}
                <div className="absolute left-[40px] top-[72px] flex h-[683px] w-[1000px] flex-col items-start justify-between font-heading font-bold leading-[1.2] text-white">
                  <p className="w-min min-w-full text-[152px] tracking-[4.56px]" style={{ opacity: 0.6 }}>
                    003
                  </p>
                  <p className="w-[1278px] whitespace-pre-wrap text-[52px] uppercase tracking-[1.04px]">
                    3D-иллюстраций <br />
                    для финтех-продукта
                  </p>
                </div>
              </div>
            </FullBleedScale>
          </div>

          {/* <640 — 1:1 из Figma «case-03 · 375» (node 2711:13965, 375×356).
              Композит с blend-modes → единый бейк. */}
          <div className="w-full sm:hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Сайт Stablegate на экране ноутбука · 3D-иллюстраций для финтех-продукта"
              className="block w-full"
              src="/cases/case-03/sections/hero375.jpg"
            />
          </div>

          {/* 640–1023 — 1:1 из Figma reflow-фрейма «case-03 · 834» (node
              2708:13493, 834×834). Синего блик-градиента нет (в отличие от
              1280); фото ноутбука — свой кроп 1020×921. */}
          <div className="hidden w-full sm:block lg:hidden">
            <FullBleedScale width={834} height={834} mode="grow" className="w-full">
              <div className="relative h-[834px] w-[834px] overflow-clip bg-[#121212]">
                {/* Фото ноутбука (behance-675a93f92dc0a 1) — (-76,-18), 1020×921. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="Сайт Stablegate на экране ноутбука"
                  className="absolute left-[-76px] top-[-18px] h-[921px] w-[1020px] max-w-none object-cover"
                  src="/cases/case-03/sections/hero834-mockup.jpg"
                />
                {/* Subtract — multiply-blend blur-форма (-1175.45,-340), 2039×1270. */}
                <div className="absolute left-[-1175.45px] top-[-340px] h-[1270px] w-[2039px] mix-blend-multiply">
                  <div className="absolute inset-[-23.62%_-14.71%]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img alt="" className="block size-full max-w-none" src="/cases/case-03/sections/hero834-subtract.svg" />
                  </div>
                </div>
                {/* Ellipse 6794 — multiply-blend, наклон -61.82°. */}
                <div className="absolute left-[-1451px] top-[-315.61px] flex h-[1850.332px] w-[2349.045px] items-center justify-center mix-blend-multiply">
                  <div className="rotate-[-61.82deg]">
                    <div className="relative h-[2160.327px] w-[941.836px]">
                      <div className="absolute inset-[-9.26%_-21.24%]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img alt="" className="block size-full max-w-none" src="/cases/case-03/sections/hero834-ellipse.svg" />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Тёмный градиент-скрим снизу (multiply) — (0,241), 834×593. */}
                <div
                  className="absolute left-0 top-[241px] h-[593px] w-[834px] mix-blend-multiply"
                  style={{ background: "linear-gradient(to bottom, rgba(18,18,18,0), #121212)" }}
                />
                {/* Текст: «003» вверху, заголовок внизу — фрейм (40,66), 754×696. */}
                <div className="absolute left-[40px] top-[66px] flex h-[696px] w-[754px] flex-col items-start justify-between overflow-clip font-heading font-bold leading-[1.2] text-white">
                  <p className="whitespace-nowrap text-[100px] tracking-[3px]" style={{ opacity: 0.6 }}>
                    003
                  </p>
                  <p className="w-[1278px] whitespace-pre-wrap text-[52px] uppercase tracking-[1.04px]">
                    3D-иллюстраций <br />
                    для финтех-продукта
                  </p>
                </div>
              </div>
            </FullBleedScale>
          </div>
        </div>

        {/* flex-1 только на ≥1440 (там «О проекте» — xl:contents + xl:absolute
            против min-h-screen, обёртка должна заполнить первый экран). На
            reflow-ветках flex-1 растягивал бы блок «О проекте» на пол-экрана
            пустоты (особенно 375, где обложка всего 356). */}
        <div className="relative mx-auto w-full max-w-[1200px] xl:w-[1440px] xl:max-w-none xl:flex-1" style={{ minHeight: 318 }}>
          {/* ≥1440 */}
          <div className="hidden xl:contents">
            <p className="absolute left-[46px] top-[102px] whitespace-nowrap font-heading text-[32px] font-bold leading-[1.1] tracking-[0.96px] text-[#121212]">
              О ПРОЕКТЕ
            </p>
            <p className="absolute left-[46px] top-[148px] w-[670px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
              Для Stablegate разработана система 3D key visuals: 3D выбрали вместо плоских иллюстраций, потому что так лучше вписывается в дизайн сайта. Сегодня в библиотеке 12 иллюстраций, готовый набор сокращает подготовку новых материалов вдвое — команда берёт готовую иллюстрацию вместо поиска на стоках или генерации с нуля.
            </p>

            <div className="absolute left-[1066px] top-[149px] flex w-[102px] flex-col items-start gap-[4px]">
              <p className="text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px]">Позиция</p>
              <p className="text-[14px] leading-[1.2] tracking-[0.28px] opacity-70">3D Artist</p>
            </div>
            <div className="absolute left-[1236px] top-[149px] flex w-[98px] flex-col items-start gap-[4px]">
              <p className="text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px]">Клиент</p>
              <p className="text-[14px] leading-[1.2] tracking-[0.28px] opacity-70">Stablegate</p>
            </div>

            <DrawIn
              src="/cases/case-03/sections/cover-underline.svg"
              delay={0.35}
              play="mount"
              className="absolute left-[1076.81px] top-[196.26px] h-[17.294px] w-[267.713px]"
            />
          </div>

          {/* <640 — 1:1 из Figma «case-03 · 375» (node 2695:19248, 375×375):
              flex flex-col gap-32 px-20 py-64. «О ПРОЕКТЕ» Wix Bold 26. Мета в
              ряд (gap 24). Клиент «Stablegate». Без декор-линии. */}
          <div className="flex flex-col gap-[32px] px-[20px] py-[64px] sm:hidden">
            <div className="flex flex-col gap-[12px] text-[#121212]">
              <p className="font-heading text-[26px] font-bold leading-[1.1] tracking-[0.78px]">О ПРОЕКТЕ</p>
              <p className="whitespace-pre-wrap text-[14px] leading-[1.2] tracking-[0.28px] opacity-70">
              Для Stablegate разработана система 3D key visuals: 3D выбрали вместо плоских иллюстраций, потому что так лучше вписывается в дизайн сайта. Сегодня в библиотеке 12 иллюстраций, готовый набор сокращает подготовку новых материалов вдвое — команда берёт готовую иллюстрацию вместо поиска на стоках или генерации с нуля.
            </p>
            </div>
            <div className="flex items-center gap-[24px] whitespace-nowrap text-[14px] leading-[1.2] tracking-[0.28px] text-black">
              <div className="flex w-[102px] flex-col items-start gap-[4px]">
                <p className="font-medium uppercase">Позиция</p>
                <p className="opacity-70">3D Artist</p>
              </div>
              <div className="flex w-[98px] flex-col items-start gap-[4px]">
                <p className="font-medium uppercase">Клиент</p>
                <p className="opacity-70">Stablegate</p>
              </div>
            </div>
          </div>

          {/* 640–1023 — 1:1 из Figma reflow-фрейма «case-03 · 834» (node
              2695:18452, 834×310): фрейм контента (28,72,778×166), gap 12;
              строка «left» — абзац 382 + мета (x613). Клиент «Яндекс». */}
          <div className="hidden flex-col gap-[12px] px-[28px] py-[72px] sm:flex lg:hidden">
            <p className="whitespace-nowrap font-heading text-[32px] font-bold leading-[1.1] tracking-[0.96px] text-[#121212]">
              О ПРОЕКТЕ
            </p>
            <div className="flex items-start justify-between">
              <p className="w-[382px] max-w-[62%] whitespace-pre-wrap text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
              Для Stablegate разработана система 3D key visuals: 3D выбрали вместо плоских иллюстраций, потому что так лучше вписывается в дизайн сайта. Сегодня в библиотеке 12 иллюстраций, готовый набор сокращает подготовку новых материалов вдвое — команда берёт готовую иллюстрацию вместо поиска на стоках или генерации с нуля.
            </p>
              <div className="relative flex shrink-0 gap-[40px] whitespace-nowrap">
                <div className="flex flex-col items-start gap-[4px]">
                  <p className="text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px] text-[#121212]">Позиция</p>
                  <p className="text-[14px] leading-[1.2] tracking-[0.28px] opacity-70">3D Artist</p>
                </div>
                <div className="flex flex-col items-start gap-[4px]">
                  <p className="text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px] text-[#121212]">Клиент</p>
                  <p className="text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">Яндекс</p>
                </div>

                {/* Декор-подчёркивание (Vector 234257362) — по замеру Figma
                    линия занимает x 638–818 (виден участок ~180), правый край
                    на ~12px правее меты. Держим right-[-14px] w-190 (viewBox
                    201×14.4 → h 13.6), лёгкий наклон вверх-вправо — в самом SVG. */}
                <DrawIn
                  src="/cases/case-03/sections/oproekte-underline-834.svg"
                  className="pointer-events-none absolute right-[-14px] top-[calc(100%+8px)] h-[13.6px] w-[190px]"
                />
              </div>
            </div>
          </div>

          {/* 1024–1439 — 1:1 из Figma node 2695:17656 (y828 h280): фрейм
              контента (40,64,1201×115), gap 12; строка «left» (0,47) —
              абзац 594 + мета (x1036). Клиент «Яндекс» (как в 1280-фрейме,
              не «Stablegate»). */}
          <div className="hidden flex-col gap-[12px] px-[40px] py-[64px] lg:flex xl:hidden">
            <p className="whitespace-nowrap font-heading text-[32px] font-bold leading-[1.1] tracking-[0.96px] text-[#121212]">
              О ПРОЕКТЕ
            </p>
            <div className="flex items-start justify-between gap-[40px]">
              <p className="w-[594px] max-w-full text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
              Для Stablegate разработана система 3D key visuals: 3D выбрали вместо плоских иллюстраций, потому что так лучше вписывается в дизайн сайта. Сегодня в библиотеке 12 иллюстраций, готовый набор сокращает подготовку новых материалов вдвое — команда берёт готовую иллюстрацию вместо поиска на стоках или генерации с нуля.
            </p>
              <div className="relative flex shrink-0 gap-[40px] whitespace-nowrap">
                <div className="flex flex-col items-start gap-[4px]">
                  <p className="text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px]">Позиция</p>
                  <p className="text-[14px] leading-[1.2] tracking-[0.28px] opacity-70">3D Artist</p>
                </div>
                <div className="flex flex-col items-start gap-[4px]">
                  <p className="text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px]">Клиент</p>
                  <p className="text-[14px] leading-[1.2] tracking-[0.28px] opacity-70">Яндекс</p>
                </div>

                {/* Декор-подчёркивание под метой — reflow 1280 (в макете
                    Figma есть; xl использует свою абсолютную копию выше). */}
                <DrawIn
                  src="/cases/case-03/sections/cover-underline.svg"
                  className="pointer-events-none absolute right-0 top-[calc(100%+8px)] h-[16px] w-[224px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Секция сайта — светлая белая карточка. */}
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-start">
        <SiteFeatures />
      </div>

      {/* Задача — лента «варианты» тянется на всю ширину экрана, потому
          вне центрированной 1440-сетки. */}
      <Task />

      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-start">
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
