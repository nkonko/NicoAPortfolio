import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ReposConfig } from '../models/repos-config.model';

@Injectable({
  providedIn: 'root'
})
export class ReposConfigService {
  private http = inject(HttpClient);

  getReposConfig(): Observable<ReposConfig | null> {
    return this.http.get<ReposConfig>('assets/json/reposConfig.json').pipe(
      catchError((err) => {
        console.error('[ReposConfigService] Failed to load repos config:', err);
        return of(null);
      })
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
