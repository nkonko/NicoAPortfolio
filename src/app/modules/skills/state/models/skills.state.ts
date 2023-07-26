import { Skill } from "@core/models/gitConnectProfile/skill";
import { StateEvents } from "@core/models/state.events";

export interface SkillState {
  tab?: string,
  skills: Skill[],
  event?: StateEvents
}
