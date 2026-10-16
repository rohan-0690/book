"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  getBlogs, saveBlog, updateBlog, deleteBlog,
  type BlogPost, slugify,
} from "@/lib/store";
import { blogCategories } from "@/lib/data";
import {
  ArrowLeft, Plus, Pencil, Trash2, Star, StarOff,
  X, Check, ImageIcon, Eye, Loader2,
} from "lucide-react";
import ImageUploader from "@/components/admin/ImageUploader";

const B = "#70090F", B2 = "#560008", BL = "#FFE9DF", IV = "#F8F6E7", CH = "#2C2C2C";

const EMPTY: Omit<BlogPost, "id" | "slug" | "created_at"> = {
  title: "", excerpt: "", content: "", category: "Midlife",
  author: "Karishma Chhatrapati", date: "", read_time: "5 min read",
  image: "", featured: false,
};

function today() {
  return new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}
function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="block text-[10px] tracking-[.3em] mb-1.5" style={{ color: "#4A4A4A" }}>{children}</label>;
}
function Input({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      className="w-full text-sm px-4 py-2.5 focus:outline-none transition-colors"
      style={{ background: "#fff", border: "1px solid rgba(112,9,15,.18)", color: CH }}
      onFocus={e => (e.target.style.borderColor = B)} onBlur={e => (e.target.style.borderColor = "rgba(112,9,15,.18)")} />
  );
}
function Textarea({ value, onChange, placeholder, rows = 4 }: { value: string; onChange: (v: string) => void; placeholder?: string; rows?: number }) {
  return (
    <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={rows}
      className="w-full text-sm px-4 py-2.5 focus:outline-none transition-colors resize-y"
      style={{ background: "#fff", border: "1px solid rgba(112,9,15,.18)", color: CH }}
      onFocus={e => (e.target.style.borderColor = B)} onBlur={e => (e.target.style.borderColor = "rgba(112,9,15,.18)")} />
  );
}

