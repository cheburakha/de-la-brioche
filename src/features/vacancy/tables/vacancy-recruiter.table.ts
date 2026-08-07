import crypto from "node:crypto";
import { pgTable, uuid, timestamp } from "drizzle-orm/pg-core";

import { vacancyCompanyTable } from "./vacancy-company.table";

export const vacancyRecruiterTable = pgTable("vacancy_recruiter", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  vacancyCompanyId: uuid("vacancy_company_id")
    .references(() => vacancyCompanyTable.id)
    .notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).$default(
    () => new Date(),
  ),
  updatedAt: timestamp("updated_at", { mode: "date" }).$default(
    () => new Date(),
  ),
});
