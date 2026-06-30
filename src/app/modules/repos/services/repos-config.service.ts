import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ReposConfig } from '../models/repos-config.model';

@Injectable({
  providedIn: 'root'
})
export class ReposConfigService {

  constructor(private http: HttpClient) { }

  getReposConfig(): Observable<ReposConfig | null> {
    return this.http.get<ReposConfig>('assets/json/reposConfig.json').pipe(
      catchError(() => of(null))
    );
  }

  getEnabledNames(config: ReposConfig | null): Set<string> {
    if (!config?.repos?.length) {
      return new Set<string>();
    }
    return new Set<string>(
      config.repos.filter(r => r.enabled).map(r => r.name)
    );
  }
}
