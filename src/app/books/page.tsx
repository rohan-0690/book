"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import SectionReveal from "@/components/SectionReveal";
import { books } from "@/lib/data";
import { BookOpen, ShoppingBag } from "lucide-react";

const categories = ["All", "Personal Growth", "Reinvention", "Wellness", "Creativity"];

export default function BooksPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredBook, setHoveredBook] = useState<number | null>(null);

  const filtered =
    activeCategory === "All"
      ? books
      : books.filter((b) => b.category === activeCategory);

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="bg-[#1e1010] pt-40 pb-28 px-6 relative overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=1800&q=70"
            alt=""
            fill
            className="object-cover opacity-20"
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#70090F]/15 via-[#1e1010]/65 to-[#1e1010]" />

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            className="flex items-center justify-center gap-3 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <span className="h-px w-8 bg-[#FFE9DF]/30" />
            <span className="text-xs tracking-widest uppercase text-[#FFE9DF]/60">
              Reading List
            </span>
            <span className="h-px w-8 bg-[#FFE9DF]/30" />
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl text-white leading-tight mb-6"
            style={{ fontFamily: "'TheSeasons', 'Georgia', serif" }}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            The Become.ing
            <br />
            <span className="italic text-[#FFE9DF]">Bookshelf</span>
          </motion.h1>

          <motion.p
            className="text-white/55 text-lg max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75, duration: 0.7 }}
          >
            Carefully selected books for every stage of your becoming.
          </motion.p>
        </div>
      </section>

      {/* ── FILTER BAR ───────────────────────────────────── */}
      <section className="bg-[#F8F6E7] py-8 px-6 border-b border-[#70090F]/10 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs tracking-widest uppercase px-4 py-2 transition-colors duration-200 ${
                activeCategory === cat
                  ? "bg-[#70090F] text-white"
                  : "bg-white text-[#2C2C2C] border border-[#70090F]/20 hover:border-[#70090F] hover:text-[#70090F]"
              }`}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              {cat}
            </motion.button>
          ))}
        </div>
      </section>

      {/* ── BOOKS GRID ───────────────────────────────────── */}
      <section className="bg-[#F8F6E7] py-16 px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          {/*
            IMPORTANT: No `layout` prop on the grid wrapper, no `popLayout`.
            AnimatePresence mode="wait" fades the whole grid on category change.
            This is the only approach that works reliably with CSS Grid in FM v12.
          */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              {filtered.map((book, i) => (
                <motion.div
                  key={book.id}
                  className="group flex flex-col cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.45,
                    delay: i * 0.055,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  onHoverStart={() => setHoveredBook(book.id)}
                  onHoverEnd={() => setHoveredBook(null)}
                >
                  {/* Book cover — lifts on hover */}
                  <motion.div
                    className="relative aspect-[3/4] overflow-hidden mb-4"
                    animate={{
                      y: hoveredBook === book.id ? -10 : 0,
                      boxShadow:
                        hoveredBook === book.id
                          ? "0 24px 48px rgba(112,9,15,0.22)"
                          : "0 4px 18px rgba(0,0,0,0.12)",
                    }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Image
                      src={book.cover}
                      alt={book.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 20vw"
                    />

                    {/* Burgundy overlay on hover */}
                    <AnimatePresence>
                      {hoveredBook === book.id && (
                        <motion.div
                          className="absolute inset-0 bg-[#70090F]/85 flex items-center justify-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.22 }}
                        >
                          <motion.a
                            href={book.amazonUrl}
                            className="flex items-center gap-2 bg-white text-[#70090F] text-xs tracking-widest uppercase px-4 py-2.5"
                            initial={{ y: 8, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.06 }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ShoppingBag size={13} /> Buy Now
                          </motion.a>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Text */}
                  <span className="text-xs tracking-widest uppercase text-[#70090F] mb-1">
                    {book.category}
                  </span>
                  <h3
                    className="text-base text-[#2C2C2C] leading-snug mb-1 group-hover:text-[#70090F] transition-colors duration-200"
                    style={{ fontFamily: "'TheSeasons', 'Georgia', serif" }}
                  >
                    {book.title}
                  </h3>
                  <p className="text-xs text-[#4A4A4A] mb-3">{book.author}</p>
                  <p className="text-xs text-[#4A4A4A] leading-relaxed mb-4 flex-1 line-clamp-3">
                    {book.description}
                  </p>

                  <motion.a
                    href={book.amazonUrl}
                    className="inline-flex items-center gap-1.5 text-xs tracking-widest uppercase text-[#70090F] border-b border-[#70090F]/40 pb-0.5 hover:border-[#70090F] transition-colors w-fit"
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <BookOpen size={12} /> Buy Now
                  </motion.a>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────── */}
      <section className="bg-[#70090F] py-20 px-6 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 50%, #FFE9DF, transparent 60%)",
          }}
        />
        <SectionReveal direction="none">
          <div className="max-w-2xl mx-auto text-center relative z-10">
            <h2
              className="text-3xl text-white mb-4"
              style={{ fontFamily: "'TheSeasons', 'Georgia', serif" }}
            >
              Have a book recommendation?
            </h2>
            <p className="text-white/65 mb-8">
              We love discovering new voices. Send us your favourite books about
              reinvention, creativity, and the art of becoming.
            </p>
            <motion.a
              href="mailto:books@become.ing"
              className="inline-block border border-white text-white text-sm tracking-widest uppercase px-8 py-3 hover:bg-white hover:text-[#70090F] transition-colors"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Recommend a Book
            </motion.a>
          </div>
        </SectionReveal>
      </section>
    </>
  );
}
