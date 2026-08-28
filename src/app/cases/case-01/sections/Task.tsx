import TaskZoomCrop from "./TaskZoomCrop";

// 02 Задача — 1:1 из Figma (node 1961:29100). Витрина категорий — "зум энд
// кроп" при скролле, теперь с пином (см. TaskZoomCrop.tsx): секция разбита
// на 3 блока обычного потока (текст сверху / пин-анимация / доодл снизу)
// вместо одной абсолютно-позиционированной мегасекции — иначе пин не мог бы
// зарезервировать себе дополнительный скролл (абсолютные дети не растягивают
// поток). Координаты внутри каждого блока — те же, что были в Figma,
// пересчитаны только относительно нового локального начала координат блока.
const A = "/cases/case-01/sections/task-assets";

export default function Task() {
  return (
    <section className="relative w-full bg-[#fafafa]">
      {/* Блок A — заголовок/описание, координаты как в Figma (top 134/181). */}
      <div className="relative mx-auto w-[1440px] overflow-clip" style={{ height: 318 }}>
        <div className="absolute left-[46px] top-[134px] flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
          <p className="text-[#008cff]">02</p>
          <p className="text-[#121212]">ЗАДАЧА</p>
        </div>
        <p className="absolute left-[46px] top-[181px] w-[498px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
          Перед нами стояла задача провести аудит библиотеки, устранить несоответствия и создать
          основу для дальнейшего масштабирования единой системы.
        </p>
      </div>

      <TaskZoomCrop />

      {/* Блок C — доодл-молния. В Figma был на top-1041 от начала секции;
          зум-кроп занимал 318..1021, поэтому здесь top = 1041-1021 = 20. */}
      <div className="relative mx-auto w-[1440px] overflow-clip" style={{ height: 175 }}>
        <div className="absolute left-[692.95px] top-[20px] h-[120.909px] w-[92.566px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" src={`${A}/doodle-flash.svg`} className="block size-full max-w-none" />
        </div>
      </div>
    </section>
  );
}
