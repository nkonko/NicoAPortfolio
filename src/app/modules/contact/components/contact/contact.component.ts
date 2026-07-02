import { Component, OnDestroy, OnInit, ChangeDetectionStrategy, inject, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TranslocoModule } from '@jsverse/transloco';
import * as contactActions from '../../state/actions/contact.action';
import { ContactFormState } from '../../state/models/contactForm.state';
import { ContactSelector } from '@modules/contact/state/selectors/contact.selector';
import { StateEvents } from '@core/models/state.events';
import { ToastrService } from 'ngx-toastr';
import { ModalContentService } from '@shared/modal/service/modal-content.service';
import { TranslocoService } from '@jsverse/transloco';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ReactiveFormsModule, TranslocoModule]
})
export class ContactComponent implements OnInit, OnDestroy {
  protected contactForm!: FormGroup;
  protected animatePhone: boolean = false;
  protected animateEnvelope: boolean = false;
  private emailRegex: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  private fb = inject(FormBuilder);
  private contactStore = inject(Store<ContactFormState>);
  private toastr = inject(ToastrService);
  private transloco = inject(TranslocoService);
  private modalContentService = inject(ModalContentService);
  private contactState = toSignal(this.contactStore.select(ContactSelector));

  constructor() {
    effect(() => {
      const form = this.contactState();
      if (!form?.event) return;

      if (form.event === StateEvents.Created) {
        this.toastr.success(
          this.transloco.translate('contact.toast.successMessage'),
          this.transloco.translate('contact.toast.successTitle'),
          {
            closeButton: true,
            progressBar: true,
            timeOut: 2500,
            positionClass: 'toast-bottom-center',
          }
        );
        this.contactForm?.reset();
        this.modalContentService.toggleVisibility();
        this.contactStore.dispatch(contactActions.ResetEvents());
      }

      if (form.event === StateEvents.Failed) {
        const status = form.error?.status;
        const message = status
          ? this.transloco.translate('contact.toast.serverErrorMessage', { status })
          : this.transloco.translate('contact.toast.connectionErrorMessage');
        this.toastr.error(message, this.transloco.translate('contact.toast.errorTitle'), {
          closeButton: true,
          progressBar: true,
          timeOut: 3500,
          positionClass: 'toast-bottom-center',
        });
        this.modalContentService.toggleVisibility();
        this.contactStore.dispatch(contactActions.ResetEvents());
      }
    });
  }

  ngOnDestroy(): void {
    this.contactForm?.reset();
  }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern(this.emailRegex), Validators.maxLength(70), Validators.minLength(3)]],
      phone: ['', [Validators.minLength(3), Validators.maxLength(20)]],
      message: ['', [Validators.minLength(8)]]
    });
  }

  onSubmit(): void {
    this.contactStore.dispatch(contactActions.SubmitContactDetails({
      contact: {
        name: this.contactForm.get('name')?.value,
        email: this.contactForm.get('email')?.value,
        phone: this.contactForm.get('phone')?.value,
        message: this.contactForm.get('message')?.value,
      }
    }));
  }
}
