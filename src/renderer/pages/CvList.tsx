import { useNavigate } from "react-router-dom";
import { FileText, FileDown } from "lucide-react";
import { useState, useEffect } from "react";
import type { CvFile } from "../../preload/index";

export function CvList() {
  const navigate = useNavigate();
  const [files, setFiles] = useState<CvFile[]>([]);
  const [exporting, setExporting] = useState<string | null>(null);

  useEffect(() => {
    window.electronAPI.getCvList().then(setFiles);
  }, []);

  const handleExport = async (file: CvFile) => {
    setExporting(file.filename);
    try {
      const pdfPath = await window.electronAPI.exportPdf(file.path);
      alert(`PDF saved:\n${pdfPath}`);
    } catch (error) {
      alert(`Export failed:\n${error}`);
    } finally {
      setExporting(null);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Resumes</h1>
      <div className="grid gap-4">
        {files.map((file) => (
          <div
            key={file.filename}
            className="flex items-center justify-between p-4 rounded-lg border border-border bg-card hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-muted-foreground" />
              <span className="font-medium">{file.filename}</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleExport(file)}
                disabled={exporting === file.filename}
                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded-md border border-border hover:bg-accent transition-colors disabled:opacity-50"
              >
                <FileDown className="w-4 h-4" />
                {exporting === file.filename ? "Exporting..." : "Export PDF"}
              </button>
              <button
                onClick={() =>
                  navigate(`/editor/${encodeURIComponent(file.filename)}`)
                }
                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
