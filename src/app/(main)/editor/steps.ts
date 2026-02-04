import { EditorFormProps } from "@/lib/types";
import EducationForm from "./forms/EducationForm";
import GeneralInfoForm from "./forms/GeneralInfoForm";
import HobbiesForm from "./forms/HobbiesForm";
import LanguagesForm from "./forms/LanguagesForm";
import PersonalInfoForm from "./forms/PersonalInfoForm";
import ReferencesForm from "./forms/ReferencesForm";
import SkillsForm from "./forms/SkillsForm";
import SummaryForm from "./forms/SummaryForm";
import WorkExperienceForm from "./forms/WorkExperienceForm";
import TemplateSelector from "./TemplateSelector";

export const steps: {
  title: string;
  component: React.ComponentType<EditorFormProps>;
  key: string;
}[] = [
  { title: "General info", component: GeneralInfoForm, key: "general-info" },
  { title: "Personal info", component: PersonalInfoForm, key: "personal-info" },
  {
    title: "Work experience",
    component: WorkExperienceForm,
    key: "work-experience",
  },
  { title: "Education", component: EducationForm, key: "education" },
  { title: "Skills", component: SkillsForm, key: "skills" },
  { title: "Languages", component: LanguagesForm, key: "languages" },
  { title: "Hobbies", component: HobbiesForm, key: "hobbies" },
  { title: "References", component: ReferencesForm, key: "references" },
  {
    title: "Summary",
    component: SummaryForm,
    key: "summary",
  },
  { title: "Template", component: TemplateSelector, key: "template" },
];
