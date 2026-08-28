// 03 Визуальный язык — 1:1 из Figma (node 2236:94095). Тёмный блок →
// full-bleed: фон #121212 растянут на всю ширину экрана, контент — в
// центрированной 1440-сетке (см. правило тёмного фона). Фото (лазерная
// резка металла) — растр, окно 668×673 поверх изображения 1010×754.
export default function VisualLanguage() {
  return (
    <div className="w-full overflow-clip bg-[#121212]">
      <div className="relative mx-auto h-[898px] w-[1440px]">
        <div className="absolute left-[44px] top-[134px] flex items-center gap-[12px] whitespace-nowrap font-heading text-[32px] font-bold uppercase leading-[1.1] tracking-[0.96px]">
          <p className="text-[#008cff]">03</p>
          <p className="text-white">Визуальный язык</p>
        </div>

        <div className="absolute left-[44px] top-[181px] flex w-[498px] flex-col gap-[12px] text-[14px] leading-[1.2] tracking-[0.28px] text-white opacity-70">
          <p className="w-[443px]">
            Самой сложной задачей было найти простой принцип, который помогал бы команде понимать
            новый стиль.
          </p>
          <p>
            Лучшей метафорой оказалось сравнение с деталью, вырезанной из листа металла. Она
            помогала быстро проверять любые решения: если форму нельзя было представить вырезанной
            из цельного листа, значит, она выходила за рамки стиля.
          </p>
          <p>
            Этот подход изменил сам способ проектирования. Вместо того чтобы строить иконку из
            линий и контуров, мы начинали мыслить цельной формой, постепенно отсекая все лишнее.
          </p>
        </div>

        <div className="absolute left-[726px] top-[181px] h-[673px] w-[668px] overflow-clip">
          <img
            alt="Лазерная резка детали из листа металла"
            className="absolute left-[-193px] top-0 h-[754px] w-[1010px] max-w-none object-cover"
            src="/cases/case-02/sections/visual-photo.png"
          />
        </div>
      </div>
    </div>
  );
}
