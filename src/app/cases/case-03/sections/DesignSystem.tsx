import Reveal from "@/components/Reveal";

// 06 Дизайн-система — 1:1 из Figma (node 2022:14938). Тёмный full-bleed.
// Текст + подчёркивание-доодл + ряд 3D-объектов системы (растр) с
// wireframe-кубом вокруг центрального объекта.
const A = "/cases/case-03/sections";

export default function DesignSystem() {
  return (
    <section className="relative w-full overflow-clip bg-[#121212]">
      <div className="relative mx-auto h-[900px] w-[1440px]">
        <div className="absolute left-[46px] top-[134px] flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
          <p className="text-[#008cff]">06</p>
          <p className="text-white">Дизайн-система</p>
        </div>

        <p className="absolute left-[46px] top-[181px] w-[668px] text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-80">
          Каждая иллюстрация создавалась как часть общей системы, а не как самостоятельный объект.
          Общая геометрия, материалы, освещение и цветовая палитра формируют узнаваемый визуальный
          язык, который остаётся целостным независимо от темы конкретной сцены. Такой подход
          позволил объединить разные функции продукта в единую экосистему и сделать коммуникацию
          бренда более последовательной.
        </p>

        {/* Wireframe-куб вокруг центрального объекта (Figma node 2022:14947). */}
        <div className="absolute left-[521px] top-[387px] size-[399px] overflow-clip border-[0.9px] border-white/60">
          <img alt="" className="absolute inset-0 block size-full max-w-none" src={`${A}/dsystem-mesh.svg`} />
        </div>

        {/* Ряд 3D-объектов системы (Figma node 2094:19670). */}
        <img
          alt="3D-объекты дизайн-системы Stablegate: монеты, щит, карта, шлюз"
          className="absolute left-[231px] top-[387px] h-[286px] max-w-none"
          src={`${A}/dsystem-objects.jpg`}
        />

        {/* Подчёркивание-доодл (Figma node 2284:45800). */}
        <Reveal
          variant="line"
          start="top 92%"
          className="absolute left-[459.55px] top-[790.82px] flex h-[59.556px] w-[541.625px] items-center justify-center"
        >
          <div className="rotate-[1.76deg]">
            <div className="relative h-[42.984px] w-[540.56px]">
              <div className="absolute inset-[-6.98%_-0.56%]">
                <img alt="" className="block size-full max-w-none" src={`${A}/dsystem-underline.svg`} />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
