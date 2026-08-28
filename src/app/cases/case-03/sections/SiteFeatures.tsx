// C3-02 «Секция сайта» — 1:1 из Figma (node 2022:14474). Плотный мокап
// секции сайта Stablegate (белая карточка + 4 карточки-фичи с 3D) —
// единый растровый ассет (см. FIGMA-BRIEF §5).
export default function SiteFeatures() {
  return (
    <div className="relative h-[940px] w-[1440px] overflow-clip bg-[#fafafa]">
      <img
        alt="Секция сайта Stablegate: Financial infrastructure built for modern businesses"
        className="absolute inset-0 block size-full"
        src="/cases/case-03/sections/site-features.jpg"
      />
    </div>
  );
}
