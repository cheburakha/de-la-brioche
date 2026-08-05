import type { JobSource, SearchQuery, RawVacancy } from "../types.js";
import { JOOBLE_CONFIG } from "./config.js";
import { fetchVacancies } from "./api.js";

export class JoobleSource implements JobSource {
  meta = {
    id: JOOBLE_CONFIG.id,
    name: JOOBLE_CONFIG.name,
    type: JOOBLE_CONFIG.type,
    requiresAuth: JOOBLE_CONFIG.requiresAuth,
    configurable: JOOBLE_CONFIG.configurable,
    website: JOOBLE_CONFIG.website,
  };

  async search(query: SearchQuery): Promise<RawVacancy[]> {
    return fetchVacancies(query);
  }
}
