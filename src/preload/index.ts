import { contextBridge, ipcRenderer } from 'electron';

export interface CvFile {
  filename: string;
  path: string;
  label: string;
}

export interface Profile {
  id?: number;
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

export interface CoverLetter {
  id?: number;
  profileId?: number;
  company: string;
  position: string;
  body: string;
  createdAt?: Date;
}

const api = {
  getCvList: () => ipcRenderer.invoke('get-cv-list') as Promise<CvFile[]>,
  getCvSource: (filePath: string) => ipcRenderer.invoke('get-cv-source', filePath) as Promise<string>,
  saveCvSource: (filePath: string, content: string) => ipcRenderer.invoke('save-cv-source', filePath, content) as Promise<boolean>,
  exportPdf: (filePath: string) => ipcRenderer.invoke('export-pdf', filePath) as Promise<string>,
  getProfiles: () => ipcRenderer.invoke('get-profiles') as Promise<Profile[]>,
  saveProfile: (data: Record<string, unknown>) => ipcRenderer.invoke('save-profile', data) as Promise<Profile>,
  getCoverLetters: () => ipcRenderer.invoke('get-cover-letters') as Promise<CoverLetter[]>,
  saveCoverLetter: (data: Record<string, unknown>) => ipcRenderer.invoke('save-cover-letter', data) as Promise<CoverLetter>,
};

contextBridge.exposeInMainWorld('electronAPI', api);
