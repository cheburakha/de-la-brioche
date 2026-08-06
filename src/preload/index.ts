import { contextBridge, ipcRenderer } from "electron";

export interface CvFile {
  filename: string;
  path: string;
  label: string;
}

export interface Profile {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  telegram?: string;
  linkedin?: string;
  github?: string;
  summary?: string;
  locale: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ApplicationCoverLetter {
  id?: string;
  profileId?: string;
  company: string;
  position: string;
  body: string;
  createdAt?: Date;
}

export interface VacancySearchResult {
  sourceId: string;
  externalId: string;
  title: string;
  company: string;
  location: string;
  description: string;
  salaryFrom?: number;
  salaryTo?: number;
  salaryCurrency?: string;
  url: string;
  publishedAt: string;
  skills: string[];
  experience?: string;
  employmentType?: string;
}

export interface VacancySearchQuery {
  query: string;
  limit?: number;
}

const api = {
  getCvList: () => ipcRenderer.invoke("get-cv-list") as Promise<CvFile[]>,
  getCvSource: (filePath: string) =>
    ipcRenderer.invoke("get-cv-source", filePath) as Promise<string>,
  saveCvSource: (filePath: string, content: string) =>
    ipcRenderer.invoke("save-cv-source", filePath, content) as Promise<boolean>,
  exportPdf: (filePath: string) =>
    ipcRenderer.invoke("export-pdf", filePath) as Promise<string>,
  getProfiles: () => ipcRenderer.invoke("get-profiles") as Promise<Profile[]>,
  saveProfile: (data: Record<string, unknown>) =>
    ipcRenderer.invoke("save-profile", data) as Promise<Profile>,
  getCoverLetters: () =>
    ipcRenderer.invoke("get-cover-letters") as Promise<
      ApplicationCoverLetter[]
    >,
  saveCoverLetter: (data: Record<string, unknown>) =>
    ipcRenderer.invoke(
      "save-cover-letter",
      data,
    ) as Promise<ApplicationCoverLetter>,
  searchVacancies: (query: VacancySearchQuery) =>
    ipcRenderer.invoke("vacancy-search", query) as Promise<
      VacancySearchResult[]
    >,
  openExternal: (url: string) =>
    ipcRenderer.invoke("open-external", url) as Promise<void>,
  toggleFavourite: (data: Record<string, unknown>) =>
    ipcRenderer.invoke("vacancy-toggle-favourite", data) as Promise<unknown>,
  listFavourites: () =>
    ipcRenderer.invoke("vacancy-list-favourites") as Promise<VacancySearchResult[]>,
  unfavourite: (externalId: string) =>
    ipcRenderer.invoke("vacancy-unfavourite", externalId) as Promise<boolean>,
};

contextBridge.exposeInMainWorld("electronAPI", api);
