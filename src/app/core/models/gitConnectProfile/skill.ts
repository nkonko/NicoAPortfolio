import { Level } from "./level";

export interface Skill {
  name: string;
  level: Level;
  yearsOfExperience: number | null;
  icon: string;
  keywords: string[];
}
