// HH.ru API response shapes (only fields we consume)
export interface HHItem {
  id: string;
  name: string;
  employer: { name: string };
  area: { name: string };
  snippet: { requirement?: string; responsibility?: string };
  salary?: { from?: number; to?: number; currency: string };
  alternate_url: string;
  published_at: string;
  key_skills?: { name: string }[];
  experience: { id: string; name: string };
  employment: { id: string; name: string };
  schedule: { id: string; name: string };
}

export interface HHResponse {
  items: HHItem[];
  found: number;
  pages: number;
  page: number;
}
