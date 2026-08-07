import type { JobSource, SearchQuery, RawVacancy } from "../types";
import { REMOTIVE_CONFIG } from "./config";
import { fetchVacancies } from "./api";

export class RemotiveSource implements JobSource {
  meta = {
    id: REMOTIVE_CONFIG.id,
    name: REMOTIVE_CONFIG.name,
    type: REMOTIVE_CONFIG.type,
    requiresAuth: REMOTIVE_CONFIG.requiresAuth,
    configurable: REMOTIVE_CONFIG.configurable,
    website: REMOTIVE_CONFIG.website,
  };

  async search(query: SearchQuery): Promise<RawVacancy[]> {
    return fetchVacancies(query);
  }
}
