import { createSelector, createFeatureSelector } from '@ngrx/store';
import { SkillState } from '../models/skills.state';

export const featureKey = 'skillTabs';

export const selectFeature = createFeatureSelector<SkillState>(featureKey);

export const SkillByTabSelector = createSelector(
  selectFeature,
  (state: SkillState) => state
);
