import path from "node:path";
import fs from "node:fs";
import { app, ipcMain, shell } from "electron";

import { applicationCoverLetterTable } from "@/features/application/tables";
import { userTable } from "@/features/user/tables";

import { getDb } from "./database";
import { generatePdf } from "./pdf-renderer";

const ROOT = app.getAppPath();
const CVS_DIR = path.join(ROOT, "assets", "cvs");

const cvPath = (p: string) =>
  p.includes(path.sep) ? p : path.join(CVS_DIR, p);

export function registerIpcHandlers(): void {
  ipcMain.handle("open-external", async (_event, url: string) => {
    await shell.openExternal(url);
  });

  ipcMain.handle("get-cv-list", async () => {
    const files = fs
      .readdirSync(CVS_DIR)
      .filter((f) => f.endsWith(".md"))
      .sort();
    return files.map((f) => ({
      filename: f,
      path: path.join(CVS_DIR, f),
      label: f
        .replace(/^fullstack-|^backend-|\.md$/g, "")
        .replace(/-/g, " ")
        .trim(),
    }));
  });

  ipcMain.handle("get-cv-source", async (_event, filePath: string) => {
    return fs.readFileSync(cvPath(filePath), "utf-8");
  });

  ipcMain.handle(
    "save-cv-source",
    async (_event, filePath: string, content: string) => {
      fs.writeFileSync(cvPath(filePath), content, "utf-8");
      return true;
    },
  );

  ipcMain.handle("export-pdf", async (_event, filePath: string) => {
    const pdfDir = path.join(app.getPath("downloads"), "de-la-brioche");
    fs.mkdirSync(pdfDir, { recursive: true });
    const basename = path.basename(filePath).replace(/\.md$/, ".pdf");
    const output = path.join(pdfDir, basename);
    await generatePdf(cvPath(filePath), output);
    return output;
  });

  ipcMain.handle("get-users", async () => {
    return getDb().select().from(userTable);
  });

  ipcMain.handle(
    "save-user",
    async (_event, data: Record<string, unknown>) => {
      const row = await getDb()
        .insert(userTable)
        .values(data as any)
        .returning();
      return row[0];
    },
  );

  ipcMain.handle("get-cover-letters", async () => {
    return getDb().select().from(applicationCoverLetterTable).where;
  });

  ipcMain.handle(
    "save-cover-letter",
    async (_event, data: Record<string, unknown>) => {
      const row = await getDb()
        .insert(applicationCoverLetterTable)
        .values(data as any)
        .returning();
      return row[0];
    },
  );
}
