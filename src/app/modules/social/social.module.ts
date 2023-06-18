import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocialRoutingModule } from './social-routing.module';
import { SocialComponent } from './components/social/social.component';


@NgModule({
  declarations: [
    SocialComponent
  ],
  imports: [
    CommonModule,
    SocialRoutingModule
  ],
  exports: [
    SocialComponent
  ]
})
export class SocialModule { }
