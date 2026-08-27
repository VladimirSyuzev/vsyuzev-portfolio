// Иконки-«таблетки» кейса 001 — 1:1 из Figma (get_design_context,
// node 2287:4138..4176, тизер на главной). Композиция: фоновое фото
// cover.png, поверх — чёрная панель с decorative ellipse и сеткой 4×4
// стеклянных иконок (одна — акцентная красная, Thumbs Up).
const ICONS = [
  { name: "Alisa", src: "/cases/case-01/icon-alisa.svg" },
  { name: "Gas", src: "/cases/case-01/icon-gas.svg" },
  { name: "Cosmetics", src: "/cases/case-01/icon-cosmetics.svg" },
  { name: "Taxi", src: "/cases/case-01/icon-taxi.svg" },
  { name: "Credits", src: "/cases/case-01/icon-credits.svg" },
  { name: "Moto", src: "/cases/case-01/icon-moto.svg" },
  { name: "Cinema", src: "/cases/case-01/icon-cinema.svg" },
  { name: "Wallet", src: "/cases/case-01/icon-wallet.svg" },
  { name: "Fastfood", src: "/cases/case-01/icon-fastfood.svg" },
  { name: "Thumbs Up", src: "/cases/case-01/icon-thumbsup.svg", accent: true },
  { name: "Medical Analysis", src: "/cases/case-01/icon-medical.svg" },
  { name: "Deposit", src: "/cases/case-01/icon-deposit.svg" },
  { name: "Restaurants", src: "/cases/case-01/icon-restaurants.svg" },
  { name: "New building", src: "/cases/case-01/icon-newbuilding.svg" },
  { name: "Books", src: "/cases/case-01/icon-books.svg" },
  { name: "Kids", src: "/cases/case-01/icon-kids.svg" },
];

export default function Case01IconGrid({ className }: { className?: string }) {
  return (
    <div className={className ?? "relative h-[536px] w-[668px] overflow-clip bg-[rgba(18,18,18,0.7)]"}>
      <div className="absolute left-[-84px] top-0 h-[536px] w-[962px]">
        <img alt="" src="/cases/case-01/cover.png" className="absolute inset-0 size-full object-cover" />
      </div>
      <div className="absolute left-[-296.03px] top-0 h-[535.984px] w-[1260.06px] overflow-clip bg-black">
        <div className="absolute left-[-558.14px] top-[-648.87px] size-[1198.904px]">
          <div className="absolute inset-[-27.93%]">
            <img alt="" className="block size-full max-w-none" src="/cases/case-01/ellipse.svg" />
          </div>
        </div>
        <div className="absolute left-[396.46px] top-[34.46px] size-[467.99px]">
          <div className="absolute left-[125.46px] top-[250.68px] size-[92.232px] rounded-[12.404px] bg-[#fc3f1d]" />
          <div
            className="absolute left-[7.18px] top-[7.18px] grid grid-cols-4 grid-rows-4"
            style={{ gap: "47.07426452636719px" }}
          >
            {ICONS.map((icon) => (
              <div key={icon.name} className="relative size-[78.211px] shrink-0">
                <img alt={icon.name} className="absolute inset-0 block size-full max-w-none" src={icon.src} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
