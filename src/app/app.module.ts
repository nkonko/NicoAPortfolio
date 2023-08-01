import { NgModule, APP_INITIALIZER, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { BootstrapService } from './core/services/bootstrap.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ROOT_REDUCERS } from './core/store/models/app.state';
import { AppEffects } from './core/store/effects/app.effect';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ContactEffects } from '@modules/contact/state/effects/contact.effect';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

export function initApp(appService: BootstrapService): () => void {
  return () => appService.initialize();
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    StoreModule.forRoot(ROOT_REDUCERS),
    EffectsModule.forRoot([AppEffects, ContactEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      deps: [BootstrapService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
