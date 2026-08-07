import crypto from "node:crypto";
import { pgTable, uuid, timestamp, text } from "drizzle-orm/pg-core";

import { userResumeTable } from "@/features/user/tables";

export const applicationTable = pgTable("application", {
  id: uuid("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  userResumeId: uuid("user_resume_id").references(() => userResumeTable.id).notNull(),
  status: text("status").notNull().default("created"),
  createdAt: timestamp("created_at", { mode: "date" }).$default(
    () => new Date(),
  ),
  updatedAt: timestamp("updated_at", { mode: "date" }).$default(
    () => new Date(),
  ),
});
