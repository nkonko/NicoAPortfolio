import { FullReleaseDateClass } from "./fullreleasedateclass";

export interface Project {
  name:            string;
  description:     string;
  url:             string;
  highlights:      any[];
  keywords:        any[];
  roles:           any[];
  startDate:       string;
  endDate:         string;
  entity:          string;
  type:            string;
  displayName:     string;
  website:         string;
  summary:         string;
  primaryLanguage: string;
  languages:       string[];
  libraries:       any[];
  githubUrl:       string;
  repositoryUrl:   string;
  start:           FullReleaseDateClass;
  end:             FullReleaseDateClass;
  images:          any[];
  videos:          any[];
}
