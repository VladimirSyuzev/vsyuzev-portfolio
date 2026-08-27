import StatsIcons from "./StatsIcons";

// С1-02 Stats — занимает весь экран (min-h-screen), цифры статистики по
// центру блока по вертикали и горизонтали. Фон — stats-icons.svg (8 рядов
// иконок), пропорционально увеличенный до высоты блока целиком (StatsIcons):
// каждый ряд едет от края до края контейнера и обратно, без повтора/тайлинга
// картинки, со своей случайной скоростью/фазой — ряды не синхронизированы.
const STATS = [
  { value: "1.5", label: "недели на аудит\nбиблиотеки" },
  { value: "226", label: "иконок\nпроверено" },
  { value: "65", label: "готовых\nиконок" },
  { value: "161", label: "иконоку нужно\nбыло создать" },
  { value: "194", label: "варианта\nразмера иконок" },
  { value: "150+", label: "иконок\nсоздано и обновлено" },
];

export default function Stats() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#fc3f1d]">
      <StatsIcons />

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
    </div>
  );
}
