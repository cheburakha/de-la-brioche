export interface SearchQuery {
  query: string;
  location?: string;
  salaryMin?: number;
  salaryMax?: number;
  currency?: string;
  experience?: 'no' | '1-3' | '3-6' | '6+';
  schedule?: 'full' | 'remote' | 'hybrid';
  limit?: number;
  page?: number;
}

export interface RawVacancy {
  sourceId: string;
  externalId: string;
  title: string;
  company: string;
  location: string;
  description: string;
  salaryFrom?: number;
  salaryTo?: number;
  salaryCurrency?: string;
  url: string;
  publishedAt: Date;
  skills: string[];
  experience?: string;
  employmentType?: string;
}

export interface JobSourceMeta {
  id: string;
  name: string;
  type: 'api' | 'scraper';
  requiresAuth: boolean;
  configurable: boolean;
  website: string;
}

export interface JobSource {
  meta: JobSourceMeta;
  search(query: SearchQuery): Promise<RawVacancy[]>;
}
