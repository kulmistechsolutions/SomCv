"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResumeValues } from "@/lib/validation";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface TemplateSelectorProps {
  resumeData: ResumeValues;
  setResumeData: (data: ResumeValues) => void;
}

const templates = [
  {
    id: "modern",
    name: "Modern",
    description: "Clean and professional with bold sections",
    preview: "Modern layout with clear sections",
  },
  {
    id: "classic",
    name: "Classic",
    description: "Traditional two-column layout",
    preview: "Classic professional style",
  },
  {
    id: "creative",
    name: "Creative",
    description: "Eye-catching design with unique layout",
    preview: "Creative and modern design",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Simple and elegant minimalist design",
    preview: "Clean minimalist style",
  },
];

export default function TemplateSelector({
  resumeData,
  setResumeData,
}: TemplateSelectorProps) {
  const currentTemplate = resumeData.template || "modern";

  return (
    <div className="space-y-4">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">Choose Template</h2>
        <p className="text-sm text-muted-foreground">
          Select a template style for your resume
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {templates.map((template) => (
          <Card
            key={template.id}
            className={cn(
              "cursor-pointer transition-all hover:border-primary",
              currentTemplate === template.id && "border-primary ring-2 ring-primary"
            )}
            onClick={() =>
              setResumeData({ ...resumeData, template: template.id })
            }
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{template.name}</CardTitle>
                {currentTemplate === template.id && (
                  <Check className="h-5 w-5 text-primary" />
                )}
              </div>
              <CardDescription>{template.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border bg-muted p-4 text-center text-sm text-muted-foreground">
                {template.preview}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
