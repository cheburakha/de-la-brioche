export const REMOTIVE_CONFIG = {
  id: "remotive",
  name: "Remotive",
  type: "api" as const,
  requiresAuth: false,
  configurable: false,
  website: "https://remotive.com",
  baseUrl: "https://remotive.com/api/remote-jobs",
  defaults: { limit: 20 },
};
