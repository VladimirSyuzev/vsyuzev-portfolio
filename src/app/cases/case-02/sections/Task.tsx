// 01 Задача — 1:1 из Figma (node 2009:12098). Только колонка «Interconnect»
// несёт визуал (составной значок), остальные три — просто подпись.
const ITEMS = [
  { icon: "task-bullet.svg", title: "Yandex\nCloud Video" },
  { icon: "task-bullet.svg", title: "Yandex\nCloud CDN" },
  { icon: "task-bullet-minus.svg", title: "Yandex Cloud\nInterconnect", visual: true },
  { icon: "task-bullet.svg", title: "Yandex\nSearch API" },
];

export default function Task() {
  return (
    <div className="relative h-[1022px] w-[1440px] overflow-clip bg-[#fafafa]">
      <div className="absolute left-[46px] top-[134px] flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
        <p className="text-[#008cff]">01</p>
        <p className="text-[#121212]">Задача</p>
      </div>

      <p className="absolute left-[46px] top-[182px] w-[328px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
        Главной особенностью проекта стала высокая степень неопределённости. На старте у нас были
        существующие метафоры, несколько примеров и общее направление, но не было полноценной
        системы правил для ежедневной работы.
      </p>
      <p className="absolute left-[386px] top-[181px] w-[328px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
        В процессе требования менялись, поэтому часть готовых иконок приходилось пересобирать и
        повторно согласовывать с командой Yandex Cloud. Это потребовало гибкого процесса и
        постоянной синхронизации с заказчиком.
      </p>

      <div className="absolute left-[46px] top-[318px] flex items-end justify-center gap-[12px]">
        {ITEMS.map((item, i) => (
          <div key={i} className="flex w-[328px] flex-col items-center gap-[24px]">
            {item.visual && (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/cases/case-02/sections/task-cdn-icon.png" alt="" width={328} height={328} className="size-[328px]" />
                <img alt="" className="size-[164px]" src="/cases/case-02/sections/task-cloud-interconnect.svg" />
              </>
            )}
            <div className="flex w-full items-start gap-[16px]">
              <img alt="" className="size-[24px]" src={`/cases/case-02/sections/${item.icon}`} />
              <p className="whitespace-pre-line text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px] text-[#121212]">
                {item.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
