// 07 Роль — 1:1 из Figma (node 1961:32604). Диаграмма шага 004 (корона в
// конструкторской сетке) теперь настоящий SVG (снят через get_design_context
// узла 2009:11438), раньше была одним screenshot-ассетом. Шаги 001-003 и
// подписи — настоящий текст с маленькими иконками (+/-).
const RA = "/cases/case-01/sections/role-assets";

const STEPS = [
  { icon: "role-plus.svg", number: "001", text: "Выбрали образ,\nизменяем его в сетке" },
  { icon: "role-plus.svg", number: "002", text: "Выбираем контур\nиз сетки для формата иконки" },
  { icon: "role-plus.svg", number: "003", text: "Помещаем в него образ, пока\nчто он не попадает в визуальный вес сетки" },
  { icon: "role-minus.svg", number: "004", text: "Размещаем объект в контуре,\nс компенсационными вылетами", image: true },
];

function CrownGridDiagram() {
  return (
    <div className="relative size-[328px] bg-white">
      <div className="absolute inset-[16.67%_8.33%]">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={`${RA}/vector-outline.svg`} />
      </div>
      <div className="absolute left-[27.33px] top-[54.67px] h-[102.5px] w-[136.667px]">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={`${RA}/vec-780.svg`} />
      </div>
      <div className="absolute left-[164px] top-[54.67px] flex h-[102.5px] w-[136.667px] items-center justify-center">
        <div className="-scale-y-100 rotate-180">
          <div className="relative h-[102.5px] w-[136.667px]">
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={`${RA}/vec-781.svg`} />
          </div>
        </div>
      </div>
      <div className="absolute left-[27.33px] top-[170.84px] h-[102.5px] w-[34.167px]">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={`${RA}/vec-782.svg`} />
      </div>
      <div className="absolute left-[259.67px] top-[164px] flex h-[102.5px] w-[34.167px] items-center justify-center">
        <div className="-scale-y-100 rotate-180">
          <div className="relative h-[102.5px] w-[34.167px]">
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={`${RA}/vec-783.svg`} />
          </div>
        </div>
      </div>
      <div className="absolute left-0 top-0 size-[328px]">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={`${RA}/grid.svg`} />
      </div>
      <div className="absolute inset-[10.42%_4.17%_16.26%_4.17%]">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={`${RA}/vector-outline2.svg`} />
      </div>
      <div className="absolute left-[21.37px] top-[44.31px] h-[102.612px] w-[284.208px] mix-blend-screen">
        <div className="absolute inset-[-13.32%_-4.81%]">
          <img alt="" className="block size-full max-w-none" src={`${RA}/crown-blend.svg`} />
        </div>
      </div>
    </div>
  );
}

export default function Role() {
  return (
    <div className="relative h-[916px] w-[1440px] overflow-clip bg-[#fafafa]">
      <div className="absolute left-[45px] top-[134px] flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
        <p className="text-[#008cff]">07</p>
        <p className="text-[#121212]">РОЛЬ</p>
      </div>

      <p className="absolute left-[46px] top-[181px] w-[494px] text-[14px] leading-[1.2] tracking-[0.28px] text-[#121212] opacity-70">
        Как арт-директор, я выстроил и контролировал процесс работы над проектом: проверял каждую
        иконку на промежуточных этапах, следил за консистентностью библиотеки и разработал
        производственный гайд, описывающий весь процесс: от поиска метафоры до сборки
        компонентов. Этот документ стал основой дальнейшей работы команды и позволил
        поддерживать единое качество на протяжении всего проекта.
      </p>

      <div className="absolute bottom-[146px] left-[46px] flex items-end justify-center gap-[12px]">
        {STEPS.map((step) => (
          <div key={step.number} className="flex w-[328px] flex-col gap-[24px]">
            {step.image && <CrownGridDiagram />}
            <div className="flex flex-col gap-[12px]">
              <div className="flex items-center gap-[16px]">
                <img alt="" className="size-[24px]" src={`/cases/case-01/sections/${step.icon}`} />
                <p className="text-[14px] font-medium tracking-[0.28px] text-[#121212]">{step.number}</p>
              </div>
              <p className="w-[215px] whitespace-pre-line text-[11px] leading-[1.2] tracking-[0.66px] text-[#121212] opacity-80">
                {step.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
