"use client";

import { ResumeValues } from "@/lib/validation";
import { formatDate } from "date-fns";
import { Badge } from "../ui/badge";
import { BorderStyles } from "@/app/(main)/editor/BorderStyleButton";
import PhotoImage from "../PhotoImage";

interface CreativeTemplateProps {
  resumeData: ResumeValues;
}

export default function CreativeTemplate({ resumeData }: CreativeTemplateProps) {
  return (
    <div className="space-y-8">
      <CreativeHeader resumeData={resumeData} />
      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-8">
          <CreativeSummary resumeData={resumeData} />
          <CreativeWorkExperience resumeData={resumeData} />
        </div>
        <div className="space-y-8">
          <CreativeSkills resumeData={resumeData} />
          <CreativeEducation resumeData={resumeData} />
          <CreativeLanguages resumeData={resumeData} />
          <CreativeHobbies resumeData={resumeData} />
        </div>
      </div>
      <CreativeReferences resumeData={resumeData} />
    </div>
  );
}

function CreativeHeader({ resumeData }: { resumeData: ResumeValues }) {
  const { photo, firstName, lastName, jobTitle, city, country, phone, email, colorHex, borderStyle } = resumeData;

  return (
    <div className="relative pb-6" style={{ borderBottom: `3px solid ${colorHex}` }}>
      <div className="flex items-center gap-4">
        {photo && (
          <div className="relative" style={{ border: `3px solid ${colorHex}`, borderRadius: "50%", width: "100px", height: "100px", overflow: "hidden" }}>
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
          </div>
        )}
        <div className="flex-1">
          <h1 className="text-3xl font-extrabold mb-1" style={{ color: colorHex }}>
            {firstName} {lastName}
          </h1>
          <p className="text-lg font-semibold mb-2">{jobTitle}</p>
          <div className="flex flex-wrap gap-3 text-xs text-gray-600">
            {city && <span>{city}</span>}
            {country && <span>{country}</span>}
            {phone && <span>{phone}</span>}
            {email && <span>{email}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

function CreativeSummary({ resumeData }: { resumeData: ResumeValues }) {
  const { summary, colorHex } = resumeData;
  if (!summary) return null;

  return (
    <div>
      <h2 className="text-lg font-bold mb-3 px-3 py-1 text-white" style={{ backgroundColor: colorHex }}>
        Summary
      </h2>
      <p className="text-xs leading-relaxed mt-3">{summary}</p>
    </div>
  );
}

function CreativeWorkExperience({ resumeData }: { resumeData: ResumeValues }) {
  const { workExperiences, colorHex } = resumeData;
  const experiences = workExperiences?.filter(exp => Object.values(exp).some(Boolean)) || [];
  if (!experiences.length) return null;

  return (
    <div>
      <h2 className="text-lg font-bold mb-4 px-3 py-1 text-white" style={{ backgroundColor: colorHex }}>
        Experience
      </h2>
      <div className="space-y-4 mt-4">
        {experiences.map((exp, i) => (
          <div key={i} className="pl-3 border-l-2" style={{ borderColor: colorHex }}>
            <h3 className="font-bold text-sm">{exp.position}</h3>
            <p className="text-xs text-gray-700">{exp.company}</p>
            {exp.startDate && (
              <p className="text-xs text-gray-600 mt-1">
                {formatDate(exp.startDate, "MM/yyyy")} - {exp.endDate ? formatDate(exp.endDate, "MM/yyyy") : "Present"}
              </p>
            )}
            {exp.description && <p className="text-xs mt-2 whitespace-pre-line">{exp.description}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

function CreativeSkills({ resumeData }: { resumeData: ResumeValues }) {
  const { skills, colorHex, borderStyle } = resumeData;
  if (!skills?.length) return null;

  return (
    <div>
      <h2 className="text-lg font-bold mb-4 px-3 py-1 text-white" style={{ backgroundColor: colorHex }}>
        Skills
      </h2>
      <div className="flex flex-wrap gap-2 mt-4">
        {skills.map((skill, i) => (
          <Badge key={i} className="text-white" style={{ backgroundColor: colorHex, borderRadius: borderStyle === BorderStyles.SQUARE ? "0px" : borderStyle === BorderStyles.CIRCLE ? "9999px" : "8px" }}>
            {skill}
          </Badge>
        ))}
      </div>
    </div>
  );
}

function CreativeEducation({ resumeData }: { resumeData: ResumeValues }) {
  const { educations, colorHex } = resumeData;
  const educationsList = educations?.filter(edu => Object.values(edu).some(Boolean)) || [];
  if (!educationsList.length) return null;

  return (
    <div>
      <h2 className="text-lg font-bold mb-4 px-3 py-1 text-white" style={{ backgroundColor: colorHex }}>
        Education
      </h2>
      <div className="space-y-3 mt-4">
        {educationsList.map((edu, i) => (
          <div key={i}>
            <h3 className="font-bold text-xs">{edu.degree}</h3>
            <p className="text-xs text-gray-700">{edu.school}</p>
            {edu.startDate && (
              <p className="text-xs text-gray-600">
                {formatDate(edu.startDate, "MM/yyyy")} {edu.endDate ? `- ${formatDate(edu.endDate, "MM/yyyy")}` : ""}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function CreativeLanguages({ resumeData }: { resumeData: ResumeValues }) {
  const { languages, colorHex } = resumeData;
  const languagesList = languages?.filter(lang => lang.name) || [];
  if (!languagesList.length) return null;

  return (
    <div>
      <h2 className="text-lg font-bold mb-4 px-3 py-1 text-white" style={{ backgroundColor: colorHex }}>
        Languages
      </h2>
      <div className="space-y-2 mt-4">
        {languagesList.map((lang, i) => (
          <div key={i} className="text-xs">
            <span className="font-semibold">{lang.name}</span>
            {lang.level && <span className="text-gray-600 ml-2">({lang.level})</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

function CreativeHobbies({ resumeData }: { resumeData: ResumeValues }) {
  const { hobbies, colorHex, borderStyle } = resumeData;
  if (!hobbies?.length) return null;

  return (
    <div>
      <h2 className="text-lg font-bold mb-4 px-3 py-1 text-white" style={{ backgroundColor: colorHex }}>
        Hobbies
      </h2>
      <div className="flex flex-wrap gap-2 mt-4">
        {hobbies.map((hobby, i) => (
          <Badge key={i} className="text-white" style={{ backgroundColor: colorHex, borderRadius: borderStyle === BorderStyles.SQUARE ? "0px" : borderStyle === BorderStyles.CIRCLE ? "9999px" : "8px" }}>
            {hobby}
          </Badge>
        ))}
      </div>
    </div>
  );
}

function CreativeReferences({ resumeData }: { resumeData: ResumeValues }) {
  const { references, colorHex } = resumeData;
  const referencesList = references?.filter(ref => ref.name) || [];
  if (!referencesList.length) return null;

  return (
    <div>
      <h2 className="text-lg font-bold mb-4 px-3 py-1 text-white" style={{ backgroundColor: colorHex }}>
        References
      </h2>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {referencesList.map((ref, i) => (
          <div key={i} className="text-xs">
            <p className="font-semibold">{ref.name}</p>
            {(ref.jobTitle || ref.company) && <p>{ref.jobTitle} {ref.company ? `at ${ref.company}` : ""}</p>}
            {(ref.phone || ref.email) && <p className="text-gray-600">{[ref.phone, ref.email].filter(Boolean).join(" • ")}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
