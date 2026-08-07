CREATE TABLE "application_cover_letter" (
	"id" uuid PRIMARY KEY,
	"application_id" uuid NOT NULL,
	"body" text NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "application" (
	"id" uuid PRIMARY KEY,
	"user_resume_id" uuid NOT NULL,
	"status" text DEFAULT 'created' NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "user_resume" (
	"id" uuid PRIMARY KEY,
	"user_id" uuid NOT NULL,
	"body" text NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" uuid PRIMARY KEY,
	"role" text DEFAULT 'applicant' NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text,
	"location" text,
	"telegram" text,
	"linkedin" text,
	"github" text,
	"summary" text,
	"locale" text DEFAULT 'en' NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "vacancy_company" (
	"id" uuid PRIMARY KEY,
	"title" text NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "vacancy_recruiter" (
	"id" uuid PRIMARY KEY,
	"vacancy_company_id" uuid NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "vacancy" (
	"id" uuid PRIMARY KEY,
	"external_id" text NOT NULL UNIQUE,
	"source_id" text NOT NULL,
	"title" text NOT NULL,
	"company" text NOT NULL,
	"location" text DEFAULT '' NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"salary_from" integer,
	"salary_to" integer,
	"salary_currency" text,
	"url" text NOT NULL,
	"published_at" timestamp,
	"skills" text,
	"experience" text,
	"employment_type" text,
	"status" text DEFAULT 'new' NOT NULL,
	"is_favourite" boolean DEFAULT false NOT NULL,
	"notes" text,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "application_cover_letter" ADD CONSTRAINT "application_cover_letter_application_id_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "application"("id");--> statement-breakpoint
ALTER TABLE "application" ADD CONSTRAINT "application_user_resume_id_user_resume_id_fkey" FOREIGN KEY ("user_resume_id") REFERENCES "user_resume"("id");--> statement-breakpoint
ALTER TABLE "user_resume" ADD CONSTRAINT "user_resume_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id");--> statement-breakpoint
ALTER TABLE "vacancy_recruiter" ADD CONSTRAINT "vacancy_recruiter_vacancy_company_id_vacancy_company_id_fkey" FOREIGN KEY ("vacancy_company_id") REFERENCES "vacancy_company"("id");