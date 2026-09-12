import DrawIn from "@/components/DrawIn";
import FullBleedScale from "@/components/FullBleedScale";

// 04 Серия сценариев — 1:1 из Figma (node 2034:15790, высота 1262).
// Заголовок «04 СЕРИЯ СЦЕНАРИЕВ» (32px), два абзаца, два KV-постера
// (автомобиль и яхта, растр), доодл-«шеврон» и крупная мысль в обводке.
//
// <1440 — 1:1 из reflow-фрейма «case-04 · 1280» (node 2740:17992, 1280×1181.5).
const A = "/cases/case-04/sections";

export default function Series() {
  return (
    <>
      {/* ≥1440 — нативный холст 1440. */}
      <div className="relative hidden h-[1262px] w-[1440px] overflow-clip bg-[#fafafa] xl:block">
        <div className="absolute left-[46px] top-[134px] flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
          <p className="text-[#008cff]">04</p>
          <p className="text-[#121212]">Серия сценариев</p>
        </div>

        <div className="absolute left-[46px] top-[181px] flex w-[668px] flex-col gap-[6px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
          <p>
            После первого KV визуальная система была расширена на другие сценарии: автомобиль и яхту.
            Они показывают разные возможности продукта, сохраняя единый принцип построения.
          </p>
          <p>
            Во всех визуалах повторяется одна формула: человек, телефон и объект покупки объединены
            общей композицией и типографической системой. Меняется сценарий, но визуальный язык
            остаётся узнаваемым.
          </p>
        </div>

        {/* Два KV-постера (Figma frames 2115:30599 / 2115:30938 → y318, 668×446). */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="KEY VISUAL Stablegate: сценарий с автомобилем"
          className="absolute left-[46px] top-[318px] h-[446px] w-[668px] object-cover"
          src={`${A}/series-1.jpg`}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="KEY VISUAL Stablegate: сценарий с яхтой"
          className="absolute left-[726px] top-[318px] h-[446px] w-[668px] object-cover"
          src={`${A}/series-2.jpg`}
        />

        {/* Доодл-«шеврон» (Figma node 2284:40000 → x641 / y764, 158×125). */}
        <DrawIn
            src={`${A}/chevron.svg`}
            fit="contain"
            className="absolute left-[641px] top-[764px] z-10 h-[125px] w-[158px]"
          />

        {/* Мысль (Figma node 2401:35697) + обводка-эллипс (2401:35698) —
            общая центрированная обёртка (раньше были независимыми
            элементами с фикс-координатами), эллипс в % от блока текста
            (244.3%/107.2%) — масштабируется вместе с текстом при другом
            числе строк (перевод на английский). */}
        <div className="absolute left-1/2 top-[1038px] w-[900px] -translate-x-1/2 -translate-y-1/2">
          <p className="text-center font-heading text-[32px] font-normal uppercase leading-[1.1] tracking-[0.96px] text-[#121212] opacity-70">
            Один принцип позволил рассказывать разные истории в рамках одной кампании
          </p>
          <DrawIn
            src={`${A}/series-ellipse.svg`}
            className="pointer-events-none absolute left-1/2 top-1/2 h-[244.3%] w-[107.2%] -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      </div>

      {/* 1024–1439 — 1:1 из Figma reflow-фрейма «case-04 · 1280» (node
          2740:17992, 1280×1181.5). Абсолютные координаты. */}
      <div className="hidden w-full lg:block xl:hidden">
        <FullBleedScale width={1280} height={1181.524} mode="grow" className="w-full">
          <div className="relative w-[1280px] overflow-clip bg-[#fafafa]" style={{ height: 1181.524 }}>
            {/* Заголовок + 2 абзаца (40, 72), w-593. */}
            <div className="absolute left-[40px] top-[72px] flex w-[593px] flex-col gap-[12px]">
              <div className="flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
                <span className="text-[#008cff]">04</span>
                <span className="text-[#121212]">Серия сценариев</span>
              </div>
              <div className="flex flex-col gap-[6px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
                <p>
                  После первого KV визуальная система была расширена на другие сценарии: автомобиль и
                  яхту. Они показывают разные возможности продукта, сохраняя единый принцип
                  построения.
                </p>
                <p>
                  Во всех визуалах повторяется одна формула: человек, телефон и объект покупки
                  объединены общей композицией и типографической системой. Меняется сценарий, но
                  визуальный язык остаётся узнаваемым.
                </p>
              </div>
            </div>

            {/* Два KV-постера с запечённым слоганом (Frame 2147231703 / 2147231705,
                40 / 646, y291, 594×396.524). */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="KEY VISUAL Stablegate: сценарий с автомобилем"
              className="absolute left-[40px] top-[291px] block h-[396.524px] w-[594px] max-w-none object-cover"
              src={`${A}/series-1-1280.jpg`}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="KEY VISUAL Stablegate: сценарий с яхтой"
              className="absolute left-[646px] top-[291px] block h-[396.524px] w-[594px] max-w-none object-cover"
              src={`${A}/series-2-1280.jpg`}
            />

            {/* Доодл-«шеврон вниз» (по центру фрейма 40/751.524, 158×125). */}
            <DrawIn
            src={`${A}/chevron.svg`}
            fit="contain"
            className="absolute left-[561px] top-[751.524px] z-10 h-[125px] w-[158px]"
          />

            {/* Мысль (327, 940.524, w-626, center) + обводка-эллипс (Vector
                234257399) — общая центрированная обёртка, эллипс в % от
                блока текста (133%/110.76%) — масштабируется вместе с
                текстом при другом числе строк (перевод на английский). */}
            <div className="absolute left-[640px] top-[993px] w-[626px] -translate-x-1/2 -translate-y-1/2">
              <p className="text-center font-heading text-[32px] font-normal uppercase leading-[1.1] tracking-[0.96px] text-[#121212] opacity-70">
                Один принцип позволил рассказывать разные истории в рамках одной кампании
              </p>
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[133%] w-[110.76%] -translate-x-1/2 -translate-y-1/2">
                <DrawIn src={`${A}/series-ellipse-1280.svg`} className="absolute inset-[-2.14%_-0.43%]" />
              </div>
            </div>
          </div>
        </FullBleedScale>
      </div>

      {/* 640–1023 — 1:1 из Figma reflow-фрейма «case-04 · 834» (node 2750:4730,
          834×1789.706). Абсолютные координаты; 2 KV-постера СТОПКОЙ. */}
      <div className="hidden w-full sm:block lg:hidden">
        <FullBleedScale width={834} height={1789.706} mode="grow" className="w-full">
          <div className="relative w-[834px] overflow-clip bg-[#fafafa]" style={{ height: 1789.706 }}>
            {/* Заголовок + 2 абзаца (28, 72), w-778. */}
            <div className="absolute left-[28px] top-[72px] flex w-[778px] flex-col gap-[12px]">
              <div className="flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
                <span className="text-[#008cff]">04</span>
                <span className="text-[#121212]">Серия сценариев</span>
              </div>
              <div className="flex flex-col gap-[6px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
                <p>
                  После первого KV визуальная система была расширена на другие сценарии: автомобиль и
                  яхту. Они показывают разные возможности продукта, сохраняя единый принцип
                  построения.
                </p>
                <p>
                  Во всех визуалах повторяется одна формула: человек, телефон и объект покупки
                  объединены общей композицией и типографической системой. Меняется сценарий, но
                  визуальный язык остаётся узнаваемым.
                </p>
              </div>
            </div>

            {/* Два KV-постера с запечённым слоганом СТОПКОЙ (28, 257 / 788.353),
                778×519.353, gap 12. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="KEY VISUAL Stablegate: сценарий с автомобилем"
              className="absolute left-[28px] top-[257px] block h-[519.353px] w-[778px] max-w-none object-cover"
              src={`${A}/series-1-834.jpg`}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="KEY VISUAL Stablegate: сценарий с яхтой"
              className="absolute left-[28px] top-[788.353px] block h-[519.353px] w-[778px] max-w-none object-cover"
              src={`${A}/series-2-834.jpg`}
            />

            {/* Доодл-«шеврон вниз» по центру (338, 1371.706), 158×125. */}
            <DrawIn
            src={`${A}/chevron.svg`}
            fit="contain"
            className="absolute left-[338px] top-[1371.706px] z-10 h-[125px] w-[158px]"
          />

            {/* Мысль (148, 1560.706, w-538, center) + обводка-эллипс (Vector
                234257399) — общая центрированная обёртка, эллипс в % от
                блока текста (150.4%/116.8%) — масштабируется вместе с
                текстом при другом числе строк (перевод на английский). */}
            <div className="absolute left-[417px] top-[1607px] w-[538px] -translate-x-1/2 -translate-y-1/2">
              <p className="text-center font-heading text-[28px] font-normal uppercase leading-[1.1] tracking-[0.84px] text-[#121212] opacity-70">
                Один принцип позволил рассказывать разные истории в рамках одной кампании
              </p>
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[150.4%] w-[116.8%] -translate-x-1/2 -translate-y-1/2">
                <DrawIn src={`${A}/series-ellipse-834.svg`} className="absolute inset-[-2.16%_-0.48%]" />
              </div>
            </div>
          </div>
        </FullBleedScale>
      </div>

      {/* <640 — 1:1 из Figma reflow-фрейма «case-04 · 375» (node 2760:4728,
          375×1240.258). Поток flex-col gap-32 pt-64; 2 KV-постера СТОПКОЙ. */}
      <div className="w-full sm:hidden">
        <FullBleedScale width={375} height={1240.258} mode="grow" className="w-full">
          <div className="relative flex h-[1240.258px] w-[375px] flex-col items-start gap-[32px] overflow-clip bg-[#fafafa] pt-[64px]">
            {/* Заголовок стопкой + 2 абзаца (px-20, gap 12). */}
            <div className="flex flex-col gap-[12px] px-[20px]">
              <div className="flex w-[279px] flex-col font-heading text-[26px] font-bold uppercase">
                <span className="leading-none text-[#008cff]">04</span>
                <span className="leading-[1.1] tracking-[0.78px] text-[#121212]">Серия сценариев</span>
              </div>
              <div className="flex flex-col gap-[6px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212]">
                <p className="opacity-70">
                  После первого KV визуальная система была расширена на другие сценарии: автомобиль и
                  яхту. Они показывают разные возможности продукта, сохраняя единый принцип
                  построения.
                </p>
                <p className="opacity-70">
                  Во всех визуалах повторяется одна формула: человек, телефон и объект покупки
                  объединены общей композицией и типографической системой. Меняется сценарий, но
                  визуальный язык остаётся узнаваемым.
                </p>
              </div>
            </div>

            {/* 2 KV-постера с запечённым слоганом СТОПКОЙ (w-335, gap 12). */}
            <div className="flex w-[335px] shrink-0 flex-col gap-[12px] self-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="KEY VISUAL Stablegate: сценарий с автомобилем"
                className="block h-[223.629px] w-full max-w-none object-cover"
                src={`${A}/series-1-375.jpg`}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="KEY VISUAL Stablegate: сценарий с яхтой"
                className="block h-[223.629px] w-full max-w-none object-cover"
                src={`${A}/series-2-375.jpg`}
              />
            </div>

            {/* Доодл-«шеврон вниз» по центру (108.5, 830.258), 158×125. */}
            <DrawIn
            src={`${A}/chevron.svg`}
            fit="contain"
            className="h-[125px] w-[158px] shrink-0 self-center"
          />

            {/* Мысль (w-303, center, pb-64) + обводка-эллипс (Vector
                234257399) — общая обёртка, эллипс в % от блока текста
                (146.9%/110.44%) — масштабируется вместе с текстом при
                другом числе строк (перевод на английский). */}
            <div className="relative flex w-full shrink-0 flex-col items-center justify-center pb-[64px]">
              <div className="relative w-[303px]">
                <p className="text-center font-heading text-[22px] font-normal uppercase leading-[1.15] tracking-[0.66px] text-[#121212] opacity-70">
                  Один принцип позволил рассказывать разные истории в рамках одной кампании
                </p>
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-[146.9%] w-[110.44%] -translate-x-1/2 -translate-y-1/2">
                  <DrawIn src={`${A}/series-ellipse-375.svg`} className="absolute inset-[-1.62%_-0.9%]" />
                </div>
              </div>
            </div>
          </div>
        </FullBleedScale>
      </div>
    </>
  );
}
