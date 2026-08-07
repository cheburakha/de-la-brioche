import type { JobSource, SearchQuery, RawVacancy } from "../types";
import { SUPERJOB_CONFIG } from "./config";
import { fetchVacancies } from "./api";

export class SuperJobSource implements JobSource {
  meta = {
    id: SUPERJOB_CONFIG.id,
    name: SUPERJOB_CONFIG.name,
    type: SUPERJOB_CONFIG.type,
    requiresAuth: SUPERJOB_CONFIG.requiresAuth,
    configurable: SUPERJOB_CONFIG.configurable,
    website: SUPERJOB_CONFIG.website,
  };

  async search(query: SearchQuery): Promise<RawVacancy[]> {
    return fetchVacancies(query);
  }
}
