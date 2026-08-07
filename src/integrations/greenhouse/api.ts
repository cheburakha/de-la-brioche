import { GREENHOUSE_CONFIG } from "./config";
import type { GHJob, GHResponse } from "./entities";
import type { SearchQuery, RawVacancy } from "../types";

// Greenhouse boards API is per-company; we search a few well-known companies.
// In a future version this will be configurable.
const TARGET_BOARDS = [
  "github",
  "stripe",
  "shopify",
  "datadog",
  "figma",
  "linear",
  "vercel",
];

export async function fetchVacancies(
  query: SearchQuery,
): Promise<RawVacancy[]> {
  const results: RawVacancy[] = [];

  for (const board of TARGET_BOARDS) {
    try {
      const url = `${GREENHOUSE_CONFIG.baseUrl}/boards/${board}/jobs?content=true`;
      const res = await fetch(url);
      if (!res.ok) continue;

      const data: GHResponse = await res.json();
      for (const job of data.jobs) {
        if (!matchesQuery(job, query)) continue;
        results.push(mapItem(job, board));
      }
    } catch {
      // skip failed boards silently
    }
  }

  return results;
}

function matchesQuery(job: GHJob, query: SearchQuery): boolean {
  const q = query.query.toLowerCase();
  return (
    job.title.toLowerCase().includes(q) ||
    (job.content ?? "").toLowerCase().includes(q) ||
    job.offices.some((o) => o.name.toLowerCase().includes(q))
  );
}

function mapItem(job: GHJob, board: string): RawVacancy {
  const office = job.offices.map((o) => o.name).join(", ");
  const departments = job.departments.map((d) => d.name).join(", ");

  return {
    sourceId: GREENHOUSE_CONFIG.id,
    externalId: `${board}-${job.id}`,
    title: job.title,
    company: `${board} (via Greenhouse)`,
    location: job.location?.name ?? office,
    description: stripHtml(job.content ?? ""),
    url: job.absolute_url,
    publishedAt: new Date(job.updated_at),
    skills: [departments].filter(Boolean),
    employmentType: departments,
  };
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
