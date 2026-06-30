import { Component, ChangeDetectionStrategy, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { AppState } from '@core/store/models/app.state';
import * as appActions from '@core/store/actions/app.action';
import { AppSelector } from '@core/store/selectors/app.selector';
import { ContactComponent } from '@modules/contact/components/contact/contact.component';
import { Store } from '@ngrx/store';
import { FooterComponent } from '@shared/layout/footer/component/footer/footer.component';
import { NavbarComponent } from '@shared/layout/navbar/component/navbar/navbar.component';
import { ModalComponent } from '@shared/modal/component/modal.component';
import { ModalContentService } from '@shared/modal/service/modal-content.service';
import { SplashComponent } from '@shared/splash/component/splash.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterOutlet, SplashComponent, NavbarComponent, FooterComponent, ModalComponent]
})
export class AppComponent {
  private appState = toSignal(this.store.select(AppSelector));

  protected loading = computed(() => {
    const state = this.appState();
    return state?.profile === undefined && state?.loadError === undefined;
  });

  protected hasError = computed(() => this.appState()?.loadError !== undefined);

  protected loadError = computed(() => this.appState()?.loadError);

  protected modalActive: boolean = false;
  protected hideComponents: boolean = true;

  constructor(
    private store: Store<AppState>,
    private modalContentService: ModalContentService,
  ) {}

  retry(): void {
    this.store.dispatch(appActions.AppInit());
  }

  toggleActivation(): void {
    this.modalContentService.push(ContactComponent);
    this.modalActive = !this.modalActive;

    if (!this.modalActive) {
      this.modalContentService.pop();
    }
  }
}
