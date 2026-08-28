// 02 Исследование — 1:1 из Figma (node 2009:12143). Текст — реальный DOM.
// Три колонки-карточки справа (СПИСОК / ПОИСК ФОРМЫ / ИТОГ) — плотный
// рабочий документ с десятками встроенных фото-референсов: СПИСОК и
// ПОИСК ФОРМЫ остаются растровым ассетом 2x (как витрина иконок в кейсе
// 1, см. FIGMA-BRIEF §5), ИТОГ — чистый вектор, отдан как SVG.
import Reveal from "@/components/Reveal";

const A = "/cases/case-02/sections";

export default function Research() {
  return (
    <div className="relative h-[898px] w-[1440px] overflow-clip bg-[#fafafa]">
      <div className="absolute left-[44px] top-[134px] flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
        <p className="text-[#008cff]">02</p>
        <p className="text-[#121212]">Исследование</p>
      </div>

      <p className="absolute left-[46px] top-[181px] w-[499px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
        Поскольку метафоры сервисов уже существовали, задача была не в поиске новых образов, а в
        их переосмыслении внутри нового визуального языка. Мы анализировали предыдущую библиотеку,
        изучали первые примеры новых иконок и собирали визуальные референсы, чтобы понять характер
        будущей системы.
      </p>

      <p className="absolute left-[46px] top-[650px] w-[507px] font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px] text-[#121212] opacity-70">
        Главной целью было сохранить узнаваемость сервисов и одновременно привести их к единому
        стилю.
      </p>

      {/* Доодл «//» справа сверху (Figma node 2279:32678). */}
      <Reveal variant="doodle" className="absolute left-[1261.85px] top-[161px] h-[125px] w-[158px]">
        <img alt="" className="block size-full max-w-none" src={`${A}/research-doodle.svg`} />
      </Reveal>

      {/* Карточки-колонки, y318, h536. */}
      <img
        alt="Список из 10 сервисов Yandex Cloud с метафорами и описаниями"
        className="absolute left-[556px] top-[318px] h-[536px] w-[352px]"
        src={`${A}/research-list.png`}
      />
      <img
        alt="Поиск формы: перебор вариантов иконок и визуальные референсы"
        className="absolute left-[920px] top-[318px] h-[536px] w-[352px]"
        src={`${A}/research-forms.png`}
      />
      <img
        alt="Итоговые иконки"
        className="absolute left-[1285px] top-[318px] h-[536px] w-[109px]"
        src={`${A}/research-result.svg`}
      />
    </div>
  );
}
