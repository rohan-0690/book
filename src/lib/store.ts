/**
 * Become.ing — Supabase-backed data store
 * All content is persisted in Supabase so changes appear on the live site.
 */

import { supabase } from "@/lib/supabase";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  read_time: string;
  image: string;
  featured: boolean;
  created_at?: string;
}

export interface PodcastEpisode {
  id: number;
  episode: number;
  title: string;
  description: string;
  duration: string;
  date: string;
  image: string;
  youtube_url: string;
  spotify_url: string;
  apple_url: string;
  featured: boolean;
  created_at?: string;
}

export interface Artwork {
  id: number;
  title: string;
  artist: string;
  medium: string;
  description: string;
  image: string;
  dimensions: string;
  created_at?: string;
}

// ─── Auth helpers ─────────────────────────────────────────────────────────────

const ADMIN_PASSWORD = "becoming2025";
const SESSION_KEY    = "bi_admin_session";

export function adminLogin(password: string): boolean {
  if (password === ADMIN_PASSWORD) {
    if (typeof window !== "undefined") sessionStorage.setItem(SESSION_KEY, "true");
    return true;
  }
  return false;
}

export function adminLogout(): void {
  if (typeof window !== "undefined") sessionStorage.removeItem(SESSION_KEY);
}

export function isAdminLoggedIn(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(SESSION_KEY) === "true";
}

// ─── Slug helper ──────────────────────────────────────────────────────────────

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

// ─── BLOGS ────────────────────────────────────────────────────────────────────

export async function getBlogs(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) { console.error(error); return []; }
  return data ?? [];
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error) return null;
  return data;
}

export async function saveBlog(
  blog: Omit<BlogPost, "id" | "slug" | "created_at">
): Promise<BlogPost | null> {
  const slug = slugify(blog.title);
  const { data, error } = await supabase
    .from("blog_posts")
    .insert({ ...blog, slug })
    .select()
    .single();
  if (error) { console.error(error); return null; }
  return data;
}

export async function updateBlog(
  id: number,
  patch: Partial<Omit<BlogPost, "id" | "created_at">>
): Promise<void> {
  const { error } = await supabase
    .from("blog_posts")
    .update(patch)
    .eq("id", id);
  if (error) console.error(error);
}

export async function deleteBlog(id: number): Promise<void> {
  const { error } = await supabase
    .from("blog_posts")
    .delete()
    .eq("id", id);
  if (error) console.error(error);
}

// ─── PODCASTS ─────────────────────────────────────────────────────────────────

export async function getPodcasts(): Promise<PodcastEpisode[]> {
  const { data, error } = await supabase
    .from("podcast_episodes")
    .select("*")
    .order("episode", { ascending: false });
  if (error) { console.error(error); return []; }
  return data ?? [];
}

export async function savePodcast(
  ep: Omit<PodcastEpisode, "id" | "created_at">
): Promise<PodcastEpisode | null> {
  const { data, error } = await supabase
    .from("podcast_episodes")
    .insert(ep)
    .select()
    .single();
  if (error) { console.error(error); return null; }
  return data;
}

export async function updatePodcast(
  id: number,
  patch: Partial<Omit<PodcastEpisode, "id" | "created_at">>
): Promise<void> {
  const { error } = await supabase
    .from("podcast_episodes")
    .update(patch)
    .eq("id", id);
  if (error) console.error(error);
}

export async function deletePodcast(id: number): Promise<void> {
  const { error } = await supabase
    .from("podcast_episodes")
    .delete()
    .eq("id", id);
  if (error) console.error(error);
}

// ─── ARTWORKS ─────────────────────────────────────────────────────────────────

export async function getArtworks(): Promise<Artwork[]> {
  const { data, error } = await supabase
    .from("artworks")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) { console.error(error); return []; }
  return data ?? [];
}

export async function saveArtwork(
  art: Omit<Artwork, "id" | "created_at">
): Promise<Artwork | null> {
  const { data, error } = await supabase
    .from("artworks")
    .insert(art)
    .select()
    .single();
  if (error) { console.error(error); return null; }
  return data;
}

export async function updateArtwork(
  id: number,
  patch: Partial<Omit<Artwork, "id" | "created_at">>
): Promise<void> {
  const { error } = await supabase
    .from("artworks")
    .update(patch)
    .eq("id", id);
  if (error) console.error(error);
}

export async function deleteArtwork(id: number): Promise<void> {
  const { error } = await supabase
    .from("artworks")
    .delete()
    .eq("id", id);
  if (error) console.error(error);
}
