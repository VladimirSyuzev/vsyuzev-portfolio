// 01 Задача — 1:1 из Figma (node 2079:17694). Текст + 4 буллита-требования
// с синими галочками. Ряд маркетинговых мокапов справа/внизу — плотная
// растровая композиция (единый ассет).
const A = "/cases/case-03/sections";

const REQS: [string, string][] = [
  ["Сохранять", "визуальную целостность"],
  ["Масштабироваться", "в маркетинговых материалах"],
  ["Объяснять", "особенности продукта"],
  ["Использоваться", "на любом фоне"],
];

function Req({ head, sub }: { head: string; sub: string }) {
  return (
    <div className="flex gap-[8px]">
      <img alt="" className="h-[38px] w-[28px] shrink-0" src={`${A}/task-check.svg`} />
      <p className="whitespace-pre-line pt-[4px] text-[14px] font-medium uppercase leading-[1.2] tracking-[0.28px] text-[#121212]">
        {head}
        {"\n"}
        {sub}
      </p>
    </div>
  );
}

export default function Task() {
  return (
    <div className="relative h-[900px] w-[1440px] overflow-clip bg-[#fafafa]">
      <div className="absolute left-[46px] top-[134px] flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
        <p className="text-[#008cff]">01</p>
        <p className="text-[#121212]">Задача</p>
      </div>

      <p className="absolute left-[46px] top-[181px] w-[498px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
        Задачей было создать не просто красивые иллюстрации, а систему, которая помогает объяснять
        функциональность продукта. Композиции должны были считываться без текста, работать на
        светлом и тёмном фоне и легко адаптироваться для разных форматов — от презентаций до
        соцсетей. При этом важно было сохранить баланс между технологичностью крипто-продукта и
        доверием к современному финансовому сервису.
      </p>

      <div className="absolute left-[726px] top-[181px] flex gap-[12px]">
        <div className="flex w-[328px] flex-col gap-[12px]">
          <Req head={REQS[0][0]} sub={REQS[0][1]} />
          <Req head={REQS[1][0]} sub={REQS[1][1]} />
        </div>
        <div className="flex w-[224px] flex-col gap-[12px]">
          <Req head={REQS[2][0]} sub={REQS[2][1]} />
          <Req head={REQS[3][0]} sub={REQS[3][1]} />
        </div>
      </div>

      <img
        alt="Иллюстрации Stablegate в разных маркетинговых форматах: баннеры, посты, презентации"
        className="absolute left-[139px] top-[387px] h-[399px] w-[1508px] max-w-none"
        src={`${A}/task-materials.jpg`}
      />
    </div>
  );
}
