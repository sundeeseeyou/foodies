import Link from "next/link";

export default function CommunityPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-auto gap-16 px-4 py-16 sm:p-20">
      <h1 className="text-8xl">Community</h1>
      <Link href="../">Back</Link>
    </main>
  );
}
