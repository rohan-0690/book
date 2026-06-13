"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SectionReveal from "@/components/SectionReveal";
import BlogCard from "@/components/BlogCard";
import { blogPosts, blogCategories } from "@/lib/data";
import { Search } from "lucide-react";

export default function BlogsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const featuredPost = blogPosts.find((p) => p.featured);

  const filtered = blogPosts.filter((post) => {
    const matchesCategory =
      activeCategory === "All" || post.category === activeCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filtered.length / postsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
    <>
      {/* Header */}
      <section className="bg-[#1C1410] pt-40 pb-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1800&q=70"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <span className="text-xs tracking-widest uppercase text-[#F5E6D8]/60 block mb-4">
            The Journal
          </span>
          <h1
            className="text-5xl md:text-6xl text-white leading-tight mb-6"
            style={{ fontFamily: "'TheSeasons', 'Georgia', serif" }}
          >
            Stories &amp; Reflections
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Thoughtful writing on midlife, creativity, wellness, relationships,
            and reinvention.
          </p>
        </div>
      </section>

      {/* Search + Filter */}
      <section className="bg-[#FAF7EE] py-10 px-6 border-b border-[#5C0511]/10 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 items-center justify-between">
          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5C0511]/50"
            />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-white border border-[#5C0511]/20 text-[#1C1410] text-sm pl-10 pr-4 py-3 focus:outline-none focus:border-[#5C0511] placeholder:text-[#6B5E54]/50"
            />
          </div>
          {/* Categories */}
          <div className="flex flex-wrap gap-2 justify-center">
            {blogCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setCurrentPage(1);
                }}
                className={`text-xs tracking-widest uppercase px-4 py-2 transition-colors ${
                  activeCategory === cat
                    ? "bg-[#5C0511] text-white"
                    : "bg-white text-[#1C1410] border border-[#5C0511]/20 hover:border-[#5C0511] hover:text-[#5C0511]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && activeCategory === "All" && !searchQuery && (
        <section className="bg-[#FAF7EE] py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <SectionReveal>
              <BlogCard post={featuredPost} featured />
            </SectionReveal>
          </div>
        </section>
      )}

      {/* Posts Grid */}
      <section className="bg-[#FAF7EE] py-12 px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          {paginated.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
                {paginated.map((post, i) => (
                  <SectionReveal key={post.id} delay={i * 60}>
                    <BlogCard post={post} />
                  </SectionReveal>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 text-sm transition-colors ${
                          currentPage === page
                            ? "bg-[#5C0511] text-white"
                            : "border border-[#5C0511]/30 text-[#1C1410] hover:border-[#5C0511] hover:text-[#5C0511]"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-[#6B5E54] text-lg">
                No articles found. Try a different search or category.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
