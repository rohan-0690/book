"use client";
import Link from "next/link";
import { Mail } from "lucide-react";

const Ig = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>;
const Yt = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>;
const Li = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>;

const links = [
  { href:"/",label:"Home" },{ href:"/about",label:"About Us" },{ href:"/blogs",label:"Blogs" },
  { href:"/podcast",label:"Podcast & YouTube" },{ href:"/books",label:"Books" },
  { href:"/art",label:"Art Collective" },{ href:"/newsletter",label:"Newsletter" },
];

export default function Footer() {
  const dim = "rgba(245,239,230,.42)";
  const hover = (e: React.MouseEvent<HTMLElement>, c: string) => (e.currentTarget.style.color = c);
  const blur  = (e: React.MouseEvent<HTMLElement>) => (e.currentTarget.style.color = dim);

  return (
    <footer style={{ background: "#1A0A0A", color: "#F5EFE6" }}>
      <div className="h-px" style={{ background: "linear-gradient(90deg,transparent,#D4A853 30%,#D4A853 70%,transparent)" }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-2xl sm:text-3xl mb-3" style={{ fontFamily:"'TheSeasons',Georgia,serif", color:"#EDD9A3" }}>Become.ing</h3>
            <div className="w-10 h-px mb-5" style={{ background:"linear-gradient(90deg,#D4A853,transparent)" }} />
            <p className="text-sm leading-relaxed mb-6 max-w-xs" style={{ color: dim }}>
              A thoughtful space for reflection, creativity, reinvention, and meaningful connection.
            </p>
            <div className="flex gap-3">
              {[{ icon:<Ig/>,label:"Instagram" },{ icon:<Yt/>,label:"YouTube" },{ icon:<Li/>,label:"LinkedIn" },{ icon:<Mail size={14}/>,label:"Email",href:"mailto:hello@become.ing" }].map(s=>(
                <a key={s.label} href={s.href??"#"} aria-label={s.label}
                  className="w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300"
                  style={{ border:"1px solid rgba(212,168,83,.22)", color: dim }}
                  onMouseEnter={e=>{hover(e,"#D4A853");e.currentTarget.style.borderColor="#D4A853"}}
                  onMouseLeave={e=>{blur(e);e.currentTarget.style.borderColor="rgba(212,168,83,.22)"}}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs tracking-widest uppercase mb-5" style={{ color:"#D4A853" }}>Quick Links</h4>
            <ul className="space-y-3">
              {links.map(l=>(
                <li key={l.href}>
                  <Link href={l.href} className="text-sm block transition-colors duration-200" style={{ color: dim }}
                    onMouseEnter={e=>hover(e,"#EDD9A3")} onMouseLeave={e=>blur(e)}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs tracking-widest uppercase mb-5" style={{ color:"#D4A853" }}>Contact</h4>
            <ul className="space-y-3 text-sm">
              {["hello@become.ing","Collaborations","Art Inquiries","Media & Press"].map(t=>(
                <li key={t}>
                  <a href={t.includes("@")?`mailto:${t}`:"#"} className="block transition-colors duration-200" style={{ color: dim }}
                    onMouseEnter={e=>hover(e,"#EDD9A3")} onMouseLeave={e=>blur(e)}>{t}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs tracking-widest uppercase mb-5" style={{ color:"#D4A853" }}>Stay Connected</h4>
            <p className="text-sm mb-5" style={{ color: dim }}>Receive thoughtful reflections and updates in your inbox.</p>
            <Link href="/newsletter" className="inline-block text-white text-xs tracking-widest uppercase px-5 py-3 transition-all duration-300"
              style={{ background:"linear-gradient(135deg,#8B0E18,#A8192A)" }}
              onMouseEnter={e=>(e.currentTarget.style.background="#A8192A")}
              onMouseLeave={e=>(e.currentTarget.style.background="linear-gradient(135deg,#8B0E18,#A8192A)")}>
              Subscribe
            </Link>
          </div>
        </div>

        <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-3"
          style={{ borderTop:"1px solid rgba(212,168,83,.13)" }}>
          <p className="text-xs" style={{ color:"rgba(245,239,230,.28)" }}>© {new Date().getFullYear()} Become.ing. All rights reserved.</p>
          <div className="flex gap-5 text-xs" style={{ color:"rgba(245,239,230,.28)" }}>
            {["Privacy Policy","Terms of Use"].map(t=>(
              <a key={t} href="#" className="transition-colors duration-200"
                onMouseEnter={e=>(e.currentTarget.style.color="#D4A853")}
                onMouseLeave={e=>(e.currentTarget.style.color="rgba(245,239,230,.28)")}>{t}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
