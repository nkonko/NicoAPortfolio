import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './components/contact/contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { contactReducer } from './state/reducers/contact.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ContactEffects } from './state/effects/contact.effect';
import { SocialModule } from '@modules/social/social.module';


@NgModule({
  declarations: [
    ContactComponent
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    ReactiveFormsModule,
    SocialModule,
    StoreModule.forFeature('contact', contactReducer),
    EffectsModule.forFeature([ContactEffects])
  ]
})
export class ContactModule { }
