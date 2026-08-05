import { useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Building2,
  MapPin,
  Clock,
  Loader,
  MoreVertical,
  ExternalLink,
  Star,
  FileText,
  Send,
} from "lucide-react";
import type { VacancySearchResult } from "../../preload/index";

export function VacanciesPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<VacancySearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const doSearch = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      const data = await window.electronAPI.searchVacancies({
        query: q,
        limit: 20,
      });
      setResults(data);
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleChange = useCallback(
    (value: string) => {
      setQuery(value);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => doSearch(value), 400);
    },
    [doSearch],
  );

  return (
    <div onClick={() => setOpenMenu(null)}>
      <h1 className="text-2xl font-bold mb-6">Vacancies</h1>

      <div className="relative max-w-2xl mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Job title, skills, keywords…"
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
        {loading && (
          <Loader className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground animate-spin" />
        )}
      </div>

      {results.length > 0 && (
        <p className="text-xs text-muted-foreground mb-3">
          {results.length} vacancies found
        </p>
      )}

      <div className="space-y-3">
        {results.map((v) => (
          <div
            key={`${v.sourceId}-${v.externalId}`}
            className="p-4 rounded-lg border border-border bg-card hover:shadow-sm transition-shadow"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm truncate">{v.title}</h3>
                <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground flex-wrap">
                  <span className="flex items-center gap-1">
                    <Building2 className="w-3 h-3" />
                    {v.company}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {v.location}
                  </span>
                  {v.publishedAt && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatDate(v.publishedAt)}
                    </span>
                  )}
                </div>
                {v.salaryFrom || v.salaryTo ? (
                  <p className="text-sm font-medium mt-1">
                    {v.salaryFrom ? `${v.salaryFrom.toLocaleString()}` : ""}
                    {v.salaryFrom && v.salaryTo ? " — " : v.salaryTo ? "" : ""}
                    {v.salaryTo ? `${v.salaryTo.toLocaleString()}` : ""}
                    {v.salaryCurrency ? ` ${v.salaryCurrency}` : ""}
                  </p>
                ) : null}
                {v.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {v.skills.slice(0, 6).map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 text-xs rounded-full bg-accent text-accent-foreground"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative shrink-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenMenu(
                      openMenu === v.externalId ? null : v.externalId,
                    );
                  }}
                  className="p-1.5 rounded-md hover:bg-accent transition-colors"
                >
                  <MoreVertical className="w-4 h-4 text-muted-foreground" />
                </button>
                {openMenu === v.externalId && (
                  <div
                    className="absolute right-0 top-8 z-50 w-44 rounded-lg border border-border bg-card shadow-lg py-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MenuItem
                      icon={ExternalLink}
                      label="Open link"
                      onClick={() => window.electronAPI.openExternal(v.url)}
                    />
                    <MenuItem
                      icon={Star}
                      label="Add to favourites"
                      onClick={() => {}}
                    />
                    <MenuItem
                      icon={FileText}
                      label="Form a letter"
                      onClick={() =>
                        navigate("/applications/letter", {
                          state: {
                            title: v.title,
                            company: v.company,
                            sourceId: v.sourceId,
                            externalId: v.externalId,
                          },
                        })
                      }
                    />
                    <MenuItem icon={Send} label="Apply" onClick={() => {}} />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {!loading && query.length > 0 && results.length === 0 && (
        <p className="text-muted-foreground text-sm">No vacancies found.</p>
      )}

      {!loading && query.length === 0 && (
        <p className="text-muted-foreground text-sm">
          Enter a search query to find vacancies.
        </p>
      )}
    </div>
  );
}

function MenuItem({
  icon: Icon,
  label,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 w-full px-3 py-2 text-sm text-left hover:bg-accent transition-colors"
    >
      <Icon className="w-4 h-4 text-muted-foreground" />
      {label}
    </button>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const diff = Math.floor((now.getTime() - d.getTime()) / 86400000);
  if (diff === 0) return "today";
  if (diff === 1) return "yesterday";
  if (diff < 7) return `${diff}d ago`;
  return d.toLocaleDateString();
}
