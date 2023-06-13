import { Profile } from "./profile";

export interface Basics {
  name:              string;
  label:             string;
  email:             string;
  url:               null;
  summary:           string;
  profiles:          Profile[];
  headline:          string;
  yearsOfExperience: number;
  region:            string;
  id:                string;
  picture:           string;
}
