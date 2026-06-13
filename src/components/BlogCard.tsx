"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface Post {
  id:number; slug:string; title:string; excerpt:string;
  category:string; author:string; date:string; readTime:string;
  image:string; featured?:boolean;
}

export default function BlogCard({ post, featured=false }:{ post:Post; featured?:boolean }) {
  if (featured) {
    return (
      <motion.article
        className="group grid grid-cols-1 lg:grid-cols-2 overflow-hidden"
        style={{ background:"#F7EDE4" }}
        initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
        viewport={{ once:true }} transition={{ duration:.8, ease:[.22,1,.36,1] }}
        whileHover={{ boxShadow:"0 20px 60px rgba(139,14,24,.12)" }}>
        {/* Image — paddingBottom guarantees height on all devices */}
        <div className="relative w-full overflow-hidden" style={{ paddingBottom:"66.67%" }}>
          <Image src={post.image} alt={post.title} fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width:1024px) 100vw, 50vw" />
          <div className="absolute top-4 left-4 z-10">
            <span className="text-white text-xs tracking-widest uppercase px-3 py-1"
              style={{ background:"linear-gradient(135deg,#8B0E18,#A8192A)" }}>Featured</span>
          </div>
        </div>
        {/* Text */}
        <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-12">
          <span className="text-xs tracking-widest uppercase mb-3" style={{ color:"#D4A853" }}>{post.category}</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl mb-4 leading-tight"
            style={{ fontFamily:"'TheSeasons',Georgia,serif", color:"#1A0A0A" }}>{post.title}</h2>
          <p className="leading-relaxed mb-6 text-sm sm:text-[15px]" style={{ color:"#7A5C52" }}>{post.excerpt}</p>
          <p className="text-xs mb-6" style={{ color:"#7A5C52" }}>
            {post.author} <span style={{ color:"#D4A853" }}>·</span> {post.date} <span style={{ color:"#D4A853" }}>·</span> {post.readTime}
          </p>
          <motion.div whileHover={{ x:4 }} transition={{ type:"spring", stiffness:300 }}>
            <Link href={`/blogs/${post.slug}`}
              className="inline-flex items-center gap-2 text-sm tracking-widest uppercase pb-0.5 w-fit"
              style={{ color:"#8B0E18", borderBottom:"1px solid #D4A853" }}>
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
      style={{ background:"#fff" }}
      initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true }} transition={{ duration:.75, ease:[.22,1,.36,1] }}
      whileHover={{ y:-5, boxShadow:"0 20px 48px rgba(139,14,24,.1)" }}>
      {/* Image — paddingBottom guarantees height */}
      <div className="relative w-full overflow-hidden flex-shrink-0" style={{ paddingBottom:"66.67%" }}>
        <Image src={post.image} alt={post.title} fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width:640px) 100vw, (max-width:1200px) 50vw, 33vw" />
        <div className="absolute top-3 left-3 z-10">
          <span className="text-white text-xs tracking-widest uppercase px-2.5 py-1"
            style={{ background:"#8B0E18" }}>{post.category}</span>
        </div>
      </div>
      {/* Text */}
      <div className="flex flex-col flex-1 p-5 sm:p-6">
        <h3 className="text-lg sm:text-xl mb-3 leading-snug group-hover:opacity-75 transition-opacity"
          style={{ fontFamily:"'TheSeasons',Georgia,serif", color:"#1A0A0A" }}>{post.title}</h3>
        <p className="text-sm leading-relaxed flex-1 mb-4" style={{ color:"#7A5C52" }}>{post.excerpt}</p>
        <div className="flex items-center justify-between pt-4" style={{ borderTop:"1px solid rgba(212,168,83,.22)" }}>
          <span className="text-xs" style={{ color:"#7A5C52" }}>{post.date}</span>
          <motion.div whileHover={{ x:3 }} transition={{ type:"spring", stiffness:300 }}>
            <Link href={`/blogs/${post.slug}`} className="text-xs tracking-widest uppercase" style={{ color:"#8B0E18" }}>
              Read More →
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
}
