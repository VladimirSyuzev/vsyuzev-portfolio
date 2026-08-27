// Диаграмма «Размер / Толщина / Скругления» внутри «05 Руководство для
// команды» — раньше была ручной реконструкцией по get_design_context (там
// не было координат для мелких иконок-линеек внутри капсул). Пользователь
// экспортировал полный узел из Figma вручную (guide-diagram-full.svg,
// исходный размер 624×361) — используем его целиком, размер как в Figma.
export default function GuideScale() {
  return (
    <div className="absolute left-[726px] top-[457px] h-[361px] w-[624px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/cases/case-01/sections/guide-assets/guide-diagram-full.svg"
        alt="Диаграмма правил: размер (32/24/20/16/12px), толщина линий, радиусы скруглений"
        width={624}
        height={361}
        className="block size-full"
      />
    </div>
  );
}
