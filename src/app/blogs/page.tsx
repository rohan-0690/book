"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import SectionReveal from "@/components/SectionReveal";
import BlogCard from "@/components/BlogCard";
import { blogPosts, blogCategories } from "@/lib/data";
import { Search } from "lucide-react";

const C = { cr:"#8B0E18",gold:"#D4A853",blush:"#F7EDE4",cream:"#FDFAF4",ink:"#1A0A0A",stone:"#7A5C52" };

export default function BlogsPage() {
  const [cat, setCat]     = useState("All");
  const [q, setQ]         = useState("");
  const [page, setPage]   = useState(1);
  const PER = 6;
  const featuredPost = blogPosts.find(p=>p.featured);

  const filtered = blogPosts.filter(p => {
    const mc = cat==="All" || p.category===cat;
    const mq = p.title.toLowerCase().includes(q.toLowerCase()) || p.excerpt.toLowerCase().includes(q.toLowerCase());
    return mc && mq;
  });
  const totalPages = Math.ceil(filtered.length/PER);
  const paged = filtered.slice((page-1)*PER, page*PER);

  return (
    <>
      {/* HERO — z-index pattern */}
      <section className="relative pt-36 sm:pt-40 pb-20 sm:pb-24 px-4 sm:px-6" style={{ background: C.ink, minHeight:"360px" }}>
        <div className="absolute inset-0 z-0">
          <Image src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1800&q=70"
            alt="" fill className="object-cover" style={{ opacity:.18 }} sizes="100vw" />
        </div>
        <div className="absolute inset-0 z-10"
          style={{ background:"linear-gradient(to bottom,rgba(26,10,10,.6),rgba(26,10,10,.99))" }} />
        <div className="relative z-20 max-w-4xl mx-auto text-center">
          <motion.div className="flex items-center justify-center gap-3 mb-5"
            initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:.3 }}>
            <span className="h-px w-8" style={{ background:"rgba(212,168,83,.4)" }} />
            <span className="text-[10px] tracking-widest uppercase" style={{ color:"rgba(212,168,83,.7)" }}>The Journal</span>
            <span className="h-px w-8" style={{ background:"rgba(212,168,83,.4)" }} />
          </motion.div>
          <motion.h1 className="text-4xl sm:text-5xl md:text-6xl leading-tight mb-5"
            style={{ fontFamily:"'TheSeasons',Georgia,serif", color:"#ffffff" }}
            initial={{ opacity:0, y:28 }} animate={{ opacity:1, y:0 }}
            transition={{ delay:.4, duration:.85, ease:[.22,1,.36,1] }}>
            Stories &amp; Reflections
          </motion.h1>
          <motion.p className="text-sm sm:text-lg max-w-xl mx-auto"
            style={{ color:"rgba(245,239,230,.52)" }}
            initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:.65 }}>
            Thoughtful writing on midlife, creativity, wellness, relationships, and reinvention.
          </motion.p>
        </div>
      </section>

      {/* SEARCH + FILTER */}
      <section className="py-5 sm:py-8 px-4 sm:px-6 sticky top-[72px] z-30"
        style={{ background: C.cream, borderBottom:`1px solid rgba(139,14,24,.1)` }}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color:"rgba(139,14,24,.45)" }} />
            <input type="text" placeholder="Search articles..." value={q}
              onChange={e=>{ setQ(e.target.value); setPage(1); }}
              className="w-full text-sm pl-10 pr-4 py-3 focus:outline-none transition-colors"
              style={{ background:"#fff", border:"1px solid rgba(139,14,24,.18)", color: C.ink }}
              onFocus={e=>(e.target.style.borderColor=C.cr)} onBlur={e=>(e.target.style.borderColor="rgba(139,14,24,.18)")} />
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {blogCategories.map(c=>(
              <motion.button key={c} onClick={()=>{ setCat(c); setPage(1); }}
                className="text-[10px] sm:text-xs tracking-widest uppercase px-3 sm:px-4 py-2 transition-colors duration-200"
                style={ cat===c ? { background: C.cr, color:"#fff" } : { background:"#fff", color: C.ink, border:"1px solid rgba(139,14,24,.2)" }}
                whileHover={{ scale:1.04 }} whileTap={{ scale:.96 }}>{c}</motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      {featuredPost && cat==="All" && !q && (
        <section className="py-10 sm:py-12 px-4 sm:px-6" style={{ background: C.cream }}>
          <div className="max-w-7xl mx-auto">
            <SectionReveal><BlogCard post={featuredPost} featured /></SectionReveal>
          </div>
        </section>
      )}

      {/* GRID */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 pb-20 sm:pb-28" style={{ background: C.cream }}>
        <div className="max-w-7xl mx-auto">
          {paged.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12">
                {paged.map((p,i)=>(
                  <SectionReveal key={p.id} delay={i*60}><BlogCard post={p} /></SectionReveal>
                ))}
              </div>
              {totalPages > 1 && (
                <div className="flex justify-center gap-2">
                  {Array.from({length:totalPages},(_,i)=>i+1).map(pg=>(
                    <button key={pg} onClick={()=>setPage(pg)}
                      className="w-10 h-10 text-sm transition-colors"
                      style={ pg===page ? { background: C.cr, color:"#fff" } : { border:`1px solid rgba(139,14,24,.3)`, color: C.ink }}>
                      {pg}
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-lg" style={{ color: C.stone }}>No articles found. Try a different search or category.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
