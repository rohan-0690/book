import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F8F6E7] flex items-center justify-center px-6">
      <div className="text-center">
        <h1
          className="text-8xl text-[#70090F] mb-4"
          style={{ fontFamily: "'TheSeasons', 'Georgia', serif" }}
        >
          404
        </h1>
        <h2
          className="text-3xl text-[#2C2C2C] mb-4"
          style={{ fontFamily: "'TheSeasons', 'Georgia', serif" }}
        >
          This page is still becoming.
        </h2>
        <p className="text-[#4A4A4A] mb-8">
          The page you are looking for does not exist — but your journey does.
        </p>
        <Link
          href="/"
          className="inline-block bg-[#70090F] text-white text-sm tracking-widest uppercase px-8 py-4 hover:bg-[#560008] transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
