"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/blogs", label: "Blogs" },
  { href: "/podcast", label: "Podcast & YouTube" },
  { href: "/books", label: "Books" },
  { href: "/art", label: "Art Collective" },
  { href: "/newsletter", label: "Newsletter" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#F8F6E7]/95 backdrop-blur-md shadow-sm border-b border-[#70090F]/10"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl tracking-wide"
          style={{ fontFamily: "'TheSeasons', 'Georgia', serif" }}
        >
          <motion.span
            className={`transition-colors duration-300 ${scrolled ? "text-[#70090F]" : "text-white"}`}
            whileHover={{ opacity: 0.75 }}
          >
            Become.ing
          </motion.span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.li
              key={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.07, duration: 0.5, ease: "easeOut" }}
            >
              <Link
                href={link.href}
                className={`relative text-sm tracking-wider uppercase transition-colors duration-200 group ${
                  scrolled ? "hover:text-[#70090F]" : "hover:text-[#FFE9DF]"
                } ${
                  pathname === link.href
                    ? scrolled ? "text-[#70090F]" : "text-[#FFE9DF]"
                    : scrolled ? "text-[#2C2C2C]" : "text-white/80"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px bg-[#70090F] transition-all duration-300 ${
                    pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            </motion.li>
          ))}
        </ul>

        {/* CTA */}
        <motion.div
          className="hidden lg:block"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <Link
            href="/newsletter"
            className="relative overflow-hidden group bg-[#70090F] text-white text-sm tracking-widest uppercase px-6 py-3 inline-block"
          >
            <span className="relative z-10 transition-colors duration-300">Join Community</span>
            <span className="absolute inset-0 bg-[#560008] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </Link>
        </motion.div>

        {/* Mobile Toggle */}
        <motion.button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`lg:hidden p-2 transition-colors ${scrolled ? "text-[#70090F]" : "text-white"}`}
          aria-label="Toggle menu"
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={menuOpen ? "close" : "open"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden bg-[#F8F6E7] border-t border-[#70090F]/10"
          >
            <ul className="flex flex-col px-6 py-6 gap-1">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    className={`block text-base tracking-wider uppercase py-3 transition-colors duration-200 hover:text-[#70090F] border-b border-[#70090F]/10 ${
                      pathname === link.href ? "text-[#70090F]" : "text-[#2C2C2C]"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
              <motion.li
                className="mt-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Link
                  href="/newsletter"
                  className="block bg-[#70090F] text-white text-center text-sm tracking-widest uppercase px-6 py-3 hover:bg-[#560008] transition-colors"
                >
                  Join Community
                </Link>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
