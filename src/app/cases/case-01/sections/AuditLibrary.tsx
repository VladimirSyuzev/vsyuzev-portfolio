// 03 Аудит библиотеки — 1:1 из Figma (node 1965:42538). Таблица аудита —
// один screenshot-ассет (audit-table.png): плотная таблица чисел/чекбоксов
// без самостоятельного текстового значения вне картинки.
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

export default function AuditLibrary() {
  return (
    <div className="relative h-[898px] w-[1440px] overflow-clip bg-[#fafafa]">
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
          {FOUND_LEFT.map((item) => (
            <li key={item} className="flex items-center gap-[8px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
              <span className="size-[6px] shrink-0 rounded-full bg-[#008cff]" />
              {item}
            </li>
          ))}
        </ul>
        <ul className="flex w-[442.667px] flex-col gap-[6px]">
          {FOUND_RIGHT.map((item) => (
            <li key={item} className="flex items-center gap-[8px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
              <span className="size-[6px] shrink-0 rounded-full bg-[#008cff]" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/cases/case-01/sections/audit-table.png"
        alt="Таблица аудита библиотеки — 9 колонок сравнения по параметрам"
        width={1348}
        height={262}
        className="absolute left-[46px] top-[455px] w-[1348px]"
      />

      <p className="absolute left-[46px] top-[729px] w-[510px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
        По итогам анализа был сформирован подробный план работ.
      </p>
    </div>
  );
}
