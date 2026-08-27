// «Примитивы» — 1:1 из Figma (node 1961:31925), теперь настоящий SVG/DOM
// вместо screenshot-ассета: сетка-подложка, 9 геометрических примитивов
// (mesh-заливки + контуры фигур) и 9 итоговых иконок поверх них.
const A = "/cases/case-01/sections/primitives-assets";

const MESHES = [
  { src: `${A}/mesh.svg`, left: 466.1, top: 87.16 },
  { src: `${A}/mesh1.svg`, left: 259.96, top: 87.16 },
  { src: `${A}/mesh2.svg`, left: 672.25, top: 87.16 },
  { src: `${A}/mesh3.svg`, left: 259.96, top: 293.3 },
  { src: `${A}/mesh4.svg`, left: 259.96, top: 499.45 },
  { src: `${A}/mesh5.svg`, left: 466.1, top: 293.3 },
  { src: `${A}/mesh6.svg`, left: 672.25, top: 499.45 },
  { src: `${A}/mesh7.svg`, left: 672.25, top: 293.3 },
  { src: `${A}/mesh8.svg`, left: 466.1, top: 499.45 },
];

const ICONS = [
  { src: `${A}/home-light.svg`, left: "calc(50% - 206.28px)", top: "calc(50% - 206.28px)", translate: "-translate-x-1/2 -translate-y-1/2" },
  { src: `${A}/star.svg`, left: "calc(50% + 206.28px)", top: "calc(50% - 206.28px)", translate: "-translate-x-1/2 -translate-y-1/2" },
  { src: `${A}/clock.svg`, left: "calc(50% - 0.36px)", top: "calc(50% - 206.28px)", translate: "-translate-x-1/2 -translate-y-1/2" },
  { src: `${A}/trash.svg`, left: "calc(50% - 206.28px)", top: "205.92px", translate: "-translate-x-1/2" },
  { src: `${A}/travel.svg`, left: "205.92px", top: "205.92px", translate: "" },
  { src: `${A}/cafe.svg`, left: "411.84px", top: "205.92px", translate: "" },
  { src: `${A}/mail.svg`, left: "calc(50% - 206.28px)", top: "412.56px", translate: "-translate-x-1/2" },
  { src: `${A}/speech.svg`, left: "calc(50% - 0.36px)", top: "412.56px", translate: "-translate-x-1/2" },
  { src: `${A}/games.svg`, left: "411.84px", top: "412.56px", translate: "" },
];

export default function Primitives() {
  return (
    <div className="relative h-[987px] w-[1440px] overflow-clip bg-[#fafafa]">
      <div className="absolute left-[216px] top-[94.02px] h-[712.421px] w-[1008px]">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={`${A}/grid-bg.svg`} />

        {MESHES.map((m, i) => (
          <div
            key={i}
            className="absolute size-[109.137px] overflow-clip bg-[rgba(73,174,255,0.1)]"
            style={{ left: m.left, top: m.top }}
          >
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={m.src} />
          </div>
        ))}

        {/* 9 фигур-примитивов, из которых собраны итоговые иконки */}
        <div className="absolute flex items-center justify-center" style={{ inset: "72.66% 64.29% 17.13% 26.69%", containerType: "size" }}>
          <div className="h-[100cqw] w-[100cqh] rotate-90">
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={`${A}/subtract.svg`} />
          </div>
        </div>
        <div className="absolute flex items-center justify-center" style={{ inset: "41.17% 24.74% 43.51% 68.95%", containerType: "size" }}>
          <div className="h-[100cqh] w-[100cqw] rotate-180">
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={`${A}/rect39959.svg`} />
          </div>
        </div>
        <div className="absolute flex items-center justify-center" style={{ inset: "41.81% 44.29% 44.15% 47.59%", containerType: "size" }}>
          <div className="h-[100cqw] w-[100cqh] rotate-90">
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={`${A}/vector.svg`} />
          </div>
        </div>
        <div className="absolute" style={{ inset: "42.45% 65.19% 44.79% 27.59%" }}>
          <img alt="" className="absolute inset-0 block size-full max-w-none" src={`${A}/subtract1.svg`} />
        </div>
        <div className="absolute" style={{ inset: "13.51% 23.38% 75.03% 67.66%" }}>
          <img alt="" className="absolute inset-0 block size-full max-w-none" src={`${A}/polygon1.svg`} />
        </div>
        <div className="absolute" style={{ inset: "13.51% 43.83% 73.72% 47.14%" }}>
          <img alt="" className="absolute inset-0 block size-full max-w-none" src={`${A}/vector-stroke.svg`} />
        </div>
        <div className="absolute" style={{ inset: "14.15% 64.74% 74.36% 27.14%" }}>
          <img alt="" className="absolute inset-0 block size-full max-w-none" src={`${A}/rect5-stroke.svg`} />
        </div>
        <div className="absolute flex items-center justify-center" style={{ inset: "73.3% 22.48% 17.77% 66.69%", containerType: "size" }}>
          <div className="h-[100cqw] w-[100cqh] rotate-90">
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={`${A}/rect39960.svg`} />
          </div>
        </div>
        <div className="absolute" style={{ inset: "72.02% 43.38% 16.49% 46.69%" }}>
          <img alt="" className="absolute inset-0 block size-full max-w-none" src={`${A}/vector1.svg`} />
        </div>

        {/* 9 итоговых иконок, собранных из примитивов выше */}
        <div className="absolute left-[259.92px] top-[87.12px] size-[521.698px]">
          {ICONS.map((icon, i) => (
            <div key={i} className={`absolute size-[109.138px] ${icon.translate}`} style={{ left: icon.left, top: icon.top }}>
              <img alt="" className="absolute inset-0 block size-full max-w-none" src={icon.src} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
