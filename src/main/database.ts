import crypto from 'node:crypto';
import { PGlite } from '@electric-sql/pglite';
import { drizzle } from 'drizzle-orm/pglite';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

const client = new PGlite();
const db = drizzle(client);

export const profile = sqliteTable('profile', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  location: text('location'),
  telegram: text('telegram'),
  linkedin: text('linkedin'),
  github: text('github'),
  summary: text('summary'),
  locale: text('locale').notNull().default('en'),
  createdAt: integer('created_at', { mode: 'timestamp' }).$default(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$default(() => new Date()),
});

export const applicationCoverLetter = sqliteTable('application_cover_letter', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  profileId: text('profile_id').references(() => profile.id),
  company: text('company').notNull(),
  position: text('position').notNull(),
  body: text('body').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$default(() => new Date()),
});

export { db };
export type Profile = typeof profile.$inferSelect;
export type NewProfile = typeof profile.$inferInsert;
export type ApplicationCoverLetter = typeof applicationCoverLetter.$inferSelect;
