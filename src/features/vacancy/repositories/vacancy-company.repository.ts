import { BaseRepository } from '@/common/repositories';

import { vacancyCompanyTable } from '../tables';

export class VacancyCompanyRepository extends BaseRepository<typeof vacancyCompanyTable.$inferSelect> {
  protected readonly table = vacancyCompanyTable;
}
