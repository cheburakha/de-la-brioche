import { BaseRepository } from "@/common/repositories";

import { userTable } from "../tables";

export class UserRepository extends BaseRepository<
  typeof userTable.$inferSelect,
  typeof userTable.$inferInsert
> {
  protected readonly table = userTable;
}
