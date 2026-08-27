// 07 Роль — 1:1 из Figma (node 1961:32604). Диаграмма шага 004 (корона в
// конструкторской сетке) — один screenshot-ассет; шаги 001-003 и подписи
// — настоящий текст с маленькими иконками (+/-).
const STEPS = [
  { icon: "role-plus.svg", number: "001", text: "Выбрали образ,\nизменяем его в сетке" },
  { icon: "role-plus.svg", number: "002", text: "Выбираем контур\nиз сетки для формата иконки" },
  { icon: "role-plus.svg", number: "003", text: "Помещаем в него образ, пока\nчто он не попадает в визуальный вес сетки" },
  { icon: "role-minus.svg", number: "004", text: "Размещаем объект в контуре,\nс компенсационными вылетами", image: true },
];

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
        производственный гайд, описывающий весь процесс — от поиска метафоры до сборки
        компонентов. Этот документ стал основой дальнейшей работы команды и позволил
        поддерживать единое качество на протяжении всего проекта.
      </p>

      <div className="absolute bottom-[146px] left-[46px] flex items-end justify-center gap-[12px]">
        {STEPS.map((step) => (
          <div key={step.number} className="flex w-[328px] flex-col gap-[24px]">
            {step.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="/cases/case-01/sections/role-crown-grid.png"
                alt="Финальное размещение объекта в конструкторской сетке с компенсационными вылетами"
                width={328}
                height={328}
                className="size-[328px] bg-white"
              />
            )}
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
