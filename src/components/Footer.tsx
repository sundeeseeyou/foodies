export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <>
      <footer className="flex justify-between self-end w-full max-w-screen-xl mx-auto p-4 border-t-1 border-t-[#e4e4e4] ">
        <div>Copyright &copy; {year} Food Network. All Right Reserved.</div>
      </footer>
    </>
  );
}
