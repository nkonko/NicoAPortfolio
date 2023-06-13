
import { createReducer, on } from '@ngrx/store';
import * as contactAction from '../actions/contact.action';
import { ContactForm } from '../models/contactForm';


export const initialState: ContactForm = {
  form:undefined
}

export const contactReducer = createReducer(initialState,

  on(contactAction.SubmitContactDetails, (state, action) => ({
    ...state,
    form: action.contact
  })),
  on(contactAction.SubmitContactDetailsSuccess, (state, action) => ({ ...state, ...action })),
  on(contactAction.SubmitContactDetailsFailure, (state, action) => ({ ...state, error: action.error })),

);

