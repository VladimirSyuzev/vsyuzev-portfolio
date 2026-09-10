import Reveal from "@/components/Reveal";
import DrawIn from "@/components/DrawIn";
import Dot from "@/components/Dot";
import FullBleedScale from "@/components/FullBleedScale";

// 01 Исследование — 1:1 из Figma (node 2210:74416, высота 1264).
// Заголовок «01 ИССЛЕДОВАНИЕ» (32px), два вводных абзаца, список из пяти
// ключевых признаков DeLorean, фото-референсы (растр), доодл-«лупа» и
// крупная мысль с двойным подчёркиванием.
//
// <1440 — 1:1 из Figma reflow-фрейма «case-05 · 1280» (node 2827:41033,
// 1280×1198.142): поток flex-col gap-64 px-40 py-72, узкая колонка текста
// слева + фото/скетч справа.
const A = "/cases/case-05/sections";

const BULLETS = [
  "характерную форму передней части;",
  "прямоугольные фары",
  "двери типа Gullwing",
  "геометрию бокового остекления",
  "общий силуэт кузова",
];

export default function Research() {
  return (
    <>
      <div className="relative hidden h-[1264px] w-[1440px] overflow-clip bg-[#fafafa] xl:block">
      <div className="absolute left-[46px] top-[134px] flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
        <p className="text-[#008cff]">01</p>
        <p className="text-[#121212]">Исследование</p>
      </div>

      <p className="absolute left-[46px] top-[181px] w-[498px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
        Мне достался DeLorean — автомобиль, ставший частью массовой культуры благодаря фильму
        «Назад в будущее».
      </p>
      <p className="absolute left-[46px] top-[227px] w-[476px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
        Я начал с изучения фотографий, чтобы понять, какие элементы делают автомобиль узнаваемым
        даже при сильной авторской интерпретации.
      </p>

      {/* Список признаков (Figma frame 2210:79855 → x46 / y455). */}
      <div className="absolute left-[46px] top-[457px] flex w-[328px] flex-col gap-[12px]">
        <p className="text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
          В результате выделил несколько ключевых особенностей:
        </p>
        <ul className="flex flex-col gap-[6px]">
          {BULLETS.map((item, i) => (
            <li key={item} className="flex items-center gap-[8px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212]">
              <Dot seed={97 + i} />
              <span className="opacity-70">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Фото-референсы (Figma frames 2215:79901 → x556 / y181, 838×262 —
          две фотографии; 2215:79895 → x556 / y455, 838×399 — одна). */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt="Фотографии DeLorean DMC-12 с открытыми дверями Gullwing"
        className="absolute left-[556px] top-[181px] h-[262px] w-[838px] object-cover"
        src={`${A}/research-top.jpg`}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt="Референсный рисунок DeLorean DMC-12 в три четверти"
        className="absolute left-[556px] top-[455px] h-[399px] w-[838px] object-cover"
        src={`${A}/research-bottom.jpg`}
      />

      {/* Доодл-«лупа» (Figma node 2412:4334 → x897 / y866, 158×125). */}
      <Reveal variant="doodle" className="absolute left-[897px] top-[866px] z-10 h-[125px] w-[158px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" className="block size-full max-w-none" src={`${A}/magnifier.png`} />
      </Reveal>

      {/* Крупная мысль (Figma node 2411:4290 → x46 / y1003, w888). */}
      <p className="absolute left-[46px] top-[1003px] w-[888px] font-heading text-[32px] font-normal uppercase leading-[1.1] tracking-[0.96px] text-[#121212] opacity-70">
        Узнаваемость автомобиля строится на нескольких ключевых признаках, а не на точном
        копировании каждой детали
      </p>
      {/* Двойное подчёркивание (Figma nodes 2284:40129 / 2284:40174). */}
      <DrawIn
        src={`${A}/research-underline1.svg`}
        className="absolute left-[296px] top-[1120px] h-[35px] w-[663px]"
      />
      <DrawIn
        src={`${A}/research-underline2.svg`}
        delay={0.1}
        className="absolute left-[425px] top-[1134px] h-[49px] w-[578px]"
      />
      </div>

      {/* 1024–1439 — 1:1 из Figma reflow-фрейма «case-05 · 1280» (node 2827:41033,
          1280×1198.142). Поток flex-col gap-64 px-40 py-72. */}
      <div className="hidden w-full lg:block xl:hidden">
        <FullBleedScale width={1280} height={1198.142} mode="grow" className="w-full">
          <div className="relative flex h-[1198.142px] w-[1280px] flex-col items-start gap-[64px] overflow-clip bg-[#fafafa] px-[40px] py-[72px]">
            {/* Блок 1 — узкая колонка текста (0,0, w-291) + 2 фото справа
                (303, 47, gap 12). */}
            <div className="relative h-[328.384px] w-[1204px] shrink-0">
              <div className="absolute left-0 top-0 flex w-[291px] flex-col items-start gap-[12px] [word-break:break-word]">
                <div className="flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
                  <span className="text-[#008cff]">01</span>
                  <span className="text-[#121212]">Исследование</span>
                </div>
                <div className="flex flex-col gap-[6px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#333]">
                  <p className="w-[291px] opacity-70">
                    Мне достался DeLorean — автомобиль, ставший частью массовой культуры благодаря
                    фильму «Назад в будущее».
                  </p>
                  <p className="w-[291px] opacity-70">
                    Я начал с изучения фотографий, чтобы понять, какие элементы делают автомобиль
                    узнаваемым даже при сильной авторской интерпретации.
                  </p>
                </div>
              </div>
              <div className="absolute left-[303px] top-[47px] flex w-[897px] items-center gap-[12px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="DeLorean DMC-12 с открытыми дверями Gullwing на мощёной улице"
                  className="block h-[281px] w-[594px] shrink-0 max-w-none object-cover"
                  src={`${A}/research-photo-1-1280.jpg`}
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="Чёрный DeLorean DMC-12 с поднятыми дверями"
                  className="block h-[281px] w-[291px] shrink-0 max-w-none object-cover"
                  src={`${A}/research-photo-2-1280.jpg`}
                />
              </div>
            </div>

            {/* Блок 2 — список признаков (0,0, w-328) + референсный скетч
                справа (303, 0.62, w-896 h-428). */}
            <div className="relative h-[428.759px] w-[1204px] shrink-0">
              <div className="absolute left-0 top-0 flex w-[328px] flex-col items-start gap-[12px]">
                <p className="w-[327px] text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px] text-[#333] opacity-70 [word-break:break-word]">
                  В результате выделил несколько ключевых особенностей:
                </p>
                <ul className="flex w-[327px] flex-col gap-[6px]">
                  {BULLETS.map((item, i) => (
                    <li
                      key={item}
                      className="flex items-center gap-[8px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#333]"
                    >
                      <Dot seed={97 + i} />
                      <span className="opacity-70">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Референсный скетч (Frame 2827:44680, 896×428, overflow-clip).
                  Рисунок на y12 h396; поверх — 2 запечённые белые заплатки
                  (#fcfcfc) сверху (y-18, h90) и снизу (y370.53, h86.99),
                  закрывающие края скана. */}
              <div className="absolute left-[303px] top-[0.62px] h-[428px] w-[896px] overflow-clip">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="Референсный рисунок DeLorean DMC-12 в три четверти"
                  className="absolute left-[-1px] top-[12px] block h-[396px] w-[897px] max-w-none object-cover"
                  src={`${A}/research-sketch-1280.jpg`}
                />
                <div className="absolute left-[-81.62px] top-[370.53px] h-[86.993px] w-[1064.32px] bg-[#fcfcfc]" />
                <div className="absolute left-[-19px] top-[-18px] h-[90px] w-[939px] bg-[#fcfcfc]" />
              </div>
            </div>

            {/* Доодл-«лупа» (node 2829:52812, 1002/836, 158×125). */}
            <Reveal variant="doodle" className="absolute left-[1002px] top-[836px] z-10 h-[125px] w-[158px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" className="block size-full max-w-none" src={`${A}/magnifier.png`} />
            </Reveal>

            {/* Крупная мысль (Frame 2147232144, w-full, pb-64) + двойное
                подчёркивание (Vector 234257378 / 234257379). */}
            <div className="relative flex w-full shrink-0 flex-col items-start justify-center gap-[10px] pb-[64px]">
              <p className="w-[888px] whitespace-pre-wrap font-heading text-[32px] font-normal uppercase leading-[1.1] tracking-[0.96px] text-black opacity-80 [word-break:break-word]">
                Узнаваемость автомобиля строится{" "}
                <br />
                на нескольких ключевых признаках,{" "}
                <br />а не на точном копировании каждой детали
              </p>
              {/* Двойное подчёркивание 1:1 из Figma (Frame 2884:14356 (257,115.07):
                  Vector 234257378 (0.489,0) 663×35; Vector 234257379 (109.114,10.52)
                  576.809×35.031). Наклон уже в путях — без CSS-rotate. */}
              <div className="absolute left-[257.489px] top-[115.07px] h-[35px] w-[663px]">
                <DrawIn src={`${A}/research-underline-1-1280.svg`} className="absolute inset-[-8.571%_-0.452%]" />
              </div>
              <div className="absolute left-[366.114px] top-[125.59px] h-[35.031px] w-[576.809px]">
                <DrawIn src={`${A}/research-underline-2-1280.svg`} delay={0.1} className="absolute inset-[-8.564%_-0.52%]" />
              </div>
            </div>
          </div>
        </FullBleedScale>
      </div>

      {/* 640–1023 — 1:1 из Figma reflow-фрейма «case-05 · 834» (node 2828:45540,
          834×1401.634). Поток flex-col gap-64 px-28 py-72. */}
      <div className="hidden w-full sm:block lg:hidden">
        <FullBleedScale width={834} height={1401.634} mode="grow" className="w-full">
          <div className="relative flex h-[1401.634px] w-[834px] flex-col items-start gap-[64px] overflow-clip bg-[#fafafa] px-[28px] py-[72px]">
            {/* Блок 1 — заголовок + 2 абзаца w-382 (Frame 2829:52749, h 155). */}
            <div className="flex shrink-0 flex-col items-start gap-[12px] [word-break:break-word]">
              <div className="flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
                <span className="text-[#008cff]">01</span>
                <span className="text-[#121212]">Исследование</span>
              </div>
              <div className="flex w-[382px] flex-col gap-[6px] whitespace-pre-wrap text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212]">
                <p className="opacity-70">
                  Мне достался DeLorean — автомобиль, ставший{" "}
                  <br />
                  частью массовой культуры благодаря фильму{" "}
                  <br />«Назад в будущее».
                </p>
                <p className="opacity-70">
                  Я начал с изучения фотографий, чтобы понять,{" "}
                  <br />
                  какие элементы делают автомобиль узнаваемым{" "}
                  <br />даже при сильной авторской интерпретации.
                </p>
              </div>
            </div>

            {/* Блок 2 — фото/скетч (Frame 2836:53959, 778×755.634, gap 12). */}
            <div className="flex w-[778px] shrink-0 flex-col items-start gap-[12px]">
              {/* Ряд 1: левая колонка (фото 383×197 + список) + фото 385.578×372.328. */}
              <div className="flex h-[372px] w-[779px] items-start gap-[10.421px]">
                <div className="flex w-[383px] shrink-0 flex-col items-start gap-[12px]">
                  <div className="h-[197px] w-full overflow-clip">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt="DeLorean DMC-12 с открытыми дверями Gullwing на мощёной улице"
                      className="block h-[197px] w-full object-cover"
                      src={`${A}/research-photo-1-834.jpg`}
                    />
                  </div>
                  <div className="flex w-[328px] flex-col items-start gap-[12px]">
                    <p className="w-[327px] text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px] text-[#333] opacity-70 [word-break:break-word]">
                      В результате выделил несколько ключевых особенностей:
                    </p>
                    <ul className="flex w-[327px] flex-col gap-[6px]">
                      {BULLETS.map((item, i) => (
                        <li
                          key={item}
                          className="flex items-center gap-[8px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#333]"
                        >
                          <Dot seed={97 + i} />
                          <span className="opacity-70">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="h-[372.328px] w-[385.578px] shrink-0 overflow-clip">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt="Чёрный DeLorean DMC-12 с поднятыми дверями"
                    className="block size-full object-cover"
                    src={`${A}/research-photo-2-834.jpg`}
                  />
                </div>
              </div>

              {/* Ряд 2: референсный скетч (Frame 2829:52800, 778×371.634,
                  overflow-clip): рисунок на top 10.42 + 2 заплатки #fcfcfc. */}
              <div className="relative h-[371.634px] w-full overflow-clip">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="Референсный рисунок DeLorean DMC-12 в три четверти"
                  className="absolute left-[-0.87px] top-[10.42px] block h-[344.04px] w-[778.434px] max-w-none object-cover"
                  src={`${A}/research-sketch-834.jpg`}
                />
                <div className="absolute left-[-70.87px] top-[321.73px] h-[75.536px] w-[924.153px] bg-[#fcfcfc]" />
                <div className="absolute left-[-16.5px] top-[-15.63px] h-[78.147px] w-[815.337px] bg-[#fcfcfc]" />
              </div>
            </div>

            {/* Блок 3 — мысль w-608 (Frame 2829:52815, 778×219, pb-64) +
                одинарное подчёркивание (Vector 2835:53404). */}
            <div className="relative flex w-full shrink-0 flex-col items-start justify-center gap-[10px] pb-[64px]">
              <p className="w-[608px] whitespace-pre-wrap font-heading text-[28px] font-normal uppercase leading-[1.1] tracking-[0.84px] text-black opacity-80 [word-break:break-word]">
                Узнаваемость{" "}
                <br />
                автомобиля строится{" "}
                <br />на нескольких ключевых признаках, а не на точном копировании каждой детали
              </p>
              <div className="absolute left-[110px] top-[162.84px] h-[27.962px] w-[471px]">
                <DrawIn src={`${A}/research-underline-834.svg`} className="absolute inset-[-10.73%_-0.64%]" />
              </div>
            </div>

            {/* Доодл-«лупа» (node 2829:52809, 572/1063, 158×125). */}
            <Reveal variant="doodle" className="absolute left-[572px] top-[1063px] z-10 h-[125px] w-[158px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" className="block size-full max-w-none" src={`${A}/magnifier.png`} />
            </Reveal>
          </div>
        </FullBleedScale>
      </div>

      {/* <640 — 1:1 из Figma reflow-фрейма «case-05 · 375» (node 2828:49156,
          375×1646.532). Поток flex-col gap-32 px-20 py-64. Доодла-«лупы» нет. */}
      <div className="w-full sm:hidden">
        <FullBleedScale width={375} height={1646.532} mode="grow" className="w-full">
          <div className="relative flex h-[1646.532px] w-[375px] flex-col items-start gap-[32px] overflow-clip bg-[#fafafa] px-[20px] py-[64px]">
            {/* Блок 1 — заголовок + 2 абзаца w-335 (Frame 2828:49157). */}
            <div className="flex w-[335px] shrink-0 flex-col items-start gap-[12px] [word-break:break-word]">
              <div className="flex items-center gap-[12px] whitespace-nowrap font-heading text-[26px] font-bold uppercase leading-[1.1] tracking-[0.78px]">
                <span className="text-[#008cff]">01</span>
                <span className="text-[#121212]">Исследование</span>
              </div>
              <div className="flex flex-col gap-[6px] whitespace-pre-wrap text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212]">
                <p className="w-[335px] opacity-70">
                  Мне достался DeLorean — автомобиль, ставший{" "}
                  <br />
                  частью массовой культуры благодаря фильму{" "}
                  <br />«Назад в будущее».
                </p>
                <p className="w-[335px] opacity-70">
                  Я начал с изучения фотографий, чтобы понять,{" "}
                  <br />
                  какие элементы делают автомобиль узнаваемым даже при сильной авторской
                  интерпретации.
                </p>
              </div>
            </div>

            {/* Блок 2 — фото/скетч (Frame 2835:53492, w-335, gap 9.044). */}
            <div className="flex shrink-0 flex-col items-start gap-[9.044px]">
              <div className="h-[213.42px] w-[335px] overflow-clip">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="DeLorean DMC-12 с открытыми дверями Gullwing на мощёной улице"
                  className="block size-full object-cover"
                  src={`${A}/research-photo-1-375.jpg`}
                />
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Чёрный DeLorean DMC-12 с поднятыми дверями"
                className="block size-[335px] shrink-0 object-cover"
                src={`${A}/research-photo-2-375.jpg`}
              />
              <div className="h-[160.022px] w-[335px] overflow-clip">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="Референсный рисунок DeLorean DMC-12 в три четверти"
                  className="block size-full object-cover"
                  src={`${A}/research-sketch-375.jpg`}
                />
              </div>
            </div>

            {/* Блок 3 — список признаков (Frame 2835:53501, w-328, gap 12). */}
            <div className="flex w-[328px] shrink-0 flex-col items-start gap-[12px]">
              <p className="w-[327px] text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70 [word-break:break-word]">
                В результате выделил несколько ключевых особенностей:
              </p>
              <ul className="flex w-full flex-col gap-[6px]">
                {BULLETS.map((item, i) => (
                  <li
                    key={item}
                    className="flex items-center gap-[8px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212]"
                  >
                    <Dot seed={97 + i} />
                    <span className="opacity-70">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Блок 4 — мысль w-294 (Frame 2828:49169, pt-32 pb-64) +
                одинарное подчёркивание (Vector 2835:53526, 13/324.47, 322×28). */}
            <div className="relative flex w-full shrink-0 items-center gap-[10px] pb-[64px] pt-[32px]">
              <p className="w-[294px] whitespace-pre-wrap font-heading text-[28px] font-normal uppercase leading-[1.1] tracking-[0.84px] text-[#121212] opacity-80 [word-break:break-word]">
                Узнаваемость{" "}
                <br />
                автомобиля строится{" "}
                <br />
                на нескольких ключевых признаках,{" "}
                <br />а не на точном копировании каждой детали
              </p>
              <div className="absolute left-[13px] top-[324.47px] h-[28px] w-[322px]">
                <DrawIn src={`${A}/research-underline-375.svg`} className="absolute inset-[-10.72%_-0.93%]" />
              </div>
            </div>
          </div>
        </FullBleedScale>
      </div>
    </>
  );
}
