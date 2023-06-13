import { ActionReducerMap } from "@ngrx/store"
import {appReducer} from '../reducers/app.reducer';
import { ProfileState } from "./profile.state";

export interface AppState {
  app : ProfileState
}

export const ROOT_REDUCERS : ActionReducerMap<AppState> = {
  app: appReducer
}
