import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './components/about/about.component';



@NgModule({
    imports: [
    CommonModule,
    AboutRoutingModule,
    AboutComponent
]
})
export class AboutModule { }
