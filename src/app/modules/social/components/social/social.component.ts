import { Component, OnDestroy, OnInit } from '@angular/core';
import { Profile } from '@core/models/gitConnectProfile/profile';
import { AppState } from '@core/store/models/app.state';
import { SocialsSelector } from '@core/store/selectors/app.selector';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss']
})
export class SocialComponent implements OnInit, OnDestroy {
  private socials$: Observable<Profile[] | undefined> = this.store.select(SocialsSelector);
  private unsubscribe = new Subject<void>();

  constructor(private store: Store<AppState>) { }
  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  ngOnInit(): void {
    this.socials$.pipe(takeUntil(this.unsubscribe)).subscribe(socials => {
      console.log(socials);

    });
  }

}
