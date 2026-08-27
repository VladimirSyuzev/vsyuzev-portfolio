// «Гайд» — 1:1 из Figma (node 1961:32453). Коллаж скриншотов внутреннего
// гайда (Figma-положение объектов, варианты иконки-медведя) без
// собственного заголовка/абзаца — оставлен как screenshot-ассет.
export default function Guide() {
  return (
    <div className="relative h-[900px] w-[1440px] overflow-clip bg-[#fafafa]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/cases/case-01/sections/guide-collage.png"
        alt="Страницы внутреннего гайда: пиксельная сетка компонента и примеры ресайза иконок"
        width={1440}
        height={900}
        className="block w-full"
      />
    </div>
  );
}
