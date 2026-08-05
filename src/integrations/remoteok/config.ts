export const REMOTEOK_CONFIG = {
  id: "remoteok",
  name: "RemoteOK",
  type: "api" as const,
  requiresAuth: false,
  configurable: false,
  website: "https://remoteok.com",
  baseUrl: "https://remoteok.com/api",
  defaults: { limit: 20 },
};
