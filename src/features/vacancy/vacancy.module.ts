import { ipcMain } from 'electron';
import { db } from '../../main/database.js';
import { vacancy } from './tables/index.js';
import { eq } from 'drizzle-orm';
import { SourceRegistry } from '../../integrations/registry.js';
import type { SearchQuery } from '../../integrations/types.js';

const registry = new SourceRegistry();

export function registerVacancyHandlers(): void {
  ipcMain.handle('vacancy-search', async (_event, query: SearchQuery) => {
    const sources = registry.enabled();
    const all = await Promise.allSettled(
      sources.map((s) =>
        s.search(query).then((results) =>
          results.map((r) => ({
            ...r,
            status: 'new' as const,
            skills: r.skills ?? [],
          }))
        )
      )
    );

    const vacancies = all.flatMap((r) =>
      r.status === 'fulfilled' ? r.value : []
    );

    // Deduplicate by externalId
    const seen = new Set<string>();
    const unique = vacancies.filter((v) => {
      if (seen.has(v.externalId)) return false;
      seen.add(v.externalId);
      return true;
    });

    return unique.slice(0, 50);
  });

  ipcMain.handle('vacancy-save', async (_event, data: Record<string, unknown>) => {
    const row = await db.insert(vacancy).values(data as any)
      .onConflictDoUpdate({ target: vacancy.externalId, set: data as any })
      .returning().all();
    return row[0];
  });

  ipcMain.handle('vacancy-list-saved', async () => {
    const rows = await db.select().from(vacancy).all();
    return rows;
  });

  ipcMain.handle('vacancy-update-status', async (_event, id: string, status: string) => {
    await db.update(vacancy).set({ status: status as any })
      .where(eq(vacancy.id, id)).all();
    return true;
  });
}
