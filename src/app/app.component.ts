import { Component, OnInit } from '@angular/core';
import { AppState } from '@core/store/models/app.state';
import { Store } from '@ngrx/store';
import * as appActions from '@core/store/actions/app.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'NicoAPortfolio';

  constructor(private store:  Store<AppState>) {

  }
  ngOnInit(): void {
    this.store.dispatch(appActions.AppInit());
  }
}
