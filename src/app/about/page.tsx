"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import SectionReveal from "@/components/SectionReveal";
import { teamMembers } from "@/lib/data";

const C = { B:"#70090F",B2:"#560008",BL:"#FFE9DF",IV:"#F8F6E7",CH:"#2C2C2C",ST:"#4A4A4A",INK:"#2C2C2C" };

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative pt-36 sm:pt-40 pb-20 sm:pb-28 px-4 sm:px-6" style={{ background:"#1A0A0A", minHeight:"380px" }}>
        <div className="absolute inset-0 z-0">
          <Image src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=1800&q=70"
            alt="" fill className="object-cover" style={{ opacity:.2 }} sizes="100vw" />
        </div>
        <div className="absolute inset-0 z-10"
          style={{ background:"linear-gradient(to bottom,rgba(26,10,10,.55),rgba(26,10,10,.98))" }} />
        <div className="relative z-20 max-w-4xl mx-auto text-center">
          <motion.div className="flex items-center justify-center gap-3 mb-5"
            initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:.3 }}>
            <span className="h-px w-8" style={{ background:"rgba(112,9,15,.4)" }} />
            <span className="text-[10px] tracking-widest uppercase" style={{ color:"rgba(112,9,15,.7)" }}>Our Story</span>
            <span className="h-px w-8" style={{ background:"rgba(112,9,15,.4)" }} />
          </motion.div>
          <motion.h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight"
            style={{ fontFamily:"'TheSeasons',Georgia,serif", color:"#ffffff" }}
            initial={{ opacity:0, y:28 }} animate={{ opacity:1, y:0 }}
            transition={{ delay:.4, duration:.85, ease:[.22,1,.36,1] }}>
            The Women Behind
            <br /><span className="italic" style={{ color:"#FFE9DF" }}>Become.ing</span>
          </motion.h1>
        </div>
      </section>

      {/* FOUNDER */}
      <section className="py-16 sm:py-24 lg:py-28 px-4 sm:px-6 overflow-hidden" style={{ background: C.IV }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-20 items-center">
            <SectionReveal direction="right" className="order-2 lg:order-1">
              <span className="text-xs tracking-widest uppercase block mb-3" style={{ color:"#70090F" }}>Founder</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-5 leading-tight"
                style={{ fontFamily:"'TheSeasons',Georgia,serif", color: C.INK }}>Karishma Chhatrapati</h2>
              <motion.div className="w-14 h-px mb-7" style={{ background:`linear-gradient(90deg,${C.B},transparent)` }}
                initial={{ scaleX:0, originX:0 }} whileInView={{ scaleX:1 }} viewport={{ once:true }} transition={{ delay:.3, duration:.6 }} />
              <p className="leading-relaxed mb-4 text-sm sm:text-[15px]" style={{ color:"#4A4A4A" }}>
                Karishma Chhatrapati is the founder of Become.ing — a movement born from her own journey through the landscape of midlife reinvention. After decades of building a successful career and raising a family, she found herself at an unexpected crossroads: accomplished on the outside, yet yearning for something deeper.
              </p>
              <p className="leading-relaxed mb-8 text-sm sm:text-[15px]" style={{ color:"#4A4A4A" }}>
                Become.ing was created to be the community she wished she had found — a space of warmth, wisdom, and creative possibility for every woman brave enough to begin again.
              </p>
              <blockquote className="border-l-2 pl-6 py-2 text-lg italic"
                style={{ fontFamily:"'TheSeasons',Georgia,serif", color: C.INK, borderColor:"#70090F" }}>
                "I believe every woman contains multitudes — and midlife is the season when we finally have permission to be all of them."
              </blockquote>
            </SectionReveal>
            <SectionReveal direction="left" delay={150} className="order-1 lg:order-2">
              <div className="relative">
                <div className="relative w-full overflow-hidden" style={{ height: "500px" }}>
                  <Image src="https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=800&q=80"
                    alt="Karishma Chhatrapati" fill className="object-cover transition-transform duration-700 hover:scale-105"
                    sizes="(max-width:1024px) 100vw, 50vw" />
                </div>
                <motion.div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 w-36 h-36 -z-10" style={{ background: C.BL }}
                  initial={{ scale:.8, opacity:0 }} whileInView={{ scale:1, opacity:1 }} viewport={{ once:true }} transition={{ delay:.4 }} />
                <motion.div className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 w-20 h-20"
                  style={{ border:`1px solid rgba(112,9,15,.4)` }}
                  initial={{ scale:.8, opacity:0 }} whileInView={{ scale:1, opacity:1 }} viewport={{ once:true }} transition={{ delay:.5 }} />
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ILA */}
      <section className="py-16 sm:py-24 lg:py-28 px-4 sm:px-6 overflow-hidden" style={{ background: C.BL }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-20 items-center">
            <SectionReveal direction="right">
              <div className="relative">
                <div className="relative w-full overflow-hidden" style={{ height: "500px" }}>
                  <Image src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80"
                    alt="Ila" fill className="object-cover transition-transform duration-700 hover:scale-105"
                    sizes="(max-width:1024px) 100vw, 50vw" />
                </div>
                <motion.div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 w-36 h-36 -z-10" style={{ background: C.IV }}
                  initial={{ scale:.8, opacity:0 }} whileInView={{ scale:1, opacity:1 }} viewport={{ once:true }} transition={{ delay:.4 }} />
              </div>
            </SectionReveal>
            <SectionReveal direction="left" delay={150}>
              <span className="text-xs tracking-widest uppercase block mb-3" style={{ color:"#70090F" }}>Become.ing Creative Collective</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-5 leading-tight"
                style={{ fontFamily:"'TheSeasons',Georgia,serif", color: C.INK }}>Ila</h2>
              <motion.div className="w-14 h-px mb-7" style={{ background:`linear-gradient(90deg,${C.B},transparent)` }}
                initial={{ scaleX:0, originX:0 }} whileInView={{ scaleX:1 }} viewport={{ once:true }} transition={{ delay:.3, duration:.6 }} />
              <p className="leading-relaxed mb-4 text-sm sm:text-[15px]" style={{ color:"#4A4A4A" }}>
                Ila is the creative force behind the Become.ing Art Collective — a multi-disciplinary artist whose work lives at the intersection of identity, transformation, and feminine experience.
              </p>
              <p className="leading-relaxed mb-8 text-sm sm:text-[15px]" style={{ color:"#4A4A4A" }}>
                Her creative philosophy is simple yet radical: art is not decoration. It is medicine. The Become.ing Art Collective is her vision of a world where every woman's story is considered worthy of being seen, framed, and celebrated.
              </p>
              <blockquote className="border-l-2 pl-6 py-2 text-lg italic"
                style={{ fontFamily:"'TheSeasons',Georgia,serif", color: C.INK, borderColor:"#70090F" }}>
                "To make art is to insist on your own experience as worthy of expression."
              </blockquote>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden"
        style={{ background:`linear-gradient(135deg,${C.INK} 0%,#2C1810 50%,${C.INK} 100%)` }}>
        <div className="absolute inset-0 opacity-20 pointer-events-none"
          style={{ background:"radial-gradient(ellipse 60% 50% at 50% 50%,rgba(112,9,15,.28),transparent)" }} />
        <SectionReveal direction="none">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <span className="text-xs tracking-widest uppercase block mb-6" style={{ color:"rgba(112,9,15,.6)" }}>Our Mission</span>
            <p className="text-2xl sm:text-3xl md:text-4xl leading-relaxed italic font-light text-white"
              style={{ fontFamily:"'TheSeasons',Georgia,serif" }}>
              To create a world where midlife is recognised as one of the most creatively rich and profoundly important seasons of a human life.
            </p>
          </div>
        </SectionReveal>
      </section>

      {/* TEAM */}
      <section className="py-16 sm:py-24 lg:py-28 px-4 sm:px-6" style={{ background: C.IV }}>
        <div className="max-w-7xl mx-auto">
          <SectionReveal>
            <div className="text-center mb-12 sm:mb-16">
              <span className="text-xs tracking-widest uppercase block mb-3" style={{ color:"#70090F" }}>The Team</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl" style={{ fontFamily:"'TheSeasons',Georgia,serif", color: C.INK }}>
                The People Who Bring It to Life
              </h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {teamMembers.map((m,i)=>(
              <SectionReveal key={m.id} delay={i*80}>
                <motion.div className="flex flex-col items-center text-center p-7 sm:p-8 bg-white cursor-default"
                  whileHover={{ y:-7, boxShadow:"0 20px 48px rgba(112,9,15,.1)" }}
                  transition={{ duration:.4, ease:[.22,1,.36,1] }}>
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden mb-5"
                    style={{ boxShadow:`0 0 0 2px rgba(112,9,15,.3)` }}>
                    <Image src={m.image} alt={m.name} fill className="object-cover" sizes="112px" />
                  </div>
                  <h3 className="text-lg sm:text-xl mb-1" style={{ fontFamily:"'TheSeasons',Georgia,serif", color: C.INK }}>{m.name}</h3>
                  <span className="text-xs tracking-widest uppercase mb-4" style={{ color:"#70090F" }}>{m.role}</span>
                  <p className="text-sm leading-relaxed" style={{ color:"#4A4A4A" }}>{m.bio}</p>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 px-4 sm:px-6" style={{ background: C.BL }}>
        <SectionReveal direction="none">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-5" style={{ fontFamily:"'TheSeasons',Georgia,serif", color: C.INK }}>Join Our Community</h2>
            <p className="leading-relaxed mb-10 text-sm sm:text-[15px]" style={{ color:"#4A4A4A" }}>
              Become part of a thoughtful, inspiring community of women navigating their becoming.
            </p>
            <motion.div whileHover={{ scale:1.04 }} whileTap={{ scale:.97 }}>
              <Link href="/newsletter" className="relative overflow-hidden group inline-block text-white text-xs sm:text-sm tracking-widest uppercase px-8 sm:px-10 py-3.5 sm:py-4"
                style={{ background:`linear-gradient(135deg,${C.B},${C.B2})` }}>
                <span className="relative z-10">Subscribe to Our Newsletter</span>
                <span className="absolute inset-0 translate-x-full group-hover:translate-x-0 transition-transform duration-300" style={{ background: C.B2 }} />
              </Link>
            </motion.div>
          </div>
        </SectionReveal>
      </section>
    </>
  );
}
