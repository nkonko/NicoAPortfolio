import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ContactFormState } from '../models/contactForm.state';

export const featureKey = 'contact';

export const selectFeature = createFeatureSelector<ContactFormState>(featureKey);

export const ContactSelector = createSelector(
  selectFeature,
  (state: ContactFormState) => state
);
