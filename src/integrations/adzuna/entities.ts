export interface AZJob {
  id: string;
  title: string;
  company: { display_name: string };
  location: { display_name: string };
  description: string;
  redirect_url: string;
  created: string;
  salary_min?: number;
  salary_max?: number;
  salary_currency?: string;
  salary_is_predicted?: string;
  category?: { label: string };
}

export interface AZResponse {
  results: AZJob[];
  count: number;
}
