import { HH_CONFIG } from "./config.js";
import type { HHItem, HHResponse } from "./entities.js";
import type { SearchQuery, RawVacancy } from "../types.js";

export async function fetchVacancies(
  query: SearchQuery,
): Promise<RawVacancy[]> {
  const params = new URLSearchParams({
    text: query.query,
    per_page: String(query.limit ?? HH_CONFIG.defaults.limit),
    area: String(HH_CONFIG.defaults.area),
    period: String(HH_CONFIG.defaults.period),
    page: String(query.page ?? 0),
  });
  if (query.schedule && query.schedule !== "full") {
    params.set("schedule", query.schedule === "remote" ? "remote" : "flexible");
  }
  if (query.experience) {
    const expMap: Record<string, string> = {
      no: "noExperience",
      "1-3": "between1And3",
      "3-6": "between3And6",
      "6+": "moreThan6",
    };
    params.set("experience", expMap[query.experience] ?? "");
  }
  if (query.salaryMin) params.set("salary", String(query.salaryMin));
  if (query.location) params.set("search_field", "name");

  const url = `${HH_CONFIG.baseUrl}/vacancies?${params}`;
  const res = await fetch(url, {
    headers: { "User-Agent": HH_CONFIG.userAgent },
  });
  if (!res.ok) throw new Error(`HH.ru API error: ${res.status}`);

  const data: HHResponse = await res.json();
  return data.items.map(mapItem);
}

function mapItem(item: HHItem): RawVacancy {
  const desc = [item.snippet?.requirement, item.snippet?.responsibility]
    .filter(Boolean)
    .join("\n");

  return {
    sourceId: HH_CONFIG.id,
    externalId: item.id,
    title: item.name,
    company: item.employer.name,
    location: item.area.name,
    description: desc,
    salaryFrom: item.salary?.from,
    salaryTo: item.salary?.to,
    salaryCurrency: item.salary?.currency,
    url: item.alternate_url,
    publishedAt: new Date(item.published_at),
    skills: (item.key_skills ?? []).map((s) => s.name),
    experience: item.experience?.name,
    employmentType: item.employment?.name,
  };
}
