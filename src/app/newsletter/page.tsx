"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import SectionReveal from "@/components/SectionReveal";
import { CheckCircle2 } from "lucide-react";

const perks = [
  { icon: "✍️", title: "Thoughtful Reflections", desc: "Essays and meditations on midlife, identity, and the art of becoming." },
  { icon: "🎙️", title: "New Podcast Episodes", desc: "Be the first to hear conversations that matter, delivered to your inbox." },
  { icon: "📚", title: "Book Recommendations", desc: "Curated reading lists to inspire, challenge, and nourish your growth." },
  { icon: "🎨", title: "Art & Creativity", desc: "Featured artworks and creative inspiration from the collective." },
  { icon: "🌿", title: "Community Updates", desc: "Exclusive events, collaborations, and opportunities to connect." },
];

export default function NewsletterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name.trim() || !email.trim()) { setError("Please fill in both fields."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("Please enter a valid email address."); return; }
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1400));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <>
      {/* Header */}
      <section className="bg-[#5C0511] pt-40 pb-28 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #F5E6D8, transparent 60%), radial-gradient(circle at 80% 50%, #F5E6D8, transparent 60%)" }}
        />
        {/* Floating decorative circles */}
        <motion.div
          className="absolute top-20 right-20 w-64 h-64 border border-white/10 rounded-full pointer-events-none"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-32 h-32 border border-white/10 rounded-full pointer-events-none"
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            className="flex items-center justify-center gap-3 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="h-px w-8 bg-white/25" />
            <span className="text-xs tracking-widest uppercase text-white/50">Community</span>
            <span className="h-px w-8 bg-white/25" />
          </motion.div>
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-6"
            style={{ fontFamily: "'TheSeasons', 'Georgia', serif" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            Join the Become.ing
            <br />
            <span className="italic text-[#F5E6D8]">Community</span>
          </motion.h1>
          <motion.p
            className="text-white/65 text-lg max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Receive thoughtful reflections, new podcast episodes, book
            recommendations, and updates delivered directly to your inbox.
          </motion.p>
        </div>
      </section>

      {/* Form + Perks */}
      <section className="bg-[#FAF7EE] py-28 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Form Card */}
          <SectionReveal direction="right">
            <motion.div
              className="bg-white p-10 md:p-14 shadow-sm"
              whileHover={{ boxShadow: "0 16px 48px rgba(112,9,15,0.08)" }}
              transition={{ duration: 0.4 }}
            >
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    className="text-center py-8"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    >
                      <CheckCircle2 size={60} className="text-[#5C0511] mx-auto mb-6" />
                    </motion.div>
                    <h2
                      className="text-3xl text-[#1C1410] mb-4"
                      style={{ fontFamily: "'TheSeasons', 'Georgia', serif" }}
                    >
                      Welcome to the Community
                    </h2>
                    <p className="text-[#6B5E54] leading-relaxed">
                      Thank you, <strong>{name}</strong>. You are now part of the
                      Become.ing community. Watch your inbox for thoughtful
                      reflections and updates.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0, y: -10 }}>
                    <h2
                      className="text-3xl text-[#1C1410] mb-2"
                      style={{ fontFamily: "'TheSeasons', 'Georgia', serif" }}
                    >
                      Subscribe to Our Newsletter
                    </h2>
                    <p className="text-[#6B5E54] text-sm leading-relaxed mb-8">
                      Join thousands of women navigating their most meaningful chapter.
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                      {/* Name */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <label htmlFor="name" className="text-xs tracking-widest uppercase text-[#6B5E54] block mb-2">
                          Full Name
                        </label>
                        <motion.input
                          id="name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your full name"
                          className="w-full bg-[#FAF7EE] border border-[#5C0511]/20 text-[#1C1410] text-sm px-4 py-3.5 focus:outline-none focus:border-[#5C0511] placeholder:text-[#6B5E54]/40 transition-colors"
                          whileFocus={{ borderColor: "#5C0511", backgroundColor: "#fff" }}
                          required
                        />
                      </motion.div>

                      {/* Email */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <label htmlFor="email" className="text-xs tracking-widest uppercase text-[#6B5E54] block mb-2">
                          Email Address
                        </label>
                        <motion.input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          className="w-full bg-[#FAF7EE] border border-[#5C0511]/20 text-[#1C1410] text-sm px-4 py-3.5 focus:outline-none focus:border-[#5C0511] placeholder:text-[#6B5E54]/40 transition-colors"
                          whileFocus={{ borderColor: "#5C0511", backgroundColor: "#fff" }}
                          required
                        />
                      </motion.div>

                      {/* Error */}
                      <AnimatePresence>
                        {error && (
                          <motion.p
                            className="text-sm text-[#5C0511]"
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                          >
                            {error}
                          </motion.p>
                        )}
                      </AnimatePresence>

                      {/* Submit */}
                      <motion.button
                        type="submit"
                        disabled={loading}
                        className="relative overflow-hidden bg-[#5C0511] text-white text-sm tracking-widest uppercase px-8 py-4 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                        whileHover={!loading ? { scale: 1.02 } : {}}
                        whileTap={!loading ? { scale: 0.98 } : {}}
                      >
                        <AnimatePresence mode="wait">
                          {loading ? (
                            <motion.span
                              key="loading"
                              className="flex items-center justify-center gap-2"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                            >
                              <motion.span
                                className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                              />
                              Subscribing...
                            </motion.span>
                          ) : (
                            <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                              Subscribe
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    </form>

                    <p className="text-xs text-[#6B5E54]/50 mt-6">
                      We respect your privacy. Unsubscribe at any time. No spam, ever.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </SectionReveal>

          {/* Perks */}
          <SectionReveal direction="left" delay={150}>
            <div>
              <span className="text-xs tracking-widest uppercase text-[#5C0511] block mb-6">What to Expect</span>
              <h2
                className="text-4xl text-[#1C1410] mb-10 leading-tight"
                style={{ fontFamily: "'TheSeasons', 'Georgia', serif" }}
              >
                A letter written just for you
              </h2>
              <div className="flex flex-col gap-7">
                {perks.map((item, i) => (
                  <motion.div
                    key={item.title}
                    className="flex gap-5 items-start group"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ x: 4 }}
                  >
                    <div className="text-2xl flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <div>
                      <h4
                        className="text-base text-[#1C1410] mb-1 group-hover:text-[#5C0511] transition-colors"
                        style={{ fontFamily: "'TheSeasons', 'Georgia', serif" }}
                      >
                        {item.title}
                      </h4>
                      <p className="text-sm text-[#6B5E54] leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-[#F5E6D8] py-24 px-6">
        <SectionReveal direction="none">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              className="text-5xl text-[#5C0511]/20 mb-4 select-none"
              style={{ fontFamily: "'TheSeasons', 'Georgia', serif" }}
            >
              &ldquo;
            </motion.div>
            <blockquote
              className="text-2xl md:text-3xl text-[#1C1410] italic leading-relaxed font-light"
              style={{ fontFamily: "'TheSeasons', 'Georgia', serif" }}
            >
              Become.ing is the only newsletter I read word for word, every
              single time. It&apos;s like a letter from a wise friend who sees you
              exactly as you are.
            </blockquote>
            <div className="mt-8 flex items-center justify-center gap-4">
              <span className="h-px w-8 bg-[#5C0511]/30" />
              <cite className="text-sm text-[#5C0511] not-italic tracking-widest uppercase">
                Subscriber, Mumbai
              </cite>
              <span className="h-px w-8 bg-[#5C0511]/30" />
            </div>
          </div>
        </SectionReveal>
      </section>
    </>
  );
}
