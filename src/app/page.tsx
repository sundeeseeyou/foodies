import HeroesImage from "../../components/HeroesImage";
import SectionFeatures from "../../components/SectionFeaturesLeft";

export default function Home() {
  return (
    <main className="flex flex-col justify-start gap-8 px-4 py-6 w-full max-w-screen-2xl mx-auto">
      <HeroesImage />
      <SectionFeatures></SectionFeatures>
    </main>
  );
}
