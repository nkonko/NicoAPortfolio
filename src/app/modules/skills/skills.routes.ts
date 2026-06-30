import { importProvidersFrom } from '@angular/core';
import { Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SkillsComponent } from './components/skills/skills.component';
import { SkillEffects } from './state/effects/skills.effect';
import { skillReducer } from './state/reducers/skills.reducer';

export const SKILLS_ROUTES: Routes = [
  {
    path: '',
    component: SkillsComponent,
    providers: [
      importProvidersFrom(
        StoreModule.forFeature('skillTabs', skillReducer),
        EffectsModule.forFeature([SkillEffects])
      )
    ]
  }
];