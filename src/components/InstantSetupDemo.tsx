import { motion } from "framer-motion";
import { FileText, FileSpreadsheet, Image, FileArchive, Upload, Check, MoreHorizontal } from "lucide-react";

interface KnowledgeFile {
  name: string;
  type: string;
  size: string;
  icon: React.ElementType;
  color: string;
  status: "processed" | "processing";
  date: string;
}

const files: KnowledgeFile[] = [
  { name: "Product Catalog 2026.pdf", type: "PDF", size: "2.4 MB", icon: FileText, color: "hsl(0, 72%, 51%)", status: "processed", date: "Mar 14" },
  { name: "FAQ & Support Guide.docx", type: "DOCX", size: "890 KB", icon: FileText, color: "hsl(217, 91%, 60%)", status: "processed", date: "Mar 13" },
  { name: "Pricing & Plans.xlsx", type: "XLSX", size: "1.1 MB", icon: FileSpreadsheet, color: "hsl(142, 71%, 45%)", status: "processed", date: "Mar 12" },
  { name: "Brand Guidelines.pdf", type: "PDF", size: "5.2 MB", icon: FileText, color: "hsl(0, 72%, 51%)", status: "processed", date: "Mar 11" },
  { name: "Product Photos.zip", type: "ZIP", size: "18.7 MB", icon: FileArchive, color: "hsl(45, 93%, 47%)", status: "processed", date: "Mar 10" },
  { name: "Return Policy.pdf", type: "PDF", size: "340 KB", icon: FileText, color: "hsl(0, 72%, 51%)", status: "processing", date: "Mar 10" },
  { name: "Size Chart.png", type: "PNG", size: "1.8 MB", icon: Image, color: "hsl(280, 67%, 51%)", status: "processed", date: "Mar 9" },
  { name: "Shipping Rates.xlsx", type: "XLSX", size: "420 KB", icon: FileSpreadsheet, color: "hsl(142, 71%, 45%)", status: "processed", date: "Mar 8" },
];

const InstantSetupDemo = () => {
  return (
    <div className="mt-6 rounded-xl border border-border/60 bg-secondary/30 overflow-hidden" style={{ height: 420 }}>
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b border-border/50 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Knowledge Base</p>
          <span className="text-[10px] text-muted-foreground bg-muted rounded-full px-2 py-0.5">{files.length} files</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-lg border border-dashed border-border/80 px-2.5 py-1.5 text-muted-foreground/70">
            <Upload className="h-3 w-3" />
            <span className="text-[10px]">Upload</span>
          </div>
        </div>
      </div>

      {/* File grid */}
      <div className="p-3 overflow-y-auto" style={{ height: 374 }}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {files.map((file, idx) => (
            <motion.div
              key={file.name}
              className="group relative rounded-xl border border-border/50 bg-background/60 p-3 flex flex-col items-center gap-2 hover:border-border hover:bg-background/80 transition-colors cursor-default"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
            >
              {/* File icon */}
              <div
                className="h-10 w-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${file.color}12` }}
              >
                <file.icon className="h-5 w-5" style={{ color: file.color }} strokeWidth={1.5} />
              </div>

              {/* File info */}
              <div className="w-full text-center min-w-0">
                <p className="text-[10px] font-medium text-foreground truncate leading-tight">{file.name}</p>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <span className="text-[9px] text-muted-foreground">{file.type}</span>
                  <span className="text-[9px] text-muted-foreground/40">·</span>
                  <span className="text-[9px] text-muted-foreground">{file.size}</span>
                </div>
              </div>

              {/* Status badge */}
              <div className={`flex items-center gap-1 ${
                file.status === "processed" ? "text-green-600" : "text-amber-500"
              }`}>
                {file.status === "processed" ? (
                  <>
                    <Check className="h-2.5 w-2.5" />
                    <span className="text-[9px]">Trained</span>
                  </>
                ) : (
                  <>
                    <div className="h-2.5 w-2.5 rounded-full border-2 border-current border-t-transparent animate-spin" />
                    <span className="text-[9px]">Processing</span>
                  </>
                )}
              </div>

              {/* Hover more button */}
              <button className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-60 transition-opacity">
                <MoreHorizontal className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstantSetupDemo;
