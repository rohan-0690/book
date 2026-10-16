"use client";
import { useRef, useState, DragEvent } from "react";
import Image from "next/image";
import { Upload, X, Link as LinkIcon, Loader2 } from "lucide-react";

const B   = "#70090F";
const BL  = "#FFE9DF";
const IV  = "#F8F6E7";
const CH  = "#2C2C2C";

interface Props {
  /** Current image URL (controlled) */
  value: string;
  /** Called whenever the URL changes (upload or manual paste) */
  onChange: (url: string) => void;
  /** Preview height in px – default 160 */
  previewHeight?: number;
  label?: string;
}

export default function ImageUploader({
  value,
  onChange,
  previewHeight = 160,
  label = "Cover Image",
}: Props) {
  const inputRef            = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error,     setError]     = useState("");
  const [dragging,  setDragging]  = useState(false);
  const [showUrl,   setShowUrl]   = useState(false);

  // ── Upload a File object to the API ────────────────────────────────────────
  async function uploadFile(file: File) {
    setUploading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res  = await fetch("/api/upload", { method: "POST", body: fd });
      const json = await res.json() as { url?: string; error?: string };
      if (!res.ok || !json.url) {
        setError(json.error ?? "Upload failed. Please try again.");
      } else {
        onChange(json.url);
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  // ── File input change ───────────────────────────────────────────────────────
  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
    // reset so same file can be re-selected
    e.target.value = "";
  }

  // ── Drag & drop ─────────────────────────────────────────────────────────────
  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  }

  function handleDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragging(true);
  }

  function handleDragLeave() {
    setDragging(false);
  }

  // ── Clear ───────────────────────────────────────────────────────────────────
  function clearImage() {
    onChange("");
    setError("");
  }

  return (
    <div>
      {/* Label row */}
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-[10px] tracking-[.3em]" style={{ color: "#4A4A4A" }}>
          {label}
        </label>
        <button
          type="button"
          onClick={() => setShowUrl(v => !v)}
          className="text-[10px] tracking-[.2em] flex items-center gap-1 transition-colors"
          style={{ color: showUrl ? B : "rgba(74,74,74,.55)" }}>
          <LinkIcon size={11} /> {showUrl ? "Hide URL" : "Paste URL instead"}
        </button>
      </div>

      {/* URL input (optional fallback) */}
      {showUrl && (
        <div className="mb-2">
          <input
            type="text"
            value={value}
            onChange={e => { onChange(e.target.value); setError(""); }}
            placeholder="https://images.unsplash.com/..."
            className="w-full text-sm px-4 py-2.5 focus:outline-none transition-colors"
            style={{ background: "#fff", border: "1px solid rgba(112,9,15,.18)", color: CH }}
            onFocus={e => (e.target.style.borderColor = B)}
            onBlur={e => (e.target.style.borderColor = "rgba(112,9,15,.18)")}
          />
        </div>
      )}

      {/* Drop zone / preview */}
      {value ? (
        /* ── Preview ── */
        <div className="relative w-full overflow-hidden group" style={{ height: previewHeight }}>
          <Image
            src={value} alt="preview" fill
            className="object-cover" sizes="640px" unoptimized
          />
          {/* overlay on hover */}
          <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ background: "rgba(26,10,10,.6)" }}>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="flex items-center gap-1.5 text-[10px] tracking-[.25em] px-4 py-2 text-white transition-colors"
              style={{ background: B }}>
              {uploading
                ? <Loader2 size={12} className="animate-spin" />
                : <Upload size={12} />}
              {uploading ? "Uploading…" : "Change"}
            </button>
            <button
              type="button"
              onClick={clearImage}
              className="flex items-center gap-1.5 text-[10px] tracking-[.25em] px-4 py-2 text-white"
              style={{ background: "rgba(26,10,10,.85)", border: "1px solid rgba(255,255,255,.2)" }}>
              <X size={12} /> Remove
            </button>
          </div>
        </div>
      ) : (
        /* ── Drop zone ── */
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => !uploading && inputRef.current?.click()}
          className="flex flex-col items-center justify-center gap-3 cursor-pointer transition-all select-none"
          style={{
            height: previewHeight,
            background: dragging ? BL : "#fff",
            border: `2px dashed ${dragging ? B : "rgba(112,9,15,.25)"}`,
          }}>
          {uploading ? (
            <>
              <Loader2 size={28} className="animate-spin" style={{ color: B }} />
              <p className="text-[10px] tracking-[.25em]" style={{ color: B }}>Uploading…</p>
            </>
          ) : (
            <>
              <div className="w-12 h-12 flex items-center justify-center rounded-full"
                style={{ background: BL }}>
                <Upload size={20} style={{ color: B }} />
              </div>
              <div className="text-center">
                <p className="text-xs tracking-[.2em]" style={{ color: CH }}>
                  Click to browse or drag & drop
                </p>
                <p className="text-[10px] tracking-[.15em] mt-1" style={{ color: "rgba(74,74,74,.55)" }}>
                  JPG · PNG · WEBP · GIF · max 10 MB
                </p>
              </div>
            </>
          )}
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp,image/gif,image/avif"
        className="hidden"
        onChange={handleFileInput}
      />

      {/* Error */}
      {error && (
        <p className="text-[10px] tracking-[.1em] mt-1.5 flex items-center gap-1" style={{ color: B }}>
          <X size={11} /> {error}
        </p>
      )}
    </div>
  );
}
