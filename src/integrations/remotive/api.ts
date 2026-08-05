import { REMOTIVE_CONFIG } from "./config.js";
import type { RMJob, RMResponse } from "./entities.js";
import type { SearchQuery, RawVacancy } from "../types.js";

export async function fetchVacancies(
  query: SearchQuery,
): Promise<RawVacancy[]> {
  const params = new URLSearchParams({
    search: query.query,
    limit: String(query.limit ?? REMOTIVE_CONFIG.defaults.limit),
  });
  const url = `${REMOTIVE_CONFIG.baseUrl}?${params}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Remotive error: ${res.status}`);

  const data: RMResponse = await res.json();
  return (data.jobs ?? []).map(mapItem);
}

function mapItem(job: RMJob): RawVacancy {
  return {
    sourceId: REMOTIVE_CONFIG.id,
    externalId: String(job.id),
    title: job.title,
    company: job.company_name,
    location: job.candidate_required_location || "Remote",
    description: job.description.replace(/<[^>]*>/g, "").trim(),
    url: job.url,
    publishedAt: new Date(job.publication_date),
    skills: job.tags ?? [],
    employmentType: job.job_type ?? "remote",
    salaryCurrency: job.salary ? parseCurrency(job.salary) : undefined,
  };
}

function parseCurrency(s: string): string | undefined {
  const m = s.match(/(USD|EUR|GBP|RUB|\$|€|£)/);
  if (!m) return undefined;
  const map: Record<string, string> = { $: "USD", "€": "EUR", "£": "GBP" };
  return map[m[1]] ?? m[1];
}
