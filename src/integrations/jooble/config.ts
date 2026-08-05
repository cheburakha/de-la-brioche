export const JOOBLE_CONFIG = {
  id: "jooble",
  name: "Jooble",
  type: "api" as const,
  requiresAuth: true,
  configurable: true,
  website: "https://jooble.org",
  baseUrl: "https://jooble.org/api",
  defaults: { limit: 20 },
};
