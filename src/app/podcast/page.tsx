"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import SectionReveal from "@/components/SectionReveal";
import { podcastEpisodes } from "@/lib/data";
import { Play, Headphones, Search } from "lucide-react";

const C = { cr:"#8B0E18",crMd:"#A8192A",gold:"#D4A853",goldLt:"#EDD9A3",blush:"#F7EDE4",cream:"#FDFAF4",ink:"#1A0A0A",stone:"#7A5C52" };
const YtIcon = ({size=14}:{size?:number}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
  </svg>
);

export default function PodcastPage() {
  const [q, setQ] = useState("");
  const filtered = podcastEpisodes.filter(ep =>
    ep.title.toLowerCase().includes(q.toLowerCase()) || ep.description.toLowerCase().includes(q.toLowerCase())
  );
  const featured = filtered.find(ep=>ep.featured);
  const rest = featured ? filtered.filter(ep=>!ep.featured) : filtered;

  return (
    <>
      {/* HERO — z-index fixed */}
      <section className="relative pt-36 sm:pt-40 pb-20 sm:pb-28 px-4 sm:px-6" style={{ background: C.ink, minHeight:"380px" }}>
        <div className="absolute inset-0 z-0">
          <Image src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=1800&q=70"
            alt="" fill className="object-cover" style={{ opacity:.22 }} sizes="100vw" priority />
        </div>
        <div className="absolute inset-0 z-10"
          style={{ background:"linear-gradient(to bottom,rgba(26,10,10,.35),rgba(26,10,10,.97))" }} />
        {/* gold accent line */}
        <div className="absolute top-0 left-0 right-0 z-20 h-px"
          style={{ background:"linear-gradient(90deg,transparent,rgba(212,168,83,.5),transparent)" }} />
        <div className="relative z-20 max-w-4xl mx-auto text-center">
          <motion.div className="flex items-center justify-center gap-3 mb-5"
            initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:.3 }}>
            <span className="h-px w-8" style={{ background:"rgba(212,168,83,.4)" }} />
            <span className="text-[10px] tracking-widest uppercase" style={{ color:"rgba(212,168,83,.7)" }}>Media</span>
            <span className="h-px w-8" style={{ background:"rgba(212,168,83,.4)" }} />
          </motion.div>
          <motion.h1 className="text-4xl sm:text-5xl md:text-6xl text-white leading-tight mb-5"
            style={{ fontFamily:"'TheSeasons',Georgia,serif" }}
            initial={{ opacity:0, y:28 }} animate={{ opacity:1, y:0 }}
            transition={{ delay:.4, duration:.85, ease:[.22,1,.36,1] }}>
            Podcast &amp; YouTube
          </motion.h1>
          <motion.p className="text-sm sm:text-lg max-w-xl mx-auto mb-8 sm:mb-10" style={{ color:"rgba(245,239,230,.52)" }}
            initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:.65 }}>
            Conversations about midlife, reinvention, creativity, and the art of becoming.
          </motion.p>
          <motion.div className="flex flex-wrap gap-3 justify-center"
            initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay:.8 }}>
            {[{l:"Spotify",i:<Headphones size={15}/>},{l:"Apple Podcasts",i:<Headphones size={15}/>},{l:"YouTube",i:<YtIcon size={15}/>}].map(p=>(
              <a key={p.l} href="#"
                className="inline-flex items-center gap-2 text-xs tracking-widest uppercase px-4 sm:px-5 py-2.5 sm:py-3 transition-all duration-200"
                style={{ border:"1px solid rgba(212,168,83,.35)", color:"rgba(245,239,230,.7)" }}
                onMouseEnter={e=>{ e.currentTarget.style.borderColor=C.gold; e.currentTarget.style.color=C.goldLt; }}
                onMouseLeave={e=>{ e.currentTarget.style.borderColor="rgba(212,168,83,.35)"; e.currentTarget.style.color="rgba(245,239,230,.7)"; }}>
                {p.i} {p.l}
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SEARCH */}
      <section className="py-5 sm:py-7 px-4 sm:px-6 sticky top-[72px] z-30"
        style={{ background: C.cream, borderBottom:`1px solid rgba(139,14,24,.1)` }}>
        <div className="max-w-7xl mx-auto">
          <div className="relative max-w-md">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color:"rgba(139,14,24,.45)" }} />
            <input type="text" placeholder="Search episodes..." value={q}
              onChange={e=>setQ(e.target.value)}
              className="w-full text-sm pl-10 pr-4 py-3 focus:outline-none transition-colors"
              style={{ background:"#fff", border:`1px solid rgba(139,14,24,.18)`, color: C.ink }}
              onFocus={e=>(e.target.style.borderColor=C.cr)} onBlur={e=>(e.target.style.borderColor="rgba(139,14,24,.18)")} />
          </div>
        </div>
      </section>

      {/* FEATURED EPISODE */}
      {featured && (
        <section className="py-12 sm:py-16 px-4 sm:px-6" style={{ background: C.blush }}>
          <div className="max-w-7xl mx-auto">
            <SectionReveal>
              <span className="text-xs tracking-widest uppercase block mb-6" style={{ color: C.gold }}>Latest Episode</span>
              <div className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden shadow-lg" style={{ background: C.cream }}>
                {/* paddingBottom image */}
                <div className="relative w-full overflow-hidden" style={{ paddingBottom:"66.67%" }}>
                  <Image src={featured.image} alt={featured.title} fill className="object-cover"
                    sizes="(max-width:1024px) 100vw, 50vw" />
                  <div className="absolute inset-0 flex items-center justify-center"
                    style={{ background:"rgba(26,10,10,.32)" }}>
                    <motion.div className="relative w-16 sm:w-20 h-16 sm:h-20 rounded-full flex items-center justify-center cursor-pointer shadow-2xl"
                      style={{ background:`linear-gradient(135deg,${C.cr},${C.crMd})` }}
                      whileHover={{ scale:1.12 }} whileTap={{ scale:.95 }}>
                      <motion.span className="absolute w-16 sm:w-20 h-16 sm:h-20 rounded-full"
                        style={{ border:"2px solid rgba(212,168,83,.55)" }}
                        animate={{ scale:[1,1.65], opacity:[.55,0] }}
                        transition={{ duration:1.8, repeat:Infinity, ease:"easeOut" }} />
                      <Play size={22} className="text-white ml-1" />
                    </motion.div>
                  </div>
                  <div className="absolute top-3 left-3 text-white text-[10px] sm:text-xs tracking-widest uppercase px-2.5 sm:px-3 py-1"
                    style={{ background:`linear-gradient(135deg,${C.cr},${C.crMd})` }}>
                    Episode {featured.episode}
                  </div>
                </div>
                <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
                  <span className="text-xs tracking-widest uppercase mb-3 sm:mb-4" style={{ color: C.gold }}>New Episode</span>
                  <h2 className="text-2xl sm:text-3xl mb-4 sm:mb-5 leading-snug"
                    style={{ fontFamily:"'TheSeasons',Georgia,serif", color: C.ink }}>{featured.title}</h2>
                  <p className="leading-relaxed mb-3 sm:mb-4 text-sm sm:text-[15px]" style={{ color: C.stone }}>{featured.description}</p>
                  <p className="text-xs mb-6 sm:mb-8" style={{ color: C.gold }}>{featured.date} · {featured.duration}</p>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    <a href={featured.youtubeUrl}
                      className="inline-flex items-center gap-2 text-white text-xs tracking-widest uppercase px-4 sm:px-5 py-2.5 sm:py-3 hover:opacity-85 transition-opacity"
                      style={{ background:`linear-gradient(135deg,${C.cr},${C.crMd})` }}>
                      <YtIcon size={13} /> Watch on YouTube
                    </a>
                    <a href={featured.spotifyUrl}
                      className="inline-flex items-center gap-2 text-xs tracking-widest uppercase px-4 sm:px-5 py-2.5 sm:py-3 transition-colors"
                      style={{ border:`1px solid ${C.gold}`, color: C.cr }}
                      onMouseEnter={e=>(e.currentTarget.style.background=C.blush)}
                      onMouseLeave={e=>(e.currentTarget.style.background="transparent")}>
                      <Headphones size={13} /> Listen
                    </a>
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>
        </section>
      )}

      {/* ALL EPISODES */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 pb-20 sm:pb-28" style={{ background: C.cream }}>
        <div className="max-w-7xl mx-auto">
          <SectionReveal>
            <h2 className="text-2xl sm:text-3xl mb-8 sm:mb-10" style={{ fontFamily:"'TheSeasons',Georgia,serif", color: C.ink }}>All Episodes</h2>
          </SectionReveal>
          <div className="flex flex-col gap-3 sm:gap-4">
            {rest.map((ep,i)=>(
              <SectionReveal key={ep.id} delay={i*55}>
                <div className="group flex gap-4 sm:gap-6 p-4 sm:p-6 transition-colors duration-300"
                  style={{ background:"rgba(255,255,255,.65)" }}
                  onMouseEnter={e=>(e.currentTarget.style.background=C.blush)}
                  onMouseLeave={e=>(e.currentTarget.style.background="rgba(255,255,255,.65)")}>
                  {/* thumbnail — explicit w+h, NOT fill */}
                  <div className="relative flex-shrink-0 overflow-hidden" style={{ width:80, height:80 }}>
                    <Image src={ep.image} alt={ep.title} fill className="object-cover" sizes="80px" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background:"rgba(26,10,10,.35)" }}>
                      <Play size={18} className="text-white" />
                    </div>
                  </div>
                  <div className="flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex flex-wrap items-center gap-x-2 mb-1.5">
                        <span className="text-[10px] sm:text-xs tracking-widest uppercase" style={{ color: C.gold }}>Ep. {ep.episode}</span>
                        <span className="text-[10px] sm:text-xs" style={{ color: C.stone }}>{ep.date} · {ep.duration}</span>
                      </div>
                      <h3 className="text-base sm:text-xl mb-1.5 sm:mb-2 leading-snug"
                        style={{ fontFamily:"'TheSeasons',Georgia,serif", color: C.ink }}>{ep.title}</h3>
                      <p className="text-xs sm:text-sm leading-relaxed line-clamp-2" style={{ color: C.stone }}>{ep.description}</p>
                    </div>
                    <div className="flex gap-2 sm:gap-3 mt-3">
                      <a href={ep.youtubeUrl}
                        className="inline-flex items-center gap-1.5 text-white text-[10px] sm:text-xs tracking-widest uppercase px-3 sm:px-4 py-2 hover:opacity-85"
                        style={{ background: C.cr }}><YtIcon size={11} /> YouTube</a>
                      <a href={ep.spotifyUrl}
                        className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs tracking-widest uppercase px-3 sm:px-4 py-2 transition-colors"
                        style={{ border:`1px solid rgba(139,14,24,.35)`, color: C.cr }}><Headphones size={11} /> Listen</a>
                    </div>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
