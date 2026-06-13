"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import SectionReveal from "@/components/SectionReveal";
import { artworks } from "@/lib/data";
import { X, MessageCircle, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";

const artists = ["All", ...Array.from(new Set(artworks.map((a) => a.artist)))];

export default function ArtPage() {
  const [activeArtist, setActiveArtist] = useState("All");
  const [selected, setSelected] = useState<(typeof artworks)[0] | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const filtered =
    activeArtist === "All"
      ? artworks
      : artworks.filter((a) => a.artist === activeArtist);

  const currentIndex = selected
    ? filtered.findIndex((a) => a.id === selected.id)
    : -1;

  const goPrev = () => {
    if (currentIndex > 0) setSelected(filtered[currentIndex - 1]);
  };
  const goNext = () => {
    if (currentIndex < filtered.length - 1) setSelected(filtered[currentIndex + 1]);
  };

  const whatsappUrl = selected
    ? `https://wa.me/?text=${encodeURIComponent(
        `Hello, I would like to enquire about the artwork "${selected.title}" by ${selected.artist}.`
      )}`
    : "#";

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
            src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1800&q=70"
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
              Art Collective
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
            Become.ing
            <br />
            <span className="italic text-[#FFE9DF]">Art Collective</span>
          </motion.h1>

          <motion.p
            className="text-white/55 text-lg max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75, duration: 0.7 }}
          >
            Original works by women artists exploring identity, transformation,
            and the art of becoming.
          </motion.p>
        </div>
      </section>

      {/* ── FILTER BAR ───────────────────────────────────── */}
      <section className="bg-[#F8F6E7] py-8 px-6 border-b border-[#70090F]/10 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-2 justify-center">
          {artists.map((artist) => (
            <motion.button
              key={artist}
              onClick={() => setActiveArtist(artist)}
              className={`text-xs tracking-widest uppercase px-4 py-2 transition-colors duration-200 ${
                activeArtist === artist
                  ? "bg-[#70090F] text-white"
                  : "bg-white text-[#2C2C2C] border border-[#70090F]/20 hover:border-[#70090F] hover:text-[#70090F]"
              }`}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              {artist}
            </motion.button>
          ))}
        </div>
      </section>

      {/* ── MASONRY GALLERY ──────────────────────────────── */}
      <section className="bg-[#F8F6E7] py-16 px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          {/* 
            NOTE: We deliberately avoid Framer Motion `layout` on a CSS-columns
            container — it breaks the masonry layout. Plain CSS columns + 
            per-item entrance animations is the right approach here.
          */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeArtist}
              className="masonry-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {filtered.map((artwork, i) => (
                <motion.div
                  key={artwork.id}
                  className="masonry-item"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.55,
                    delay: (i % 9) * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {/* Card */}
                  <div
                    className="group relative overflow-hidden cursor-pointer"
                    onClick={() => setSelected(artwork)}
                    onMouseEnter={() => setHoveredId(artwork.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <motion.div
                      animate={{ scale: hoveredId === artwork.id ? 1.04 : 1 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Image
                        src={artwork.image}
                        alt={artwork.title}
                        width={600}
                        height={i % 3 === 0 ? 750 : i % 3 === 1 ? 500 : 620}
                        className="w-full object-cover block"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </motion.div>

                    {/* Hover overlay — plain AnimatePresence, no nested whileHover */}
                    <AnimatePresence>
                      {hoveredId === artwork.id && (
                        <motion.div
                          className="absolute inset-0 bg-[#70090F]/80 flex flex-col items-center justify-center gap-3 p-6"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          <motion.div
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.05 }}
                          >
                            <ZoomIn size={28} className="text-white mb-2" />
                          </motion.div>
                          <motion.p
                            className="text-white text-center text-xl leading-tight"
                            style={{ fontFamily: "'TheSeasons', 'Georgia', serif" }}
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                          >
                            {artwork.title}
                          </motion.p>
                          <motion.p
                            className="text-white/75 text-sm text-center"
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.14 }}
                          >
                            {artwork.artist} · {artwork.medium}
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

      {/* ── LIGHTBOX ─────────────────────────────────────── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelected(null)}
          >
            {/* Backdrop blur */}
            <div className="absolute inset-0 bg-[#1e1010]/92 backdrop-blur-sm" />

            {/* Panel */}
            <motion.div
              className="relative max-w-5xl w-full grid grid-cols-1 md:grid-cols-[1fr_340px] bg-[#F8F6E7] overflow-hidden shadow-2xl"
              style={{ maxHeight: "90vh" }}
              initial={{ scale: 0.93, y: 24, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.93, y: 24, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <motion.button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 z-20 w-9 h-9 bg-[#2C2C2C] text-white flex items-center justify-center hover:bg-[#70090F] transition-colors"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
                aria-label="Close"
              >
                <X size={16} />
              </motion.button>

              {/* Prev button */}
              {currentIndex > 0 && (
                <motion.button
                  onClick={(e) => { e.stopPropagation(); goPrev(); }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-black/50 text-white flex items-center justify-center hover:bg-[#70090F] transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Previous artwork"
                >
                  <ChevronLeft size={20} />
                </motion.button>
              )}

              {/* Next button */}
              {currentIndex < filtered.length - 1 && (
                <motion.button
                  onClick={(e) => { e.stopPropagation(); goNext(); }}
                  className="absolute right-[356px] top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-black/50 text-white items-center justify-center hover:bg-[#70090F] transition-colors hidden md:flex"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Next artwork"
                >
                  <ChevronRight size={20} />
                </motion.button>
              )}

              {/* Artwork image */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`img-${selected.id}`}
                  className="relative min-h-[300px]"
                  style={{ aspectRatio: "1 / 1" }}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  transition={{ duration: 0.35 }}
                >
                  <Image
                    src={selected.image}
                    alt={selected.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 60vw"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Info panel */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`info-${selected.id}`}
                  className="flex flex-col justify-between p-8 overflow-y-auto"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, delay: 0.05 }}
                >
                  <div>
                    <span className="text-xs tracking-widest uppercase text-[#70090F] block mb-3">
                      {selected.medium}
                    </span>
                    <h2
                      className="text-3xl text-[#2C2C2C] mb-2 leading-tight"
                      style={{ fontFamily: "'TheSeasons', 'Georgia', serif" }}
                    >
                      {selected.title}
                    </h2>
                    <p className="text-sm text-[#70090F] mb-1">{selected.artist}</p>
                    <p className="text-xs text-[#4A4A4A] mb-6">{selected.width}</p>
                    <p className="text-sm text-[#4A4A4A] leading-relaxed">
                      {selected.description}
                    </p>
                  </div>

                  <motion.a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 flex items-center justify-center gap-2 bg-[#70090F] text-white text-sm tracking-widest uppercase px-6 py-4 hover:bg-[#560008] transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <MessageCircle size={16} /> Enquire on WhatsApp
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
