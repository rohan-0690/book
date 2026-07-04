"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface Post {
  id: number; slug: string; title: string; excerpt: string;
  category: string; author: string; date: string; readTime: string;
  image: string; featured?: boolean;
}

export default function BlogCard({ post, featured = false }: { post: Post; featured?: boolean }) {
  if (featured) {
    return (
      <article className="group grid grid-cols-1 lg:grid-cols-2 overflow-hidden"
        style={{ background: "#FFE9DF" }}>
        <div className="relative overflow-hidden" style={{ height: "320px" }}>
          <Image src={post.image} alt={post.title} fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width:1024px) 100vw, 50vw" />
          <div className="absolute top-4 left-4 z-10">
            <span className="text-white text-xs tracking-widest uppercase px-3 py-1"
              style={{ background: "#70090F" }}>Featured</span>
          </div>
        </div>
        <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-12">
          <span className="text-xs tracking-widest uppercase mb-3" style={{ color: "#70090F" }}>{post.category}</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl mb-4 leading-tight"
            style={{ fontFamily: "'TheSeasons',Georgia,serif", color: "#2C2C2C" }}>{post.title}</h2>
          <p className="leading-relaxed mb-6 text-sm sm:text-[15px]" style={{ color: "#4A4A4A" }}>{post.excerpt}</p>
          <p className="text-xs mb-6" style={{ color: "#4A4A4A" }}>
            {post.author}<span className="mx-2" style={{ color: "#70090F" }}>·</span>
            {post.date}<span className="mx-2" style={{ color: "#70090F" }}>·</span>{post.readTime}
          </p>
          <Link href={`/blogs/${post.slug}`}
            className="inline-flex items-center gap-2 text-sm tracking-widest uppercase pb-0.5 w-fit hover:opacity-70 transition-opacity"
            style={{ color: "#70090F", borderBottom: "1px solid #70090F" }}>
            Read More →
          </Link>
        </div>
      </article>
    );
  }

  return (
    <motion.article className="group flex flex-col overflow-hidden h-full"
      style={{ background: "#ffffff" }}
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: .7, ease: [.22, 1, .36, 1] }}
      whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(112,9,15,.1)" }}>
      <div className="relative flex-shrink-0 overflow-hidden" style={{ height: "220px" }}>
        <Image src={post.image} alt={post.title} fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width:640px) 100vw, (max-width:1200px) 50vw, 33vw" />
        <div className="absolute top-3 left-3 z-10">
          <span className="text-white text-xs tracking-widest uppercase px-2.5 py-1"
            style={{ background: "#70090F" }}>{post.category}</span>
        </div>
      </div>
      <div className="flex flex-col flex-1 p-5 sm:p-6">
        <h3 className="text-lg sm:text-xl mb-3 leading-snug group-hover:opacity-70 transition-opacity"
          style={{ fontFamily: "'TheSeasons',Georgia,serif", color: "#2C2C2C" }}>{post.title}</h3>
        <p className="text-sm leading-relaxed flex-1 mb-4" style={{ color: "#4A4A4A" }}>{post.excerpt}</p>
        <div className="flex items-center justify-between pt-4"
          style={{ borderTop: "1px solid rgba(112,9,15,.12)" }}>
          <span className="text-xs" style={{ color: "#4A4A4A" }}>{post.date}</span>
          <Link href={`/blogs/${post.slug}`}
            className="text-xs tracking-widest uppercase hover:opacity-60 transition-opacity"
            style={{ color: "#70090F" }}>Read More →</Link>
        </div>
      </div>
    </motion.article>
  );
}
