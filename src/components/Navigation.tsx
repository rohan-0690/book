"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/",           label: "Home" },
  { href: "/about",      label: "About" },
  { href: "/blogs",      label: "Blogs" },
  { href: "/podcast",    label: "Podcast" },
  { href: "/books",      label: "Books" },
  { href: "/art",        label: "Art Collective" },
  { href: "/newsletter", label: "Newsletter" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: .7, ease: [.22,1,.36,1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={scrolled
          ? { background: "rgba(253,250,244,.97)", backdropFilter: "blur(18px)", boxShadow: "0 1px 0 rgba(212,168,83,.2), 0 4px 24px rgba(26,10,10,.06)" }
          : { background: "transparent" }
        }
      >
        {/* Gold top line */}
        <div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{ background: "linear-gradient(90deg,transparent,rgba(212,168,83,.45),transparent)" }} />

        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0 text-xl sm:text-2xl tracking-wide"
            style={{ fontFamily: "'TheSeasons',Georgia,serif", color: scrolled ? "#8B0E18" : "#F5EFE6" }}>
            Become.ing
          </Link>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link, i) => {
              const active = pathname === link.href;
              return (
                <motion.li key={link.href}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: .08 + i * .06 }}>
                  <Link href={link.href}
                    className="relative text-xs xl:text-sm tracking-wider uppercase group transition-colors duration-200"
                    style={{ color: scrolled ? (active ? "#8B0E18" : "#2D1F1A") : (active ? "#EDD9A3" : "rgba(245,239,230,.75)") }}>
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 h-px transition-all duration-300 group-hover:w-full"
                      style={{ background: "#D4A853", width: active ? "100%" : "0%" }} />
                  </Link>
                </motion.li>
              );
            })}
          </ul>

          {/* CTA */}
          <motion.div className="hidden lg:block flex-shrink-0"
            initial={{ opacity: 0, scale: .92 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .55 }}>
            <Link href="/newsletter"
              className="relative overflow-hidden group inline-block text-white text-xs tracking-widest uppercase px-5 py-2.5 transition-colors"
              style={{ background: "linear-gradient(135deg,#8B0E18,#A8192A)" }}>
              <span className="relative z-10">Join Community</span>
              <span className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                style={{ background: "#A8192A" }} />
            </Link>
          </motion.div>

          {/* Burger */}
          <motion.button onClick={() => setOpen(!open)}
            className="lg:hidden p-2 -mr-1 flex-shrink-0"
            style={{ color: scrolled ? "#8B0E18" : "#F5EFE6" }}
            aria-label={open ? "Close menu" : "Open menu"}
            whileTap={{ scale: .88 }}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={open ? "x" : "m"}
                initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: .18 }}>
                {open ? <X size={22} /> : <Menu size={22} />}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </nav>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div className="fixed inset-0 z-40 lg:hidden"
              style={{ background: "rgba(26,10,10,.6)", backdropFilter: "blur(4px)" }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)} />

            <motion.div
              className="fixed top-[72px] left-0 right-0 z-50 lg:hidden overflow-y-auto"
              style={{ background: "#FDFAF4", maxHeight: "calc(100dvh - 72px)", borderTop: "1px solid rgba(212,168,83,.25)", boxShadow: "0 8px 32px rgba(26,10,10,.15)" }}
              initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
              transition={{ duration: .32, ease: [.22,1,.36,1] }}>
              <ul className="px-5 py-4 flex flex-col">
                {navLinks.map((link, i) => (
                  <motion.li key={link.href}
                    initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * .04 }}>
                    <Link href={link.href}
                      className="flex items-center justify-between py-3.5 text-sm tracking-wider uppercase transition-colors"
                      style={{ color: pathname === link.href ? "#8B0E18" : "#2D1F1A", borderBottom: "1px solid rgba(212,168,83,.18)" }}>
                      {link.label}
                      {pathname === link.href && <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#D4A853" }} />}
                    </Link>
                  </motion.li>
                ))}
                <motion.li className="mt-4 mb-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .32 }}>
                  <Link href="/newsletter"
                    className="block text-white text-center text-sm tracking-widest uppercase py-3.5"
                    style={{ background: "linear-gradient(135deg,#8B0E18,#A8192A)" }}>
                    Join Community
                  </Link>
                </motion.li>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
