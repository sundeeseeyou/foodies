export default function SectionText({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col items-stretch w-[100%] h-auto">
      {children}
    </div>
  );
}
