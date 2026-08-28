// «Гайд» — 1:1 из Figma (node 1961:32453). Плотный аннотированный коллаж
// (страницы внутреннего гайда: пиксельная сетка компонента, примеры
// ресайза, три состояния «Плохо / Хорошо / Круто») — единый SVG-экспорт
// белой карточки целиком (node 1961:32455, 1008×719 с учётом внутренних
// отступов 25.169px). После переверстки в Figma высота секции 900→1126,
// карточка отцентрирована по вертикали со смещением −22.72px.
export default function Guide() {
  return (
    <div className="relative h-[1126px] w-[1440px] overflow-clip bg-[#fafafa]">
      <div className="absolute left-1/2 top-[calc(50%-22.72px)] h-[719px] w-[1008px] -translate-x-1/2 -translate-y-1/2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/cases/case-01/sections/guide-real.svg"
          alt="Страницы внутреннего гайда: пиксельная сетка компонента, примеры ресайза иконок и три состояния «Плохо / Хорошо / Круто»"
          className="block size-full"
        />
      </div>
    </div>
  );
}
