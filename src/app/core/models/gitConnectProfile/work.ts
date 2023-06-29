import { EducationEnd } from "./educationEnd";

export interface Work {
  id:            string;
  name:          string;
  location:      string;
  description:   string;
  position:      string;
  url:           string;
  startDate:     Date;
  endDate:       string;
  summary:       string;
  highlights:    any[];
  isCurrentRole: boolean;
  start:         EducationEnd;
  end:           EducationEnd;
  company:       string;
  website:       string;
}
