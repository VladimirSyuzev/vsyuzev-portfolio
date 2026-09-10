import DrawIn from "@/components/DrawIn";
import FullBleedScale from "@/components/FullBleedScale";

// 03 Визуальная система — 1:1 из актуальной Figma (node 2022:14714,
// высота 1539). Тёмный full-bleed. Заголовок стопкой («03» / «Визуальная
// система»), два вводных абзаца, фото презентации на конференции —
// фрейм пропорционально во всю ширину экрана (на мониторах шире 1440
// растёт вместе с шириной, высота — по соотношению сторон), ниже —
// итоговая мысль в обводке-эллипсе.
const A = "/cases/case-03/sections";

export default function VisualSystem() {
  return (
    <section className="relative flex w-full flex-col bg-[#121212]">
      {/* ≥1440 — заголовок + вводные абзацы в центрированной 1440-сетке. */}
      <div className="relative mx-auto hidden h-[318px] w-[1440px] xl:block">
        <div className="absolute left-[46px] top-[64px] flex flex-col font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
          <span className="text-[#008cff]">03</span>
          <span className="w-[246px] text-white">Визуальная система</span>
        </div>

        <p className="absolute left-[46px] top-[181px] w-[498px] text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70">
          Первой иллюстрацией стала Wallet. После её утверждения я сформировал библиотеку
          материалов, настроил универсальную сцену освещения и определил правила построения
          композиций.
        </p>
        <p className="absolute left-[46px] top-[238px] w-[498px] text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70">
          Новые изображения создавались не с нуля: каждая иллюстрация наследовала общие принципы
          работы с формой, материалами, цветом, светом и уровнем детализации.
        </p>

        {/* Доодл «//» (Figma node 2412:4318 → 1236 / 181, 158×125). */}
        <DrawIn
          src={`${A}/principles1-doodle.svg`}
          fit="contain"
          className="absolute left-[1236px] top-[181px] z-10 h-[125px] w-[158px]"
        />
      </div>

      {/* Фото конференции — ≥1440 пропорционально во всю ширину экрана.
          На <1440 фото включено в общий FullBleedScale-канвас ниже. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt="Презентация иллюстраций Stablegate на конференции"
        className="hidden w-full xl:block"
        src={`${A}/vislang-photo.jpg`}
      />

      {/* ≥1440 — итоговая мысль в обводке-эллипсе, центрированная 1440-сетка. */}
      <div className="relative mx-auto hidden h-[440px] w-[1440px] xl:block">
        <DrawIn
          src={`${A}/vislang-ellipse.svg`}
          className="absolute left-[380px] top-[136px] h-[222px] w-[681px]"
        />

        <p className="absolute left-[387px] top-[191px] w-[669px] text-center font-heading text-[32px] font-normal uppercase leading-[1.1] tracking-[0.96px] text-white opacity-70">
          Одна иллюстрация стала основой для масштабируемой визуальной системы
        </p>
      </div>

      {/* <640 — 1:1 из Figma reflow-фрейма «case-03 · 375» (node 2695:19842,
          375×842). Тёмный full-bleed, вертикальный поток: заголовок+текст
          (gap 12) → фото (окно 335×232) → послесловие в обводке-эллипсе.
          Секционный gap 32, поле 20, py 64. */}
      <div className="w-full sm:hidden">
        <FullBleedScale width={375} height={842} mode="grow" className="w-full">
          <div className="relative h-[842px] w-[375px] overflow-clip bg-[#121212]">
            {/* Заголовок «03 / ВИЗУАЛЬНАЯ⏎СИСТЕМА» (20, 64), блок 246. */}
            <div className="absolute left-[20px] top-[64px] flex w-[246px] flex-col font-heading text-[26px] font-bold uppercase leading-[1.1] tracking-[0.78px]">
              <span className="text-[#008cff]">03</span>
              <span className="text-white">
                Визуальная
                <br />
                система
              </span>
            </div>
            {/* Два абзаца (20, 163), 335, gap 6. В 1-м — ручной <br> после
                «стала Wallet. После ». */}
            <div className="absolute left-[20px] top-[163px] flex w-[335px] flex-col gap-[6px] text-[14px] leading-[1.2] tracking-[0.28px] text-white">
              <p className="whitespace-pre-wrap opacity-70">
                Первой иллюстрацией стала Wallet. После{" "}
                <br />
                её утверждения я сформировал библиотеку материалов, настроил универсальную сцену
                освещения и определил правила построения композиций.
              </p>
              <p className="opacity-70">
                Новые изображения создавались не с нуля: каждая иллюстрация наследовала общие
                принципы работы с формой, материалами, цветом, светом и уровнем детализации.
              </p>
            </div>
            {/* Фото конференции (20, 354), окно 335×232 (в Figma картинка 494
                шире окна — экспорт уже закадрирован в окно). */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Презентация иллюстраций Stablegate на конференции"
              className="absolute left-[20px] top-[354px] block h-[232px] w-[335px] max-w-none object-cover"
              src={`${A}/vislang-photo-375.png`}
            />
            {/* Послесловие (20, 650), 335, Wix Regular 22 center opacity-70,
                ручной <br> после «стала основой ». */}
            <p className="absolute left-[20px] top-[650px] w-[335px] whitespace-pre-wrap text-center font-heading text-[22px] font-normal uppercase leading-[1.1] tracking-[0.66px] text-white opacity-70">
              Одна иллюстрация стала основой{" "}
              <br />
              для масштабируемой визуальной системы
            </p>
            {/* Эллипс-обводка (Vector 234257387) — (18.15, 608.8), фикс-бокс
                332.124×168.725, картинка inset -1.78%/-0.9% (preserveAspectRatio
                none — тянется). */}
            <div className="absolute left-[18.15px] top-[608.8px] h-[168.725px] w-[332.124px]">
              <DrawIn
                src={`${A}/vislang-ellipse-375.svg`}
                className="absolute inset-[-1.78%_-0.9%]"
              />
            </div>
          </div>
        </FullBleedScale>
      </div>

      {/* 640–1023 — 1:1 из Figma reflow-фрейма «case-03 · 834» (node 2695:19046,
          834×1165). Тёмный full-bleed. */}
      <div className="hidden w-full sm:block lg:hidden">
        <FullBleedScale width={834} height={1165} mode="grow" className="w-full">
          <div className="relative h-[1165px] w-[834px] overflow-clip bg-[#121212]">
            {/* Заголовок «03 / ВИЗУАЛЬНАЯ⏎СИСТЕМА» (28, 72), блок 246. */}
            <div className="absolute left-[28px] top-[72px] flex w-[246px] flex-col font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
              <span className="text-[#008cff]">03</span>
              <span className="text-white">
                Визуальная
                <br />
                система
              </span>
            </div>
            {/* Два абзаца (28, 189), 778, gap 6. Во 2-м — ручной <br> после
                «общие принципы работы ». */}
            <div className="absolute left-[28px] top-[189px] flex w-[778px] flex-col gap-[6px] text-[14px] leading-[1.2] tracking-[0.28px] text-white">
              <p className="opacity-70">
                Первой иллюстрацией стала Wallet. После её утверждения я сформировал библиотеку
                материалов, настроил универсальную сцену освещения и определил правила построения
                композиций.
              </p>
              <p className="whitespace-pre-wrap opacity-70">
                Новые изображения создавались не с нуля: каждая иллюстрация наследовала общие
                принципы работы{" "}
                <br />с формой, материалами, цветом, светом и уровнем детализации.
              </p>
            </div>
            {/* Доодл «//» (2695:19059) — (689, 61.89), 158×125. */}
            <DrawIn
              src={`${A}/vislang-doodle-834.svg`}
              fit="contain"
              className="absolute left-[689px] top-[62px] z-10 h-[125px] w-[158px]"
            />

            {/* Фото конференции (0, 327), окно 834×450, рендер (-63, 0, 960×535). */}
            <div className="absolute left-0 top-[327px] h-[450px] w-[834px] overflow-clip">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Презентация иллюстраций Stablegate на конференции"
                className="absolute left-[-63px] top-0 h-[535px] w-[960px] max-w-none object-cover"
                src={`${A}/vislang-photo.jpg`}
              />
            </div>

            {/* Послесловие (2710:13858, y841): текст (202, 905, 430), Wix
                Regular 28 center opacity-70, в обводке-эллипсе. */}
            <p className="absolute left-[202px] top-[905px] w-[430px] text-center font-heading text-[28px] font-normal uppercase leading-[1.1] tracking-[0.84px] text-white opacity-70">
              Одна иллюстрация стала основой{" "}
              <br />
              для масштабируемой визуальной системы
            </p>
            {/* Эллипс-обводка (Vector 234257391) — (181, 871), 463×191 (viewBox). */}
            <DrawIn
              src={`${A}/vislang-ellipse-834.svg`}
              className="absolute left-[181px] top-[871px] h-[191px] w-[463px]"
            />
          </div>
        </FullBleedScale>
      </div>

      {/* 1024–1439 — 1:1 из Figma reflow-фрейма 2695:18250 (1280×1469).
          FullBleedScale масштабирует весь канвас под ширину. */}
      <div className="hidden w-full lg:block xl:hidden">
        <FullBleedScale width={1280} height={1469} mode="grow" className="w-full">
          <div className="relative h-[1469px] w-[1280px] overflow-clip bg-[#121212]">
            {/* Заголовок «03 / ВИЗУАЛЬНАЯ⏎СИСТЕМА» (40, 72), блок 246. */}
            <div className="absolute left-[40px] top-[72px] flex w-[246px] flex-col font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
              <span className="text-[#008cff]">03</span>
              <span className="text-white">
                Визуальная
                <br />
                система
              </span>
            </div>
            {/* Два абзаца (40, 189), 585 / 588. */}
            <p className="absolute left-[40px] top-[189px] w-[585px] text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70">
              Первой иллюстрацией стала Wallet. После её утверждения я сформировал библиотеку
              материалов, настроил универсальную сцену освещения и определил правила построения
              композиций.
            </p>
            <p className="absolute left-[40px] top-[246px] w-[588px] text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70">
              Новые изображения создавались не с нуля: каждая иллюстрация наследовала общие
              принципы работы с формой, материалами, цветом, светом и уровнем детализации.
            </p>
            {/* Доодл «//» (2695:18263) — (40+1085=1125, 189-11.68=177), 158×125. */}
            <DrawIn
              src={`${A}/vislang-doodle-1280.svg`}
              fit="contain"
              className="absolute left-[1125px] top-[177px] z-10 h-[125px] w-[158px]"
            />

            {/* Фото конференции (0, 361), рендер (-110, 0, 1500×704). */}
            <div className="absolute left-0 top-[361px] h-[704px] w-[1280px] overflow-clip">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Презентация иллюстраций Stablegate на конференции"
                className="absolute left-[-110px] top-0 h-[704px] w-[1500px] max-w-none object-cover"
                src={`${A}/vislang-photo.jpg`}
              />
            </div>

            {/* Послесловие (2707:41637): текст (395, 1193, 490×140) в обводке-
                эллипсе. Реальный рендер вектора 2695:18262 — 535×226 (bbox в
                get_metadata раздут до 572×415, игнорируем), центрируем на
                центре текстового блока → (373, 1150). */}
            <DrawIn
              src={`${A}/vislang-ellipse-1280.svg`}
              className="absolute left-[373px] top-[1150px] h-[226px] w-[535px]"
            />
            <p className="absolute left-[395px] top-[1193px] w-[490px] text-center font-heading text-[32px] font-normal uppercase leading-[1.1] tracking-[0.96px] text-white opacity-70">
              Одна иллюстрация стала основой для масштабируемой визуальной системы
            </p>
          </div>
        </FullBleedScale>
      </div>
    </section>
  );
}
