"use client";
import Link from "next/link";
import { Mail } from "lucide-react";

const Ig = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>;
const Yt = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>;
const Li = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>;

const links = [
  { href: "/",           label: "Home" },
  { href: "/about",      label: "About" },
  { href: "/blogs",      label: "Blogs" },
  { href: "/podcast",    label: "Podcast & YouTube" },
  { href: "/books",      label: "Books" },
  { href: "/art",        label: "Art Collective" },
  { href: "/newsletter", label: "Newsletter" },
];

export default function Footer() {
  return (
    <footer style={{ background: "#2C2C2C", color: "#F8F6E7" }}>
      <div className="h-px" style={{ background: "linear-gradient(90deg,transparent,#70090F 30%,#70090F 70%,transparent)" }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-2xl sm:text-3xl mb-3" style={{ fontFamily: "'TheSeasons',Georgia,serif", color: "#FFE9DF" }}>Become.ing</h3>
            <div className="w-10 h-px mb-5" style={{ background: "linear-gradient(90deg,#70090F,transparent)" }} />
            <p className="text-xs leading-loose mb-6 max-w-xs font-light" style={{ color: "rgba(248,246,231,.5)", letterSpacing:"0.08em" }}>
              A thoughtful space for reflection, creativity, reinvention, and meaningful connection.
            </p>
            <div className="flex gap-3">
              {[
                { icon: <Ig />,            label: "Instagram" },
                { icon: <Yt />,            label: "YouTube" },
                { icon: <Li />,            label: "LinkedIn" },
                { icon: <Mail size={14} />, label: "Email", href: "mailto:hello@become.ing" },
              ].map(s => (
                <a key={s.label} href={s.href ?? "#"} aria-label={s.label}
                  className="w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300"
                  style={{ border: "1px solid rgba(255,233,223,.2)", color: "rgba(248,246,231,.45)" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#FFE9DF"; e.currentTarget.style.color = "#FFE9DF"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,233,223,.2)"; e.currentTarget.style.color = "rgba(248,246,231,.45)"; }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[10px] tracking-[.35em] mb-5" style={{ color: "#FFE9DF" }}>Quick Links</h4>
            <ul className="space-y-3">
              {links.map(l => (
                <li key={l.href}>
                  <Link href={l.href}
                    className="text-xs block transition-colors duration-200 font-light"
                    style={{ color: "rgba(248,246,231,.5)", letterSpacing:"0.1em" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#FFE9DF")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(248,246,231,.5)")}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] tracking-[.35em] mb-5" style={{ color: "#FFE9DF" }}>Contact</h4>
            <ul className="space-y-3">
              {["hello@become.ing", "Collaborations", "Art Inquiries", "Media & Press"].map(t => (
                <li key={t}>
                  <a href={t.includes("@") ? `mailto:${t}` : "#"}
                    className="text-xs block transition-colors duration-200 font-light"
                    style={{ color: "rgba(248,246,231,.5)", letterSpacing:"0.1em" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#FFE9DF")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(248,246,231,.5)")}>
                    {t}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-[10px] tracking-[.35em] mb-5" style={{ color: "#FFE9DF" }}>Stay Connected</h4>
            <p className="text-xs leading-loose mb-5 font-light" style={{ color: "rgba(248,246,231,.5)", letterSpacing:"0.08em" }}>
              Receive thoughtful reflections and updates in your inbox.
            </p>
            <Link href="/newsletter"
              className="inline-block text-white text-[10px] tracking-[.3em] px-5 py-3 transition-colors"
              style={{ background: "#70090F" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#560008")}
              onMouseLeave={e => (e.currentTarget.style.background = "#70090F")}>
              Subscribe
            </Link>
          </div>
        </div>

        <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-3"
          style={{ borderTop: "1px solid rgba(255,233,223,.1)" }}>
          <p className="text-[10px] tracking-[.15em] font-light" style={{ color: "rgba(248,246,231,.28)" }}>
            © {new Date().getFullYear()} Become.ing. All rights reserved.
          </p>
          <div className="flex gap-5" style={{ color: "rgba(248,246,231,.28)" }}>
            {["Privacy Policy", "Terms of Use"].map(t => (
              <a key={t} href="#"
                className="text-[10px] tracking-[.15em] transition-colors font-light"
                onMouseEnter={e => (e.currentTarget.style.color = "#FFE9DF")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(248,246,231,.28)")}>
                {t}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
