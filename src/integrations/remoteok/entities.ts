export interface ROJob {
  id: string;
  position: string;
  company: string;
  tags: string[];
  description: string;
  location: string;
  url: string;
  date: string;
  salary?: string;
}
