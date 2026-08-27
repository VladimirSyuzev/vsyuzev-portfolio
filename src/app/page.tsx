import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import CasesList from "@/components/CasesList";
import Footer from "@/components/Footer";

// Канвас 1440px по центру — макет в Figma существует только в десктопной
// ширине (1440), мобильной версии не было предоставлено, поэтому
// адаптация не придумывается — см. FIGMA-BRIEF.md, "Недостающее".
export default function Home() {
  return (
    <div className="mx-auto flex w-[1440px] flex-col items-start" id="top">
      <Header />
      <Hero />
      <About />
      <CasesList />
      <Footer />
    </div>
  );
}
