import { getCollection, type CollectionEntry } from 'astro:content';

export type Pub = CollectionEntry<'publications'>;

const toTime = (s?: string) => {
  const t = s ? new Date(s).getTime() : 0;
  return Number.isNaN(t) ? 0 : t;
};
const toYear = (y: unknown) =>
  typeof y === 'number' ? y : parseInt(String(y ?? '0'), 10) || 0;

export function authorLine(authors?: unknown) {
  if (!authors) return '';
  if (Array.isArray(authors)) return authors.join(', ');
  if (typeof authors === 'string') return authors;
  try {
    return String(authors);
  } catch {
    return '';
  }
}

export function toStringArray(v?: unknown): string[] {
  if (!v) return [];
  if (Array.isArray(v)) return v.filter(Boolean).map(String);
  if (typeof v === 'string') {
    return v.split(',').map((s) => s.trim()).filter(Boolean);
  }
  return [];
}

export function doiLikeUrl(doi?: string, url?: string) {
  const v =
    (typeof doi === 'string' && doi.trim()) ||
    (typeof url === 'string' && url.trim()) ||
    '';
  if (!v) return null;
  return /^https?:\/\//i.test(v) ? v : 'https://doi.org/' + v;
}

export function arxivUrl(id?: string) {
  if (!id) return null;
  return /^https?:\/\//i.test(id) ? id : 'https://arxiv.org/abs/' + id;
}

export type YearGroup = { year: number; items: Pub[] };

/** Load, group and sort publications. Keep this server-only. */
export async function loadPublications(): Promise<{
  years: number[];
  groups: YearGroup[];
}> {
  const pubs = await getCollection('publications');

  const byYear = new Map<number, Pub[]>();
  for (const p of pubs) {
    const y = toYear(p.data.year);
    if (!byYear.has(y)) byYear.set(y, []);
    byYear.get(y)!.push(p);
  }

  // Sort each year's items (highest `number` first)
  for (const list of byYear.values()) {
    list.sort((a, b) => {
      const na = Number(a.data.number ?? 0);
      const nb = Number(b.data.number ?? 0);
      return nb - na;
    });
  }

  // Order years by most recent `addedAt` (fallback to calendar year)
  const years = Array.from(byYear.keys()).sort((ya, yb) => {
    const la = Math.max(...byYear.get(ya)!.map((e) => toTime(e.data.addedAt)), 0);
    const lb = Math.max(...byYear.get(yb)!.map((e) => toTime(e.data.addedAt)), 0);
    if (lb !== la) return lb - la;
    return yb - ya;
  });

  const groups = years.map((y) => ({ year: y, items: byYear.get(y)! }));

  return { years, groups };
}

