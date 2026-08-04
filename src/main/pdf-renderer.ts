import Handlebars from 'handlebars';
import { marked } from 'marked';
import fs from 'node:fs';
import path from 'node:path';
import { app, BrowserWindow } from 'electron';

const ROOT = app.getAppPath();
const ASSETS = path.join(ROOT, 'assets');

const templateRaw = fs.readFileSync(path.join(ASSETS, 'cv.hbs'), 'utf-8');
const css = fs.readFileSync(path.join(ASSETS, 'styles.css'), 'utf-8');
const avatarPath = path.join(ASSETS, 'avatar.png');

const TEMPLATE = Handlebars.compile(templateRaw);
const AVATAR_BASE64 = fs.readFileSync(avatarPath).toString('base64');
const AVATAR_DATA_URL = `data:image/png;base64,${AVATAR_BASE64}`;

export async function generatePdf(mdPath: string, outputPath: string): Promise<void> {
  let md = fs.readFileSync(mdPath, 'utf-8');
  md = md.replace(/src="avatar\.png"/g, `src="${AVATAR_DATA_URL}"`);

  const htmlContent = marked(md) as string;
  const html = TEMPLATE({ body: htmlContent });
  const fullHtml = html.replace('</head>', `<style>${css}</style>\n</head>`);

  const win = new BrowserWindow({
    show: false,
    webPreferences: { offscreen: true },
  });

  try {
    await win.webContents.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(fullHtml)}`);
    const pdf = await win.webContents.printToPDF({
      format: 'A4',
      margin: { top: 0, bottom: 0, left: 0, right: 0 },
      printBackground: true,
    });
    fs.writeFileSync(outputPath, pdf);
  } finally {
    win.close();
  }
}
