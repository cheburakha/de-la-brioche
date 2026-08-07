import { BaseRepository } from "@/common/repositories";

import { vacancyRecruiterTable } from "../tables";

export class VacancyRecruiterRepository extends BaseRepository<
  typeof vacancyRecruiterTable.$inferSelect,
  typeof vacancyRecruiterTable.$inferInsert
> {
  protected readonly table = vacancyRecruiterTable;
}
