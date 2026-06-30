import { Skill } from "@core/models/gitConnectProfile/skill";

export interface SkillState {
  tab?: string,
  skills: Skill[],
}
