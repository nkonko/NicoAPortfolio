import { Component, OnInit } from '@angular/core';
import { StateEvents } from '@core/models/state.events';
import { AppState } from '@core/store/models/app.state';
import { EventSelector } from '@core/store/selectors/app.selector';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  protected loading: boolean = true;
  private stateEvent$: Observable<StateEvents | undefined> = this.store.select(EventSelector);
  private unsubscribe$ = new Subject<void>();
  protected modalActive: boolean = false;

  constructor(private store: Store<AppState>) { }
  ngOnInit(): void {
    this.stateEvent$.pipe(takeUntil(this.unsubscribe$)).subscribe(event => {
      if (event !== StateEvents.Loading) {
        this.loading = false;
      }
    });
  }

  toggleActivation() {
    this.modalActive = !this.modalActive;
  }

}
