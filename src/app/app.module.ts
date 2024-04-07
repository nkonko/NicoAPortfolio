import { NgModule, APP_INITIALIZER, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BootstrapService } from './core/services/bootstrap.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ROOT_REDUCERS } from './core/store/models/app.state';
import { AppEffects } from './core/store/effects/app.effect';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ContactEffects } from '@modules/contact/state/effects/contact.effect';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { ContactModule } from '@modules/contact/contact.module';

export function initApp(appService: BootstrapService): () => void {
  return () => appService.initialize();
}


