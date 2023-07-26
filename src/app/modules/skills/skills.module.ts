import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkillsRoutingModule } from './skills-routing.module';
import { SkillsComponent } from './components/skills/skills.component';
import { SharedModule } from '@shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { skillReducer } from './state/reducers/skills.reducer';
import { SkillEffects } from './state/effects/skills.effect';


@NgModule({
  declarations: [
    SkillsComponent,
  ],
  imports: [
    CommonModule,
    SkillsRoutingModule,
    SharedModule,
    StoreModule.forFeature('skillTabs', skillReducer),
    EffectsModule.forFeature([SkillEffects])
  ]
})
export class SkillsModule { }
