import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Building2,
  MapPin,
  Clock,
  MoreVertical,
  ExternalLink,
  Star,
  FileText,
  Send,
} from "lucide-react";
import type { VacancySearchResult } from "../../preload/index";

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

export function VacanciesFavouritePage() {
  const navigate = useNavigate();
  const [favourites, setFavourites] = useState<VacancySearchResult[]>([]);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    window.electronAPI.listFavourites().then(setFavourites);
  }, []);

  const menuItems = (v: VacancySearchResult) => [
    {
      icon: ExternalLink,
      label: "Open link",
      action: () => window.electronAPI.openExternal(v.url),
    },
    {
      icon: Star,
      label: "Remove from favourites",
      action: async () => {
        await window.electronAPI.unfavourite(v.externalId);
        setFavourites((prev) =>
          prev.filter((x) => x.externalId !== v.externalId),
        );
        toast.success("Removed from favourites");
      },
    },
    {
      icon: FileText,
      label: "Form a letter",
      action: () =>
        navigate("/applications/letter", {
          state: {
            title: v.title,
            company: v.company,
            sourceId: v.sourceId,
            externalId: v.externalId,
          },
        }),
    },
    {
      icon: Send,
      label: "Apply",
      action: () => {},
    },
  ];

  return (
    <div onClick={() => setOpenMenu(null)}>
      <h1 className="text-2xl font-bold mb-6">Favourite Vacancies</h1>

      {favourites.length === 0 && (
        <p className="text-muted-foreground text-sm">
          No favourite vacancies yet. Use the star icon in search results to
          save one.
        </p>
      )}

      <div className="space-y-3">
        {favourites.map((v) => (
          <div
            key={v.externalId}
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
                    {menuItems(v).map((item) => (
                      <MenuItem
                        key={item.label}
                        icon={item.icon}
                        label={item.label}
                        onClick={item.action}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
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
