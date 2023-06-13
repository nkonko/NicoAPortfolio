import { createAction, props } from '@ngrx/store';
import { FullProfile } from '../../models/gitConnectProfile/fullProfile';
import { ApiError } from '../../models/apiError';

export const AppInit = createAction(
  '[App Component] APP Init'
  );

export const ProfileLoadedSucessfull = createAction(
  '[App Component] Load profile sucessfull', props<{profile: FullProfile}>()
  );

export const UserProfileChangedFailure = createAction(
  '[App Component] Profile load failed', props<{error: ApiError}>())



