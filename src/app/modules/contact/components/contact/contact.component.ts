import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ContactState } from '../../state/models/contact.state';
import * as contactActions from '../../state/actions/contact.action';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  protected contactForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private contactStore: Store<ContactState>) {
  }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(70), Validators.minLength(3)]],
      phone: ['', [Validators.minLength(3), Validators.maxLength(20)]],
      message: ['', [Validators.minLength(8)]]
    })
  }

  onSubmit() {
    this.contactStore.dispatch(contactActions.SubmitContactDetails({
      contact: {
        name: this.contactForm.get('name')?.value,
        email: this.contactForm.get('email')?.value,
        phone: this.contactForm.get('phone')?.value,
        message: this.contactForm.get('message')?.value,
      }
    }))
  }
}
