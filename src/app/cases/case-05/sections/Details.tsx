import DrawIn from "@/components/DrawIn";
import FullBleedScale from "@/components/FullBleedScale";

// 04 Работа с деталями — 1:1 из Figma (node 2210:75540, высота 1401).
// Тёмный full-bleed. Заголовок «04 РАБОТА С ДЕТАЛЯМИ» (32px), два абзаца
// с подчёркиванием, коллаж из пяти кропов иллюстрации и крупная мысль в
// обводке-эллипсе.
//
// <1440 — 1:1 из Figma reflow-фрейма «case-05 · 1280» (node 2827:41096,
// 1280×1368): поток flex-col gap-64 px-40 py-72. Заголовок + 2 абзаца
// w-588 + двойной штрих; коллаж из 5 кропов (1206×673); мысль w-668 по
// центру в обводке-эллипсе.
const A = "/cases/case-05/sections";

// [файл, left, top, ширина, высота] — координаты кроп-окон (Figma frames
// 2228:91710 / 91711 / 91707 / 91708 / 91709).
const CROPS: [string, number, number, number, number][] = [
  ["detail-tc.jpg", 726, 44, 328, 399],
  ["detail-tr.jpg", 1066, 181, 328, 262],
  ["detail-bl.jpg", 46, 455, 498, 399],
  ["detail-bc.jpg", 556, 455, 498, 262],
  ["detail-br.jpg", 1066, 455, 328, 399],
];

// Кроп-окна коллажа для 1280 (Figma frame 2827:45400, 1206×673 →
// [файл, left, top, w, h]). Порядок: верх-центр, верх-право, низ-лево,
// низ-центр, низ-право.
const CROPS_1280: [string, number, number, number, number][] = [
  ["detail-1280-5.jpg", 302, 0, 291, 262],
  ["detail-1280-2.jpg", 606, 0, 594, 262],
  ["detail-1280-1.jpg", 0, 274.074, 593, 399],
  ["detail-1280-3.jpg", 606, 274, 291, 399],
  ["detail-1280-4.jpg", 909, 274, 291, 399],
];

// Коллаж 834 (Figma frame 2833:52963, 778×1412) — 4 ряда по 344, gap 12:
// ряд 1 [383+383], ряд 2 [778], ряд 3 [383+383], ряд 4 [778]. Один и тот
// же исходник иллюстрации, свои окна-кропы (экспорт кроп-фреймов @2x).
const DETAIL_ROWS_834: string[][] = [
  ["detail-834-1.jpg", "detail-834-2.jpg"],
  ["detail-834-3.jpg"],
  ["detail-834-4.jpg", "detail-834-5.jpg"],
  ["detail-834-6.jpg"],
];

// Коллаж 375 (Figma frame 2836:53735, 335×607.995) — 4 ряда по 148.123,
// gap 5.167: ряд 1 [164.916+164.916], ряд 2 [335], ряд 3 [164.916+164.916],
// ряд 4 [335]. Экспорт кроп-фреймов 2836:53737/53739/53741/53744/53746/53748.
const DETAIL_ROWS_375: string[][] = [
  ["detail-375-1.jpg", "detail-375-2.jpg"],
  ["detail-375-3.jpg"],
  ["detail-375-4.jpg", "detail-375-5.jpg"],
  ["detail-375-6.jpg"],
];

