import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { BlogPost } from "@/lib/store";

interface Props { params: Promise<{ slug: string }>; }

// No static params — all pages render on demand (ISR)
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const { data: post } = await supabase
    .from("blog_posts")
    .select("title, excerpt")
    .eq("slug", slug)
    .single();
  if (!post) return {};
  return { title: `${post.title} — Become.ing`, description: post.excerpt };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;

  const { data: post } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .single() as { data: BlogPost | null };

  if (!post) notFound();

  // Related: 3 other posts
  const { data: related } = await supabase
    .from("blog_posts")
    .select("id, slug, title, image, category, date")
    .neq("slug", slug)
    .limit(3);

  // Parse content into paragraphs if present
  const bodyParagraphs = post.content
    ? post.content.split(/\n+/).filter(Boolean)
    : null;

  return (
    <>
      {/* HERO */}
      <section className="relative pt-36 sm:pt-40 pb-16 sm:pb-20 px-4 sm:px-6"
        style={{ background: "#2C1810", minHeight: "380px" }}>
        <div className="absolute inset-0 z-0">
          <Image src={post.image} alt={post.title} fill className="object-cover"
            style={{ opacity: .2 }} sizes="100vw" priority unoptimized />
        </div>
        <div className="absolute inset-0 z-10"
          style={{ background: "linear-gradient(to bottom,rgba(26,10,10,.55),rgba(26,10,10,.97))" }} />
        <div className="relative z-20 max-w-4xl mx-auto w-full">
          <span className="text-white text-xs tracking-widest uppercase px-3 py-1 inline-block mb-5"
            style={{ background: "linear-gradient(135deg,#70090F,#560008)" }}>
            {post.category}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl leading-tight mb-5"
            style={{ fontFamily: "'TheSeasons',Georgia,serif", color: "#ffffff" }}>
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm" style={{ color: "rgba(245,239,230,.6)" }}>
            <span>{post.author}</span>
            <span style={{ color: "#70090F" }}>·</span>
            <span>{post.date}</span>
            <span style={{ color: "#70090F" }}>·</span>
            <span>{post.read_time}</span>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-12 sm:py-16 px-4 sm:px-6" style={{ background: "#F8F6E7" }}>
        <div className="max-w-3xl mx-auto">
          <Link href="/blogs" className="inline-flex items-center gap-2 text-sm mb-10 transition-colors"
            style={{ color: "#70090F" }}>
            <ArrowLeft size={16} /> Back to Journal
          </Link>
          <div className="prose">
            <p className="text-lg sm:text-xl leading-relaxed mb-8 font-medium" style={{ color: "#2C1810" }}>
              {post.excerpt}
            </p>

            {bodyParagraphs ? (
              /* Admin-authored content */
              bodyParagraphs.map((para, i) => (
                <p key={i} className="leading-relaxed mb-6" style={{ color: "#8B6F6A" }}>{para}</p>
              ))
            ) : (
              /* Default placeholder prose for seed posts */
              <>
                <p className="leading-relaxed mb-6" style={{ color: "#8B6F6A" }}>
                  There is a particular kind of courage that only comes with years of living — the courage to look honestly at your life, acknowledge what no longer serves you, and choose differently. This is not the reckless courage of youth. It is something quieter, deeper, and altogether more powerful.
                </p>
                <p className="leading-relaxed mb-6" style={{ color: "#8B6F6A" }}>
                  When we speak of reinvention, we often imagine dramatic gestures — the career change, the move to a new city, the dramatic haircut. But the most profound reinventions tend to be quieter than that. They happen in the moments when we say no to what diminishes us and yes to what calls us forward.
                </p>
                <blockquote className="border-l-4 pl-8 py-2 my-10 text-2xl italic"
                  style={{ fontFamily: "'TheSeasons',Georgia,serif", color: "#2C1810", borderColor: "#70090F" }}>
                  &ldquo;Beginning again is not a failure. It is evidence of wisdom.&rdquo;
                </blockquote>
                <p className="leading-relaxed mb-6" style={{ color: "#8B6F6A" }}>
                  What makes midlife so fertile for this kind of transformation is precisely what makes it so difficult: we have accumulated enough experience to see ourselves clearly.
                </p>
                <p className="leading-relaxed" style={{ color: "#8B6F6A" }}>
                  The women I admire most are not those who have never been lost. They are those who have been lost many times and found their way back — each time knowing themselves a little more completely.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* RELATED */}
      {related && related.length > 0 && (
        <section className="py-16 sm:py-20 px-4 sm:px-6" style={{ background: "#FFE9DF" }}>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl sm:text-3xl mb-8 sm:mb-10"
              style={{ fontFamily: "'TheSeasons',Georgia,serif", color: "#2C1810" }}>
              Continue Reading
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
              {related.map(p => (
                <Link key={p.id} href={`/blogs/${p.slug}`} className="group flex flex-col">
                  <div className="relative w-full overflow-hidden mb-4" style={{ height: "180px" }}>
                    <Image src={p.image} alt={p.title} fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width:640px) 100vw, 33vw" unoptimized />
                    <div className="absolute top-3 left-3 text-white text-xs tracking-widest uppercase px-2.5 py-1"
                      style={{ background: "#70090F" }}>{p.category}</div>
                  </div>
                  <h3 className="text-lg leading-snug group-hover:opacity-70 transition-opacity"
                    style={{ fontFamily: "'TheSeasons',Georgia,serif", color: "#2C1810" }}>{p.title}</h3>
                  <p className="text-xs mt-2" style={{ color: "#8B6F6A" }}>{p.date}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
