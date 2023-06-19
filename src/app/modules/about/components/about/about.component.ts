import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, filter, map, takeUntil } from 'rxjs';
import { AppState } from 'app/core/store/models/app.state';
import { ProfileState } from 'app/core/store/models/profile.state';
import { AppSelector } from 'app/core/store/selectors/app.selector';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, OnDestroy {
  private unsubscribe = new Subject<void>();
  private profileRes$: Observable<ProfileState> = this.store.select(AppSelector);
  protected summary!: string;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.profileRes$.pipe(
      takeUntil(this.unsubscribe),
      filter(res => res.profile != null),
      map(res => {
        const rawSummary = res.profile!.basics.summary;

        let dotArray = rawSummary.split('.\n');
        let newArray: string[] = [];

        for (let index = 0; index < dotArray.length; index++) {
          let element = dotArray[index];

          element = element.replace(/\n/, "<b>\n");
          element = element.replace(/:\n/, ":</b>\n");
          newArray.push(`${element}.`);
        }

        return newArray.join('<br><br>');
      })
    ).subscribe(sum => {
      this.summary = sum;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
