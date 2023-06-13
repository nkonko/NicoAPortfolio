import { createReducer, on } from '@ngrx/store';

import * as appActions from '../actions/app.action'
import { ProfileState } from '../models/profile.state';
import { StateEvents } from '@core/models/state.events';

export const initialState: Readonly<ProfileState> = {
   profile: undefined,
   loadError: undefined,
   event: undefined
};

export const appReducer = createReducer(initialState,

    on(appActions.AppInit, (state, action) => {
      return {
        ...state,
        ...action,
        event: StateEvents.Loading
      }
    }),

    on(appActions.ProfileLoadedSucessfull, (state, action) => {
      return {
        ...state,
        profile: action.profile,
        event: StateEvents.Loaded
      }
    }),

    on(appActions.UserProfileChangedFailure, (state, action) => {
      return {
        ...state,
        loadError: action.error,
        event: StateEvents.Failed
      }
    })

);
