export const HH_CONFIG = {
  id: 'hhru',
  name: 'hh.ru',
  type: 'api' as const,
  requiresAuth: false,
  configurable: true,
  website: 'https://hh.ru',
  baseUrl: 'https://api.hh.ru',
  apiVersion: '1.0',
  rateLimit: { requestsPerMinute: 60 },
  userAgent: 'de-la-brioche/0.0.1 (vacancy-scout)',
  defaults: {
    limit: 20,
    area: 113, // Russia
    period: 30, // days
    locale: 'RU',
  },
};
