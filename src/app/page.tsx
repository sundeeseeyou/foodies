import MainFeatures from "@/components/MainFeatures";
import HeroesImage from "../components/HeroesImage";
import SectionFeatures from "../components/SectionFeaturesLeft";
import SectionFeaturesRight from "@/components/SectionFeatureRight";

export default function Home() {
  return (
    <main className="flex flex-col justify-start gap-8 px-4 py-6 w-full max-w-screen-xl mx-auto">
      <HeroesImage />
      <MainFeatures></MainFeatures>
      <SectionFeatures></SectionFeatures>
      <SectionFeaturesRight></SectionFeaturesRight>
    </main>
  );
}
