import Reveal from "@/components/Reveal";

// 04 Работа с деталями — 1:1 из Figma (node 2210:75540, высота 1401).
// Тёмный full-bleed. Заголовок «04 РАБОТА С ДЕТАЛЯМИ» (32px), два абзаца
// с подчёркиванием, коллаж из пяти кропов иллюстрации и крупная мысль в
// обводке-эллипсе.
const A = "/cases/case-05/sections";

// [файл, left, top, ширина, высота] — координаты кроп-окон (Figma frames
// 2228:91710 / 91711 / 91707 / 91708 / 91709).
const CROPS: [string, number, number, number, number][] = [
  ["detail-tc.jpg", 726, 44, 328, 399],
  ["detail-tr.jpg", 1066, 181, 328, 262],
  ["detail-bl.jpg", 46, 455, 498, 399],
  ["detail-bc.jpg", 556, 455, 498, 262],
  ["detail-br.jpg", 1066, 455, 328, 399],
];

export default function Details() {
  return (
    <div className="w-full overflow-clip bg-[#121212]">
      <div className="relative mx-auto h-[1401px] w-[1440px]">
        <div className="absolute left-[46px] top-[134px] flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
          <p className="text-[#008cff]">04</p>
          <p className="text-white">Работа с деталями</p>
        </div>

        <p className="absolute left-[46px] top-[181px] w-[498px] text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70">
          Иллюстрация создавалась для банковской карты, поэтому должна была оставаться читаемой в
          небольшом формате. Основное внимание я уделил силуэту, крупным формам, контрасту и
          толщине линий.
        </p>
        <p className="absolute left-[46px] top-[238px] w-[498px] text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70">
          Детали при этом стали важной частью истории. Потёртые поверхности, канистры, защитные дуги
          и навесное оборудование создавали ощущение автомобиля, который десятилетиями выживал в
          пустоши.
        </p>
        {/* Двойное подчёркивание (Figma nodes 2284:39987 / 2284:39990). */}
        <Reveal variant="line" start="top 90%" className="absolute left-[417px] top-[286px] h-[40px] w-[146px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="block size-full max-w-none" src={`${A}/details-underline1.svg`} />
        </Reveal>
        <Reveal variant="line" delay={0.1} start="top 90%" className="absolute left-[487px] top-[306px] h-[24px] w-[89px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="block size-full max-w-none" src={`${A}/details-underline2.svg`} />
        </Reveal>

        {CROPS.map(([src, left, top, w, h]) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={src}
            alt="Фрагмент иллюстрации: детали постапокалиптического DeLorean"
            className="absolute object-cover"
            style={{ left, top, width: w, height: h }}
            src={`${A}/${src}`}
          />
        ))}

        {/* Обводка-эллипс вокруг мысли (Figma node 2412:4338). Реальная
            геометрия — из `export` (номинальный box 707×231), якорь по
            translate фонового rect: левый-верх SVG = точка секции
            (361, 1009.82). viewBox расширен на поля (-4/-26 719×271), чтобы
            <img> не срезал верхнюю и нижнюю дуги, поэтому смещаем на поля. */}
        <Reveal variant="line" start="top 88%" className="absolute left-[357px] top-[984px] h-[271px] w-[719px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="block size-full max-w-none" src={`${A}/details-ellipse.svg`} />
        </Reveal>
        {/* Мысль (Figma node 2412:4317 → x386 / y1064, w668, по центру). */}
        <p className="absolute left-1/2 top-[1064px] w-[668px] -translate-x-1/2 text-center font-heading text-[32px] font-normal uppercase leading-[1.1] tracking-[0.96px] text-white opacity-70">
          Каждая деталь должна была работать на историю, не мешая считывать автомобиль в маленьком
          формате
        </p>
      </div>
    </div>
  );
}
