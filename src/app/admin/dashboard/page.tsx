"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { adminLogout, getBlogs, getPodcasts, getArtworks } from "@/lib/store";
import { BookOpen, Headphones, Palette, LogOut, ExternalLink, PenSquare } from "lucide-react";

const B = "#70090F", B2 = "#560008", BL = "#FFE9DF", IV = "#F8F6E7", CH = "#2C2C2C";

const sections = [
  {
    href:  "/admin/blogs",
    icon:  <PenSquare size={28} />,
    label: "Blogs",
    desc:  "Manage journal articles and stories",
    color: B,
  },
  {
    href:  "/admin/podcasts",
    icon:  <Headphones size={28} />,
    label: "Podcast",
    desc:  "Manage podcast and YouTube episodes",
    color: "#2C2C2C",
  },
  {
    href:  "/admin/art",
    icon:  <Palette size={28} />,
    label: "Art Collective",
    desc:  "Manage the gallery artworks",
    color: "#3D1F0D",
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const [counts, setCounts] = useState({ blogs: 0, podcasts: 0, artworks: 0 });

  useEffect(() => {
    Promise.all([getBlogs(), getPodcasts(), getArtworks()]).then(([blogs, podcasts, artworks]) => {
      setCounts({ blogs: blogs.length, podcasts: podcasts.length, artworks: artworks.length });
    });
  }, []);

  function handleLogout() {
    adminLogout();
    router.replace("/admin");
  }

  const statCards = [
    { label: "Total Blogs",    value: counts.blogs },
    { label: "Podcast Episodes", value: counts.podcasts },
    { label: "Artworks",       value: counts.artworks },
  ];

  return (
    <div className="min-h-screen" style={{ background: IV }}>
      {/* Top bar */}
      <header className="sticky top-0 z-40 h-[64px] flex items-center justify-between px-5 sm:px-8" style={{ background: CH, borderBottom: `2px solid ${B}` }}>
        <div className="flex items-center gap-3">
          <span className="text-xl" style={{ fontFamily: "'TheSeasons',Georgia,serif", color: BL, letterSpacing: "0.08em" }}>Become.ing</span>
          <span className="hidden sm:block text-[10px] tracking-[.3em]" style={{ color: "rgba(255,233,223,.4)" }}>/ Admin</span>
        </div>
        <div className="flex items-center gap-3 sm:gap-4">
          <Link href="/" target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 text-[10px] tracking-[.25em] transition-colors"
            style={{ color: "rgba(255,233,223,.55)" }}
            onMouseEnter={e => (e.currentTarget.style.color = BL)}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,233,223,.55)")}>
            <ExternalLink size={12} /> View Site
          </Link>
          <button onClick={handleLogout}
            className="inline-flex items-center gap-1.5 text-[10px] tracking-[.25em] px-4 py-2 transition-colors"
            style={{ border: `1px solid rgba(112,9,15,.5)`, color: BL }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = B; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}>
            <LogOut size={12} /> Logout
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Welcome */}
        <div className="mb-10 sm:mb-14">
          <p className="text-[10px] tracking-[.35em] mb-2" style={{ color: B }}>Welcome back</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl" style={{ fontFamily: "'TheSeasons',Georgia,serif", color: CH }}>
            Admin Dashboard
          </h1>
          <div className="w-12 h-px mt-4" style={{ background: `linear-gradient(90deg,${B},transparent)` }} />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 sm:gap-5 mb-10 sm:mb-14">
          {statCards.map(s => (
            <div key={s.label} className="p-5 sm:p-7" style={{ background: "#fff", borderTop: `3px solid ${B}` }}>
              <p className="text-3xl sm:text-4xl mb-1" style={{ fontFamily: "'TheSeasons',Georgia,serif", color: CH }}>{s.value}</p>
              <p className="text-[10px] tracking-[.25em]" style={{ color: "#4A4A4A" }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Section cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {sections.map(sec => (
            <Link key={sec.href} href={sec.href}
              className="group flex flex-col p-7 sm:p-8 transition-all duration-300"
              style={{ background: sec.color }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 48px rgba(0,0,0,.25)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = ""; }}>
              <span className="text-white mb-5 opacity-80">{sec.icon}</span>
              <h2 className="text-xl sm:text-2xl mb-2 text-white" style={{ fontFamily: "'TheSeasons',Georgia,serif" }}>{sec.label}</h2>
              <p className="text-xs leading-relaxed mb-6" style={{ color: "rgba(255,255,255,.6)", letterSpacing: "0.08em" }}>{sec.desc}</p>
              <span className="mt-auto inline-flex items-center gap-1.5 text-[10px] tracking-[.3em] text-white opacity-70 group-hover:opacity-100 transition-opacity">
                Manage →
              </span>
            </Link>
          ))}
        </div>

        {/* Quick links */}
        <div className="mt-10 sm:mt-14 pt-8 sm:pt-10" style={{ borderTop: "1px solid rgba(112,9,15,.12)" }}>
          <p className="text-[10px] tracking-[.3em] mb-5" style={{ color: "#4A4A4A" }}>Quick Links</p>
          <div className="flex flex-wrap gap-3">
            {[
              { href: "/blogs",   label: "View Blogs" },
              { href: "/podcast", label: "View Podcast" },
              { href: "/art",     label: "View Gallery" },
            ].map(l => (
              <Link key={l.href} href={l.href} target="_blank"
                className="inline-flex items-center gap-1.5 text-[10px] tracking-[.25em] px-4 py-2.5 transition-colors"
                style={{ border: `1px solid rgba(112,9,15,.25)`, color: "#4A4A4A" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = B; (e.currentTarget as HTMLElement).style.color = B; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(112,9,15,.25)"; (e.currentTarget as HTMLElement).style.color = "#4A4A4A"; }}>
                <ExternalLink size={11} /> {l.label}
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
