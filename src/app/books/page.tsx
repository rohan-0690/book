"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import SectionReveal from "@/components/SectionReveal";
import { books } from "@/lib/data";
import { BookOpen, ShoppingBag } from "lucide-react";

const C = { cr:"#8B0E18",crMd:"#A8192A",gold:"#D4A853",goldLt:"#EDD9A3",blush:"#F7EDE4",cream:"#FDFAF4",ink:"#1A0A0A",stone:"#7A5C52" };
const CATS = ["All","Personal Growth","Reinvention","Wellness","Creativity"];

export default function BooksPage() {
  const [cat, setCat]     = useState("All");
  const [hov, setHov]     = useState<number|null>(null);
  const filtered = cat==="All" ? books : books.filter(b=>b.category===cat);

  return (
    <>
      {/* HERO */}
      <section className="relative pt-36 sm:pt-40 pb-20 sm:pb-28 px-4 sm:px-6" style={{ background: C.ink, minHeight:"380px" }}>
        <div className="absolute inset-0 z-0">
          <Image src="https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=1800&q=70"
            alt="" fill className="object-cover" style={{ opacity:.18 }} sizes="100vw" priority />
        </div>
        <div className="absolute inset-0 z-10"
          style={{ background:"linear-gradient(to bottom,rgba(26,10,10,.6),rgba(26,10,10,.99))" }} />
        <div className="relative z-20 max-w-4xl mx-auto text-center">
          <motion.div className="flex items-center justify-center gap-3 mb-5"
            initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:.3 }}>
            <span className="h-px w-8" style={{ background:"rgba(212,168,83,.4)" }} />
            <span className="text-[10px] tracking-widest uppercase" style={{ color:"rgba(212,168,83,.7)" }}>Reading List</span>
            <span className="h-px w-8" style={{ background:"rgba(212,168,83,.4)" }} />
          </motion.div>
          <motion.h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-5"
            style={{ fontFamily:"'TheSeasons',Georgia,serif", color:"#ffffff" }}
            initial={{ opacity:0, y:28 }} animate={{ opacity:1, y:0 }}
            transition={{ delay:.4, duration:.85, ease:[.22,1,.36,1] }}>
            The Become.ing
            <br /><span className="italic" style={{ color: C.goldLt }}>Bookshelf</span>
          </motion.h1>
          <motion.p className="text-sm sm:text-lg max-w-xl mx-auto" style={{ color:"rgba(245,239,230,.52)" }}
            initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:.65 }}>
            Carefully selected books for every stage of your becoming.
          </motion.p>
        </div>
      </section>

      {/* FILTER */}
      <section className="py-5 sm:py-8 px-4 sm:px-6 sticky top-[72px] z-30"
        style={{ background: C.cream, borderBottom:`1px solid rgba(139,14,24,.1)` }}>
        <div className="max-w-7xl mx-auto flex flex-wrap gap-2 justify-center">
          {CATS.map(c=>(
            <motion.button key={c} onClick={()=>setCat(c)}
              className="text-[10px] sm:text-xs tracking-widest uppercase px-3 sm:px-4 py-2 transition-colors duration-200"
              style={ cat===c ? { background: C.cr, color:"#fff" } : { background:"#fff", color: C.ink, border:`1px solid rgba(139,14,24,.2)` }}
              whileHover={{ scale:1.04 }} whileTap={{ scale:.96 }}>{c}</motion.button>
          ))}
        </div>
      </section>

      {/* BOOKS GRID */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 pb-20 sm:pb-28" style={{ background: C.cream }}>
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div key={cat}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 sm:gap-8"
              initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-8 }}
              transition={{ duration:.35, ease:"easeOut" }}>
              {filtered.map((book,i)=>(
                <motion.div key={book.id} className="group flex flex-col cursor-pointer"
                  initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }}
                  transition={{ duration:.45, delay:i*.05, ease:[.22,1,.36,1] }}
                  onHoverStart={()=>setHov(book.id)} onHoverEnd={()=>setHov(null)}>
                  {/* Cover — fixed height */}
                  <motion.div className="relative w-full overflow-hidden mb-3 sm:mb-4" style={{ height: "220px" }}
                    animate={{ y: hov===book.id ? -10 : 0, boxShadow: hov===book.id ? "0 24px 48px rgba(139,14,24,.22)" : "0 4px 18px rgba(0,0,0,.1)" }}
                    transition={{ duration:.4, ease:[.22,1,.36,1] }}>
                    <Image src={book.cover} alt={book.title} fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width:640px) 50vw, 20vw" />
                    <AnimatePresence>
                      {hov===book.id && (
                        <motion.div className="absolute inset-0 flex items-center justify-center"
                          style={{ background:"rgba(139,14,24,.85)" }}
                          initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:.22 }}>
                          <motion.a href={book.amazonUrl}
                            className="flex items-center gap-2 text-xs tracking-widest uppercase px-4 py-2.5"
                            style={{ background:"#fff", color: C.cr }}
                            initial={{ y:8, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ delay:.06 }}
                            onClick={e=>e.stopPropagation()}>
                            <ShoppingBag size={13} /> Buy Now
                          </motion.a>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                  <span className="text-[10px] sm:text-xs tracking-widest uppercase mb-1" style={{ color: C.gold }}>{book.category}</span>
                  <h3 className="text-sm sm:text-base leading-snug mb-1 group-hover:opacity-75 transition-opacity"
                    style={{ fontFamily:"'TheSeasons',Georgia,serif", color: C.ink }}>{book.title}</h3>
                  <p className="text-xs mb-3" style={{ color: C.stone }}>{book.author}</p>
                  <p className="text-xs leading-relaxed mb-4 flex-1 line-clamp-3" style={{ color: C.stone }}>{book.description}</p>
                  <motion.a href={book.amazonUrl}
                    className="inline-flex items-center gap-1.5 text-xs tracking-widest uppercase pb-0.5 w-fit"
                    style={{ color: C.cr, borderBottom:`1px solid rgba(212,168,83,.4)` }}
                    whileHover={{ x:3 }} transition={{ type:"spring", stiffness:300 }}>
                    <BookOpen size={12} /> Buy Now
                  </motion.a>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 relative overflow-hidden"
        style={{ background:`linear-gradient(135deg,${C.ink},#2A1010 50%,${C.ink})` }}>
        <SectionReveal direction="none">
          <div className="max-w-2xl mx-auto text-center relative z-10">
            <h2 className="text-2xl sm:text-3xl text-white mb-4" style={{ fontFamily:"'TheSeasons',Georgia,serif" }}>Have a book recommendation?</h2>
            <p className="mb-8 text-sm sm:text-[15px]" style={{ color:"rgba(245,239,230,.55)" }}>
              We love discovering new voices. Send us your favourite books about reinvention, creativity, and the art of becoming.
            </p>
            <motion.a href="mailto:books@become.ing"
              className="inline-block text-white text-xs sm:text-sm tracking-widest uppercase px-7 sm:px-8 py-3 transition-colors"
              style={{ border:"1px solid rgba(212,168,83,.5)", color: C.goldLt }}
              whileHover={{ scale:1.04 }} whileTap={{ scale:.97 }}>
              Recommend a Book
            </motion.a>
          </div>
        </SectionReveal>
      </section>
    </>
  );
}
