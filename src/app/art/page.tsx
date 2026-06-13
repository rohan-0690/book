"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { artworks } from "@/lib/data";
import { X, MessageCircle, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";

const C = { cr:"#8B0E18",crMd:"#A8192A",gold:"#D4A853",goldLt:"#EDD9A3",cream:"#FDFAF4",ink:"#1A0A0A",stone:"#7A5C52" };
const artists = ["All",...Array.from(new Set(artworks.map(a=>a.artist)))];
const PB = [133,100,120,110,133,100,120,133,100]; // paddingBottom %

export default function ArtPage() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<typeof artworks[0]|null>(null);
  const [hovId, setHovId]   = useState<number|null>(null);

  const filtered = filter==="All" ? artworks : artworks.filter(a=>a.artist===filter);
  const idx = selected ? filtered.findIndex(a=>a.id===selected.id) : -1;
  const goPrev = () => idx>0 && setSelected(filtered[idx-1]);
  const goNext = () => idx<filtered.length-1 && setSelected(filtered[idx+1]);

  const waUrl = selected
    ? `https://wa.me/?text=${encodeURIComponent(`Hello, I would like to enquire about the artwork "${selected.title}" by ${selected.artist}.`)}`
    : "#";

  return (
    <>
      {/* HERO */}
      <section className="relative pt-36 sm:pt-40 pb-20 sm:pb-28 px-4 sm:px-6" style={{ background: C.ink, minHeight:"380px" }}>
        <div className="absolute inset-0 z-0">
          <Image src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1800&q=70"
            alt="" fill className="object-cover" style={{ opacity:.18 }} sizes="100vw" priority />
        </div>
        <div className="absolute inset-0 z-10"
          style={{ background:"linear-gradient(to bottom,rgba(26,10,10,.35),rgba(26,10,10,.97))" }} />
        <div className="relative z-20 max-w-4xl mx-auto text-center">
          <motion.div className="flex items-center justify-center gap-3 mb-5"
            initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:.3 }}>
            <span className="h-px w-8" style={{ background:"rgba(212,168,83,.4)" }} />
            <span className="text-[10px] tracking-widest uppercase" style={{ color:"rgba(212,168,83,.7)" }}>Art Collective</span>
            <span className="h-px w-8" style={{ background:"rgba(212,168,83,.4)" }} />
          </motion.div>
          <motion.h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-5"
            style={{ fontFamily:"'TheSeasons',Georgia,serif" }}
            initial={{ opacity:0, y:28 }} animate={{ opacity:1, y:0 }}
            transition={{ delay:.4, duration:.85, ease:[.22,1,.36,1] }}>
            Become.ing
            <br /><span className="italic" style={{ color: C.goldLt }}>Art Collective</span>
          </motion.h1>
          <motion.p className="text-sm sm:text-lg max-w-xl mx-auto" style={{ color:"rgba(245,239,230,.52)" }}
            initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:.65 }}>
            Original works by women artists exploring identity, transformation, and the art of becoming.
          </motion.p>
        </div>
      </section>

      {/* FILTER */}
      <section className="py-5 sm:py-8 px-4 sm:px-6 sticky top-[72px] z-30"
        style={{ background: C.cream, borderBottom:`1px solid rgba(139,14,24,.1)` }}>
        <div className="max-w-7xl mx-auto flex flex-wrap gap-2 justify-center">
          {artists.map(a=>(
            <motion.button key={a} onClick={()=>setFilter(a)}
              className="text-[10px] sm:text-xs tracking-widest uppercase px-3 sm:px-4 py-2 transition-colors duration-200"
              style={ filter===a ? { background: C.cr, color:"#fff" } : { background:"#fff", color: C.ink, border:`1px solid rgba(139,14,24,.2)` }}
              whileHover={{ scale:1.04 }} whileTap={{ scale:.96 }}>{a}</motion.button>
          ))}
        </div>
      </section>

      {/* MASONRY — paddingBottom on every card */}
      <section className="py-10 sm:py-16 px-3 sm:px-6 pb-20 sm:pb-28" style={{ background: C.cream }}>
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div key={filter} className="masonry-grid"
              initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:.28 }}>
              {filtered.map((art,i)=>(
                <motion.div key={art.id} className="masonry-item"
                  initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
                  transition={{ duration:.5, delay:(i%6)*.07, ease:[.22,1,.36,1] }}>
                  {/* paddingBottom establishes height — Image sits absolute */}
                  <div className="relative w-full overflow-hidden cursor-pointer group"
                    style={{ paddingBottom:`${PB[i%PB.length]}%` }}
                    onClick={()=>setSelected(art)}
                    onMouseEnter={()=>setHovId(art.id)}
                    onMouseLeave={()=>setHovId(null)}>
                    <Image src={art.image} alt={art.title} fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw" />
                    {/* gold border */}
                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ border:"1px solid rgba(212,168,83,.55)" }} />
                    <AnimatePresence>
                      {hovId===art.id && (
                        <motion.div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4"
                          style={{ background:"linear-gradient(180deg,rgba(139,14,24,.75) 0%,rgba(26,10,10,.9) 100%)" }}
                          initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:.22 }}>
                          <motion.div initial={{ y:8, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ delay:.04 }}>
                            <ZoomIn size={24} className="text-white mb-1" />
                          </motion.div>
                          <motion.p className="text-white text-center text-base sm:text-lg leading-tight"
                            style={{ fontFamily:"'TheSeasons',Georgia,serif" }}
                            initial={{ y:8, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ delay:.09 }}>
                            {art.title}
                          </motion.p>
                          <motion.p className="text-center text-xs sm:text-sm" style={{ color:"rgba(212,168,83,.85)" }}
                            initial={{ y:8, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ delay:.13 }}>
                            {art.artist} · {art.medium}
                          </motion.p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {selected && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:.28 }}
            onClick={()=>setSelected(null)}>
            <div className="absolute inset-0" style={{ background:"rgba(26,10,10,.93)", backdropFilter:"blur(6px)" }} />
            <motion.div className="relative w-full max-w-4xl flex flex-col md:flex-row overflow-hidden shadow-2xl"
              style={{ background: C.cream, maxHeight:"92dvh" }}
              initial={{ scale:.93, y:20, opacity:0 }} animate={{ scale:1, y:0, opacity:1 }} exit={{ scale:.93, y:20, opacity:0 }}
              transition={{ duration:.38, ease:[.22,1,.36,1] }}
              onClick={e=>e.stopPropagation()}>
              {/* Close */}
              <motion.button onClick={()=>setSelected(null)}
                className="absolute top-3 right-3 z-20 w-9 h-9 flex items-center justify-center text-white transition-colors"
                style={{ background: C.ink }} whileHover={{ scale:1.1, rotate:90 }} whileTap={{ scale:.9 }}>
                <X size={15} />
              </motion.button>
              {/* Prev */}
              {idx>0 && (
                <motion.button onClick={e=>{ e.stopPropagation(); goPrev(); }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center text-white"
                  style={{ background:"rgba(0,0,0,.4)" }} whileHover={{ scale:1.1 }} whileTap={{ scale:.9 }}>
                  <ChevronLeft size={18} />
                </motion.button>
              )}
              {/* Next */}
              {idx<filtered.length-1 && (
                <motion.button onClick={e=>{ e.stopPropagation(); goNext(); }}
                  className="absolute z-20 w-9 h-9 items-center justify-center text-white hidden md:flex"
                  style={{ background:"rgba(0,0,0,.4)", right:"calc(320px + 8px)", top:"50%", transform:"translateY(-50%)" }}
                  whileHover={{ scale:1.1 }} whileTap={{ scale:.9 }}>
                  <ChevronRight size={18} />
                </motion.button>
              )}
              {/* Image */}
              <AnimatePresence mode="wait">
                <motion.div key={`img-${selected.id}`}
                  className="relative w-full overflow-hidden flex-shrink-0" style={{ paddingBottom:"75%" }}
                  initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:.3 }}>
                  <Image src={selected.image} alt={selected.title} fill className="object-cover"
                    sizes="(max-width:768px) 100vw, 60vw" />
                </motion.div>
              </AnimatePresence>
              {/* Info */}
              <AnimatePresence mode="wait">
                <motion.div key={`info-${selected.id}`}
                  className="flex flex-col justify-between p-6 sm:p-8 overflow-y-auto flex-shrink-0"
                  style={{ width:"100%", maxWidth:"320px" }}
                  initial={{ opacity:0, x:10 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0 }} transition={{ duration:.3, delay:.05 }}>
                  <div>
                    <span className="text-[10px] sm:text-xs tracking-widest uppercase block mb-3" style={{ color: C.gold }}>{selected.medium}</span>
                    <h2 className="text-2xl sm:text-3xl mb-2 leading-tight" style={{ fontFamily:"'TheSeasons',Georgia,serif", color: C.ink }}>{selected.title}</h2>
                    <p className="text-sm mb-1" style={{ color: C.cr }}>{selected.artist}</p>
                    <p className="text-xs mb-5" style={{ color: C.stone }}>{selected.width}</p>
                    <p className="text-sm leading-relaxed" style={{ color: C.stone }}>{selected.description}</p>
                  </div>
                  <motion.a href={waUrl} target="_blank" rel="noopener noreferrer"
                    className="mt-6 sm:mt-8 flex items-center justify-center gap-2 text-white text-xs sm:text-sm tracking-widest uppercase px-5 py-3.5 sm:py-4 transition-colors"
                    style={{ background:`linear-gradient(135deg,${C.cr},${C.crMd})` }}
                    whileHover={{ scale:1.02 }} whileTap={{ scale:.97 }}>
                    <MessageCircle size={15} /> Enquire on WhatsApp
                  </motion.a>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