export default function Details() {
  return (
    <>
      <div className="hidden w-full overflow-clip bg-[#121212] xl:block">
      <div className="relative mx-auto h-[1401px] w-[1440px]">
        <div className="absolute left-[46px] top-[134px] flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
          <p className="text-[#008cff]">04</p>
          <p className="text-white">Работа с деталями</p>
        </div>

        <p className="absolute left-[46px] top-[181px] w-[498px] text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70">
          Иллюстрация создавалась для банковской карты, поэтому должна была оставаться читаемой в
          небольшом формате. Основное внимание я уделил силуэту, крупным формам, контрасту и
          толщине линий.
        </p>
        <p className="absolute left-[46px] top-[238px] w-[498px] text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70">
          Детали при этом стали важной частью истории. Потёртые поверхности, канистры, защитные дуги
          и навесное оборудование создавали ощущение автомобиля, который десятилетиями выживал в
          пустоши.
        </p>
        {/* Двойное подчёркивание (Figma nodes 2284:39987 / 2284:39990). */}
        <DrawIn
          src={`${A}/details-underline1.svg`}
          className="absolute left-[417px] top-[286px] h-[40px] w-[146px]"
        />
        <DrawIn
          src={`${A}/details-underline2.svg`}
          delay={0.1}
          className="absolute left-[487px] top-[306px] h-[24px] w-[89px]"
        />

        {CROPS.map(([src, left, top, w, h]) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={src}
            alt="Фрагмент иллюстрации: детали постапокалиптического DeLorean"
            className="absolute object-cover"
            style={{ left, top, width: w, height: h }}
            src={`${A}/${src}`}
          />
        ))}

        {/* Обводка-эллипс вокруг мысли (Figma node 2412:4338). Реальная
            геометрия — из `export` (номинальный box 707×231), якорь по
            translate фонового rect: левый-верх SVG = точка секции
            (361, 1009.82). viewBox расширен на поля (-4/-26 719×271), чтобы
            <img> не срезал верхнюю и нижнюю дуги, поэтому смещаем на поля. */}
        <DrawIn
          src={`${A}/details-ellipse.svg`}
          fit="contain"
          className="absolute left-[357px] top-[984px] h-[271px] w-[719px]"
        />
        {/* Мысль (Figma node 2412:4317 → x386 / y1064, w668, по центру). */}
        <p className="absolute left-1/2 top-[1064px] w-[668px] -translate-x-1/2 text-center font-heading text-[32px] font-normal uppercase leading-[1.1] tracking-[0.96px] text-white opacity-70">
          Каждая деталь должна была работать на историю, не мешая считывать автомобиль в маленьком
          формате
        </p>
      </div>
      </div>

      {/* 1024–1439 — 1:1 из Figma reflow-фрейма «case-05 · 1280» (node 2827:41096,
          1280×1368). Поток flex-col gap-64 px-40 py-72. */}
      <div className="hidden w-full bg-[#121212] lg:block xl:hidden">
        <FullBleedScale width={1280} height={1368} mode="grow" className="w-full">
          <div className="relative flex h-[1368px] w-[1280px] flex-col items-start gap-[64px] overflow-clip bg-[#121212] px-[40px] py-[72px]">
            {/* Блок 1 — заголовок + 2 абзаца w-588 + двойной штрих
                (Frame 2827:45392, 588×155). */}
            <div className="relative h-[155px] w-[1206px] shrink-0">
              <div className="absolute left-0 top-0 flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
                <span className="text-[#008cff]">04</span>
                <span className="text-white">Работа с деталями</span>
              </div>
              <div className="absolute left-0 top-[47px] flex w-[588px] flex-col gap-[6px] text-[14px] leading-[1.2] tracking-[0.28px] text-white">
                <p className="opacity-70">
                  Иллюстрация создавалась для банковской карты, поэтому должна была оставаться
                  читаемой в небольшом формате. Основное внимание я уделил силуэту, крупным формам,
                  контрасту и толщине линий.
                </p>
                <p className="opacity-70">
                  Детали при этом стали важной частью истории. Потёртые поверхности, канистры,
                  защитные дуги и навесное оборудование создавали ощущение автомобиля, который
                  десятилетиями выживал в пустоши.
                </p>
              </div>
              {/* Двойной штрих (Vector 2835:53394) — секция (529, 223.414) →
                  блок (489, 151.414), 161.08×27.56. */}
              <div className="absolute left-[489px] top-[151.414px] h-[27.56px] w-[161.08px]">
                <DrawIn src={`${A}/details-underline-1280.svg`} className="absolute inset-[-10.885%_-1.862%]" />
              </div>
            </div>

            {/* Блок 2 — коллаж из 5 кропов (Frame 2827:45400, 1206×673). */}
            <div className="relative h-[673px] w-[1206px] shrink-0">
              {CROPS_1280.map(([src, left, top, w, h]) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={src}
                  alt="Фрагмент иллюстрации: детали постапокалиптического DeLorean"
                  className="absolute block max-w-none object-cover"
                  style={{ left, top, width: w, height: h }}
                  src={`${A}/${src}`}
                />
              ))}
            </div>

            {/* Блок 3 — мысль w-668 по центру в обводке-эллипсе
                (Frame 2828:45401, 1200×268). */}
            <div className="relative flex h-[268px] w-[1200px] shrink-0 flex-col items-center justify-center gap-[10px] px-[266px] py-[64px]">
              <p className="min-w-full whitespace-pre-wrap text-center font-heading text-[32px] font-normal uppercase leading-[1.1] tracking-[0.96px] text-white opacity-70 [word-break:break-word]">
                Каждая деталь должна была работать на историю, не мешая считывать автомобиль{" "}
                <br />в маленьком формате
              </p>
              {/* Обводка-эллипс (Vector 234257391, 2835:53395) — внутри блока
                  (250.89, 13.49), 700.665×224.109. */}
              <div className="absolute left-[250.89px] top-[13.49px] h-[224.109px] w-[700.665px]">
                <DrawIn src={`${A}/details-ellipse-1280.svg`} className="absolute inset-[-1.34%_-0.43%]" />
              </div>
            </div>
          </div>
        </FullBleedScale>
      </div>

      {/* 640–1023 — 1:1 из Figma reflow-фрейма «case-05 · 834» (node 2828:45605,
          834×1741). Тёмный #121212, flex-col gap-64 px-28 py-72. Финальной
          цитаты в обводке в 834-макете нет. */}
      <div className="hidden w-full bg-[#121212] sm:block lg:hidden">
        <FullBleedScale width={834} height={1741} mode="grow" className="w-full">
          <div className="relative flex h-[1741px] w-[834px] flex-col items-start gap-[64px] overflow-clip bg-[#121212] px-[28px] py-[72px]">
            {/* Блок 1 — заголовок + 2 абзаца w-778 (Frame 2833:52955, gap 12). */}
            <div className="flex shrink-0 flex-col items-start gap-[12px] [word-break:break-word]">
              <div className="flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
                <span className="text-[#008cff]">04</span>
                <span className="text-white">Работа с деталями</span>
              </div>
              <div className="flex w-[778px] flex-col gap-[6px] text-[14px] leading-[1.2] tracking-[0.28px] text-white">
                <p className="opacity-70">
                  Иллюстрация создавалась для банковской карты, поэтому должна была оставаться
                  читаемой в небольшом формате. Основное внимание я уделил силуэту, крупным формам,
                  контрасту и толщине линий.
                </p>
                <p className="opacity-70">
                  Детали при этом стали важной частью истории. Потёртые поверхности, канистры,
                  защитные дуги и навесное оборудование создавали ощущение автомобиля, который
                  десятилетиями выживал в пустоши.
                </p>
              </div>
            </div>

            {/* Блок 2 — коллаж из 6 кропов (Frame 2833:52963, 778×1412,
                4 ряда по 344, gap 12). */}
            <div className="flex w-[778px] shrink-0 flex-col gap-[12px]">
              {DETAIL_ROWS_834.map((row, ri) => (
                <div key={ri} className="flex gap-[12px]">
                  {row.map((src) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={src}
                      alt="Фрагмент иллюстрации: детали постапокалиптического DeLorean"
                      className="block h-[344px] shrink-0 max-w-none object-cover"
                      style={{ width: row.length === 1 ? 778 : 383 }}
                      src={`${A}/${src}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </FullBleedScale>
      </div>

      {/* <640 — 1:1 из Figma reflow-фрейма «case-05 · 375» (node 2828:49221,
          375×1042.995). Тёмный #121212, flex-col gap-32 px-20 py-64. Без
          финальной цитаты (как и на 834). */}
      <div className="w-full bg-[#121212] sm:hidden">
        <FullBleedScale width={375} height={1042.995} mode="grow" className="w-full">
          <div className="relative flex h-[1042.995px] w-[375px] flex-col items-start gap-[32px] overflow-clip bg-[#121212] px-[20px] py-[64px]">
            {/* Блок 1 — заголовок стопкой + 2 абзаца w-335 (Frame 2836:53712, gap 12). */}
            <div className="flex shrink-0 flex-col items-start gap-[12px] [word-break:break-word]">
              <div className="flex flex-col whitespace-pre font-heading text-[26px] font-bold uppercase leading-[1.1] tracking-[0.78px]">
                <span className="text-[#008cff]">04</span>
                <span className="text-white">
                  Работа <br />с деталями
                </span>
              </div>
              <div className="flex w-[335px] flex-col gap-[6px] text-[14px] leading-[1.2] tracking-[0.28px] text-white">
                <p className="opacity-70">
                  Иллюстрация создавалась для банковской карты, поэтому должна была оставаться
                  читаемой в небольшом формате. Основное внимание я уделил силуэту, крупным формам,
                  контрасту и толщине линий.
                </p>
                <p className="opacity-70">
                  Детали при этом стали важной частью истории. Потёртые поверхности, канистры,
                  защитные дуги и навесное оборудование создавали ощущение автомобиля, который
                  десятилетиями выживал в пустоши.
                </p>
              </div>
            </div>

            {/* Блок 2 — коллаж из 6 кропов (Frame 2836:53735, 335×607.995,
                4 ряда по 148.123, gap 5.167). */}
            <div className="flex w-[335px] shrink-0 flex-col gap-[5.167px]">
              {DETAIL_ROWS_375.map((row, ri) => (
                <div key={ri} className="flex gap-[5.167px]">
                  {row.map((src) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={src}
                      alt="Фрагмент иллюстрации: детали постапокалиптического DeLorean"
                      className="block h-[148.123px] shrink-0 max-w-none object-cover"
                      style={{ width: row.length === 1 ? 335 : 164.916 }}
                      src={`${A}/${src}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </FullBleedScale>
      </div>
    </>
  );
}
