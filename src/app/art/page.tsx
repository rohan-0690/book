"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { artworks } from "@/lib/data";
import { X, MessageCircle, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";

const artists = ["All", ...Array.from(new Set(artworks.map((a) => a.artist)))];

// Fixed height ratios per position so masonry has variety
const heightMap = [133, 100, 120, 110, 133, 100, 120, 133, 100];

export default function ArtPage() {
  const [activeArtist, setActiveArtist] = useState("All");
  const [selected, setSelected] = useState<(typeof artworks)[0] | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const filtered =
    activeArtist === "All"
      ? artworks
      : artworks.filter((a) => a.artist === activeArtist);

  const currentIndex = selected ? filtered.findIndex((a) => a.id === selected.id) : -1;
  const goPrev = () => currentIndex > 0 && setSelected(filtered[currentIndex - 1]);
  const goNext = () => currentIndex < filtered.length - 1 && setSelected(filtered[currentIndex + 1]);

  const whatsappUrl = selected
    ? `https://wa.me/?text=${encodeURIComponent(
        `Hello, I would like to enquire about the artwork "${selected.title}" by ${selected.artist}.`
      )}`
    : "#";

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────── */}
      <section
        className="pt-36 sm:pt-40 pb-20 sm:pb-28 px-4 sm:px-6 relative overflow-hidden"
        style={{ background: "#1C1410" }}
      >
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
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg,rgba(92,5,17,0.15) 0%,rgba(28,20,16,0.65) 50%,#1C1410 100%)",
          }}
        />

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            className="flex items-center justify-center gap-3 mb-5 sm:mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="h-px w-8" style={{ background: "rgba(245,230,216,0.3)" }} />
            <span
              className="text-[10px] sm:text-xs tracking-widest uppercase"
              style={{ color: "rgba(245,230,216,0.6)" }}
            >
              Art Collective
            </span>
            <span className="h-px w-8" style={{ background: "rgba(245,230,216,0.3)" }} />
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-7xl text-white leading-tight mb-5 sm:mb-6"
            style={{ fontFamily: "'TheSeasons','Georgia',serif" }}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            Become.ing
            <br />
            <span className="italic" style={{ color: "#E8D5B0" }}>
              Art Collective
            </span>
          </motion.h1>

          <motion.p
            className="text-sm sm:text-lg max-w-xl mx-auto"
            style={{ color: "rgba(250,247,238,0.5)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Original works by women artists exploring identity, transformation,
            and the art of becoming.
          </motion.p>
        </div>
      </section>

      {/* ── FILTER BAR ────────────────────────────────────── */}
      <section
        className="py-5 sm:py-8 px-4 sm:px-6 sticky top-[72px] z-30"
        style={{
          background: "#FAF7EE",
          borderBottom: "1px solid rgba(92,5,17,0.1)",
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-wrap gap-2 justify-center">
          {artists.map((artist) => (
            <motion.button
              key={artist}
              onClick={() => setActiveArtist(artist)}
              className="text-[10px] sm:text-xs tracking-widest uppercase px-3 sm:px-4 py-2 transition-colors duration-200"
              style={
                activeArtist === artist
                  ? { background: "#5C0511", color: "#fff" }
                  : {
                      background: "#fff",
                      color: "#1C1410",
                      border: "1px solid rgba(92,5,17,0.2)",
                    }
              }
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              {artist}
            </motion.button>
          ))}
        </div>
      </section>

      {/* ── MASONRY GALLERY ───────────────────────────────── */}
      <section className="py-10 sm:py-16 px-3 sm:px-6 pb-20 sm:pb-28" style={{ background: "#FAF7EE" }}>
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeArtist}
              className="masonry-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {filtered.map((artwork, i) => {
                const pb = heightMap[i % heightMap.length];
                return (
                  <motion.div
                    key={artwork.id}
                    className="masonry-item"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: (i % 6) * 0.07,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {/*
                      KEY FIX: paddingBottom establishes real height.
                      Image sits absolute inside. No motion wrapper around Image.
                      CSS handles the hover zoom via group-hover:scale-105.
                    */}
                    <div
                      className="relative w-full overflow-hidden cursor-pointer group"
                      style={{ paddingBottom: `${pb}%` }}
                      onClick={() => setSelected(artwork)}
                      onMouseEnter={() => setHoveredId(artwork.id)}
                      onMouseLeave={() => setHoveredId(null)}
                    >
                      {/* Image — CSS zoom only, no motion wrapper */}
                      <Image
                        src={artwork.image}
                        alt={artwork.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />

                      {/* Gold border on hover */}
                      <div
                        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ border: "1px solid rgba(201,169,110,0.55)" }}
                      />

                      {/* Hover overlay */}
                      <AnimatePresence>
                        {hoveredId === artwork.id && (
                          <motion.div
                            className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4"
                            style={{
                              background:
                                "linear-gradient(180deg,rgba(92,5,17,0.75) 0%,rgba(28,20,16,0.9) 100%)",
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.22 }}
                          >
                            <motion.div
                              initial={{ y: 8, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ delay: 0.04 }}
                            >
                              <ZoomIn size={24} className="text-white mb-1" />
                            </motion.div>
                            <motion.p
                              className="text-white text-center text-base sm:text-lg leading-tight"
                              style={{ fontFamily: "'TheSeasons','Georgia',serif" }}
                              initial={{ y: 8, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ delay: 0.09 }}
                            >
                              {artwork.title}
                            </motion.p>
                            <motion.p
                              className="text-center text-xs sm:text-sm"
                              style={{ color: "rgba(201,169,110,0.85)" }}
                              initial={{ y: 8, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ delay: 0.13 }}
                            >
                              {artwork.artist} · {artwork.medium}
                            </motion.p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── LIGHTBOX ──────────────────────────────────────── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            onClick={() => setSelected(null)}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0"
              style={{ background: "rgba(28,20,16,0.93)", backdropFilter: "blur(6px)" }}
            />

            {/* Panel */}
            <motion.div
              className="relative w-full max-w-4xl flex flex-col md:flex-row overflow-hidden shadow-2xl"
              style={{ background: "#FAF7EE", maxHeight: "92dvh" }}
              initial={{ scale: 0.93, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.93, y: 20, opacity: 0 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <motion.button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 z-20 w-9 h-9 flex items-center justify-center text-white transition-colors"
                style={{ background: "#1C1410" }}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Close"
              >
                <X size={15} />
              </motion.button>

              {/* Prev */}
              {currentIndex > 0 && (
                <motion.button
                  onClick={(e) => { e.stopPropagation(); goPrev(); }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center text-white transition-colors"
                  style={{ background: "rgba(0,0,0,0.45)" }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Previous"
                >
                  <ChevronLeft size={18} />
                </motion.button>
              )}

              {/* Next */}
              {currentIndex < filtered.length - 1 && (
                <motion.button
                  onClick={(e) => { e.stopPropagation(); goNext(); }}
                  className="absolute z-20 w-9 h-9 items-center justify-center text-white transition-colors hidden md:flex"
                  style={{
                    background: "rgba(0,0,0,0.45)",
                    right: "calc(320px + 8px)",
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Next"
                >
                  <ChevronRight size={18} />
                </motion.button>
              )}

              {/* Image — paddingBottom for reliable height */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`img-${selected.id}`}
                  className="relative w-full md:flex-1 overflow-hidden flex-shrink-0"
                  style={{ paddingBottom: "75%" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
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

              {/* Info */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`info-${selected.id}`}
                  className="flex flex-col justify-between p-6 sm:p-8 overflow-y-auto flex-shrink-0"
                  style={{ width: "100%", maxWidth: "320px" }}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 }}
                >
                  <div>
                    <span
                      className="text-[10px] sm:text-xs tracking-widest uppercase block mb-3"
                      style={{ color: "#C9A96E" }}
                    >
                      {selected.medium}
                    </span>
                    <h2
                      className="text-2xl sm:text-3xl mb-2 leading-tight"
                      style={{ fontFamily: "'TheSeasons','Georgia',serif", color: "#1C1410" }}
                    >
                      {selected.title}
                    </h2>
                    <p className="text-sm mb-1" style={{ color: "#5C0511" }}>
                      {selected.artist}
                    </p>
                    <p className="text-xs mb-5" style={{ color: "#6B5E54" }}>
                      {selected.width}
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: "#6B5E54" }}>
                      {selected.description}
                    </p>
                  </div>

                  <motion.a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 sm:mt-8 flex items-center justify-center gap-2 text-white text-xs sm:text-sm tracking-widest uppercase px-4 sm:px-6 py-3.5 sm:py-4 transition-colors"
                    style={{ background: "linear-gradient(135deg,#5C0511,#8B1A24)" }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                  >
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
