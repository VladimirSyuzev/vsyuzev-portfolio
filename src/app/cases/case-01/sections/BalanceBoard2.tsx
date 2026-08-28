// Balance Board 2 (категории сервиса) — 1:1 из Figma (node 1961:32544),
// снято через get_design_context. 25 иконок в белых скруглённых карточках
// (в отличие от Board 1, где иконки лежат прямо на белом фоне — так и в
// самой Figma), абсолютное позиционирование как в исходнике.
//
// Та же поправка на масштаб, что и в BalanceBoard1.tsx: раскладка внутри
// рассчитана на канву 498×498, актуальный размер фрейма в Figma — 328×328
// (328/498≈0.6586), см. подробный комментарий там.
const SCALE = 328 / 498;
const B = "/cases/case-01/sections/balance-assets/b2";

const ITEMS: { left: number; top: number; src: string; alt: string; w?: number; h?: number }[] = [
  { left: 62.62, top: 64.14, src: "zhkh", alt: "ЖКХ" },
  { left: 140.35, top: 64.14, src: "apteki", alt: "Аптеки" },
  { left: 218.76, top: 64.14, src: "detskie", alt: "Детские магазины" },
  { left: 296.48, top: 64.14, src: "kanctovary", alt: "Канцтовары" },
  { left: 373.44, top: 64.14, src: "iskusstvo", alt: "Искусство" },
  { left: 62.62, top: 141.1, src: "karshering", alt: "Каршеринг" },
  { left: 140.35, top: 141.1, src: "kino", alt: "Кино" },
  { left: 218.76, top: 141.1, src: "knigi", alt: "Книги" },
  { left: 296.48, top: 141.1, src: "kosmetika", alt: "Косметика" },
  { left: 373.44, top: 141.1, src: "marketpleisy", alt: "Маркетплейсы" },
  { left: 62.62, top: 218.06, src: "taxi", alt: "Такси" },
  { left: 141.1, top: 218.06, src: "basketball", alt: "" },
  { left: 218.76, top: 218.06, src: "obrazovanie", alt: "Образование" },
  { left: 296.48, top: 218.06, src: "oplata-uslug", alt: "Оплата услуг" },
  { left: 373.44, top: 218.06, src: "suveniry", alt: "Сувениры" },
  { left: 62.62, top: 295.03, src: "uvelirnye", alt: "Ювелирные изделия и часы", w: 47.552 },
  { left: 140.35, top: 294.97, src: "procent", alt: "Процент на остаток" },
  { left: 218.01, top: 295.03, src: "elektronika", alt: "Электроника", w: 47.552 },
  { left: 295.72, top: 295.03, src: "cvety", alt: "Цветы", w: 47.552 },
  { left: 373.44, top: 295.03, src: "foto-video", alt: "Фото и видео" },
  { left: 63.38, top: 371.99, src: "fastfood", alt: "" },
  { left: 140.35, top: 371.93, src: "prochie-color", alt: "Прочие расходы" },
  { left: 218.76, top: 371.99, src: "real-estate", alt: "" },
  { left: 296.48, top: 371.99, src: "kafe", alt: "Кафе и рестораны" },
  { left: 373.44, top: 371.99, src: "pediatrics", alt: "" },
];

export default function BalanceBoard2() {
  return (
    <div className="relative size-[498px] bg-white" style={{ transform: `scale(${SCALE})`, transformOrigin: "top left" }}>
      {ITEMS.map((item) => (
        <div
          key={item.src}
          className="absolute flex flex-col items-start rounded-[15.091px] bg-white p-[7.545px]"
          style={{ left: item.left, top: item.top }}
        >
          <img alt={item.alt} src={`${B}/${item.src}.svg`} style={{ width: item.w ?? 46.797, height: item.h ?? 46.797 }} />
        </div>
      ))}
    </div>
  );
}
