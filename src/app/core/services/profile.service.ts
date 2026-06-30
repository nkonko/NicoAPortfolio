import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { FullProfile } from '../models/gitConnectProfile/fullProfile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private http = inject(HttpClient);

  getProfile(): Observable<FullProfile> {
    return this.http.get<FullProfile>(environment.api.profileApi);
  }
}
