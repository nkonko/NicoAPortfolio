import { createAction, props } from '@ngrx/store';
import { ApiError } from '@core/models/apiError';
import { Contact } from '../models/contact';

export const SubmitContactDetails = createAction(
  '[Contact Component] Submit contact details',
  props<{contact: Contact}>());

export const SubmitContactDetailsSuccess = createAction(
  '[Contact Component] Submit contact details success');

export const SubmitContactDetailsFailure = createAction(
  '[Contact Component] Submit contact details failed', props<{error: ApiError}>());

  export const ResetEvents = createAction('[Contact Component] Reset events')
