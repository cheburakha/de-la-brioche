import type { JobSource, SearchQuery, RawVacancy } from "../types";
import { REMOTEOK_CONFIG } from "./config";
import { fetchVacancies } from "./api";

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
