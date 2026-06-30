import { initApp } from './app/app.module';
import { AppComponent } from './app/app.component';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { ContactEffects } from '@modules/contact/state/effects/contact.effect';
import { AppEffects } from './app/core/store/effects/app.effect';
import { provideEffects } from '@ngrx/effects';
import { ROOT_REDUCERS } from './app/core/store/models/app.state';
import { provideStore } from '@ngrx/store';
import { provideToastr } from 'ngx-toastr';
import { withInterceptorsFromDi, provideHttpClient, withXhr } from '@angular/common/http';
import { APP_ROUTES } from './app/app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { bootstrapApplication } from '@angular/platform-browser';
import { BootstrapService } from './app/core/services/bootstrap.service';
import { isDevMode, inject, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';


bootstrapApplication(AppComponent, {
    providers: [
        provideZoneChangeDetection(),
        provideRouter(APP_ROUTES),
        provideStore(ROOT_REDUCERS),
        provideEffects([AppEffects, ContactEffects]),
        provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode(), connectInZone: true }),
        provideToastr(),
        provideAppInitializer(() => {
        const initializerFn = (initApp)(inject(BootstrapService));
        return initializerFn();
      }),
        provideAnimations(),
        provideHttpClient(withXhr(), withInterceptorsFromDi())
    ]
})
  .catch(err => console.error(err));
