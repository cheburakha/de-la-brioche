import { BaseRepository } from "@/common/repositories";

import { applicationCoverLetterTable } from "../tables";

export class ApplicationCoverLetterRepository extends BaseRepository<
  typeof applicationCoverLetterTable.$inferSelect,
  typeof applicationCoverLetterTable.$inferInsert
> {
  protected readonly table = applicationCoverLetterTable;
}
