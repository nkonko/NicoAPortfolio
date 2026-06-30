import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../store/models/app.state';
import * as appActions from '../store/actions/app.action';

@Injectable({
  providedIn: 'root'
})
export class BootstrapService {
  private store = inject(Store<AppState>);

  initialize(): void {
    this.store.dispatch(appActions.AppInit());
  }

}
