"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { getBooks, saveBook, updateBook, deleteBook, type Book } from "@/lib/store";
import { ArrowLeft, Plus, Pencil, Trash2, X, Check, ImageIcon, Loader2, ExternalLink } from "lucide-react";
import ImageUploader from "@/components/admin/ImageUploader";

const B = "#70090F", B2 = "#560008", BL = "#FFE9DF", IV = "#F8F6E7", CH = "#2C2C2C";

const CATEGORIES = ["Personal Growth", "Reinvention", "Wellness", "Creativity", "Relationships", "Midlife", "Other"];

const EMPTY: Omit<Book, "id" | "created_at"> = {
  title: "", author: "", description: "", cover: "", amazon_url: "", category: "Personal Growth",
};

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
function Textarea({ value, onChange, placeholder, rows = 3 }: { value: string; onChange: (v: string) => void; placeholder?: string; rows?: number }) {
  return (
    <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={rows}
      className="w-full text-sm px-4 py-2.5 focus:outline-none transition-colors resize-y"
      style={{ background: "#fff", border: "1px solid rgba(112,9,15,.18)", color: CH }}
      onFocus={e => (e.target.style.borderColor = B)} onBlur={e => (e.target.style.borderColor = "rgba(112,9,15,.18)")} />
  );
}

