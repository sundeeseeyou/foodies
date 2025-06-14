import HeroesImage from "../../components/HeroesImage";
import SectionFeatures from "../../components/SectionFeaturesLeft";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center gap-8 py-16">
      <HeroesImage />
      <SectionFeatures></SectionFeatures>
      <SectionFeatures></SectionFeatures>
    </main>
  );
}
