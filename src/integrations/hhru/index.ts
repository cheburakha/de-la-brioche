import type { JobSource, SearchQuery, RawVacancy } from "../types";
import { HH_CONFIG } from "./config";
import { fetchVacancies } from "./api";

export class HHRuSource implements JobSource {
  meta = {
    id: HH_CONFIG.id,
    name: HH_CONFIG.name,
    type: HH_CONFIG.type,
    requiresAuth: HH_CONFIG.requiresAuth,
    configurable: HH_CONFIG.configurable,
    website: HH_CONFIG.website,
  };

  async search(query: SearchQuery): Promise<RawVacancy[]> {
    return fetchVacancies(query);
  }
}
