import { EducationEnd } from "./educationEnd";

export interface Education {
  institution: string;
  url:         string;
  area:        string;
  studyType:   string;
  startDate:   Date;
  endDate:     Date;
  score:       string;
  courses:     string[];
  description: string;
  activities:  string;
  start:       EducationEnd;
  end:         EducationEnd;
  website:     string;
}
