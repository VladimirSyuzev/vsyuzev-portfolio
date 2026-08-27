import StatsRows from "./StatsRows";

// С1-02 Stats — занимает весь экран (min-h-screen), цифры статистики по
// центру блока по вертикали и горизонтали. Фон — 6 рядов иконок из
// stats-bg.svg (три сверху / три снизу от текста), каждый ряд плавно и
// независимо покачивается влево-вправо (StatsRows).
const STATS = [
  { value: "1.5", label: "недели на аудит\nбиблиотеки" },
  { value: "226", label: "иконок\nпроверено" },
  { value: "65", label: "готовых\nиконок" },
  { value: "161", label: "иконоку нужно\nбыло создать" },
  { value: "194", label: "варианта\nразмера иконок" },
  { value: "150+", label: "иконок\nсоздано и обновлено" },
];

const TOP_ROWS_Y = [15, 160, 305];
const BOTTOM_ROWS_Y = [600, 745, 890];

export default function Stats() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center gap-[36px] overflow-hidden bg-[#fc3f1d] py-[36px]">
      <StatsRows nativeYs={TOP_ROWS_Y} />

      <div className="relative z-10 mx-auto w-[1440px] shrink-0 pl-[216px]">
        <div className="flex w-[1008px] text-white">
          {STATS.map((stat) => (
            <div key={stat.value} className="flex w-[170px] flex-col items-start gap-[8px]">
              <p className="whitespace-nowrap font-heading text-[52px] font-bold">{stat.value}</p>
              <p className="whitespace-pre-line text-[14px] leading-[1.2] tracking-[0.28px]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <StatsRows nativeYs={BOTTOM_ROWS_Y} />
    </div>
  );
}
