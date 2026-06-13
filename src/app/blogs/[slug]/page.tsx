import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/lib/data";
import { ArrowLeft } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} — Become.ing`,
    description: post.excerpt,
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] flex items-end overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2C2C2C] via-[#2C2C2C]/40 to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 pb-16 w-full">
          <span className="text-xs tracking-widest uppercase text-[#FFE9DF] bg-[#70090F] px-3 py-1 inline-block mb-4">
            {post.category}
          </span>
          <h1
            className="text-4xl md:text-5xl text-white leading-tight"
            style={{ fontFamily: "'TheSeasons', 'Georgia', serif" }}
          >
            {post.title}
          </h1>
          <div className="flex items-center gap-4 mt-4 text-white/60 text-sm">
            <span>{post.author}</span>
            <span className="text-[#FFE9DF]">·</span>
            <span>{post.date}</span>
            <span className="text-[#FFE9DF]">·</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="bg-[#F8F6E7] py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-sm text-[#70090F] mb-12 hover:text-[#560008] transition-colors"
          >
            <ArrowLeft size={16} /> Back to Journal
          </Link>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-[#2C2C2C] leading-relaxed mb-8 font-medium">
              {post.excerpt}
            </p>
            <p className="text-[#4A4A4A] leading-relaxed mb-6">
              There is a particular kind of courage that only comes with years of
              living — the courage to look honestly at your life, acknowledge what
              no longer serves you, and choose differently. This is not the
              reckless courage of youth. It is something quieter, deeper, and
              altogether more powerful.
            </p>
            <p className="text-[#4A4A4A] leading-relaxed mb-6">
              When we speak of reinvention, we often imagine dramatic gestures —
              the career change, the move to a new city, the dramatic haircut. But
              the most profound reinventions tend to be quieter than that. They
              happen in the moments when we say no to what diminishes us and yes
              to what calls us forward. They happen in therapy rooms, in journals,
              in long conversations with trusted friends. They happen in the
              middle of the night, when the questions that have been waiting
              patiently at the edges of our consciousness finally demand to be
              heard.
            </p>
            <blockquote
              className="border-l-4 border-[#70090F] pl-8 py-2 my-10 text-2xl text-[#2C2C2C] italic"
              style={{ fontFamily: "'TheSeasons', 'Georgia', serif" }}
            >
              "Beginning again is not a failure. It is evidence of wisdom."
            </blockquote>
            <p className="text-[#4A4A4A] leading-relaxed mb-6">
              What makes midlife so fertile for this kind of transformation is
              precisely what makes it so difficult: we have accumulated enough
              experience to see ourselves clearly. The illusions that sustained
              us in our younger years begin to fall away. The pretenses. The
              performances. The endless striving toward goals that may have been
              someone else's all along.
            </p>
            <p className="text-[#4A4A4A] leading-relaxed mb-6">
              This clarity can be terrifying. But it can also be the beginning of
              the most authentic chapter of your life — if you let it.
            </p>
            <p className="text-[#4A4A4A] leading-relaxed">
              The women I admire most are not those who have never been lost. They
              are those who have been lost many times and found their way back —
              each time knowing themselves a little more completely. Each time
              choosing themselves a little more deliberately. That is what it
              means to begin again.
            </p>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="bg-[#FFE9DF] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-3xl text-[#2C2C2C] mb-10"
            style={{ fontFamily: "'TheSeasons', 'Georgia', serif" }}
          >
            Continue Reading
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((p) => (
              <Link key={p.id} href={`/blogs/${p.slug}`} className="group flex flex-col">
                <div className="relative aspect-[4/3] overflow-hidden mb-4">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-3 left-3 bg-[#70090F] text-white text-xs tracking-widest uppercase px-2 py-0.5">
                    {p.category}
                  </div>
                </div>
                <h3
                  className="text-lg text-[#2C2C2C] leading-snug group-hover:text-[#70090F] transition-colors"
                  style={{ fontFamily: "'TheSeasons', 'Georgia', serif" }}
                >
                  {p.title}
                </h3>
                <p className="text-xs text-[#4A4A4A] mt-2">{p.date}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
