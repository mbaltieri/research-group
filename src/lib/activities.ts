// src/lib/activities.ts
import { getCollection, type CollectionEntry } from "astro:content";

export type Activity = CollectionEntry<"activities">;

export const typeLabel: Record<string, string> = {
  // talk: "Talks and Panels", // (hidden on the grid for now)
  workshop: "Conferences and Workshops",
  readinggroup: "Reading Groups",
  seminar: "Seminar Series",
  other: "Other Activities",
};

export async function loadActivities() {
  const records = (await getCollection("activities"))
    .filter((e) => !e.data.draft)
    .sort((a, b) => (a.data.weight ?? 0) - (b.data.weight ?? 0));

  // Group by type (exclude "talk" from the grid)
  const groups = {
    workshop: [] as Activity[],
    // readinggroup: [] as Activity[],
    seminar: [] as Activity[],
    other: [] as Activity[],
  };

  for (const r of records) {
    if (r.data.type === "talk") continue; // grid hidden for talks
    const key = r.data.type as keyof typeof groups;
    if (groups[key]) groups[key].push(r as Activity);
  }

  return { groups };
}

