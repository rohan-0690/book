"use client";

import { useState } from "react";
import Image from "next/image";
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
      {/* Header */}
      <section className="bg-[#2C2C2C] pt-40 pb-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=1800&q=70"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <span className="text-xs tracking-widest uppercase text-[#FFE9DF]/60 block mb-4">
            Media
          </span>
          <h1
            className="text-5xl md:text-6xl text-white leading-tight mb-6"
            style={{ fontFamily: "'TheSeasons', 'Georgia', serif" }}
          >
            Podcast &amp; YouTube
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto mb-10">
            Conversations about midlife, reinvention, creativity, and the art of
            becoming.
          </p>
          {/* Platform links */}
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#"
              className="inline-flex items-center gap-2 border border-white/30 text-white/80 text-xs tracking-widest uppercase px-5 py-3 hover:border-[#FFE9DF] hover:text-[#FFE9DF] transition-colors"
            >
              <Headphones size={16} /> Spotify
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 border border-white/30 text-white/80 text-xs tracking-widest uppercase px-5 py-3 hover:border-[#FFE9DF] hover:text-[#FFE9DF] transition-colors"
            >
              <Headphones size={16} /> Apple Podcasts
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 border border-white/30 text-white/80 text-xs tracking-widest uppercase px-5 py-3 hover:border-[#FFE9DF] hover:text-[#FFE9DF] transition-colors"
            >
              <YoutubeIcon size={16} /> YouTube
            </a>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="bg-[#F8F6E7] py-8 px-6 border-b border-[#70090F]/10 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto">
          <div className="relative max-w-md">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#70090F]/50"
            />
            <input
              type="text"
              placeholder="Search episodes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-[#70090F]/20 text-[#2C2C2C] text-sm pl-10 pr-4 py-3 focus:outline-none focus:border-[#70090F] placeholder:text-[#4A4A4A]/50"
            />
          </div>
        </div>
      </section>

      {/* Featured Episode */}
      {featured && (
        <section className="bg-[#FFE9DF] py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <SectionReveal>
              <span className="text-xs tracking-widest uppercase text-[#70090F] block mb-8">
                Latest Episode
              </span>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white shadow-sm overflow-hidden">
                <div className="relative aspect-square lg:aspect-auto">
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-[#2C2C2C]/20 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-[#70090F] flex items-center justify-center hover:bg-[#560008] transition-colors cursor-pointer shadow-xl">
                      <Play size={28} className="text-white ml-1" />
                    </div>
                  </div>
                  <div className="absolute top-4 left-4 bg-[#70090F] text-white text-xs tracking-widest uppercase px-3 py-1">
                    Episode {featured.episode}
                  </div>
                </div>
                <div className="flex flex-col justify-center p-10 lg:p-14">
                  <h2
                    className="text-3xl text-[#2C2C2C] mb-5 leading-snug"
                    style={{ fontFamily: "'TheSeasons', 'Georgia', serif" }}
                  >
                    {featured.title}
                  </h2>
                  <p className="text-[#4A4A4A] leading-relaxed mb-4">
                    {featured.description}
                  </p>
                  <p className="text-xs text-[#70090F] mb-8">
                    {featured.date} · {featured.duration}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={featured.youtubeUrl}
                      className="inline-flex items-center gap-2 bg-[#70090F] text-white text-xs tracking-widest uppercase px-5 py-3 hover:bg-[#560008] transition-colors"
                    >
                      <YoutubeIcon size={14} /> Watch on YouTube
                    </a>
                    <a
                      href={featured.spotifyUrl}
                      className="inline-flex items-center gap-2 border border-[#70090F] text-[#70090F] text-xs tracking-widest uppercase px-5 py-3 hover:bg-[#FFE9DF] transition-colors"
                    >
                      <Headphones size={14} /> Listen
                    </a>
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>
        </section>
      )}

      {/* All Episodes */}
      <section className="bg-[#F8F6E7] py-16 px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <SectionReveal>
            <h2
              className="text-3xl text-[#2C2C2C] mb-10"
              style={{ fontFamily: "'TheSeasons', 'Georgia', serif" }}
            >
              All Episodes
            </h2>
          </SectionReveal>

          <div className="flex flex-col gap-4">
            {rest.map((episode, i) => (
              <SectionReveal key={episode.id} delay={i * 60}>
                <div className="group grid grid-cols-1 md:grid-cols-[120px_1fr] gap-6 bg-white/60 hover:bg-[#FFE9DF] transition-colors duration-300 p-6">
                  <div className="relative w-28 md:w-auto aspect-square overflow-hidden flex-shrink-0">
                    <Image
                      src={episode.image}
                      alt={episode.title}
                      fill
                      className="object-cover"
                      sizes="120px"
                    />
                    <div className="absolute inset-0 bg-[#2C2C2C]/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <Play size={20} className="text-white" />
                    </div>
                  </div>
                  <div className="flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs tracking-widest uppercase text-[#70090F]">
                          Ep. {episode.episode}
                        </span>
                        <span className="text-xs text-[#4A4A4A]">
                          {episode.date}
                        </span>
                        <span className="text-xs text-[#4A4A4A]">·</span>
                        <span className="text-xs text-[#4A4A4A]">
                          {episode.duration}
                        </span>
                      </div>
                      <h3
                        className="text-xl text-[#2C2C2C] mb-2 leading-snug"
                        style={{ fontFamily: "'TheSeasons', 'Georgia', serif" }}
                      >
                        {episode.title}
                      </h3>
                      <p className="text-sm text-[#4A4A4A] leading-relaxed">
                        {episode.description}
                      </p>
                    </div>
                    <div className="flex gap-3 mt-4">
                      <a
                        href={episode.youtubeUrl}
                        className="inline-flex items-center gap-1.5 bg-[#70090F] text-white text-xs tracking-widest uppercase px-4 py-2 hover:bg-[#560008] transition-colors"
                      >
                        <YoutubeIcon size={12} /> YouTube
                      </a>
                      <a
                        href={episode.spotifyUrl}
                        className="inline-flex items-center gap-1.5 border border-[#70090F]/40 text-[#70090F] text-xs tracking-widest uppercase px-4 py-2 hover:border-[#70090F] transition-colors"
                      >
                        <Headphones size={12} /> Listen
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
