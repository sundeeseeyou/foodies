export default function SectionText({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="w-[100%] h-auto">{children}</div>;
}
