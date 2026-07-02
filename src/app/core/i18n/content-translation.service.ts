import { Injectable, inject } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

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

/** Spanish content overrides for profile data — customize these with your own translations */
export const ES_CONTENT_OVERRIDES: Record<string, string> = {
  'about.presentation': 'Soy un desarrollador full-stack comprometido, actualmente trabajando en una empresa de EE.UU. Con una gran pasión por la tecnología, busco constantemente oportunidades para expandir mi conocimiento y contribuir a proyectos innovadores.',
  'about.0.title': 'Mentalidad de equipo',
  'about.0.paragraph': 'Disfruto colaborar con otros y creo firmemente en el trabajo en equipo. Trabajar en equipo me ha permitido crecer y aprender.',
  'about.1.title': 'Énfasis en calidad',
  'about.1.paragraph': 'Uno de mis valores principales es el compromiso de entregar trabajo de alta calidad. Creo que el código limpio y mantenible es fundamental para construir soluciones escalables.',
};
