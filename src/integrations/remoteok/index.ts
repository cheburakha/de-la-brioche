import type { JobSource, SearchQuery, RawVacancy } from "../types.js";
import { REMOTEOK_CONFIG } from "./config.js";
import { fetchVacancies } from "./api.js";

export class RemoteOkSource implements JobSource {
  meta = {
    id: REMOTEOK_CONFIG.id,
    name: REMOTEOK_CONFIG.name,
    type: REMOTEOK_CONFIG.type,
    requiresAuth: REMOTEOK_CONFIG.requiresAuth,
    configurable: REMOTEOK_CONFIG.configurable,
    website: REMOTEOK_CONFIG.website,
  };

  async search(query: SearchQuery): Promise<RawVacancy[]> {
    return fetchVacancies(query);
  }
}
