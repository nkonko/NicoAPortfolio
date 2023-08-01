import { ActionReducerMap } from "@ngrx/store"
import {appReducer} from '../reducers/app.reducer';
import { ProfileState } from "./profile.state";
import { ContactReducer } from "@modules/contact/state/reducers/contact.reducer";
import { ContactFormState } from "@modules/contact/state/models/contactForm.state";

export interface AppState {
  app : ProfileState,
  contact: ContactFormState
}

export const ROOT_REDUCERS : ActionReducerMap<AppState> = {
  app: appReducer,
  contact: ContactReducer
}
