import TaskZoomCrop from "./TaskZoomCrop";

// 02 Задача — 1:1 из Figma (node 1961:29100). Витрина категорий — "зум энд
// кроп" при скролле: окно пропорционально растёт, контент внутри
// пропорционально уменьшается, открывая все 7 категорий вместо одной
// видимой Actions (см. TaskZoomCrop.tsx — два состояния экспортированы
// пользователем напрямую из Figma как настоящие SVG).
const A = "/cases/case-01/sections/task-assets";

export default function Task() {
  return (
    <section className="relative h-[1196px] w-[1440px] overflow-clip bg-[#fafafa]">
      <div className="absolute left-[46px] top-[134px] flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
        <p className="text-[#008cff]">02</p>
        <p className="text-[#121212]">ЗАДАЧА</p>
      </div>
      <p className="absolute left-[46px] top-[181px] w-[498px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
        Перед нами стояла задача провести аудит библиотеки, устранить несоответствия и создать
        основу для дальнейшего масштабирования единой системы.
      </p>

      <div className="absolute left-[46px] top-[318px]">
        <TaskZoomCrop />
      </div>

      <div className="absolute left-[692.95px] top-[1041px] h-[120.909px] w-[92.566px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" src={`${A}/doodle-flash.svg`} className="block size-full max-w-none" />
      </div>
    </section>
  );
}
