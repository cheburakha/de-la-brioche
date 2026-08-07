import { ADZUNA_CONFIG } from "./config";
import type { AZJob, AZResponse } from "./entities";
import type { SearchQuery, RawVacancy } from "../types";

function creds(): { appId: string; appKey: string } {
  const appId = process.env.ADZUNA_APP_ID;
  const appKey = process.env.ADZUNA_API_KEY;
  // fallback defaults for demo — user should set their own
  return { appId: appId ?? "", appKey: appKey ?? "" };
}

export async function fetchVacancies(
  query: SearchQuery,
): Promise<RawVacancy[]> {
  const { appId, appKey } = creds();
  if (!appId || !appKey) return [];

  const country = "gb";
  const page = query.page ?? ADZUNA_CONFIG.defaults.page;
  const params = new URLSearchParams({
    app_id: appId,
    app_key: appKey,
    what: query.query,
    results_per_page: String(query.limit ?? ADZUNA_CONFIG.defaults.limit),
    content_type: "application/json",
  });

  const url = `${ADZUNA_CONFIG.baseUrl}/${country}/search/${page}?${params}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Adzuna error: ${res.status}`);

  const data: AZResponse = await res.json();
  return (data.results ?? []).map(mapItem);
}

function mapItem(job: AZJob): RawVacancy {
  return {
    sourceId: ADZUNA_CONFIG.id,
    externalId: job.id,
    title: job.title,
    company: job.company?.display_name ?? "",
    location: job.location?.display_name ?? "",
    description: job.description.replace(/<[^>]*>/g, "").trim(),
    salaryFrom: job.salary_min,
    salaryTo: job.salary_max,
    salaryCurrency: job.salary_currency,
    url: job.redirect_url,
    publishedAt: new Date(job.created),
    skills: job.category?.label ? [job.category.label] : [],
  };
}
