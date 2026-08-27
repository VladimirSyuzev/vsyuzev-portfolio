// С1-02 Stats — 1:1 из Figma (get_design_context, node 1961:28637).
// Фоновая стена decorative-иконок (сотня мелких повторяющихся глифов) —
// один screenshot-ассет (stats-bg.png), не по одной иконке DOM-ом (это
// текстура, а не контент); цифры статистики — настоящий текст.
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
    <div className="relative h-[900px] w-[1440px] overflow-clip bg-[#fc3f1d]">
      <img alt="" className="absolute left-0 top-0 h-[900px] w-[1440px] object-cover opacity-90" src="/cases/case-01/sections/stats-bg.png" />
      <div className="absolute left-[216px] top-1/2 flex w-[1008px] -translate-y-1/2 text-white">
        {STATS.map((stat) => (
          <div key={stat.value} className="flex w-[170px] flex-col items-start gap-[8px]">
            <p className="whitespace-nowrap font-heading text-[52px] font-bold">{stat.value}</p>
            <p className="whitespace-pre-line text-[14px] leading-[1.2] tracking-[0.28px]">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
