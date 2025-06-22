import SectionImage from "./SectionImage";
import SectionText from "./SectionText";

export default function SectionFeaturesLeft() {
  return (
    <section className="flex flex-col justify-center items-center w-full h-auto">
      <div className="flex flex-row justify-center items-center max-w-screen-xl min-h-64 gap-16 rounded-xl p-16">
        <SectionImage url="/assets/delivery.jpg" alt="delivery guy" />
        <SectionText>
          <h2>Hidup tak mau rugi</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Necessitatibus, quisquam, mollitia aliquam esse amet facilis, earum
            iusto non ratione natus aliquid harum fugit accusamus modi? Quae
            doloremque commodi asperiores pariatur!
          </p>
        </SectionText>
      </div>
    </section>
  );
}
