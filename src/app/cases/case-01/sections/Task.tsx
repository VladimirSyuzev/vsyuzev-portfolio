// 02 Задача — 1:1 из Figma (node 1961:29100). Раздел показывает ~100
// иконок-примеров по 7 категориям (транспорт/недвижимость/финансы/etc.)
// как референс-каталог — оставлен единым screenshot-ассетом: это витрина
// иконок, а не текстовый контент, которому нужна DOM-структура.
export default function Task() {
  return (
    <div className="relative h-[1196px] w-[1440px] overflow-clip bg-[#fafafa]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/cases/case-01/sections/task.png"
        alt="02 Задача — каталог категорий иконок сервиса, требующих единого стиля"
        width={1440}
        height={1196}
        className="block w-full"
      />
    </div>
  );
}
