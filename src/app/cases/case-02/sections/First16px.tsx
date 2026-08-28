// 05 Сначала 16px — 1:1 из Figma (node 2009:12761). Все векторные
// изображения — SVG: большая чёрная иконка 640px, её 16px-версия и две
// нижние карточки-сравнения 16px→640px (icon16-cards.svg, 668×328).
const A = "/cases/case-02/sections";

export default function First16px() {
  return (
    <div className="relative h-[898px] w-[1440px] overflow-clip bg-[#fafafa]">
      <div className="absolute left-[46px] top-[134px] flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
        <p className="text-[#008cff]">05</p>
        <p className="text-[#121212]">сначала 16px</p>
      </div>

      <div className="absolute left-[46px] top-[181px] flex w-[328px] flex-col gap-[12px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-80">
        <p>Каждая иконка создавалась сразу в двух размерах: 16×16px и 640×640px.</p>
        <p>
          Мы всегда начинали с маленькой версии. Ограниченный размер заставляет работать с
          композицией, силуэтом и читаемостью, не пряча проблемы за деталями.
        </p>
      </div>
      <p className="absolute left-[386px] top-[181px] w-[328px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-80">
        После утверждения 16-пиксельной версии создавалась большая. Это было не просто
        масштабирование: менялись пропорции, толщина линий и радиусы скруглений, добавлялись
        детали. Так большая иконка становилась самостоятельной иллюстрацией, сохраняя характер
        маленькой.
      </p>

      <img
        alt="Иконка Key Management Service в размере 640×640"
        className="absolute left-[755px] top-[181px] size-[640px]"
        src={`${A}/icon16-big.svg`}
      />
      <img
        alt="Та же иконка в размере 16×16"
        className="absolute left-[727px] top-[181px] size-[16px]"
        src={`${A}/icon16-tiny.svg`}
      />

      <img
        alt="Сравнение построения иконки в 16px и 640px"
        className="absolute left-[46px] top-[493px] h-[328px] w-[668px]"
        src={`${A}/icon16-cards.svg`}
      />
    </div>
  );
}
