import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { StateEvents } from '@core/models/state.events';
import { AppState } from '@core/store/models/app.state';
import { EventSelector } from '@core/store/selectors/app.selector';
import { ContactComponent } from '@modules/contact/components/contact/contact.component';
import { Store } from '@ngrx/store';
import { FooterComponent } from '@shared/layout/footer/component/footer/footer.component';
import { NavbarComponent } from '@shared/layout/navbar/component/navbar/navbar.component';
import { ModalComponent } from '@shared/modal/component/modal.component';
import { ModalContentService } from '@shared/modal/service/modal-content.service';
import { SplashComponent } from '@shared/splash/component/splash.component';
import { Observable, Subject, filter, takeUntil } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [RouterOutlet, SplashComponent, NavbarComponent, FooterComponent, ModalComponent]
})
export class AppComponent implements OnInit {
  private stateEvent$: Observable<StateEvents | undefined> = this.store.select(EventSelector);
  private unsubscribe$ = new Subject<void>();
  protected loading: boolean = true;
  protected modalActive: boolean = false;
  protected hideComponents: boolean = true;

  constructor(private store: Store<AppState>, private modalContentService: ModalContentService, private router: Router) { }
  ngOnInit(): void {
    this.stateEvent$.pipe(takeUntil(this.unsubscribe$)).subscribe(event => {
      if (event !== StateEvents.Loading) {
        this.loading = false;
      }
    });

    this.router.events
    .pipe(
      filter(event => event instanceof NavigationEnd)
      )
      .subscribe((event: any) => {
        this.hideComponents = (event.url === '/experience' || event.url === '/skills') ? false : true;
      });
  }

  toggleActivation() {
    this.modalContentService.push(ContactComponent);
    this.modalActive = !this.modalActive;

    if (!this.modalActive) {
      this.modalContentService.pop();
    }
  }

}
