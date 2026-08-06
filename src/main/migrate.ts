import { sql } from "drizzle-orm";
import { getDb } from "./database.js";

export async function migrate(): Promise<void> {
  const db = getDb();

  // Enums must be created before tables that reference them
  try { await db.execute(sql.raw(`create type user_role as enum ('applicant', 'recruiter')`)); } catch {}
  try { await db.execute(sql.raw(`create type application_status as enum ('created', 'sent')`)); } catch {}

  // Tables in dependency order
  await db.execute(sql.raw(`
    create table if not exists "user" (
      "id" uuid primary key,
      "role" user_role not null default 'applicant',
      "name" text not null,
      "email" text not null,
      "phone" text,
      "location" text,
      "telegram" text,
      "linkedin" text,
      "github" text,
      "summary" text,
      "locale" text not null default 'en',
      "created_at" timestamp default now(),
      "updated_at" timestamp default now()
    )
  `));

  await db.execute(sql.raw(`
    create table if not exists "user_resume" (
      "id" uuid primary key,
      "user_id" uuid not null references "user"("id"),
      "body" text not null,
      "created_at" timestamp default now(),
      "updated_at" timestamp default now()
    )
  `));

  await db.execute(sql.raw(`
    create table if not exists "vacancy_company" (
      "id" uuid primary key,
      "title" text not null,
      "created_at" timestamp default now(),
      "updated_at" timestamp default now()
    )
  `));

  await db.execute(sql.raw(`
    create table if not exists "vacancy_recruiter" (
      "id" uuid primary key,
      "vacancy_company_id" uuid not null references "vacancy_company"("id"),
      "created_at" timestamp default now(),
      "updated_at" timestamp default now()
    )
  `));

  await db.execute(sql.raw(`
    create table if not exists "application" (
      "id" uuid primary key,
      "user_resume_id" uuid not null references "user_resume"("id"),
      "status" application_status not null default 'created',
      "created_at" timestamp default now(),
      "updated_at" timestamp default now()
    )
  `));

  await db.execute(sql.raw(`
    create table if not exists "application_cover_letter" (
      "id" uuid primary key,
      "application_id" uuid not null references "application"("id"),
      "body" text not null,
      "created_at" timestamp default now(),
      "updated_at" timestamp default now()
    )
  `));

  await db.execute(sql.raw(`
    create table if not exists "vacancy" (
      "id" uuid primary key,
      "external_id" text not null unique,
      "source_id" text not null,
      "title" text not null,
      "company" text not null,
      "location" text not null default '',
      "description" text not null default '',
      "salary_from" integer,
      "salary_to" integer,
      "salary_currency" text,
      "url" text not null,
      "published_at" timestamp,
      "skills" text,
      "experience" text,
      "employment_type" text,
      "status" text not null default 'new',
      "is_favourite" boolean not null default false,
      "notes" text,
      "created_at" timestamp default now(),
      "updated_at" timestamp default now()
    )
  `));
}
