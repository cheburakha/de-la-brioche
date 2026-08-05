export const ADZUNA_CONFIG = {
  id: "adzuna",
  name: "Adzuna",
  type: "api" as const,
  requiresAuth: true,
  configurable: true,
  website: "https://adzuna.com",
  baseUrl: "https://api.adzuna.com/v1/api/jobs",
  rateLimit: { requestsPerMinute: 10 },
  defaults: { limit: 20, country: "gb", page: 1 },
};
