import { VacancyStatus } from "../enums";

export interface Vacancy {
  id?: string;
  externalId: string;
  sourceId: string;
  title: string;
  company: string;
  location: string;
  description: string;
  salaryFrom?: number;
  salaryTo?: number;
  salaryCurrency?: string;
  url: string;
  publishedAt?: Date;
  skills: string[];
  experience?: string;
  employmentType?: string;
  status: VacancyStatus;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
