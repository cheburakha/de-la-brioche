import { ipcMain } from "electron";
import { eq } from "drizzle-orm";

import { getDb } from "../../main/database";
import { vacancyTable } from "./tables";
import { SourceRegistry } from "../../integrations/registry";
import type { SearchQuery } from "../../integrations/types";

import { VacancyRepository } from "./repositories";

const registry = new SourceRegistry();

export function registerVacancyHandlers(): void {
  const repository = new VacancyRepository(getDb());

  ipcMain.handle("vacancy-search", async (_event, query: SearchQuery) => {
    const sources = registry.enabled();
    const all = await Promise.allSettled(
      sources.map((s) =>
        s.search(query).then((results) =>
          results.map((r) => ({
            ...r,
            status: "new" as const,
            skills: r.skills ?? [],
          })),
        ),
      ),
    );

    const vacancies = all.flatMap((r) =>
      r.status === "fulfilled" ? r.value : [],
    );

    // Deduplicate by externalId
    const seen = new Set<string>();
    const unique = vacancies.filter((v) => {
      if (seen.has(v.externalId)) return false;
      seen.add(v.externalId);
      return true;
    });

    return unique;
  });

  ipcMain.handle(
    "vacancy-save",
    async (_event, data: Record<string, unknown>) => {
      const row = await getDb()
        .insert(vacancyTable)
        .values(data as any)
        .onConflictDoUpdate({ target: vacancyTable.externalId, set: data as any })
        .returning();
      return row[0];
    },
  );

  ipcMain.handle("vacancy-toggle-favourite", async (_event, data: Record<string, unknown>) => {
    const pg = (getDb() as any).$client;
    const result = await pg.query(
      `insert into "vacancy" ("id", "external_id", "source_id", "title", "company", "location", "description", "url", "published_at", "skills", "employment_type", "is_favourite")
       values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
       on conflict ("external_id") do update set "is_favourite" = true
       returning *;`,
      [
        crypto.randomUUID(),
        data.externalId,
        data.sourceId,
        data.title,
        data.company,
        data.location ?? "",
        data.description ?? "",
        data.url,
        data.publishedAt ?? null,
        Array.isArray(data.skills) ? JSON.stringify(data.skills) : "[]",
        data.employmentType ?? null,
        true,
      ],
    );
    return result.rows?.[0] ?? result;
  });

  ipcMain.handle("vacancy-list-favourites", async () => {
    const vacancies = await repository.find(eq(vacancyTable.isFavourite, true));

    return vacancies.map((r) => ({
      ...r,
      skills: typeof r.skills === "string" ? JSON.parse(r.skills) : (r.skills ?? []),
    }));
  });

  ipcMain.handle("vacancy-unfavourite", async (_event, externalId: string) => {
    await getDb()
      .update(vacancyTable)
      .set({ isFavourite: false } as any)
      .where(eq(vacancyTable.externalId, externalId));
    return true;
  });

  ipcMain.handle(
    "vacancy-update-status",
    async (_event, id: string, status: string) => {
      await getDb()
        .update(vacancyTable)
        .set({ status: status as any })
        .where(eq(vacancyTable.id, id));
      return true;
    },
  );
}
