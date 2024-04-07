import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { initApp } from './app/app.module';
import { AppComponent } from './app/app.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ContactEffects } from '@modules/contact/state/effects/contact.effect';
import { AppEffects } from './app/core/store/effects/app.effect';
import { EffectsModule } from '@ngrx/effects';
import { ROOT_REDUCERS } from './app/core/store/models/app.state';
import { StoreModule } from '@ngrx/store';
import { ToastrModule } from 'ngx-toastr';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { ContactModule } from '@modules/contact/contact.module';
import { AppRoutingModule } from './app/app-routing.module';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { BootstrapService } from './app/core/services/bootstrap.service';
import { APP_INITIALIZER, isDevMode, importProvidersFrom } from '@angular/core';


bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, AppRoutingModule, ContactModule, ToastrModule.forRoot(), StoreModule.forRoot(ROOT_REDUCERS), EffectsModule.forRoot([AppEffects, ContactEffects]), StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode(), connectInZone: true })),
        {
            provide: APP_INITIALIZER,
            useFactory: initApp,
            deps: [BootstrapService],
            multi: true,
        },
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi())
    ]
})
  .catch(err => console.error(err));
