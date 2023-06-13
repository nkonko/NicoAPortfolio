import { createSelector } from '@ngrx/store';
import { AppState } from '../models/app.state';

export const selectApp = (state: AppState) => state.app;

export const AppSelector = createSelector(
selectApp,
state => state);

export const selectSkills = (state: AppState) => state.app.profile;

export const SkillSelector = createSelector(
  selectSkills,
  state => state?.skills);

  export const selectSummary = (state: AppState) => state.app.profile?.basics;

export const SummarySelector = createSelector(
  selectSummary,
  state => state?.summary);
