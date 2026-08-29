import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FullBleedScale from "@/components/FullBleedScale";
import Reveal from "@/components/Reveal";
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

      {/* Обложка + «О проекте» — весь первый экран. */}
      <div className="relative flex min-h-screen w-full flex-col items-center overflow-clip bg-[#fafafa]">
        <div className="relative w-full">
          <FullBleedScale width={1440} height={580} mode="grow" className="w-full">
            <div className="relative h-[580px] w-[1440px] overflow-clip bg-[#121212]">
              <div className="absolute left-0 top-[-221px] h-[1095.464px] w-[1642.995px]">
                <img
                  alt="Сайт Yandex Cloud на экране ноутбука"
                  className="absolute inset-0 size-full object-cover"
                  src="/cases/case-02/sections/cover-mockup.png"
                />
              </div>
            </div>
          </FullBleedScale>

          <div className="pointer-events-none absolute inset-0 mx-auto w-[1440px]">
            <p className="absolute bottom-[138px] left-[46px] w-[1180px] whitespace-pre-wrap font-heading text-[52px] font-bold uppercase leading-[1.2] tracking-[1.04px] text-white">
              ИКОНКИ <br />
              YANDEX CLOUD
            </p>
            <p className="absolute left-[40px] top-[-2px] whitespace-nowrap font-heading text-[175px] font-bold leading-[1.2] tracking-[5.25px] text-white opacity-60">
              002
            </p>
          </div>
        </div>

        {/* Белая часть под hero — normal flow, отсчёт координат минус 580. */}
        <div className="relative mx-auto w-[1440px] flex-1" style={{ minHeight: 318 }}>
          <p className="absolute left-[46px] top-[102px] whitespace-nowrap font-heading text-[32px] font-bold leading-[1.1] tracking-[0.96px] text-[#121212]">
            О ПРОЕКТЕ
          </p>
          <p className="absolute left-[46px] top-[149px] w-[498px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
            В начале 2026 года Yandex Cloud обновлял визуальный язык продукта. За три недели нашей
            команде нужно было разработать 34 иконки в двух размерах, параллельно формируя принципы
            нового стиля.
          </p>

          <div className="absolute left-[896px] top-[149px] flex w-[102px] flex-col items-start gap-[4px]">
            <p className="text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px]">Позиция</p>
            <p className="text-[14px] leading-[1.2] tracking-[0.28px] opacity-70">Арт-директор</p>
          </div>
          <div className="absolute left-[1066px] top-[149px] flex w-[98px] flex-col items-start gap-[4px]">
            <p className="text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px]">Команда</p>
            <p className="text-[14px] leading-[1.2] tracking-[0.28px] opacity-70">1 дизайнер</p>
          </div>
          <div className="absolute left-[1236px] top-[149px] flex w-[98px] flex-col items-start gap-[4px]">
            <p className="text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px]">Клиент</p>
            <p className="text-[14px] leading-[1.2] tracking-[0.28px] opacity-70">Яндекс</p>
          </div>

          <Reveal variant="line" delay={0.3} className="absolute left-[920.94px] top-[203.02px] h-[16.356px] w-[408.405px]">
            <div className="absolute inset-[-18.34%_-0.73%]">
              <img alt="" className="block size-full max-w-none" src="/cases/case-02/sections/cover-underline.svg" />
            </div>
          </Reveal>
        </div>
      </div>

      <div className="mx-auto flex w-[1440px] flex-col items-start">
        <Task />
        <Research />
      </div>

      {/* Визуальный язык — тёмный full-bleed фон. */}
      <VisualLanguage />

      <div className="mx-auto flex w-[1440px] flex-col items-start">
        <Process />
        <First16px />
      </div>

      {/* Мокап 1 — изображение на всю ширину экрана. */}
      <div className="w-full">
        <img
          alt="Сайт Yandex Cloud Stackland на экране ноутбука"
          className="block w-full"
          src="/cases/case-02/sections/mockup-1.png"
        />
      </div>

      <div className="mx-auto flex w-[1440px] flex-col items-start">
        <Summary />
      </div>

      {/* Мокап 2 — изображение на всю ширину экрана. */}
      <div className="w-full">
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
