"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import SectionReveal from "@/components/SectionReveal";
import { podcastEpisodes } from "@/lib/data";
import { Play, Headphones, Search } from "lucide-react";

const YoutubeIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
  </svg>
);

export default function PodcastPage() {
  const [search, setSearch] = useState("");

  const filtered = podcastEpisodes.filter(
    (ep) =>
      ep.title.toLowerCase().includes(search.toLowerCase()) ||
      ep.description.toLowerCase().includes(search.toLowerCase())
  );

  const featured = filtered.find((ep) => ep.featured);
  const rest = featured ? filtered.filter((ep) => !ep.featured) : filtered;

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────── */}
      <section
        className="relative pt-36 sm:pt-40 pb-20 sm:pb-28 px-4 sm:px-6"
        style={{ background: "#1C1410", minHeight: "360px" }}
      >
        {/* BG image — z-0 */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=1800&q=70"
            alt=""
            fill
            className="object-cover opacity-25"
            sizes="100vw"
            priority
          />
        </div>

        {/* Gradient overlay — z-10 */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(180deg,rgba(28,20,16,0.55) 0%,rgba(28,20,16,0.75) 60%,#1C1410 100%)",
          }}
        />

        {/* Gold top line */}
        <div
          className="absolute top-0 left-0 right-0 z-20 h-px"
          style={{ background: "linear-gradient(90deg,transparent,rgba(201,169,110,0.5),transparent)" }}
        />

        {/* Content — z-20, sits above both */}
        <div className="relative z-20 max-w-4xl mx-auto text-center">
          <motion.div
            className="flex items-center justify-center gap-3 mb-5 sm:mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <span className="h-px w-8" style={{ background: "rgba(201,169,110,0.4)" }} />
            <span
              className="text-[10px] sm:text-xs tracking-widest uppercase"
              style={{ color: "rgba(201,169,110,0.7)" }}
            >
              Media
            </span>
            <span className="h-px w-8" style={{ background: "rgba(201,169,110,0.4)" }} />
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-5 sm:mb-6"
            style={{ fontFamily: "'TheSeasons','Georgia',serif" }}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            Podcast &amp; YouTube
          </motion.h1>

          <motion.p
            className="text-sm sm:text-lg max-w-xl mx-auto mb-8 sm:mb-10"
            style={{ color: "rgba(250,247,238,0.55)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65, duration: 0.6 }}
          >
            Conversations about midlife, reinvention, creativity, and the art of becoming.
          </motion.p>

          {/* Platform buttons */}
          <motion.div
            className="flex flex-wrap gap-3 justify-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            {[
              { label: "Spotify",       icon: <Headphones size={15} /> },
              { label: "Apple Podcasts", icon: <Headphones size={15} /> },
              { label: "YouTube",        icon: <YoutubeIcon size={15} /> },
            ].map((p) => (
              <a
                key={p.label}
                href="#"
                className="inline-flex items-center gap-2 text-xs tracking-widest uppercase px-4 sm:px-5 py-2.5 sm:py-3 transition-all duration-200"
                style={{
                  border: "1px solid rgba(201,169,110,0.35)",
                  color: "rgba(250,247,238,0.7)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#C9A96E";
                  e.currentTarget.style.color = "#E8D5B0";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(201,169,110,0.35)";
                  e.currentTarget.style.color = "rgba(250,247,238,0.7)";
                }}
              >
                {p.icon} {p.label}
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SEARCH ────────────────────────────────────────── */}
      <section
        className="py-5 sm:py-7 px-4 sm:px-6 sticky top-[72px] z-30"
        style={{
          background: "#FAF7EE",
          borderBottom: "1px solid rgba(92,5,17,0.1)",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="relative max-w-md">
            <Search
              size={15}
              className="absolute left-4 top-1/2 -translate-y-1/2"
              style={{ color: "rgba(92,5,17,0.45)" }}
            />
            <input
              type="text"
              placeholder="Search episodes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-sm pl-10 pr-4 py-3 focus:outline-none transition-colors"
              style={{
                background: "#fff",
                border: "1px solid rgba(92,5,17,0.18)",
                color: "#1C1410",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#5C0511")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(92,5,17,0.18)")}
            />
          </div>
        </div>
      </section>

      {/* ── FEATURED EPISODE ──────────────────────────────── */}
      {featured && (
        <section className="py-12 sm:py-16 px-4 sm:px-6" style={{ background: "#F5E6D8" }}>
          <div className="max-w-7xl mx-auto">
            <SectionReveal>
              <span
                className="text-xs tracking-widest uppercase block mb-6 sm:mb-8"
                style={{ color: "#C9A96E" }}
              >
                Latest Episode
              </span>

              <div
                className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden shadow-lg"
                style={{ background: "#FAF7EE" }}
              >
                {/* Episode image */}
                <div className="relative w-full overflow-hidden" style={{ paddingBottom: "66%" }}>
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  {/* Play button overlay */}
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ background: "rgba(28,20,16,0.3)" }}
                  >
                    <motion.div
                      className="relative w-16 sm:w-20 h-16 sm:h-20 rounded-full flex items-center justify-center cursor-pointer shadow-2xl"
                      style={{ background: "linear-gradient(135deg,#5C0511,#8B1A24)" }}
                      whileHover={{ scale: 1.12 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.span
                        className="absolute w-16 sm:w-20 h-16 sm:h-20 rounded-full"
                        style={{ border: "2px solid rgba(201,169,110,0.55)" }}
                        animate={{ scale: [1, 1.6], opacity: [0.55, 0] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                      />
                      <Play size={22} className="text-white ml-1" />
                    </motion.div>
                  </div>
                  {/* Episode badge */}
                  <div
                    className="absolute top-3 left-3 text-white text-[10px] sm:text-xs tracking-widest uppercase px-2.5 sm:px-3 py-1"
                    style={{ background: "linear-gradient(135deg,#5C0511,#8B1A24)" }}
                  >
                    Episode {featured.episode}
                  </div>
                </div>

                {/* Episode info */}
                <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
                  <span
                    className="text-xs tracking-widest uppercase mb-3 sm:mb-4"
                    style={{ color: "#C9A96E" }}
                  >
                    New Episode
                  </span>
                  <h2
                    className="text-2xl sm:text-3xl mb-4 sm:mb-5 leading-snug"
                    style={{ fontFamily: "'TheSeasons','Georgia',serif", color: "#1C1410" }}
                  >
                    {featured.title}
                  </h2>
                  <p
                    className="leading-relaxed mb-3 sm:mb-4 text-sm sm:text-[15px]"
                    style={{ color: "#6B5E54" }}
                  >
                    {featured.description}
                  </p>
                  <p className="text-xs mb-6 sm:mb-8" style={{ color: "#C9A96E" }}>
                    {featured.date} · {featured.duration}
                  </p>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    <a
                      href={featured.youtubeUrl}
                      className="inline-flex items-center gap-2 text-white text-xs tracking-widest uppercase px-4 sm:px-5 py-2.5 sm:py-3 transition-colors hover:opacity-90"
                      style={{ background: "linear-gradient(135deg,#5C0511,#8B1A24)" }}
                    >
                      <YoutubeIcon size={13} /> Watch on YouTube
                    </a>
                    <a
                      href={featured.spotifyUrl}
                      className="inline-flex items-center gap-2 text-xs tracking-widest uppercase px-4 sm:px-5 py-2.5 sm:py-3 transition-colors"
                      style={{ border: "1px solid #C9A96E", color: "#5C0511" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#F5E6D8")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <Headphones size={13} /> Listen
                    </a>
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>
        </section>
      )}

      {/* ── ALL EPISODES ──────────────────────────────────── */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 pb-20 sm:pb-28" style={{ background: "#FAF7EE" }}>
        <div className="max-w-7xl mx-auto">
          <SectionReveal>
            <h2
              className="text-2xl sm:text-3xl mb-8 sm:mb-10"
              style={{ fontFamily: "'TheSeasons','Georgia',serif", color: "#1C1410" }}
            >
              All Episodes
            </h2>
          </SectionReveal>

          <div className="flex flex-col gap-3 sm:gap-4">
            {rest.map((episode, i) => (
              <SectionReveal key={episode.id} delay={i * 55}>
                <div
                  className="group grid gap-4 sm:gap-6 p-4 sm:p-6 transition-colors duration-300"
                  style={{
                    gridTemplateColumns: "80px 1fr",
                    background: "rgba(255,255,255,0.65)",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#F5E6D8")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.65)")}
                >
                  {/* Thumbnail */}
                  <div
                    className="relative flex-shrink-0 overflow-hidden"
                    style={{ width: "80px", height: "80px" }}
                  >
                    <Image
                      src={episode.image}
                      alt={episode.title}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: "rgba(28,20,16,0.35)" }}>
                      <Play size={18} className="text-white" />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-1.5">
                        <span
                          className="text-[10px] sm:text-xs tracking-widest uppercase"
                          style={{ color: "#C9A96E" }}
                        >
                          Ep. {episode.episode}
                        </span>
                        <span className="text-[10px] sm:text-xs" style={{ color: "#6B5E54" }}>
                          {episode.date} · {episode.duration}
                        </span>
                      </div>
                      <h3
                        className="text-base sm:text-xl mb-1.5 sm:mb-2 leading-snug"
                        style={{ fontFamily: "'TheSeasons','Georgia',serif", color: "#1C1410" }}
                      >
                        {episode.title}
                      </h3>
                      <p
                        className="text-xs sm:text-sm leading-relaxed line-clamp-2"
                        style={{ color: "#6B5E54" }}
                      >
                        {episode.description}
                      </p>
                    </div>
                    <div className="flex gap-2 sm:gap-3 mt-3">
                      <a
                        href={episode.youtubeUrl}
                        className="inline-flex items-center gap-1.5 text-white text-[10px] sm:text-xs tracking-widest uppercase px-3 sm:px-4 py-2 transition-colors hover:opacity-85"
                        style={{ background: "#5C0511" }}
                      >
                        <YoutubeIcon size={11} /> YouTube
                      </a>
                      <a
                        href={episode.spotifyUrl}
                        className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs tracking-widest uppercase px-3 sm:px-4 py-2 transition-colors"
                        style={{ border: "1px solid rgba(92,5,17,0.35)", color: "#5C0511" }}
                        onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#5C0511")}
                        onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(92,5,17,0.35)")}
                      >
                        <Headphones size={11} /> Listen
                      </a>
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
