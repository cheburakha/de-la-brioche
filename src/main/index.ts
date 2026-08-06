import { app, BrowserWindow, shell } from "electron";
import path from "node:path";
import fs from "node:fs";
import { initDb } from "./database.js";
import { migrate } from "./migrate.js";
import { registerIpcHandlers } from "./ipc-handlers.js";
import { registerVacancyHandlers } from "../features/vacancy/vacancy.module.js";

declare const MAIN_WINDOW_VITE_DEV_SERVER_URL: string | undefined;
declare const MAIN_WINDOW_VITE_NAME: string;

const DIR = import.meta.dirname;

// Load .env for dev mode (not present in packaged app)
try {
  for (const line of fs
    .readFileSync(path.join(DIR, "..", "..", ".env"), "utf-8")
    .split("\n")) {
    const t = line.trim();
    if (t && !t.startsWith("#")) {
      const i = t.indexOf("=");
      if (i > 0) {
        const k = t.slice(0, i).trim();
        const v = t.slice(i + 1).trim();
        if (k && !process.env[k]) process.env[k] = v;
      }
    }
  }
} catch {}

let mainWindow: BrowserWindow | null = null;

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(DIR, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(DIR, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
    );
  }
}

process.on("uncaughtException", (err) => {
  try { fs.writeFileSync("/tmp/dlb-error.log", String(err.stack)); } catch {}
});

app.whenReady().then(async () => {
  try {
    await initDb(path.join(app.getPath("userData"), "pglite"));
    await migrate();
  } catch (err) {
    try { fs.writeFileSync("/tmp/dlb-error.log", String(err)); } catch {}
  }
  registerIpcHandlers();
  registerVacancyHandlers();
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
