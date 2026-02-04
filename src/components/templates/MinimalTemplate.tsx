"use client";

import { ResumeValues } from "@/lib/validation";
import { formatDate } from "date-fns";
import { BorderStyles } from "@/app/(main)/editor/BorderStyleButton";
import PhotoImage from "../PhotoImage";

interface MinimalTemplateProps {
  resumeData: ResumeValues;
}

export default function MinimalTemplate({ resumeData }: MinimalTemplateProps) {
  return (
    <div className="space-y-10">
      <MinimalHeader resumeData={resumeData} />
      <MinimalSummary resumeData={resumeData} />
      <MinimalWorkExperience resumeData={resumeData} />
      <MinimalEducation resumeData={resumeData} />
      <div className="grid grid-cols-2 gap-10">
        <MinimalSkills resumeData={resumeData} />
        <MinimalLanguages resumeData={resumeData} />
      </div>
      <MinimalHobbies resumeData={resumeData} />
      <MinimalReferences resumeData={resumeData} />
    </div>
  );
}

function MinimalHeader({ resumeData }: { resumeData: ResumeValues }) {
  const { photo, firstName, lastName, jobTitle, city, country, phone, email, colorHex, borderStyle } = resumeData;

  return (
    <div className="text-center pb-6 border-b" style={{ borderColor: colorHex + "40" }}>
      <PhotoImage
        photo={photo}
        width={100}
        height={100}
        alt="Photo"
        className="aspect-square object-cover mx-auto mb-4"
        style={{
          borderRadius: borderStyle === BorderStyles.SQUARE ? "0px" : borderStyle === BorderStyles.CIRCLE ? "9999px" : "10%",
        }}
      />
      <h1 className="text-3xl font-light mb-2" style={{ color: colorHex }}>
        {firstName} {lastName}
      </h1>
      <p className="text-sm font-light mb-3 text-gray-600">{jobTitle}</p>
      <div className="text-xs text-gray-500 space-x-3">
        {city && <span>{city}</span>}
        {country && <span>{country}</span>}
        {phone && <span>{phone}</span>}
        {email && <span>{email}</span>}
      </div>
    </div>
  );
}

function MinimalSummary({ resumeData }: { resumeData: ResumeValues }) {
  const { summary, colorHex } = resumeData;
  if (!summary) return null;

  return (
    <div className="text-center">
      <h2 className="text-sm font-light uppercase tracking-wider mb-4 pb-2 border-b mx-auto max-w-xs" style={{ color: colorHex, borderColor: colorHex + "40" }}>
        Summary
      </h2>
      <p className="text-xs leading-relaxed text-gray-700 max-w-2xl mx-auto mt-4">{summary}</p>
    </div>
  );
}

