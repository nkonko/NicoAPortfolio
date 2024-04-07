import { Component } from '@angular/core';
import { Profile } from '@core/models/gitConnectProfile/profile';
import { AppState } from '@core/store/models/app.state';
import { SocialsSelector } from '@core/store/selectors/app.selector';
import { Store } from '@ngrx/store';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    standalone: true,
    imports: [AsyncPipe]
})
export class FooterComponent {
  private unsubscribe = new Subject<void>();
  protected profiles: Profile[] = [];

  protected socials$: Observable<Profile[] | undefined> = this.store.select(SocialsSelector).pipe(
    takeUntil(this.unsubscribe),
    map(socials => {
      if (socials) {
        return socials.map(social => {
          switch (social?.network) {
            case 'LinkedIn':
              return { ...social, icon: 'fa-brands fa-linkedin' };
            case 'GitHub':
              return { ...social, icon: 'fa-brands fa-github' };
            case 'gitconnected':
              return { ...social, icon: 'fa-solid fa-infinity' };
            default:
              return social;
          }
        });
      }
      return socials;
    }));

  constructor(private store: Store<AppState>) { }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  ngOnInit(): void {
  }

  goToLink(url: string) {
    window.open(url, "_blank");
  }

}
