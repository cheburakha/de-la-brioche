import { BaseRepository } from '@/common/repositories';

import { applicationCoverLetterTable } from '../tables';

export class ApplicationCoverLetterRepository extends BaseRepository<typeof applicationCoverLetterTable.$inferSelect> {
  protected readonly table = applicationCoverLetterTable;
}