// ─── Form Modal ───────────────────────────────────────────────────────────────
function BookForm({ initial, onSave, onClose }: {
  initial?: Book;
  onSave: (data: Omit<Book, "id" | "created_at">) => Promise<void>;
  onClose: () => void;
}) {
  const [form, setForm] = useState<Omit<Book, "id" | "created_at">>(
    initial
      ? { title: initial.title, author: initial.author, description: initial.description,
          cover: initial.cover, amazon_url: initial.amazon_url, category: initial.category }
      : { ...EMPTY }
  );
  const [saving, setSaving] = useState(false);
  const set = (key: keyof typeof form, value: string) => setForm(p => ({ ...p, [key]: value }));
  const valid = form.title.trim() && form.author.trim();

  async function handleSave() { if (!valid) return; setSaving(true); await onSave(form); setSaving(false); }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 overflow-y-auto"
      style={{ background: "rgba(26,10,10,.85)", backdropFilter: "blur(4px)" }}>
      <div className="relative w-full max-w-2xl my-8" style={{ background: IV }}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5" style={{ borderBottom: `1px solid rgba(112,9,15,.15)` }}>
          <h2 className="text-xl" style={{ fontFamily: "'TheSeasons',Georgia,serif", color: CH }}>
            {initial ? "Edit Book" : "Add Book"}
          </h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center" style={{ color: "#4A4A4A" }}><X size={18} /></button>
        </div>

        <div className="p-6 sm:p-8 space-y-5">
          {/* Title */}
          <div><FieldLabel>Book Title *</FieldLabel><Input value={form.title} onChange={v => set("title", v)} placeholder="e.g. The Artist's Way" /></div>

          {/* Author + Category */}
          <div className="grid grid-cols-2 gap-4">
            <div><FieldLabel>Author *</FieldLabel><Input value={form.author} onChange={v => set("author", v)} placeholder="Author name" /></div>
            <div>
              <FieldLabel>Category</FieldLabel>
              <select value={form.category} onChange={e => set("category", e.target.value)}
                className="w-full text-sm px-4 py-2.5 focus:outline-none"
                style={{ background: "#fff", border: "1px solid rgba(112,9,15,.18)", color: CH }}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* Amazon URL */}
          <div><FieldLabel>Amazon / Buy Link</FieldLabel><Input value={form.amazon_url} onChange={v => set("amazon_url", v)} placeholder="https://amazon.com/..." /></div>

          {/* Cover image */}
          <ImageUploader label="Book Cover" value={form.cover} onChange={v => set("cover", v)} previewHeight={200} />

          {/* Description */}
          <div><FieldLabel>Description</FieldLabel><Textarea value={form.description} onChange={v => set("description", v)} placeholder="What is this book about?" rows={4} /></div>
        </div>

        {/* Footer */}
        <div className="px-6 sm:px-8 py-5 flex gap-3 justify-end" style={{ borderTop: `1px solid rgba(112,9,15,.15)` }}>
          <button onClick={onClose} className="text-xs tracking-[.25em] px-6 py-2.5" style={{ border: "1px solid rgba(112,9,15,.25)", color: "#4A4A4A" }}>Cancel</button>
          <button onClick={handleSave} disabled={!valid || saving}
            className="inline-flex items-center gap-2 text-xs tracking-[.25em] px-6 py-2.5 text-white disabled:opacity-40" style={{ background: B }}>
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
            {saving ? "Saving…" : initial ? "Save Changes" : "Add Book"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AdminBooksPage() {
  const [books,   setBooks]   = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal,   setModal]   = useState<"new" | Book | null>(null);
  const [confirm, setConfirm] = useState<number | null>(null);
  const [toast,   setToast]   = useState("");

  const reload = useCallback(async () => { setLoading(true); setBooks(await getBooks()); setLoading(false); }, []);
  useEffect(() => { reload(); }, [reload]);

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(""), 2800); }

  async function handleSave(data: Omit<Book, "id" | "created_at">) {
    if (modal === "new") { await saveBook(data); showToast("Book added to library."); }
    else if (modal && typeof modal === "object") { await updateBook(modal.id, data); showToast("Book updated."); }
    setModal(null); reload();
  }

  async function handleDelete(id: number) { await deleteBook(id); setConfirm(null); showToast("Book removed."); reload(); }

  return (
    <div className="min-h-screen" style={{ background: IV }}>
      {/* Top bar */}
      <header className="sticky top-0 z-40 h-[64px] flex items-center justify-between px-5 sm:px-8"
        style={{ background: CH, borderBottom: `2px solid ${B}` }}>
        <div className="flex items-center gap-3">
          <Link href="/admin/dashboard" className="flex items-center gap-2 transition-colors"
            style={{ color: "rgba(255,233,223,.6)" }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = BL)}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(255,233,223,.6)")}>
            <ArrowLeft size={16} />
          </Link>
          <span className="text-lg" style={{ fontFamily: "'TheSeasons',Georgia,serif", color: BL, letterSpacing: "0.08em" }}>
            Books
          </span>
        </div>
        <button onClick={() => setModal("new")}
          className="inline-flex items-center gap-2 text-white text-[10px] tracking-[.3em] px-5 py-2.5 transition-colors"
          style={{ background: B }}
          onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = B2)}
          onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = B)}>
          <Plus size={14} /> Add Book
        </button>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {loading ? (
          <div className="flex justify-center py-20"><Loader2 size={28} className="animate-spin" style={{ color: B }} /></div>
        ) : (
          <>
            <p className="text-[10px] tracking-[.25em] mb-8" style={{ color: "#4A4A4A" }}>
              {books.length} book{books.length !== 1 ? "s" : ""} in library
            </p>

            {/* Grid layout */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
              {books.map(book => (
                <div key={book.id} className="flex flex-col" style={{ background: "#fff" }}>
                  {/* Cover */}
                  <div className="relative w-full overflow-hidden" style={{ height: 200 }}>
                    {book.cover ? (
                      <Image src={book.cover} alt={book.title} fill className="object-cover" sizes="220px" unoptimized />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center" style={{ background: BL }}>
                        <ImageIcon size={28} style={{ color: B }} />
                      </div>
                    )}
                    {/* Category badge */}
                    <div className="absolute top-2 left-2 text-[9px] tracking-[.2em] px-2 py-0.5 text-white"
                      style={{ background: B }}>{book.category}</div>
                  </div>

                  {/* Info */}
                  <div className="p-3 flex-1 flex flex-col">
                    <h3 className="text-sm leading-snug mb-0.5" style={{ fontFamily: "'TheSeasons',Georgia,serif", color: CH }}>
                      {book.title}
                    </h3>
                    <p className="text-[10px] tracking-[.15em] mb-2" style={{ color: B }}>{book.author}</p>
                    {book.description && (
                      <p className="text-[10px] leading-relaxed line-clamp-3 mb-3 flex-1" style={{ color: "#4A4A4A" }}>
                        {book.description}
                      </p>
                    )}
                    {book.amazon_url && (
                      <a href={book.amazon_url} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[10px] tracking-[.15em] mb-3 transition-colors"
                        style={{ color: "rgba(74,74,74,.6)" }}
                        onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = B)}
                        onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(74,74,74,.6)")}>
                        <ExternalLink size={10} /> Buy Link
                      </a>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2 pt-2" style={{ borderTop: "1px solid rgba(112,9,15,.1)" }}>
                      <button onClick={() => setModal(book)}
                        className="flex-1 flex items-center justify-center gap-1 text-[10px] tracking-[.2em] py-2 transition-colors"
                        style={{ border: "1px solid rgba(112,9,15,.2)", color: "#4A4A4A" }}
                        onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = BL)}
                        onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = "transparent")}>
                        <Pencil size={11} /> Edit
                      </button>
                      <button onClick={() => setConfirm(book.id)}
                        className="flex-1 flex items-center justify-center gap-1 text-[10px] tracking-[.2em] py-2 transition-colors"
                        style={{ border: "1px solid rgba(112,9,15,.2)", color: "#4A4A4A" }}
                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = B; (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; (e.currentTarget as HTMLButtonElement).style.color = "#4A4A4A"; }}>
                        <Trash2 size={11} /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {books.length === 0 && (
                <p className="col-span-5 text-center py-16 text-sm" style={{ color: "#4A4A4A" }}>
                  No books yet. Click &ldquo;Add Book&rdquo; to get started.
                </p>
              )}
            </div>
          </>
        )}
      </main>

      {/* Form modal */}
      {modal !== null && (
        <BookForm initial={modal === "new" ? undefined : modal} onSave={handleSave} onClose={() => setModal(null)} />
      )}

      {/* Delete confirm */}
      {confirm !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ background: "rgba(26,10,10,.8)", backdropFilter: "blur(4px)" }}>
          <div className="w-full max-w-sm p-8" style={{ background: IV }}>
            <h3 className="text-xl mb-3" style={{ fontFamily: "'TheSeasons',Georgia,serif", color: CH }}>Remove Book?</h3>
            <p className="text-sm mb-8" style={{ color: "#4A4A4A" }}>This will remove the book from the public library.</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirm(null)} className="flex-1 text-xs tracking-[.25em] py-3" style={{ border: "1px solid rgba(112,9,15,.25)", color: "#4A4A4A" }}>Cancel</button>
              <button onClick={() => handleDelete(confirm)} className="flex-1 text-xs tracking-[.25em] py-3 text-white" style={{ background: B }}>Remove</button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 text-white text-xs tracking-[.25em] shadow-xl"
          style={{ background: CH }}>
          {toast}
        </div>
      )}
    </div>
  );
}
