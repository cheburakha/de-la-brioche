import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { UserRole } from "../enums";
import { enumValues } from "@/common/helpers";

const userRole = pgEnum('user_role', enumValues(UserRole));

export const userTable = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  role: userRole('role').notNull().$type<UserRole>(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  location: text("location"),
  telegram: text("telegram"),
  linkedin: text("linkedin"),
  github: text("github"),
  summary: text("summary"),
  locale: text("locale").notNull().default("en"),
  createdAt: timestamp("created_at", { mode: "date" }).$default(
    () => new Date(),
  ),
  updatedAt: timestamp("updated_at", { mode: "date" }).$default(
    () => new Date(),
  ),
});

export type UserTable = typeof userTable.$inferSelect;
