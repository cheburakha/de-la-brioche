import { BaseRepository } from "@/common/repositories";

import { vacancyTable } from "../tables";

export class VacancyRepository extends BaseRepository<
  typeof vacancyTable.$inferSelect,
  typeof vacancyTable.$inferInsert
> {
  protected readonly table = vacancyTable;
}
