import HeroesImage from "../../components/HeroesImage";
import SectionImageText from "../../components/SectionImageText";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center gap-8 py-16">
      <HeroesImage />
      <SectionImageText></SectionImageText>
    </main>
  );
}
