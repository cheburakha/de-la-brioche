import { BaseRepository } from '@/common/repositories';

import { vacancyRecruiterTable } from '../tables';

export class VacancyRecruiterRepository extends BaseRepository<typeof vacancyRecruiterTable.$inferSelect> {
  protected readonly table = vacancyRecruiterTable;
}
