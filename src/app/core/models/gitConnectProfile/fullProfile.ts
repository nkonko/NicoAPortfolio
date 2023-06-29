import { Basics } from "./base";
import { Education } from "./education";
import { Language } from "./languaje";
import { Publication } from "./publication";
import { Skill } from "./skill";
import { Work } from "./work";
import { Project } from "./project";

export interface FullProfile {
  basics:       Basics;
  skills:       Skill[];
  projects:     Project[];
  work:         Work[];
  publications: Publication[];
  education:    Education[];
  languages:    Language[];
}
