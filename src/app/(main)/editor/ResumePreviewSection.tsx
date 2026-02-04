"use client";

import ResumePreview from "@/components/ResumePreview";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ResumeValues } from "@/lib/validation";
import { Download, Printer } from "lucide-react";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import BorderStyleButton from "./BorderStyleButton";
import ColorPicker from "./ColorPicker";

interface ResumePreviewSectionProps {
  resumeData: ResumeValues;
  setResumeData: (data: ResumeValues) => void;
  className?: string;
}

export default function ResumePreviewSection({
  resumeData,
  setResumeData,
  className,
}: ResumePreviewSectionProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: resumeData.title || "Resume",
  });

  const handleDownload = () => {
    reactToPrintFn();
  };

  return (
    <div
      className={cn("group relative hidden w-full md:flex md:w-1/2", className)}
    >
      <div className="absolute left-1 top-1 z-10 flex flex-none flex-col gap-3 opacity-50 transition-opacity group-hover:opacity-100 lg:left-3 lg:top-3 xl:opacity-100">
        <ColorPicker
          color={resumeData.colorHex}
          onChange={(color) =>
            setResumeData({ ...resumeData, colorHex: color.hex })
          }
        />
        <BorderStyleButton
          borderStyle={resumeData.borderStyle}
          onChange={(borderStyle) =>
            setResumeData({ ...resumeData, borderStyle })
          }
        />
      </div>
      <div className="absolute right-1 top-1 z-10 flex flex-none flex-col gap-2 opacity-50 transition-opacity group-hover:opacity-100 lg:right-3 lg:top-3 xl:opacity-100">
        <Button
          variant="outline"
          size="icon"
          onClick={handleDownload}
          title="Download/Print Resume"
        >
          <Download className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => reactToPrintFn()}
          title="Print Resume"
        >
          <Printer className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex w-full justify-center overflow-y-auto bg-secondary p-3">
        <ResumePreview
          resumeData={resumeData}
          contentRef={contentRef}
          className="max-w-2xl shadow-md"
        />
      </div>
    </div>
  );
}
