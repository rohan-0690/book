"use client";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import type { Variants } from "framer-motion";
import SectionReveal from "@/components/SectionReveal";
import BlogCard from "@/components/BlogCard";
import { blogPosts, podcastEpisodes, books, artworks } from "@/lib/data";
import { getPublicBlogs, getPublicPodcasts, getPublicArtworks } from "@/lib/store";
import { Play, BookOpen, ArrowRight, Headphones } from "lucide-react";

const B="#70090F",B2="#560008",BL="#FFE9DF",IV="#F8F6E7",CH="#2C2C2C",ST="#4A4A4A";

const stagger:Variants={ hidden:{}, show:{ transition:{ staggerChildren:.13,delayChildren:.25 } } };
const fadeUp:Variants={ hidden:{ opacity:0,y:40 }, show:{ opacity:1,y:0,transition:{ duration:.9,ease:"easeOut" } } };
const fadeIn:Variants={ hidden:{ opacity:0 }, show:{ opacity:1,transition:{ duration:1.1,ease:"easeOut" } } };

export default function Home() {
  const heroRef=useRef<HTMLElement>(null);
  const { scrollYProgress }=useScroll({ target:heroRef,offset:["start start","end start"] });
  const imgY=useTransform(scrollYProgress,[0,1],["0%","20%"]);
  const textY=useTransform(scrollYProgress,[0,1],["0%","26%"]);
  const fadeOut=useTransform(scrollYProgress,[0,.65],[1,0]);

  const [allBlogs, setAllBlogs] = useState<ReturnType<typeof getPublicBlogs>>([]);
  const [allPodcasts, setAllPodcasts] = useState<ReturnType<typeof getPublicPodcasts>>([]);
  const [allArtworks, setAllArtworks] = useState<ReturnType<typeof getPublicArtworks>>([]);

  useEffect(() => {
    setAllBlogs(getPublicBlogs());
    setAllPodcasts(getPublicPodcasts());
    setAllArtworks(getPublicArtworks());
  }, []);

  const featuredPost  = allBlogs.find(p=>p.featured) ?? allBlogs[0];
  const recentPosts   = allBlogs.filter(p=>p!==featuredPost).slice(0,3);
  const latestEpisode = allPodcasts[0] ?? null;
  const featuredBooks = books.slice(0,4);
  const featuredArt   = allArtworks.slice(0,4);
  const [hovBook,setHovBook]=useState<number|null>(null);
  const [hovArt,setHovArt]=useState<number|null>(null);

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-[100svh] flex items-center justify-center overflow-hidden" style={{ background:"#1A0A0A" }}>
        <motion.div className="absolute inset-0 z-0 scale-110" style={{ y:imgY }}>
          <Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1800&q=85"
            alt="" fill className="object-cover" style={{ opacity:.35 }} priority sizes="100vw" />
        </motion.div>
        <div className="absolute inset-0 z-10" style={{ background:"linear-gradient(180deg,rgba(112,9,15,.25) 0%,rgba(26,10,10,.65) 50%,rgba(26,10,10,.97) 100%)" }} />
        <div className="absolute top-0 left-0 right-0 z-20 h-px" style={{ background:"linear-gradient(90deg,transparent,rgba(255,233,223,.5),transparent)" }} />

        <motion.div className="relative z-20 w-full max-w-5xl mx-auto px-5 sm:px-8 text-center" style={{ y:textY,opacity:fadeOut }}>
          <motion.div variants={stagger} initial="hidden" animate="show">

            {/* eyebrow */}
            <motion.div variants={fadeIn} className="flex items-center justify-center gap-3 mb-10 sm:mb-12">
              <span className="h-px w-10" style={{ background:"linear-gradient(90deg,transparent,rgba(255,233,223,.5))" }} />
              <span className="text-[9px] sm:text-[10px] tracking-[.4em]" style={{ color:"rgba(255,233,223,.6)" }}>Welcome to Become.ing</span>
              <span className="h-px w-10" style={{ background:"linear-gradient(90deg,rgba(255,233,223,.5),transparent)" }} />
            </motion.div>

            {/* ── HERO HEADLINE ── */}
            <motion.h1
              variants={fadeUp}
              className="leading-[1.05] mb-6 sm:mb-8"
              style={{
                fontFamily:"'TheSeasons',Georgia,serif",
                color:"#ffffff",
                fontWeight:300,
                letterSpacing:"0.08em",
              }}>
              {/* Line 1: "MIDlife" mixed-case intentional brand treatment + " IS YOUR SEASON" */}
              <span className="block text-[2.6rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem]">
                {/* "MID" large, "life" slightly smaller for the brand-mark contrast */}
                <span style={{ color:"#ffffff" }}>Mid</span><span style={{ color:BL }}>life</span>
                <span style={{ color:"#ffffff" }}> is your season.</span>
              </span>
              {/* Line 2 */}
              <motion.span
                className="block text-[2rem] sm:text-4xl md:text-5xl lg:text-[4rem] xl:text-[4.8rem] mt-2 italic"
                style={{ color:BL, letterSpacing:"0.07em" }}
                initial={{ opacity:0,x:-20 }}
                animate={{ opacity:1,x:0 }}
                transition={{ delay:.85,duration:1.1,ease:[.22,1,.36,1] }}>
                Choose your becoming.
              </motion.span>
            </motion.h1>

            <motion.div variants={fadeIn} className="flex justify-center mb-7">
              <span className="h-px w-16 sm:w-20" style={{ background:`linear-gradient(90deg,transparent,${BL},transparent)` }} />
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="text-sm sm:text-base leading-loose mb-10 sm:mb-14 max-w-xl mx-auto px-2"
              style={{ color:"rgba(255,233,223,.55)", fontFamily:"'Visby',system-ui,sans-serif", letterSpacing:"0.12em", fontWeight:300 }}>
              A thoughtful space for reflection, creativity, reinvention, and meaningful connection.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
              <motion.div whileHover={{ scale:1.03 }} whileTap={{ scale:.97 }}>
                <Link href="/blogs"
                  className="relative overflow-hidden group inline-block text-white text-[10px] sm:text-xs tracking-[.3em] px-8 sm:px-10 py-3.5 sm:py-4 w-full xs:w-auto text-center"
                  style={{ background:B }}>
                  <span className="relative z-10">Explore Stories</span>
                  <span className="absolute inset-0 translate-x-full group-hover:translate-x-0 transition-transform duration-300" style={{ background:B2 }} />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale:1.03 }} whileTap={{ scale:.97 }}>
                <Link href="/newsletter"
                  className="inline-block text-[10px] sm:text-xs tracking-[.3em] px-8 sm:px-10 py-3.5 sm:py-4 w-full xs:w-auto text-center transition-colors"
                  style={{ border:`1px solid rgba(255,233,223,.5)`,color:BL }}>
                  Join Our Community
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2.5"
          initial={{ opacity:0,y:8 }} animate={{ opacity:1,y:0 }} transition={{ delay:1.8 }}>
          <span className="text-[9px] tracking-[.35em]" style={{ color:"rgba(255,233,223,.35)" }}>Scroll</span>
          <motion.div className="w-px h-10" style={{ background:`linear-gradient(180deg,rgba(255,233,223,.5),transparent)` }}
            animate={{ scaleY:[1,.4,1],opacity:[.6,.2,.6] }}
            transition={{ duration:2.2,repeat:Infinity,ease:"easeInOut" }} />
        </motion.div>
      </section>

      {/* ── ABOUT ─────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 lg:py-28 px-4 sm:px-6" style={{ background:IV }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 lg:gap-20 items-center">

            <SectionReveal direction="right">
              {/* eyebrow */}
              <span className="text-[10px] tracking-[.35em] block mb-4" style={{ color:B }}>About Become.ing</span>

              {/* intro line */}
              <p className="text-xs sm:text-sm tracking-[.25em] mb-8 font-light" style={{ color:ST }}>
                A space to pause, reflect and choose what comes next.
              </p>

              {/* editorial divider */}
              <div className="w-10 h-px mb-8" style={{ background:`linear-gradient(90deg,${B},transparent)` }} />

              {/* body copy — each line given its own paragraph for visual breathing room */}
              <div className="space-y-5 mb-10">
                <p className="text-sm sm:text-[15px] leading-loose font-light" style={{ color:CH, letterSpacing:"0.06em" }}>
                  Midlife has a way of asking different questions.
                </p>
                <p className="text-sm sm:text-[15px] leading-loose font-light italic" style={{ color:ST, letterSpacing:"0.06em" }}>
                  What still belongs?&nbsp;&nbsp;What no longer fits?&nbsp;&nbsp;What wants to come alive again?
                </p>
                <p className="text-sm sm:text-[15px] leading-loose font-light" style={{ color:CH, letterSpacing:"0.06em" }}>
                  Become.ing is a space for those questions, and for the life unfolding around them.
                </p>
                <p className="text-sm sm:text-[15px] leading-loose font-light" style={{ color:ST, letterSpacing:"0.06em" }}>
                  Through stories, conversations, art, emotional wellness and reflection, we make space for the many ways we continue to change, reclaim and rediscover ourselves.
                </p>
                <p className="text-sm sm:text-[15px] leading-loose font-light" style={{ color:CH, letterSpacing:"0.08em" }}>
                  Stay curious about who you are becoming.
                </p>
              </div>

              <motion.div whileHover={{ x:5 }} transition={{ type:"spring",stiffness:300 }}>
                <Link href="/about"
                  className="inline-flex items-center gap-2 text-[10px] sm:text-xs tracking-[.3em] pb-0.5"
                  style={{ color:B,borderBottom:`1px solid ${B}` }}>
                  Learn More <ArrowRight size={13} />
                </Link>
              </motion.div>
            </SectionReveal>

            <SectionReveal direction="left" delay={150}>
              <div className="relative mt-8 lg:mt-0">
                <div className="relative w-full overflow-hidden" style={{ height:"480px" }}>
                  <Image
                    src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80"
                    alt="Become.ing community" fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    sizes="(max-width:1024px) 100vw, 50vw" />
                </div>
                <motion.div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 w-28 sm:w-36 h-28 sm:h-36 -z-10" style={{ background:BL }}
                  initial={{ scale:.8,opacity:0 }} whileInView={{ scale:1,opacity:1 }} viewport={{ once:true }} transition={{ delay:.4 }} />
                <motion.div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-16 sm:w-20 h-16 sm:h-20"
                  style={{ border:`1px solid rgba(112,9,15,.25)` }}
                  initial={{ scale:.8,opacity:0 }} whileInView={{ scale:1,opacity:1 }} viewport={{ once:true }} transition={{ delay:.5 }} />
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── QUOTE ─────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden" style={{ background:B }}>
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ background:"radial-gradient(ellipse 60% 50% at 50% 50%,rgba(255,233,223,.4),transparent)" }} />
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background:"linear-gradient(90deg,transparent,rgba(255,233,223,.4),transparent)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background:"linear-gradient(90deg,transparent,rgba(255,233,223,.4),transparent)" }} />
        <SectionReveal direction="none">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="text-5xl sm:text-7xl mb-1 select-none" style={{ fontFamily:"'TheSeasons',Georgia,serif",color:"rgba(255,233,223,.2)" }}>&ldquo;</div>
            <blockquote
              className="text-xl sm:text-2xl md:text-[2rem] leading-[1.55] font-light"
              style={{ fontFamily:"'TheSeasons',Georgia,serif",color:"#ffffff",letterSpacing:"0.06em" }}>
              The privilege of a lifetime is to become who you truly are.
            </blockquote>
            <div className="mt-7 flex items-center justify-center gap-4">
              <span className="h-px w-10" style={{ background:"rgba(255,233,223,.35)" }} />
              <cite className="text-[10px] sm:text-xs tracking-[.35em] not-italic" style={{ color:BL }}>Carl Jung</cite>
              <span className="h-px w-10" style={{ background:"rgba(255,233,223,.35)" }} />
            </div>
          </div>
        </SectionReveal>
      </section>

      {/* ── BLOGS ─────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 lg:py-28 px-4 sm:px-6" style={{ background:IV }}>
        <div className="max-w-7xl mx-auto">
          <SectionReveal>
            <div className="flex items-end justify-between mb-8 sm:mb-14">
              <div>
                <span className="text-[10px] tracking-[.35em] block mb-2 sm:mb-3" style={{ color:B }}>From the Journal</span>
                <h2 className="text-2xl sm:text-4xl lg:text-5xl" style={{ fontFamily:"'TheSeasons',Georgia,serif",color:CH }}>Stories &amp; Reflections</h2>
              </div>
              <motion.div whileHover={{ x:4 }} transition={{ type:"spring",stiffness:300 }}>
                <Link href="/blogs" className="hidden sm:inline-flex items-center gap-2 text-[10px] sm:text-xs tracking-[.3em] pb-0.5" style={{ color:B,borderBottom:`1px solid ${B}` }}>
                  All Articles <ArrowRight size={13} />
                </Link>
              </motion.div>
            </div>
          </SectionReveal>
          {featuredPost && <SectionReveal delay={80}><div className="mb-6 sm:mb-8"><BlogCard post={featuredPost} featured /></div></SectionReveal>}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {recentPosts.map((p,i)=>(<SectionReveal key={p.id} delay={i*100}><BlogCard post={p} /></SectionReveal>))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link href="/blogs" className="inline-block text-xs tracking-[.3em] px-8 py-3" style={{ border:`1px solid ${B}`,color:B }}>All Articles</Link>
          </div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────── */}
      <section className="py-12 sm:py-16 px-4 sm:px-6" style={{ background:CH }}>
        <div className="max-w-5xl mx-auto">
          <div className="divider-burg mb-10 sm:mb-14" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            {[{v:"10K+",l:"Community Members"},{v:"50+",l:"Articles Published"},{v:"24",l:"Podcast Episodes"},{v:"8+",l:"Artists Featured"}].map((s,i)=>(
              <SectionReveal key={s.l} delay={i*70}>
                <p className="text-3xl sm:text-4xl mb-2" style={{ fontFamily:"'TheSeasons',Georgia,serif",color:BL,letterSpacing:"0.05em" }}>{s.v}</p>
                <p className="text-[10px] tracking-[.3em]" style={{ color:"rgba(248,246,231,.4)" }}>{s.l}</p>
              </SectionReveal>
            ))}
          </div>
          <div className="divider-burg mt-10 sm:mt-14" />
        </div>
      </section>

      {/* ── PODCAST ───────────────────────────────────────────── */}
      {latestEpisode && (
      <section className="py-16 sm:py-24 lg:py-28 px-4 sm:px-6" style={{ background:BL }}>
        <div className="max-w-7xl mx-auto">
          <SectionReveal>
            <div className="flex items-end justify-between mb-8 sm:mb-14">
              <div>
                <span className="text-[10px] tracking-[.35em] block mb-2 sm:mb-3" style={{ color:B }}>Latest Episode</span>
                <h2 className="text-2xl sm:text-4xl lg:text-5xl" style={{ fontFamily:"'TheSeasons',Georgia,serif",color:CH }}>The Become.ing Podcast</h2>
              </div>
              <motion.div whileHover={{ x:4 }} transition={{ type:"spring",stiffness:300 }}>
                <Link href="/podcast" className="hidden sm:inline-flex items-center gap-2 text-[10px] sm:text-xs tracking-[.3em] pb-0.5" style={{ color:B,borderBottom:`1px solid ${B}` }}>All Episodes <ArrowRight size={13} /></Link>
              </motion.div>
            </div>
          </SectionReveal>
          <SectionReveal delay={80}>
            <motion.div className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden shadow-xl" style={{ background:IV }}
              whileHover={{ boxShadow:`0 24px 64px rgba(112,9,15,.15)` }}>
              <div className="relative overflow-hidden" style={{ height:"340px" }}>
                <Image src={latestEpisode.image} alt={latestEpisode.title} fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
                <div className="absolute inset-0 flex items-center justify-center" style={{ background:"rgba(26,10,10,.35)" }}>
                  <motion.div className="relative w-16 sm:w-20 h-16 sm:h-20 rounded-full flex items-center justify-center cursor-pointer shadow-2xl" style={{ background:B }}
                    whileHover={{ scale:1.12 }} whileTap={{ scale:.95 }}>
                    <motion.span className="absolute w-16 sm:w-20 h-16 sm:h-20 rounded-full" style={{ border:"2px solid rgba(255,233,223,.55)" }}
                      animate={{ scale:[1,1.65],opacity:[.55,0] }} transition={{ duration:1.8,repeat:Infinity,ease:"easeOut" }} />
                    <Play size={22} className="text-white ml-1" />
                  </motion.div>
                </div>
                <div className="absolute top-3 left-3 text-white text-[10px] tracking-[.25em] px-2.5 sm:px-3 py-1" style={{ background:B }}>
                  Episode {latestEpisode.episode}
                </div>
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
                <span className="text-[10px] tracking-[.35em] mb-3 sm:mb-4 block" style={{ color:B }}>New Episode</span>
                <h3 className="text-xl sm:text-2xl lg:text-3xl mb-4 sm:mb-5 leading-snug" style={{ fontFamily:"'TheSeasons',Georgia,serif",color:CH }}>{latestEpisode.title}</h3>
                <p className="leading-loose mb-3 sm:mb-4 text-sm sm:text-[15px] font-light" style={{ color:ST }}>{latestEpisode.description}</p>
                <p className="text-[10px] tracking-[.25em] mb-6 sm:mb-8" style={{ color:B }}>{latestEpisode.date} · {latestEpisode.duration}</p>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  <motion.a href={latestEpisode.youtubeUrl}
                    className="inline-flex items-center gap-2 text-white text-[10px] tracking-[.25em] px-4 sm:px-5 py-2.5 sm:py-3"
                    style={{ background:B }} whileHover={{ scale:1.03 }} whileTap={{ scale:.97 }}>
                    <Play size={12} /> Watch on YouTube
                  </motion.a>
                  <motion.a href={latestEpisode.spotifyUrl}
                    className="inline-flex items-center gap-2 text-[10px] tracking-[.25em] px-4 sm:px-5 py-2.5 sm:py-3"
                    style={{ border:`1px solid ${B}`,color:B }} whileHover={{ scale:1.03 }} whileTap={{ scale:.97 }}>
                    <Headphones size={12} /> Listen
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </SectionReveal>
        </div>
      </section>
      )}

      {/* ── BOOKS ─────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 lg:py-28 px-4 sm:px-6" style={{ background:IV }}>
        <div className="max-w-7xl mx-auto">
          <SectionReveal>
            <div className="flex items-end justify-between mb-8 sm:mb-14">
              <div>
                <span className="text-[10px] tracking-[.35em] block mb-2 sm:mb-3" style={{ color:B }}>Reading List</span>
                <h2 className="text-2xl sm:text-4xl lg:text-5xl" style={{ fontFamily:"'TheSeasons',Georgia,serif",color:CH }}>Books We Love</h2>
              </div>
              <motion.div whileHover={{ x:4 }} transition={{ type:"spring",stiffness:300 }}>
                <Link href="/books" className="hidden sm:inline-flex items-center gap-2 text-[10px] sm:text-xs tracking-[.3em] pb-0.5" style={{ color:B,borderBottom:`1px solid ${B}` }}>Full Library <ArrowRight size={13} /></Link>
              </motion.div>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-8">
            {featuredBooks.map((book,i)=>(
              <SectionReveal key={book.id} delay={i*70}>
                <motion.div className="group flex flex-col cursor-pointer" onHoverStart={()=>setHovBook(book.id)} onHoverEnd={()=>setHovBook(null)}>
                  <motion.div className="relative w-full overflow-hidden mb-3 sm:mb-4" style={{ height:"220px" }}
                    animate={{ y:hovBook===book.id ? -8:0,boxShadow:hovBook===book.id ? `0 24px 48px rgba(112,9,15,.22)`:"0 4px 18px rgba(0,0,0,.1)" }}
                    transition={{ duration:.4,ease:[.22,1,.36,1] }}>
                    <Image src={book.cover} alt={book.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width:640px) 50vw, 25vw" />
                    <motion.div className="absolute inset-0 pointer-events-none" animate={{ opacity:hovBook===book.id ? 1:0 }} style={{ border:`2px solid rgba(112,9,15,.55)` }} />
                  </motion.div>
                  <h4 className="text-sm sm:text-base mb-1 leading-snug" style={{ fontFamily:"'TheSeasons',Georgia,serif",color:CH }}>{book.title}</h4>
                  <p className="text-[10px] tracking-[.2em] mb-2 sm:mb-3" style={{ color:B }}>{book.author}</p>
                  <motion.a href={book.amazonUrl} className="mt-auto inline-flex items-center gap-1 text-[10px] tracking-[.25em]" style={{ color:ST }} whileHover={{ x:3 }} transition={{ type:"spring",stiffness:300 }}>
                    <BookOpen size={11} /> Buy Now
                  </motion.a>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── ART ───────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 lg:py-28 px-4 sm:px-6" style={{ background:CH }}>
        <div className="max-w-7xl mx-auto">
          <SectionReveal>
            <div className="flex items-end justify-between mb-8 sm:mb-14">
              <div>
                <span className="text-[10px] tracking-[.35em] block mb-2 sm:mb-3" style={{ color:"rgba(255,233,223,.55)" }}>Art Collective</span>
                <h2 className="text-2xl sm:text-4xl lg:text-5xl" style={{ fontFamily:"'TheSeasons',Georgia,serif",color:"#ffffff" }}>From the Gallery</h2>
              </div>
              <motion.div whileHover={{ x:4 }} transition={{ type:"spring",stiffness:300 }}>
                <Link href="/art" className="hidden sm:inline-flex items-center gap-2 text-[10px] sm:text-xs tracking-[.3em] pb-0.5" style={{ color:BL,borderBottom:`1px solid rgba(255,233,223,.45)` }}>
                  Explore Gallery <ArrowRight size={13} />
                </Link>
              </motion.div>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
            {featuredArt.map((art,i)=>(
              <SectionReveal key={art.id} delay={i*70}>
                <div className="group relative overflow-hidden cursor-pointer" style={{ height:i%2===0 ? "280px":"210px" }}
                  onMouseEnter={()=>setHovArt(art.id)} onMouseLeave={()=>setHovArt(null)}>
                  <Image src={art.image} alt={art.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width:768px) 50vw, 25vw" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ border:`1px solid rgba(255,233,223,.5)` }} />
                  <AnimatePresence>
                    {hovArt===art.id && (
                      <motion.div className="absolute inset-0 flex flex-col items-center justify-center p-3"
                        style={{ background:`linear-gradient(180deg,rgba(112,9,15,.75) 0%,rgba(26,10,10,.9) 100%)` }}
                        initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:.25 }}>
                        <motion.p className="text-white text-center text-base sm:text-lg mb-1" style={{ fontFamily:"'TheSeasons',Georgia,serif" }} initial={{ y:8,opacity:0 }} animate={{ y:0,opacity:1 }} transition={{ delay:.05 }}>{art.title}</motion.p>
                        <motion.p className="text-[10px] tracking-[.2em] text-center" style={{ color:"rgba(255,233,223,.8)" }} initial={{ y:8,opacity:0 }} animate={{ y:0,opacity:1 }} transition={{ delay:.1 }}>{art.artist}</motion.p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 lg:py-28 px-4 sm:px-6 relative overflow-hidden" style={{ background:IV }}>
        <div className="absolute top-0 left-0 w-64 sm:w-80 h-64 sm:h-80 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-40 pointer-events-none" style={{ background:`radial-gradient(circle,${BL},transparent 70%)` }} />
        <div className="absolute bottom-0 right-0 w-72 sm:w-96 h-72 sm:h-96 rounded-full translate-x-1/3 translate-y-1/3 opacity-40 pointer-events-none" style={{ background:`radial-gradient(circle,${BL},transparent 70%)` }} />
        <SectionReveal direction="none">
          <div className="max-w-2xl mx-auto text-center relative z-10 px-2">
            <span className="text-[10px] tracking-[.35em] block mb-3 sm:mb-4" style={{ color:B }}>Community</span>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl mb-5 sm:mb-6 leading-tight" style={{ fontFamily:"'TheSeasons',Georgia,serif",color:CH }}>Stay Connected</h2>
            <div className="w-14 h-px mx-auto mb-6 sm:mb-8" style={{ background:`linear-gradient(90deg,transparent,${B},transparent)` }} />
            <p className="leading-loose mb-8 sm:mb-12 text-sm sm:text-[15px] font-light" style={{ color:ST, letterSpacing:"0.06em" }}>
              Join the Become.ing community. Receive thoughtful reflections, new podcast episodes, book recommendations, and updates directly to your inbox.
            </p>
            <motion.div whileHover={{ scale:1.04 }} whileTap={{ scale:.97 }}>
              <Link href="/newsletter" className="relative overflow-hidden group inline-block text-white text-[10px] sm:text-xs tracking-[.3em] px-8 sm:px-12 py-3.5 sm:py-4" style={{ background:B }}>
                <span className="relative z-10">Subscribe Now</span>
                <span className="absolute inset-0 translate-x-full group-hover:translate-x-0 transition-transform duration-300" style={{ background:B2 }} />
              </Link>
            </motion.div>
          </div>
        </SectionReveal>
      </section>
    </>
  );
}
