// src/lib/talks.ts
import { getCollection, type CollectionEntry } from "astro:content";

export type Activity = CollectionEntry<"activities">;

const toTime = (s?: string) => {
  const t = s ? new Date(s).getTime() : 0;
  return Number.isNaN(t) ? 0 : t;
};

// last 4-digit year in a string (e.g., "2024–2025" -> 2025)
const lastYear = (s?: string) => {
  if (!s) return 0;
  const m = String(s).match(/(\d{4})(?!.*\d{4})/);
  return m ? parseInt(m[1], 10) : 0;
};

const talkTimestamp = (t: Activity) => {
  // Prefer exact date; fallback to last year in `period` as Dec 31 that year
  const dt = toTime(t.data.date);
  if (dt) return dt;
  const y = lastYear(t.data.period);
  return y ? new Date(y, 11, 31).getTime() : 0; // Dec 31, y
};

export function normalizeSpeakers(v?: unknown): string[] {
  if (!v) return [];
  if (Array.isArray(v)) return v.filter(Boolean).map(String);
  if (typeof v === "string") return v.split(",").map((s) => s.trim()).filter(Boolean);
  return [];
}

export async function loadTalks() {
  const items = await getCollection("activities", ({ data }) => data.type === "talk" && !data.draft);

  const withMeta = items.map((t) => {
    const y = (t.data.date ? new Date(t.data.date).getFullYear() : lastYear(t.data.period)) || 0;
    return { ...t, _year: y, _speakers: normalizeSpeakers(t.data.speakers) };
  });

  // Sort globally (helps overall order, but we’ll re-sort within each year too)
  withMeta.sort((a, b) => talkTimestamp(b) - talkTimestamp(a));

  // Group by year
  const byYear = new Map<number, Activity[]>();
  for (const t of withMeta) {
    const y = t._year || 0;
    if (!byYear.has(y)) byYear.set(y, []);
    byYear.get(y)!.push(t as Activity);
  }

  // Years: newest -> oldest
  const years = [...byYear.keys()].sort((a, b) => b - a);

  // EXPLICIT per-year sort: newest -> oldest (with sensible fallbacks)
  const groups = years.map((y) => {
    const arr = byYear.get(y)!;
    arr.sort((a, b) =>
      (talkTimestamp(b) - talkTimestamp(a)) ||
      ((b.data.weight ?? 0) - (a.data.weight ?? 0)) ||
      a.slug.localeCompare(b.slug)
    );
    return { year: y, items: arr };
  });

  const members = Array.from(new Set(withMeta.flatMap((t) => t._speakers))).sort((a, b) => a.localeCompare(b));

  return { years, groups, members };
}
