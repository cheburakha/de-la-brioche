import { parentPort, workerData } from "node:worker_threads";

interface CoverLetterInput {
  company: string;
  position: string;
  profileSummary: string;
  jobDescription: string;
  apiKey?: string;
  model?: string;
}

interface CoverLetterResult {
  success: boolean;
  body?: string;
  error?: string;
}

if (parentPort) {
  parentPort.on("message", async (input: CoverLetterInput) => {
    try {
      const apiKey = input.apiKey ?? process.env.OPENAI_API_KEY;
      if (!apiKey) {
        parentPort?.postMessage({
          success: false,
          error: "No API key configured",
        } satisfies CoverLetterResult);
        return;
      }

      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: input.model ?? "gpt-4o-mini",
            messages: [
              {
                role: "system",
                content:
                  "You are a professional cover letter writer. Write concise, tailored cover letters.",
              },
              {
                role: "user",
                content: [
                  `Company: ${input.company}`,
                  `Position: ${input.position}`,
                  `Profile: ${input.profileSummary}`,
                  `Job Description: ${input.jobDescription}`,
                  "Write a professional cover letter.",
                ].join("\n"),
              },
            ],
            temperature: 0.7,
          }),
        },
      );

      if (!response.ok) {
        const text = await response.text();
        parentPort?.postMessage({
          success: false,
          error: `API error: ${response.status} — ${text}`,
        } satisfies CoverLetterResult);
        return;
      }

      const json = (await response.json()) as any;
      const body = json.choices?.[0]?.message?.content;
      parentPort?.postMessage({
        success: true,
        body,
      } satisfies CoverLetterResult);
    } catch (error) {
      parentPort?.postMessage({
        success: false,
        error: error instanceof Error ? error.message : String(error),
      } satisfies CoverLetterResult);
    }
  });
}
