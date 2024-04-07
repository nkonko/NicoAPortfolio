import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExperienceRoutingModule } from './experience-routing.module';
import { ExperienceComponent } from './components/experience/experience.component';


@NgModule({
    imports: [
        CommonModule,
        ExperienceRoutingModule,
        ExperienceComponent
    ]
})
export class ExperienceModule { }
