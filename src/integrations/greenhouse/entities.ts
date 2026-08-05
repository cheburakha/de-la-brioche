export interface GHJob {
  id: number;
  title: string;
  location: { name: string };
  metadata?: { name: string; value: string }[];
  offices: { name: string }[];
  departments: { name: string }[];
  absolute_url: string;
  updated_at: string;
  content?: string;
}

export interface GHResponse {
  jobs: GHJob[];
}
