import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FullBleedScale from "@/components/FullBleedScale";
import HeroScrim from "@/components/HeroScrim";
import DrawIn from "@/components/DrawIn";
import Task from "./sections/Task";
import Research from "./sections/Research";
import VisualLanguage from "./sections/VisualLanguage";
import Process from "./sections/Process";
import First16px from "./sections/First16px";
import Summary from "./sections/Summary";

// Кейс 002 «Иконки Yandex Cloud» — собран 1:1 из Figma (frame 2009:12035)
// по образцу кейса 001: каждый раздел — реальный DOM с настоящим текстом,
// все векторные изображения — SVG, плотные растровые композиции (мокапы
// ноутбука, фото резки металла, документ «Исследование») — ассеты.
//
// Правила полноэкранности:
// - Обложка/«О проекте» занимает весь первый экран (min-h-screen); тёмный
//   hero с мокапом растёт равномерно с шириной экрана (FullBleedScale
//   mode="grow"), текст — отдельный непомасштабированный слой в 1440-сетке.
// - Тёмный блок «Визуальный язык» — full-bleed фон (прямой ребёнок root).
// - Блоки-мокапы (Мокап1/Мокап2) — цельное изображение, пропорционально
//   растягивается на всю ширину экрана (img w-full).
export default function Case02Page() {
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
                    alt="Сайт Yandex Cloud на экране ноутбука"
                    className="absolute inset-0 size-full object-cover"
                    src="/cases/case-02/sections/cover-mockup.png"
                  />
                </div>
              </div>
            </FullBleedScale>

            <HeroScrim color="#1b1b21" />

            <div className="pointer-events-none absolute inset-0 z-[2] mx-auto w-full max-w-[1440px] px-[var(--grid-margin)] xl:px-0">
              <p className="absolute bottom-[16%] left-[var(--grid-margin)] w-[80%] max-w-[1180px] whitespace-pre-wrap font-heading text-[clamp(1.9rem,6vw,52px)] font-bold uppercase leading-[1.2] tracking-[1.04px] text-white xl:bottom-[138px] xl:left-[46px] xl:!text-[52px]">
                ИКОНКИ <br />
                YANDEX CLOUD
              </p>
              <p className="absolute left-[var(--grid-margin)] top-[-2px] whitespace-nowrap font-heading text-[clamp(4rem,14vw,175px)] font-bold leading-[1.2] tracking-[5.25px] text-white opacity-60 xl:left-[40px] xl:!text-[175px]">
                002
              </p>
            </div>
          </div>

          {/* <1440 — reflow: 375 (база) / 834 (sm) / 1280 (lg).
              375 (Figma 2637:30543): блок 375×356; мокап 534×356 центрирован
              со сдвигом +34.5px (`left: calc(50%+34.5px)`); скрим 375×274 @
              (0,82); текст-блок на весь блок, паддинг pt20/px20/pb36 —
              «002» 44px вверху, «ИКОНКИ YANDEX CLOUD» 26px/ls 0.6 внизу.
              834 (Figma 2637:30523): блок 834×834; мокап 1512×1008 @ (−282,−90);
              скрим 834×593 @ (0,241) mix-blend-multiply; текст-блок 573×696 @
              (40,66) — «002» 100px/ls 3 вверху, «ИКОНКИ YANDEX CLOUD» 52px/ls 1.04
              внизу (space-between).
              1280 (Figma 2613:16465): 1280×828; мокап 1643×1095 @ (−50,−134);
              скрим 1277×593 @ (3,244); текст 1000×683 @ (40,72); «002» 152px. */}
          <div className="relative h-[356px] w-full overflow-clip bg-[#121212] sm:h-[834px] lg:h-[828px] xl:hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Сайт Yandex Cloud на экране ноутбука"
              className="absolute left-[calc(50%-232.5px)] top-0 h-full w-[534px] max-w-none object-cover sm:left-[-282px] sm:top-[-90px] sm:h-[1008px] sm:w-[1512px] lg:left-[-50px] lg:top-[-134px] lg:h-[1095px] lg:w-[1643px]"
              src="/cases/case-02/sections/cover-mockup.png"
            />
            {/* Градиент-скрим, mix-blend-multiply. */}
            <div
              className="pointer-events-none absolute inset-x-0 top-[82px] h-[274px] mix-blend-multiply sm:top-[241px] sm:h-[593px] lg:left-[3px] lg:right-auto lg:top-[244px] lg:w-[1277px]"
              style={{ background: "linear-gradient(to bottom, rgba(18,18,18,0), #121212)" }}
            />
            {/* Текст-блок: число вверху / название внизу (space-between). */}
            <div className="absolute inset-0 z-[2] flex flex-col justify-between px-[20px] pb-[36px] pt-[20px] font-heading font-bold uppercase text-white sm:inset-auto sm:left-[40px] sm:top-[66px] sm:h-[696px] sm:w-[573px] sm:p-0 lg:left-[40px] lg:top-[72px] lg:h-[683px] lg:w-[1000px]">
              <p className="text-[44px] leading-none opacity-60 sm:text-[100px] sm:leading-[1.2] sm:tracking-[3px] lg:text-[152px] lg:tracking-[4.56px]">
                002
              </p>
              <p className="whitespace-pre-line text-[26px] leading-[1.15] tracking-[0.6px] sm:text-[52px] sm:leading-[1.2] sm:tracking-[1.04px]">
                ИКОНКИ{"\n"}YANDEX CLOUD
              </p>
            </div>
          </div>
        </div>

        {/* Белая часть под hero — на десктопе абсолют 1440×318, ниже 1200
            поток. 1280 (Figma 2613:16466): один ряд — абзац 593 слева,
            мета-колонки справа (justify-between), паддинг 40 / 56. */}
        <div className="w-full max-w-[1440px] xl:relative xl:mx-auto">
          <div className="flex flex-col gap-[12px] px-[var(--grid-margin)] py-[64px] sm:py-[72px] lg:py-[56px] xl:contents">
            <p className="font-heading text-[26px] font-bold leading-[1.1] tracking-[0.78px] text-[#121212] sm:text-[32px] sm:tracking-[0.96px] xl:absolute xl:left-[46px] xl:top-[102px] xl:whitespace-nowrap xl:text-[32px]">
              О ПРОЕКТЕ
            </p>
            <div className="flex flex-col gap-[32px] sm:flex-row sm:items-start sm:justify-between sm:gap-[40px] xl:contents">
            <p className="text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70 sm:w-[382px] sm:shrink-0 lg:w-[593px] xl:absolute xl:left-[46px] xl:top-[149px] xl:w-[498px]">
              В начале 2026 года Yandex Cloud обновлял визуальный язык продукта. За три недели команда разработала 34 иконки в двух размерах: 16×16 px для интерфейса, 640×640 px для иллюстраций на сайте, параллельно формируя сам стиль. Успели точно в срок, это было ключевым условием клиента.
            </p>

            <div className="relative flex flex-wrap gap-x-[24px] gap-y-[16px] sm:flex-nowrap sm:gap-x-[40px] xl:contents">
              <div className="flex flex-col items-start gap-[4px] sm:w-[102px] xl:absolute xl:left-[896px] xl:top-[149px]">
                <p className="text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px]">Позиция</p>
                <p className="text-[14px] leading-[1.2] tracking-[0.28px] opacity-70">Lead designer</p>
              </div>
              <div className="flex flex-col items-start gap-[4px] sm:w-[98px] xl:absolute xl:left-[1066px] xl:top-[149px]">
                <p className="text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px]">Команда</p>
                <p className="text-[14px] leading-[1.2] tracking-[0.28px] opacity-70">1 дизайнер</p>
              </div>
              <div className="flex flex-col items-start gap-[4px] sm:w-[98px] xl:absolute xl:left-[1236px] xl:top-[149px]">
                <p className="text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px]">Клиент</p>
                <p className="text-[14px] leading-[1.2] tracking-[0.28px] opacity-70">Яндекс</p>
              </div>

              {/* Декор-подчёркивание под метой — reflow 834/1280 (в макете
                  Figma есть, на 375 нет, на xl — своя абсолютная копия ниже). */}
              <DrawIn
                src="/cases/case-02/sections/cover-underline.svg"
                className="pointer-events-none absolute right-0 top-[calc(100%+8px)] hidden h-[16px] w-[340px] max-w-full sm:block xl:hidden"
              />
            </div>
            </div>

            <DrawIn
              src="/cases/case-02/sections/cover-underline.svg"
              delay={0.35}
              play="mount"
              className="hidden xl:absolute xl:left-[917.94px] xl:top-[200.02px] xl:block xl:h-[22.356px] xl:w-[414.405px]"
            />
          </div>
          <div className="hidden xl:block xl:h-[318px]" aria-hidden />
        </div>
      </div>

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
          alt="Сайт Yandex Cloud Stackland на экране ноутбука"
          className="block w-full"
          src="/cases/case-02/sections/mockup-1.png"
        />
      </div>

      <Summary />

      {/* Мокап 2 — изображение на всю ширину экрана. */}
      <div className="w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="Архитектура Yandex Cloud Stackland на экранах двух ноутбуков"
          className="block w-full"
          src="/cases/case-02/sections/mockup-2.png"
        />
      </div>

      <Footer />
    </div>
  );
}
