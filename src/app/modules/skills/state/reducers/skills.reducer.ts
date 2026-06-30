import { createReducer, on } from '@ngrx/store';
import { SkillState } from '../models/skills.state';
import * as skillActions from '../actions/skills.action';

export const initialState: SkillState = {
  tab: undefined,
  skills: []
};

export const skillReducer = createReducer(initialState,

  on(skillActions.ChangeTab, (state, { tab }) => {
    return { ...state, tab }
  }),
  on(skillActions.ChangeTabSucessfull, (state, { skills }) => {
    return { ...state, skills }
  }),

);
