import { createReducer, on } from '@ngrx/store';
import * as contactAction from '../actions/contact.action';
import { ContactFormState } from '../models/contactForm.state';
import { StateEvents } from '@core/models/state.events';


export const initialState: ContactFormState = {
  form: undefined,
  event: undefined
};

export const ContactReducer = createReducer(initialState,

  on(contactAction.SubmitContactDetails, (state, action) => ({
    ...state,
    form: action.contact,
    event: StateEvents.Updating
  })),
  on(contactAction.SubmitContactDetailsSuccess, (state, action) => ({
    ...state, ...action, event: StateEvents.Updated
  })),
  on(contactAction.SubmitContactDetailsFailure, (state, action) => ({
    ...state,
    error: action.error, event: StateEvents.Failed
  })),

);

