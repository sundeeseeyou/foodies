import MainFeatures from "@/components/homepage/MainFeatures";
import HeroesImage from "@/components/homepage/HeroesImage";
import SectionFeatures from "@/components/homepage/SectionFeaturesLeft";
import SectionFeaturesRight from "@/components/homepage/SectionFeatureRight";

export default function Home() {
  return (
    <main className="flex flex-col justify-start gap-8 px-4 py-6 w-full max-w-screen-2xl mx-auto">
      <HeroesImage />
      <MainFeatures></MainFeatures>
      <SectionFeatures></SectionFeatures>
      <SectionFeaturesRight></SectionFeaturesRight>
      <SectionFeatures></SectionFeatures>
    </main>
  );
}
