import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as contactActions from '../../state/actions/contact.action';
import { ContactFormState } from '../../state/models/contactForm.state';
import { Observable } from 'rxjs';
import { ContactSelector } from '@modules/contact/state/selectors/contact.selector';
import { StateEvents } from '@core/models/state.events';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, OnDestroy {
  protected contactForm!: FormGroup;
  protected animatePhone: boolean = false;
  protected animateEnvelope: boolean = false;
  private emailRegex: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  private contact$: Observable<ContactFormState | undefined> = this.contactStore.select(ContactSelector);

  constructor(
    private fb: FormBuilder,
    private contactStore: Store<ContactFormState>,
    private toastr: ToastrService) {
  }

  ngOnDestroy(): void {
    this.contactForm.reset();
  }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern(this.emailRegex), Validators.maxLength(70), Validators.minLength(3)]],
      phone: ['', [Validators.minLength(3), Validators.maxLength(20)]],
      message: ['', [Validators.minLength(8)]]
    });

    this.contact$.subscribe(form => {

      if (form?.event === StateEvents.Created) {

        this.toastr.success("", "Message sent", {
          closeButton: true,
          progressBar: true,
          timeOut: 2500,
          positionClass: "toast-bottom-center",
        });
      }

      if(form?.event === StateEvents.Failed) {
        this.toastr.error("There was an Error", "Error", {
          closeButton: true,
          progressBar: true,
          timeOut: 2500,
          positionClass: "toast-bottom-center",
        })
      }
    });

  }

  onSubmit() {
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
