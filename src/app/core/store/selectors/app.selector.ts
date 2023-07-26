import { createSelector } from '@ngrx/store';
import { AppState } from '../models/app.state';

export const selectApp = (state: AppState) => state.app;

export const AppSelector = createSelector(
  selectApp,
  state => state);

  export const EventSelector = createSelector(
    selectApp,
    state => state.event);

export const selectSkills = (state: AppState) => state.app.profile;

export const SkillSelector = createSelector(
  selectSkills,
  state => state!.skills);

export const selectSummary = (state: AppState) => state.app.profile?.basics;

export const SummarySelector = createSelector(
  selectSummary,
  state => state?.summary);

export const selectBasics = (state: AppState) => state.app.profile?.basics;

export const BasicsSelector = createSelector(
  selectBasics,
  state => state);

export const selectWork = (state: AppState) => state.app.profile;

export const WorkSelector = createSelector(
  selectWork,
  state => state?.work);

  export const selectSocials = (state: AppState) => state.app.profile?.basics;

export const SocialsSelector = createSelector(
  selectSocials,
  state => state?.profiles);
