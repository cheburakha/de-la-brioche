import { BaseRepository } from '@/common/repositories';

import { applicationTable } from '../tables';

export class ApplicationRepository extends BaseRepository<typeof applicationTable.$inferSelect> {
  protected readonly table = applicationTable;
}
