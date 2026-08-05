export const GREENHOUSE_CONFIG = {
  id: "greenhouse",
  name: "Greenhouse",
  type: "api" as const,
  requiresAuth: false,
  configurable: false,
  website: "https://greenhouse.io",
  baseUrl: "https://boards-api.greenhouse.io/v1",
  defaults: { limit: 20, page: 1 },
};
