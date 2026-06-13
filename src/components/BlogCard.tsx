"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
}

export default function BlogCard({
  post,
  featured = false,
}: {
  post: BlogPost;
  featured?: boolean;
}) {
  if (featured) {
    return (
      <motion.article
        className="group grid grid-cols-1 lg:grid-cols-2 overflow-hidden"
        style={{ background: "#F5E6D8" }}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ boxShadow: "0 20px 60px rgba(92,5,17,0.13)" }}
      >
        {/* Image — use a real aspect-ratio padding trick so it always has height */}
        <div className="relative w-full overflow-hidden" style={{ paddingBottom: "66.67%" /* 3:2 */ }}>
          <motion.div
            className="absolute inset-0"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
          <div className="absolute top-4 left-4 z-10">
            <span
              className="text-white text-xs tracking-widest uppercase px-3 py-1"
              style={{ background: "linear-gradient(135deg,#5C0511,#8B1A24)" }}
            >
              Featured
            </span>
          </div>
        </div>

        {/* Text */}
        <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-12">
          <span
            className="text-xs tracking-widest uppercase mb-3"
            style={{ color: "#C9A96E" }}
          >
            {post.category}
          </span>
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl mb-4 leading-tight"
            style={{
              fontFamily: "'TheSeasons','Georgia',serif",
              color: "#1C1410",
            }}
          >
            {post.title}
          </h2>
          <p
            className="leading-relaxed mb-6 text-sm sm:text-[15px]"
            style={{ color: "#6B5E54" }}
          >
            {post.excerpt}
          </p>
          <p className="text-xs mb-6" style={{ color: "#6B5E54" }}>
            {post.author}{" "}
            <span style={{ color: "#C9A96E" }}>·</span> {post.date}{" "}
            <span style={{ color: "#C9A96E" }}>·</span> {post.readTime}
          </p>
          <motion.div
            whileHover={{ x: 4 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link
              href={`/blogs/${post.slug}`}
              className="inline-flex items-center gap-2 text-sm tracking-widest uppercase pb-0.5 w-fit transition-colors"
              style={{ color: "#5C0511", borderBottom: "1px solid #C9A96E" }}
            >
              Read More →
            </Link>
          </motion.div>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      className="group flex flex-col overflow-hidden h-full"
      style={{ background: "#fff" }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5, boxShadow: "0 20px 48px rgba(92,5,17,0.10)" }}
    >
      {/* Image — padding-bottom trick guarantees visible height on every device */}
      <div
        className="relative w-full overflow-hidden flex-shrink-0"
        style={{ paddingBottom: "66.67%" /* 3:2 */ }}
      >
        <motion.div
          className="absolute inset-0"
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>
        <div className="absolute top-3 left-3 z-10">
          <span
            className="text-white text-xs tracking-widest uppercase px-2.5 py-1"
            style={{ background: "#5C0511" }}
          >
            {post.category}
          </span>
        </div>
      </div>

      {/* Text */}
      <div className="flex flex-col flex-1 p-5 sm:p-6">
        <h3
          className="text-lg sm:text-xl mb-3 leading-snug group-hover:opacity-75 transition-opacity"
          style={{
            fontFamily: "'TheSeasons','Georgia',serif",
            color: "#1C1410",
          }}
        >
          {post.title}
        </h3>
        <p
          className="text-sm leading-relaxed flex-1 mb-4"
          style={{ color: "#6B5E54" }}
        >
          {post.excerpt}
        </p>
        <div
          className="flex items-center justify-between pt-4"
          style={{ borderTop: "1px solid rgba(201,169,110,0.22)" }}
        >
          <span className="text-xs" style={{ color: "#6B5E54" }}>
            {post.date}
          </span>
          <motion.div
            whileHover={{ x: 3 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link
              href={`/blogs/${post.slug}`}
              className="text-xs tracking-widest uppercase transition-colors"
              style={{ color: "#5C0511" }}
            >
              Read More →
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
}
