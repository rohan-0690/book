"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/",           label: "Home" },
  { href: "/about",      label: "About Us" },
  { href: "/blogs",      label: "Blogs" },
  { href: "/podcast",    label: "Podcast" },
  { href: "/books",      label: "Books" },
  { href: "/art",        label: "Art Collective" },
  { href: "/newsletter", label: "Newsletter" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const scrolledStyle = {
    background: "rgba(250,247,238,0.97)",
    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",
    boxShadow: "0 1px 0 rgba(201,169,110,0.22), 0 4px 24px rgba(28,20,16,0.06)",
  };

  return (
    <>
      <motion.header
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={scrolled ? scrolledStyle : { background: "transparent" }}
      >
        {/* Gold top accent */}
        <div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{ background: scrolled ? "linear-gradient(90deg,transparent,rgba(201,169,110,0.45),transparent)" : "linear-gradient(90deg,transparent,rgba(201,169,110,0.28),transparent)" }} />

        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 text-xl sm:text-2xl tracking-wide" style={{ fontFamily: "'TheSeasons','Georgia',serif" }}>
            <motion.span
              style={{ color: scrolled ? "#5C0511" : "#FAF7EE" }}
              whileHover={{ opacity: 0.75 }}
              transition={{ duration: 0.2 }}
            >
              Become.ing
            </motion.span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link, i) => {
              const active = pathname === link.href;
              return (
                <motion.li key={link.href}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.45 }}>
                  <Link href={link.href}
                    className="relative text-xs xl:text-sm tracking-wider uppercase group"
                    style={{ color: scrolled ? (active ? "#5C0511" : "#3A3028") : (active ? "#E8D5B0" : "rgba(250,247,238,0.75)") }}>
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 h-px transition-all duration-300 group-hover:w-full"
                      style={{ background: "#C9A96E", width: active ? "100%" : "0%" }} />
                  </Link>
                </motion.li>
              );
            })}
          </ul>

          {/* CTA (desktop) */}
          <motion.div className="hidden lg:block flex-shrink-0"
            initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.55, duration: 0.4 }}>
            <Link href="/newsletter"
              className="relative overflow-hidden group inline-block text-white text-xs tracking-widest uppercase px-5 py-2.5"
              style={{ background: "linear-gradient(135deg,#5C0511,#8B1A24)" }}>
              <span className="relative z-10">Join Community</span>
              <span className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                style={{ background: "#8B1A24" }} />
            </Link>
          </motion.div>

          {/* Mobile burger */}
          <motion.button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 -mr-1 flex-shrink-0"
            style={{ color: scrolled ? "#5C0511" : "#FAF7EE" }}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            whileTap={{ scale: 0.88 }}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={menuOpen ? "x" : "m"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}>
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </nav>
      </motion.header>

      {/* Mobile menu — full-screen overlay, sits below nav */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 lg:hidden"
              style={{ background: "rgba(28,20,16,0.55)", backdropFilter: "blur(4px)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMenuOpen(false)}
            />
            {/* Drawer */}
            <motion.div
              className="fixed top-[72px] left-0 right-0 z-50 lg:hidden overflow-y-auto"
              style={{
                background: "#FAF7EE",
                maxHeight: "calc(100dvh - 72px)",
                borderTop: "1px solid rgba(201,169,110,0.25)",
                boxShadow: "0 8px 32px rgba(28,20,16,0.15)",
              }}
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <ul className="px-5 py-4 flex flex-col">
                {navLinks.map((link, i) => (
                  <motion.li key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.045, duration: 0.28 }}>
                    <Link href={link.href}
                      className="flex items-center justify-between py-3.5 text-sm tracking-wider uppercase transition-colors"
                      style={{
                        color: pathname === link.href ? "#5C0511" : "#3A3028",
                        borderBottom: "1px solid rgba(201,169,110,0.18)",
                        fontWeight: pathname === link.href ? "500" : "400",
                      }}>
                      {link.label}
                      {pathname === link.href && (
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#C9A96E" }} />
                      )}
                    </Link>
                  </motion.li>
                ))}
                <motion.li className="mt-4 mb-2"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
                  <Link href="/newsletter"
                    className="block text-white text-center text-sm tracking-widest uppercase py-3.5 transition-colors"
                    style={{ background: "linear-gradient(135deg,#5C0511,#8B1A24)" }}>
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
