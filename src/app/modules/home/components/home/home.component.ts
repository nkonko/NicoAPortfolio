import { Component, OnDestroy, OnInit } from '@angular/core';
import { Basics } from '@core/models/gitConnectProfile/base';
import { AppState } from '@core/store/models/app.state';
import { BasicsSelector } from '@core/store/selectors/app.selector';
import { Store } from '@ngrx/store';
import { Observable, Subject, map, shareReplay, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  private basics$: Observable<Basics | undefined> = this.store.select(BasicsSelector);
  protected name!: string;
  protected jobTitle!: string;
  protected location!: string;

  constructor(private store: Store<AppState>) {  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {

    this.basics$.pipe(takeUntil(this.unsubscribe$), map(basics => {
      this.name = basics?.name!;
      const jtitle = `I'm a ${basics?.label!.replace('(', '<b>(').replace(')', ')</b>')}`;
      this.jobTitle = jtitle;
      this.location = basics?.region!;
    })).subscribe();
  }
}
