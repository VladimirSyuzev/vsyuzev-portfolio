import Reveal from "@/components/Reveal";

// 03 Визуальный язык — тёмный full-bleed блок (#121212 на всю ширину).
// На десктопе (≥1200) внутренний контент — абсолют 1:1 из Figma (node
// 2236:94095, высота 1377). Ниже 1200 — поток: заголовок, оба абзаца,
// фото (резка металла) на всю ширину сетки, обводка-эллипс скрыта.
const A = "/cases/case-02/sections";

export default function VisualLanguage() {
  return (
    <div className="w-full overflow-clip bg-[#121212]">
      <div className="mx-auto w-full max-w-[1440px] xl:relative xl:h-[1377px]">
        {/* 1280 (Figma 2613:16469): заголовок + 2 абзаца (595) в общем блоке
            gap 12, дальше фото 1200×536, дальше цитата 672. Крупные группы gap 64. */}
        <div className="flex flex-col gap-[32px] px-[var(--grid-margin)] py-[64px] sm:gap-[64px] sm:py-[72px] xl:contents">
          <div className="flex flex-col gap-[12px] lg:w-[595px] lg:max-w-full xl:contents">
            <div className="flex flex-col whitespace-nowrap font-heading text-[26px] font-bold uppercase leading-[1.1] tracking-[0.78px] sm:flex-row sm:items-center sm:gap-[12px] sm:text-[32px] sm:tracking-[0.96px] xl:absolute xl:left-[44px] xl:top-[134px] xl:text-[32px]">
              <p className="text-[#008cff]">03</p>
              <p className="text-white">Визуальный язык</p>
            </div>

            <p className="text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70 sm:max-w-[560px] lg:max-w-full xl:absolute xl:left-[44px] xl:top-[181px] xl:w-[500px]">
              Самой сложной задачей было найти простой принцип, который помогал бы всей команде понимать
              границы нового визуального языка. Такой метафорой стала деталь, вырезанная из цельного
              листа металла: если форму нельзя было представить вырезанной таким способом, значит, она
              не соответствовала стилю.
            </p>

            <p className="text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70 sm:max-w-[560px] lg:max-w-full xl:absolute xl:left-[726px] xl:top-[866px] xl:w-[498px]">
              Этот принцип изменил подход к проектированию иконок. Вместо того чтобы строить их из линий
              и контуров, мы начинали с цельной формы и постепенно убирали всё лишнее.
            </p>
          </div>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="Лазерная резка детали из листа металла"
            className="aspect-[335/300] w-full object-cover sm:aspect-[778/480] sm:rounded-[8px] lg:aspect-[1200/536] lg:rounded-none xl:absolute xl:left-[46px] xl:top-[318px] xl:h-[536px] xl:w-[1348px]"
            src={`${A}/visual-photo.jpg`}
          />

          {/* Обводка-эллипс (рукописная) — только на десктопе. */}
          <Reveal
            variant="line"
            start="top 92%"
            className="hidden xl:absolute xl:block"
            style={{ left: 321, top: 1059, width: 799, height: 152 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" className="block size-full" src={`${A}/visual-ellipse.svg`} />
          </Reveal>

          {/* 375: цитата без ручного переноса (авто-wrap), обводка тянется в %
              от фактической высоты (см. Task.tsx — тот же приём). */}
          <div className="py-[32px] sm:hidden">
            <div className="relative">
              <p className="max-w-[303px] text-center font-heading text-[22px] font-normal uppercase leading-[1.1] tracking-[0.66px] text-white opacity-70">
                Новый стиль строился не из линий, а из цельной формы
              </p>
              <Reveal
                variant="line"
                start="top 92%"
                className="pointer-events-none absolute left-1/2 top-1/2 h-[214%] w-[111%] max-w-none -translate-x-1/2 -translate-y-1/2 -rotate-[1.37deg]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img aria-hidden alt="" className="block size-full max-w-none object-fill" src={`${A}/reflow/visual-ellipse-375.svg`} />
              </Reveal>
            </div>
          </div>

          {/* 834/1280: перенос после «строился», обводка −1.37° шире (660/787). */}
          <div className="relative hidden justify-center py-[44px] sm:flex lg:py-[64px] xl:contents">
            <p className="max-w-[589px] text-center font-heading text-[28px] font-normal uppercase leading-[1.1] tracking-[0.84px] text-white opacity-70 lg:max-w-[672px] lg:text-[32px] lg:tracking-[0.96px] xl:absolute xl:left-1/2 xl:top-[1098.1px] xl:w-[667px] xl:-translate-x-1/2 xl:text-[32px]">
              Новый стиль строился{" "}<br />
              не из линий, а из цельной формы
            </p>
            <Reveal
              variant="line"
              start="top 92%"
              className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 sm:block xl:hidden"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img aria-hidden alt="" className="block w-[660px] max-w-none -rotate-[1.37deg] lg:w-[787px]" src={`${A}/reflow/visual-ellipse-1280.svg`} />
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}
