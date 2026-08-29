// «Примитивы» — 1:1 из Figma (node 1961:31926), интерактивный.
// В покое: сетка-подложка + 9 ячеек (mesh-заливка + контур примитива),
// БЕЗ итоговых иконок. При наведении на ячейку она увеличивается и в ней
// проявляется соответствующая иконка; при уходе курсора — возврат.
// Длительность ~180ms, ease-out (философия Emil Kowalski: «ничто не
// появляется из ничего» — иконка проявляется из opacity 0, а не scale 0).
const A = "/cases/case-01/sections/primitives-assets";

type Cell = {
  left: number;
  top: number;
  mesh: string;
  icon: string;
  shape: string;
  shapeClass: string;
  rotate?: number;
  swap?: boolean; // поворот 90° с обменом сторон (containerType-трюк из Figma)
};

const CELLS: Cell[] = [
  { left: 243.19, top: 95.4, mesh: "mesh6.svg", icon: "home-light.svg", shape: "rect5-stroke.svg", shapeClass: "inset-[12.5%]" },
  { left: 449.34, top: 95.4, mesh: "mesh5.svg", icon: "clock.svg", shape: "vector-stroke.svg", shapeClass: "inset-[8.33%]" },
  { left: 655.49, top: 95.4, mesh: "mesh4.svg", icon: "star.svg", shape: "polygon1.svg", shapeClass: "inset-[8.33%_8.26%_16.84%_8.95%]" },
  { left: 243.19, top: 301.55, mesh: "mesh3.svg", icon: "trash.svg", shape: "subtract1.svg", shapeClass: "inset-[8.33%_16.67%]" },
  { left: 449.34, top: 301.55, mesh: "mesh2.svg", icon: "travel.svg", shape: "vector.svg", shapeClass: "inset-[4.17%_12.5%]", rotate: 90, swap: true },
  { left: 655.49, top: 301.55, mesh: "mesh1.svg", icon: "cafe.svg", shape: "rect39959.svg", shapeClass: "inset-[0_20.83%]", rotate: 180 },
  { left: 243.19, top: 507.7, mesh: "mesh.svg", icon: "mail.svg", shape: "subtract.svg", shapeClass: "inset-[16.66%_8.33%_16.67%_8.33%]", rotate: 90, swap: true },
  { left: 449.34, top: 507.7, mesh: "mesh8.svg", icon: "speech.svg", shape: "vector1.svg", shapeClass: "inset-[12.5%_4.17%]" },
  { left: 655.49, top: 507.7, mesh: "mesh7.svg", icon: "games.svg", shape: "rect39960.svg", shapeClass: "inset-[20.83%_0]", rotate: 90, swap: true },
];

export default function Primitives() {
  return (
    <div className="relative h-[1011px] w-full overflow-clip bg-[#fafafa]">
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ width: 1008, height: 712.421 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${A}/grid-bg.svg`} alt="" className="absolute inset-0 block size-full" />

        {CELLS.map((c) => (
          <div
            key={c.icon}
            className="group absolute transition-transform duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] will-change-transform hover:z-10 hover:scale-[1.16] motion-reduce:transition-none motion-reduce:hover:scale-100"
            style={{ left: c.left, top: c.top, width: 109.137, height: 109.137 }}
          >
            <div className="absolute inset-0 overflow-clip bg-[rgba(73,174,255,0.1)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${A}/${c.mesh}`} alt="" className="absolute inset-0 block size-full max-w-none" />
              {c.swap ? (
                <div className={`absolute flex items-center justify-center ${c.shapeClass}`} style={{ containerType: "size" }}>
                  <div className="relative h-[100cqw] w-[100cqh]" style={{ transform: `rotate(${c.rotate}deg)` }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`${A}/${c.shape}`} alt="" className="absolute inset-0 block size-full max-w-none" />
                  </div>
                </div>
              ) : (
                <div className={`absolute ${c.shapeClass}`} style={c.rotate ? { transform: `rotate(${c.rotate}deg)` } : undefined}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`${A}/${c.shape}`} alt="" className="absolute inset-0 block size-full max-w-none" />
                </div>
              )}
            </div>

            {/* Иконка — скрыта в покое, проявляется на ховере (fade). */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${A}/${c.icon}`}
              alt=""
              className="pointer-events-none absolute inset-0 block size-full opacity-0 transition-opacity duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:opacity-100"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
