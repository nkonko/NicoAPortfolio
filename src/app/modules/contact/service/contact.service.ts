import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../state/models/contact';
import { Observable } from 'rxjs';
import { AppSettings } from 'appsettings-json-reader';
import { PortfolioSettings } from '@core/models/appSettings/portfolioSettings';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  appSettings: PortfolioSettings = AppSettings.readAppSettings();
  constructor(private http: HttpClient) { }

  submit(form: Contact): Observable<Contact> {
    return this.http.get<Contact>(this.appSettings.api.profileApi);
  }
}
