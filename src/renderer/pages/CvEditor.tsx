import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Eye, Download } from "lucide-react";
import { marked } from "marked";

export function CvEditor() {
  const { filename } = useParams<{ filename: string }>();
  const navigate = useNavigate();
  const [source, setSource] = useState("");
  const [preview, setPreview] = useState(false);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    if (filename) {
      window.electronAPI.getCvSource(filename).then(setSource);
    }
  }, [filename]);

  const handleSave = useCallback(async () => {
    if (filename) {
      await window.electronAPI.saveCvSource(filename, source);
      alert("Saved");
    }
  }, [filename, source]);

  const handleExport = useCallback(async () => {
    if (!filename) return;
    setExporting(true);
    try {
      const pdfPath = await window.electronAPI.exportPdf(filename);
      alert(`PDF saved:\n${pdfPath}`);
    } catch (error) {
      alert(`Export failed:\n${error}`);
    } finally {
      setExporting(false);
    }
  }, [filename]);

  const htmlPreview = marked(source) as string;

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="p-1.5 rounded-md hover:bg-accent transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold">{filename}</h1>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setPreview(!preview)}
            className="inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded-md border border-border hover:bg-accent transition-colors"
          >
            <Eye className="w-4 h-4" />
            {preview ? "Source" : "Preview"}
          </button>
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded-md border border-border hover:bg-accent transition-colors"
          >
            <Save className="w-4 h-4" />
            Save
          </button>
          <button
            onClick={handleExport}
            disabled={exporting}
            className="inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            {exporting ? "Exporting..." : "Export PDF"}
          </button>
        </div>
      </div>
      <div className="flex-1 flex gap-4">
        {!preview && (
          <textarea
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="flex-1 p-4 rounded-lg border border-border bg-card font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
          />
        )}
        {preview && (
          <div className="flex-1 p-4 rounded-lg border border-border bg-white overflow-auto">
            <div
              className="max-w-[210mm] mx-auto"
              dangerouslySetInnerHTML={{ __html: htmlPreview }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
