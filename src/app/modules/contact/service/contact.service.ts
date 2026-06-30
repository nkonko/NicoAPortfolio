import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { Contact } from '../state/models/contact';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private serviceId = environment.emailJs.serviceId;
  private templateId = environment.emailJs.templateId;
  private publicKey = environment.emailJs.publicKey;

  constructor() { }

  sendEmail(contact: Contact): Observable<EmailJSResponseStatus> {

    const templateParams = {
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      message: contact.message
    };

    return from(emailjs.send(this.serviceId, this.templateId, templateParams, this.publicKey));
  }

}
