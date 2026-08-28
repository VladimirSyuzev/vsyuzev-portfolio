// «Примитивы» — 1:1 из Figma (node 1961:31925). Чисто декоративная
// композиция без собственного текста (сетка-подложка + 9 геом. примитивов
// + 9 итоговых иконок), поэтому — единый SVG-экспорт всего фрейма
// 1961:31926 (см. FIGMA-BRIEF §5). Раньше собиралась из ~30 отдельных
// mesh/shape/icon-слоёв; после переверстки в Figma (высота 987→1058,
// композиция отцентрирована по вертикали) проще и надёжнее держать одним
// ассетом. Композиция 1008×712.421, отцентрирована в секции 1058px.
export default function Primitives() {
  return (
    <div className="relative h-[1058px] w-full overflow-clip bg-[#fafafa]">
      <div className="absolute left-1/2 top-1/2 h-[712.421px] w-[1008px] -translate-x-1/2 -translate-y-1/2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/cases/case-01/sections/primitives.svg"
          alt="Девять геометрических примитивов сетки и собранные из них итоговые иконки"
          className="block size-full"
        />
      </div>
    </div>
  );
}
