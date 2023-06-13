import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, concatMap, filter, map, switchMap, tap } from 'rxjs';
import { AppState } from 'app/core/store/models/app.state';
import { ProfileState } from 'app/core/store/models/profile.state';
import { AppSelector } from 'app/core/store/selectors/app.selector';
import * as appActions from '@core/store/actions/app.action';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  private profileRes$: Observable<ProfileState> = this.store.select(AppSelector);
  protected summary$!: Observable<string>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(appActions.AppInit());

    this.summary$ = this.profileRes$.pipe(
      filter(res => res.profile != null),
      map(res => {
        const rawSummary = res.profile!.basics.summary

        let dotArray = rawSummary.split('.\n');
        let newArray: string[] = [];

        for (let index = 0; index < dotArray.length; index++) {
          let element = dotArray[index];

          element = element.replace(/\n/, "<b>\n");
          element = element.replace(/:\n/, ":</b>\n");
          newArray.push(`${element}.`)
        }

        return newArray.join('<br><br>')
      })
    );
  }

}
