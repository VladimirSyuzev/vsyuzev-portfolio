// Balance Board 1 (медицинские иконки) — 1:1 из Figma (node 1961:32486),
// снято через get_design_context. 25 иконок, абсолютное позиционирование
// как в исходнике (пара строк с неровным шагом — так и в самой Figma).
//
// Раскладка внутри рассчитана на канву 498×498 (как было при первом снятии
// координат), но актуальный размер фрейма в Figma сейчас 328×328 (сверено
// повторным запросом — либо изменилось в макете, либо неточно снято тогда).
// Пересчитывать вручную ~25 иконок рискованно — вместо этого масштабируем
// всё содержимое целиком (328/498≈0.6586): сверено по внутреннему фрейму
// сетки — при таком масштабе он ложится ровно на новые координаты
// (41.25/39.26, 245.5×248.98) с точностью до 0.01px.
const SCALE = 328 / 498;
const B = "/cases/case-01/sections/balance-assets/b1";

export default function BalanceBoard1() {
  return (
    <div className="relative size-[498px] bg-white" style={{ transform: `scale(${SCALE})`, transformOrigin: "top left" }}>
      <div className="absolute left-[62.63px] top-[59.61px] h-[378.026px] w-[372.744px]">
        {/* row top=0 */}
        <div className="absolute left-0 top-0 flex items-center gap-[15.845px]">
          <div className="flex w-[61.873px] flex-col items-start p-[7.545px]">
            <img alt="" className="size-[46.782px]" src={`${B}/surgical1.svg`} />
          </div>
          <div className="flex w-[61.873px] flex-col items-start p-[7.545px]">
            <div className="relative size-[46.782px]">
              <img alt="" className="absolute left-[5.86px] top-[1.96px] h-[42.856px] w-[35.086px]" src={`${B}/medical-service.svg`} />
            </div>
          </div>
          <div className="flex w-[61.873px] flex-col items-start p-[7.545px]">
            <img alt="" className="size-[46.782px]" src={`${B}/ophthalmology.svg`} />
          </div>
          <div className="flex w-[61.873px] flex-col items-start p-[7.545px]">
            <img alt="" className="size-[46.782px]" src={`${B}/pulmonology.svg`} />
          </div>
          <div className="flex w-[61.873px] flex-col items-start p-[7.545px]">
            <img alt="" className="size-[46.782px]" src={`${B}/medicine1.svg`} />
          </div>
        </div>
        {/* row top=77.72 */}
        <div className="absolute left-0 top-[77.72px] flex items-center gap-[15.845px]">
          <div className="flex w-[61.873px] flex-col items-start p-[7.545px]">
            <div className="relative size-[46.782px] overflow-clip">
              <div className="absolute inset-[8.33%_8.06%_8.08%_8.33%] flex items-center justify-center">
                <div className="size-full -scale-x-100">
                  <img alt="" className="size-full" src={`${B}/search-inner.svg`} />
                </div>
              </div>
              <img alt="" className="absolute left-[14.15px] top-[14.17px] size-[7.797px]" src={`${B}/service-mark.svg`} />
            </div>
          </div>
          <div className="flex w-[61.873px] flex-col items-start p-[7.545px]">
            <img alt="" className="size-[46.782px]" src={`${B}/analises.svg`} />
          </div>
          <div className="flex w-[61.873px] flex-col items-start p-[7.545px]">
            <img alt="" className="size-[46.782px]" src={`${B}/reflector-icon.svg`} />
          </div>
          <div className="flex w-[61.873px] flex-col items-start p-[7.545px]">
            <img alt="" className="size-[46.782px]" src={`${B}/fracture-clinic.svg`} />
          </div>
          <div className="flex w-[61.873px] flex-col items-start p-[7.545px]">
            <img alt="" className="size-[46.782px]" src={`${B}/medicine-container.svg`} />
          </div>
        </div>
        {/* row top=155.44 */}
        <div className="absolute left-0 top-[155.44px] flex items-center gap-[15.845px]">
          <div className="flex w-[61.873px] flex-col items-start p-[7.545px]">
            <img alt="" className="h-[35.69px] w-[38.985px]" src={`${B}/skin-layer.svg`} />
          </div>
          <div className="flex w-[61.873px] flex-col items-start p-[7.545px]">
            <img alt="" className="size-[46.782px]" src={`${B}/gastroenterology.svg`} />
          </div>
          <div className="flex w-[61.873px] flex-col items-start p-[7.545px]">
            <img alt="" className="size-[46.782px]" src={`${B}/injection.svg`} />
          </div>
          <div className="flex w-[61.873px] flex-col items-start p-[7.545px]">
            <img alt="" className="size-[46.782px]" src={`${B}/dialysis.svg`} />
          </div>
          <div className="flex w-[61.873px] flex-col items-start p-[7.545px]">
            <img alt="" className="size-[46.782px]" src={`${B}/medicine.svg`} />
          </div>
        </div>
        {/* row top=233.16 */}
        <div className="absolute left-0 top-[233.16px] flex items-center gap-[15.845px]">
          <div className="flex w-[61.873px] flex-col items-start p-[7.545px]">
            <img alt="" className="size-[46.782px]" src={`${B}/infectology.svg`} />
          </div>
          <div className="flex w-[61.873px] flex-col items-start p-[7.545px]">
            <img alt="" className="size-[46.782px]" src={`${B}/stomatology.svg`} />
          </div>
          <div className="flex w-[61.873px] flex-col items-start p-[7.545px]">
            <img alt="" className="size-[46.782px]" src={`${B}/surgical2.svg`} />
          </div>
          <div className="flex w-[61.873px] flex-col items-start p-[7.545px]">
            <img alt="" className="size-[46.782px]" src={`${B}/ultrasonography.svg`} />
          </div>
          <div className="flex w-[61.873px] flex-col items-start p-[7.545px]">
            <img alt="" className="size-[46.782px]" src={`${B}/dna.svg`} />
          </div>
        </div>
        {/* row top=316.15 */}
        <div className="absolute left-0 top-[316.15px] flex items-center gap-[15.845px]">
          <div className="flex w-[61.873px] flex-col items-start p-[7.545px]">
            <img alt="" className="size-[46.782px]" src={`${B}/psychology.svg`} />
          </div>
          <div className="flex w-[61.873px] flex-col items-start p-[7.545px]">
            <img alt="" className="size-[46.782px]" src={`${B}/cosmetology-tmp.svg`} />
          </div>
          <div className="flex w-[61.873px] flex-col items-start p-[7.545px]">
            <img alt="" className="size-[46.782px]" src={`${B}/therapy.svg`} />
          </div>
          <div className="flex w-[61.873px] flex-col items-start p-[7.545px]">
            <img alt="" className="size-[46.782px]" src={`${B}/fracture-clinic1.svg`} />
          </div>
          <div className="flex w-[61.873px] flex-col items-start p-[7.545px]">
            <div className="flex h-[44.279px] w-[44.399px] rotate-180 items-center justify-center">
              <img alt="" className="size-full" src={`${B}/neurology.svg`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
