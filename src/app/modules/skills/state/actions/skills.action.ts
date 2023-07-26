import { Skill } from '@core/models/gitConnectProfile/skill';
import { createAction, props } from '@ngrx/store';

export const ChangeTab = createAction('[Tab Component] Change tab', props<{tab: string}>());

export const ChangeTabSucessfull = createAction('[Tab Component] Change tab sucessfull', props<{skills: Skill[]}>());


