// «Гайд» — настоящий SVG-экспорт пользователя напрямую из Figma
// (1008×719), заменил прежний screenshot-коллаж. Центрирован в области
// 1008px (тот же боковой отступ 216px, что и у "Примитивов"/"Stats").
export default function Guide() {
  return (
    <div className="relative h-[900px] w-[1440px] overflow-clip bg-[#fafafa]">
      <div className="absolute left-[216px] top-[90.5px] h-[719px] w-[1008px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/cases/case-01/sections/guide-real.svg"
          alt="Страницы внутреннего гайда: пиксельная сетка компонента и примеры ресайза иконок"
          className="block size-full"
        />
      </div>
    </div>
  );
}
