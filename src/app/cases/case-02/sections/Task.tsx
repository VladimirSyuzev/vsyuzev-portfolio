// 01 Задача — 1:1 из Figma (node 2009:12098). Три колонки (Video / CDN /
// Search API) — только подпись с буллетом; колонка Interconnect несёт
// визуал: синий значок Cloud Interconnect 328px + под ним бледный «ghost»
// того же значка 164px (вертикальный стек, gap 24). Все векторные
// изображения — SVG.
const A = "/cases/case-02/sections";

const ITEMS = [
  { bullet: "bullet-minus.svg", title: "Yandex\nCloud Video" },
  { bullet: "bullet-minus.svg", title: "Yandex\nCloud CDN" },
  { bullet: "bullet-plus.svg", title: "Yandex Cloud\nInterconnect", visual: true },
  { bullet: "bullet-minus.svg", title: "Yandex\nSearch API" },
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
              <div className="flex flex-col items-center gap-[24px]">
                <img
                  alt="Значок сервиса Yandex Cloud Interconnect"
                  className="size-[328px] shrink-0"
                  src={`${A}/task-icon-blue.svg`}
                />
                <img alt="" className="size-[164px] shrink-0" src={`${A}/task-icon-ghost.svg`} />
              </div>
            )}
            <div className="flex w-full items-start gap-[16px]">
              <img alt="" className="size-[24px] shrink-0" src={`${A}/${item.bullet}`} />
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
