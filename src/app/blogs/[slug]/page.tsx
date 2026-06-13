import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/lib/data";
import { ArrowLeft } from "lucide-react";

interface Props { params: Promise<{slug:string}>; }

export async function generateStaticParams() {
  return blogPosts.map(p=>({ slug:p.slug }));
}
export async function generateMetadata({ params }:Props) {
  const { slug } = await params;
  const post = blogPosts.find(p=>p.slug===slug);
  if (!post) return {};
  return { title:`${post.title} — Become.ing`, description:post.excerpt };
}

export default async function BlogPost({ params }:Props) {
  const { slug } = await params;
  const post = blogPosts.find(p=>p.slug===slug);
  if (!post) notFound();

  const related = blogPosts.filter(p=>p.id!==post.id).slice(0,3);

  return (
    <>
      {/* HERO — proper z-index */}
      <section className="relative pt-36 sm:pt-40 pb-16 sm:pb-20 px-4 sm:px-6" style={{ background:"#1A0A0A", minHeight:"380px" }}>
        <div className="absolute inset-0 z-0">
          <Image src={post.image} alt={post.title} fill className="object-cover" style={{ opacity:.3 }} sizes="100vw" priority />
        </div>
        <div className="absolute inset-0 z-10"
          style={{ background:"linear-gradient(to bottom,rgba(26,10,10,.25),rgba(26,10,10,.92))" }} />
        <div className="relative z-20 max-w-4xl mx-auto w-full">
          <span className="text-white text-xs tracking-widest uppercase px-3 py-1 inline-block mb-5"
            style={{ background:"linear-gradient(135deg,#8B0E18,#A8192A)" }}>{post.category}</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl text-white leading-tight mb-5"
            style={{ fontFamily:"'TheSeasons',Georgia,serif" }}>{post.title}</h1>
          <div className="flex flex-wrap items-center gap-3 text-sm" style={{ color:"rgba(245,239,230,.6)" }}>
            <span>{post.author}</span>
            <span style={{ color:"#D4A853" }}>·</span>
            <span>{post.date}</span>
            <span style={{ color:"#D4A853" }}>·</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-12 sm:py-16 px-4 sm:px-6" style={{ background:"#FDFAF4" }}>
        <div className="max-w-3xl mx-auto">
          <Link href="/blogs" className="inline-flex items-center gap-2 text-sm mb-10 transition-colors"
            style={{ color:"#8B0E18" }}>
            <ArrowLeft size={16} /> Back to Journal
          </Link>
          <div className="prose">
            <p className="text-lg sm:text-xl leading-relaxed mb-8 font-medium" style={{ color:"#1A0A0A" }}>{post.excerpt}</p>
            <p className="leading-relaxed mb-6" style={{ color:"#7A5C52" }}>
              There is a particular kind of courage that only comes with years of living — the courage to look honestly at your life, acknowledge what no longer serves you, and choose differently. This is not the reckless courage of youth. It is something quieter, deeper, and altogether more powerful.
            </p>
            <p className="leading-relaxed mb-6" style={{ color:"#7A5C52" }}>
              When we speak of reinvention, we often imagine dramatic gestures — the career change, the move to a new city, the dramatic haircut. But the most profound reinventions tend to be quieter than that. They happen in the moments when we say no to what diminishes us and yes to what calls us forward.
            </p>
            <blockquote className="border-l-4 pl-8 py-2 my-10 text-2xl italic"
              style={{ fontFamily:"'TheSeasons',Georgia,serif", color:"#1A0A0A", borderColor:"#D4A853" }}>
              "Beginning again is not a failure. It is evidence of wisdom."
            </blockquote>
            <p className="leading-relaxed mb-6" style={{ color:"#7A5C52" }}>
              What makes midlife so fertile for this kind of transformation is precisely what makes it so difficult: we have accumulated enough experience to see ourselves clearly. The illusions that sustained us in our younger years begin to fall away.
            </p>
            <p className="leading-relaxed" style={{ color:"#7A5C52" }}>
              The women I admire most are not those who have never been lost. They are those who have been lost many times and found their way back — each time knowing themselves a little more completely. That is what it means to begin again.
            </p>
          </div>
        </div>
      </section>

      {/* RELATED */}
      <section className="py-16 sm:py-20 px-4 sm:px-6" style={{ background:"#F7EDE4" }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl mb-8 sm:mb-10" style={{ fontFamily:"'TheSeasons',Georgia,serif", color:"#1A0A0A" }}>Continue Reading</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
            {related.map(p=>(
              <Link key={p.id} href={`/blogs/${p.slug}`} className="group flex flex-col">
                <div className="relative w-full overflow-hidden mb-4" style={{ paddingBottom:"66.67%" }}>
                  <Image src={p.image} alt={p.title} fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width:640px) 100vw, 33vw" />
                  <div className="absolute top-3 left-3 text-white text-xs tracking-widest uppercase px-2.5 py-1"
                    style={{ background:"#8B0E18" }}>{p.category}</div>
                </div>
                <h3 className="text-lg leading-snug group-hover:opacity-70 transition-opacity"
                  style={{ fontFamily:"'TheSeasons',Georgia,serif", color:"#1A0A0A" }}>{p.title}</h3>
                <p className="text-xs mt-2" style={{ color:"#7A5C52" }}>{p.date}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
