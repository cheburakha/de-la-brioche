import type {
  CvFile,
  Profile,
  ApplicationCoverLetter,
  VacancySearchResult,
  VacancySearchQuery,
} from "../preload/index";

declare global {
  interface Window {
    electronAPI: {
      getCvList: () => Promise<CvFile[]>;
      getCvSource: (filePath: string) => Promise<string>;
      saveCvSource: (filePath: string, content: string) => Promise<boolean>;
      exportPdf: (filePath: string) => Promise<string>;
      getProfiles: () => Promise<Profile[]>;
      saveProfile: (data: Record<string, unknown>) => Promise<Profile>;
      getCoverLetters: () => Promise<ApplicationCoverLetter[]>;
      saveCoverLetter: (
        data: Record<string, unknown>,
      ) => Promise<ApplicationCoverLetter>;
      searchVacancies: (
        query: VacancySearchQuery,
      ) => Promise<VacancySearchResult[]>;
      openExternal: (url: string) => Promise<void>;
    };
  }
}
