import { Injectable, inject } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { ES_CONTENT_OVERRIDES } from './es-content-overrides';

export interface ContentOverrides {
  [fieldPath: string]: string;
}

@Injectable({ providedIn: 'root' })
export class ContentTranslationService {
  private transloco = inject(TranslocoService);

  get activeLang(): string {
    return this.transloco.getActiveLang();
  }

  get langChanges$() {
    return this.transloco.langChanges$;
  }

  /** Get Spanish content override for a field path, or null if not in Spanish mode */
  get(fieldPath: string, fallback: string): string {
    if (this.activeLang !== 'es') return fallback;
    return ES_CONTENT_OVERRIDES[fieldPath] ?? fallback;
  }

  /** Check if current language is Spanish */
  get isSpanish(): boolean {
    return this.activeLang === 'es';
  }
}
