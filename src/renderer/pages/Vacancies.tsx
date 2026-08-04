import { useState } from 'react';
import { Search } from 'lucide-react';

export function VacanciesPage() {
  const [query, setQuery] = useState('');
  const [results] = useState<unknown[]>([]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Vacancies</h1>

      <div className="relative max-w-2xl mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Job title, skills, keywords…"
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {results.length === 0 && query.length > 0 && (
        <p className="text-muted-foreground text-sm">Search not implemented yet.</p>
      )}

      {results.length === 0 && query.length === 0 && (
        <p className="text-muted-foreground text-sm">
          Enter a search query above to find vacancies across multiple job boards.
        </p>
      )}
    </div>
  );
}
