import { HashRouter, Routes, Route, NavLink } from 'react-router-dom';
import { FileText, PenLine, Settings, Mail } from 'lucide-react';
import { CvList } from './pages/CvList';
import { CvEditor } from './pages/CvEditor';
import { CoverLetter } from './pages/CoverLetter';
import { SettingsPage } from './pages/Settings';
import { cn } from './lib/utils';

const navItems = [
  { to: '/', icon: FileText, label: 'CVs' },
  { to: '/cover-letters', icon: Mail, label: 'Cover Letters' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export function App() {
  return (
    <HashRouter>
      <div className="flex h-screen bg-background">
        <nav className="w-56 border-r border-border bg-card p-4 flex flex-col gap-2">
          <div className="flex items-center gap-2 px-3 py-4 mb-4">
            <PenLine className="w-5 h-5 text-primary" />
            <span className="font-semibold text-sm">de-la-brioche</span>
          </div>
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                )
              }
            >
              <Icon className="w-4 h-4" />
              {label}
            </NavLink>
          ))}
        </nav>
        <main className="flex-1 overflow-auto p-6">
          <Routes>
            <Route path="/" element={<CvList />} />
            <Route path="/editor/:filename" element={<CvEditor />} />
            <Route path="/cover-letters" element={<CoverLetter />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
}
