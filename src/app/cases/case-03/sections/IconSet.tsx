// C3-09 «Сет» — 1:1 из Figma (node 2022:15010). Сетка из 12 финальных
// 3D-иконок с подписями — цельная растровая композиция на всю ширину
// экрана (тёмный фон).
export default function IconSet() {
  return (
    <div className="w-full bg-[#121212]">
      <img
        alt="Сет из 12 3D-иконок Stablegate: Wallet, Bank, Gate, Onboarding, Fees, Coin, Security и др."
        className="block w-full"
        src="/cases/case-03/sections/set.jpg"
      />
    </div>
  );
}
