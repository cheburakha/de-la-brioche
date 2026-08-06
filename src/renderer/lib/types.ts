import { ApplicationCoverLetter, CvFile, Profile, VacancySearchQuery, VacancySearchResult } from "@/preload";

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
      toggleFavourite: (data: Record<string, unknown>) => Promise<unknown>;
      listFavourites: () => Promise<VacancySearchResult[]>;
      unfavourite: (externalId: string) => Promise<boolean>;
      openExternal: (url: string) => Promise<void>;
    };
  }
}
