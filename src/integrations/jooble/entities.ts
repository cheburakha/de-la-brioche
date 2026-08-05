export interface JBJob {
  id: string;
  title: string;
  company: string;
  location: string;
  snippet: string;
  salary?: string;
  source: string;
  type: string;
  link: string;
  updated: string;
}

export interface JBResponse {
  totalCount: number;
  jobs: JBJob[];
}
