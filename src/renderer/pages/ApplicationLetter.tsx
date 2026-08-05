import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Send } from "lucide-react";
import { useState, useCallback } from "react";

export function ApplicationLetterPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const vacancy = (location.state as Record<string, string>) ?? {};

  const [letter, setLetter] = useState("");

  const handleSend = useCallback(() => {
    // will be implemented later
  }, []);

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-1.5 rounded-md hover:bg-accent transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-bold">Cover Letter</h1>
      </div>

      {vacancy.title && (
        <p className="text-sm text-muted-foreground mb-4">
          For:{" "}
          <span className="font-medium text-foreground">{vacancy.title}</span>
          {vacancy.company ? ` at ${vacancy.company}` : ""}
        </p>
      )}

      <div className="max-w-2xl space-y-4">
        <textarea
          value={letter}
          onChange={(e) => setLetter(e.target.value)}
          placeholder="Write your cover letter here…"
          className="w-full h-64 px-4 py-3 rounded-lg border border-border bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <button
          onClick={handleSend}
          disabled={!letter.trim()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 text-sm font-medium"
        >
          <Send className="w-4 h-4" />
          Send Application
        </button>
      </div>
    </div>
  );
}
