import { Component, OnDestroy, OnInit } from '@angular/core';
import { Work } from '@core/models/gitConnectProfile/work';
import { AppState } from '@core/store/models/app.state';
import { WorkSelector } from '@core/store/selectors/app.selector';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit, OnDestroy {

  protected positions: string[] = [];
  protected work$: Observable<Work[] | undefined> = this.store.select(WorkSelector);
  private unsubscribe = new Subject<void>();

  constructor(private store: Store<AppState>) { }
  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  ngOnInit(): void {
    this.work$.pipe(takeUntil(this.unsubscribe)).subscribe(works => {
      works?.forEach(work => {
        this.positions.push(work.position)
      })
    });
  }

}
