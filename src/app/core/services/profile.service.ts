import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AppSettings } from 'appsettings-json-reader';
import { FullProfile } from '../models/gitConnectProfile/fullProfile';
import { PortfolioSettings } from '../models/appSettings/portfolioSettings';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  appSettings: PortfolioSettings = AppSettings.readAppSettings();

  constructor(private http: HttpClient) { }

  getProfile(): Observable<FullProfile> {
    return this.http.get<FullProfile>(this.appSettings.api.profileApi);
  }
}
