import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-5"
      style={{ background:"#FDFAF4" }}>
      <div className="text-center">
        <p className="text-xs tracking-widest uppercase mb-3" style={{ color:"#D4A853" }}>404</p>
        <h1 className="text-7xl sm:text-8xl mb-4"
          style={{ fontFamily:"'TheSeasons',Georgia,serif", color:"#8B0E18" }}>Oops.</h1>
        <h2 className="text-2xl sm:text-3xl mb-4"
          style={{ fontFamily:"'TheSeasons',Georgia,serif", color:"#1A0A0A" }}>
          This page is still becoming.
        </h2>
        <p className="mb-8 text-sm sm:text-base max-w-sm mx-auto" style={{ color:"#7A5C52" }}>
          The page you are looking for doesn&apos;t exist — but your journey does.
        </p>
        <Link href="/" className="inline-block text-white text-xs sm:text-sm tracking-widest uppercase px-8 py-4"
          style={{ background:"linear-gradient(135deg,#8B0E18,#A8192A)" }}>
          Return Home
        </Link>
      </div>
    </div>
  );
}
