import Reveal from "@/components/Reveal";

// 01 Задача — 1:1 из актуальной Figma (node 2009:12098, высота 1583).
// Крупный дисплейный заголовок «01 ЗАДАЧА» (175px). Два вводных абзаца.
// Внизу — 4 подписи сервисов (Video / CDN / Interconnect / Search API),
// только буллет + название (крупный значок Interconnect убран).
// Итоговая мысль (Wix Madefor Display Regular, по центру) в обводке-
// эллипсе (экспорт узла 2382:21071, 760×248, начало SVG = координата
// секции 341.04 / 1210.4).
const A = "/cases/case-02/sections";

// Фрейм «варианты» (Figma node 2013:14127) — 4 инстанса компонента с двумя
// состояниями (State=+ / State=−). В покое показан только буллет «+» и
// подпись (40px). При наведении курсора компонент разворачивается в
// State=−: над подписью появляется крупная иконка сервиса с призрачным
// повтором (единый экспорт 328×516, узлы 2012:13834 / 2012:13842 /
// 2013:13857 / 2013:13856), буллет меняется на «−». Разворот вверх, чтобы
// подпись оставалась на своей якорной строке (Figma y=995).
const SERVICES = [
  { label: "Yandex\nCloud Video", icon: "task-opt-video.svg" },
  { label: "Yandex\nCloud CDN", icon: "task-opt-cdn.svg" },
  { label: "Yandex Cloud\nInterconnect", icon: "task-opt-interconnect.svg" },
  { label: "Yandex\nSearch API", icon: "task-opt-searchapi.svg" },
];

export default function Task() {
  return (
    <div className="relative h-[1583px] w-[1440px] overflow-clip bg-[#fafafa]">
      <div className="absolute left-[46px] top-[143px] flex items-center gap-[24px] whitespace-nowrap font-heading text-[175px] font-bold uppercase leading-[1.1] tracking-[5.25px]">
        <p className="text-[#008cff]">01</p>
        <p className="text-[#121212]">Задача</p>
      </div>

      <p className="absolute left-[46px] top-[375px] w-[498px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
        Главной особенностью проекта стала высокая степень неопределённости. На старте у нас были
        существующие
        <br />
        метафоры сервисов, несколько примеров и общее направление,
        <br />
        но не было полноценной системы правил для ежедневной работы.
      </p>
      <p className="absolute left-[556px] top-[374px] w-[498px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
        Требования менялись по ходу проекта, поэтому часть иконок приходилось пересобирать и
        повторно согласовывать с командой Yandex Cloud. Процесс требовал гибкости и постоянной
        синхронизации.
      </p>

      {/* Фрейм «варианты» — Figma node 2013:14127, x46 / y995, 4×328 через 12px. */}
      <div className="absolute left-[46px] top-[995px] flex gap-[12px]">
        {SERVICES.map((s) => (
          <div key={s.label} className="group relative flex w-[328px] flex-col">
            {/* Крупная иконка + призрак — разворачивается вверх при наведении. */}
            <div className="pointer-events-none absolute bottom-full left-0 w-full overflow-hidden pb-[32px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                className="block w-[328px] max-w-none translate-y-[24px] opacity-0 transition-[transform,opacity] duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100"
                src={`${A}/${s.icon}`}
              />
            </div>

            {/* Подпись с буллетом — крестик в покое, минус при наведении. */}
            <div className="flex gap-[16px]">
              <span className="relative size-[24px] shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt=""
                  className="absolute inset-0 size-full transition-opacity duration-300 group-hover:opacity-0"
                  src={`${A}/bullet-plus.svg`}
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt=""
                  className="absolute inset-0 size-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  src={`${A}/bullet-minus.svg`}
                />
              </span>
              <p className="whitespace-pre-line pt-[4px] text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px] text-[#121212]">
                {s.label}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Обводка-эллипс вокруг итоговой мысли (Figma node 2382:21071). */}
      <Reveal
        variant="line"
        start="top 92%"
        className="absolute"
        style={{ left: 341.035, top: 1210.4, width: 760, height: 248 }}
      >
        <img alt="" className="block size-full" src={`${A}/task-ellipse.svg`} />
      </Reveal>

      <p className="absolute left-1/2 top-[1268.23px] w-[589px] -translate-x-1/2 text-center font-heading text-[32px] font-normal uppercase leading-[1.1] tracking-[0.96px] text-[#121212] opacity-70">
        Мы создавали библиотеку одновременно с правилами, по которым она должна была работать
      </p>
    </div>
  );
}
