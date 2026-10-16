"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  getPodcasts, savePodcast, updatePodcast, deletePodcast,
  type PodcastEpisode,
} from "@/lib/store";
import {
  ArrowLeft, Plus, Pencil, Trash2, Star, StarOff,
  X, Check, ImageIcon,
} from "lucide-react";
import ImageUploader from "@/components/admin/ImageUploader";

const B = "#70090F", B2 = "#560008", BL = "#FFE9DF", IV = "#F8F6E7", CH = "#2C2C2C";

const EMPTY: Omit<PodcastEpisode, "id"> = {
  episode: 1, title: "", description: "", duration: "",
  date: "", image: "", youtubeUrl: "", spotifyUrl: "", appleUrl: "", featured: false,
};

function today(): string {
  return new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="block text-[10px] tracking-[.3em] mb-1.5" style={{ color: "#4A4A4A" }}>{children}</label>;
}
function Input({ value, onChange, placeholder, type = "text" }: {
  value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
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
function PodcastForm({ initial, onSave, onClose }: {
  initial?: PodcastEpisode;
  onSave: (data: Omit<PodcastEpisode, "id">) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<Omit<PodcastEpisode, "id">>(
    initial
      ? { episode: initial.episode, title: initial.title, description: initial.description,
          duration: initial.duration, date: initial.date, image: initial.image,
          youtubeUrl: initial.youtubeUrl, spotifyUrl: initial.spotifyUrl,
          appleUrl: initial.appleUrl, featured: initial.featured }
      : { ...EMPTY, date: today() }
  );

  const set = (key: keyof typeof form, value: string | boolean | number) =>
    setForm(prev => ({ ...prev, [key]: value }));

  const valid = form.title.trim() && form.description.trim() && form.image.trim();

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 overflow-y-auto"
      style={{ background: "rgba(26,10,10,.85)", backdropFilter: "blur(4px)" }}>
      <div className="relative w-full max-w-2xl my-8" style={{ background: IV }}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5"
          style={{ borderBottom: `1px solid rgba(112,9,15,.15)` }}>
          <h2 className="text-xl" style={{ fontFamily: "'TheSeasons',Georgia,serif", color: CH }}>
            {initial ? "Edit Episode" : "New Episode"}
          </h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center"
            style={{ color: "#4A4A4A" }}>
            <X size={18} />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-5">
          {/* Episode number + Duration */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <FieldLabel>Episode Number *</FieldLabel>
              <input type="number" value={form.episode}
                onChange={e => set("episode", parseInt(e.target.value) || 1)}
                className="w-full text-sm px-4 py-2.5 focus:outline-none"
                style={{ background: "#fff", border: "1px solid rgba(112,9,15,.18)", color: CH }}
                onFocus={e => (e.target.style.borderColor = B)}
                onBlur={e => (e.target.style.borderColor = "rgba(112,9,15,.18)")} />
            </div>
            <div>
              <FieldLabel>Duration</FieldLabel>
              <Input value={form.duration} onChange={v => set("duration", v)} placeholder="52 min" />
            </div>
          </div>

          {/* Title */}
          <div>
            <FieldLabel>Title *</FieldLabel>
            <Input value={form.title} onChange={v => set("title", v)} placeholder="Episode title" />
          </div>

          {/* Date */}
          <div>
            <FieldLabel>Date</FieldLabel>
            <Input value={form.date} onChange={v => set("date", v)} placeholder="June 2, 2025" />
          </div>

          {/* Cover Image — upload or paste URL */}
          <ImageUploader
            label="Cover Image *"
            value={form.image}
            onChange={v => set("image", v)}
            previewHeight={150}
          />

          {/* Description */}
          <div>
            <FieldLabel>Description *</FieldLabel>
            <Textarea value={form.description} onChange={v => set("description", v)}
              placeholder="What is this episode about?" rows={4} />
          </div>

          {/* Platform URLs */}
          <div>
            <FieldLabel>YouTube URL</FieldLabel>
            <Input value={form.youtubeUrl} onChange={v => set("youtubeUrl", v)} placeholder="https://youtube.com/watch?v=..." />
          </div>
          <div>
            <FieldLabel>Spotify URL</FieldLabel>
            <Input value={form.spotifyUrl} onChange={v => set("spotifyUrl", v)} placeholder="https://open.spotify.com/episode/..." />
          </div>
          <div>
            <FieldLabel>Apple Podcasts URL</FieldLabel>
            <Input value={form.appleUrl} onChange={v => set("appleUrl", v)} placeholder="https://podcasts.apple.com/..." />
          </div>

          {/* Featured toggle */}
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <div className="relative w-10 h-5 rounded-full transition-colors"
              style={{ background: form.featured ? B : "rgba(112,9,15,.2)" }}
              onClick={() => set("featured", !form.featured)}>
              <div className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform"
                style={{ left: form.featured ? "calc(100% - 18px)" : "2px" }} />
            </div>
            <span className="text-xs tracking-[.2em]" style={{ color: "#4A4A4A" }}>Mark as Latest / Featured Episode</span>
          </label>
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
            <Check size={14} /> {initial ? "Save Changes" : "Add Episode"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AdminPodcastsPage() {
  const [episodes, setEpisodes] = useState<PodcastEpisode[]>([]);
  const [modal,    setModal]    = useState<"new" | PodcastEpisode | null>(null);
  const [confirm,  setConfirm]  = useState<number | null>(null);
  const [toast,    setToast]    = useState("");

  const reload = useCallback(() => setEpisodes(getPodcasts()), []);
  useEffect(reload, [reload]);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 2800);
  }

  function handleSave(data: Omit<PodcastEpisode, "id">) {
    if (modal === "new") {
      savePodcast(data);
      showToast("Episode added.");
    } else if (modal && typeof modal === "object") {
      updatePodcast(modal.id, data);
      showToast("Episode updated.");
    }
    setModal(null);
    reload();
  }

  function handleDelete(id: number) {
    deletePodcast(id);
    setConfirm(null);
    showToast("Episode deleted.");
    reload();
  }

  function toggleFeatured(ep: PodcastEpisode) {
    updatePodcast(ep.id, { featured: !ep.featured });
    showToast(ep.featured ? "Removed from featured." : "Set as featured.");
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
            Podcast
          </span>
        </div>
        <button onClick={() => setModal("new")}
          className="inline-flex items-center gap-2 text-white text-[10px] tracking-[.3em] px-5 py-2.5"
          style={{ background: B }}
          onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = B2)}
          onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = B)}>
          <Plus size={14} /> New Episode
        </button>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <p className="text-[10px] tracking-[.25em] mb-8" style={{ color: "#4A4A4A" }}>
          {episodes.length} episode{episodes.length !== 1 ? "s" : ""} total
        </p>

        <div className="flex flex-col gap-3">
          {episodes.map(ep => (
            <div key={ep.id} className="flex gap-4 p-4 sm:p-5 items-start"
              style={{ background: "#fff", borderLeft: ep.featured ? `3px solid ${B}` : "3px solid transparent" }}>
              {/* Thumbnail */}
              <div className="relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 overflow-hidden">
                {ep.image ? (
                  <Image src={ep.image} alt={ep.title} fill className="object-cover" sizes="80px" unoptimized />
                ) : (
                  <div className="w-full h-full flex items-center justify-center" style={{ background: BL }}>
                    <ImageIcon size={20} style={{ color: B }} />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  {ep.featured && (
                    <span className="text-[9px] tracking-[.25em] px-2 py-0.5 text-white" style={{ background: B }}>
                      Featured
                    </span>
                  )}
                  <span className="text-[9px] tracking-[.2em] px-2 py-0.5" style={{ background: BL, color: B }}>
                    Ep. {ep.episode}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg leading-snug mb-1"
                  style={{ fontFamily: "'TheSeasons',Georgia,serif", color: CH }}>
                  {ep.title}
                </h3>
                <p className="text-xs line-clamp-2 mb-2" style={{ color: "#4A4A4A" }}>{ep.description}</p>
                <p className="text-[10px] tracking-[.15em]" style={{ color: "rgba(74,74,74,.6)" }}>
                  {ep.date} · {ep.duration}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-2 flex-shrink-0">
                <button onClick={() => toggleFeatured(ep)}
                  className="w-8 h-8 flex items-center justify-center transition-colors"
                  style={{ border: "1px solid rgba(112,9,15,.2)", color: ep.featured ? B : "#4A4A4A" }}
                  title={ep.featured ? "Remove featured" : "Set as featured"}>
                  {ep.featured ? <Star size={14} /> : <StarOff size={14} />}
                </button>
                <button onClick={() => setModal(ep)}
                  className="w-8 h-8 flex items-center justify-center transition-colors"
                  style={{ border: "1px solid rgba(112,9,15,.2)", color: "#4A4A4A" }}
                  title="Edit"
                  onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = BL)}
                  onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = "transparent")}>
                  <Pencil size={14} />
                </button>
                <button onClick={() => setConfirm(ep.id)}
                  className="w-8 h-8 flex items-center justify-center transition-colors"
                  style={{ border: "1px solid rgba(112,9,15,.2)", color: "#4A4A4A" }}
                  title="Delete"
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = B; (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; (e.currentTarget as HTMLButtonElement).style.color = "#4A4A4A"; }}>
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Form modal */}
      {modal !== null && (
        <PodcastForm
          initial={modal === "new" ? undefined : modal}
          onSave={handleSave}
          onClose={() => setModal(null)} />
      )}

      {/* Delete confirm */}
      {confirm !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ background: "rgba(26,10,10,.8)", backdropFilter: "blur(4px)" }}>
          <div className="w-full max-w-sm p-8" style={{ background: IV }}>
            <h3 className="text-xl mb-3" style={{ fontFamily: "'TheSeasons',Georgia,serif", color: CH }}>Delete Episode?</h3>
            <p className="text-sm mb-8" style={{ color: "#4A4A4A" }}>This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirm(null)}
                className="flex-1 text-xs tracking-[.25em] py-3"
                style={{ border: "1px solid rgba(112,9,15,.25)", color: "#4A4A4A" }}>
                Cancel
              </button>
              <button onClick={() => handleDelete(confirm)}
                className="flex-1 text-xs tracking-[.25em] py-3 text-white"
                style={{ background: B }}>
                Delete
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
