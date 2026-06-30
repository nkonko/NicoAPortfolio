import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReposRoutingModule } from './repos-routing.module';
import { ReposComponent } from './components/repos/repos.component';

@NgModule({
    imports: [
        CommonModule,
        ReposRoutingModule,
        ReposComponent
    ]
})
export class ReposModule { }
