import { useState, useEffect } from "react";
import {
  Mail,
  ChevronDown,
  ChevronRight,
  Building2,
  Clock,
} from "lucide-react";
import type { ApplicationCoverLetter } from "../../preload/index";

export function CoverLetter() {
  const [letters, setLetters] = useState<ApplicationCoverLetter[]>([]);
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    window.electronAPI.getCoverLetters().then(setLetters);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Cover Letters</h1>

      {letters.length === 0 && (
        <p className="text-muted-foreground text-sm">
          No cover letters yet. Create one from a vacancy or the Applications
          page.
        </p>
      )}

      <div className="space-y-3">
        {letters.map((l) => (
          <div
            key={l.id}
            className="p-4 rounded-lg border border-border bg-card hover:shadow-sm transition-shadow"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
                  <h3 className="font-medium text-sm truncate">{l.position}</h3>
                </div>
                <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground flex-wrap">
                  <span className="flex items-center gap-1">
                    <Building2 className="w-3 h-3" />
                    {l.company}
                  </span>
                  {l.createdAt && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatDate(l.createdAt)}
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() =>
                  setExpanded(expanded === l.id ? null : (l.id ?? null))
                }
                className="shrink-0 p-1 rounded-md hover:bg-accent transition-colors"
              >
                {expanded === l.id ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>
            </div>
            {expanded === l.id && (
              <div className="mt-3 pt-3 border-t border-border text-sm text-muted-foreground whitespace-pre-wrap">
                {l.body}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString();
}
