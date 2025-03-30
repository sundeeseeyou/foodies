import SectionImage from "./SectionImage";
import SectionText from "./SectionText";

export default function SectionFeaturesLeft() {
  return (
    <section className="flex flex-col justify-center items-center w-full h-auto">
      <div className="flex flex-row justify-center items-center w-[1440px] min-h-64 gap-16 rounded-xl p-16">
        <SectionImage url="/assets/delivery.jpg" alt="delivery guy" />
        <SectionText>
          <h2>Hidup tak mau rugi</h2>
          <p>Hello</p>
        </SectionText>
      </div>
    </section>
  );
}
