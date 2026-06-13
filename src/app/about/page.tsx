"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import SectionReveal from "@/components/SectionReveal";
import { teamMembers } from "@/lib/data";

export default function AboutPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="bg-[#1C1410] pt-40 pb-28 px-6 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-15"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=1800&q=70"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#5C0511]/20 via-[#1C1410]/60 to-[#1C1410]" />

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            className="flex items-center justify-center gap-3 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="h-px w-8 bg-[#F5E6D8]/30" />
            <span className="text-xs tracking-widest uppercase text-[#F5E6D8]/60">Our Story</span>
            <span className="h-px w-8 bg-[#F5E6D8]/30" />
          </motion.div>
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl text-white leading-tight"
            style={{ fontFamily: "'TheSeasons', 'Georgia', serif" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            The Women Behind
            <br />
            <span className="italic text-[#F5E6D8]">Become.ing</span>
          </motion.h1>
        </div>
      </section>

      {/* FOUNDER */}
      <section className="bg-[#FAF7EE] py-28 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <SectionReveal direction="right" className="order-2 lg:order-1">
              <span className="text-xs tracking-widest uppercase text-[#5C0511] block mb-4">Founder</span>
              <h2
                className="text-4xl lg:text-5xl text-[#1C1410] mb-6 leading-tight"
                style={{ fontFamily: "'TheSeasons', 'Georgia', serif" }}
              >
                Karishma Chhatrapati
              </h2>
              <motion.div
                className="w-14 h-0.5 bg-[#5C0511] mb-8"
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
              />
              <p className="text-[#6B5E54] leading-relaxed mb-5 text-[15px]">
                Karishma Chhatrapati is the founder of Become.ing — a movement
                born from her own journey through the landscape of midlife
                reinvention. After decades of building a successful career and
                raising a family, she found herself at an unexpected crossroads:
                accomplished on the outside, yet yearning for something deeper,
                more authentic, more fully herself.
              </p>
              <p className="text-[#6B5E54] leading-relaxed mb-5 text-[15px]">
                What followed was a period of profound transformation — one that
                led her to the conviction that midlife is not a crisis but an
                invitation. An invitation to shed the identities we have outgrown
                and step into the fullness of who we are becoming.
              </p>
              <p className="text-[#6B5E54] leading-relaxed mb-8 text-[15px]">
                Become.ing was created to be the community she wished she had
                found — a space of warmth, wisdom, and creative possibility for
                every woman brave enough to begin again.
              </p>
              <motion.blockquote
                className="border-l-2 border-[#5C0511] pl-6 py-2 text-lg text-[#1C1410] italic"
                style={{ fontFamily: "'TheSeasons', 'Georgia', serif" }}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.7 }}
              >
                "I believe every woman contains multitudes — and midlife is the
                season when we finally have permission to be all of them."
              </motion.blockquote>
            </SectionReveal>

            <SectionReveal direction="left" delay={150} className="order-1 lg:order-2">
              <div className="relative">
                <motion.div
                  className="relative aspect-[3/4] overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image
                    src="https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=800&q=80"
                    alt="Karishma Chhatrapati"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </motion.div>
                <motion.div
                  className="absolute -bottom-6 -right-6 w-40 h-40 bg-[#F5E6D8] -z-10"
                  initial={{ scale: 0.7, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                />
                <motion.div
                  className="absolute -top-6 -left-6 w-24 h-24 border border-[#5C0511]/25"
                  initial={{ scale: 0.7, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                />
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ILA */}
      <section className="bg-[#F5E6D8] py-28 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <SectionReveal direction="right">
              <div className="relative">
                <motion.div
                  className="relative aspect-[3/4] overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image
                    src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80"
                    alt="Ila — Creative Director"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </motion.div>
                <motion.div
                  className="absolute -bottom-6 -left-6 w-40 h-40 bg-[#FAF7EE] -z-10"
                  initial={{ scale: 0.7, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                />
              </div>
            </SectionReveal>

            <SectionReveal direction="left" delay={150}>
              <span className="text-xs tracking-widest uppercase text-[#5C0511] block mb-4">
                Become.ing Creative Collective
              </span>
              <h2
                className="text-4xl lg:text-5xl text-[#1C1410] mb-6 leading-tight"
                style={{ fontFamily: "'TheSeasons', 'Georgia', serif" }}
              >
                Ila
              </h2>
              <motion.div
                className="w-14 h-0.5 bg-[#5C0511] mb-8"
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
              />
              <p className="text-[#6B5E54] leading-relaxed mb-5 text-[15px]">
                Ila is the creative force behind the Become.ing Art Collective —
                a multi-disciplinary artist whose work lives at the intersection
                of identity, transformation, and feminine experience.
              </p>
              <p className="text-[#6B5E54] leading-relaxed mb-5 text-[15px]">
                Her creative philosophy is simple yet radical: art is not
                decoration. It is medicine. It is the language we use when words
                are not enough.
              </p>
              <p className="text-[#6B5E54] leading-relaxed mb-8 text-[15px]">
                The Become.ing Art Collective is her vision of a world where
                every woman's story is considered worthy of being seen, framed,
                and celebrated.
              </p>
              <motion.blockquote
                className="border-l-2 border-[#5C0511] pl-6 py-2 text-lg text-[#1C1410] italic"
                style={{ fontFamily: "'TheSeasons', 'Georgia', serif" }}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.7 }}
              >
                "To make art is to insist on your own experience as worthy of
                expression. That act alone is radical."
              </motion.blockquote>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="bg-[#5C0511] py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "radial-gradient(circle at 30% 50%, #F5E6D8, transparent 60%), radial-gradient(circle at 70% 50%, #F5E6D8, transparent 60%)" }}
        />
        <SectionReveal direction="none">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-xs tracking-widest uppercase text-white/40 block mb-6">Our Mission</span>
            <p
              className="text-3xl md:text-4xl text-white leading-relaxed italic font-light"
              style={{ fontFamily: "'TheSeasons', 'Georgia', serif" }}
            >
              To create a world where midlife is recognised as one of the most
              creatively rich and profoundly important seasons of a human life.
            </p>
          </div>
        </SectionReveal>
      </section>

      {/* TEAM */}
      <section className="bg-[#FAF7EE] py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionReveal>
            <div className="text-center mb-16">
              <span className="text-xs tracking-widest uppercase text-[#5C0511] block mb-4">The Team</span>
              <h2
                className="text-4xl lg:text-5xl text-[#1C1410]"
                style={{ fontFamily: "'TheSeasons', 'Georgia', serif" }}
              >
                The People Who Bring It to Life
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, i) => (
              <SectionReveal key={member.id} delay={i * 80}>
                <motion.div
                  className="flex flex-col items-center text-center bg-white p-8 cursor-default"
                  whileHover={{ y: -8, boxShadow: "0 20px 48px rgba(112,9,15,0.10)" }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.div
                    className="relative w-28 h-28 rounded-full overflow-hidden mb-6 ring-2 ring-[#5C0511]/20 group-hover:ring-[#5C0511] transition-all"
                  >
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="112px"
                    />
                  </motion.div>
                  <h3
                    className="text-xl text-[#1C1410] mb-1"
                    style={{ fontFamily: "'TheSeasons', 'Georgia', serif" }}
                  >
                    {member.name}
                  </h3>
                  <span className="text-xs tracking-widest uppercase text-[#5C0511] mb-4">
                    {member.role}
                  </span>
                  <p className="text-sm text-[#6B5E54] leading-relaxed">{member.bio}</p>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#F5E6D8] py-24 px-6">
        <SectionReveal direction="none">
          <div className="max-w-2xl mx-auto text-center">
            <h2
              className="text-4xl lg:text-5xl text-[#1C1410] mb-6"
              style={{ fontFamily: "'TheSeasons', 'Georgia', serif" }}
            >
              Join Our Community
            </h2>
            <p className="text-[#6B5E54] leading-relaxed mb-10 text-[15px]">
              Become part of a thoughtful, inspiring community of women navigating their becoming.
            </p>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/newsletter"
                className="relative overflow-hidden group inline-block bg-[#5C0511] text-white text-sm tracking-widest uppercase px-10 py-4"
              >
                <span className="relative z-10">Subscribe to Our Newsletter</span>
                <span className="absolute inset-0 bg-[#8B1A24] translate-x-full group-hover:translate-x-0 transition-transform duration-400 ease-out" />
              </Link>
            </motion.div>
          </div>
        </SectionReveal>
      </section>
    </>
  );
}
