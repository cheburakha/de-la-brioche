import { useState } from 'react';
import { Send, Mail } from 'lucide-react';

export function CoverLetter() {
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!company || !position) return;
    setGenerating(true);
    setError(null);
    setResult(null);

    try {
      // Worker-based generation will go through IPC
      // For now, use the API directly
      const apiKey = process.env.OPENAI_API_KEY;
      if (!apiKey) {
        setError('OpenAI API key not configured. Set OPENAI_API_KEY in your environment.');
        setGenerating(false);
        return;
      }

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'You are a professional cover letter writer. Write concise, tailored cover letters.',
            },
            {
              role: 'user',
              content: [
                `Company: ${company}`,
                `Position: ${position}`,
                `Job Description: ${jobDescription}`,
                'Write a professional cover letter.',
              ].join('\n'),
            },
          ],
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        setError(`API error: ${response.status} — ${text}`);
        setGenerating(false);
        return;
      }

      const json = await response.json() as any;
      const body = json.choices?.[0]?.message?.content;
      if (body) {
        setResult(body);
        await window.electronAPI.saveCoverLetter({ company, position, body } as any);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Cover Letters</h1>
      <div className="max-w-2xl space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Company</label>
          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Acme Corp"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Position</label>
          <input
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Senior Software Engineer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Job Description</label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm resize-none h-32 focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Paste the job description here..."
          />
        </div>
        <button
          onClick={handleGenerate}
          disabled={generating || !company || !position}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 text-sm font-medium"
        >
          <Send className="w-4 h-4" />
          {generating ? 'Generating...' : 'Generate Cover Letter'}
        </button>

        {error && (
          <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">
            {error}
          </div>
        )}

        {result && (
          <div className="p-4 rounded-lg border border-border bg-card">
            <div className="flex items-center gap-2 mb-3">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium text-sm">
                Cover Letter for {position} at {company}
              </span>
            </div>
            <div className="text-sm whitespace-pre-wrap">{result}</div>
          </div>
        )}
      </div>
    </div>
  );
}
