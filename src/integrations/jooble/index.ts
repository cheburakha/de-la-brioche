import type { JobSource, SearchQuery, RawVacancy } from "../types";
import { JOOBLE_CONFIG } from "./config";
import { fetchVacancies } from "./api";

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
