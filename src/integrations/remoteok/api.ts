import { REMOTEOK_CONFIG } from "./config.js";
import type { ROJob } from "./entities.js";
import type { SearchQuery, RawVacancy } from "../types.js";

export async function fetchVacancies(
  query: SearchQuery,
): Promise<RawVacancy[]> {
  const url = `${REMOTEOK_CONFIG.baseUrl}?tags=${encodeURIComponent(query.query)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`RemoteOK error: ${res.status}`);

  const data: ROJob[] = await res.json();
  // First entry is a meta object, skip it
  const jobs = Array.isArray(data)
    ? data.filter((j): j is ROJob => "id" in j && typeof j.id === "number")
    : [];

  return jobs
    .slice(0, query.limit ?? REMOTEOK_CONFIG.defaults.limit)
    .map(mapItem);
}

function mapItem(job: ROJob): RawVacancy {
  return {
    sourceId: REMOTEOK_CONFIG.id,
    externalId: String(job.id),
    title: job.position,
    company: job.company,
    location: job.location || "Remote",
    description: job.description.replace(/<[^>]*>/g, "").trim(),
    url: job.url.startsWith("http")
      ? job.url
      : `https://remoteok.com${job.url}`,
    publishedAt: new Date(job.date),
    skills: job.tags ?? [],
    salaryCurrency: job.salary ? parseCurrency(job.salary) : undefined,
    employmentType: "remote",
  };
}

function parseCurrency(s: string): string | undefined {
  const m = s.match(/(USD|EUR|GBP|RUB|\$|€|£)/);
  if (!m) return undefined;
  const map: Record<string, string> = { $: "USD", "€": "EUR", "£": "GBP" };
  return map[m[1]] ?? m[1];
}
