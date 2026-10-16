/**
 * Become.ing — Client-side data store
 * Persists admin-created/edited content to localStorage.
 * Public pages merge this data with the static seed in data.ts.
 */

import {
  blogPosts as seedBlogs,
  podcastEpisodes as seedPodcasts,
  artworks as seedArtworks,
} from "@/lib/data";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // full body — admin-authored posts have real content
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  featured: boolean;
}

export interface PodcastEpisode {
  id: number;
  episode: number;
  title: string;
  description: string;
  duration: string;
  date: string;
  image: string;
  youtubeUrl: string;
  spotifyUrl: string;
  appleUrl: string;
  featured: boolean;
}

export interface Artwork {
  id: number;
  title: string;
  artist: string;
  medium: string;
  description: string;
  image: string;
  dimensions: string; // renamed from "width" — "60cm × 80cm"
}

// ─── Storage keys ─────────────────────────────────────────────────────────────

const KEYS = {
  blogs: "bi_blogs",
  podcasts: "bi_podcasts",
  artworks: "bi_artworks",
} as const;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function load<T>(key: string): T[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch {
    return [];
  }
}

function save<T>(key: string, data: T[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(data));
}

function nextId(items: { id: number }[]): number {
  return items.length === 0 ? 1 : Math.max(...items.map((i) => i.id)) + 1;
}

// Slugify a title
export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

// ─── Seed adapters (normalise legacy fields) ──────────────────────────────────

function normaliseBlog(p: (typeof seedBlogs)[0]): BlogPost {
  return { ...p, content: "", featured: p.featured ?? false };
}

function normalisePodcast(ep: (typeof seedPodcasts)[0]): PodcastEpisode {
  return { ...ep, featured: ep.featured ?? false };
}

function normaliseArtwork(a: (typeof seedArtworks)[0]): Artwork {
  return {
    id: a.id,
    title: a.title,
    artist: a.artist,
    medium: a.medium,
    description: a.description,
    image: a.image,
    dimensions: a.width ?? "",
  };
}

// ─── BLOGS ────────────────────────────────────────────────────────────────────

/** Returns seed blogs + admin-added/edited blogs, sorted newest-first by id */
export function getBlogs(): BlogPost[] {
  const stored = load<BlogPost>(KEYS.blogs);
  const storedIds = new Set(stored.map((b) => b.id));
  // Keep seed entries that haven't been overridden
  const seedNorm = seedBlogs.map(normaliseBlog).filter((b) => !storedIds.has(b.id));
  return [...stored, ...seedNorm].sort((a, b) => b.id - a.id);
}

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return getBlogs().find((b) => b.slug === slug);
}

export function saveBlog(blog: Omit<BlogPost, "id" | "slug">): BlogPost {
  const all = load<BlogPost>(KEYS.blogs);
  const id = nextId([...all, ...seedBlogs]);
  const slug = slugify(blog.title);
  const newBlog: BlogPost = { ...blog, id, slug };
  save(KEYS.blogs, [...all, newBlog]);
  return newBlog;
}

export function updateBlog(id: number, patch: Partial<BlogPost>): void {
  // If editing a seed post, we copy it into localStorage with the patch applied
  const all = load<BlogPost>(KEYS.blogs);
  const idx = all.findIndex((b) => b.id === id);
  if (idx !== -1) {
    all[idx] = { ...all[idx], ...patch };
    save(KEYS.blogs, all);
  } else {
    // Copy seed post → localStorage with patch
    const seed = seedBlogs.find((b) => b.id === id);
    if (seed) {
      const normalised = normaliseBlog(seed);
      save(KEYS.blogs, [...all, { ...normalised, ...patch }]);
    }
  }
}

export function deleteBlog(id: number): void {
  // Remove from localStorage store (seed posts are just hidden via a deletions list)
  const stored = load<BlogPost>(KEYS.blogs).filter((b) => b.id !== id);
  save(KEYS.blogs, stored);

  // Track deleted seed IDs so getBlogs() excludes them
  const deletedKey = "bi_deleted_blogs";
  const deleted: number[] = JSON.parse(localStorage.getItem(deletedKey) ?? "[]");
  if (!deleted.includes(id)) {
    localStorage.setItem(deletedKey, JSON.stringify([...deleted, id]));
  }
}

/** Returns blogs for public display, honouring deletions */
export function getPublicBlogs(): BlogPost[] {
  if (typeof window === "undefined") return seedBlogs.map(normaliseBlog);
  const deletedKey = "bi_deleted_blogs";
  const deleted: number[] = JSON.parse(
    localStorage.getItem(deletedKey) ?? "[]"
  );
  return getBlogs().filter((b) => !deleted.includes(b.id));
}

// ─── PODCASTS ─────────────────────────────────────────────────────────────────

