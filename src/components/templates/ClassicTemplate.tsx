"use client";

import { ResumeValues } from "@/lib/validation";
import { formatDate } from "date-fns";
import { BorderStyles } from "@/app/(main)/editor/BorderStyleButton";
import PhotoImage from "../PhotoImage";

interface ClassicTemplateProps {
  resumeData: ResumeValues;
}

export default function ClassicTemplate({ resumeData }: ClassicTemplateProps) {
  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="col-span-1 space-y-8">
        <ClassicSidebar resumeData={resumeData} />
      </div>
      <div className="col-span-2 space-y-8">
        <ClassicMainContent resumeData={resumeData} />
      </div>
    </div>
  );
}

function ClassicSidebar({ resumeData }: { resumeData: ResumeValues }) {
  const { photo, firstName, lastName, jobTitle, city, country, phone, email, colorHex, borderStyle, skills, hobbies, languages } = resumeData;

  return (
    <div className="space-y-8" style={{ backgroundColor: colorHex + "15", padding: "1.5rem" }}>
      <PhotoImage
        photo={photo}
        width={100}
        height={100}
        alt="Photo"
        className="aspect-square object-cover mx-auto"
        style={{
          borderRadius: borderStyle === BorderStyles.SQUARE ? "0px" : borderStyle === BorderStyles.CIRCLE ? "9999px" : "10%",
        }}
      />
      <div>
        <h1 className="text-2xl font-bold mb-1" style={{ color: colorHex }}>
          {firstName} {lastName}
        </h1>
        <p className="text-sm font-semibold mb-4" style={{ color: colorHex }}>
          {jobTitle}
        </p>
        <div className="space-y-2 text-xs">
          {city && <p>{city}{country ? `, ${country}` : ""}</p>}
          {phone && <p>{phone}</p>}
          {email && <p>{email}</p>}
        </div>
      </div>
      {skills && skills.length > 0 && (
        <div>
          <h3 className="font-bold text-sm mb-3" style={{ color: colorHex }}>Skills</h3>
          <div className="space-y-2">
            {skills?.map((skill, i) => (
              <div key={i} className="text-xs">{skill}</div>
            ))}
          </div>
        </div>
      )}
      {hobbies && hobbies.length > 0 && (
        <div>
          <h3 className="font-bold text-sm mb-3" style={{ color: colorHex }}>Hobbies</h3>
          <div className="space-y-2">
            {hobbies.map((hobby, i) => (
              <div key={i} className="text-xs">{hobby}</div>
            ))}
          </div>
        </div>
      )}
      {languages && languages.filter(l => l.name).length > 0 && (
        <div>
          <h3 className="font-bold text-sm mb-3" style={{ color: colorHex }}>Languages</h3>
          <div className="space-y-2">
            {languages?.filter(l => l.name).map((lang, i) => (
              <div key={i} className="text-xs">
                {lang.name} {lang.level && `- ${lang.level}`}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ClassicMainContent({ resumeData }: { resumeData: ResumeValues }) {
  const { summary, workExperiences, educations, references, colorHex } = resumeData;

  return (
    <div className="space-y-8">
      {summary && (
        <div>
          <h2 className="text-lg font-bold mb-4 pb-2 border-b" style={{ color: colorHex, borderColor: colorHex }}>
            Summary
          </h2>
          <p className="text-xs leading-relaxed mt-3">{summary}</p>
        </div>
      )}
      {workExperiences && workExperiences.filter(exp => Object.values(exp).some(Boolean)).length > 0 && (
        <div>
          <h2 className="text-lg font-bold mb-4 pb-2 border-b" style={{ color: colorHex, borderColor: colorHex }}>
            Experience
          </h2>
          <div className="space-y-4 mt-4">
            {workExperiences.filter(exp => Object.values(exp).some(Boolean)).map((exp, i) => (
              <div key={i}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-bold text-sm">{exp.position}</h3>
                    <p className="text-xs text-gray-700">{exp.company}</p>
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
      )}
      {educations && educations.filter(edu => Object.values(edu).some(Boolean)).length > 0 && (
        <div>
          <h2 className="text-lg font-bold mb-4 pb-2 border-b" style={{ color: colorHex, borderColor: colorHex }}>
            Education
          </h2>
          <div className="space-y-3 mt-4">
            {educations.filter(edu => Object.values(edu).some(Boolean)).map((edu, i) => (
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
      )}
      {references && references.filter(ref => ref.name).length > 0 && (
        <div>
          <h2 className="text-lg font-bold mb-4 pb-2 border-b" style={{ color: colorHex, borderColor: colorHex }}>
            References
          </h2>
          <div className="space-y-3 mt-4">
            {references.filter(ref => ref.name).map((ref, i) => (
              <div key={i} className="text-xs">
                <p className="font-semibold">{ref.name}</p>
                {(ref.jobTitle || ref.company) && <p>{ref.jobTitle} {ref.company ? `at ${ref.company}` : ""}</p>}
                {(ref.phone || ref.email) && <p className="text-gray-600">{[ref.phone, ref.email].filter(Boolean).join(" • ")}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
