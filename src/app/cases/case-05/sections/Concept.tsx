import Reveal from "@/components/Reveal";
import FullBleedScale from "@/components/FullBleedScale";

// 03 Концепция — 1:1 из Figma (node 2210:74460, высота 900). Тёмный
// full-bleed. Заголовок «03 КОНЦЕПЦИЯ» (32px), текст слева и справа, два
// изображения (реальное фото DeLorean и постапокалиптический скетч) и
// доодл-стрелка.
//
// <1440 — 1:1 из Figma reflow-фрейма «case-05 · 1280» (node 2827:41079,
// 1280×713.237): поток flex-col gap-64 px-40 py-72, заголовок + 2 колонки
// текста (w-594), 2 изображения 594×384 рядом. Доодл-стрелки на 1280 нет.
const A = "/cases/case-05/sections";

export default function Concept() {
  return (
    <>
      <div className="hidden w-full overflow-clip bg-[#121212] xl:block">
      <div className="relative mx-auto h-[900px] w-[1440px]">
        <div className="absolute left-[46px] top-[134px] flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
          <p className="text-[#008cff]">03</p>
          <p className="text-white">Концепция</p>
        </div>

        <p className="absolute left-[46px] top-[181px] w-[668px] text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70">
          DeLorean настолько тесно связан с образом машины времени, что большинство интерпретаций
          неизбежно отсылают к «Назад в будущее». Мне было интересно разрушить эту ассоциацию и
          поместить автомобиль в постапокалиптическую вселенную.
        </p>
        <p className="absolute left-[726px] top-[181px] w-[668px] text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70">
          Я представил, как DeLorean мог бы выглядеть после десятилетий жизни в пустошах: с
          внедорожными колёсами, канистрами, силовым обвесом и солнечными панелями.
        </p>
        <p className="absolute left-[726px] top-[221px] w-[668px] text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70">
          При этом главным условием оставалось сохранить узнаваемый силуэт оригинального автомобиля.
        </p>

        {/* Доодл-стрелка (Figma node 2284:39959). Геометрия и viewBox — из
            `export` (191×178, толщина обводки 6). Якорь: фоновый rect в
            экспорте имеет translate(-1249.32, -215), т.е. левый-верх SVG =
            точка секции (1249.32, 215) — НЕ bbox фрейма (1299.5), у SVG
            слева ~50px поля. */}
        <Reveal variant="doodle" className="absolute left-[1249.5px] top-[215px] z-10 h-[178px] w-[195px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="block size-full max-w-none" src={`${A}/concept-arrow.svg`} />
        </Reveal>

        {/* Фото + скетч (Figma frames 2223:80174 / 2215:79911 → y318, 668×427). */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="Реальный DeLorean DMC-12 с открытой дверью в студийном свете"
          className="absolute left-[46px] top-[318px] h-[427px] w-[668px] object-cover"
          src={`${A}/concept-photo.jpg`}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="Скетч постапокалиптического DeLorean с внедорожными колёсами и солнечными панелями"
          className="absolute left-[726px] top-[318px] h-[427px] w-[668px] object-cover"
          src={`${A}/concept-sketch.jpg`}
        />
      </div>
      </div>

      {/* 1024–1439 — 1:1 из Figma reflow-фрейма «case-05 · 1280» (node 2827:41079,
          1280×713.237). Поток flex-col gap-64 px-40 py-72. */}
      <div className="hidden w-full bg-[#121212] lg:block xl:hidden">
        <FullBleedScale width={1280} height={713.237} mode="grow" className="w-full">
          <div className="relative flex h-[713.237px] w-[1280px] flex-col items-start gap-[64px] overflow-clip bg-[#121212] px-[40px] py-[72px]">
            {/* Заголовок + 2 колонки текста (Frame 2827:45370, w-full, gap 12). */}
            <div className="flex w-full shrink-0 flex-col gap-[12px] [word-break:break-word]">
              <div className="flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
                <span className="text-[#008cff]">03</span>
                <span className="text-white">Концепция</span>
              </div>
              <div className="flex w-full items-start gap-[12px] text-[14px] leading-[1.2] tracking-[0.28px] text-white">
                <p className="w-[594px] opacity-70">
                  DeLorean настолько тесно связан с образом машины времени, что большинство
                  интерпретаций неизбежно отсылают к «Назад в будущее». Мне было интересно разрушить
                  эту ассоциацию и поместить автомобиль в постапокалиптическую вселенную.
                </p>
                <div className="flex w-[594px] flex-col gap-[6px]">
                  <p className="whitespace-pre-wrap opacity-70">
                    Я представил, как DeLorean мог бы выглядеть после десятилетий жизни в пустошах:{" "}
                    <br />с внедорожными колёсами, канистрами, силовым обвесом и солнечными панелями.
                  </p>
                  <p className="opacity-70">
                    При этом главным условием оставалось сохранить узнаваемый силуэт оригинального
                    автомобиля.
                  </p>
                </div>
              </div>
            </div>

            {/* 2 изображения 594×384 рядом (Frame 2827:45381). */}
            <div className="relative w-full shrink-0" style={{ height: 384.237 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Реальный DeLorean DMC-12 с открытыми дверями в студийном свете"
                className="absolute left-0 top-[0.31px] block h-[384px] w-[594px] max-w-none object-cover"
                src={`${A}/concept-img-1-1280.jpg`}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Скетч постапокалиптического DeLorean с внедорожными колёсами, солнечными панелями и выжившим"
                className="absolute left-[606px] top-[0.31px] block h-[384px] w-[594px] max-w-none object-cover"
                src={`${A}/concept-img-2-1280.jpg`}
              />
            </div>
          </div>
        </FullBleedScale>
      </div>

      {/* 640–1023 — 1:1 из Figma reflow-фрейма «case-05 · 834» (node 2833:52938,
          834×612). Поток flex-col gap-64 px-28 py-72, тёмный #121212. */}
      <div className="hidden w-full bg-[#121212] sm:block lg:hidden">
        <FullBleedScale width={834} height={612} mode="grow" className="w-full">
          <div className="relative flex h-[612px] w-[834px] flex-col items-start gap-[64px] overflow-clip bg-[#121212] px-[28px] py-[72px]">
            {/* Заголовок + 2 колонки текста w-383 (Frame 2833:52939, gap 12). */}
            <div className="flex w-full shrink-0 flex-col gap-[12px] [word-break:break-word]">
              <div className="flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
                <span className="text-[#008cff]">03</span>
                <span className="text-white">Концепция</span>
              </div>
              <div className="flex w-full items-start gap-[12px] text-[14px] leading-[1.2] tracking-[0.28px] text-white">
                <p className="w-[383px] opacity-70">
                  DeLorean настолько тесно связан с образом машины времени, что большинство
                  интерпретаций неизбежно отсылают к «Назад в будущее». Мне было интересно разрушить
                  эту ассоциацию и поместить автомобиль в постапокалиптическую вселенную.
                </p>
                <div className="flex w-[383px] flex-col gap-[6px]">
                  <p className="whitespace-pre-wrap opacity-70">
                    Я представил, как DeLorean мог бы выглядеть после десятилетий жизни в пустошах: с
                    внедорожными колёсами, канистрами, силовым обвесом{" "}
                    <br />и солнечными панелями.
                  </p>
                  <p className="opacity-70">
                    При этом главным условием оставалось сохранить узнаваемый силуэт оригинального
                    автомобиля.
                  </p>
                </div>
              </div>
            </div>

            {/* 2 изображения 383×~248 рядом (Frame 2833:52948, gap 12). */}
            <div className="flex w-full shrink-0 items-start gap-[12px]">
              <div className="h-[247.596px] w-[383px] shrink-0 overflow-clip">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="Реальный DeLorean DMC-12 с открытыми дверями в студийном свете"
                  className="block size-full object-cover"
                  src={`${A}/concept-img-1-834.jpg`}
                />
              </div>
              <div className="h-[249px] w-[383px] shrink-0 overflow-clip">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="Скетч постапокалиптического DeLorean с внедорожными колёсами, солнечными панелями и выжившим"
                  className="block size-full object-cover"
                  src={`${A}/concept-img-2-834.jpg`}
                />
              </div>
            </div>
          </div>
        </FullBleedScale>
      </div>

      {/* <640 — 1:1 из Figma reflow-фрейма «case-05 · 375» (node 2828:49212,
          375×884.856). Тёмный #121212, flex-col gap-32 py-64, дети px-20.
          Текст 2 колонок → стопкой, 2 изображения → стопкой во всю ширину. */}
      <div className="w-full bg-[#121212] sm:hidden">
        <FullBleedScale width={375} height={884.856} mode="grow" className="w-full">
          <div className="relative flex h-[884.856px] w-[375px] flex-col items-start gap-[32px] overflow-clip bg-[#121212] py-[64px]">
            {/* Заголовок + текст w-335 стопкой (Frame 2828:49213, px-20, gap 12). */}
            <div className="flex shrink-0 flex-col items-start gap-[12px] px-[20px] [word-break:break-word]">
              <div className="flex items-start gap-[12px] whitespace-nowrap font-heading text-[26px] font-bold uppercase">
                <span className="leading-none text-[#008cff]">03</span>
                <span className="leading-[1.1] tracking-[0.78px] text-white">Концепция</span>
              </div>
              <div className="flex w-[335px] flex-col gap-[12px] text-[14px] leading-[1.2] tracking-[0.28px] text-white">
                <p className="opacity-70">
                  DeLorean настолько тесно связан с образом машины времени, что большинство
                  интерпретаций неизбежно отсылают к «Назад в будущее». Мне было интересно разрушить
                  эту ассоциацию и поместить автомобиль в постапокалиптическую вселенную.
                </p>
                <div className="flex flex-col gap-[6px]">
                  <p className="whitespace-pre-wrap opacity-70">
                    Я представил, как DeLorean мог бы выглядеть после десятилетий жизни в пустошах:{" "}
                    <br />с внедорожными колёсами, канистрами, силовым обвесом и солнечными панелями.
                  </p>
                  <p className="opacity-70">
                    При этом главным условием оставалось сохранить узнаваемый силуэт оригинального
                    автомобиля.
                  </p>
                </div>
              </div>
            </div>

            {/* 2 изображения 335×~217 стопкой (Frame 2836:53698, px-20, gap 10.496). */}
            <div className="flex shrink-0 flex-col items-start gap-[10.496px] px-[20px]">
              <div className="h-[216.566px] w-[335px] overflow-clip">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="Реальный DeLorean DMC-12 с открытыми дверями в студийном свете"
                  className="block size-full object-cover"
                  src={`${A}/concept-img-1-375.jpg`}
                />
              </div>
              <div className="h-[217.794px] w-[335px] overflow-clip">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="Скетч постапокалиптического DeLorean с внедорожными колёсами, солнечными панелями и выжившим"
                  className="block size-full object-cover"
                  src={`${A}/concept-img-2-375.jpg`}
                />
              </div>
            </div>
          </div>
        </FullBleedScale>
      </div>
    </>
  );
}
