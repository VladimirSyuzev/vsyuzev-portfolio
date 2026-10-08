"use client";

import DrawIn from "@/components/DrawIn";
import VariantsCarousel from "@/components/VariantsCarousel";
import { useLang } from "@/lib/lang";
import { C2 } from "../i18n";

// Блок 8 «07 Итог» — светлый. 1:1 из Figma: 1440 = 3330:24606 (высота 1407),
// 1280 = 3644:87565 (1153), 834 = 3644:88192 (1127), 375 = 3645:91735 (1288).
// Заголовок-дисплей «07 ИТОГ» (175/100/26px), два абзаца, доодл-«две линии»,
// карусель из 9 готовых постов — общий VariantsCarousel (снап-карусель,
// активная карточка по центру и крупная 319×399, остальные 210×262, драг /
// колесо / стрелки, бар сегментов), и итоговая мысль в овале-обводке.
// Раскладка: xl ≥1440 — абсолютные координаты холста; ниже — поток с
// брейкпоинтами (lg = reflow 1280, sm = 834, base = 375).
const A = "/cases/case-02/summary";
const CARD_W = 630; // у всех карточек, кроме первой, пропорция 630×786
const CARDS_META = [
  { src: "c1.webp", w: 640, h: 800 },
  ...Array.from({ length: 8 }, (_, i) => ({ src: `c${i + 2}.webp`, w: CARD_W, h: 786 })),
];

export default function Summary() {
  const t = C2[useLang()];
  const cards = CARDS_META.map((c, i) => ({
    src: `${A}/${c.src}`,
    w: c.w,
    h: c.h,
    alt: t.sumCardAlts[i],
  }));

  return (
    <section className="relative w-full overflow-x-clip bg-[#fafafa] [container-type:inline-size]">
      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col px-[20px] pb-[63px] pt-[65px] sm:px-[28px] sm:pb-[75px] sm:pt-[72px] lg:px-[40px] lg:pb-[74px] lg:pt-[73px] xl:block xl:h-[1407px] xl:p-0">
        {/* Заголовок + два абзаца */}
        <div className="flex w-full flex-col gap-[10px] lg:w-[1007px] xl:contents">
          <div className="flex items-center gap-[12px] whitespace-nowrap font-heading text-[26px] font-bold uppercase leading-[1.1] tracking-[0.78px] sm:text-[min(100px,11.99vw)] sm:tracking-normal lg:text-[min(175px,13.67vw)] xl:absolute xl:left-[46px] xl:top-[145px] xl:text-[175px]">
            <span className="text-[#008cff]">07</span>
            <span className="text-[#121212]">{t.sumHeading}</span>
          </div>
          <div className="flex flex-col gap-[6px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70 max-sm:mt-[1px] sm:mt-[1px] sm:w-[779px] lg:mt-0 sm:max-w-full lg:w-full lg:flex-row lg:gap-[12px] xl:absolute xl:left-[46px] xl:top-[370px] xl:w-[1007px] xl:gap-[12px]">
            <p className="lg:w-1/2 xl:w-[498px]">{t.sumIntro1}</p>
            <p className="lg:w-1/2 xl:w-[497px]">{t.sumIntro2}</p>
          </div>
        </div>

        {/* Доодл «две линии»: 1440 @1233/181, 1280 @1097/116, 834 @648/67; на 375 нет */}
        <DrawIn
          src={`${A}/lines.svg`}
          className="pointer-events-none absolute hidden h-[125px] w-[158px] sm:right-[28px] sm:top-[67px] sm:block lg:right-[25px] lg:top-[116px] xl:left-[1233px] xl:right-auto xl:top-[182px]"
        />

        {/* Карусель постов. Обёртка задаёт высоту кадра (375 — 516, остальные
            399), VariantsCarousel сам себя кладёт абсолютно внутрь. */}
        <div className="relative left-1/2 mb-[32px] mt-[18px] h-[516px] w-[100cqw] -translate-x-1/2 sm:mb-[60px] sm:mt-[65px] sm:h-[399px] lg:mb-[61px] lg:mt-[48px] xl:absolute xl:top-[592px] xl:m-0">
          <div className="absolute inset-x-0 top-[58.5px] h-[399px] sm:top-0">
            <VariantsCarousel cards={cards} top={0} maxActiveWidth={335} gap={12} activeGap={16} />
          </div>
        </div>

        {/* Итоговая мысль в овале */}
        <div className="relative flex w-full items-center justify-center py-[62px] xl:absolute xl:left-0 xl:top-[1075px] xl:w-[1440px]">
          <p
            data-no-typo
            className="relative z-10 w-[610px] max-w-full whitespace-pre-line text-center font-heading text-[32px] font-normal uppercase leading-[1.1] tracking-[0.96px] text-[#121212] opacity-70"
          >
            {t.sumThought}
          </p>
          <DrawIn
            src={`${A}/oval-375.svg`}
            className="pointer-events-none absolute left-1/2 top-[28px] h-[196px] w-[344px] -translate-x-1/2 sm:hidden"
          />
          <DrawIn
            src={`${A}/oval.svg`}
            className="pointer-events-none absolute left-1/2 top-[19px] hidden h-[152px] w-[463px] -translate-x-1/2 sm:block xl:top-[24px]"
          />
        </div>
      </div>
    </section>
  );
}
