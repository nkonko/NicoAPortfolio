import { createReducer, on } from '@ngrx/store';

import * as appActions from '../actions/app.action'
import { ProfileState } from '../models/profile.state';

export const initialState: Readonly<ProfileState> = {
   profile: undefined,
   loadError: undefined,
};

export const appReducer = createReducer(initialState,

    on(appActions.AppInit, (state) => {
      return { ...state };
    }),

    on(appActions.ProfileLoadedSucessfull, (state, action) => {
      return {
        ...state,
        profile: action.profile,
        loadError: undefined,
      }
    }),

    on(appActions.UserProfileChangedFailure, (state, action) => {
      return {
        ...state,
        loadError: action.error,
      }
    })

);
