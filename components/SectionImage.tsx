import Image from "next/image";

interface imagetype {
  url: string;
  alt: string;
}
export default function SectionImage({ url, alt }: imagetype) {
  return (
    <>
      <Image
        src={url}
        alt={alt}
        width={500}
        height={0}
        className="w-[100%] object-contain min-w-64 rounded-4xl"
        priority
      />
    </>
  );
}
