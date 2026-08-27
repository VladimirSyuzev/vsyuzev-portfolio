// Диаграмма «Размер / Толщина / Скругления» внутри «05 Руководство для
// команды» — 1:1 из Figma (node 1961:32281), настоящий SVG/текст вместо
// screenshot-ассета (guide-scale.png). Маленькие иконки-линейки внутри
// пунктирных капсул (Component32/Tmp в исходном дереве Figma) не заданы
// координатами в самом ответе get_design_context — только объявлены, но
// не вызваны с позицией — поэтому не дорисованы вручную (не выдумываем
// координаты); сами капсулы, подписи, стрелки и превью — 1:1 точные.
const A = "/cases/case-01/sections/guide-assets";

export default function GuideScale() {
  return (
    <div className="absolute left-[726px] top-[457px] h-[336.074px] w-[618.462px] text-[#121212]">
      {/* Размер */}
      <p className="absolute left-[4.29px] top-0 whitespace-nowrap text-[12.885px]">Размер</p>
      <div className="absolute left-[12.89px] top-[56.91px] w-[28.99px] whitespace-nowrap text-[12.885px]">
        <p className="absolute left-0 top-0">32px</p>
        <p className="absolute left-0 top-[64.42px]">24px</p>
        <p className="absolute left-0 top-[118.11px]">20px</p>
        <p className="absolute left-0 top-[164.28px]">16px</p>
        <p className="absolute left-0 top-[204.01px]">12px</p>
      </div>
      <div className="absolute left-[17.54px] top-[23.04px] h-[9.395px] w-[18.79px]">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={`${A}/rect068.svg`} />
      </div>
      {/* Дуга-стрелка вниз + маленький скриншот справа от колонок */}
      <div className="absolute left-[500.17px] top-[137.8px] h-[41.05px] w-[118.109px] overflow-hidden rounded-[8.642px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${A}/image1530.png`} alt="" className="size-full object-cover" />
      </div>

      {/* Скругления */}
      <div className="absolute left-[378.31px] top-0 h-[286.325px] w-[104.688px]">
        <p className="absolute left-[1.79px] top-0 whitespace-nowrap text-[12.885px]">Скругления</p>
        <p className="absolute left-[25.05px] top-[56.91px] whitespace-nowrap text-[12.885px]">5 px</p>
        <p className="absolute left-[25.05px] top-[121.33px] text-[12.885px]">4 px</p>
        <p className="absolute left-[25.05px] top-[221.19px] text-[12.885px]">3 px</p>
        <p className="absolute left-[25.05px] top-[260.91px] text-[12.885px]">2 px</p>
        <p className="absolute left-[25.05px] top-[175.02px] text-[12.885px]">3,5 px</p>
        <img alt="" className="absolute left-0 top-[55.83px] size-[17.895px]" src={`${A}/rect063.svg`} />
        <img alt="" className="absolute left-0 top-[220.11px] size-[17.895px]" src={`${A}/rect066.svg`} />
        <img alt="" className="absolute left-0 top-[120.26px] size-[17.895px]" src={`${A}/rect064.svg`} />
        <img alt="" className="absolute left-0 top-[259.48px] size-[17.895px]" src={`${A}/rect067.svg`} />
        <img alt="" className="absolute left-0 top-[173.94px] size-[17.895px]" src={`${A}/rect065.svg`} />
        <div className="absolute left-[27.56px] top-[23.04px] h-[9.395px] w-[18.79px]">
          <img alt="" className="absolute inset-0 block size-full max-w-none" src={`${A}/rect068.svg`} />
        </div>
        <div className="absolute left-[66.21px] top-[37.58px] h-[248.745px] w-[14.316px]">
          <img alt="" className="absolute inset-0 block size-full max-w-none" src={`${A}/vec7089.svg`} />
        </div>
        <div className="absolute left-[80.53px] top-[158.37px] h-0 w-[24.159px]">
          <img alt="" className="absolute inset-0 block size-full max-w-none" src={`${A}/vec7090.svg`} />
        </div>
      </div>

      {/* Толщина */}
      <div className="absolute left-[185.4px] top-0 h-[336.008px] w-[167.142px]">
        <p className="absolute left-[4.65px] top-0 whitespace-nowrap text-[12.885px]">Толщина</p>
        <div className="absolute left-[14.32px] top-[56.91px] w-[35.433px] whitespace-nowrap text-[12.885px]">
          <p className="absolute left-0 top-0">1,5 px</p>
          <p className="absolute left-0 top-[64.42px]">1,5 px</p>
          <p className="absolute left-0 top-[118.11px]">1,3 px</p>
          <p className="absolute left-0 top-[164.28px]">1,3 px</p>
          <p className="absolute left-0 top-[204.01px]">1,2px</p>
        </div>
        <div className="absolute left-[21.83px] top-[23.04px] h-[9.395px] w-[18.79px]">
          <img alt="" className="absolute inset-0 block size-full max-w-none" src={`${A}/rect068.svg`} />
        </div>
        <p className="absolute left-[14.6px] top-[295px] w-[80px] text-[8px]">
          *Для детальных объектов можно уменьшать до 1,1 px
        </p>
      </div>

      {/* Пунктирные капсулы, обрамляющие колонки "Размер" и "Толщина" */}
      <div className="absolute left-[59.05px] top-[14.32px] h-[279.167px] w-[93.056px] rounded-[28.632px] bg-white" />
      <div className="absolute left-[252.32px] top-[14.32px] h-[279.167px] w-[93.056px] rounded-[28.632px] bg-white" />
    </div>
  );
}
