import DrawIn from "@/components/DrawIn";
import FullBleedScale from "@/components/FullBleedScale";

// 06 Финальный результат — 1:1 из Figma (node 2034:15810, высота 1265).
// Заголовок «06 ФИНАЛЬНЫЙ РЕЗУЛЬТАТ» (32px), два абзаца, доодл-стрелка,
// финальный билборд (растр) и крупная мысль с доодлом-«шевроном».
//
// <1440 — 1:1 из reflow-фрейма «case-04 · 1280» (node 2742:18018, 1280×1148).
const A = "/cases/case-04/sections";

export default function Final() {
  return (
    <>
      <div className="relative hidden h-[1265px] w-[1440px] overflow-clip bg-[#fafafa] xl:block">
      <div className="absolute left-[46px] top-[134px] flex items-center gap-[16px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
        <p className="text-[#008cff]">06</p>
        <p className="text-[#121212]">Финальный результат</p>
      </div>

      <p className="absolute left-[46px] top-[181px] w-[496px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
        В результате появилась единая outdoor-система, которая объединяет разные жизненные сценарии
        в узнаваемую коммуникацию Stablegate.
      </p>
      <p className="absolute left-[46px] top-[224px] w-[496px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
        Система уже охватывает недвижимость, автомобиль и яхту и может масштабироваться на новые
        сюжеты вместе с развитием продукта. Каждый новый KV сохраняет общий визуальный характер, но
        получает собственный контекст и историю.
      </p>

      {/* Доодл-стрелка (Figma node 2284:40011 → x906 / y169, 167×137). */}
      <DrawIn
        src={`${A}/final-arrow.svg`}
        fit="contain"
        className="absolute left-[906px] top-[169px] z-10 h-[137px] w-[167px]"
      />

      {/* Финальный билборд (Figma frame 2206:44755 → x48 / y319, 1346×535). */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt="Финальный билборд Stablegate на фасаде здания"
        className="absolute left-[48px] top-[319px] h-[535px] w-[1346px] object-cover"
        src={`${A}/final-billboard.jpg`}
      />

      {/* Доодл-«шеврон» (Figma node 2402:35708 → x46 / y993, 158×125). */}
      <DrawIn
            src={`${A}/chevron.svg`}
            fit="contain"
            className="absolute left-[46px] top-[993px] z-10 h-[125px] w-[158px]"
          />
      {/* Мысль (Figma node 2401:35703 → x726 / y1003, w633) + декоративная
          линия-подчёркивание (2439:54105) — общая обёртка, линия привязана
          к НИЗУ текста (top-[calc(100%-9px)], не фикс-px 1100) — не
          оторвётся при другом числе строк (перевод на английский); гэп
          отрицательный (линия слегка налезает на текст) — так и в Figma. */}
      <div className="absolute left-[726px] top-[1003px] w-[633px]">
        <p className="font-heading text-[32px] font-normal uppercase leading-[1.1] tracking-[0.96px] text-[#121212] opacity-70">
          Кампания может расти вместе с продуктом, сохраняя единый визуальный язык
        </p>
        <DrawIn
          src={`${A}/final-underline.svg`}
          fit="contain"
          className="absolute"
          style={{ left: 118, top: "calc(100% - 9px)", width: 532, height: 63 }}
        />
      </div>
      </div>

      {/* 1024–1439 — 1:1 из Figma reflow-фрейма «case-04 · 1280» (node 2742:18018,
          1280×1148). Поток flex-col gap-64 px-40 py-72 + 2 абсолютных доодла. */}
      <div className="hidden w-full lg:block xl:hidden">
        <FullBleedScale width={1280} height={1148} mode="grow" className="w-full">
          <div className="relative flex h-[1148px] w-[1280px] flex-col items-start gap-[64px] overflow-clip bg-[#fafafa] px-[40px] py-[72px]">
            {/* Заголовок + 2 абзаца (40, 72), w-594. */}
            <div className="flex w-[594px] flex-col gap-[12px]">
              <div className="flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
                <span className="text-[#008cff]">06</span>
                <span className="text-[#121212]">Финальный результат</span>
              </div>
              <div className="flex flex-col gap-[6px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
                <p>
                  В результате появилась единая outdoor-система, которая объединяет разные жизненные
                  сценарии в узнаваемую коммуникацию Stablegate.
                </p>
                <p>
                  Система уже охватывает недвижимость, автомобиль и яхту и может масштабироваться на
                  новые сюжеты вместе с развитием продукта. Каждый новый KV сохраняет общий визуальный
                  характер, но получает собственный контекст и историю.
                </p>
              </div>
            </div>

            {/* Финальный билборд-мокап (Frame 2742:18023, bg #ececec, 1200×470). */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Финальный билборд Stablegate на фасаде здания"
              className="block h-[470px] w-[1200px] shrink-0 max-w-none bg-[#ececec] object-cover"
              src={`${A}/final-billboard-1280.jpg`}
            />

            {/* Мысль + доодл-«шеврон вправо» (Frame 2147232085, py-64, gap 451). */}
            <div className="flex shrink-0 items-start gap-[451px] py-[64px]">
              <DrawIn
            src={`${A}/final-chevron.svg`}
            fit="contain"
            className="h-[125px] w-[158px] shrink-0"
          />
              {/* Подчёркивание — привязано к НИЗУ текста (top-[calc(100%+4px)],
                  не фикс-px 1016.29) — не оторвётся при другом числе строк
                  (перевод на английский). */}
              <div className="relative w-[591px]">
                <p className="font-heading text-[32px] font-normal uppercase leading-[1.1] tracking-[0.96px] text-[#121212] opacity-70">
                  Кампания может расти вместе с продуктом, сохраняя единый визуальный язык
                </p>
                <div className="pointer-events-none absolute left-0 top-[calc(100%+4px)] z-10 h-[28.047px] w-[478.434px]">
                  <DrawIn src={`${A}/final-underline-1280.svg`} className="absolute inset-[-10.7%_-0.63%]" />
                </div>
              </div>
            </div>

            {/* Доодл-«стрелка» (Vector, 667.36/154.2, 93.786×72.845). */}
            <div className="absolute left-[667.36px] top-[154.2px] z-10 h-[72.845px] w-[93.786px]">
              <DrawIn src={`${A}/final-arrow-1280.svg`} fit="contain" className="absolute inset-[-4.12%_-3.2%]" />
            </div>
          </div>
        </FullBleedScale>
      </div>

      {/* 640–1023 — 1:1 из Figma reflow-фрейма «case-04 · 834» (node 2752:31849,
          834×1132). Поток flex-col gap-64 px-28 py-72. Проще 1280: НЕТ доодла-
          стрелки и НЕТ шеврона — только мысль в обводке-эллипсе по центру. */}
      <div className="hidden w-full sm:block lg:hidden">
        <FullBleedScale width={834} height={1132} mode="grow" className="w-full">
          <div className="relative flex h-[1132px] w-[834px] flex-col items-start gap-[64px] overflow-clip bg-[#fafafa] px-[28px] py-[72px]">
            {/* Заголовок + 2 абзаца (Frame 2147232086, w-776, gap 12). */}
            <div className="flex w-[776px] flex-col gap-[12px] [word-break:break-word]">
              <div className="flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
                <span className="text-[#008cff]">06</span>
                <span className="text-[#121212]">Финальный результат</span>
              </div>
              <div className="flex w-[776px] flex-col gap-[6px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
                <p className="whitespace-pre-wrap">
                  В результате появилась единая outdoor-система, которая объединяет разные жизненные
                  сценарии{" "}
                  <br />в узнаваемую коммуникацию Stablegate.
                </p>
                <p>
                  Система уже охватывает недвижимость, автомобиль и яхту и может масштабироваться на
                  новые сюжеты вместе с развитием продукта. Каждый новый KV сохраняет общий визуальный
                  характер, но получает собственный контекст и историю.
                </p>
              </div>
            </div>

            {/* Финальный билборд-мокап (Frame 2818:36023, bg #ececec, 777×470). */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Финальный билборд Stablegate на фасаде здания"
              className="block h-[470px] w-[777px] shrink-0 max-w-none bg-[#ececec] object-cover"
              src={`${A}/final-billboard-834.jpg`}
            />

            {/* Мысль в обводке-эллипсе (Frame 2818:36026, py-64, center) —
                общая обёртка, эллипс в % от блока текста (148.6%/111.28%) —
                масштабируется вместе с текстом при другом числе строк
                (перевод на английский). */}
            <div className="relative flex w-[777px] shrink-0 items-center justify-center py-[64px]">
              <div className="relative w-[461px]">
                <p className="text-center font-heading text-[28px] font-normal uppercase leading-[1.1] tracking-[0.84px] text-[#121212] opacity-70 [word-break:break-word]">
                  Кампания может расти вместе с продуктом, сохраняя единый визуальный язык
                </p>
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-[148.6%] w-[111.28%] -translate-x-1/2 -translate-y-1/2">
                  <DrawIn src={`${A}/final-ellipse-834.svg`} className="absolute inset-[-1.64%_-0.58%]" />
                </div>
              </div>
            </div>
          </div>
        </FullBleedScale>
      </div>

      {/* <640 — 1:1 из Figma reflow-фрейма «case-04 · 375» (node 2762:4728,
          375×867.848). Поток flex-col gap-32 px-19 py-64 items-end. Мысль —
          БЕЗ обводки, тонкое подчёркивание (Vector 234257394). */}
      <div className="w-full sm:hidden">
        <FullBleedScale width={375} height={867.848} mode="grow" className="w-full">
          <div className="relative flex h-[867.848px] w-[375px] flex-col items-end gap-[32px] overflow-clip bg-[#fafafa] px-[19px] py-[64px]">
            {/* Заголовок стопкой + 2 абзаца (Frame 2825:40983, w-335, gap 16). */}
            <div className="flex w-[335px] flex-col gap-[16px] [word-break:break-word]">
              <div className="flex flex-col font-heading text-[26px] font-bold uppercase">
                <span className="leading-none text-[#008cff]">06</span>
                <span className="leading-[1.1] tracking-[0.78px] text-[#121212]">
                  Финальный результат
                </span>
              </div>
              <div className="flex flex-col gap-[6px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
                <p>
                  В результате появилась единая outdoor-система, которая объединяет разные жизненные
                  сценарии в узнаваемую коммуникацию Stablegate.
                </p>
                <p>
                  Система уже охватывает недвижимость, автомобиль и яхту и может масштабироваться на
                  новые сюжеты вместе с развитием продукта. Каждый новый KV сохраняет общий визуальный
                  характер, но получает собственный контекст и историю.
                </p>
              </div>
            </div>

            {/* Финальный билборд-мокап (Frame 2825:40991, bg #ececec, 337×203.848). */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Финальный билборд Stablegate на фасаде здания"
              className="block h-[203.848px] w-full shrink-0 max-w-none bg-[#ececec] object-cover"
              src={`${A}/final-billboard-375.jpg`}
            />

            {/* Мысль + тонкое подчёркивание (Frame 2825:40990, pb-64, влево).
                Подчёркивание — В ПОТОКЕ сразу под текстом (Vector 234257394 /
                2835:53382), чтобы не отрывалось от него при иной вёрстке абзацев.
                pt-32 из макета убран по правке пользователя (зазор до мокапа
                был велик). */}
            <div className="flex w-[335px] shrink-0 flex-col items-start pb-[64px]">
              <p className="w-[335px] font-heading text-[22px] font-normal uppercase leading-[1.15] tracking-[0.66px] text-[#121212] opacity-70 [word-break:break-word]">
                Кампания может расти вместе с продуктом, сохраняя единый визуальный язык
              </p>
              <div className="relative mt-[9px] h-[12.31px] w-[335.747px] self-start">
                <DrawIn src={`${A}/final-underline-375.svg`} className="absolute inset-[-24.36%_-0.89%]" />
              </div>
            </div>
          </div>
        </FullBleedScale>
      </div>
    </>
  );
}
