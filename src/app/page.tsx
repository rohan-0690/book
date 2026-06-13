"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import SectionReveal from "@/components/SectionReveal";
import BlogCard from "@/components/BlogCard";
import { blogPosts, podcastEpisodes, books, artworks } from "@/lib/data";
import { Play, BookOpen, ArrowRight, Headphones } from "lucide-react";

import type { Variants } from "framer-motion";

/* ─── Stagger container helpers ─── */
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } },
};
const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1, ease: "easeOut" } },
};

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const featuredPost = blogPosts.find((p) => p.featured);
  const recentPosts = blogPosts.filter((p) => !p.featured).slice(0, 3);
  const latestEpisode = podcastEpisodes[0];
  const featuredBooks = books.slice(0, 4);
  const featuredArt = artworks.slice(0, 4);

  const [hoveredBook, setHoveredBook] = useState<number | null>(null);
  const [hoveredArt, setHoveredArt] = useState<number | null>(null);

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#1a1010]">
        {/* Parallax background */}
        <motion.div className="absolute inset-0 z-0 scale-110" style={{ y: imgY }}>
          <Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1800&q=85"
            alt="Become.ing — a journey of becoming"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </motion.div>

        {/* Gradient layers */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#70090F]/20 via-[#1a1010]/55 to-[#1a1010]/90" />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#1a1010]/30 via-transparent to-[#1a1010]/30" />

        {/* Animated grain texture overlay */}
        <div className="absolute inset-0 z-10 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")", backgroundSize: "200px 200px" }}
        />

        {/* Hero content */}
        <motion.div
          className="relative z-20 max-w-4xl mx-auto px-6 text-center"
          style={{ y: textY, opacity }}
        >
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            {/* Eyebrow */}
            <motion.div variants={fadeIn} className="flex items-center justify-center gap-3 mb-8">
              <motion.span className="h-px w-10 bg-[#FFE9DF]/40" />
              <span className="text-[#FFE9DF]/70 text-xs tracking-[0.35em] uppercase">
                Welcome to Become.ing
              </span>
              <motion.span className="h-px w-10 bg-[#FFE9DF]/40" />
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-white leading-[1.05] mb-8"
              style={{ fontFamily: "'TheSeasons', 'Georgia', serif" }}
            >
              Midlife is not
              <br />
              an ending.
              <br />
              <motion.span
                className="italic text-[#FFE9DF]"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              >
                It is a becoming.
              </motion.span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              variants={fadeUp}
              className="text-lg md:text-xl text-white/60 leading-relaxed mb-14 max-w-2xl mx-auto"
            >
              A thoughtful space for reflection, creativity, reinvention,
              and meaningful connection.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/blogs"
                  className="relative overflow-hidden group inline-block bg-[#70090F] text-white text-sm tracking-widest uppercase px-10 py-4"
                >
                  <span className="relative z-10">Explore Stories</span>
                  <span className="absolute inset-0 bg-[#560008] translate-x-full group-hover:translate-x-0 transition-transform duration-400 ease-out" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/newsletter"
                  className="inline-block border border-white/40 text-white text-sm tracking-widest uppercase px-10 py-4 hover:bg-white/10 transition-colors duration-300"
                >
                  Join Our Community
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
        >
          <span className="text-white/40 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <motion.div
            className="w-px h-12 bg-gradient-to-b from-white/60 to-transparent"
            animate={{ scaleY: [1, 0.4, 1], opacity: [0.6, 0.2, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </section>

      {/* ── ABOUT PREVIEW ─────────────────────────────────── */}
      <section className="bg-[#F8F6E7] py-28 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Text */}
            <SectionReveal direction="right">
              <span className="text-xs tracking-widest uppercase text-[#70090F] block mb-4">
                About Become.ing
              </span>
              <h2
                className="text-4xl lg:text-5xl text-[#2C2C2C] mb-8 leading-tight"
                style={{ fontFamily: "'TheSeasons', 'Georgia', serif" }}
              >
                A movement for those brave enough to begin again
              </h2>
              <p className="text-[#4A4A4A] leading-relaxed mb-5 text-[15px]">
                Become.ing is a premium editorial community for individuals
                navigating the beautiful, complex terrain of midlife. We believe
                that this season — full of transition, introspection, and
                reinvention — is not a diminishment but an unfolding.
              </p>
              <p className="text-[#4A4A4A] leading-relaxed mb-10 text-[15px]">
                Here you will find stories, conversations, art, and wisdom to
                guide your journey. This is your home for becoming.
              </p>
              <motion.div whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 300 }}>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-sm tracking-widest uppercase text-[#70090F] border-b border-[#70090F] pb-0.5 hover:text-[#560008] hover:border-[#560008] transition-colors"
                >
                  Learn More <ArrowRight size={14} />
                </Link>
              </motion.div>
            </SectionReveal>

            {/* Image stack */}
            <SectionReveal direction="left" delay={150}>
              <div className="relative">
                <motion.div
                  className="relative aspect-[4/5] overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image
                    src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80"
                    alt="Become.ing community"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  {/* Burgundy tint on hover */}
                  <motion.div
                    className="absolute inset-0 bg-[#70090F]/0 hover:bg-[#70090F]/10 transition-colors duration-500"
                  />
                </motion.div>
                {/* Decorative blocks */}
                <motion.div
                  className="absolute -bottom-6 -left-6 w-36 h-36 bg-[#FFE9DF] -z-10"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                />
                <motion.div
                  className="absolute -top-6 -right-6 w-20 h-20 border border-[#70090F]/25"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                />
                {/* Floating stat */}
                <motion.div
                  className="absolute -right-4 bottom-16 bg-[#70090F] text-white px-5 py-4 shadow-xl"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  <p className="text-2xl font-light" style={{ fontFamily: "'TheSeasons', 'Georgia', serif" }}>10K+</p>
                  <p className="text-xs tracking-widest uppercase text-white/70 mt-0.5">Community Members</p>
                </motion.div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── QUOTE ─────────────────────────────────────────── */}
      <section className="bg-[#70090F] py-24 px-6 overflow-hidden relative">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #FFE9DF 0%, transparent 50%), radial-gradient(circle at 80% 50%, #FFE9DF 0%, transparent 50%)" }}
        />
        <SectionReveal direction="none">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              className="text-5xl text-[#FFE9DF]/20 mb-4 select-none"
              style={{ fontFamily: "'TheSeasons', 'Georgia', serif" }}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              &ldquo;
            </motion.div>
            <blockquote
              className="text-3xl md:text-4xl lg:text-[2.6rem] text-white leading-[1.3] italic font-light"
              style={{ fontFamily: "'TheSeasons', 'Georgia', serif" }}
            >
              The privilege of a lifetime is to become who you truly are.
            </blockquote>
            <motion.div
              className="mt-8 flex items-center justify-center gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <span className="h-px w-8 bg-white/30" />
              <cite className="text-sm tracking-widest uppercase text-white/50 not-italic">
                Carl Jung
              </cite>
              <span className="h-px w-8 bg-white/30" />
            </motion.div>
          </div>
        </SectionReveal>
      </section>

      {/* ── FEATURED BLOGS ────────────────────────────────── */}
      <section className="bg-[#F8F6E7] py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionReveal>
            <div className="flex items-end justify-between mb-14">
              <div>
                <motion.span
                  className="text-xs tracking-widest uppercase text-[#70090F] block mb-3"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  From the Journal
                </motion.span>
                <h2
                  className="text-4xl lg:text-5xl text-[#2C2C2C]"
                  style={{ fontFamily: "'TheSeasons', 'Georgia', serif" }}
                >
                  Stories &amp; Reflections
                </h2>
              </div>
              <motion.div whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 300 }}>
                <Link
                  href="/blogs"
                  className="hidden md:inline-flex items-center gap-2 text-sm tracking-widest uppercase text-[#70090F] border-b border-[#70090F] pb-0.5 hover:text-[#560008] transition-colors"
                >
                  All Articles <ArrowRight size={14} />
                </Link>
              </motion.div>
            </div>
          </SectionReveal>

          {featuredPost && (
            <SectionReveal delay={100}>
              <div className="mb-8">
                <BlogCard post={featuredPost} featured />
              </div>
            </SectionReveal>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentPosts.map((post, i) => (
              <SectionReveal key={post.id} delay={i * 120}>
                <BlogCard post={post} />
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATISTICS STRIP ──────────────────────────────── */}
      <section className="bg-[#FFE9DF] py-16 px-6 border-y border-[#70090F]/10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "10K+", label: "Community Members" },
            { value: "50+", label: "Articles Published" },
            { value: "24", label: "Podcast Episodes" },
            { value: "8+", label: "Artists Featured" },
          ].map((stat, i) => (
            <SectionReveal key={stat.label} delay={i * 80}>
              <div>
                <p
                  className="text-4xl text-[#70090F] mb-1"
                  style={{ fontFamily: "'TheSeasons', 'Georgia', serif" }}
                >
                  {stat.value}
                </p>
                <p className="text-xs tracking-widest uppercase text-[#4A4A4A]">{stat.label}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* ── LATEST PODCAST ────────────────────────────────── */}
      <section className="bg-[#F8F6E7] py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionReveal>
            <div className="flex items-end justify-between mb-14">
              <div>
                <span className="text-xs tracking-widest uppercase text-[#70090F] block mb-3">
                  Latest Episode
                </span>
                <h2
                  className="text-4xl lg:text-5xl text-[#2C2C2C]"
                  style={{ fontFamily: "'TheSeasons', 'Georgia', serif" }}
                >
                  The Become.ing Podcast
                </h2>
              </div>
              <motion.div whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 300 }}>
                <Link
                  href="/podcast"
                  className="hidden md:inline-flex items-center gap-2 text-sm tracking-widest uppercase text-[#70090F] border-b border-[#70090F] pb-0.5 hover:text-[#560008] transition-colors"
                >
                  All Episodes <ArrowRight size={14} />
                </Link>
              </motion.div>
            </div>
          </SectionReveal>

          <SectionReveal delay={100}>
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white overflow-hidden shadow-lg"
              whileHover={{ boxShadow: "0 20px 60px rgba(112,9,15,0.12)" }}
              transition={{ duration: 0.4 }}
            >
              <div className="relative aspect-square lg:aspect-auto overflow-hidden">
                <Image
                  src={latestEpisode.image}
                  alt={latestEpisode.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-[#2C2C2C]/35 flex items-center justify-center">
                  <motion.div
                    className="w-20 h-20 rounded-full bg-[#70090F] flex items-center justify-center cursor-pointer shadow-2xl"
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {/* Pulsing ring */}
                    <motion.span
                      className="absolute w-20 h-20 rounded-full border-2 border-white/50"
                      animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                    />
                    <Play size={26} className="text-white ml-1.5" />
                  </motion.div>
                </div>
                <div className="absolute top-4 left-4 bg-[#70090F] text-white text-xs tracking-widest uppercase px-3 py-1">
                  Episode {latestEpisode.episode}
                </div>
              </div>
              <div className="flex flex-col justify-center p-10 lg:p-14">
                <span className="text-xs tracking-widest uppercase text-[#70090F] mb-4">New Episode</span>
                <h3
                  className="text-2xl lg:text-3xl text-[#2C2C2C] mb-5 leading-snug"
                  style={{ fontFamily: "'TheSeasons', 'Georgia', serif" }}
                >
                  {latestEpisode.title}
                </h3>
                <p className="text-[#4A4A4A] leading-relaxed mb-4 text-[15px]">
                  {latestEpisode.description}
                </p>
                <p className="text-xs text-[#4A4A4A] mb-8">
                  {latestEpisode.date} · {latestEpisode.duration}
                </p>
                <div className="flex flex-wrap gap-3">
                  <motion.a
                    href={latestEpisode.youtubeUrl}
                    className="inline-flex items-center gap-2 bg-[#70090F] text-white text-xs tracking-widest uppercase px-5 py-3 hover:bg-[#560008] transition-colors"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Play size={14} /> Watch on YouTube
                  </motion.a>
                  <motion.a
                    href={latestEpisode.spotifyUrl}
                    className="inline-flex items-center gap-2 border border-[#70090F] text-[#70090F] text-xs tracking-widest uppercase px-5 py-3 hover:bg-[#FFE9DF] transition-colors"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Headphones size={14} /> Listen to Podcast
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </SectionReveal>
        </div>
      </section>

      {/* ── BOOKS ─────────────────────────────────────────── */}
      <section className="bg-[#FFE9DF] py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionReveal>
            <div className="flex items-end justify-between mb-14">
              <div>
                <span className="text-xs tracking-widest uppercase text-[#70090F] block mb-3">Reading List</span>
                <h2
                  className="text-4xl lg:text-5xl text-[#2C2C2C]"
                  style={{ fontFamily: "'TheSeasons', 'Georgia', serif" }}
                >
                  Books We Love
                </h2>
              </div>
              <motion.div whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 300 }}>
                <Link
                  href="/books"
                  className="hidden md:inline-flex items-center gap-2 text-sm tracking-widest uppercase text-[#70090F] border-b border-[#70090F] pb-0.5 hover:text-[#560008] transition-colors"
                >
                  Full Library <ArrowRight size={14} />
                </Link>
              </motion.div>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {featuredBooks.map((book, i) => (
              <SectionReveal key={book.id} delay={i * 80}>
                <motion.div
                  className="group flex flex-col cursor-pointer"
                  onHoverStart={() => setHoveredBook(book.id)}
                  onHoverEnd={() => setHoveredBook(null)}
                >
                  {/* Book with 3D tilt feel */}
                  <motion.div
                    className="relative aspect-[3/4] overflow-hidden mb-4 shadow-lg"
                    animate={{ 
                      y: hoveredBook === book.id ? -8 : 0,
                      boxShadow: hoveredBook === book.id
                        ? "0 20px 40px rgba(112,9,15,0.2)"
                        : "0 4px 16px rgba(0,0,0,0.12)"
                    }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Image
                      src={book.cover}
                      alt={book.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </motion.div>
                  <h4
                    className="text-base text-[#2C2C2C] mb-1 leading-snug"
                    style={{ fontFamily: "'TheSeasons', 'Georgia', serif" }}
                  >
                    {book.title}
                  </h4>
                  <p className="text-xs text-[#70090F] mb-3">{book.author}</p>
                  <motion.a
                    href={book.amazonUrl}
                    className="mt-auto inline-flex items-center gap-1 text-xs tracking-widest uppercase text-[#4A4A4A] hover:text-[#70090F] transition-colors"
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <BookOpen size={12} /> Buy Now
                  </motion.a>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── ART GALLERY ───────────────────────────────────── */}
      <section className="bg-[#1e1515] py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionReveal>
            <div className="flex items-end justify-between mb-14">
              <div>
                <span className="text-xs tracking-widest uppercase text-[#FFE9DF]/50 block mb-3">Art Collective</span>
                <h2
                  className="text-4xl lg:text-5xl text-white"
                  style={{ fontFamily: "'TheSeasons', 'Georgia', serif" }}
                >
                  From the Gallery
                </h2>
              </div>
              <motion.div whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 300 }}>
                <Link
                  href="/art"
                  className="hidden md:inline-flex items-center gap-2 text-sm tracking-widest uppercase text-[#FFE9DF] border-b border-[#FFE9DF] pb-0.5 hover:text-[#FFE9DF]/70 transition-colors"
                >
                  Explore Gallery <ArrowRight size={14} />
                </Link>
              </motion.div>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {featuredArt.map((artwork, i) => (
              <SectionReveal key={artwork.id} delay={i * 80}>
                <motion.div
                  className="group relative overflow-hidden cursor-pointer"
                  style={{ aspectRatio: i % 2 === 0 ? "3/4" : "1/1" }}
                  onHoverStart={() => setHoveredArt(artwork.id)}
                  onHoverEnd={() => setHoveredArt(null)}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image
                    src={artwork.image}
                    alt={artwork.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-108"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <AnimatePresence>
                    {hoveredArt === artwork.id && (
                      <motion.div
                        className="absolute inset-0 bg-[#70090F]/70 flex flex-col items-center justify-center p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.p
                          className="text-white text-center text-lg mb-1"
                          style={{ fontFamily: "'TheSeasons', 'Georgia', serif" }}
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.05 }}
                        >
                          {artwork.title}
                        </motion.p>
                        <motion.p
                          className="text-white/70 text-xs text-center"
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.1 }}
                        >
                          {artwork.artist} · {artwork.medium}
                        </motion.p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ────────────────────────────────────── */}
      <section className="bg-[#F8F6E7] py-28 px-6 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-[#FFE9DF] rounded-full -translate-x-1/2 -translate-y-1/2 opacity-60 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FFE9DF] rounded-full translate-x-1/3 translate-y-1/3 opacity-60 pointer-events-none" />

        <SectionReveal direction="none">
          <div className="max-w-2xl mx-auto text-center relative z-10">
            <motion.span
              className="text-xs tracking-widest uppercase text-[#70090F] block mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Community
            </motion.span>
            <h2
              className="text-4xl lg:text-6xl text-[#2C2C2C] mb-6 leading-tight"
              style={{ fontFamily: "'TheSeasons', 'Georgia', serif" }}
            >
              Stay Connected
            </h2>
            <p className="text-[#4A4A4A] leading-relaxed mb-12 text-[15px]">
              Join the Become.ing community. Receive thoughtful reflections, new
              podcast episodes, book recommendations, and updates delivered
              directly to your inbox.
            </p>
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link
                href="/newsletter"
                className="relative overflow-hidden group inline-block bg-[#70090F] text-white text-sm tracking-widest uppercase px-12 py-4"
              >
                <span className="relative z-10">Subscribe Now</span>
                <span className="absolute inset-0 bg-[#560008] translate-x-full group-hover:translate-x-0 transition-transform duration-400 ease-out" />
              </Link>
            </motion.div>
          </div>
        </SectionReveal>
      </section>
    </>
  );
}
