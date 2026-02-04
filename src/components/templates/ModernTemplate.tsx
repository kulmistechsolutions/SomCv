"use client";

import { ResumeValues } from "@/lib/validation";
import { formatDate } from "date-fns";
import { Badge } from "../ui/badge";
import { BorderStyles } from "@/app/(main)/editor/BorderStyleButton";
import PhotoImage from "../PhotoImage";

interface ModernTemplateProps {
  resumeData: ResumeValues;
}

export default function ModernTemplate({ resumeData }: ModernTemplateProps) {
  return (
    <div className="space-y-8">
      <ModernHeader resumeData={resumeData} />
      <ModernSummary resumeData={resumeData} />
      <ModernWorkExperience resumeData={resumeData} />
      <ModernEducation resumeData={resumeData} />
      <ModernSkills resumeData={resumeData} />
      <ModernHobbies resumeData={resumeData} />
      <ModernLanguages resumeData={resumeData} />
      <ModernReferences resumeData={resumeData} />
    </div>
  );
}

function ModernHeader({ resumeData }: { resumeData: ResumeValues }) {
  const { photo, firstName, lastName, jobTitle, city, country, phone, email, colorHex, borderStyle } = resumeData;

  return (
    <div className="flex items-center gap-6 pb-4 border-b-4" style={{ borderColor: colorHex }}>
      <PhotoImage
        photo={photo}
        width={100}
        height={100}
        alt="Photo"
        className="aspect-square object-cover"
        style={{
          borderRadius: borderStyle === BorderStyles.SQUARE ? "0px" : borderStyle === BorderStyles.CIRCLE ? "9999px" : "10%",
        }}
      />
      <div className="flex-1">
        <h1 className="text-4xl font-bold mb-2" style={{ color: colorHex }}>
          {firstName} {lastName}
        </h1>
        <p className="text-xl font-semibold mb-2" style={{ color: colorHex }}>
          {jobTitle}
        </p>
        <p className="text-sm text-gray-600">
          {[city, country, phone, email].filter(Boolean).join(" • ")}
        </p>
      </div>
    </div>
  );
}

function ModernSummary({ resumeData }: { resumeData: ResumeValues }) {
  const { summary, colorHex } = resumeData;
  if (!summary) return null;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 pb-2 border-b-2" style={{ color: colorHex, borderColor: colorHex }}>
        Professional Summary
      </h2>
      <p className="text-sm leading-relaxed mt-3">{summary}</p>
    </div>
  );
}

function ModernWorkExperience({ resumeData }: { resumeData: ResumeValues }) {
  const { workExperiences, colorHex } = resumeData;
  const experiences = workExperiences?.filter(exp => Object.values(exp).some(Boolean)) || [];
  if (!experiences.length) return null;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 pb-2 border-b-2" style={{ color: colorHex, borderColor: colorHex }}>
        Work Experience
      </h2>
      <div className="space-y-4 mt-4">
        {experiences.map((exp, i) => (
          <div key={i} className="pl-4 border-l-2" style={{ borderColor: colorHex }}>
            <div className="flex justify-between items-start mb-1">
              <div>
                <h3 className="font-bold text-base">{exp.position}</h3>
                <p className="text-sm font-semibold text-gray-700">{exp.company}</p>
              </div>
              {exp.startDate && (
                <span className="text-xs text-gray-600">
                  {formatDate(exp.startDate, "MM/yyyy")} - {exp.endDate ? formatDate(exp.endDate, "MM/yyyy") : "Present"}
                </span>
              )}
            </div>
            {exp.description && <p className="text-xs mt-1 whitespace-pre-line">{exp.description}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

function ModernEducation({ resumeData }: { resumeData: ResumeValues }) {
  const { educations, colorHex } = resumeData;
  const educationsList = educations?.filter(edu => Object.values(edu).some(Boolean)) || [];
  if (!educationsList.length) return null;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 pb-2 border-b-2" style={{ color: colorHex, borderColor: colorHex }}>
        Education
      </h2>
      <div className="space-y-3 mt-4">
        {educationsList.map((edu, i) => (
          <div key={i} className="flex justify-between">
            <div>
              <h3 className="font-bold text-sm">{edu.degree}</h3>
              <p className="text-xs text-gray-700">{edu.school}</p>
            </div>
            {edu.startDate && (
              <span className="text-xs text-gray-600">
                {formatDate(edu.startDate, "MM/yyyy")} {edu.endDate ? `- ${formatDate(edu.endDate, "MM/yyyy")}` : ""}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ModernSkills({ resumeData }: { resumeData: ResumeValues }) {
  const { skills, colorHex, borderStyle } = resumeData;
  if (!skills?.length) return null;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 pb-2 border-b-2" style={{ color: colorHex, borderColor: colorHex }}>
        Skills
      </h2>
      <div className="flex flex-wrap gap-2 mt-4">
        {skills.map((skill, i) => (
          <Badge key={i} style={{ backgroundColor: colorHex, borderRadius: borderStyle === BorderStyles.SQUARE ? "0px" : borderStyle === BorderStyles.CIRCLE ? "9999px" : "8px" }}>
            {skill}
          </Badge>
        ))}
      </div>
    </div>
  );
}

function ModernHobbies({ resumeData }: { resumeData: ResumeValues }) {
  const { hobbies, colorHex, borderStyle } = resumeData;
  if (!hobbies?.length) return null;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 pb-2 border-b-2" style={{ color: colorHex, borderColor: colorHex }}>
        Hobbies
      </h2>
      <div className="flex flex-wrap gap-2 mt-4">
        {hobbies.map((hobby, i) => (
          <Badge key={i} style={{ backgroundColor: colorHex, borderRadius: borderStyle === BorderStyles.SQUARE ? "0px" : borderStyle === BorderStyles.CIRCLE ? "9999px" : "8px" }}>
            {hobby}
          </Badge>
        ))}
      </div>
    </div>
  );
}

function ModernLanguages({ resumeData }: { resumeData: ResumeValues }) {
  const { languages, colorHex } = resumeData;
  const languagesList = languages?.filter(lang => lang.name) || [];
  if (!languagesList.length) return null;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 pb-2 border-b-2" style={{ color: colorHex, borderColor: colorHex }}>
        Languages
      </h2>
      <div className="space-y-2 mt-4">
        {languagesList.map((lang, i) => (
          <div key={i} className="flex justify-between text-sm">
            <span className="font-semibold">{lang.name}</span>
            {lang.level && <span className="text-gray-600">{lang.level}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

function ModernReferences({ resumeData }: { resumeData: ResumeValues }) {
  const { references, colorHex } = resumeData;
  const referencesList = references?.filter(ref => ref.name) || [];
  if (!referencesList.length) return null;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 pb-2 border-b-2" style={{ color: colorHex, borderColor: colorHex }}>
        References
      </h2>
      <div className="space-y-3 mt-4">
        {referencesList.map((ref, i) => (
          <div key={i} className="text-sm">
            <p className="font-semibold">{ref.name}</p>
            {(ref.jobTitle || ref.company) && <p className="text-xs text-gray-700">{ref.jobTitle} {ref.company ? `at ${ref.company}` : ""}</p>}
            {ref.relationship && <p className="text-xs text-gray-600">{ref.relationship}</p>}
            {(ref.phone || ref.email) && <p className="text-xs text-gray-600">{[ref.phone, ref.email].filter(Boolean).join(" • ")}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
