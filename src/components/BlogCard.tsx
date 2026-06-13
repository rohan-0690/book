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

interface Props {
  post: BlogPost;
  featured?: boolean;
}

export default function BlogCard({ post, featured = false }: Props) {
  if (featured) {
    return (
      <motion.article
        className="group grid grid-cols-1 lg:grid-cols-2 gap-0 bg-[#FFE9DF] overflow-hidden"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ boxShadow: "0 16px 48px rgba(112,9,15,0.12)" }}
      >
        <div className="relative overflow-hidden aspect-[4/3] lg:aspect-auto">
          <motion.div
            className="absolute inset-0"
            whileHover={{ scale: 1.06 }}
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
          {/* Category badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-[#70090F] text-white text-xs tracking-widest uppercase px-3 py-1">
              Featured
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-center p-10 lg:p-14">
          <span className="text-xs tracking-widest uppercase text-[#70090F] mb-4">
            {post.category}
          </span>
          <h2
            className="text-3xl lg:text-4xl text-[#2C2C2C] mb-5 leading-tight"
            style={{ fontFamily: "'TheSeasons', 'Georgia', serif" }}
          >
            {post.title}
          </h2>
          <p className="text-[#4A4A4A] leading-relaxed mb-8 text-[15px]">{post.excerpt}</p>
          <div className="text-xs text-[#4A4A4A] mb-8">
            <span>{post.author}</span>
            <span className="mx-2 text-[#70090F]">·</span>
            <span>{post.date}</span>
            <span className="mx-2 text-[#70090F]">·</span>
            <span>{post.readTime}</span>
          </div>
          <motion.div whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 300 }}>
            <Link
              href={`/blogs/${post.slug}`}
              className="inline-flex items-center gap-2 text-sm tracking-widest uppercase text-[#70090F] border-b border-[#70090F] pb-0.5 hover:text-[#560008] hover:border-[#560008] transition-colors w-fit"
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
      className="group flex flex-col bg-white overflow-hidden"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, boxShadow: "0 20px 48px rgba(112,9,15,0.10)" }}
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        <motion.div
          className="absolute inset-0"
          whileHover={{ scale: 1.07 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-[#70090F] text-white text-xs tracking-widest uppercase px-3 py-1">
            {post.category}
          </span>
        </div>
      </div>
      <div className="flex flex-col flex-1 p-6">
        <h3
          className="text-xl text-[#2C2C2C] mb-3 leading-snug group-hover:text-[#70090F] transition-colors duration-300"
          style={{ fontFamily: "'TheSeasons', 'Georgia', serif" }}
        >
          {post.title}
        </h3>
        <p className="text-sm text-[#4A4A4A] leading-relaxed flex-1 mb-4">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#70090F]/10">
          <span className="text-xs text-[#4A4A4A]">{post.date}</span>
          <motion.div whileHover={{ x: 3 }} transition={{ type: "spring", stiffness: 300 }}>
            <Link
              href={`/blogs/${post.slug}`}
              className="text-xs tracking-widest uppercase text-[#70090F] hover:text-[#560008] transition-colors"
            >
              Read More →
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
}
