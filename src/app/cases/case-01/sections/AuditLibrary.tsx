// 03 Аудит библиотеки — 1:1 из Figma (node 1965:42538). Таблица аудита
// теперь настоящий DOM (раньше была screenshot-ассетом): 9 колонок×6 строк,
// реальные текст/иконки/чекбоксы, снято через get_design_context узла
// 1965:42569. Высота секции — 1091px (по факту содержимого: эллипс-доодл
// внизу заканчивается на 1062.4px + отступ, см. правку эллипса ниже).
import Dot from "@/components/Dot";

const A = "/cases/case-01/sections/audit-assets";

const FOUND_LEFT = [
  "определены существующие иконки",
  "определены дубли",
  "определены отсутствующие размеры",
];
const FOUND_RIGHT = [
  "определены недостающие outline и filled версии",
  "определены полностью отсутствующие иконки",
  "расставлены приоритеты производства",
];

const COLUMNS = ["Symbols", "Regular", "Outline", "Filled", "32", "24", "20", "16", "12"];
const QUANTITIES = ["256", "65", "65", "4", "28", "61", "37", "58", "47"];

type Cell = { icon: string; alt: string } | "check" | "dash";

const ROWS: { label: string; cells: Cell[] }[] = [
  {
    label: "Edit",
    cells: [
      { icon: `${A}/edit-symbols.svg`, alt: "Edit / Symbols" },
      { icon: `${A}/edit-regular.svg`, alt: "Edit / Regular" },
      "check",
      "dash",
      "check",
      "check",
      "check",
      "check",
      "dash",
    ],
  },
  {
    label: "Picture",
    cells: [
      { icon: `${A}/image-symbols.svg`, alt: "Picture / Symbols" },
      { icon: `${A}/image-regular.svg`, alt: "Picture / Regular" },
      "check",
      "dash",
      "check",
      "check",
      "check",
      "check",
      "check",
    ],
  },
  {
    label: "Speaker max",
    cells: [
      { icon: `${A}/volume-symbols.svg`, alt: "Speaker max / Symbols" },
      { icon: `${A}/volume-regular.svg`, alt: "Speaker max / Regular" },
      "check",
      "check",
      "check",
      "check",
      "check",
      "check",
      "check",
    ],
  },
  {
    label: "Fire",
    cells: [
      { icon: `${A}/fire-symbols.svg`, alt: "Fire / Symbols" },
      "dash",
      "dash",
      "dash",
      "dash",
      "dash",
      "dash",
      "dash",
      "dash",
    ],
  },
];

function Cell({ cell }: { cell: Cell }) {
  if (cell === "check") {
    return <img alt="" src={`${A}/check.svg`} className="size-[24px]" />;
  }
  if (cell === "dash") {
    // Нативный размер dash.svg — 20×1.6 (тонкая черта): size-[24px] тут
    // растянул бы её в сплошной квадрат (preserveAspectRatio="none" в самом
    // файле игнорирует пропорции при явном width/height).
    return (
      <div className="flex size-[24px] items-center justify-center">
        <img alt="" src={`${A}/dash.svg`} style={{ width: 20, height: 1.6 }} />
      </div>
    );
  }
  return <img alt={cell.alt} src={cell.icon} className="size-[24px]" />;
}

export default function AuditLibrary() {
  return (
    <div className="relative h-[1091px] w-[1440px] overflow-clip bg-[#fafafa]">
      <div className="absolute left-[46px] top-[134px] flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
        <p className="text-[#008cff]">03</p>
        <p className="text-[#121212]">АУДИТ БИБЛИОТЕКИ</p>
      </div>

      <p className="absolute left-[46px] top-[181px] w-[498px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
        Работа началась с полной ревизии библиотеки. Мы объединили оба набора иконок, разбили их
        по категориям и начали детальный анализ каждой позиции.
      </p>

      <p className="absolute left-[46px] top-[318px] w-[200px] whitespace-pre-line text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px] text-[#121212]">
        {"В РЕЗУЛЬТАТЕ АУДИТА\nбыла СОБРАНА ТАБЛИЦА:"}
      </p>
      <div className="absolute left-[386px] top-[318px] flex w-[838px] gap-[12px]">
        <ul className="flex w-[328px] flex-col gap-[6px]">
          {FOUND_LEFT.map((item, i) => (
            <li key={item} className="flex items-center gap-[8px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
              <Dot index={i} />
              {item}
            </li>
          ))}
        </ul>
        <ul className="flex w-[442.667px] flex-col gap-[6px]">
          {FOUND_RIGHT.map((item, i) => (
            <li key={item} className="flex items-center gap-[8px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
              <Dot index={i} />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Стрелка-доодл, указывающая на таблицу. */}
      <div className="absolute left-[1131px] top-[301px] h-[161px] w-[185px]">
        <img alt="" className="block size-full max-w-none" src={`${A}/arrow-doodle.svg`} />
      </div>

      {/* Таблица аудита — настоящий DOM, 1:1 из Figma. */}
      <div className="absolute left-[46px] top-[455px] flex w-[1348px] flex-col text-[14px] text-[#121212]" style={{ fontFamily: "var(--font-body)" }}>
        {/* Quantity row */}
        <div className="flex h-[43px] w-full border border-black/10 bg-[#f3f3f3]">
          <div className="flex w-[135px] shrink-0 items-center justify-center border-r border-black/10 font-bold">Quantity</div>
          {QUANTITIES.map((q, i) => (
            <div key={i} className="flex flex-1 items-center justify-center border-r border-black/10 font-bold last:border-r-0">
              {q}
            </div>
          ))}
        </div>
        {/* Name row */}
        <div className="flex h-[45px] w-full border-x border-b border-black/10 bg-white">
          <div className="flex w-[135px] shrink-0 items-center justify-center border-r border-black/10 bg-[#edf7ff]">Name</div>
          {COLUMNS.map((c) => (
            <div key={c} className="flex flex-1 items-center justify-center border-r border-black/10 last:border-r-0">
              {c}
            </div>
          ))}
        </div>
        {/* Data rows */}
        {ROWS.map((row) => (
          <div key={row.label} className="flex h-[43px] w-full border-x border-b border-black/10 bg-white">
            <div className="flex w-[135px] shrink-0 items-center justify-center border-r border-black/10 bg-[#edf7ff]">{row.label}</div>
            {row.cells.map((cell, i) => (
              <div key={i} className="flex flex-1 items-center justify-center border-r border-black/10 last:border-r-0">
                <Cell cell={cell} />
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Итоговая строка + обводка-эллипс доодл вокруг неё (эллипс шире и
          начинается выше текста — не концентричны с текстовым блоком).
          Координаты сверены напрямую по Figma (node 2322:5170 / 1965:42546):
          эллипс раньше стоял на 48.76px ниже нужного (top 890.63 вместо
          841.87px) — из-за этого он не окружал текст как в макете и
          подрезался снизу секцией. Текст остаётся на месте (его абсолютная
          позиция 425.5/906 и так совпадала с Figma), только его top внутри
          обёртки пересчитан под новый top обёртки. */}
      <div className="absolute left-[415.3px] top-[841.87px] h-[220.53px] w-[621.4px]">
        <div className="absolute inset-[-1.74%_-0.49%]">
          <img alt="" className="block size-full max-w-none" src={`${A}/ellipse-doodle.svg`} />
        </div>
        <p className="absolute left-[10.2px] top-[64.13px] w-[589px] text-center font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px] text-[#121212] opacity-70">
          По итогам анализа был сформирован подробный план работ
        </p>
      </div>
    </div>
  );
}
