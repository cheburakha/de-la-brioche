export const SUPERJOB_CONFIG = {
  id: 'superjob',
  name: 'SuperJob',
  type: 'api' as const,
  requiresAuth: true,
  configurable: true,
  website: 'https://superjob.ru',
  baseUrl: 'https://api.superjob.ru/2.0',
  rateLimit: { requestsPerMinute: 20 },
  defaults: { limit: 20, page: 0 },
};
