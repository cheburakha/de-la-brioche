import { pgTable, uuid, timestamp, pgEnum } from "drizzle-orm/pg-core";

import { enumValues } from "@/common/helpers";
import { userResumeTable } from "@/features/user/tables";

import { ApplicationStatus } from "../enums";

const applicationStatus = pgEnum('application_status', enumValues(ApplicationStatus));

export const applicationTable = pgTable("application", {
  id: uuid("id").primaryKey().defaultRandom(),
  userResumeId: uuid("user_resume_id").references(() => userResumeTable.id).notNull(),
  status: applicationStatus('status').notNull().default(ApplicationStatus.created).$type<ApplicationStatus>(),
  createdAt: timestamp("created_at", { mode: "date" }).$default(
    () => new Date(),
  ),
  updatedAt: timestamp("updated_at", { mode: "date" }).$default(
    () => new Date(),
  ),
});

export type ApplicationTable = typeof applicationTable.$inferSelect;
