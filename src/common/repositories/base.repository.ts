import { and, SQL } from "drizzle-orm";
import { drizzle } from "drizzle-orm/pglite";
import { PgTableWithColumns } from "drizzle-orm/pg-core";

import { defaultFailHandler } from "@/common/utils";

export abstract class BaseRepository<TRow = any> {
  protected readonly abstract table: PgTableWithColumns<any>;

  constructor(protected readonly db: ReturnType<typeof drizzle>) {}

  async findOne(
    where?: SQL<unknown> | SQL<unknown>[],
  ): Promise<TRow | undefined> {
    let query = this.db.select().from(this.table as any).$dynamic().limit(1);

    if (where) {
      const conditions = Array.isArray(where) ? where : [where];
      if (conditions.length === 1) {
        query = query.where(conditions[0]);
      } else if (conditions.length > 1) {
        query = query.where(and(...conditions));
      }
    }

    const result: TRow[] = await query.execute();

    return result[0];
  }

  async findOneOrFail(
    where?: SQL<unknown> | SQL<unknown>[],
  ): Promise<TRow> {
    const result = await this.findOne(where);

    if (!result) {
      throw defaultFailHandler();
    }

    return result;
  }

  async find(where?: SQL<unknown> | SQL<unknown>[]): Promise<TRow[]> {
    let query = this.db.select().from(this.table as any).$dynamic();

    if (where) {
      const conditions = Array.isArray(where) ? where : [where];
      if (conditions.length === 1) {
        query = query.where(conditions[0]);
      } else if (conditions.length > 1) {
        query = query.where(and(...conditions));
      }
    }



    return query.execute();
  }
}