export function getPodcasts(): PodcastEpisode[] {
  const stored = load<PodcastEpisode>(KEYS.podcasts);
  const storedIds = new Set(stored.map((p) => p.id));
  const seedNorm = seedPodcasts
    .map(normalisePodcast)
    .filter((p) => !storedIds.has(p.id));
  return [...stored, ...seedNorm].sort((a, b) => b.episode - a.episode);
}

export function savePodcast(
  ep: Omit<PodcastEpisode, "id">
): PodcastEpisode {
  const all = load<PodcastEpisode>(KEYS.podcasts);
  const id = nextId([...all, ...seedPodcasts]);
  const newEp: PodcastEpisode = { ...ep, id };
  save(KEYS.podcasts, [...all, newEp]);
  return newEp;
}

export function updatePodcast(id: number, patch: Partial<PodcastEpisode>): void {
  const all = load<PodcastEpisode>(KEYS.podcasts);
  const idx = all.findIndex((p) => p.id === id);
  if (idx !== -1) {
    all[idx] = { ...all[idx], ...patch };
    save(KEYS.podcasts, all);
  } else {
    const seed = seedPodcasts.find((p) => p.id === id);
    if (seed) {
      save(KEYS.podcasts, [...all, { ...normalisePodcast(seed), ...patch }]);
    }
  }
}

export function deletePodcast(id: number): void {
  const stored = load<PodcastEpisode>(KEYS.podcasts).filter((p) => p.id !== id);
  save(KEYS.podcasts, stored);
  const deletedKey = "bi_deleted_podcasts";
  const deleted: number[] = JSON.parse(localStorage.getItem(deletedKey) ?? "[]");
  if (!deleted.includes(id)) {
    localStorage.setItem(deletedKey, JSON.stringify([...deleted, id]));
  }
}

export function getPublicPodcasts(): PodcastEpisode[] {
  if (typeof window === "undefined") return seedPodcasts.map(normalisePodcast);
  const deletedKey = "bi_deleted_podcasts";
  const deleted: number[] = JSON.parse(
    localStorage.getItem(deletedKey) ?? "[]"
  );
  return getPodcasts().filter((p) => !deleted.includes(p.id));
}

// ─── ARTWORKS ─────────────────────────────────────────────────────────────────

export function getArtworks(): Artwork[] {
  const stored = load<Artwork>(KEYS.artworks);
  const storedIds = new Set(stored.map((a) => a.id));
  const seedNorm = seedArtworks
    .map(normaliseArtwork)
    .filter((a) => !storedIds.has(a.id));
  return [...stored, ...seedNorm].sort((a, b) => b.id - a.id);
}

export function saveArtwork(art: Omit<Artwork, "id">): Artwork {
  const all = load<Artwork>(KEYS.artworks);
  const id = nextId([...all, ...seedArtworks]);
  const newArt: Artwork = { ...art, id };
  save(KEYS.artworks, [...all, newArt]);
  return newArt;
}

export function updateArtwork(id: number, patch: Partial<Artwork>): void {
  const all = load<Artwork>(KEYS.artworks);
  const idx = all.findIndex((a) => a.id === id);
  if (idx !== -1) {
    all[idx] = { ...all[idx], ...patch };
    save(KEYS.artworks, all);
  } else {
    const seed = seedArtworks.find((a) => a.id === id);
    if (seed) {
      save(KEYS.artworks, [...all, { ...normaliseArtwork(seed), ...patch }]);
    }
  }
}

export function deleteArtwork(id: number): void {
  const stored = load<Artwork>(KEYS.artworks).filter((a) => a.id !== id);
  save(KEYS.artworks, stored);
  const deletedKey = "bi_deleted_artworks";
  const deleted: number[] = JSON.parse(localStorage.getItem(deletedKey) ?? "[]");
  if (!deleted.includes(id)) {
    localStorage.setItem(deletedKey, JSON.stringify([...deleted, id]));
  }
}

export function getPublicArtworks(): Artwork[] {
  if (typeof window === "undefined") return seedArtworks.map(normaliseArtwork);
  const deletedKey = "bi_deleted_artworks";
  const deleted: number[] = JSON.parse(
    localStorage.getItem(deletedKey) ?? "[]"
  );
  return getArtworks().filter((a) => !deleted.includes(a.id));
}

// ─── AUTH ─────────────────────────────────────────────────────────────────────

const ADMIN_PASSWORD = "becoming2025";
const SESSION_KEY = "bi_admin_session";

export function adminLogin(password: string): boolean {
  if (password === ADMIN_PASSWORD) {
    sessionStorage.setItem(SESSION_KEY, "true");
    return true;
  }
  return false;
}

export function adminLogout(): void {
  sessionStorage.removeItem(SESSION_KEY);
}

export function isAdminLoggedIn(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(SESSION_KEY) === "true";
}
