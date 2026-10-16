"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  getArtworks, saveArtwork, updateArtwork, deleteArtwork,
  type Artwork,
} from "@/lib/store";
import {
  ArrowLeft, Plus, Pencil, Trash2,
  X, Check, ImageIcon,
} from "lucide-react";
import ImageUploader from "@/components/admin/ImageUploader";

const B = "#70090F", B2 = "#560008", BL = "#FFE9DF", IV = "#F8F6E7", CH = "#2C2C2C";

const EMPTY: Omit<Artwork, "id"> = {
  title: "", artist: "", medium: "", description: "", image: "", dimensions: "",
};

const MEDIUMS = [
  "Oil on Canvas", "Watercolour", "Acrylic on Canvas", "Mixed Media",
  "Photography", "Charcoal on Paper", "Ink", "Digital", "Sculpture", "Other",
];

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="block text-[10px] tracking-[.3em] mb-1.5" style={{ color: "#4A4A4A" }}>{children}</label>;
}
function Input({ value, onChange, placeholder }: {
  value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  return (
    <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      className="w-full text-sm px-4 py-2.5 focus:outline-none transition-colors"
      style={{ background: "#fff", border: "1px solid rgba(112,9,15,.18)", color: CH }}
      onFocus={e => (e.target.style.borderColor = B)}
      onBlur={e => (e.target.style.borderColor = "rgba(112,9,15,.18)")} />
  );
}
function Textarea({ value, onChange, placeholder, rows = 4 }: {
  value: string; onChange: (v: string) => void; placeholder?: string; rows?: number;
}) {
  return (
    <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={rows}
      className="w-full text-sm px-4 py-2.5 focus:outline-none transition-colors resize-y"
      style={{ background: "#fff", border: "1px solid rgba(112,9,15,.18)", color: CH }}
      onFocus={e => (e.target.style.borderColor = B)}
      onBlur={e => (e.target.style.borderColor = "rgba(112,9,15,.18)")} />
  );
}

// ─── Form Modal ───────────────────────────────────────────────────────────────
function ArtForm({ initial, onSave, onClose }: {
  initial?: Artwork;
  onSave: (data: Omit<Artwork, "id">) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<Omit<Artwork, "id">>(
    initial
      ? { title: initial.title, artist: initial.artist, medium: initial.medium,
          description: initial.description, image: initial.image, dimensions: initial.dimensions }
      : { ...EMPTY }
  );

  const set = (key: keyof typeof form, value: string) =>
    setForm(prev => ({ ...prev, [key]: value }));

  const valid = form.title.trim() && form.artist.trim() && form.image.trim();

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 overflow-y-auto"
      style={{ background: "rgba(26,10,10,.85)", backdropFilter: "blur(4px)" }}>
      <div className="relative w-full max-w-2xl my-8" style={{ background: IV }}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5"
          style={{ borderBottom: `1px solid rgba(112,9,15,.15)` }}>
          <h2 className="text-xl" style={{ fontFamily: "'TheSeasons',Georgia,serif", color: CH }}>
            {initial ? "Edit Artwork" : "Add Artwork"}
          </h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center"
            style={{ color: "#4A4A4A" }}>
            <X size={18} />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-5">
          {/* Title */}
          <div>
            <FieldLabel>Artwork Title *</FieldLabel>
            <Input value={form.title} onChange={v => set("title", v)} placeholder="e.g. Unfolding" />
          </div>

          {/* Artist + Medium */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <FieldLabel>Artist Name *</FieldLabel>
              <Input value={form.artist} onChange={v => set("artist", v)} placeholder="Artist full name" />
            </div>
            <div>
              <FieldLabel>Medium</FieldLabel>
              <select value={form.medium} onChange={e => set("medium", e.target.value)}
                className="w-full text-sm px-4 py-2.5 focus:outline-none"
                style={{ background: "#fff", border: "1px solid rgba(112,9,15,.18)", color: CH }}>
                <option value="">Select medium…</option>
                {MEDIUMS.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
          </div>

          {/* Dimensions */}
          <div>
            <FieldLabel>Dimensions</FieldLabel>
            <Input value={form.dimensions} onChange={v => set("dimensions", v)} placeholder="e.g. 60cm × 80cm" />
          </div>

          {/* Image — upload or paste URL */}
          <ImageUploader
            label="Artwork Image *"
            value={form.image}
            onChange={v => set("image", v)}
            previewHeight={200}
          />

          {/* Description */}
          <div>
            <FieldLabel>Description</FieldLabel>
            <Textarea value={form.description} onChange={v => set("description", v)}
              placeholder="What does this artwork express?" rows={3} />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 sm:px-8 py-5 flex gap-3 justify-end"
          style={{ borderTop: `1px solid rgba(112,9,15,.15)` }}>
          <button onClick={onClose}
            className="text-xs tracking-[.25em] px-6 py-2.5"
            style={{ border: "1px solid rgba(112,9,15,.25)", color: "#4A4A4A" }}>
            Cancel
          </button>
          <button onClick={() => valid && onSave(form)} disabled={!valid}
            className="inline-flex items-center gap-2 text-xs tracking-[.25em] px-6 py-2.5 text-white disabled:opacity-40"
            style={{ background: B }}>
            <Check size={14} /> {initial ? "Save Changes" : "Add to Gallery"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AdminArtPage() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [modal,    setModal]    = useState<"new" | Artwork | null>(null);
  const [confirm,  setConfirm]  = useState<number | null>(null);
  const [toast,    setToast]    = useState("");

  const reload = useCallback(() => setArtworks(getArtworks()), []);
  useEffect(reload, [reload]);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 2800);
  }

  function handleSave(data: Omit<Artwork, "id">) {
    if (modal === "new") {
      saveArtwork(data);
      showToast("Artwork added to gallery.");
    } else if (modal && typeof modal === "object") {
      updateArtwork(modal.id, data);
      showToast("Artwork updated.");
    }
    setModal(null);
    reload();
  }

  function handleDelete(id: number) {
    deleteArtwork(id);
    setConfirm(null);
    showToast("Artwork removed from gallery.");
    reload();
  }

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
            Art Collective
          </span>
        </div>
        <button onClick={() => setModal("new")}
          className="inline-flex items-center gap-2 text-white text-[10px] tracking-[.3em] px-5 py-2.5"
          style={{ background: B }}
          onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = B2)}
          onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = B)}>
          <Plus size={14} /> Add Artwork
        </button>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <p className="text-[10px] tracking-[.25em] mb-8" style={{ color: "#4A4A4A" }}>
          {artworks.length} artwork{artworks.length !== 1 ? "s" : ""} in gallery
        </p>

        {/* Grid view */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {artworks.map(art => (
            <div key={art.id} className="group flex flex-col" style={{ background: "#fff" }}>
              {/* Image */}
              <div className="relative w-full overflow-hidden" style={{ height: 180 }}>
                {art.image ? (
                  <Image src={art.image} alt={art.title} fill className="object-cover" sizes="300px" unoptimized />
                ) : (
                  <div className="w-full h-full flex items-center justify-center" style={{ background: BL }}>
                    <ImageIcon size={24} style={{ color: B }} />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-3 flex-1 flex flex-col">
                <h3 className="text-sm leading-snug mb-0.5"
                  style={{ fontFamily: "'TheSeasons',Georgia,serif", color: CH }}>
                  {art.title}
                </h3>
                <p className="text-[10px] tracking-[.15em] mb-1" style={{ color: B }}>{art.artist}</p>
                {art.medium && (
                  <p className="text-[10px] tracking-[.1em]" style={{ color: "rgba(74,74,74,.6)" }}>{art.medium}</p>
                )}
                {art.dimensions && (
                  <p className="text-[10px] tracking-[.1em]" style={{ color: "rgba(74,74,74,.5)" }}>{art.dimensions}</p>
                )}

                {/* Actions */}
                <div className="flex gap-2 mt-3 pt-3" style={{ borderTop: "1px solid rgba(112,9,15,.1)" }}>
                  <button onClick={() => setModal(art)}
                    className="flex-1 flex items-center justify-center gap-1 text-[10px] tracking-[.2em] py-2 transition-colors"
                    style={{ border: "1px solid rgba(112,9,15,.2)", color: "#4A4A4A" }}
                    onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = BL)}
                    onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = "transparent")}>
                    <Pencil size={11} /> Edit
                  </button>
                  <button onClick={() => setConfirm(art.id)}
                    className="flex-1 flex items-center justify-center gap-1 text-[10px] tracking-[.2em] py-2 transition-colors"
                    style={{ border: "1px solid rgba(112,9,15,.2)", color: "#4A4A4A" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = B; (e.currentTarget as HTMLButtonElement).style.color = "#fff"; (e.currentTarget as HTMLButtonElement).style.borderColor = B; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; (e.currentTarget as HTMLButtonElement).style.color = "#4A4A4A"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(112,9,15,.2)"; }}>
                    <Trash2 size={11} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Form modal */}
      {modal !== null && (
        <ArtForm
          initial={modal === "new" ? undefined : modal}
          onSave={handleSave}
          onClose={() => setModal(null)} />
      )}

      {/* Delete confirm */}
      {confirm !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ background: "rgba(26,10,10,.8)", backdropFilter: "blur(4px)" }}>
          <div className="w-full max-w-sm p-8" style={{ background: IV }}>
            <h3 className="text-xl mb-3" style={{ fontFamily: "'TheSeasons',Georgia,serif", color: CH }}>Remove Artwork?</h3>
            <p className="text-sm mb-8" style={{ color: "#4A4A4A" }}>This will remove the artwork from the public gallery.</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirm(null)}
                className="flex-1 text-xs tracking-[.25em] py-3"
                style={{ border: "1px solid rgba(112,9,15,.25)", color: "#4A4A4A" }}>
                Cancel
              </button>
              <button onClick={() => handleDelete(confirm)}
                className="flex-1 text-xs tracking-[.25em] py-3 text-white"
                style={{ background: B }}>
                Remove
              </button>
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
