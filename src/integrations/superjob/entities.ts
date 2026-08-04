export interface SJItem {
  id: number;
  profession: string;
  firm_name: string;
  town: { title: string };
  vacancyRichText?: string;
  payment_from?: number;
  payment_to?: number;
  currency: string;
  link: string;
  date_published: number;
  experience?: { title: string };
  type_of_work?: { title: string };
  key_skills?: { title: string }[];
}

export interface SJResponse {
  objects: SJItem[];
  total: number;
  page: number;
  more: boolean;
}
