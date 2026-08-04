import { PGlite } from '@electric-sql/pglite';
import { drizzle } from 'drizzle-orm/pglite';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

const client = new PGlite();
const db = drizzle(client);

export const profiles = sqliteTable('profiles', {
  id: integer('id').primaryKey({ autoIncrement: true }),
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

export const coverLetters = sqliteTable('cover_letters', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  profileId: integer('profile_id').references(() => profiles.id),
  company: text('company').notNull(),
  position: text('position').notNull(),
  body: text('body').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$default(() => new Date()),
});

export { db };
export type Profile = typeof profiles.$inferSelect;
export type NewProfile = typeof profiles.$inferInsert;
export type CoverLetter = typeof coverLetters.$inferSelect;
