import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { SkillsComponent } from './components/skills/skills.component';
import { SkillEffects } from './state/effects/skills.effect';
import { skillReducer } from './state/reducers/skills.reducer';

export const SKILLS_ROUTES: Routes = [
  {
    path: '',
    component: SkillsComponent,
    providers: [
      provideState('skillTabs', skillReducer),
      provideEffects([SkillEffects])
    ]
  }
];