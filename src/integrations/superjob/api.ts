import { SUPERJOB_CONFIG } from './config.js';
import type { SJItem, SJResponse } from './entities.js';
import type { SearchQuery, RawVacancy } from '../types.js';

// SuperJob requires X-Api-App-Id header (set via env)
function apiKey(): string {
  const key = process.env.SUPERJOB_API_KEY;
  if (!key) throw new Error('SUPERJOB_API_KEY not set');
  return key;
}

export async function fetchVacancies(query: SearchQuery): Promise<RawVacancy[]> {
  const params = new URLSearchParams({
    keyword: query.query,
    count: String(query.limit ?? SUPERJOB_CONFIG.defaults.limit),
    page: String(query.page ?? SUPERJOB_CONFIG.defaults.page),
  });
  if (query.salaryMin) params.set('payment_from', String(query.salaryMin));

  const url = `${SUPERJOB_CONFIG.baseUrl}/vacancies/?${params}`;
  const res = await fetch(url, {
    headers: {
      'X-Api-App-Id': apiKey(),
    },
  });
  if (!res.ok) throw new Error(`SuperJob API error: ${res.status}`);

  const data: SJResponse = await res.json();
  return data.objects.map(mapItem);
}

function mapItem(item: SJItem): RawVacancy {
  return {
    sourceId: SUPERJOB_CONFIG.id,
    externalId: String(item.id),
    title: item.profession,
    company: item.firm_name,
    location: item.town?.title ?? '',
    description: item.vacancyRichText ?? '',
    salaryFrom: item.payment_from,
    salaryTo: item.payment_to,
    salaryCurrency: item.currency,
    url: item.link,
    publishedAt: new Date(item.date_published * 1000),
    skills: (item.key_skills ?? []).map((s) => s.title),
    experience: item.experience?.title,
    employmentType: item.type_of_work?.title,
  };
}
