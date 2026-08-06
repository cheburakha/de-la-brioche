import {
  HashRouter,
  Routes,
  Route,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  FileText,
  PenLine,
  Settings,
  Mail,
  Briefcase,
  Send,
  Star,
  Search,
  Wrench,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { CvList } from "./pages/CvList";
import { CvEditor } from "./pages/CvEditor";
import { CoverLetter } from "./pages/CoverLetter";
import { VacanciesPage } from "./pages/Vacancies";
import { VacanciesFavouritePage } from "./pages/VacanciesFavourite";
import { VacanciesAppliedPage } from "./pages/VacanciesApplied";
import { ResumeConstructorPage } from "./pages/ResumeConstructor";
import { ApplicationsPage } from "./pages/Applications";
import { ApplicationLetterPage } from "./pages/ApplicationLetter";
import { SettingsPage } from "./pages/Settings";
import { Toaster } from "sonner";
import { cn } from "./lib/utils";
import { useState } from "react";

function NavGroup({
  to,
  icon: Icon,
  label,
  children,
}: {
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const groupActive =
    to === "/"
      ? location.pathname === "/" || location.pathname.startsWith("/resume")
      : location.pathname.startsWith(to);

  return (
    <div>
      <div
        className={cn(
          "flex items-center rounded-md transition-colors",
          groupActive ? "bg-primary" : "hover:bg-accent",
        )}
      >
        <button
          onClick={() => {
            navigate(to);
            setOpen(true);
          }}
          className={cn(
            "flex items-center gap-2 flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors text-left",
            groupActive ? "text-primary-foreground" : "text-muted-foreground",
          )}
        >
          <Icon className="w-4 h-4 shrink-0" />
          <span className="flex-1">{label}</span>
        </button>
        <button
          onClick={() => setOpen(!open)}
          className={cn(
            "p-2 rounded-md text-sm transition-colors",
            groupActive
              ? "text-primary-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
          title={open ? "Collapse" : "Expand"}
        >
          {open ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>
      </div>
      {open && (
        <div className="ml-3 pl-3 border-l border-border space-y-0.5 mt-1">
          {children}
        </div>
      )}
    </div>
  );
}

function SubLink({
  to,
  icon: Icon,
  label,
  end,
}: {
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  end?: boolean;
}) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
          isActive
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        )
      }
    >
      <Icon className="w-3.5 h-3.5" />
      {label}
    </NavLink>
  );
}

const standaloneItems = [
  { to: "/applications", icon: Send, label: "Applications" },
  { to: "/cover-letters", icon: Mail, label: "Cover Letters" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

export function App() {
  return (
    <HashRouter>
      <div className="flex h-screen bg-background">
        <nav className="w-56 border-r border-border bg-card p-4 flex flex-col gap-3 overflow-y-auto">
          <div className="flex items-center gap-2 px-3 py-4 mb-2">
            <PenLine className="w-5 h-5 text-primary" />
            <span className="font-semibold text-sm">de-la-brioche</span>
          </div>

          <NavGroup to="/" icon={FileText} label="Resumes">
            <SubLink to="/" icon={FileText} label="All" end />
            <SubLink
              to="/resume/constructor"
              icon={Wrench}
              label="Constructor"
            />
          </NavGroup>

          <NavGroup to="/vacancies" icon={Briefcase} label="Vacancies">
            <SubLink to="/vacancies" icon={Search} label="Search" end />
            <SubLink to="/vacancies/favourite" icon={Star} label="Favourite" />
            <SubLink to="/vacancies/applied" icon={Send} label="Applied" />
          </NavGroup>

          <div className="space-y-0.5">
            {standaloneItems.map(({ to, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  )
                }
              >
                <Icon className="w-4 h-4" />
                {label}
              </NavLink>
            ))}
          </div>
        </nav>

        <main className="flex-1 overflow-auto p-6">
          <Toaster position="top-right" richColors />
          <Routes>
            <Route path="/" element={<CvList />} />
            <Route path="/editor/:filename" element={<CvEditor />} />
            <Route
              path="/resume/constructor"
              element={<ResumeConstructorPage />}
            />
            <Route path="/vacancies" element={<VacanciesPage />} />
            <Route
              path="/vacancies/favourite"
              element={<VacanciesFavouritePage />}
            />
            <Route
              path="/vacancies/applied"
              element={<VacanciesAppliedPage />}
            />
            <Route path="/applications" element={<ApplicationsPage />} />
            <Route
              path="/applications/letter"
              element={<ApplicationLetterPage />}
            />
            <Route path="/cover-letters" element={<CoverLetter />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
}