function MinimalWorkExperience({ resumeData }: { resumeData: ResumeValues }) {
  const { workExperiences, colorHex } = resumeData;
  const experiences = workExperiences?.filter(exp => Object.values(exp).some(Boolean)) || [];
  if (!experiences.length) return null;

  // Check if we should use two columns (more than 2 experiences or any description is long)
  const shouldUseTwoColumns = experiences.length > 2 || experiences.some(exp => exp.description && exp.description.length > 100);

  return (
    <div>
      <h2 className="text-sm font-light uppercase tracking-wider mb-5 pb-2 border-b" style={{ color: colorHex, borderColor: colorHex + "40" }}>
        Experience
      </h2>
      <div className={shouldUseTwoColumns ? "grid grid-cols-2 gap-5 mt-5" : "space-y-5 mt-5"}>
        {experiences.map((exp, i) => {
          // Convert description to bullet points
          const descriptionLines = exp.description
            ? exp.description.split('\n').filter(line => line.trim())
            : [];
          
          return (
            <div key={i} className="text-left">
              <h3 className="text-sm font-medium mb-1">{exp.position}</h3>
              <p className="text-xs text-gray-600 mb-1">{exp.company}</p>
              {exp.startDate && (
                <p className="text-xs text-gray-500 mb-2">
                  {formatDate(exp.startDate, "MM/yyyy")} - {exp.endDate ? formatDate(exp.endDate, "MM/yyyy") : "Present"}
                </p>
              )}
              {descriptionLines.length > 0 && (
                <ul className="text-xs text-gray-700 mt-2 space-y-1 list-disc list-inside">
                  {descriptionLines.map((line, idx) => (
                    <li key={idx} className="leading-relaxed">{line.trim()}</li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MinimalEducation({ resumeData }: { resumeData: ResumeValues }) {
  const { educations, colorHex } = resumeData;
  const educationsList = educations?.filter(edu => Object.values(edu).some(Boolean)) || [];
  if (!educationsList.length) return null;

  return (
    <div>
      <h2 className="text-sm font-light uppercase tracking-wider mb-5 pb-2 border-b" style={{ color: colorHex, borderColor: colorHex + "40" }}>
        Education
      </h2>
      <div className="space-y-4 text-center mt-5">
        {educationsList.map((edu, i) => (
          <div key={i}>
            <h3 className="text-sm font-medium">{edu.degree}</h3>
            <p className="text-xs text-gray-600">{edu.school}</p>
            {edu.startDate && (
              <p className="text-xs text-gray-500 mt-1">
                {formatDate(edu.startDate, "MM/yyyy")} {edu.endDate ? `- ${formatDate(edu.endDate, "MM/yyyy")}` : ""}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function MinimalSkills({ resumeData }: { resumeData: ResumeValues }) {
  const { skills, colorHex } = resumeData;
  if (!skills?.length) return null;

  return (
    <div>
      <h2 className="text-sm font-light uppercase tracking-wider mb-4 pb-2 border-b" style={{ color: colorHex, borderColor: colorHex + "40" }}>
        Skills
      </h2>
      <div className="space-y-2 mt-4">
        {skills.map((skill, i) => (
          <div key={i} className="text-xs text-gray-700">{skill}</div>
        ))}
      </div>
    </div>
  );
}

function MinimalLanguages({ resumeData }: { resumeData: ResumeValues }) {
  const { languages, colorHex } = resumeData;
  const languagesList = languages?.filter(lang => lang.name) || [];
  if (!languagesList.length) return null;

  return (
    <div>
      <h2 className="text-sm font-light uppercase tracking-wider mb-4 pb-2 border-b" style={{ color: colorHex, borderColor: colorHex + "40" }}>
        Languages
      </h2>
      <div className="space-y-2 mt-4">
        {languagesList.map((lang, i) => (
          <div key={i} className="text-xs text-gray-700">
            {lang.name} {lang.level && <span className="text-gray-500">({lang.level})</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

function MinimalHobbies({ resumeData }: { resumeData: ResumeValues }) {
  const { hobbies, colorHex } = resumeData;
  if (!hobbies?.length) return null;

  return (
    <div className="text-center">
      <h2 className="text-sm font-light uppercase tracking-wider mb-4 pb-2 border-b mx-auto max-w-xs" style={{ color: colorHex, borderColor: colorHex + "40" }}>
        Hobbies
      </h2>
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        {hobbies.map((hobby, i) => (
          <span key={i} className="text-xs text-gray-700">{hobby}</span>
        ))}
      </div>
    </div>
  );
}

function MinimalReferences({ resumeData }: { resumeData: ResumeValues }) {
  const { references, colorHex } = resumeData;
  const referencesList = references?.filter(ref => ref.name) || [];
  if (!referencesList.length) return null;

  return (
    <div>
      <h2 className="text-sm font-light uppercase tracking-wider mb-5 pb-2 border-b text-center" style={{ color: colorHex, borderColor: colorHex + "40" }}>
        References
      </h2>
      <div className="grid grid-cols-3 gap-4 text-center mt-5">
        {referencesList.map((ref, i) => (
          <div key={i} className="text-xs">
            <p className="font-medium">{ref.name}</p>
            {(ref.jobTitle || ref.company) && <p className="text-gray-600">{ref.jobTitle} {ref.company ? `at ${ref.company}` : ""}</p>}
            {(ref.phone || ref.email) && <p className="text-gray-500 mt-1">{[ref.phone, ref.email].filter(Boolean).join(" • ")}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
