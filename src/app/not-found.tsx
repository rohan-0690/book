import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-5"
      style={{ background:"#F8F6E7" }}>
      <div className="text-center">
        <p className="text-xs tracking-widest uppercase mb-3" style={{ color:"#70090F" }}>404</p>
        <h1 className="text-7xl sm:text-8xl mb-4"
          style={{ fontFamily:"'TheSeasons',Georgia,serif", color:"#70090F" }}>Oops.</h1>
        <h2 className="text-2xl sm:text-3xl mb-4"
          style={{ fontFamily:"'TheSeasons',Georgia,serif", color:"#2C1810" }}>
          This page is still becoming.
        </h2>
        <p className="mb-8 text-sm sm:text-base max-w-sm mx-auto" style={{ color:"#8B6F6A" }}>
          The page you are looking for doesn&apos;t exist — but your journey does.
        </p>
        <Link href="/" className="inline-block text-white text-xs sm:text-sm tracking-widest uppercase px-8 py-4"
          style={{ background:"linear-gradient(135deg,#70090F,#560008)" }}>
          Return Home
        </Link>
      </div>
    </div>
  );
}
