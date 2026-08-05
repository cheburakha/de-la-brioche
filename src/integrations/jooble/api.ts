import { JOOBLE_CONFIG } from "./config.js";
import type { JBJob, JBResponse } from "./entities.js";
import type { SearchQuery, RawVacancy } from "../types.js";

function apiKey(): string {
  const key = process.env.JOOBLE_API_KEY;
  if (!key) throw new Error("JOOBLE_API_KEY not set");
  return key;
}

export async function fetchVacancies(
  query: SearchQuery,
): Promise<RawVacancy[]> {
  const url = `${JOOBLE_CONFIG.baseUrl}/${apiKey()}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      keywords: query.query,
      location: query.location ?? "",
      page: (query.page ?? 1) + 1,
      resultOnPage: query.limit ?? JOOBLE_CONFIG.defaults.limit,
    }),
  });
  if (!res.ok) throw new Error(`Jooble error: ${res.status}`);

  const data: JBResponse = await res.json();
  return (data.jobs ?? []).map(mapItem);
}

function mapItem(job: JBJob): RawVacancy {
  let salaryFrom: number | undefined;
  let salaryTo: number | undefined;
  let salaryCurrency: string | undefined;

  if (job.salary) {
    const m = job.salary.match(
      /([\d,]+)\s*[-–]\s*([\d,]+)\s*([A-Z]{3}|\$|€|£)/,
    );
    if (m) {
      salaryFrom = parseNumber(m[1]);
      salaryTo = parseNumber(m[2]);
      const cur = m[3];
      const map: Record<string, string> = { $: "USD", "€": "EUR", "£": "GBP" };
      salaryCurrency = map[cur] ?? cur;
    }
  }

  return {
    sourceId: JOOBLE_CONFIG.id,
    externalId: job.id,
    title: job.title,
    company: job.company,
    location: job.location,
    description: job.snippet.replace(/<[^>]*>/g, "").trim(),
    salaryFrom,
    salaryTo,
    salaryCurrency,
    url: job.link,
    publishedAt: new Date(job.updated),
    skills: [],
    employmentType: job.type,
  };
}

function parseNumber(s: string): number {
  return Number(s.replace(/[,\s]/g, ""));
}
