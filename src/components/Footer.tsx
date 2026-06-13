import Link from "next/link";
import { Mail } from "lucide-react";

// SVG social icons (lucide v1 removed brand icons)
const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/blogs", label: "Blogs" },
  { href: "/podcast", label: "Podcast & YouTube" },
  { href: "/books", label: "Books" },
  { href: "/art", label: "Art Collective" },
  { href: "/newsletter", label: "Newsletter" },
];

export default function Footer() {
  return (
    <footer className="bg-[#2C2C2C] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3
              className="text-3xl text-[#FFE9DF] mb-4"
              style={{ fontFamily: "'TheSeasons', 'Georgia', serif" }}
            >
              Become.ing
            </h3>
            <p className="text-sm text-white/60 leading-relaxed mb-6">
              A thoughtful space for reflection, creativity, reinvention, and
              meaningful connection. Life is a continuous journey of becoming.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 flex items-center justify-center border border-white/20 hover:border-[#FFE9DF] hover:text-[#FFE9DF] transition-colors rounded-full"
              >
                <InstagramIcon />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="w-9 h-9 flex items-center justify-center border border-white/20 hover:border-[#FFE9DF] hover:text-[#FFE9DF] transition-colors rounded-full"
              >
                <YoutubeIcon />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-9 h-9 flex items-center justify-center border border-white/20 hover:border-[#FFE9DF] hover:text-[#FFE9DF] transition-colors rounded-full"
              >
                <LinkedinIcon />
              </a>
              <a
                href="mailto:hello@become.ing"
                aria-label="Email"
                className="w-9 h-9 flex items-center justify-center border border-white/20 hover:border-[#FFE9DF] hover:text-[#FFE9DF] transition-colors rounded-full"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-[#FFE9DF]/60 mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-[#FFE9DF] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-[#FFE9DF]/60 mb-5">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li>
                <a
                  href="mailto:hello@become.ing"
                  className="hover:text-[#FFE9DF] transition-colors"
                >
                  hello@become.ing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[#FFE9DF] transition-colors"
                >
                  Collaborations
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[#FFE9DF] transition-colors"
                >
                  Art Inquiries
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[#FFE9DF] transition-colors"
                >
                  Media & Press
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-[#FFE9DF]/60 mb-5">
              Stay Connected
            </h4>
            <p className="text-sm text-white/60 mb-4">
              Receive thoughtful reflections and updates directly in your inbox.
            </p>
            <Link
              href="/newsletter"
              className="inline-block bg-[#70090F] text-white text-xs tracking-widest uppercase px-5 py-3 hover:bg-[#560008] transition-colors"
            >
              Subscribe
            </Link>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Become.ing. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-white/40">
            <a href="#" className="hover:text-white/70 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white/70 transition-colors">
              Terms of Use
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
