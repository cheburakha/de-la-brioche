import { useState } from "react";
import { Save, User } from "lucide-react";

export function SettingsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    await window.electronAPI.saveProfile({ name, email, locale: "en" } as any);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <div className="max-w-md space-y-4">
        <div className="flex items-center gap-3 mb-6">
          <User className="w-8 h-8 p-1.5 rounded-full bg-primary/10 text-primary" />
          <span className="text-sm text-muted-foreground">Default Profile</span>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="your@email.com"
          />
        </div>
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium"
        >
          <Save className="w-4 h-4" />
          {saved ? "Saved!" : "Save Profile"}
        </button>
      </div>
    </div>
  );
}
