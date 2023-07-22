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
  protected summaries!: string[];
  protected presentation!: string;
  protected paragraphs: { title: string, paragraph: string }[] = []

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.profileRes$.pipe(
      takeUntil(this.unsubscribe),
      filter(res => res.profile != null),
      map(res => {
        const rawSummary = res.profile!.basics.summary;

        let dotArray = rawSummary.split('.\n');

        this.presentation = dotArray[0];

        for (let element of dotArray) {
          // Check if the element contains the title format (e.g., <b>...</b>)
          if (element.includes(':') && element.startsWith('\n')) {
            let algo = element.split(/:\n/);
            this.paragraphs.push({ title: algo.at(0)!.replace('\n', ''), paragraph: algo.at(1)!});
          }
        }




      })
    ).subscribe();
    // sum => {
    //   this.summaries = sum;
    // });

  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
