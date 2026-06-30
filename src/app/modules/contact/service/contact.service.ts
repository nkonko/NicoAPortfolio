import { Injectable } from '@angular/core';
import appSettingsJson from '../../../../../appsettings.json';
import { PortfolioSettings } from '@core/models/appSettings/portfolioSettings';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { Contact } from '../state/models/contact';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  appSettings: PortfolioSettings = appSettingsJson as PortfolioSettings;
  private serviceId = this.appSettings.emailJs.serviceId;
  private templateId = this.appSettings.emailJs.templateId;
  private publicKey = this.appSettings.emailJs.publicKey;

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
