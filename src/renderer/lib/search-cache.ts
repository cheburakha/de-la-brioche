import type { VacancySearchResult } from "../../preload/index";

let query = "";
let results: VacancySearchResult[] = [];

export function getSearchCache() {
  return { query, results };
}

export function setSearchCache(q: string, r: VacancySearchResult[]) {
  query = q;
  results = r;
}
