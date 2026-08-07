import type { JobSource, SearchQuery, RawVacancy } from "../types";
import { ADZUNA_CONFIG } from "./config";
import { fetchVacancies } from "./api";

export class AdzunaSource implements JobSource {
  meta = {
    id: ADZUNA_CONFIG.id,
    name: ADZUNA_CONFIG.name,
    type: ADZUNA_CONFIG.type,
    requiresAuth: ADZUNA_CONFIG.requiresAuth,
    configurable: ADZUNA_CONFIG.configurable,
    website: ADZUNA_CONFIG.website,
  };

  async search(query: SearchQuery): Promise<RawVacancy[]> {
    return fetchVacancies(query);
  }
}
