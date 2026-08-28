// Диаграмма «Размер / Толщина / Скругления» внутри «05 Руководство для
// команды» — пользователь экспортировал полный узел из Figma вручную
// (guide-diagram-full.svg, исходный размер 624×361). Позиция ИСПРАВЛЕНА:
// стояла на left-726/top-457 (устаревшее значение из более ранней сессии)
// — по факту узел диаграммы в Figma (#1961:32281) стоит на x=556/y=321,
// из-за старого сдвига диаграмма наезжала на эллипс-обводку итоговой фразы
// ниже (добавленную позже на верных координатах) — это и был нахлёст.
export default function GuideScale() {
  return (
    <div className="absolute left-[556px] top-[321px] h-[361px] w-[624px]">
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