function BlogForm({ initial, onSave, onClose }: {
  initial?: BlogPost;
  onSave: (data: Omit<BlogPost, "id" | "slug" | "created_at">) => Promise<void>;
  onClose: () => void;
}) {
  const [form, setForm] = useState<Omit<BlogPost, "id" | "slug" | "created_at">>(
    initial
      ? { title: initial.title, excerpt: initial.excerpt, content: initial.content,
          category: initial.category, author: initial.author, date: initial.date,
          read_time: initial.read_time, image: initial.image, featured: initial.featured }
      : { ...EMPTY, date: today() }
  );
  const [saving, setSaving] = useState(false);
  const set = (key: keyof typeof form, value: string | boolean) => setForm(p => ({ ...p, [key]: value }));
  const valid = form.title.trim() && form.excerpt.trim() && form.image.trim();

  async function handleSave() {
    if (!valid) return;
    setSaving(true);
    await onSave(form);
    setSaving(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 overflow-y-auto"
      style={{ background: "rgba(26,10,10,.85)", backdropFilter: "blur(4px)" }}>
      <div className="relative w-full max-w-2xl my-8" style={{ background: IV }}>
        <div className="flex items-center justify-between px-6 sm:px-8 py-5" style={{ borderBottom: `1px solid rgba(112,9,15,.15)` }}>
          <h2 className="text-xl" style={{ fontFamily: "'TheSeasons',Georgia,serif", color: CH }}>{initial ? "Edit Post" : "New Post"}</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center" style={{ color: "#4A4A4A" }}><X size={18} /></button>
        </div>
        <div className="p-6 sm:p-8 space-y-5">
          <div>
            <FieldLabel>Title *</FieldLabel>
            <Input value={form.title} onChange={v => set("title", v)} placeholder="Post title" />
            {form.title && <p className="text-[10px] mt-1" style={{ color: "#4A4A4A" }}>Slug: /blogs/{slugify(form.title)}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <FieldLabel>Category</FieldLabel>
              <select value={form.category} onChange={e => set("category", e.target.value)}
                className="w-full text-sm px-4 py-2.5 focus:outline-none"
                style={{ background: "#fff", border: "1px solid rgba(112,9,15,.18)", color: CH }}>
                {blogCategories.filter(c => c !== "All").map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div><FieldLabel>Author</FieldLabel><Input value={form.author} onChange={v => set("author", v)} /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><FieldLabel>Date</FieldLabel><Input value={form.date} onChange={v => set("date", v)} placeholder="May 28, 2025" /></div>
            <div><FieldLabel>Read Time</FieldLabel><Input value={form.read_time} onChange={v => set("read_time", v)} placeholder="5 min read" /></div>
          </div>
          <ImageUploader label="Cover Image *" value={form.image} onChange={v => set("image", v)} previewHeight={160} />
          <div><FieldLabel>Excerpt *</FieldLabel><Textarea value={form.excerpt} onChange={v => set("excerpt", v)} placeholder="Short description…" rows={3} /></div>
          <div><FieldLabel>Full Content</FieldLabel><Textarea value={form.content} onChange={v => set("content", v)} placeholder="Full article body…" rows={10} /></div>
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <div className="relative w-10 h-5 rounded-full transition-colors" style={{ background: form.featured ? B : "rgba(112,9,15,.2)" }} onClick={() => set("featured", !form.featured)}>
              <div className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all" style={{ left: form.featured ? "calc(100% - 18px)" : "2px" }} />
            </div>
            <span className="text-xs tracking-[.2em]" style={{ color: "#4A4A4A" }}>Mark as Featured Post</span>
          </label>
        </div>
        <div className="px-6 sm:px-8 py-5 flex gap-3 justify-end" style={{ borderTop: `1px solid rgba(112,9,15,.15)` }}>
          <button onClick={onClose} className="text-xs tracking-[.25em] px-6 py-2.5" style={{ border: "1px solid rgba(112,9,15,.25)", color: "#4A4A4A" }}>Cancel</button>
          <button onClick={handleSave} disabled={!valid || saving}
            className="inline-flex items-center gap-2 text-xs tracking-[.25em] px-6 py-2.5 text-white disabled:opacity-40" style={{ background: B }}>
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
            {saving ? "Saving…" : initial ? "Save Changes" : "Publish Post"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminBlogsPage() {
  const [posts,   setPosts]   = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal,   setModal]   = useState<"new" | BlogPost | null>(null);
  const [confirm, setConfirm] = useState<number | null>(null);
  const [toast,   setToast]   = useState("");

  const reload = useCallback(async () => { setLoading(true); setPosts(await getBlogs()); setLoading(false); }, []);
  useEffect(() => { reload(); }, [reload]);

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(""), 2800); }

  async function handleSave(data: Omit<BlogPost, "id" | "slug" | "created_at">) {
    if (modal === "new") { await saveBlog(data); showToast("Post published."); }
    else if (modal && typeof modal === "object") { await updateBlog(modal.id, data); showToast("Post updated."); }
    setModal(null); reload();
  }

  async function handleDelete(id: number) { await deleteBlog(id); setConfirm(null); showToast("Post deleted."); reload(); }
  async function toggleFeatured(post: BlogPost) { await updateBlog(post.id, { featured: !post.featured }); showToast(post.featured ? "Removed from featured." : "Set as featured."); reload(); }

  return (
    <div className="min-h-screen" style={{ background: IV }}>
      <header className="sticky top-0 z-40 h-[64px] flex items-center justify-between px-5 sm:px-8" style={{ background: CH, borderBottom: `2px solid ${B}` }}>
        <div className="flex items-center gap-3">
          <Link href="/admin/dashboard" className="flex items-center gap-2" style={{ color: "rgba(255,233,223,.6)" }}><ArrowLeft size={16} /></Link>
          <span className="text-lg" style={{ fontFamily: "'TheSeasons',Georgia,serif", color: BL, letterSpacing: "0.08em" }}>Blogs</span>
        </div>
        <button onClick={() => setModal("new")} className="inline-flex items-center gap-2 text-white text-[10px] tracking-[.3em] px-5 py-2.5" style={{ background: B }}>
          <Plus size={14} /> New Post
        </button>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {loading ? (
          <div className="flex justify-center py-20"><Loader2 size={28} className="animate-spin" style={{ color: B }} /></div>
        ) : (
          <>
            <p className="text-[10px] tracking-[.25em] mb-8" style={{ color: "#4A4A4A" }}>{posts.length} post{posts.length !== 1 ? "s" : ""} total</p>
            <div className="flex flex-col gap-3">
              {posts.map(post => (
                <div key={post.id} className="flex gap-4 p-4 sm:p-5 items-start"
                  style={{ background: "#fff", borderLeft: post.featured ? `3px solid ${B}` : "3px solid transparent" }}>
                  <div className="relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 overflow-hidden">
                    {post.image ? <Image src={post.image} alt={post.title} fill className="object-cover" sizes="80px" unoptimized />
                      : <div className="w-full h-full flex items-center justify-center" style={{ background: BL }}><ImageIcon size={20} style={{ color: B }} /></div>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      {post.featured && <span className="text-[9px] tracking-[.25em] px-2 py-0.5 text-white" style={{ background: B }}>Featured</span>}
                      <span className="text-[9px] tracking-[.25em] px-2 py-0.5" style={{ background: BL, color: B }}>{post.category}</span>
                    </div>
                    <h3 className="text-base sm:text-lg leading-snug mb-1" style={{ fontFamily: "'TheSeasons',Georgia,serif", color: CH }}>{post.title}</h3>
                    <p className="text-xs line-clamp-2 mb-2" style={{ color: "#4A4A4A" }}>{post.excerpt}</p>
                    <p className="text-[10px] tracking-[.15em]" style={{ color: "rgba(74,74,74,.6)" }}>{post.author} · {post.date} · {post.read_time}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 flex-shrink-0">
                    <a href={`/blogs/${post.slug}`} target="_blank" title="View live"
                      className="w-8 h-8 flex items-center justify-center transition-colors"
                      style={{ border: "1px solid rgba(112,9,15,.2)", color: "#4A4A4A" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = B; }} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#4A4A4A"; }}>
                      <Eye size={14} />
                    </a>
                    <button onClick={() => toggleFeatured(post)} title="Toggle featured"
                      className="w-8 h-8 flex items-center justify-center transition-colors"
                      style={{ border: "1px solid rgba(112,9,15,.2)", color: post.featured ? B : "#4A4A4A" }}>
                      {post.featured ? <Star size={14} /> : <StarOff size={14} />}
                    </button>
                    <button onClick={() => setModal(post)} title="Edit"
                      className="w-8 h-8 flex items-center justify-center transition-colors"
                      style={{ border: "1px solid rgba(112,9,15,.2)", color: "#4A4A4A" }}
                      onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = BL)} onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = "transparent")}>
                      <Pencil size={14} />
                    </button>
                    <button onClick={() => setConfirm(post.id)} title="Delete"
                      className="w-8 h-8 flex items-center justify-center transition-colors"
                      style={{ border: "1px solid rgba(112,9,15,.2)", color: "#4A4A4A" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = B; (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; (e.currentTarget as HTMLButtonElement).style.color = "#4A4A4A"; }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
              {posts.length === 0 && <p className="text-center py-16 text-sm" style={{ color: "#4A4A4A" }}>No posts yet. Click "New Post" to add one.</p>}
            </div>
          </>
        )}
      </main>

      {modal !== null && <BlogForm initial={modal === "new" ? undefined : modal} onSave={handleSave} onClose={() => setModal(null)} />}

      {confirm !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: "rgba(26,10,10,.8)", backdropFilter: "blur(4px)" }}>
          <div className="w-full max-w-sm p-8" style={{ background: IV }}>
            <h3 className="text-xl mb-3" style={{ fontFamily: "'TheSeasons',Georgia,serif", color: CH }}>Delete Post?</h3>
            <p className="text-sm mb-8" style={{ color: "#4A4A4A" }}>This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirm(null)} className="flex-1 text-xs tracking-[.25em] py-3" style={{ border: "1px solid rgba(112,9,15,.25)", color: "#4A4A4A" }}>Cancel</button>
              <button onClick={() => handleDelete(confirm)} className="flex-1 text-xs tracking-[.25em] py-3 text-white" style={{ background: B }}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {toast && <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 text-white text-xs tracking-[.25em] shadow-xl" style={{ background: CH }}>{toast}</div>}
    </div>
  );
}
