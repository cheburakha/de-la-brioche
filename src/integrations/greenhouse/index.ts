import type { JobSource, SearchQuery, RawVacancy } from "../types.js";
import { GREENHOUSE_CONFIG } from "./config.js";
import { fetchVacancies } from "./api.js";

export class GreenhouseSource implements JobSource {
  meta = {
    id: GREENHOUSE_CONFIG.id,
    name: GREENHOUSE_CONFIG.name,
    type: GREENHOUSE_CONFIG.type,
    requiresAuth: GREENHOUSE_CONFIG.requiresAuth,
    configurable: GREENHOUSE_CONFIG.configurable,
    website: GREENHOUSE_CONFIG.website,
  };

  async search(query: SearchQuery): Promise<RawVacancy[]> {
    return fetchVacancies(query);
  }
}
