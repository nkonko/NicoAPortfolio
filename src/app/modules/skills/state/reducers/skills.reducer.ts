import { createReducer, on } from '@ngrx/store';
import { SkillState } from '../models/skills.state';
import * as skillActions from '../actions/skills.action';
import { StateEvents } from '@core/models/state.events';

export const initialState: SkillState = {
  tab: undefined,
  skills: []
};

export const skillReducer = createReducer(initialState,

  on(skillActions.ChangeTab, (state, { tab }) => {
    return { ...state, tab: tab, event : StateEvents.Updating }
  }),
  on(skillActions.ChangeTabSucessfull, (state, { skills }) => {
    return { ...state, skills: skills, event: StateEvents.Updated }}),

);
