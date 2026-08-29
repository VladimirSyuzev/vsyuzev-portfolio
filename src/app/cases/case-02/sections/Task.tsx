import Reveal from "@/components/Reveal";

// 01 Задача — 1:1 из актуальной Figma (node 2009:12098, высота 1583).
// Крупный дисплейный заголовок «01 ЗАДАЧА» (175px). Два вводных абзаца.
// Внизу — 4 подписи сервисов (Video / CDN / Interconnect / Search API),
// только буллет + название (крупный значок Interconnect убран).
// Итоговая мысль (Wix Madefor Display Regular, по центру) в обводке-
// эллипсе (экспорт узла 2382:21071, 760×248, начало SVG = координата
// секции 341.04 / 1210.4).
const A = "/cases/case-02/sections";

const SERVICES = [
  "Yandex\nCloud Video",
  "Yandex\nCloud CDN",
  "Yandex Cloud\nInterconnect",
  "Yandex\nSearch API",
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

      {/* Подписи сервисов (Figma node 2013:14127, bottom 548). */}
      <div className="absolute bottom-[548px] left-[46px] flex gap-[12px]">
        {SERVICES.map((title) => (
          <div key={title} className="flex w-[328px] gap-[16px]">
            <img alt="" className="size-[24px] shrink-0" src={`${A}/bullet-minus.svg`} />
            <p className="whitespace-pre-line pt-[4px] text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px] text-[#121212]">
              {title}
            </p>
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
