import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkillsRoutingModule } from './skills-routing.module';
import { SkillsComponent } from './components/skills/skills.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { skillReducer } from './state/reducers/skills.reducer';
import { SkillEffects } from './state/effects/skills.effect';


@NgModule({
    imports: [
    CommonModule,
    SkillsRoutingModule,
    StoreModule.forFeature('skillTabs', skillReducer),
    EffectsModule.forFeature([SkillEffects]),
    SkillsComponent
]
})
export class SkillsModule { }
