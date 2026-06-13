"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import type { Variants } from "framer-motion";
import SectionReveal from "@/components/SectionReveal";
import BlogCard from "@/components/BlogCard";
import { blogPosts, podcastEpisodes, books, artworks } from "@/lib/data";
import { Play, BookOpen, ArrowRight, Headphones } from "lucide-react";

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.25 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.95, ease: "easeOut" } },
};
const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1.1, ease: "easeOut" } },
};

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgY    = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const textY   = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  const featuredPost  = blogPosts.find((p) => p.featured);
  const recentPosts   = blogPosts.filter((p) => !p.featured).slice(0, 3);
  const latestEpisode = podcastEpisodes[0];
  const featuredBooks = books.slice(0, 4);
  const featuredArt   = artworks.slice(0, 4);

  const [hoveredBook, setHoveredBook] = useState<number | null>(null);
  const [hoveredArt,  setHoveredArt]  = useState<number | null>(null);

  return (
    <>
      {/* ══ HERO ════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-[100svh] flex items-center justify-center overflow-hidden" style={{ background: "#1C1410" }}>
        <motion.div className="absolute inset-0 z-0 scale-110" style={{ y: imgY }}>
          <Image src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1800&q=85"
            alt="Become.ing" fill className="object-cover opacity-35" priority sizes="100vw" />
        </motion.div>
        <div className="absolute inset-0 z-10" style={{ background: "linear-gradient(180deg,rgba(92,5,17,0.15) 0%,rgba(28,20,16,0.55) 50%,rgba(28,20,16,0.96) 100%)" }} />
        <div className="absolute top-0 left-0 right-0 z-20 h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(201,169,110,0.55),transparent)" }} />

        <motion.div className="relative z-20 w-full max-w-4xl mx-auto px-5 sm:px-8 text-center" style={{ y: textY, opacity }}>
          <motion.div variants={stagger} initial="hidden" animate="show">

            <motion.div variants={fadeIn} className="flex items-center justify-center gap-3 mb-8 sm:mb-10">
              <span className="h-px w-8 sm:w-12" style={{ background: "linear-gradient(90deg,transparent,rgba(201,169,110,0.65))" }} />
              <span className="text-[9px] sm:text-[10px] tracking-[0.4em] uppercase" style={{ color: "rgba(201,169,110,0.75)" }}>
                Welcome to Become.ing
              </span>
              <span className="h-px w-8 sm:w-12" style={{ background: "linear-gradient(90deg,rgba(201,169,110,0.65),transparent)" }} />
            </motion.div>

            <motion.h1 variants={fadeUp}
              className="text-[2.6rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] text-white leading-[1.06] mb-6 sm:mb-8"
              style={{ fontFamily: "'TheSeasons','Georgia',serif" }}>
              Midlife is not
              <br />an ending.
              <br />
              <motion.span className="italic" style={{ color: "#E8D5B0" }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.85, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}>
                It is a becoming.
              </motion.span>
            </motion.h1>

            <motion.div variants={fadeIn} className="flex justify-center mb-7">
              <span className="h-px w-16 sm:w-20" style={{ background: "linear-gradient(90deg,transparent,#C9A96E,transparent)" }} />
            </motion.div>

            <motion.p variants={fadeUp} className="text-base sm:text-lg md:text-xl leading-relaxed mb-10 sm:mb-14 max-w-xl sm:max-w-2xl mx-auto px-2" style={{ color: "rgba(250,247,238,0.52)" }}>
              A thoughtful space for reflection, creativity, reinvention, and meaningful connection.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link href="/blogs" className="relative overflow-hidden group inline-block text-white text-xs sm:text-sm tracking-widest uppercase px-7 sm:px-10 py-3.5 sm:py-4 w-full xs:w-auto text-center"
                  style={{ background: "#5C0511" }}>
                  <span className="relative z-10">Explore Stories</span>
                  <span className="absolute inset-0 translate-x-full group-hover:translate-x-0 transition-transform duration-300" style={{ background: "#8B1A24" }} />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link href="/newsletter"
                  className="inline-block text-xs sm:text-sm tracking-widest uppercase px-7 sm:px-10 py-3.5 sm:py-4 transition-all duration-300 w-full xs:w-auto text-center"
                  style={{ border: "1px solid rgba(201,169,110,0.4)", color: "#E8D5B0" }}>
                  Join Our Community
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div className="absolute bottom-7 sm:bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2.5"
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8, duration: 0.6 }}>
          <span className="text-[9px] tracking-[0.35em] uppercase" style={{ color: "rgba(201,169,110,0.45)" }}>Scroll</span>
          <motion.div className="w-px h-10"
            style={{ background: "linear-gradient(180deg,rgba(201,169,110,0.65),transparent)" }}
            animate={{ scaleY: [1, 0.4, 1], opacity: [0.65, 0.2, 0.65] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }} />
        </motion.div>
      </section>

      {/* ══ ABOUT ═══════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 lg:py-28 px-4 sm:px-6" style={{ background: "#FAF7EE" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-20 items-center">
            <SectionReveal direction="right">
              <span className="text-xs tracking-widest uppercase block mb-3 sm:mb-4" style={{ color: "#C9A96E" }}>About Become.ing</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-5 sm:mb-8 leading-tight" style={{ fontFamily: "'TheSeasons','Georgia',serif", color: "#1C1410" }}>
                A movement for those brave enough to begin again
              </h2>
              <div className="w-14 h-px mb-6 sm:mb-8" style={{ background: "linear-gradient(90deg,#C9A96E,transparent)" }} />
              <p className="leading-relaxed mb-4 sm:mb-5 text-sm sm:text-[15px]" style={{ color: "#6B5E54" }}>
                Become.ing is a premium editorial community for individuals navigating the beautiful, complex terrain of midlife. We believe this season — full of transition, introspection, and reinvention — is not a diminishment but an unfolding.
              </p>
              <p className="leading-relaxed mb-8 sm:mb-10 text-sm sm:text-[15px]" style={{ color: "#6B5E54" }}>
                Here you will find stories, conversations, art, and wisdom to guide your journey. This is your home for becoming.
              </p>
              <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                <Link href="/about" className="inline-flex items-center gap-2 text-xs sm:text-sm tracking-widest uppercase pb-0.5 transition-colors"
                  style={{ color: "#5C0511", borderBottom: "1px solid #C9A96E" }}>
                  Learn More <ArrowRight size={13} />
                </Link>
              </motion.div>
            </SectionReveal>

            <SectionReveal direction="left" delay={150}>
              <div className="relative mt-8 lg:mt-0">
                <div className="relative w-full overflow-hidden" style={{ paddingBottom: "125%" }}>
                  <motion.div className="absolute inset-0"
                    whileHover={{ scale: 1.02 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
                    <Image src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80"
                      alt="Become.ing community" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                  </motion.div>
                </div>
                <motion.div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 w-28 sm:w-36 h-28 sm:h-36 -z-10"
                  style={{ background: "#F5E6D8" }}
                  initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }} />
                <motion.div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-16 sm:w-20 h-16 sm:h-20"
                  style={{ border: "1px solid rgba(201,169,110,0.4)" }}
                  initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }} />
                <motion.div className="absolute -right-3 sm:-right-4 bottom-12 sm:bottom-16 px-4 sm:px-5 py-3 sm:py-4 shadow-2xl hidden sm:block"
                  style={{ background: "linear-gradient(135deg,#5C0511,#8B1A24)" }}
                  initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.6 }}>
                  <p className="text-xl sm:text-2xl font-light" style={{ fontFamily: "'TheSeasons','Georgia',serif", color: "#E8D5B0" }}>10K+</p>
                  <p className="text-[10px] tracking-widest uppercase mt-0.5" style={{ color: "rgba(232,213,176,0.6)" }}>Community Members</p>
                </motion.div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ══ QUOTE ════════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg,#1C1410 0%,#2A1F1A 50%,#1C1410 100%)" }}>
        <div className="absolute inset-0 opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%,rgba(201,169,110,0.28),transparent)" }} />
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(201,169,110,0.45),transparent)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(201,169,110,0.45),transparent)" }} />

        <SectionReveal direction="none">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="text-5xl sm:text-7xl mb-1 select-none" style={{ fontFamily: "'TheSeasons','Georgia',serif", color: "rgba(201,169,110,0.22)" }}>&ldquo;</div>
            <blockquote className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] leading-[1.35] italic font-light"
              style={{ fontFamily: "'TheSeasons','Georgia',serif", color: "#FAF7EE" }}>
              The privilege of a lifetime is to become who you truly are.
            </blockquote>
            <div className="mt-7 flex items-center justify-center gap-4">
              <span className="h-px w-8 sm:w-10" style={{ background: "rgba(201,169,110,0.38)" }} />
              <cite className="text-[10px] sm:text-xs tracking-widest uppercase not-italic" style={{ color: "#C9A96E" }}>Carl Jung</cite>
              <span className="h-px w-8 sm:w-10" style={{ background: "rgba(201,169,110,0.38)" }} />
            </div>
          </div>
        </SectionReveal>
      </section>

      {/* ══ BLOGS ═══════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 lg:py-28 px-4 sm:px-6" style={{ background: "#FAF7EE" }}>
        <div className="max-w-7xl mx-auto">
          <SectionReveal>
            <div className="flex items-end justify-between mb-8 sm:mb-12 lg:mb-14">
              <div>
                <span className="text-xs tracking-widest uppercase block mb-2 sm:mb-3" style={{ color: "#C9A96E" }}>From the Journal</span>
                <h2 className="text-2xl sm:text-4xl lg:text-5xl" style={{ fontFamily: "'TheSeasons','Georgia',serif", color: "#1C1410" }}>
                  Stories &amp; Reflections
                </h2>
              </div>
              <motion.div whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 300 }}>
                <Link href="/blogs" className="hidden sm:inline-flex items-center gap-2 text-xs sm:text-sm tracking-widest uppercase pb-0.5"
                  style={{ color: "#5C0511", borderBottom: "1px solid #C9A96E" }}>
                  All Articles <ArrowRight size={13} />
                </Link>
              </motion.div>
            </div>
          </SectionReveal>

          {featuredPost && (
            <SectionReveal delay={80}>
              <div className="mb-6 sm:mb-8"><BlogCard post={featuredPost} featured /></div>
            </SectionReveal>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {recentPosts.map((post, i) => (
              <SectionReveal key={post.id} delay={i * 100}><BlogCard post={post} /></SectionReveal>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link href="/blogs" className="inline-block text-sm tracking-widest uppercase px-8 py-3 transition-colors"
              style={{ border: "1px solid #5C0511", color: "#5C0511" }}>
              All Articles
            </Link>
          </div>
        </div>
      </section>

      {/* ══ STATS ════════════════════════════════════════════ */}
      <section className="py-12 sm:py-16 px-4 sm:px-6" style={{ background: "#1C1410" }}>
        <div className="max-w-5xl mx-auto">
          <div className="divider-gold mb-10 sm:mb-14" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            {[
              { value: "10K+", label: "Community Members" },
              { value: "50+",  label: "Articles Published" },
              { value: "24",   label: "Podcast Episodes" },
              { value: "8+",   label: "Artists Featured" },
            ].map((stat, i) => (
              <SectionReveal key={stat.label} delay={i * 70}>
                <p className="text-3xl sm:text-4xl mb-2" style={{ fontFamily: "'TheSeasons','Georgia',serif", color: "#C9A96E" }}>{stat.value}</p>
                <p className="text-[10px] sm:text-xs tracking-widest uppercase" style={{ color: "rgba(250,247,238,0.4)" }}>{stat.label}</p>
              </SectionReveal>
            ))}
          </div>
          <div className="divider-gold mt-10 sm:mt-14" />
        </div>
      </section>

      {/* ══ PODCAST ═════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 lg:py-28 px-4 sm:px-6" style={{ background: "#F5E6D8" }}>
        <div className="max-w-7xl mx-auto">
          <SectionReveal>
            <div className="flex items-end justify-between mb-8 sm:mb-12 lg:mb-14">
              <div>
                <span className="text-xs tracking-widest uppercase block mb-2 sm:mb-3" style={{ color: "#C9A96E" }}>Latest Episode</span>
                <h2 className="text-2xl sm:text-4xl lg:text-5xl" style={{ fontFamily: "'TheSeasons','Georgia',serif", color: "#1C1410" }}>
                  The Become.ing Podcast
                </h2>
              </div>
              <motion.div whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 300 }}>
                <Link href="/podcast" className="hidden sm:inline-flex items-center gap-2 text-xs sm:text-sm tracking-widest uppercase pb-0.5"
                  style={{ color: "#5C0511", borderBottom: "1px solid #C9A96E" }}>
                  All Episodes <ArrowRight size={13} />
                </Link>
              </motion.div>
            </div>
          </SectionReveal>

          <SectionReveal delay={80}>
            <motion.div className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden shadow-xl"
              style={{ background: "#FAF7EE" }}
              whileHover={{ boxShadow: "0 24px 64px rgba(92,5,17,0.14)" }}>
              <div className="relative w-full overflow-hidden" style={{ paddingBottom: "100%" /* 1:1 */ }}>
                <Image src={latestEpisode.image} alt={latestEpisode.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(28,20,16,0.38)" }}>
                  <motion.div className="relative w-16 sm:w-20 h-16 sm:h-20 rounded-full flex items-center justify-center cursor-pointer shadow-2xl"
                    style={{ background: "linear-gradient(135deg,#5C0511,#8B1A24)" }}
                    whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.95 }}>
                    <motion.span className="absolute w-16 sm:w-20 h-16 sm:h-20 rounded-full"
                      style={{ border: "2px solid rgba(201,169,110,0.55)" }}
                      animate={{ scale: [1, 1.65], opacity: [0.55, 0] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }} />
                    <Play size={22} className="text-white ml-1" />
                  </motion.div>
                </div>
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4 text-white text-[10px] sm:text-xs tracking-widest uppercase px-2.5 sm:px-3 py-1"
                  style={{ background: "linear-gradient(135deg,#5C0511,#8B1A24)" }}>
                  Episode {latestEpisode.episode}
                </div>
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
                <span className="text-xs tracking-widest uppercase mb-3 sm:mb-4" style={{ color: "#C9A96E" }}>New Episode</span>
                <h3 className="text-xl sm:text-2xl lg:text-3xl mb-4 sm:mb-5 leading-snug" style={{ fontFamily: "'TheSeasons','Georgia',serif", color: "#1C1410" }}>
                  {latestEpisode.title}
                </h3>
                <p className="leading-relaxed mb-3 sm:mb-4 text-sm sm:text-[15px]" style={{ color: "#6B5E54" }}>{latestEpisode.description}</p>
                <p className="text-xs mb-6 sm:mb-8" style={{ color: "#C9A96E" }}>{latestEpisode.date} · {latestEpisode.duration}</p>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  <motion.a href={latestEpisode.youtubeUrl}
                    className="inline-flex items-center gap-2 text-white text-[10px] sm:text-xs tracking-widest uppercase px-4 sm:px-5 py-2.5 sm:py-3"
                    style={{ background: "linear-gradient(135deg,#5C0511,#8B1A24)" }}
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Play size={12} /> Watch on YouTube
                  </motion.a>
                  <motion.a href={latestEpisode.spotifyUrl}
                    className="inline-flex items-center gap-2 text-[10px] sm:text-xs tracking-widest uppercase px-4 sm:px-5 py-2.5 sm:py-3 transition-colors"
                    style={{ border: "1px solid #C9A96E", color: "#5C0511" }}
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Headphones size={12} /> Listen
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </SectionReveal>
        </div>
      </section>

      {/* ══ BOOKS ════════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 lg:py-28 px-4 sm:px-6" style={{ background: "#FAF7EE" }}>
        <div className="max-w-7xl mx-auto">
          <SectionReveal>
            <div className="flex items-end justify-between mb-8 sm:mb-12 lg:mb-14">
              <div>
                <span className="text-xs tracking-widest uppercase block mb-2 sm:mb-3" style={{ color: "#C9A96E" }}>Reading List</span>
                <h2 className="text-2xl sm:text-4xl lg:text-5xl" style={{ fontFamily: "'TheSeasons','Georgia',serif", color: "#1C1410" }}>Books We Love</h2>
              </div>
              <motion.div whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 300 }}>
                <Link href="/books" className="hidden sm:inline-flex items-center gap-2 text-xs sm:text-sm tracking-widest uppercase pb-0.5"
                  style={{ color: "#5C0511", borderBottom: "1px solid #C9A96E" }}>
                  Full Library <ArrowRight size={13} />
                </Link>
              </motion.div>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-8">
            {featuredBooks.map((book, i) => (
              <SectionReveal key={book.id} delay={i * 70}>
                <motion.div className="group flex flex-col cursor-pointer"
                  onHoverStart={() => setHoveredBook(book.id)} onHoverEnd={() => setHoveredBook(null)}>
                  <motion.div className="relative overflow-hidden mb-3 sm:mb-4" style={{ aspectRatio: "3/4" }}
                    animate={{ y: hoveredBook === book.id ? -8 : 0, boxShadow: hoveredBook === book.id ? "0 24px 48px rgba(92,5,17,0.22)" : "0 4px 18px rgba(0,0,0,0.1)" }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
                    <Image src={book.cover} alt={book.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 640px) 50vw, 25vw" />
                    <motion.div className="absolute inset-0 pointer-events-none" animate={{ opacity: hoveredBook === book.id ? 1 : 0 }}
                      style={{ border: "2px solid rgba(201,169,110,0.55)" }} />
                  </motion.div>
                  <h4 className="text-sm sm:text-base mb-1 leading-snug" style={{ fontFamily: "'TheSeasons','Georgia',serif", color: "#1C1410" }}>{book.title}</h4>
                  <p className="text-xs mb-2 sm:mb-3" style={{ color: "#C9A96E" }}>{book.author}</p>
                  <motion.a href={book.amazonUrl} className="mt-auto inline-flex items-center gap-1 text-xs tracking-widest uppercase"
                    style={{ color: "#6B5E54" }}
                    whileHover={{ x: 3 }} transition={{ type: "spring", stiffness: 300 }}>
                    <BookOpen size={11} /> Buy Now
                  </motion.a>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ART ══════════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 lg:py-28 px-4 sm:px-6" style={{ background: "#1C1410" }}>
        <div className="max-w-7xl mx-auto">
          <SectionReveal>
            <div className="flex items-end justify-between mb-8 sm:mb-12 lg:mb-14">
              <div>
                <span className="text-xs tracking-widest uppercase block mb-2 sm:mb-3" style={{ color: "rgba(201,169,110,0.52)" }}>Art Collective</span>
                <h2 className="text-2xl sm:text-4xl lg:text-5xl" style={{ fontFamily: "'TheSeasons','Georgia',serif", color: "#FAF7EE" }}>From the Gallery</h2>
              </div>
              <motion.div whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 300 }}>
                <Link href="/art" className="hidden sm:inline-flex items-center gap-2 text-xs sm:text-sm tracking-widest uppercase pb-0.5"
                  style={{ color: "#E8D5B0", borderBottom: "1px solid rgba(201,169,110,0.45)" }}>
                  Explore Gallery <ArrowRight size={13} />
                </Link>
              </motion.div>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
            {featuredArt.map((artwork, i) => (
              <SectionReveal key={artwork.id} delay={i * 70}>
                <motion.div className="group relative overflow-hidden cursor-pointer"
                  style={{ paddingBottom: i % 2 === 0 ? "133.33%" : "100%", position: "relative" }}
                  onHoverStart={() => setHoveredArt(artwork.id)} onHoverEnd={() => setHoveredArt(null)}
                  whileHover={{ scale: 1.02 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
                  <div className="absolute inset-0">
                  <Image src={artwork.image} alt={artwork.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 50vw, 25vw" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ border: "1px solid rgba(201,169,110,0.5)" }} />
                  <AnimatePresence>
                    {hoveredArt === artwork.id && (
                      <motion.div className="absolute inset-0 flex flex-col items-center justify-center p-3"
                        style={{ background: "linear-gradient(180deg,rgba(92,5,17,0.72) 0%,rgba(28,20,16,0.88) 100%)" }}
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                        <motion.p className="text-center text-base sm:text-lg mb-1" style={{ fontFamily: "'TheSeasons','Georgia',serif", color: "#E8D5B0" }}
                          initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.05 }}>
                          {artwork.title}
                        </motion.p>
                        <motion.p className="text-[10px] sm:text-xs text-center" style={{ color: "rgba(201,169,110,0.75)" }}
                          initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
                          {artwork.artist}
                        </motion.p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  </div>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ NEWSLETTER ══════════════════════════════════════ */}
      <section className="py-16 sm:py-24 lg:py-28 px-4 sm:px-6 relative overflow-hidden" style={{ background: "#FAF7EE" }}>
        <div className="absolute top-0 left-0 w-64 sm:w-80 h-64 sm:h-80 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-35 pointer-events-none"
          style={{ background: "radial-gradient(circle,#E8D5B0,transparent 70%)" }} />
        <div className="absolute bottom-0 right-0 w-72 sm:w-96 h-72 sm:h-96 rounded-full translate-x-1/3 translate-y-1/3 opacity-35 pointer-events-none"
          style={{ background: "radial-gradient(circle,#F5E6D8,transparent 70%)" }} />

        <SectionReveal direction="none">
          <div className="max-w-2xl mx-auto text-center relative z-10 px-2">
            <span className="text-xs tracking-widest uppercase block mb-3 sm:mb-4" style={{ color: "#C9A96E" }}>Community</span>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl mb-5 sm:mb-6 leading-tight" style={{ fontFamily: "'TheSeasons','Georgia',serif", color: "#1C1410" }}>
              Stay Connected
            </h2>
            <div className="w-14 h-px mx-auto mb-6 sm:mb-8" style={{ background: "linear-gradient(90deg,transparent,#C9A96E,transparent)" }} />
            <p className="leading-relaxed mb-8 sm:mb-12 text-sm sm:text-[15px]" style={{ color: "#6B5E54" }}>
              Join the Become.ing community. Receive thoughtful reflections, new podcast episodes, book recommendations, and updates delivered directly to your inbox.
            </p>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link href="/newsletter" className="relative overflow-hidden group inline-block text-white text-xs sm:text-sm tracking-widest uppercase px-8 sm:px-12 py-3.5 sm:py-4"
                style={{ background: "linear-gradient(135deg,#5C0511,#8B1A24)" }}>
                <span className="relative z-10">Subscribe Now</span>
                <span className="absolute inset-0 translate-x-full group-hover:translate-x-0 transition-transform duration-300" style={{ background: "#8B1A24" }} />
              </Link>
            </motion.div>
          </div>
        </SectionReveal>
      </section>
    </>
  );
}
