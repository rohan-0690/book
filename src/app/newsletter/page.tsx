"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionReveal from "@/components/SectionReveal";
import { CheckCircle2 } from "lucide-react";

const C = { cr:"#8B0E18",crMd:"#A8192A",gold:"#D4A853",goldLt:"#EDD9A3",blush:"#F7EDE4",cream:"#FDFAF4",ink:"#1A0A0A",stone:"#7A5C52" };

const perks = [
  { icon:"✍️", title:"Thoughtful Reflections",  desc:"Essays and meditations on midlife, identity, and the art of becoming." },
  { icon:"🎙️", title:"New Podcast Episodes",    desc:"Be the first to hear conversations that matter, delivered to your inbox." },
  { icon:"📚", title:"Book Recommendations",    desc:"Curated reading lists to inspire, challenge, and nourish your growth." },
  { icon:"🎨", title:"Art & Creativity",         desc:"Featured artworks and creative inspiration from the collective." },
  { icon:"🌿", title:"Community Updates",        desc:"Exclusive events, collaborations, and opportunities to connect." },
];

export default function NewsletterPage() {
  const [name,      setName]      = useState("");
  const [email,     setEmail]     = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name.trim() || !email.trim()) { setError("Please fill in both fields."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("Please enter a valid email address."); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1400));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <>
      {/* HERO — solid bg, no image, so no z-index issue */}
      <section className="relative pt-36 sm:pt-40 pb-20 sm:pb-28 px-4 sm:px-6 overflow-hidden"
        style={{ background:`linear-gradient(135deg,${C.cr} 0%,${C.crMd} 50%,${C.cr} 100%)`, minHeight:"360px" }}>
        {/* soft radial glow */}
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ background:"radial-gradient(ellipse 70% 60% at 50% 50%,#fff,transparent)" }} />
        {/* rotating decorative rings */}
        <motion.div className="absolute top-16 right-16 w-56 sm:w-64 h-56 sm:h-64 rounded-full pointer-events-none"
          style={{ border:"1px solid rgba(255,255,255,.12)" }}
          animate={{ rotate:360 }} transition={{ duration:30, repeat:Infinity, ease:"linear" }} />
        <motion.div className="absolute bottom-8 left-8 w-28 sm:w-32 h-28 sm:h-32 rounded-full pointer-events-none"
          style={{ border:"1px solid rgba(255,255,255,.1)" }}
          animate={{ rotate:-360 }} transition={{ duration:20, repeat:Infinity, ease:"linear" }} />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div className="flex items-center justify-center gap-3 mb-5"
            initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:.3 }}>
            <span className="h-px w-8" style={{ background:"rgba(255,255,255,.3)" }} />
            <span className="text-[10px] tracking-widest uppercase" style={{ color:"rgba(255,255,255,.6)" }}>Community</span>
            <span className="h-px w-8" style={{ background:"rgba(255,255,255,.3)" }} />
          </motion.div>
          <motion.h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-5"
            style={{ fontFamily:"'TheSeasons',Georgia,serif" }}
            initial={{ opacity:0, y:28 }} animate={{ opacity:1, y:0 }}
            transition={{ delay:.4, duration:.85, ease:[.22,1,.36,1] }}>
            Join the Become.ing
            <br /><span className="italic" style={{ color: C.goldLt }}>Community</span>
          </motion.h1>
          <motion.p className="text-sm sm:text-lg max-w-xl mx-auto" style={{ color:"rgba(255,255,255,.62)" }}
            initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:.65 }}>
            Receive thoughtful reflections, new podcast episodes, book recommendations, and updates directly to your inbox.
          </motion.p>
        </div>
      </section>

      {/* FORM + PERKS */}
      <section className="py-16 sm:py-24 px-4 sm:px-6" style={{ background: C.cream }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-start">

          {/* Form card */}
          <SectionReveal direction="right">
            <motion.div className="bg-white p-8 sm:p-12 shadow-sm"
              whileHover={{ boxShadow:"0 16px 48px rgba(139,14,24,.08)" }}>
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div key="success" className="text-center py-8"
                    initial={{ opacity:0, scale:.9 }} animate={{ opacity:1, scale:1 }}
                    transition={{ duration:.5, ease:[.22,1,.36,1] }}>
                    <motion.div initial={{ scale:0 }} animate={{ scale:1 }}
                      transition={{ delay:.2, type:"spring", stiffness:200 }}>
                      <CheckCircle2 size={56} className="mx-auto mb-6" style={{ color: C.cr }} />
                    </motion.div>
                    <h2 className="text-2xl sm:text-3xl mb-4" style={{ fontFamily:"'TheSeasons',Georgia,serif", color: C.ink }}>
                      Welcome to the Community
                    </h2>
                    <p className="text-sm sm:text-base leading-relaxed" style={{ color: C.stone }}>
                      Thank you, <strong>{name}</strong>. You are now part of the Become.ing community. Watch your inbox for thoughtful reflections and updates.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity:1 }} exit={{ opacity:0, y:-10 }}>
                    <h2 className="text-2xl sm:text-3xl mb-2" style={{ fontFamily:"'TheSeasons',Georgia,serif", color: C.ink }}>
                      Subscribe to Our Newsletter
                    </h2>
                    <p className="text-sm leading-relaxed mb-8" style={{ color: C.stone }}>
                      Join thousands of women navigating their most meaningful chapter.
                    </p>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                      <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:.1 }}>
                        <label htmlFor="name" className="text-xs tracking-widest uppercase block mb-2" style={{ color: C.stone }}>
                          Full Name
                        </label>
                        <input id="name" type="text" value={name} onChange={e=>setName(e.target.value)}
                          placeholder="Your full name" required
                          className="w-full text-sm px-4 py-3.5 focus:outline-none transition-colors"
                          style={{ background: C.cream, border:`1px solid rgba(139,14,24,.2)`, color: C.ink }}
                          onFocus={e=>{ e.target.style.borderColor=C.cr; e.target.style.background="#fff"; }}
                          onBlur={e=>{ e.target.style.borderColor="rgba(139,14,24,.2)"; e.target.style.background=C.cream; }} />
                      </motion.div>
                      <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:.18 }}>
                        <label htmlFor="email" className="text-xs tracking-widest uppercase block mb-2" style={{ color: C.stone }}>
                          Email Address
                        </label>
                        <input id="email" type="email" value={email} onChange={e=>setEmail(e.target.value)}
                          placeholder="your@email.com" required
                          className="w-full text-sm px-4 py-3.5 focus:outline-none transition-colors"
                          style={{ background: C.cream, border:`1px solid rgba(139,14,24,.2)`, color: C.ink }}
                          onFocus={e=>{ e.target.style.borderColor=C.cr; e.target.style.background="#fff"; }}
                          onBlur={e=>{ e.target.style.borderColor="rgba(139,14,24,.2)"; e.target.style.background=C.cream; }} />
                      </motion.div>
                      <AnimatePresence>
                        {error && (
                          <motion.p className="text-sm" style={{ color: C.cr }}
                            initial={{ opacity:0, y:-4 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}>
                            {error}
                          </motion.p>
                        )}
                      </AnimatePresence>
                      <motion.button type="submit" disabled={loading}
                        className="relative overflow-hidden text-white text-sm tracking-widest uppercase px-8 py-4 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
                        style={{ background:`linear-gradient(135deg,${C.cr},${C.crMd})` }}
                        whileHover={!loading ? { scale:1.02 } : {}}
                        whileTap={!loading ? { scale:.98 } : {}}>
                        <AnimatePresence mode="wait">
                          {loading ? (
                            <motion.span key="l" className="flex items-center justify-center gap-2"
                              initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>
                              <motion.span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full"
                                animate={{ rotate:360 }} transition={{ duration:.8, repeat:Infinity, ease:"linear" }} />
                              Subscribing...
                            </motion.span>
                          ) : (
                            <motion.span key="i" initial={{ opacity:0 }} animate={{ opacity:1 }}>Subscribe</motion.span>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    </form>
                    <p className="text-xs mt-6" style={{ color:"rgba(122,92,82,.5)" }}>
                      We respect your privacy. Unsubscribe at any time. No spam, ever.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </SectionReveal>

          {/* Perks */}
          <SectionReveal direction="left" delay={150}>
            <span className="text-xs tracking-widest uppercase block mb-5" style={{ color: C.gold }}>What to Expect</span>
            <h2 className="text-3xl sm:text-4xl mb-8 leading-tight"
              style={{ fontFamily:"'TheSeasons',Georgia,serif", color: C.ink }}>
              A letter written just for you
            </h2>
            <div className="flex flex-col gap-6">
              {perks.map((item,i)=>(
                <motion.div key={item.title} className="flex gap-5 items-start group"
                  initial={{ opacity:0, x:20 }} whileInView={{ opacity:1, x:0 }}
                  viewport={{ once:true }} transition={{ delay:i*.08, duration:.5, ease:[.22,1,.36,1] }}
                  whileHover={{ x:4 }}>
                  <div className="text-2xl flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">{item.icon}</div>
                  <div>
                    <h4 className="text-base mb-1 group-hover:opacity-75 transition-opacity"
                      style={{ fontFamily:"'TheSeasons',Georgia,serif", color: C.ink }}>{item.title}</h4>
                    <p className="text-sm leading-relaxed" style={{ color: C.stone }}>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="py-16 sm:py-24 px-4 sm:px-6" style={{ background: C.blush }}>
        <SectionReveal direction="none">
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-5xl sm:text-7xl mb-1 select-none"
              style={{ fontFamily:"'TheSeasons',Georgia,serif", color:`rgba(139,14,24,.2)` }}>&ldquo;</div>
            <blockquote className="text-2xl sm:text-3xl italic leading-relaxed font-light"
              style={{ fontFamily:"'TheSeasons',Georgia,serif", color: C.ink }}>
              Become.ing is the only newsletter I read word for word, every single time. It&apos;s like a letter from a wise friend who sees you exactly as you are.
            </blockquote>
            <div className="mt-8 flex items-center justify-center gap-4">
              <span className="h-px w-8" style={{ background:`rgba(139,14,24,.3)` }} />
              <cite className="text-sm not-italic tracking-widest uppercase" style={{ color: C.cr }}>Subscriber, Mumbai</cite>
              <span className="h-px w-8" style={{ background:`rgba(139,14,24,.3)` }} />
            </div>
          </div>
        </SectionReveal>
      </section>
    </>
  );
}
